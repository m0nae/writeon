import React, { useRef, useState } from "react";
import { WordCountMode } from "../WritingModes/WordCountMode";
import { TimeLimitMode } from "../WritingModes/TimeLimitMode";
import { PromptMode } from "../WritingModes/PromptMode";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
  Switch,
  Button,
  HStack,
  Box,
  Text,
  Center,
  useDisclosure,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { FaLightbulb } from "react-icons/fa";
import { HiOutlineChevronRight as RightChevron } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";

import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";

export function DropdownModeMenu({
  handleTimeLimitMode,
  mode,
  quillEditor,
  timeLimitMode,
  wordCountMode,
  promptMode,
  wordCount,
  wordCountGoal,
  dispatch,
}) {
  const [toggledSwitches, setToggledSwitches] = useState([]);

  // useDisclosure() is for the modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isModalOpen = isOpen;

  const menuList = useRef;

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
          Actions
        </MenuButton>
        <MenuList ref={menuList} className="dropdown">
          <div className="main-menu">
            <ModeMenuItem
              currentMode="timeLimitMode"
              dispatch={dispatch}
              onOpen={onOpen}
              text="Time Limit Mode"
              toggledSwitches={toggledSwitches}
              setToggledSwitches={setToggledSwitches}
            />

            <ModeMenuItem
              currentMode="wordCountMode"
              dispatch={dispatch}
              onOpen={onOpen}
              text="Word Count Mode"
              toggledSwitches={toggledSwitches}
              setToggledSwitches={setToggledSwitches}
            />

            <ModeMenuItem
              currentMode="promptMode"
              dispatch={dispatch}
              onOpen={onOpen}
              text="Prompt Mode"
              toggledSwitches={toggledSwitches}
              setToggledSwitches={setToggledSwitches}
            />
          </div>
        </MenuList>
      </Menu>
      <ModeModal
        menuList={menuList}
        mode={mode}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

// TODO: Separate this component into its own file
function ModeModal({ isOpen, onClose, mode, quillEditor, dispatch, menuList }) {
  return (
    <>
      {/* //TODO: for the Modal, if more than one toggle is active, set closeonOverlayClick to FALSE. if just one, set to TRUE. create state that whenever a toggle is ON, it adds it to some sort of array/adds a number counter. put that state in the CREATENEW (parent) component */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={menuList}
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
                    <TimeLimitMode mode={mode} />
                  </Box>
                </Box>
              </div>
            )}
            {mode === "wordCountMode" && (
              <div className="menu-container">
                <Box mt="8">
                  <Center>
                    <WordCountMode
                      dispatch={dispatch}
                      quillEditor={quillEditor}
                    />
                  </Center>
                </Box>
              </div>
            )}
            {mode === "promptMode" && (
              <div className="menu-container">
                <Text mt="8" textAlign="center">
                  RANDOM WORDS MODE.
                </Text>
                <PromptMode mode={mode} />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {/* //TODO: If CANCEL/CLOSE is clicked, reset the respective toggle BACK TO FALSE/UNTOGGLE */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// TODO: Separate this component into its own file
function ModeMenuItem({
  onOpen,
  dispatch,
  currentMode,
  text,
  toggledSwitches,
  setToggledSwitches,
}) {
  // const [isToggled, setIsToggled] = useState(false);

  function handleClick() {
    if (isToggled) {
      dispatch({ type: "mode", payload: currentMode });
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
      setToggledSwitches([...toggledSwitches, currentMode]);

      handleClick();
    } else {
      const newToggledSwitches = toggledSwitches.filter(
        (toggledSwitch) => toggledSwitch !== currentMode
      );

      setToggledSwitches(newToggledSwitches);
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

function MenuTopBar({ mode, selectedMode, setActiveMenu, dispatch }) {
  return (
    <HStack spacing="60%">
      <Box>
        <IconButton
          variant="outlined"
          icon={<MdChevronLeft />}
          onClick={() => setActiveMenu("main")}
        />
      </Box>
      <Switch
        onChange={() =>
          dispatch({
            type: "mode",
            payload: mode === selectedMode ? !selectedMode : selectedMode,
          })
        }
      />
    </HStack>
  );
}
