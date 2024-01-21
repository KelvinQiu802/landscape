import { Video } from '@/index';
import { youtubeUrlBuilder } from '@/utils/viode';
import Image from 'next/image';
import style from './VideoCard.module.css';

export interface VideoCardProps extends Video {
  changeVideo: (url: string) => void;
}

function VideoCard(props: VideoCardProps) {
  const videoLink = youtubeUrlBuilder(props.id, props.startingSeconds);
  return (
    <div className={style.card} onClick={() => props.changeVideo(videoLink)}>
      <Image
        src={props.coverImg}
        width={256}
        height={144}
        alt={`Cover Image of ${props.title}`}
        className={style.img}
      />
      <div className={style.layer}>{props.title}</div>
    </div>
  );
}

export default VideoCard;
