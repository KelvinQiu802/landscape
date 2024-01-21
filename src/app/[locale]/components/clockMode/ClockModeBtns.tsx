import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '../general/Button';
import ButtonGroup from '../general/ButtonGroup';

export interface ClockModeBtnsText {
  clockModeText: {
    eixt: string;
    hideButtons: string;
    fullScreen: string;
    mute: string;
    unmute: string;
  };
}

export interface ClockModeBtnsProps extends ClockModeBtnsText {
  exitClockMode: () => void;
  hideClockBtns: () => void;
  toggleFullScreen: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  corner?: boolean;
}

function ClockModeBtns({ clockModeText, ...props }: ClockModeBtnsProps) {
  return props.corner ? (
    <ButtonGroup>
      <Button icon={ExitToAppIcon} onClick={props.exitClockMode} />
      {props.isMuted ? (
        <Button icon={VolumeUpIcon} onClick={props.toggleMute} />
      ) : (
        <Button icon={VolumeOffIcon} onClick={props.toggleMute} />
      )}
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
      {props.isMuted ? (
        <Button
          label={clockModeText.unmute}
          icon={VolumeUpIcon}
          onClick={props.toggleMute}
        />
      ) : (
        <Button
          label={clockModeText.mute}
          icon={VolumeOffIcon}
          onClick={props.toggleMute}
        />
      )}
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
