import { useStopwatch } from 'react-timer-hook';
import { useState, useEffect } from 'react';

export interface CountdownValues {
  totalSeconds: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  resume: () => void;
  isRunning: boolean;
}

export default function useCountdown(
  targetSeconds: number,
  onTimeUp: () => void
): CountdownValues {
  const [seconds, setSeconds] = useState(targetSeconds);

  const {
    totalSeconds,
    seconds: s,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const myReset = () => {
    reset(undefined, false);
  };

  useEffect(() => {
    setSeconds(targetSeconds - totalSeconds);
    if (targetSeconds - totalSeconds <= 0) {
      pause();
      myReset();
      onTimeUp();
    }
  }, [totalSeconds]);

  return {
    totalSeconds: seconds,
    pause,
    start,
    isRunning,
    reset: myReset,
    resume: start,
  };
}
