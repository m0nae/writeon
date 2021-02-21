import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner
} from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { BsThreeDots } from "react-icons/bs";
import { CreateNewLayout } from ".";
import { DropdownModeMenu } from "../components/ModeMenu";
import { IconButton } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { ModeContext } from "../ModeContext";
import { Progress } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { TimeLimitContext } from "../TimeLimitContext";

const UPDATE_POST = gql`
  mutation($id: ID!, $title: String, $deltaContent: String, $htmlContent: String) {
    updatePost(id: $id, postInput: {title: $title, htmlContent: $htmlContent, deltaContent: $deltaContent}) {
            _id
            title
            dateCreated
            dateModified
            deltaContent
            htmlContent
            author {
                _id
            }
        }
}
`

const GET_POST = gql`
  query($id: ID!) {
    getPostById(id: $id) {
        ... on NewPost {
        _id
        title
        dateCreated
        }
        ... on ExistingPost {
        _id
        title
        dateCreated
        deltaContent
        htmlContent
        dateModified
        }
    }
}
`

const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
        ... on NewPost {
            _id
            title
            dateCreated
            author {
                _id
            }
        }
        ... on ExistingPost {
            _id
            title
            dateCreated
            dateModified
            deltaContent
            htmlContent
            author {
                _id
            }
        }
    }
}
`

export function CreateNew() {
  let quillEditor = useRef(null);
  let postTitle = useRef(null);
  const {
    mode,
    isOpen,
    wordCountGoal,
    wordCount,
    timeLimitMode,
    wordCountMode,
    promptMode,
    words,
    modeDispatch,
    toggledSwitches,
    initialState,
  } = useContext(ModeContext);

  const isModalOpen = isOpen;

  const { timeLimit, count } = useContext(TimeLimitContext);
  const [updatePost, { error: updatePostError, loading: updatePostLoading, data}] = useMutation(UPDATE_POST, { 
    onCompleted: (updatePost) => {
      console.log('Post updated!')
    }
  });
  
  const { id } = useParams();
  const [currentPostId, setCurrentPostId] = useState(id);
  const [currentPost, setCurrentPost] = useState(null);
  const [toHome, setToHome] = useState(false);
  const [loading, setLoading] = useState(true);

  // retrieves post by the :id variable in the current url
  const {error: currentPostError, loading: currentPostLoading, data: currentPostData} = useQuery(GET_POST, {
    variables: { id: currentPostId},
    onCompleted: (GET_POST) => {
      setCurrentPost({...GET_POST.getPostById})
      setLoading(false);
    }
  });

  const [deletePost, { error: deletePostError, loading: deletePostLoading, data: deletePostData}] = useMutation(DELETE_POST, {
    variables: { id: currentPostId },
    onCompleted: (deletePost) => {
      console.log('Post deleted!');
    }
  })

  useEffect(() => {
    console.log(currentPostId);
    
    if (currentPost && currentPost.deltaContent) {
      console.table(currentPost);
      let deltaContent = JSON.parse(currentPost.deltaContent);
      quillEditor.current.editor.setContents(deltaContent.ops);
    }
  }, [currentPost])

  // resets writing-mode states before unmounting
  useEffect(() => {
    return () => {
      for (const [key, value] of Object.entries(initialState)) {
        modeDispatch({ type: `${key}`, payload: `${value}` });
      }
    };
  }, []);

  function handleSave() {
    let textContents = quillEditor.current.state.value;
    let deltaContents = quillEditor.current.editor.getContents();
    let title = postTitle.current.children[1].value;
    console.log(title);
    console.log(textContents);
    console.log(deltaContents);
    updatePost({ variables: {
      id: currentPostId,
      title: title,
      deltaContent: JSON.stringify(deltaContents),
      htmlContent: textContents,
    }})
  }

  function handleDelete() {
    deletePost({
      variables: {
        id: currentPostId
      }
    });

    setToHome(true);
  }

  function handleTimeLimitMode() {
    modeDispatch({ type: "timeLimitMode", payload: !timeLimitMode });
  }

  function getWordCount() {
    let quillTextArea = quillEditor.current.getEditor().getText();
    let words = quillTextArea.match(/\b[-?(\w+)?]+\b/gi);

    if (words) {
      modeDispatch({ type: "wordCount", payload: words.length });
    } else {
      console.log("0 words");
    }
  }

  return (
    <>
    {/* if there's an error, redirect to an error page instead */}
    {toHome || currentPostError && <Redirect to="/" />}
    {loading ? 

    (<Center mt="50vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
    </Center>)
    :
    (<CreateNewLayout>
        <Flex
          p="4"
          justify="center"
          align="center"
          className="header create-new"
        >
          <Box>
            <Link to="/">
              <MdChevronLeft className="editor-left-chevron" />
            </Link>
          </Box>

          <Button
            className="save-btn"
            size="md"
            variant="outline"
            isLoading={updatePostLoading}
            loadingText="Saving..."
            onClick={() => handleSave()}
          >
            Save
          </Button>

          <Spacer />

          {words.length > 0 && (
            <>
              <Box alignSelf="center">
                <HStack alignSelf="center" className="words-list">
                  {words.map((word, index) => (
                    <Tag key={index} id={index}>
                      {word}
                    </Tag>
                  ))}
                </HStack>
              </Box>
              <Spacer />
            </>
          )}

          

          <DropdownModeMenu
            mode={mode}
            handleTimeLimitMode={handleTimeLimitMode}
            timeLimitMode={timeLimitMode}
            wordCountMode={wordCountMode}
            promptMode={promptMode}
            wordCount={wordCount}
            wordCountGoal={wordCountGoal}
            quillEditor={quillEditor}
            modeDispatch={modeDispatch}
            quillEditor={quillEditor}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BsThreeDots className="menu-icon" />}
              variant="unstyled"
              style={{ width: "50px" }}
              // className="menu-icon"
            />
            <MenuList>
              <MenuItem onClick={() => handleDelete()}>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* DELETE POST CONFIRMATION MODAL */}

        

        {/* WORDCOUNT PROGRESS BAR */}

        {wordCountGoal && (
          <Progress
            value={wordCount}
            max={wordCountGoal}
            colorScheme={wordCount <= wordCountGoal ? "blue" : "green"}
            className="word-count-progress-bar"
          />
        )}
        {wordCountGoal && (
          <p className="word-count">{`${wordCount}/${wordCountGoal} words`}</p>
        )}

        {/* TEXT EDITOR */}

        <div className="container editor-container">
          <TextEditor
          currentPost={currentPost}
            postTitle={postTitle}
            getWordCount={() => getWordCount()}
            quillEditorRef={quillEditor}
          />
        </div>

        {/* TIMELIMITMODE PROGRESS CIRCLE */}

        {toggledSwitches.includes("timeLimitMode") && !isModalOpen && (
          <CircularProgress
            value={count && count !== NaN ? count : 0}
            min={0}
            max={timeLimit && timeLimit !== 0 ? timeLimit : 1}
            size="5rem"
            color="green.400"
            className="time-limit-progress-circle"
          >
            <CircularProgressLabel />
          </CircularProgress>
        )}
      </CreateNewLayout>)}
    </>
  );
}

function TextEditor({ quillEditorRef, getWordCount, postTitle, currentPost }) {
  return (
    <>
      <Editable ref={postTitle} className="post-title" defaultValue={currentPost ? currentPost.title : "Untitled"}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <ReactQuill onKeyUp={getWordCount} ref={quillEditorRef} theme="bubble" />
    </>
  );
}
