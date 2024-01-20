import React, { Dispatch, SetStateAction } from 'react';
import Button from '../general/Button';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import style from './Timer.module.css';
import { timeToString } from '@/utils/time';

interface Props {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function Timer({ time, setTime }: Props) {
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
      <h1 className={style.time}>{timeToString(time)}</h1>
      <Button icon={Add} onClick={increaseTime} />
    </>
  );
}

export default Timer;
