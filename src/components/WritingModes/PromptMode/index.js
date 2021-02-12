import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

import { BiRefresh } from "react-icons/bi";
import { HStack } from "@chakra-ui/react";
import { ModeContext } from "../../../ModeContext";

export function PromptMode() {
  const {
    modeDispatch,
    words,
    promptModeError,
    numberOfWords,
    getWords,
  } = useContext(ModeContext);

  function changeNumberOfWords(value) {
    modeDispatch({ type: "numberOfWords", payload: Number(value) });
  }

  // useEffect(() => {
  //   getWords();
  // }, []);

  //TODO: TagCloseBtn: onClick, take the id of clicked item and

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
        {promptModeError && <p>{promptModeError.errorMessage}</p>}
      </div>
    </>
  );
}
