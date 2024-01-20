import React, { Dispatch, SetStateAction, useState } from 'react';
import style from './TimerPage.module.css';
import TaskInput, { TaskInputProps } from '../TaskInput';
import Seperator from '../general/Seperator';
import Timer, { TimerProps } from './Timer';
import StartingScreenBtns, {
  StartingScreenBtnsProps,
} from './StartingScreenBtns';

export interface TimerPageProps
  extends TimerProps,
    StartingScreenBtnsProps,
    TaskInputProps {}

function TimerPage({
  setIsFocus,
  toggleFullScreen,
  text,
  time,
  setTime,
  task,
  setTask,
  defaultTask,
}: TimerPageProps) {
  return (
    <div className={style.central}>
      <div className={style.task}>
        <TaskInput task={task} setTask={setTask} defaultTask={defaultTask} />
        <Seperator width="100%" />
      </div>
      <div className={style.timer}>
        <Timer time={time} setTime={setTime} />
      </div>
      <StartingScreenBtns
        setIsFocus={setIsFocus}
        toggleFullScreen={toggleFullScreen}
        text={text}
      />
    </div>
  );
}

export default TimerPage;
