import React, { Dispatch, SetStateAction, useState } from 'react';
import style from './TimerPage.module.css';
import TaskInput from './TaskInput';
import Seperator from './general/Seperator';
import Timer from './Timer';
import StartingScreenBtns from './StartingScreenBtns';
import { FullScreenHandle } from 'react-full-screen';

interface Props {
  defaultTask: string;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  handleFullScreen: FullScreenHandle;
  clockMode: string;
  fullScreen: string;
  focus: string;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function TimerPage({
  defaultTask,
  setIsPlaying,
  handleFullScreen,
  fullScreen,
  clockMode,
  focus,
  time,
  setTime,
}: Props) {
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
        setIsPlaying={setIsPlaying}
        handleFullScreen={handleFullScreen}
        clockMode={clockMode}
        fullScreen={fullScreen}
        focus={focus}
      />
    </div>
  );
}

export default TimerPage;
