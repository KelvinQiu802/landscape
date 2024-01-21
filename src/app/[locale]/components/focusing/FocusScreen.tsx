import { timeToString } from '@/utils/time';
import TaskInput, { TaskInputProps } from '../TaskInput';
import Seperator from '../general/Seperator';
import timeStyle from '../starting/Timer.module.css';
import timerPageStyle from '../starting/TimerPage.module.css';
import style from './FocusScreen.module.css';
import FocusScreenBtns, { FocusScreenBtnsProps } from './FocusScreenBtns';

export interface FocusScreenProps extends TaskInputProps, FocusScreenBtnsProps {
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
          className={style.opacity}
        />
        <Seperator width="100%" />
      </div>
      <div className={timerPageStyle.timer}>
        <h1 className={`${timeStyle.time} ${style.opacity}`}>
          {timeToString(props.time)}
        </h1>
      </div>
      <FocusScreenBtns
        finishFocus={props.finishFocus}
        isPlaying={props.isPlaying}
        isMuted={props.isMuted}
        setIsPlaying={props.setIsPlaying}
        toggleMute={props.toggleMute}
        pause={props.pause}
        resume={props.resume}
        toggleFullScreen={props.toggleFullScreen}
        focusScreenBtns={props.focusScreenBtns}
      />
    </div>
  );
}

export default FocusScreen;
