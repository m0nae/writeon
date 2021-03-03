import styles from "./mode-menu.module.scss"
import {
  Box,
  Button,
  Center,
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
} from "@chakra-ui/react";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import React, { useContext } from "react";

import { ModeContext } from "../../contexts/ModeContext";
import { ModeMenuItem } from "./ModeMenuItem/ModeMenuItem.js";
import { ModeModal } from "./ModeModal/ModeModal.js";
import { PromptMode } from "../WritingModes/PromptMode";
import { TimeLimitContext } from "../../contexts/TimeLimitContext";
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
        >
        {( {isOpen} ) => (
          <>
        <MenuButton
          as={Button}
          isActive={isOpen}
          variant="outline"
          rightIcon={isOpen ? <MdExpandMore /> : <MdChevronRight />}
          className={styles['dropdown-menu']}
        >
          Modes
        </MenuButton>
        <MenuList>
          <div>
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
        </>
        )}
      </Menu>
      <ModeModal mode={mode} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

