'use client';

import { useEffect, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/youtube';

export interface VideoProps {
  playing: boolean;
  mute: boolean;
  loop: boolean;
  controls: boolean;
  volume: number; // from 0-1
  url: string;
  onVideoReady: () => void;
  onVideoProgress: (state: OnProgressProps) => void;
  onVideoEnded: () => void; // Does not fire when loop is set to true
  onVideoError: () => void;
}

function VideoBackground({
  playing,
  volume,
  controls,
  mute,
  loop,
  url,
  onVideoReady,
  onVideoProgress,
  onVideoEnded,
  onVideoError,
}: VideoProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <ReactPlayer
      url={url}
      playing={playing}
      loop={loop}
      muted={mute}
      controls={controls}
      volume={volume}
      width="100%"
      height="100%"
      onReady={onVideoReady}
      onProgress={onVideoProgress}
      onEnded={onVideoEnded}
      onError={onVideoError}
      config={{ playerVars: { disablekb: 1, iv_load_policy: 3 } }}
    />
  ) : (
    <div>The video player cannot render on the server side</div>
  );
}

export default VideoBackground;
