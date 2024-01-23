export interface Video {
  id: string;
  startingSeconds: number;
  title: string;
  coverImg: string;
}

export enum PlayOrder {
  random = 0,
  loop = 1,
  sequential = 2,
}

export type AlarmType = 'none' | 'iPhone-ding';

export interface AppSettings {
  timer: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  background: {
    autoPlay: boolean;
    playOrder: PlayOrder;
  };
  alarm: {
    type: AlarmType;
    volume: number;
  };
}
