import { useTranslations } from 'next-intl';
import MainApp from './components/MainApp';
import style from './pages.module.css';
import '@/app/globals.css';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <MainApp />
    </div>
  );
}
