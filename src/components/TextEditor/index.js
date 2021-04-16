import styles from './text-editor.module.scss';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import ReactQuill from 'react-quill';

export function TextEditor(props) {
  const { quillEditorRef, getWordCount, postTitle, currentPost } = props;
  return (
    <>
      <Editable
        ref={postTitle}
        className={styles['post-title']}
        defaultValue={currentPost ? currentPost.title : 'Untitled'}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <ReactQuill
        scrollingContainer="html"
        onKeyUp={getWordCount}
        ref={quillEditorRef}
        theme="bubble"
      />
    </>
  );
}
