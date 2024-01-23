import videos from '@/data/youtube.json';
import { Video } from '@/index';
import style from './BackgroundPage.module.css';
import VideoCard, { VideoCardProps } from './VideoCard';

export interface BackgroundPageProps
  extends Omit<VideoCardProps, keyof Video> {}

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
          changeVideo={props.changeVideo}
        />
      ))}
    </div>
  );
}

export default BackgroundPage;
