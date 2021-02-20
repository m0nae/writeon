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
import React, { useContext } from "react";

import { MdChevronRight } from "react-icons/md";
import { ModeContext } from "../../ModeContext";
import { PromptMode } from "../WritingModes/PromptMode";
import { TimeLimitContext } from "../../TimeLimitContext";
import { TimeLimitMode } from "../WritingModes/TimeLimitMode";
import { WordCountMode } from "../WritingModes/WordCountMode";

export function DropdownModeMenu() {
  const { mode, isOpen, onOpen, onClose } = useContext(ModeContext);
  const isModalOpen = isOpen;

  //TODO: when the "modes" dropdown btn is open, change the icon to a chevron down. when closed, make it to a chevron right
  return (
    <>
      <Menu
        closeOnSelect={false}
        closeOnBlur={isModalOpen ? false : true}
        className="dropdown"
      >
        <MenuButton
          as={Button}
          variant="outline"
          rightIcon={<MdChevronRight />}
        >
          Modes
        </MenuButton>
        <MenuList className="dropdown">
          <div className="main-menu">
            <ModeMenuItem
              currentMode="timeLimitMode"
              onOpen={onOpen}
              text="Time Limit Mode"
            />

            <ModeMenuItem
              currentMode="wordCountMode"
              onOpen={onOpen}
              text="Word Count Mode"
            />

            <ModeMenuItem
              currentMode="promptMode"
              onOpen={onOpen}
              text="Prompt Mode"
            />
          </div>
        </MenuList>
      </Menu>
      <ModeModal mode={mode} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

// TODO: Separate this component into its own file

function ModeModal({ isOpen, onClose, mode, quillEditor }) {
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {mode === "timeLimitMode" && (
              <div className="menu-container">
                <Box>
                  <Text mt="8" textAlign="center">
                    TIME LIMIT MODE.
                  </Text>
                  <Box textAlign="center">
                    <TimeLimitMode />
                  </Box>
                </Box>
              </div>
            )}
            {mode === "wordCountMode" && (
              <div className="menu-container">
                <Box mt="8">
                  <Center>
                    <WordCountMode quillEditor={quillEditor} />
                  </Center>
                </Box>
              </div>
            )}
            {mode === "promptMode" && (
              <div className="menu-container">
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

// TODO: Separate this component into its own file
function ModeMenuItem({ onOpen, currentMode, text }) {
  const { modeDispatch, toggledSwitches } = useContext(ModeContext);
  const { timeLimitDispatch } = useContext(
    TimeLimitContext
  );

  function handleClick() {
    if (isToggled) {
      modeDispatch({ type: "mode", payload: currentMode });
      onOpen();
    } else {
      return;
    }
  }

  function isToggled() {
    return toggledSwitches.includes(currentMode);
  }

  function handleToggle() {
    if (!toggledSwitches.includes(currentMode)) {
      modeDispatch({
        type: "toggledSwitches",
        payload: [...toggledSwitches, currentMode],
      });

      handleClick();
    } else {
      const newToggledSwitches = toggledSwitches.filter(
        (toggledSwitch) => toggledSwitch !== currentMode
      );

      modeDispatch({ type: "toggledSwitches", payload: newToggledSwitches });

      switch (currentMode) {
        case "wordCountMode":
          modeDispatch({ type: "wordCountGoal", payload: null });
          break;
        case "timeLimitMode":
          timeLimitDispatch({ type: "timeLimit", payload: null });
          timeLimitDispatch({ type: "isCountdownActive", payload: false });
          timeLimitDispatch({ type: "count", payload: null });
          break;
        case "promptMode":
          modeDispatch({ type: "words", payload: [] });
          modeDispatch({ type: "promptModeError", payload: null });
          modeDispatch({ type: "numberOfWords", payload: 0 });
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <MenuItem isDisabled={!isToggled()} onClick={() => handleClick()}>
        <Text>{text}</Text>
      </MenuItem>
      <Box pos="absolute" mt="-14%" ml="77%">
        <Switch isChecked={isToggled()} onChange={() => handleToggle()} />
      </Box>
    </>
  );
}
