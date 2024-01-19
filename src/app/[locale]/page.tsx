import { useTranslations } from 'next-intl';
import style from './pages.module.css';
import '@/app/globals.css';
import MainApp from './components/MainApp';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <MainApp
        appName={t('appName')}
        task={t('task')}
        focus={t('focus')}
        clockMode={t('clockMode')}
        fullScreen={t('fullScreen')}
      />
    </div>
  );
}
