/* eslint-disable react-hooks/exhaustive-deps */
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
import TimerPage, { TimerPageProps } from './starting/TimerPage';
import { useTimer } from 'react-timer-hook';
import { Fade } from '@mui/material';
import { StartingScreenBtnsText } from './starting/StartingScreenBtns';

interface Props extends TopBarProps, StartingScreenBtnsText {
  task: string;
}

function MainApp(props: Props) {
  const defaultTask = props.task;
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTag, setSelectedTag] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [time, setTime] = useState(1500);
  const [showStartingScreen, setShowStartingScreen] = useState(true);
  const [showFocusingScreen, setShowFocusingScreen] = useState(false);
  const handleFullScreen = useFullScreenHandle();

  /* set timer */
  const date = new Date();
  date.setSeconds(date.getSeconds() + time);
  const onExpire = () => {
    alert('Time Up');
  };
  const { totalSeconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: date,
    onExpire,
    autoStart: false,
  });

  /* callbacks */
  const onVideoReady = () => {
    setIsReady(true);
  };
  const onVideoProgress = (state: OnProgressProps) => {};
  const onVideoEnded = () => {};
  const onVideoError = () => {};

  /* Youtube config */
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

  useEffect(() => {
    if (isFocus) {
      /* start a focus */
      setIsPlaying(true);
      start();
    } else {
      /* end a focus */
      setIsPlaying(false);
      pause(); // pause the timer
      const newTime = 25 * 60; // TODO: change time to preference time
      setTime(newTime);
      const date = new Date();
      date.setSeconds(date.getSeconds() + newTime);
      restart(date, false); // reset the timer
    }
  }, [isFocus]);

  useEffect(() => {
    setTime(totalSeconds);
  }, [totalSeconds]);

  const removeStartingScreen = () => {
    if (isFocus) {
      /* remove starting and show focusing screen if the focus is start */
      setShowStartingScreen(false);
      setShowFocusingScreen(true);
    }
  };

  return (
    <FullScreen handle={handleFullScreen}>
      {/* Starting Screen */}
      {showStartingScreen && (
        <Fade in={isReady && !isFocus} addEndListener={removeStartingScreen}>
          <div className={style.top}>
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
                setIsFocus={setIsFocus}
                handleFullScreen={handleFullScreen}
                text={props.text}
              />
            </Window>
          </div>
        </Fade>
      )}
      {/* Focusing Screen */}
      {showFocusingScreen && (
        <Fade in={isReady && isFocus}>
          <div className={style.top}>Focusing</div>
        </Fade>
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
