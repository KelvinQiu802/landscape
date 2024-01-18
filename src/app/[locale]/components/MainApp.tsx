import { useTranslations } from 'next-intl';
import TopLayer from './TopLayer';
import VideoPlayerWrapper from './VideoPlayerWrapper';

export default function MainApp() {
  const t = useTranslations('Index');
  return (
    <>
      <TopLayer window-title={t('appName')} />
      <VideoPlayerWrapper />
    </>
  );
}
