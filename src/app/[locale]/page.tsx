import '@/app/globals.css';
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
        }}
      />
    </div>
  );
}
