import React from 'react';
import ButtonGroup from '../general/ButtonGroup';
import Button from '../general/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export interface ClockModeBtnsText {
  clockModeText: {
    eixt: string;
    hideButtons: string;
    fullScreen: string;
  };
}

export interface ClockModeBtnsProps extends ClockModeBtnsText {
  exitClockMode: () => void;
  hideClockBtns: () => void;
  toggleFullScreen: () => void;
}

function ClockModeBtns({ clockModeText, ...props }: ClockModeBtnsProps) {
  return (
    <ButtonGroup>
      <Button
        label={clockModeText.eixt}
        icon={ExitToAppIcon}
        onClick={props.exitClockMode}
      />
      <Button
        label={clockModeText.hideButtons}
        icon={KeyboardHideIcon}
        onClick={props.hideClockBtns}
      />
      <Button
        label={clockModeText.fullScreen}
        icon={FullscreenIcon}
        onClick={props.toggleFullScreen}
      />
    </ButtonGroup>
  );
}

export default ClockModeBtns;
