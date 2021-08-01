import { useMutation, useQuery } from '@apollo/client';
import {
  CircularProgress,
  CircularProgressLabel,
  createStandaloneToast,
  Progress,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { AlertDialog } from '../../components/AlertDialog';
import { CreateNewHeader } from '../../components/Header/CreateNewHeader';
import { TextEditor } from '../../components/TextEditor';
import { ModeContext } from '../../contexts/ModeContext';
import { OptionsMenuContext } from '../../contexts/OptionsMenuContext';
import { TimeLimitContext } from '../../contexts/TimeLimitContext';
import { DELETE_POST, GET_POST, UPDATE_POST } from '../../gql.js';
import { Loading } from '../Loading';
import styles from './create-new.module.scss';

export function CreateNew() {
  let quillEditor = useRef(null);
  let postTitle = useRef(null);

  const { timeLimit, count } = useContext(TimeLimitContext);
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
    initialState
  } = useContext(ModeContext);
  const {
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    closeDeleteAlert,
    deleteAlertRef,
    deletePostErrorT
  } = useContext(OptionsMenuContext);

  const isModalOpen = isOpen;
  const timesUpToast = useToast();
  const postLengthErrorToast = useToast();

  const { id } = useParams();
  const [currentPostId] = useState(id);
  const [currentPost, setCurrentPost] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [loading, setLoading] = useState(true);

  let history = useHistory();

  const sizes = useBreakpointValue({ base: '4rem', md: '5rem' });

  const [
    updatePost,
    { error: updatePostError, loading: updatePostLoading }
  ] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      updatePostSuccessToast({
        title: 'Post saved!',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  });

  // retrieves post by the :id variable in the current url
  const { error: currentPostError } = useQuery(GET_POST, {
    variables: { id: currentPostId },
    onCompleted: (GET_POST) => {
      setCurrentPost({ ...GET_POST.getPostById });
      setLoading(false);
    },
    fetchPolicy: 'network-only'
  });

  const [deletePost, { error: deletePostError }] = useMutation(DELETE_POST, {
    variables: { id: currentPostId },
    onCompleted: () => {
      setRedirectToHome(true);
    }
  });

  // load the contents of the retrieved post into the text editor
  useEffect(() => {
    if (currentPost && currentPost.deltaContent) {
      let deltaContent = JSON.parse(currentPost.deltaContent);
      quillEditor.current.editor.setContents(deltaContent.ops);
    }
  }, [currentPost]);

  // resets writing modes' states before unmounting
  useEffect(() => {
    return () => {
      for (const [key, value] of Object.entries(initialState)) {
        modeDispatch({ type: `${key}`, payload: `${value}` });
      }
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      timesUpToast({
        title: 'Time is up!',
        duration: 5000,
        status: 'info',
        isClosable: true
      });
    }
  }, [count]);

  function handleSave() {
    let textContents = quillEditor.current.editor.getText();
    let deltaContents = quillEditor.current.editor.getContents();
    let title = postTitle.current.children[1].value;

    if (textContents.length > 20000) {
      return postLengthErrorToast({
        title: 'An error has occured.',
        description:
          'Note is too long. The maximum note length is 20,000 characters.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }

    updatePost({
      variables: {
        id: currentPostId,
        title: title,
        deltaContent: JSON.stringify(deltaContents),
        textContent: textContents
      }
    });

    if (updatePostError) {
      updatePostErrorToast({
        title: 'An error has occured.',
        description: 'There was an issue saving your note. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  function handleDelete() {
    deletePost({
      variables: {
        id: currentPostId
      }
    });

    closeDeleteAlert();

    if (deletePostError) {
      deletePostErrorT();
    }
  }

  function goBack() {
    history.push('/dashboard');
    // todo: input code that resets the ModeContext states
  }

  function handleTimeLimitMode() {
    modeDispatch({ type: 'timeLimitMode', payload: !timeLimitMode });
  }

  function getWordCount() {
    let quillTextArea = quillEditor.current.getEditor().getText();
    let words = quillTextArea.match(/\b[-?(\w+)?]+\b/gi);

    if (words) {
      modeDispatch({ type: 'wordCount', payload: words.length });
    }
  }

  return (
    <>
      {(redirectToHome || currentPostError) && (
        <Redirect push to="/dashboard" />
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className={styles['wrapper']}>
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
              colorScheme={wordCount <= wordCountGoal ? 'blue' : 'green'}
              className={styles['word-count-progress-bar']}
            />
          )}
          {wordCountGoal && (
            <p
              className={styles['word-count']}
            >{`${wordCount}/${wordCountGoal} words`}</p>
          )}

          {/* TEXT EDITOR */}

          <div className={styles['editor-container']}>
            <TextEditor
              currentPost={currentPost}
              postTitle={postTitle}
              getWordCount={() => getWordCount()}
              quillEditorRef={quillEditor}
            />
          </div>

          {/* TIMELIMITMODE PROGRESS CIRCLE */}

          {toggledSwitches.includes('timeLimitMode') && !isModalOpen && (
            <CircularProgress
              value={count ? count : 0}
              min={0}
              max={timeLimit && timeLimit !== 0 ? timeLimit : 1}
              size={sizes}
              color="green.400"
              className={styles['time-limit-circle']}
            >
              <CircularProgressLabel />
            </CircularProgress>
          )}
        </div>
      )}
    </>
  );
}

const updatePostSuccessToast = createStandaloneToast();
const updatePostErrorToast = createStandaloneToast();
