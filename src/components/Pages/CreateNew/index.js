import React, { useRef, useEffect } from 'react';
import { Layout } from '../../Pages';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import ContentEditable from 'react-contenteditable';

export function CreateNew() {
  let quillEditor = useRef(null);
  let postTitle = useRef(null);

  // useEffect(() => {

  // }, []);

  function handleSave() {
    // let postTitle = quillEditor.current.
    let textContents = quillEditor.current.state.value;
    let deltaContents = quillEditor.current.editor.getContents();
    let title = postTitle.current.el.current.innerText;
    console.log(title);
    console.log(textContents);
    console.log(deltaContents);
  }

  return (
    <Layout>
      <TextEditor postTitleRef={postTitle} quillEditorRef={quillEditor} />
      <button onClick={() => handleSave()}>Save</button>
    </Layout>
  );
}

function TextEditor({ quillEditorRef, postTitleRef }) {
  return (
    <>
      <ContentEditable
        ref={postTitleRef}
        className="post-title"
        html="<h2>Untitled</h2>"
      />
      <ReactQuill ref={quillEditorRef} theme="bubble" />
      {/* <ReactQuill ref={quillEditor} theme="bubble" /> */}
    </>
  );
}
