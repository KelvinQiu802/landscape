'use client';

import VideoBackground, { VideoProps } from './VideoBackground';
import { OnProgressProps } from 'react-player/base';
import style from './MainApp.module.css';

export default function MainApp() {
  const onVideoReady = () => {};
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};

  const mouseAccess = false;

  const videoConfig: VideoProps = {
    playing: true,
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
    <div className={`${style.video} ${!mouseAccess && style.disabledMouse}`}>
      <VideoBackground {...videoConfig} />
    </div>
  );
}
