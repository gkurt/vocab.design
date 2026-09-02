import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { beatFrames } from '../reel.ts';

/**
 * The wordmark breathes with the beat: a small push on every beat that decays over its
 * first third. It is the one motion that runs the length of the video, so it is the thing
 * that tells a viewer the cuts are on purpose, and it is on the name alone: on the whole
 * frame it made the demos harder to read at the wall's pace.
 */
export const Pulse = ({
  children,
  strength = 0.03,
  origin = '0% 50%',
  style,
}: {
  children: ReactNode;
  strength?: number;
  origin?: string;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const phase = (frame / beatFrames) % 1;
  const scale = 1 + strength * Math.exp(-phase / 0.16);
  return <div style={{ display: 'inline-block', transform: `scale(${scale})`, transformOrigin: origin, ...style }}>{children}</div>;
};
