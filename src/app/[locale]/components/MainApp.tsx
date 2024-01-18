'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';

interface Props {
  'window-title': string;
}

function MainApp(props: Props) {
  const [isReady, setIsReady] = useState(false);

  const onVideoReady = () => {
    setIsReady(true);
  };
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};

  return (
    <>
      <div className={style.top}>
        <Window className={style.mainWindow}>
          <div className="window-title">{props['window-title']}</div>
        </Window>
      </div>
      <VideoPlayerWrapper
        onVideoEnded={onVideoEnded}
        onVideoError={onVideoError}
        onVideoProgress={onVideoProgress}
        onVideoReady={onVideoReady}
      />
    </>
  );
}

export default MainApp;
