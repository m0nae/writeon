import ReactQuill from "react-quill";
import {
  Editable,
  EditableInput,
  EditablePreview
} from "@chakra-ui/react";

export function TextEditor(props) {
  const { quillEditorRef, getWordCount, postTitle, currentPost } = props;
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
