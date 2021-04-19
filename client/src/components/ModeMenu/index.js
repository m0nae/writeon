import React, { useContext } from 'react';
import styles from './mode-menu.module.scss';
import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { ModeContext } from '../../contexts/ModeContext';
import { ModeMenuItem } from './ModeMenuItem/ModeMenuItem.js';
import { ModeModal } from './ModeModal/ModeModal.js';

export function DropdownModeMenu() {
  const { mode, isOpen, onOpen, onClose } = useContext(ModeContext);
  const isModalOpen = isOpen;

  return (
    <>
      <Menu closeOnSelect={false} closeOnBlur={isModalOpen ? false : true}>
        {({ isOpen }) => (
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
