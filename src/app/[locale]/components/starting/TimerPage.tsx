import TaskInput, { TaskInputProps } from '../TaskInput';
import Seperator from '../general/Seperator';
import StartingScreenBtns, {
  StartingScreenBtnsProps,
} from './StartingScreenBtns';
import Timer, { TimerProps } from './Timer';
import style from './TimerPage.module.css';

export interface TimerPageProps
  extends TimerProps,
    StartingScreenBtnsProps,
    TaskInputProps {}

function TimerPage({
  startFocus,
  toggleFullScreen,
  startingScreenBtns,
  time,
  setTime,
  task,
  setTask,
  startClockMode,
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
        startClockMode={startClockMode}
        startFocus={startFocus}
        toggleFullScreen={toggleFullScreen}
        startingScreenBtns={startingScreenBtns}
      />
    </div>
  );
}

export default TimerPage;
