import { Video } from '@/index';
import Image from 'next/image';
import style from './VideoCard.module.css';

interface VideoCardProps extends Video {}

function VideoCard(props: VideoCardProps) {
  const videoLink = `https://www.youtube.com/watch?v=${props.id}&t=${props.startingSeconds}`;
  return (
    <div className={style.card}>
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
