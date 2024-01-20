import React from 'react';
import style from './FocusScreen.module.css';
import timerPageStyle from '../starting/TimerPage.module.css';
import timeStyle from '../starting/Timer.module.css';
import TaskInput, { TaskInputProps } from '../TaskInput';
import Seperator from '../general/Seperator';
import { timeToString } from '@/utils/time';

export interface FocusScreenProps extends TaskInputProps {
  time: number;
}

function FocusScreen(props: FocusScreenProps) {
  return (
    <div className={style.central}>
      <div className={style.task}>
        <TaskInput
          task={props.task}
          setTask={props.setTask}
          defaultTask={props.defaultTask}
        />
        <Seperator width="100%" />
      </div>
      <div className={timerPageStyle.timer}>
        <h1 className={timeStyle.time}>{timeToString(props.time)}</h1>
      </div>
      {/* <StartingScreenBtns
          setIsFocus={setIsFocus}
          handleFullScreen={handleFullScreen}
          clockMode={clockMode}
          fullScreen={fullScreen}
          focus={focus}
        /> */}
    </div>
  );
}

export default FocusScreen;
