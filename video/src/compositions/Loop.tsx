import { AbsoluteFill } from 'remotion';
import { PAPER, reel } from '../reel.ts';
import { Wall } from '../scenes/Wall.tsx';

/** The silent loop for a README or a thread: six specimens, two beats each, names over the footage. */
export const LOOP_BEATS = 12;

export const Loop = () => (
  <AbsoluteFill style={{ background: PAPER }}>
    <Wall slugs={reel.cast.slice(0, 6)} long={[]} rhythm={[2]} overlay />
  </AbsoluteFill>
);
