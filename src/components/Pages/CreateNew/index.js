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
  Heading,
  Navbar,
  Spacer,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";
import { MdChevronLeft, MdMenu } from "react-icons/md";
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
} from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { BsThreeDots } from "react-icons/bs";
import ContentEditable from "react-contenteditable";
import { CreateNewLayout } from "../../Pages";
import { DropdownModeMenu } from "../../ModeMenu";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ModeContext } from "../../../ModeContext";
import { NewPostContext } from "../../../NewPostContext";
import { Progress } from "@chakra-ui/react";
import { PromptMode } from "../../WritingModes/PromptMode";
import ReactQuill from "react-quill";
import { TimeLimitContext } from "../../../TimeLimitContext";
import { TimeLimitMode } from "../../WritingModes/TimeLimitMode";
import { WordCountMode } from "../../WritingModes/WordCountMode";

// const SAVE_POST = gql`
//   {
//     createPost(postInput: { })
//   }
// `

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

  //! TODO: WHENEVER THE COMPONENT INITIALLY LOADS, TAKE THE NEWPOST STATE FROM THE CONTEXT AND USE THAT TO LOAD IN THE POST TITLE INTO THE TEXT TITLE (IT SHOULD BE THE TITLE'S "DEFAULTVALUE")

  //? so... what should happen if the route is manually typed into the URL? should we have dynamic route urls? (e.g. the post title as a route in the URL???????)

  //TODO: convert EVERY basic component to its Chakra UI equivalent. This will make it so that I can let Chakra handle theming (light mode/dark mode) more easily

  //TODO: convert all CSS pixels to rems. Stop using both pxs and rems, only use one!

  //TODO: fix positioning of the navbar. the chevron and menu icon is a little off

  //TODO: put all state from the different modes into this component. this will make it so that even if different modes are switched, their progress from that mode persists! (except for the counter... THAT will stop once the mode is changed to something else, so be sure to warn the user);

  //TODO: ^ create another Context for the modes (ModesContext)

  useEffect(() => {
    // destructure initialState
    // just write a function that takes in an array (or 2 arrays) and creates/runs multiple "dispatch" func
    // for each entry in initialState, create a dispatch func that resets the state back to what it is

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
  }

  function handleChange(e) {
    modeDispatch({ type: "mode", payload: e.target.value });
  }

  function handleTimeLimitMode() {
    modeDispatch({ type: "timeLimitMode", payload: !timeLimitMode });
  }

  return (
    <>
      <CreateNewLayout>
        <Flex
          p="4"
          justify="center"
          align="center"
          className="header create-new"
        >
          <Box>
            <Link to="/">
              {/* //TODO: If this is clicked, SAVE the post to DB THEN redirect user back to wherever they came from (I think react router uses the browser history, so find out which method returns the user to their previous page/where they came from ) */}
              <MdChevronLeft className="editor-left-chevron" />
            </Link>
          </Box>

          <Button
            className="save-btn"
            size="md"
            variant="outline"
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
              <MenuItem>Delete Post</MenuItem>
            </MenuList>
          </Menu>
          {/* <BsThreeDots className="menu-icon" />
          </Box> */}
        </Flex>

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
      </CreateNewLayout>
    </>
  );
}

function TextEditor({ quillEditorRef, getWordCount, postTitle }) {
  return (
    <>
      <Editable ref={postTitle} className="post-title" defaultValue="Untitled">
        <EditablePreview />
        <EditableInput />
      </Editable>
      <ReactQuill onKeyUp={getWordCount} ref={quillEditorRef} theme="bubble" />
    </>
  );
}
