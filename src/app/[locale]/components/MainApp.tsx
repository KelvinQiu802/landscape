'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';

interface Props {
  'window-title': string;
}

function MainApp(props: Props) {
  const [isReady, setIsReady] = useState(false);

  const onVideoReady = () => {
    console.log('Ready');
    setIsReady(true);
  };
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};

  const mouseAccess = false;
  const videoConfig: VideoProps = {
    playing: false,
    mute: true,
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
    <>
      <div className={style.top}>
        <Window
          className={`${style.mainWindow} ${isReady ? '' : style.hidden}`}
        >
          <div className="window-title">{props['window-title']}</div>
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
    </>
  );
}

export default MainApp;
