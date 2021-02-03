import React, { useRef, useState } from "react";
import { Progress } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Stack, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export function WordCountMode({ setWordCountGoal, dispatch }) {
  const numberInputRef = useRef();
  //TODO: when user presses "save" btn a Toast pops up which tells them how much PERCENTAGE MORE they wrote than their intended goal. OR have a modal pop up and warn them that they didn't meet their word count goal, and if they are sure they want to continue.
  //?? Should wordCount of 0 be allowed?
  return (
    <>
      <HStack>
        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          ref={numberInputRef}
          defaultValue={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          onClick={() =>
            // setWordCountGoal(numberInputRef.current.firstChild.value)
            dispatch({
              type: "wordCountGoal",
              payload: numberInputRef.current.firstChild.value,
            })
          }
        >
          Submit
        </Button>
      </HStack>
    </>
  );
}
