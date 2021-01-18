import React from 'react';
import { Layout } from '../../Pages';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import ContentEditable from 'react-contenteditable';

export function CreateNew() {
  return (
    <Layout>
      <TextEditor />
    </Layout>
  );
}

function TextEditor() {
  return (
    <>
      <ContentEditable className="post-title" html="<h2>Hey</h2>" />
      <ReactQuill theme="bubble" />
    </>
  );
}
