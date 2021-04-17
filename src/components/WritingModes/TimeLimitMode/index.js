import styles from "../writing-modes.module.scss";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";

import { HStack } from "@chakra-ui/react";
import { TimeLimitContext } from "../../../contexts/TimeLimitContext";
import { useToast } from "@chakra-ui/react";

export function TimeLimitMode() {
  const {
    timeLimitNumberInputRef,
    isCountdownActive,
    count,
  } = useContext(TimeLimitContext);

  return (
    <>
      <HStack spacing="10px">
        <NumberInput
          className={styles['number-input']}
          allowMouseWheel
          size="lg"
          maxW="5rem"
          min={0}
          defaultValue={0}
          isDisabled={isCountdownActive}
        >
          <NumberInputField ref={timeLimitNumberInputRef} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      <Text>minutes</Text>
      </HStack>
    </>
  );
  // User sets time limit. Progress bar indicates how much time they have left. When time is up, lock the text editor. But ofc, give the user the option to unlock it if they want to.
}
