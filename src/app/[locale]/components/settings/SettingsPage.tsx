import { useContext } from 'react';
import { AppSettingsContext } from '../MainApp';
import InputWithLabel from '../general/InputWithLabel';
import style from './SettingsPage.module.css';

function SettingsPage() {
  const settings = useContext(AppSettingsContext);
  return (
    <div className={style.box}>
      <div className={style.tab}>
        <div className={style.title}>Timer</div>
        <div className={style.tab}>
          <div className={style.flexRow}>
            <InputWithLabel
              label="Pomodoro"
              width={180}
              value={settings.timer.pomodoro}
              endAdornment={<div className={style.unit}>mins</div>}
            />
            <InputWithLabel
              label="Short Break"
              width={180}
              value={settings.timer.shortBreak}
              endAdornment={<div className={style.unit}>mins</div>}
            />
            <InputWithLabel
              label="Long Break"
              width={180}
              value={settings.timer.longBreak}
              endAdornment={<div className={style.unit}>mins</div>}
            />
          </div>
        </div>
        <div className={style.last}></div>
      </div>
      <div className={style.tab}>
        <div className={style.title}>Background Video</div>
        <div className={style.last}></div>
      </div>
      <div className={style.tab}>
        <div className={style.title}>Countdown Alarm</div>
      </div>
    </div>
  );
}

export default SettingsPage;
