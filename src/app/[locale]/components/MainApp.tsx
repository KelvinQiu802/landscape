'use client';

import useCountdown from '@/hooks/useCountdown';
import Zoom from '@mui/material/Zoom';
import { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { OnProgressProps } from 'react-player/base';
// @ts-ignore
import { useSound } from 'use-sound';
import style from './MainApp.module.css';
import { VideoProps } from './VideoBackground';
import VideoPlayerWrapper from './VideoPlayerWrapper';
import BackgroundPage from './background/BackgroundPage';
import { ClockModeBtnsText } from './clockMode/ClockModeBtns';
import ClockModeScreen from './clockMode/ClockModeScreen';
import FocusScreen from './focusing/FocusScreen';
import { FocusScreenBtnsText } from './focusing/FocusScreenBtns';
import MediaButtons from './general/MediaButtons';
import Window from './general/Window';
import LeftControlBar from './starting/LeftControlBar';
import { StartingScreenBtnsText } from './starting/StartingScreenBtns';
import TimerPage from './starting/TimerPage';
import TopBar, { TopBarProps } from './starting/TopBar';

interface Props
  extends TopBarProps,
    StartingScreenBtnsText,
    FocusScreenBtnsText,
    ClockModeBtnsText {
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
  const [showClockModeScreen, setShowClockModeScreen] = useState(false);
  const handleFullScreen = useFullScreenHandle();
  const [playAlarm] = useSound('/sounds/iphone_ding.mp3', { volume: 1 });

  /* set timer */
  const onExpire = () => {
    playAlarm();
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

  const startClockMode = () => {
    setShowClockModeScreen(true);
    setShowStartingScreen(false);
    setIsPlaying(true);
  };

  const exitClockMode = () => {
    setShowClockModeScreen(false);
    setShowStartingScreen(true);
    setIsPlaying(false);
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
              {/* Timer Page */}
              {selectedTag == 0 && (
                <Zoom in={selectedTag == 0}>
                  <div className={style.central}>
                    <TimerPage
                      time={displayTime}
                      setTime={setTargetTime}
                      defaultTask={defaultTask}
                      startFocus={startFocus}
                      toggleFullScreen={toggleFullScreen}
                      startingScreenBtns={props.startingScreenBtns}
                      task={task}
                      setTask={setTask}
                      startClockMode={startClockMode}
                    />
                  </div>
                </Zoom>
              )}
              {/* Background Page */}
              {selectedTag == 1 && (
                <Zoom in={selectedTag == 1}>
                  <div className={style.central}>
                    <BackgroundPage />
                  </div>
                </Zoom>
              )}
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
      {/* Clock Mode Screen */}
      {showClockModeScreen && (
        <Zoom in={showClockModeScreen}>
          <div className={style.top}>
            <ClockModeScreen
              toggleFullScreen={toggleFullScreen}
              exitClockMode={exitClockMode}
              clockModeText={props.clockModeText}
            />
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
