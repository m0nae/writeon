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
