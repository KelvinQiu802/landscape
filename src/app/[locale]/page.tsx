import '@/app/globals.css';
import defaultAppSettings from '@/defaultSettings';
import { AppSettings } from '@/index';
import { useTranslations } from 'next-intl';
import { createContext } from 'react';
import MainApp from './components/MainApp';

const AppSettingsContext = createContext<AppSettings>(defaultAppSettings);

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <AppSettingsContext.Provider value={defaultAppSettings}>
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
        />
      </AppSettingsContext.Provider>
    </div>
  );
}
