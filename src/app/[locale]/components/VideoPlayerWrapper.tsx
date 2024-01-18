'use client';

import React, { useState } from 'react';
import style from './MainApp.module.css';
import VideoBackground from './VideoBackground';
import { OnProgressProps } from 'react-player/base';
import { VideoProps } from './VideoBackground';

interface Props {
  onVideoReady: () => void;
  onVideoEnded: () => void;
  onVideoError: () => void;
  onVideoProgress: (state: OnProgressProps) => void;
}

function VideoPlayerWrapper({
  onVideoEnded,
  onVideoError,
  onVideoProgress,
  onVideoReady,
}: Props) {
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
    <div className={`${style.video} ${!mouseAccess && style.disabledMouse}`}>
      <VideoBackground {...videoConfig} />
    </div>
  );
}

export default VideoPlayerWrapper;
