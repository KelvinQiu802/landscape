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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddLocationIcon from '@mui/icons-material/AddLocation';

interface Props {
  'window-title': string;
}

function MainApp(props: Props) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
            <ButtonGroup hideBackground>
              <Button
                label="Play"
                icon={Add}
                onClick={() => setIsPlaying((prev) => !prev)}
              />
              <Button
                label="Mute"
                icon={AccessTimeIcon}
                onClick={() => setIsMuted((prev) => !prev)}
              />
              <Button label="FullScreen" onClick={toggleFullScreen} />
              <Button icon={AddLocationIcon} />
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
