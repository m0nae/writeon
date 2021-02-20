import {
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import { HStack } from "@chakra-ui/react";
import { TimeLimitContext } from "../../../TimeLimitContext";
import { useToast } from "@chakra-ui/react";

export function TimeLimitMode() {
  // const [timeLimit, setTimeLimit] = useState(null);
  // const [isCountdownActive, setIsCountdownActive] = useState(false);
  // const [count, setCount] = useState(null);
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

  // function activateCountdown() {
  //   const value = numberInputRef.current.value;

  //   if (value <= 0) {
  //     return;
  //   }

  //   // setTimeLimit(value * 60);
  //   // setCount(value * 60 + 1);

  //   // setIsCountdownActive(true);

  //   timeLimitDispatch({ type: "timeLimit", payload: value * 60 });
  //   timeLimitDispatch({ type: "count", payload: value * 60 + 1 });
  //   timeLimitDispatch({ type: "isCountdownActive", payload: true });
  // }

  return (
    <>
      <HStack spacing="10px">
        {/* <CircularProgress
          value={count && count !== NaN ? count : 0}
          min={0}
          max={timeLimit && timeLimit !== 0 ? timeLimit : 1}
          size="5rem"
          color="green.400"
        >
          <CircularProgressLabel />
        </CircularProgress> */}

        <NumberInput
          allowMouseWheel
          size="md"
          maxW={24}
          min={0}
          // value={val !== null ? val : 0}
          defaultValue={0}
          isDisabled={isCountdownActive}
          // onChange={(value) => setVal(Number(value))}
          // onChange={(value) => console.log(Number(value))}
          // console.log(numberInputRef)
        >
          <NumberInputField ref={numberInputRef} />
          {/* <NumberInputStepper className="number-input-stepper">
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper> */}
        </NumberInput>
        {/* <Button onClick={() => activateCountdown()}>Submit</Button> */}
      </HStack>
    </>
  );
  // User sets time limit. Progress bar indicates how much time they have left. When time is up, lock the text editor. But ofc, give the user the option to unlock it if they want to.
}
