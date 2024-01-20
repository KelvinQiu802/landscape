'use client';

import { OnProgressProps } from 'react-player/base';
import style from './MainApp.module.css';
import VideoBackground, { VideoProps } from './VideoBackground';

interface Props {
  onVideoReady: () => void;
  onVideoEnded: () => void;
  onVideoError: () => void;
  onVideoProgress: (state: OnProgressProps) => void;
  videoConfig: VideoProps;
  mouseAccess: boolean;
}

function VideoPlayerWrapper({
  onVideoEnded,
  onVideoError,
  onVideoProgress,
  onVideoReady,
  mouseAccess,
  videoConfig,
}: Props) {
  return (
    <div className={`${style.video} ${!mouseAccess && style.disabledMouse}`}>
      <VideoBackground {...videoConfig} />
    </div>
  );
}

export default VideoPlayerWrapper;
