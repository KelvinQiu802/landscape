import React, { Dispatch, SetStateAction } from 'react';
import ButtonGroup from '../general/ButtonGroup';
import Button from '../general/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { FullScreenHandle } from 'react-full-screen';

export interface StartingScreenBtnsText {
  text: {
    focus: string;
    clockMode: string;
    fullScreen: string;
  };
}

export interface StartingScreenBtnsProps extends StartingScreenBtnsText {
  handleFullScreen: FullScreenHandle;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
}

function StartingScreenBtns({
  handleFullScreen,
  setIsFocus,
  text,
}: StartingScreenBtnsProps) {
  const toggleFullScreen = () => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  };

  return (
    <ButtonGroup hideBackground>
      <Button
        label={text.focus}
        icon={PlayCircleFilledWhiteIcon}
        onClick={() => setIsFocus((prev) => !prev)}
      />
      <Button label={text.clockMode} icon={WatchLaterIcon} />
      <Button
        label={text.fullScreen}
        icon={FullscreenIcon}
        onClick={toggleFullScreen}
      />
    </ButtonGroup>
  );
}

export default StartingScreenBtns;
