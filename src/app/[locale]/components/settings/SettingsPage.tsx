import { useContext } from 'react';
import { AppSettingsContext } from '../MainApp';
import CheckboxWithLabel from '../general/CheckboxWithLabel';
import InputWithLabel from '../general/InputWithLabel';
import SwitchWithLabel from '../general/SwitchWithLabel';
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
              name="pomodoro"
              value={settings.timer.pomodoro}
              endAdornment={<div className={style.unit}>mins</div>}
            />
            <InputWithLabel
              label="Short Break"
              width={180}
              name="shortBreak"
              value={settings.timer.shortBreak}
              endAdornment={<div className={style.unit}>mins</div>}
            />
            <InputWithLabel
              label="Long Break"
              width={180}
              name="longBreak"
              value={settings.timer.longBreak}
              endAdornment={<div className={style.unit}>mins</div>}
            />
          </div>
        </div>
        <div className={style.last}></div>
      </div>
      <div className={style.tab}>
        <div className={style.title}>Background Video</div>
        <div className={style.tab}>
          <SwitchWithLabel
            label="Auto Play"
            value={settings.background.autoPlay}
          />
          <div className={`${style.desc} ${style.mb}`}>
            Auto play will mute the video by default.
          </div>
          <div className={style.subTitle}>Play Order</div>
          <div className={style.flexRow}>
            <CheckboxWithLabel
              label="Random"
              value={0}
              checked={settings.background.playOrder == 0}
            />
            <CheckboxWithLabel
              label="Loop"
              value={1}
              checked={settings.background.playOrder == 1}
            />
            <CheckboxWithLabel
              label="Sequential"
              value={2}
              checked={settings.background.playOrder == 2}
            />
          </div>
        </div>
        <div className={style.last}></div>
      </div>
      <div className={style.tab}>
        <div className={style.title}>Countdown Alarm</div>
      </div>
    </div>
  );
}

export default SettingsPage;
