import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Button from '../general/Button';
import ButtonGroup from '../general/ButtonGroup';

export interface StartingScreenBtnsText {
  startingScreenBtns: {
    focus: string;
    clockMode: string;
    fullScreen: string;
  };
}

export interface StartingScreenBtnsProps extends StartingScreenBtnsText {
  toggleFullScreen: () => void;
  startFocus: () => void;
  startClockMode: () => void;
}

function StartingScreenBtns({
  toggleFullScreen,
  startFocus,
  startingScreenBtns,
  startClockMode,
}: StartingScreenBtnsProps) {
  return (
    <ButtonGroup hideBackground>
      <Button
        label={startingScreenBtns.focus}
        icon={PlayCircleFilledWhiteIcon}
        onClick={startFocus}
      />
      <Button
        label={startingScreenBtns.clockMode}
        icon={WatchLaterIcon}
        onClick={startClockMode}
      />
      <Button
        label={startingScreenBtns.fullScreen}
        icon={FullscreenIcon}
        onClick={toggleFullScreen}
      />
    </ButtonGroup>
  );
}

export default StartingScreenBtns;
