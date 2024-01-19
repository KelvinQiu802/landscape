'use client';

import { useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Seperator from './general/Seperator';
import TaskInput from './TaskInput';
import StartingScreenBtns from './StartingScreenBtns';
import Timer from './Timer';
import TopBar from './TopBar';

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
  const [task, setTask] = useState(defaultTask);
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
          <TopBar appName={props.appName} />
          <div className={style.central}>
            <div className={style.task}>
              <TaskInput
                task={task}
                setTask={setTask}
                defaultTask={defaultTask}
              />
              <Seperator width="100%" />
            </div>
            <div className={style.timer}>
              <Timer />
            </div>
            <StartingScreenBtns
              setIsPlaying={setIsPlaying}
              handleFullScreen={handleFullScreen}
              {...props}
            />
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
