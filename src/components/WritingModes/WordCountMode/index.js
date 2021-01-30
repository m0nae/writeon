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

export function WordCountMode({
  mode,
  wordCount,
  wordCountGoal,
  setWordCountGoal,
}) {
  const [val, setVal] = useState(null);
  //TODO: when user presses "save" btn a Toast pops up which tells them how much PERCENTAGE MORE they wrote than their intended goal. OR have a modal pop up and warn them that they didn't meet their word count goal, and if they are sure they want to continue.

  return (
    <>
      <Progress
        value={wordCount}
        max={wordCountGoal}
        colorScheme={wordCount <= wordCountGoal ? "blue" : "green"}
        className="word-count-progress-bar"
      />
      <HStack>
        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          value={val !== null ? val : 0}
          onChange={(value) => setVal(Number(value))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={() => setWordCountGoal(val)}>Submit</Button>
      </HStack>
      <p>This is the wordcountmode component.</p>
    </>
  );
}
