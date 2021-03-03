import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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
import { TimeLimitContext } from "../contexts/TimeLimitContext";
import { Loading } from "./Loading.js";
import { CreateNewHeader } from "../components/Header/CreateNewHeader/index.js";
import { AlertDialog } from "../components/AlertDialog/index.js";

import { TextEditor } from "../components/TextEditor";

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
  const [currentPostId] = useState(id);
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

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: currentPostId },
    onCompleted: (deletePost) => {
      console.log('Post deleted!');
    }
  })

  // load the contents of the retrieved post into the text editor
  useEffect(() => {
    if (currentPost && currentPost.deltaContent) {
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
    {loading ? (<Loading />) :
    (<div className="wrapper">
      <CreateNewHeader
        words={words}
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
        updatePostLoading={updatePostLoading}
        onSaveClick={() => handleSave()}
        onBackBtnClick={() => goBack()}
        onAlertClick={() => setIsDeleteAlertOpen(true)}
     />

        {/* DELETE POST CONFIRMATION MODAL */}

        <AlertDialog 
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={deleteAlertRef}
          onClose={closeDeleteAlert}
          isCentered
          deleteAlertRef={deleteAlertRef}
          closeDeleteAlert={() => closeDeleteAlert()}
          handleDelete={() => handleDelete()}
        />
        
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