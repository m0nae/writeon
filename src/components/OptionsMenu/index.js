import React, { useContext } from "react";
import styles from "./options-menu.module.scss";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton
} from "@chakra-ui/react";

import {BsThreeDots} from "react-icons/bs"
import { OptionsMenuContext } from "../../contexts/OptionsMenuContext";

export function OptionsMenu(props) {
  const {setIsDeleteAlertOpen } = useContext(OptionsMenuContext)
  return (
    <>
    <Menu>
      <MenuButton
        aria-label="More Menu"
        text="More Menu"
        as={IconButton}
        icon={props.menuIcon}
        variant="unstyled"
        // style={{ width: "50px" }}
        className={props.menuButton}
        onClick={(e) => {
          e.stopPropagation();
          props.setClickedPostId();
        }}
      />
      <MenuList>
        <MenuItem onClick={(e) => {
          e.stopPropagation();
          setIsDeleteAlertOpen(true);
          }}>
            Delete Post
          </MenuItem>
      </MenuList>
      </Menu>
    </>
  )
}