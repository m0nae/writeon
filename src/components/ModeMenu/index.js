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
  ButtonGroup,
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
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  }

  return (
    <>
      <Menu className="dropdown" closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<MdChevronRight />}>
          Actions
        </MenuButton>
        <MenuList style={{ height: menuHeight }} className="dropdown">
          <CSSTransition
            in={activeMenu === "main"}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="main-menu">
              <MenuItem onClick={() => setActiveMenu("timeLimitMode")}>
                <Text>Time Limit Mode</Text>
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
              <MenuItem onClick={() => setActiveMenu("wordCountMode")}>
                Word Count Mode
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
              <MenuItem onClick={() => setActiveMenu("randomWordsMode")}>
                Random Words
                <Box pos="absolute" ml="80%">
                  <MdChevronRight />
                </Box>
              </MenuItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "timeLimitMode"}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
              <MenuTopBar
                mode={mode}
                dispatch={dispatch}
                selectedMode="timeLimitMode"
                setActiveMenu={setActiveMenu}
              />
              <Box>
                <Text mt="8" textAlign="center">
                  TIME LIMIT MODE.
                  <Box textAlign="center">
                    <TimeLimitMode mode={mode} />
                  </Box>
                </Text>
              </Box>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "wordCountMode"}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
              <MenuTopBar
                mode={mode}
                dispatch={dispatch}
                selectedMode="wordCountMode"
                setActiveMenu={setActiveMenu}
              />
              <Box mt="8">
                <Center>
                  <WordCountMode
                    dispatch={dispatch}
                    quillEditor={quillEditor}
                  />
                </Center>
              </Box>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "randomWordsMode"}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu-container">
              <MenuTopBar
                mode={mode}
                dispatch={dispatch}
                selectedMode="promptMode"
                setActiveMenu={setActiveMenu}
              />
              <Text mt="8" textAlign="center">
                RANDOM WORDS MODE.
                <PromptMode mode={mode} />
              </Text>
            </div>
          </CSSTransition>
        </MenuList>
      </Menu>
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
