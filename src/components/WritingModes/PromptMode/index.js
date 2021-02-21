import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { ModeContext } from "../../../contexts/ModeContext";

export function PromptMode() {
  const {
    modeDispatch,
    promptModeError,
  } = useContext(ModeContext);

  function changeNumberOfWords(value) {
    modeDispatch({ type: "numberOfWords", payload: Number(value) });
  }
  
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
