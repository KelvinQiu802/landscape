import { AppSettings } from '.';

const defaultAppSettings: AppSettings = {
  timer: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 20,
  },
  background: {
    autoPlay: false,
    playOrder: 0, // random
  },
  alarm: {
    type: 'iPhone-ding.mp3',
    volume: 1,
  },
};

export default defaultAppSettings;
