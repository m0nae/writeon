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
import { DELETE_POST, GET_POST, UPDATE_POST } from "../gql.js";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
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
import { CreateNewLayout } from "../Layout";
import { DropdownModeMenu } from "../components/ModeMenu";
import { IconButton } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { ModeContext } from "../contexts/ModeContext";
import { Progress } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { TimeLimitContext } from "../contexts/TimeLimitContext";
import { Loading } from "./Loading.js";
import { Header, CreateNewHeader } from "../components/Header/index.js";

export function CreateNew(props) {
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
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const closeDeleteAlert = () => setIsDeleteAlertOpen(false);
  const deleteAlertRef = useRef();

  // retrieves post by the :id variable in the current url
  const {error: currentPostError, loading: currentPostLoading, data: currentPostData} = useQuery(GET_POST, {
    variables: { id: currentPostId},
    onCompleted: (GET_POST) => {
      setCurrentPost({...GET_POST.getPostById})
      setLoading(false);
    },
    fetchPolicy: "network-only"
  });

  const [deletePost, { error: deletePostError, loading: deletePostLoading, data: deletePostData}] = useMutation(DELETE_POST, {
    variables: { id: currentPostId },
    onCompleted: (deletePost) => {
      console.log('Post deleted!');
    }
  })

  useEffect(() => {
    console.log(currentPostId);
    console.log(currentPost);
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
    let textContents = quillEditor.current.editor.getText();
    let deltaContents = quillEditor.current.editor.getContents();
    let title = postTitle.current.children[1].value;
    console.log(title);
    console.log(textContents);
    console.log(deltaContents);
    updatePost({ variables: {
      id: currentPostId,
      title: title,
      deltaContent: JSON.stringify(deltaContents),
      textContent: textContents,
    }})
  }

  function handleDelete() {
    deletePost({
      variables: {
        id: currentPostId
      }
    });
    closeDeleteAlert();
    setRedirectToHome(true);
  }



  function goBack() {
    history.goBack();
    // todo: input code that resets the ModeContext states
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
    {(redirectToHome || currentPostError) && <Redirect push to="/" />}
    {loading ? (<Loading />)
    :
    (<div className="wrapper">
      <CreateNewHeader>
          <Box cursor="pointer" onClick={() => goBack()}>
              <MdChevronLeft className="editor-left-chevron" />
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
              <MenuItem onClick={() => setIsDeleteAlertOpen(true)}>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        </CreateNewHeader>

        {/* DELETE POST CONFIRMATION MODAL */}

        <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={deleteAlertRef}
        onClose={closeDeleteAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={deleteAlertRef} onClick={closeDeleteAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete()} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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

        <div className="editor-container">
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
      </div>)}
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
