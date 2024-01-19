import React, { Dispatch, SetStateAction } from 'react';
import ButtonGroup from './general/ButtonGroup';
import Button from './general/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { FullScreenHandle } from 'react-full-screen';

interface Props {
  handleFullScreen: FullScreenHandle;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  focus: string;
  clockMode: string;
  fullScreen: string;
}

function StartingScreenBtns({
  handleFullScreen,
  setIsFocus,
  focus,
  clockMode,
  fullScreen,
}: Props) {
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
        label={focus}
        icon={PlayCircleFilledWhiteIcon}
        onClick={() => setIsFocus((prev) => !prev)}
      />
      <Button label={clockMode} icon={WatchLaterIcon} />
      <Button
        label={fullScreen}
        icon={FullscreenIcon}
        onClick={toggleFullScreen}
      />
    </ButtonGroup>
  );
}

export default StartingScreenBtns;
