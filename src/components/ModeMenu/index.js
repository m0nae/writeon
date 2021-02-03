import React, { useRef, useState } from "react";
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
  ButtonGroup,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { FaLightbulb } from "react-icons/fa";
import { HiOutlineChevronRight as RightChevron } from "react-icons/hi";

export function ModeMenu({
  handleTimeLimitMode,
  timeLimitMode,
  wordCountMode,
  promptMode,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const initialFocus = useRef();

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={IconButton} rightIcon={<FaLightbulb />} />
        <MenuList>
          <MenuItem>
            {/* if timeLimitMode is true, render a chevron icon and make the menu item hoverable and on hover, display tooltip*/}
            Time Limit
          </MenuItem>
          <MenuItem>Random Words</MenuItem>
          <MenuItem>Word Count</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

function Info() {
  return (
    <>
      <p>This is some text.</p>
      <p>And more text here.</p>
    </>
  );
}
