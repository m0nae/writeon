import React, { useContext } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { OptionsMenuContext } from '../../contexts/OptionsMenuContext';

export function OptionsMenu(props) {
  const { setIsDeleteAlertOpen } = useContext(OptionsMenuContext);
  return (
    <>
      <Menu>
        <MenuButton
          aria-label="More Menu"
          text="More Menu"
          as={IconButton}
          icon={props.menuIcon}
          variant="unstyled"
          className={props.menuButton}
          onClick={(e) => {
            e.stopPropagation();
            if (props.setClickedPostId) {
              props.setClickedPostId();
            }
          }}
        />
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteAlertOpen(true);
            }}
          >
            Delete Post
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
