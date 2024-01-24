'use client';

import defaultAppSettings from '@/defaultSettings';
import useCountdown from '@/hooks/useCountdown';
import { AppSettings } from '@/index';
import {
  getNextYoutubeVideoUrl,
  getRandomYoutubeVideoUrl,
} from '@/utils/viode';
import Zoom from '@mui/material/Zoom';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
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
import SettingsPage, { SettingsPageText } from './settings/SettingsPage';
import LeftControlBar from './starting/LeftControlBar';
import { StartingScreenBtnsText } from './starting/StartingScreenBtns';
import TimerPage, { TimerPageText } from './starting/TimerPage';
import TopBar, { TopBarProps } from './starting/TopBar';

interface Props
  extends TopBarProps,
    StartingScreenBtnsText,
    FocusScreenBtnsText,
    ClockModeBtnsText,
    SettingsPageText,
    TimerPageText {
  task: string;
}

export const AppSettingsContext = createContext<{
  appSettings: AppSettings;
  setAppSettings: Dispatch<SetStateAction<AppSettings>>;
}>({ appSettings: defaultAppSettings, setAppSettings: () => {} });

function MainApp(props: Props) {
  const defaultTask = props.task;
  const [appSettings, setAppSettings] = useState(defaultAppSettings);
  const [timerType, setTimerType] = useState<
    'pomodoro' | 'shortBreak' | 'longBreak'
  >('pomodoro');
  const [task, setTask] = useState(defaultTask);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(appSettings.background.autoPlay);
  const [isMuted, setIsMuted] = useState(isPlaying ? true : false);
  const [selectedTag, setSelectedTag] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [targetTime, setTargetTime] = useState(25 * 60);
  const [displayTime, setDisplayTime] = useState(targetTime);
  const [showStartingScreen, setShowStartingScreen] = useState(true);
  const [showFocusingScreen, setShowFocusingScreen] = useState(false);
  const [showClockModeScreen, setShowClockModeScreen] = useState(false);
  const [looping, setLooping] = useState(appSettings.background.playOrder == 1);
  const [videoUrl, setVideoUrl] = useState(getRandomYoutubeVideoUrl());
  const handleFullScreen = useFullScreenHandle();
  const [playAlarm] = useSound(`/sounds/${appSettings.alarm.type}`, {
    volume: appSettings.alarm.volume,
  });

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
  const onVideoEnded = () => {
    if (looping) return;
    if (appSettings.background.playOrder == 2) {
      // sequential: get next video
      changeVideo(getNextYoutubeVideoUrl(videoUrl));
      return;
    }
    changeVideo(getRandomYoutubeVideoUrl());
    setIsPlaying(true);
  };
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

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
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

  const changeVideo = (url: string) => {
    setVideoUrl(url);
    localStorage.setItem('selectedVideo', url);
  };

  /* pomodoro -> short break -> long break */
  const changeTimerType = () => {
    if (timerType == 'pomodoro') {
      setTimerType('shortBreak');
    } else if (timerType == 'shortBreak') {
      setTimerType('longBreak');
    } else {
      setTimerType('pomodoro');
    }
  };

  /* Youtube config */
  const mouseAccess = false;
  const videoConfig: VideoProps = {
    playing: isPlaying,
    mute: isMuted,
    loop: looping,
    controls: false,
    volume: 1,
    url: videoUrl,
    onVideoReady,
    onVideoEnded,
    onVideoError,
    onVideoProgress,
  };

  /* handle local storage state */
  useEffect(() => {
    const customSettings = localStorage.getItem('appSettings');
    if (customSettings) {
      const parsedSettings: AppSettings = JSON.parse(customSettings);
      setAppSettings(parsedSettings);
    }
    const selectedVideo = localStorage.getItem('selectedVideo');
    if (selectedVideo) {
      setVideoUrl(selectedVideo);
    }
  }, []);

  useEffect(() => {
    setIsPlaying(appSettings.background.autoPlay);
    setIsMuted(appSettings.background.autoPlay ? true : false);
    setLooping(appSettings.background.playOrder == 1);
    setTargetTime(appSettings.timer.pomodoro * 60);
  }, [appSettings]);

  useEffect(() => {
    setTargetTime(appSettings.timer[timerType] * 60);
  }, [timerType]);

  useEffect(() => {
    setDisplayTime(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    setDisplayTime(targetTime);
  }, [targetTime]);

  return (
    <AppSettingsContext.Provider value={{ appSettings, setAppSettings }}>
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
              <Window className={`${style.mainWindow}`}>
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
                        timerPageText={props.timerPageText}
                        changeTimerType={changeTimerType}
                      />
                    </div>
                  </Zoom>
                )}
                {/* Background Page */}
                {selectedTag == 1 && (
                  <Zoom in={selectedTag == 1}>
                    <div className={style.videoListBox}>
                      <BackgroundPage changeVideo={changeVideo} />
                    </div>
                  </Zoom>
                )}
                {/* App Settings Page */}
                {selectedTag == 2 && (
                  <Zoom in={selectedTag == 2}>
                    <div className={style.central}>
                      <SettingsPage settingsPageText={props.settingsPageText} />
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
                toggleMute={toggleMute}
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
                toggleMute={toggleMute}
                isMuted={isMuted}
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
    </AppSettingsContext.Provider>
  );
}

export default MainApp;
