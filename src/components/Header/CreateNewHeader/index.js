import styles from "../header.module.scss";
import {
  Flex,
  Box,
  Button,
  Spacer,
  HStack,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";

import { BsThreeDots } from "react-icons/bs";
import { MdChevronLeft } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

import { DropdownModeMenu } from "../../ModeMenu"

export function CreateNewHeader({...props}) {
  const {
    words,
    mode,
    handleTimeLimitMode,
    timeLimitMode,
    wordCountMode,
    promptMode,
    wordCount,
    wordCountGoal,
    quillEditor,
    modeDispatch,
    updatePostLoading,
    onSaveClick,
    onBackBtnClick,
    onAlertClick
  } = props;

  return (
    <Flex className={styles['create-new']}>
        <Box cursor="pointer" onClick={onBackBtnClick}>
              <MdChevronLeft className="editor-left-chevron" />
        </Box>

          <Button
            aria-label="Save Post" 
            className={styles['save-btn']}
            size="md"
            variant="outline"
            isLoading={updatePostLoading}
            loadingText="Saving..."
            onClick={onSaveClick}
          >
            Save
          </Button>
          <IconButton
            aria-label="Save Post" 
            isRound 
            isLoading={updatePostLoading}
            variant="outline" 
            size="lg" 
            icon={<IoIosSave className={styles['save-icon']}/>} 
            onClick={onSaveClick}
            className={styles['save-btn-mobile']}
          />

          <Spacer />

          {words.length > 0 && (
            <>
              <Box className={styles['words-container']} alignSelf="center">
                <HStack alignSelf="center" className={styles['words-list']}>
                  {words.map((word, index) => (
                    // <Tag className={styles['word-tag']} key={index} id={index}>
                    <div className={styles['word-tag']}> {word} </div>
                 
                  ))}
                </HStack>
              </Box>
              {/* <Box className={styles['words-fade-box']}></Box> */}
              {/* <Spacer className={styles['words-fade']} /> */}
            </>
          )}

          <DropdownModeMenu
            mode={mode}
            handleTimeLimitMode={handleTimeLimitMode}
            timeLimitMode={timeLimitMode}
            wordCountMode={wordCountMode}
            promptMode={promptMode}
            wordCount={wordCount}
            wordCountGoal={wordCountGoal}
            modeDispatch={modeDispatch}
            quillEditor={quillEditor}
          />

          <Menu>
            <MenuButton
              aria-label="More Menu"
              text="More Menu"
              as={IconButton}
              icon={<BsThreeDots className={styles['menu-icon']} />}
              variant="unstyled"
              style={{ width: "50px" }}
              // className="menu-icon"
            />
            <MenuList>
              <MenuItem onClick={onAlertClick}>Delete Post</MenuItem>
            </MenuList>
          </Menu>
    </Flex>
  )
}