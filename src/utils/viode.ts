import youtubeVideos from '@/data/youtube.json';
import { getRandomInt } from './number';

export function youtubeUrlBuilder(id: string, startingSeconds: number): string {
  const videoLink = `https://www.youtube.com/watch?v=${id}&t=${startingSeconds}`;
  return videoLink;
}

export function getRandomYoutubeVideoUrl() {
  const randInt = getRandomInt(0, youtubeVideos.length);
  const v = youtubeVideos[randInt];
  return youtubeUrlBuilder(v.id, v.startingSeconds);
}
