import React, { useRef, useEffect, useState } from "react";
import { useInterval } from "../../../utils.js";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export function TimeLimitMode({ mode }) {
  const [timeLimit, setTimeLimit] = useState(null);
  const [val, setVal] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [count, setCount] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (timeLimit === 0) {
      toast({
        title: "Time is up!",
        duration: 10000,
        status: "info",
        isClosable: true,
      });
    }
  }, [timeLimit]);

  function activateCountdown() {
    if (val <= 0) {
      return;
    }
    setCount(val * 60 + 1);
    setIsCountdownActive(true);
  }

  useInterval(() => {
    if (!isCountdownActive) {
      return;
    }

    setIsReadOnly(true);
    setCount(count - 1);
    setTimeLimit(count);
    if (count <= 0) {
      setIsReadOnly(false);
    }

    console.log(count);
  }, 1000);

  return (
    <>
      <HStack spacing="10px">
        <CircularProgress
          value={timeLimit && timeLimit !== NaN ? timeLimit : 0}
          min={0}
          max={val && val !== 0 ? val * 60 : 1}
          size="5rem"
          color="green.400"
        >
          <CircularProgressLabel />
        </CircularProgress>

        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          value={val !== null ? val : 0}
          defaultValue={0}
          isReadOnly={isReadOnly}
          onChange={(value) => setVal(Number(value))}
        >
          <NumberInputField />
          <NumberInputStepper className="number-input-stepper">
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={() => activateCountdown()}>Submit</Button>
      </HStack>
    </>
  );
  // User sets time limit. Progress bar indicates how much time they have left. When time is up, lock the text editor. But ofc, give the user the option to unlock it if they want to.
}
