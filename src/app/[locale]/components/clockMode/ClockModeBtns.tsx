import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import Button from '../general/Button';
import ButtonGroup from '../general/ButtonGroup';

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
  corner?: boolean;
}

function ClockModeBtns({ clockModeText, ...props }: ClockModeBtnsProps) {
  return props.corner ? (
    <ButtonGroup>
      <Button icon={ExitToAppIcon} onClick={props.exitClockMode} />
      <Button icon={KeyboardHideIcon} onClick={props.hideClockBtns} />
      <Button icon={FullscreenIcon} onClick={props.toggleFullScreen} />
    </ButtonGroup>
  ) : (
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
