'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ButtonGroup from './general/ButtonGroup';
import Button from './general/Button';

import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

interface Props {
  'window-title': string;
}

function MainApp(props: Props) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const timer = '25:00';

  const handleFullScreen = useFullScreenHandle();

  const toggleFullScreen = () => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  };

  const onVideoReady = () => {
    console.log('Ready');
    setIsReady(true);
  };
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};

  const mouseAccess = false;
  const videoConfig: VideoProps = {
    playing: isPlaying,
    mute: isMuted,
    loop: false,
    controls: false,
    volume: 1,
    url: 'https://www.youtube.com/watch?v=p52rNK_7nsg',
    onVideoReady,
    onVideoEnded,
    onVideoError,
    onVideoProgress,
  };

  return (
    <FullScreen handle={handleFullScreen}>
      <div className={style.top}>
        <Window
          className={`${style.mainWindow} ${isReady ? '' : style.hidden}`}
        >
          <div className="window-title">{props['window-title']}</div>
          <div className={style.central}>
            <div className={style.timer}>
              <Button icon={Remove} />
              <h1 className={style.time}>{timer}</h1>
              <Button icon={Add} />
            </div>
            <ButtonGroup hideBackground>
              <Button
                label="Focus"
                icon={PlayCircleFilledWhiteIcon}
                onClick={() => setIsPlaying((prev) => !prev)}
              />
              <Button label="Clock Mode" icon={WatchLaterIcon} />
              {/* <Button
                label="Mute"
                onClick={() => setIsMuted((prev) => !prev)}
              /> */}
              <Button
                label="Full Screen"
                icon={FullscreenIcon}
                onClick={toggleFullScreen}
              />
            </ButtonGroup>
          </div>
        </Window>
      </div>
      <VideoPlayerWrapper
        onVideoEnded={onVideoEnded}
        onVideoError={onVideoError}
        onVideoProgress={onVideoProgress}
        onVideoReady={onVideoReady}
        videoConfig={videoConfig}
        mouseAccess={mouseAccess}
      />
    </FullScreen>
  );
}

export default MainApp;
