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
  Heading,
  Navbar,
  Spacer,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuCommand,
  MenuDivider,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
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
import { CreateNewLayout } from "../../Pages";
import { DropdownModeMenu } from "../../ModeMenu";
import { IconButton } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { ModeContext } from "../../../ModeContext";
import { NewPostContext } from "../../../NewPostContext";
import { Progress } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { TimeLimitContext } from "../../../TimeLimitContext";

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
  const { newPost, setNewPost } = useContext(NewPostContext);
  const [updatePost, { error, loading: updatePostLoading, data}] = useMutation(UPDATE_POST, { 
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
    
    
    if (currentPost) {
      console.table(currentPost);
      let deltaContent = JSON.parse(currentPost.deltaContent);
      quillEditor.current.editor.setContents(deltaContent.ops);
    }
  }, [currentPost])

  //TODO: implement functionality where if the loading state is "true" for X amount of seconds (for too long basically lol), refresh the page/rerender the component/RERUN THE GET_POST QUERY AGAIN

  // ! HAVE A LOADING SCREEN FOR RETRIEVING THE POST BY ID. IF NO POST EXIST, THEN REDIRECT TO 404 NOT FOUND PAGE. IF THE USER IS NOT AUTHORIZED TO EDIT/VIEW THIS POST, THEN SHOW THEM A PAGE THAT TELLS THEM THAT. IF IT DOES, THEN DISABLE THE LOADING SCREEN/SPINNER AND SHOW THE COMPONENT AS NORMAL!!!

  //! also take into consideration error handling. what if smth is wrong with the server? or on the client side? just redirect to a page based on the error shown (404, not authorized, etc)


  //TODO: convert EVERY basic component to its Chakra UI equivalent. This will make it so that I can let Chakra handle theming (light mode/dark mode) more easily

  //TODO: convert all CSS pixels to rems. Stop using both pxs and rems, only use one!

  // useEffect(() => {
  //   // if there's no data inside newPost state, then redirect the user to the page they came from (or a 404 page or error page or something)
  //   //TODO:  OR... JUST HAVE THIS ROUTE BE A PROTECTED ONE. GO INTO THE PROTECTEDROUTE COMPONENT AND CONFIGURE IT TO ONLY BE ACCESSIBLE IF "NEWPOST" STATE EXISTS
  // })

  // resets writing-mode states before unmounting
  useEffect(() => {
    return () => {
      for (const [key, value] of Object.entries(initialState)) {
        modeDispatch({ type: `${key}`, payload: `${value}` });
      }
    };
  }, []);

  function getWordCount() {
    let quillTextArea = quillEditor.current.getEditor().getText();
    let words = quillTextArea.match(/\b[-?(\w+)?]+\b/gi);

    if (words) {
      modeDispatch({ type: "wordCount", payload: words.length });
    } else {
      console.log("0 words");
    }
  }

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

  function handleChange(e) {
    modeDispatch({ type: "mode", payload: e.target.value });
  }

  function handleTimeLimitMode() {
    modeDispatch({ type: "timeLimitMode", payload: !timeLimitMode });
  }

  return (
    <>
    {toHome && <Redirect to="/" />}
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
              {/* //TODO: If this is clicked, make modal appear if user wants to leave b4 saving & THEN redirect user back to wherever they came from (I think react router uses the browser history, so find out which method returns the user to their previous page/where they came from ) */}
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
          {/* <BsThreeDots className="menu-icon" />
          </Box> */}
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
