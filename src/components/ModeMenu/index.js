import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuCommand,
  MenuDivider,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import React, { useContext, useRef, useState } from "react";

import { CSSTransition } from "react-transition-group";
import { FaLightbulb } from "react-icons/fa";
import { ModeContext } from "../../ModeContext";
import { PromptMode } from "../WritingModes/PromptMode";
import { HiOutlineChevronRight as RightChevron } from "react-icons/hi";
import { TimeLimitContext } from "../../TimeLimitContext";
import { TimeLimitMode } from "../WritingModes/TimeLimitMode";
import { WordCountMode } from "../WritingModes/WordCountMode";

export function DropdownModeMenu() {
  const { mode, isOpen, onOpen, onClose } = useContext(ModeContext);
  const isModalOpen = isOpen;

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

//TODO: have a separate modal for each mode, instead of dynamically rendering modes based on which is in the "mode" state. Doing this will ensure that whenever the modal closes, the mode won't deactivate... have modes activate/deactivate based on the toggles!!!

// ! ^ actually, just discovered that only TIME LIMIT MODE deactivates when the modal closes. i think that's because the setInterval hook stops whenever the mode is not actively present/rendered. is there a way to fix this???

function ModeModal({ isOpen, onClose, mode, quillEditor }) {
  const {
    modeDispatch,
    toggledSwitches,
    numberInputRef,
    getWords,
  } = useContext(ModeContext);
  const { timeLimitDispatch, activateCountdown } = useContext(TimeLimitContext);

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
  const { timeLimitDispatch, timeLimit, isCountdownActive, count } = useContext(
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
