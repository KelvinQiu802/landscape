'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

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
    url: 'https://www.youtube.com/watch?v=u9vK5utTcxE',
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
          <button onClick={() => setIsPlaying((prev) => !prev)}>Play</button>
          <button onClick={() => setIsMuted((prev) => !prev)}>Mute</button>
          <button onClick={toggleFullScreen}>FullScreen</button>
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
