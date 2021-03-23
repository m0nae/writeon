import styles from '../header.module.scss';
import { Flex, Box, Button, HStack, IconButton } from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import { MdChevronLeft } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';

import { OptionsMenu } from '../../OptionsMenu';
import { DropdownModeMenu } from '../../ModeMenu';

export function CreateNewHeader({ ...props }) {
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
      <div className={styles['left-header']}>
        <Box cursor="pointer" onClick={onBackBtnClick}>
          <MdChevronLeft className={styles['editor-left-chevron']} />
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
          icon={<IoIosSave className={styles['save-icon']} />}
          onClick={onSaveClick}
          className={styles['save-btn-mobile']}
        />
      </div>

      {words.length > 0 && (
        <>
          <Box className={styles['words-container']} alignSelf="center">
            <HStack alignSelf="center" className={styles['words-list']}>
              {words.map((word, index) => (
                <div key={index} className={styles['word-tag']}>
                  {' '}
                  {word}{' '}
                </div>
              ))}
            </HStack>
          </Box>
        </>
      )}

      <div className={styles['right-header']}>
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

        <OptionsMenu
          menuIcon={<BsThreeDots className={styles['menu-icon']} />}
          onAlertClick={onAlertClick}
        />
      </div>
    </Flex>
  );
}
