import FlagIcon from '@mui/icons-material/Flag';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Dispatch, SetStateAction } from 'react';
import Button from '../general/Button';
import ButtonGroup from '../general/ButtonGroup';

export interface FocusScreenBtnsText {
  focusScreenBtns: {
    finish: string;
    pause: string;
    resume: string;
    mute: string;
    unmute: string;
    fullScreen: string;
  };
}

export interface FocusScreenBtnsProps extends FocusScreenBtnsText {
  finishFocus: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  toggleMute: () => void;
  pause: () => void;
  resume: () => void;
  toggleFullScreen: () => void;
}

function FocusScreenBtns({ focusScreenBtns, ...props }: FocusScreenBtnsProps) {
  return (
    <ButtonGroup>
      <Button
        label={focusScreenBtns.finish}
        icon={FlagIcon}
        onClick={props.finishFocus}
      />
      {props.isPlaying ? (
        <Button
          label={focusScreenBtns.pause}
          icon={PauseCircleIcon}
          onClick={() => {
            props.pause(); // pause the timer
            props.setIsPlaying(false); // pause the video
          }}
        />
      ) : (
        <Button
          label={focusScreenBtns.resume}
          icon={PlayCircleIcon}
          onClick={() => {
            props.resume(); // resume the timer
            props.setIsPlaying(true); // resume the video
          }}
        />
      )}
      {props.isMuted ? (
        <Button
          label={focusScreenBtns.unmute}
          icon={VolumeUpIcon}
          onClick={props.toggleMute}
        />
      ) : (
        <Button
          label={focusScreenBtns.mute}
          icon={VolumeOffIcon}
          onClick={props.toggleMute}
        />
      )}
      <Button
        label={focusScreenBtns.fullScreen}
        icon={FullscreenIcon}
        onClick={props.toggleFullScreen}
      />
    </ButtonGroup>
  );
}

export default FocusScreenBtns;
