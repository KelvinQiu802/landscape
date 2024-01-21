import { Video } from '@/index';
import videos from '@/videos/youtube.json';
import style from './BackgroundPage.module.css';
import VideoCard from './VideoCard';

export interface BackgroundPageProps {}
function BackgroundPage(props: BackgroundPageProps) {
  return (
    <div className={style.list}>
      {(videos as Video[]).map((v) => (
        <VideoCard
          key={v.id}
          coverImg={v.coverImg}
          title={v.title}
          id={v.id}
          startingSeconds={v.startingSeconds}
        />
      ))}
    </div>
  );
}

export default BackgroundPage;
