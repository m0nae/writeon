import styles from "../writing-modes.module.scss"
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  HStack
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
      <HStack>
        <NumberInput
          className={styles['number-input']}
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
        <Text>words</Text>
        {promptModeError && <p>{promptModeError.errorMessage}</p>}
        </HStack>
    </>
  );
}
