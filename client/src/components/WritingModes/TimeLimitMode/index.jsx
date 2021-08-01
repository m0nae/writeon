import { useContext } from 'react';
import styles from '../writing-modes.module.scss';
import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from '@chakra-ui/react';
import { TimeLimitContext } from '../../../contexts/TimeLimitContext';

export function TimeLimitMode() {
  const { timeLimitNumberInputRef, isCountdownActive, count } = useContext(
    TimeLimitContext
  );

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
}
