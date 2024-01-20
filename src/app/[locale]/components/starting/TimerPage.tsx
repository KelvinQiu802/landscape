import React, { Dispatch, SetStateAction, useState } from 'react';
import style from './TimerPage.module.css';
import TaskInput from '../TaskInput';
import Seperator from '../general/Seperator';
import Timer, { TimerProps } from './Timer';
import StartingScreenBtns, {
  StartingScreenBtnsProps,
} from './StartingScreenBtns';

export interface TimerPageProps extends TimerProps, StartingScreenBtnsProps {
  defaultTask: string;
}

function TimerPage({
  defaultTask,
  setIsFocus,
  handleFullScreen,
  text,
  time,
  setTime,
}: TimerPageProps) {
  const [task, setTask] = useState(defaultTask);
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
        handleFullScreen={handleFullScreen}
        text={text}
      />
    </div>
  );
}

export default TimerPage;
