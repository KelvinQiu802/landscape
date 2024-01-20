import React from 'react';
import style from '../starting/TimerPage.module.css';
import TaskInput, { TaskInputProps } from '../TaskInput';
import Seperator from '../general/Seperator';

interface Props extends TaskInputProps {}

function FocusScreen(props: Props) {
  return (
    <div>
      <div className={style.central}>
        <div className={style.task}>
          <TaskInput
            task={props.task}
            setTask={props.setTask}
            defaultTask={props.defaultTask}
          />
          <Seperator width="100%" />
        </div>
        <div className={style.timer}>
          {/* <Timer time={time} setTime={setTime} /> */}
        </div>
        {/* <StartingScreenBtns
          setIsFocus={setIsFocus}
          handleFullScreen={handleFullScreen}
          clockMode={clockMode}
          fullScreen={fullScreen}
          focus={focus}
        /> */}
      </div>
    </div>
  );
}

export default FocusScreen;
