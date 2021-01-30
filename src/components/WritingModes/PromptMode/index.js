import React, { useRef, useEffect, useState } from "react";

import { BiRefresh } from "react-icons/bi";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export function PromptMode() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [numberOfWords, setNumberOfWords] = useState(0);

  function changeNumberOfWords(value) {
    setNumberOfWords(Number(value));
  }

  function getWords() {
    if (numberOfWords > 10) {
      return setError({
        errorMessage: "Number must be below 10.",
      });
    } else {
      setError(null);
    }

    fetch(`https://random-word-api.herokuapp.com/word?number=${numberOfWords}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }

  useEffect(() => {
    getWords();
  }, []);

  // basically, if a mode has already been selected, and a NEW mode is now selected, pull up an alert box for the reader to confirm they really want to leave/lose their mode progress.

  // ^^ thinking about just doing this for the timer

  return (
    <>
      <div className="words-list-wrapper">
        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          max={10}
          defaultValue={0}
          onChange={(value) => changeNumberOfWords(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <p>words</p>
        <ul className="words-list">
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
        <BiRefresh onClick={() => getWords()} className="refresh-btn" />
        {error && <p>{error.errorMessage}</p>}
      </div>
    </>
  );
}
