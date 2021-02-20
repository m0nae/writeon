import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { HStack } from "@chakra-ui/react";
import { ModeContext } from "../../../ModeContext";

export function WordCountMode() {
  const { numberInputRef, wordCountGoal } = useContext(
    ModeContext
  );
  //TODO: when user presses "save" btn a Toast pops up which tells them how much PERCENTAGE MORE they wrote than their intended goal. OR have a modal pop up and warn them that they didn't meet their word count goal, and if they are sure they want to continue.
  return (
    <>
      <HStack>
        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          ref={numberInputRef}
          defaultValue={wordCountGoal}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>words</Text>
      </HStack>
    </>
  );
}
