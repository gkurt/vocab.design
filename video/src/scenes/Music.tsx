import { Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FPS, reel } from '../reel.ts';

/**
 * The track, entered at its first downbeat so frame zero is beat zero, with a fade over
 * the last two seconds. Nothing renders when reel.json names no music.
 */
export const Music = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  if (!reel.music) return null;
  const volume = interpolate(frame, [durationInFrames - FPS * 2, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <Audio src={staticFile(reel.music)} trimBefore={Math.round(reel.downbeat * FPS)} volume={volume} />;
};
