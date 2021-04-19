import React, { useContext } from 'react';
import styles from '../mode-menu.module.scss';
import {
  Box,
  Button,
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { ModeContext } from '../../../contexts/ModeContext';
import { TimeLimitContext } from '../../../contexts/TimeLimitContext';
import { PromptMode } from '../../WritingModes/PromptMode/index';
import { TimeLimitMode } from '../../WritingModes/TimeLimitMode/index';
import { WordCountMode } from '../../WritingModes/WordCountMode/index';

export function ModeModal({ isOpen, onClose, mode, quillEditor }) {
  const {
    modeDispatch,
    toggledSwitches,
    numberInputRef,
    getWords
  } = useContext(ModeContext);
  const { activateCountdown } = useContext(TimeLimitContext);

  function handleModalCancel(mode) {
    onClose();

    if (toggledSwitches.includes(mode)) {
      const newToggledSwitches = toggledSwitches.filter(
        (toggledSwitch) => toggledSwitch !== mode
      );

      modeDispatch({
        type: 'toggledSwitches',
        payload: newToggledSwitches
      });
    }
  }

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => handleModalCancel(mode)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb="0.5rem">
            {mode === 'timeLimitMode' && 'Time Limit Mode'}
            {mode === 'wordCountMode' && 'Word Count Mode'}
            {mode === 'promptMode' && 'Random Words Mode'}
          </ModalHeader>
          <Divider style={{ width: '90%', margin: '0 auto' }} />
          <ModalBody pt="1rem" pb="1rem">
            {mode === 'timeLimitMode' && (
              <div>
                <Text m="0 auto">
                  What would you like your time limit to be set to?
                </Text>
                <Center>
                  <Box className={styles['modal-body']}>
                    <TimeLimitMode />
                  </Box>
                </Center>
              </div>
            )}
            {mode === 'wordCountMode' && (
              <div>
                <Text m="0 auto">
                  What would you like your word count goal to be?
                </Text>
                <Box className={styles['modal-body']}>
                  <Center>
                    <WordCountMode quillEditor={quillEditor} />
                  </Center>
                </Box>
              </div>
            )}
            {mode === 'promptMode' && (
              <div>
                <Text m="0 auto">
                  How many words would you like to generate?
                </Text>
                <Box className={styles['modal-body']}>
                  <Center>
                    <PromptMode />
                  </Center>
                </Box>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => handleModalCancel(mode)}
            >
              Close
            </Button>
            {mode === 'wordCountMode' && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  onClose();
                  modeDispatch({
                    type: 'wordCountGoal',
                    payload: numberInputRef.current.firstChild.value
                  });
                }}
              >
                Set Word Count
              </Button>
            )}
            {mode === 'promptMode' && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  onClose();
                  getWords();
                }}
              >
                Generate
              </Button>
            )}
            {mode === 'timeLimitMode' && (
              <Button
                colorScheme="blue"
                onClick={() => {
                  onClose();
                  activateCountdown();
                }}
              >
                Set Timer
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
