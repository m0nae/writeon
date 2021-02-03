import React, { useRef, useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";

import { Layout } from "../../Pages";
import { TimeLimitMode } from "../../WritingModes/TimeLimitMode";
import { PromptMode } from "../../WritingModes/PromptMode";
import { WordCountMode } from "../../WritingModes/WordCountMode";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { MdChevronLeft, MdMenu } from "react-icons/md";

import { ModeMenu } from "../../ModeMenu";
import { Progress } from "@chakra-ui/react";
import { Flex, Spacer, Box, Button, Heading } from "@chakra-ui/react";

import ContentEditable from "react-contenteditable";

export function CreateNew() {
  let quillEditor = useRef(null);
  let postTitle = useRef(null);
  const initialState = {
    mode: "",
    wordCountGoal: null,
    wordCount: 0,
    timeLimitMode: false,
    wordCountMode: false,
    promptMode: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    return { ...state, [type]: payload };
  }

  const {
    mode,
    wordCountGoal,
    wordCount,
    timeLimitMode,
    wordCountMode,
    promptMode,
  } = state;

  // useReducer

  //TODO: convert EVERY basic component to its Chakra UI equivalent. This will make it so that I can let Chakra handle theming (light mode/dark mode) more easily

  //TODO: convert all CSS pixels to rems. Stop using both pxs and rems, only use one!

  //TODO: fix positioning of the navbar. the chevron and menu icon is a little off

  //TODO: put all state from the different modes into this component. this will make it so that even if different modes are switched, their progress from that mode persists! (except for the counter... THAT will stop once the mode is changed to something else, so be sure to warn the user);

  //TODO: ^ create another Context for the modes (ModesContext)

  function getWordCount() {
    if (mode !== "wordCountMode") {
      return;
    }

    let quillTextArea = quillEditor.current.getEditor().getText();
    let words = quillTextArea.match(/\b[-?(\w+)?]+\b/gi);

    if (words) {
      dispatch({ type: "wordCount", payload: words.length });
    } else {
      console.log("0 words");
    }
  }

  //? notice: the mode states are persisting when their state is inside of the parent component (duh.) move it all up (or create new context)!

  function handleSave() {
    let textContents = quillEditor.current.state.value;
    let deltaContents = quillEditor.current.editor.getContents();
    let title = postTitle.current.el.current.innerText;
    console.log(title);
    console.log(textContents);
    console.log(deltaContents);
  }

  function handleChange(e) {
    dispatch({ type: "mode", payload: e.target.value });
  }

  function handleTimeLimitMode() {
    dispatch({ type: "timeLimitMode", payload: !timeLimitMode });
  }

  return (
    <>
      <Flex p="4" justify="center" className="nav">
        <Box>
          <Link to="/">
            <MdChevronLeft className="editor-left-chevron" />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Navbar>
            <NavItem icon=">">
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </Navbar>
        </Box>
        <ModeMenu
          handleTimeLimitMode={handleTimeLimitMode}
          timeLimitMode={timeLimitMode}
          wordCountMode={wordCountMode}
          promptMode={promptMode}
        />
        <Box>
          <MdMenu className="menu-icon" />
        </Box>
      </Flex>

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
      <div className="container editor-container">
        <TextEditor
          postTitleRef={postTitle}
          getWordCount={() => getWordCount()}
          quillEditorRef={quillEditor}
        />
        <div className="modeSelection">
          <input
            type="radio"
            onChange={(e) => handleChange(e)}
            id="promptMode"
            name="mode"
            value="promptMode"
          />
          <label htmlFor="promptMode">Prompt Mode</label>
          <br></br>

          <input
            type="radio"
            onChange={(e) => handleChange(e)}
            id="wordCountMode"
            name="mode"
            value="wordCountMode"
          />
          <label htmlFor="wordCountMode">Word Count Mode</label>
          <br></br>

          <input
            type="radio"
            onChange={(e) => handleChange(e)}
            id="timeLimitMode"
            name="mode"
            value="timeLimitMode"
          />
          <label htmlFor="timeLimitMode">Time Limit Mode</label>
          <br></br>
        </div>

        {mode === "promptMode" && <PromptMode mode={mode} />}
        {mode === "wordCountMode" && (
          <WordCountMode dispatch={dispatch} quillEditor={quillEditor} />
        )}
        {mode === "timeLimitMode" && <TimeLimitMode mode={mode} />}
      </div>
    </>
  );
}

function TextEditor({ quillEditorRef, getWordCount, postTitleRef }) {
  return (
    <>
      <ContentEditable
        ref={postTitleRef}
        className="post-title"
        html="<h2>Untitled</h2>"
      />
      <ReactQuill onKeyUp={getWordCount} ref={quillEditorRef} theme="bubble" />
      {/* <ReactQuill ref={quillEditor} theme="bubble" /> */}
    </>
  );
}
