import { Easing, interpolate, spring } from 'remotion';
import { FPS } from '../reel.ts';

/** A rise onto the page: opacity and a few pixels of lift, from `from` frames in. */
export function rise(frame: number, from = 0, distance = 28) {
  const t = spring({ frame: frame - from, fps: FPS, config: { damping: 200, stiffness: 260, mass: 0.7 } });
  return { opacity: t, transform: `translateY(${(1 - t) * distance}px)` };
}

/** A plain fade, `length` frames long, from `from`. */
export function fade(frame: number, from = 0, length = 8) {
  return interpolate(frame, [from, from + length], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
}
