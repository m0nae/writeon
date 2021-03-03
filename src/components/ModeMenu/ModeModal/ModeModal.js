import React, {useContext} from "react";
import styles from "../mode-menu.module.scss";

import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from "@chakra-ui/react";

import { ModeContext } from "../../../contexts/ModeContext";
import { PromptMode } from "../../WritingModes/PromptMode/index";
import { TimeLimitContext } from "../../../contexts/TimeLimitContext";
import { TimeLimitMode } from "../../WritingModes/TimeLimitMode/index";
import { WordCountMode } from "../../WritingModes/WordCountMode/index";

export function ModeModal({ isOpen, onClose, mode, quillEditor }) {
  const {
    modeDispatch,
    toggledSwitches,
    numberInputRef,
    getWords,
  } = useContext(ModeContext);
  const { activateCountdown } = useContext(TimeLimitContext);

  function handleModalCancel(mode) {
    onClose();

    if (toggledSwitches.includes(mode)) {
      const newToggledSwitches = toggledSwitches.filter(
        (toggledSwitch) => toggledSwitch !== mode
      );

      modeDispatch({ type: "toggledSwitches", payload: newToggledSwitches });
    }
  }

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => handleModalCancel(mode)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mode === "timeLimitMode" && "Time Limit Mode"}
            {mode === "wordCountMode" && "Word Count Mode"}
            {mode === "promptMode" && "Random Words Mode"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Try making this into just one component and have them change based on currently active mode */}
            {mode === "timeLimitMode" && (
              <div>
                <Box>
                  <Text mt="8" textAlign="center">
                    TIME LIMIT MODE.
                  </Text>
                  <Box className={styles['modal-body']}>
                    <TimeLimitMode />
                  </Box>
                </Box>
              </div>
            )}
            {mode === "wordCountMode" && (
              <div>
                <Box mt="8">
                  <Center>
                    <WordCountMode quillEditor={quillEditor} />
                  </Center>
                </Box>
              </div>
            )}
            {mode === "promptMode" && (
              <div>
                <PromptMode />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleModalCancel(mode)}
            >
              Close
            </Button>
            {mode === "wordCountMode" && (
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  modeDispatch({
                    type: "wordCountGoal",
                    payload: numberInputRef.current.firstChild.value,
                  });
                }}
              >
                Set Word Count
              </Button>
            )}
            {mode === "promptMode" && (
              <Button
                onClick={() => {
                  onClose();
                  getWords();
                }}
              >
                Generate Words
              </Button>
            )}
            {mode === "timeLimitMode" && (
              <Button
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