import React, { createContext, useReducer, useRef, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

export const ModeContext = createContext();

export function ModeProvider(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const numberInputRef = useRef();

  const initialState = {
    mode: "",
    wordCountGoal: null,
    wordCount: 0,
    timeLimitMode: false,
    wordCountMode: false,
    promptMode: false,
    words: [],
    numberOfWords: 0,
    promptModeError: null,
    toggledSwitches: [],
  };

  const [state, modeDispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    return { ...state, [type]: payload };
  }

  function getWords() {
    if (numberOfWords > 10) {
      // return setError({
      //   errorMessage: "Number must be below 10.",
      // });
      return modeDispatch({
        type: "promptModeError",
        payload: { errorMessage: "Number must be below 10." },
      });
    } else {
      modeDispatch({ type: "promptModeError", payload: null });
    }

    fetch(`https://random-word-api.herokuapp.com/word?number=${numberOfWords}`)
      .then((response) => response.json())
      // .then((data) => setWords(data));
      .then((data) => modeDispatch({ type: "words", payload: data }));
  }

  const {
    mode,
    wordCountGoal,
    wordCount,
    timeLimitMode,
    // timeLimit,
    // isCountdownActive,
    // count,
    wordCountMode,
    promptMode,
    words,
    numberOfWords,
    promptModeError,
    toggledSwitches,
  } = state;

  return (
    <ModeContext.Provider
      value={{
        mode: mode,
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        wordCountGoal: wordCountGoal,
        wordCount: wordCount,
        timeLimitMode: timeLimitMode,
        // timeLimit: timeLimit,
        // isCountdownActive: isCountdownActive,
        // count: count,
        wordCountMode: wordCountMode,
        promptMode: promptMode,
        words: words,
        getWords: getWords,
        numberOfWords: numberOfWords,
        promptModeError: promptModeError,
        toggledSwitches: toggledSwitches,
        numberInputRef: numberInputRef,
        modeDispatch: modeDispatch,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
}
