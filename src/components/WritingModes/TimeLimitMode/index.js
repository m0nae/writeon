import {
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import { HStack } from "@chakra-ui/react";
import { TimeLimitContext } from "../../../TimeLimitContext";
import { useToast } from "@chakra-ui/react";

export function TimeLimitMode() {
  const {
    numberInputRef,
    isCountdownActive,
    count,
  } = useContext(TimeLimitContext);

  //TODO: put toast inside of CreateNew component bc it only displays if the TimeLimitMode is rendered in the modal. That doesn't make sense ofc.

  const toast = useToast();

  useEffect(() => {
    if (count === 0) {
      toast({
        title: "Time is up!",
        duration: 10000,
        status: "info",
        isClosable: true,
      });
    }
  }, [count]);

  return (
    <>
      <HStack spacing="10px">
        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          defaultValue={0}
          isDisabled={isCountdownActive}
        >
          <NumberInputField ref={numberInputRef} />
        </NumberInput>
      </HStack>
    </>
  );
  // User sets time limit. Progress bar indicates how much time they have left. When time is up, lock the text editor. But ofc, give the user the option to unlock it if they want to.
}
