'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import TopBar from './TopBar';
import LeftControlBar from './LeftControlBar';
import TimerPage from './TimerPage';

interface Props {
  appName: string;
  task: string;
  focus: string;
  clockMode: string;
  fullScreen: string;
}

function MainApp(props: Props) {
  const defaultTask = props.task;
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTag, setSelectedTag] = useState(0);
  const [time, setTime] = useState(1500);
  const handleFullScreen = useFullScreenHandle();

  const onVideoReady = () => {
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
    url: 'https://www.youtube.com/watch?v=U_KrN18SOYk',
    onVideoReady,
    onVideoEnded,
    onVideoError,
    onVideoProgress,
  };

  return (
    <FullScreen handle={handleFullScreen}>
      <div className={`${style.top} ${isReady ? '' : style.hidden}`}>
        <LeftControlBar
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <Window className={`${style.mainWindow} `}>
          <TopBar appName={props.appName} />
          <TimerPage
            time={time}
            setTime={setTime}
            defaultTask={defaultTask}
            setIsPlaying={setIsPlaying}
            handleFullScreen={handleFullScreen}
            {...props}
          />
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
