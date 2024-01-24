import { timeToString } from '@/utils/time';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { Dispatch, SetStateAction } from 'react';
import Button from '../general/Button';
import style from './Timer.module.css';

export interface TimerProps {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  changeTimerType: () => void;
}

function Timer({ time, setTime, changeTimerType }: TimerProps) {
  const STEP = 5 * 60; // 5 minutes

  const increaseTime = () => {
    setTime((prev) => prev + STEP);
  };

  const decreaseTime = () => {
    if (time == 0) {
      return;
    }
    setTime((prev) => prev - STEP);
  };

  return (
    <>
      <Button icon={Remove} onClick={decreaseTime} />
      <h1 className={style.time} onClick={changeTimerType}>
        {timeToString(time)}
      </h1>
      <Button icon={Add} onClick={increaseTime} />
    </>
  );
}

export default Timer;
