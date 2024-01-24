import '@/app/globals.css';
import '@/app/mui.css';
import { useTranslations } from 'next-intl';
import MainApp from './components/MainApp';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <MainApp
        appName={t('appName')}
        task={t('task')}
        startingScreenBtns={{
          focus: t('focus'),
          clockMode: t('clockMode'),
          fullScreen: t('fullScreen'),
        }}
        focusScreenBtns={{
          finish: t('finish'),
          pause: t('pause'),
          resume: t('resume'),
          mute: t('mute'),
          unmute: t('unmute'),
          fullScreen: t('fullScreen'),
        }}
        clockModeText={{
          eixt: t('exit'),
          hideButtons: t('hideButtons'),
          fullScreen: t('fullScreen'),
          mute: t('mute'),
          unmute: t('unmute'),
        }}
        settingsPageText={{
          timer: t('timer'),
          pomodoro: t('pomodoro'),
          shortBreak: t('shortBreak'),
          longBreak: t('longBreak'),
          mins: t('mins'),
          backgroundVideo: t('backgroundVideo'),
          autoPlay: t('autoPlay'),
          autoPlayHint: t('autoPlayHint'),
          playOrder: t('playOrder'),
          random: t('random'),
          loop: t('loop'),
          sequential: t('sequential'),
          countdownAlarm: t('countdownAlarm'),
          type: t('type'),
          play: t('play'),
          volume: t('volume'),
          inputError: t('inputError'),
          saveAndApply: t('saveAndApply'),
          saved: t('saved'),
        }}
      />
    </div>
  );
}
