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

export function getNextYoutubeVideoUrl(url: string) {
  const urlObj = new URL(url);
  const currentId = urlObj.searchParams.get('v');
  const index = youtubeVideos.findIndex((v) => v.id == currentId);
  if (index == youtubeVideos.length - 1) {
    // is last video
    const first = youtubeVideos[0];
    return youtubeUrlBuilder(first.id, first.startingSeconds);
  } else {
    const next = youtubeVideos[index + 1];
    return youtubeUrlBuilder(next.id, next.startingSeconds);
  }
}
