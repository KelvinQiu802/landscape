'use client';

import Zoom from '@mui/material/Zoom';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useEffect, useState } from 'react';
import { useTime } from 'react-timer-hook';
import MediaButtons from '../general/MediaButtons';
import ClockModeBtns, { ClockModeBtnsProps } from './ClockModeBtns';
import style from './ClockModeScreen.module.css';

export interface ClockScreenProps
  extends Omit<ClockModeBtnsProps, 'hideClockBtns'> {}

function ClockModeScreen(props: ClockScreenProps) {
  const { seconds } = useTime();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showBtnsBar, setShowBtnsBar] = useState(true);

  const toggleShowButtonsBar = () => {
    if (showBtnsBar) {
      setShowBtnsBar(false);
    } else {
      setShowBtnsBar(true);
    }
  };

  const locale = document.documentElement.lang;

  dayjs.locale(locale);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(AdvancedFormat);

  useEffect(() => {
    if (locale == 'zh') {
      setDate(dayjs().format('MMM Do, dddd'));
    } else if (locale == 'en') {
      setDate(dayjs().format('dddd, MMMM Do'));
    } else {
      setDate('Please configure local preference');
    }
    setTime(dayjs().format('LT'));
  }, [seconds]);

  return (
    <div className={style.central}>
      <div className={style.date}>{date}</div>
      <h1 className={style.time}>{time}</h1>
      {showBtnsBar && (
        <Zoom in={showBtnsBar}>
          <div>
            <ClockModeBtns
              exitClockMode={props.exitClockMode}
              hideClockBtns={toggleShowButtonsBar}
              toggleFullScreen={props.toggleFullScreen}
              clockModeText={props.clockModeText}
              toggleMute={props.toggleMute}
              isMuted={props.isMuted}
            />
          </div>
        </Zoom>
      )}
      {!showBtnsBar && (
        <Zoom in={!showBtnsBar}>
          <div className={style.cornerBtn}>
            <ClockModeBtns
              exitClockMode={props.exitClockMode}
              hideClockBtns={toggleShowButtonsBar}
              toggleFullScreen={props.toggleFullScreen}
              clockModeText={props.clockModeText}
              toggleMute={props.toggleMute}
              isMuted={props.isMuted}
              corner
            />
          </div>
        </Zoom>
      )}
      <div className={style.media}>
        <MediaButtons hideBackground />
      </div>
    </div>
  );
}

export default ClockModeScreen;
