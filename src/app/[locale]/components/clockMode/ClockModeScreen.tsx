'use client';

import React, { useEffect, useState } from 'react';
import style from './ClockModeScreen.module.css';
import { useTime } from 'react-timer-hook';
import dayjs from 'dayjs';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import ClockModeBtns, { ClockModeBtnsProps } from './ClockModeBtns';
import Zoom from '@mui/material/Zoom';

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

  dayjs.locale(document.documentElement.lang);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(AdvancedFormat);

  useEffect(() => {
    setDate(dayjs().format('dddd, MMMM Do'));
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
            />
          </div>
        </Zoom>
      )}
    </div>
  );
}

export default ClockModeScreen;
