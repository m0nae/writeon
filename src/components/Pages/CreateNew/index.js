import React, { useRef, useEffect, useState } from "react";

import { Layout } from "../../Pages";
import { TimeLimitMode } from "../../WritingModes/TimeLimitMode";
import { PromptMode } from "../../WritingModes/PromptMode";
import { WordCountMode } from "../../WritingModes/WordCountMode";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import ContentEditable from "react-contenteditable";

export function CreateNew() {
  let quillEditor = useRef(null);
  let postTitle = useRef(null);
  const [mode, setMode] = useState("");
  const [wordCountGoal, setWordCountGoal] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [val, setVal] = useState(0);

  // useReducer

  //TODO: put all state from the different modes into this component. this will make it so that even if different modes are switched, their progress from that mode persists! (except for the counter... THAT will stop once the mode is changed to something else, so be sure to warn the user);

  //TODO: ^ create another Context for the modes (ModesContext)

  function getWordCount() {
    if (mode !== "wordCountMode") {
      return;
    }

    let quillTextArea = quillEditor.current.getEditor().getText();

    let words = quillTextArea.match(/\b[-?(\w+)?]+\b/gi);

    if (words) {
      setWordCount(words.length);
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
    setMode(e.target.value);
  }

  return (
    <Layout>
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
        <WordCountMode
          wordCount={wordCount}
          wordCountGoal={wordCountGoal}
          setWordCountGoal={setWordCountGoal}
          quillEditor={quillEditor}
          mode={mode}
        />
      )}
      {mode === "timeLimitMode" && <TimeLimitMode mode={mode} />}
    </Layout>
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
