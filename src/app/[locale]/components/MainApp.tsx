'use client';

import { useEffect, useState } from 'react';
import style from './MainApp.module.css';
import Window from './general/Window';
import { OnProgressProps } from 'react-player/base';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import { VideoProps } from './VideoBackground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import TopBar, { TopBarProps } from './starting/TopBar';
import LeftControlBar from './starting/LeftControlBar';
import TimerPage from './starting/TimerPage';
import Zoom from '@mui/material/Zoom';
import { StartingScreenBtnsText } from './starting/StartingScreenBtns';
import FocusScreen from './focusing/FocusScreen';
import { FocusScreenBtnsText } from './focusing/FocusScreenBtns';
import MediaButtons from './general/MediaButtons';
import useCountdown from '@/hooks/useCountdown';

interface Props
  extends TopBarProps,
    StartingScreenBtnsText,
    FocusScreenBtnsText {
  task: string;
}

function MainApp(props: Props) {
  const defaultTask = props.task;
  const [task, setTask] = useState(defaultTask);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTag, setSelectedTag] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [targetTime, setTargetTime] = useState(25 * 60);
  const [displayTime, setDisplayTime] = useState(targetTime);
  const [showStartingScreen, setShowStartingScreen] = useState(true);
  const [showFocusingScreen, setShowFocusingScreen] = useState(false);
  const handleFullScreen = useFullScreenHandle();

  /* set timer */
  const onExpire = () => {
    finishFocus();
  };
  const { totalSeconds, pause, start, resume, isRunning, reset } = useCountdown(
    targetTime,
    onExpire
  );

  /* callbacks */
  const onVideoReady = () => {
    setIsReady(true);
  };
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};
  const removeStartingScreen = () => {
    if (isFocus) {
      /* remove starting and show focusing screen if the focus is start */
      setShowStartingScreen(false);
      setShowFocusingScreen(true);
    }
  };

  const toggleFullScreen = () => {
    if (handleFullScreen.active) {
      handleFullScreen.exit();
    } else {
      handleFullScreen.enter();
    }
  };

  const startFocus = () => {
    setIsFocus(true);
    setIsPlaying(true);
    setShowFocusingScreen(true);
    setShowStartingScreen(false);
    start();
  };

  const finishFocus = () => {
    pause(); // pause the timer
    reset(); // reset the timer
    setTargetTime(25 * 60);
    setIsFocus(false);
    setIsPlaying(false);
    setShowStartingScreen(true);
    setShowFocusingScreen(false);
  };

  /* Youtube config */
  const mouseAccess = false;
  const videoConfig: VideoProps = {
    playing: isPlaying,
    mute: isMuted,
    loop: false,
    controls: false,
    volume: 1,
    url: 'https://www.youtube.com/watch?v=TBu8hw6D63I',
    onVideoReady,
    onVideoEnded,
    onVideoError,
    onVideoProgress,
  };

  useEffect(() => {
    setDisplayTime(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    setDisplayTime(targetTime);
  }, [targetTime]);

  return (
    <FullScreen handle={handleFullScreen}>
      {/* Starting Screen */}
      {showStartingScreen && (
        <Zoom
          in={isReady && !isFocus}
          addEndListener={removeStartingScreen}
          timeout={400}
        >
          <div className={style.top}>
            <LeftControlBar
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
            <Window className={`${style.mainWindow} `}>
              <TopBar appName={props.appName} />
              <TimerPage
                time={displayTime}
                setTime={setTargetTime}
                defaultTask={defaultTask}
                startFocus={startFocus}
                toggleFullScreen={toggleFullScreen}
                startingScreenBtns={props.startingScreenBtns}
                task={task}
                setTask={setTask}
              />
            </Window>
          </div>
        </Zoom>
      )}
      {/* Focusing Screen */}
      {showFocusingScreen && (
        <Zoom in={isReady && isFocus} timeout={400}>
          <div className={style.top}>
            <FocusScreen
              time={displayTime}
              task={task}
              setTask={setTask}
              defaultTask={defaultTask}
              finishFocus={finishFocus}
              isPlaying={isPlaying}
              isMuted={isMuted}
              setIsPlaying={setIsPlaying}
              setIsMuted={setIsMuted}
              pause={pause}
              resume={resume}
              toggleFullScreen={toggleFullScreen}
              focusScreenBtns={props.focusScreenBtns}
            />
            <MediaButtons hideBackground className={style.focusMedia} />
          </div>
        </Zoom>
      )}
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
