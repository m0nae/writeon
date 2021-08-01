import { useContext } from 'react';
import styles from '../mode-menu.module.scss';
import { Box, MenuItem, Switch, Text } from '@chakra-ui/react';
import { ModeContext } from '../../../contexts/ModeContext';
import { TimeLimitContext } from '../../../contexts/TimeLimitContext';

export function ModeMenuItem({ onOpen, currentMode, text }) {
  const { modeDispatch, toggledSwitches } = useContext(ModeContext);
  const { timeLimitDispatch } = useContext(TimeLimitContext);

  function handleClick() {
    if (isToggled) {
      modeDispatch({ type: 'mode', payload: currentMode });
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
        type: 'toggledSwitches',
        payload: [...toggledSwitches, currentMode]
      });

      handleClick();
    } else {
      const newToggledSwitches = toggledSwitches.filter(
        (toggledSwitch) => toggledSwitch !== currentMode
      );

      modeDispatch({
        type: 'toggledSwitches',
        payload: newToggledSwitches
      });

      switch (currentMode) {
        case 'wordCountMode':
          modeDispatch({ type: 'wordCountGoal', payload: null });
          break;
        case 'timeLimitMode':
          timeLimitDispatch({ type: 'timeLimit', payload: null });
          timeLimitDispatch({
            type: 'isCountdownActive',
            payload: false
          });
          timeLimitDispatch({ type: 'count', payload: null });
          break;
        case 'promptMode':
          modeDispatch({ type: 'words', payload: [] });
          modeDispatch({ type: 'promptModeError', payload: null });
          modeDispatch({ type: 'numberOfWords', payload: 0 });
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <MenuItem isDisabled={!isToggled()} onClick={() => handleClick()}>
        <Text>{text}</Text>
      </MenuItem>
      <Box className={styles['toggle-container']}>
        <Switch isChecked={isToggled()} onChange={() => handleToggle()} />
      </Box>
    </>
  );
}
