import { AbsoluteFill, Sequence } from 'remotion';
import { beat, PAPER, reel } from '../reel.ts';
import { ClaimCount } from '../scenes/ClaimCount.tsx';
import { Close } from '../scenes/Close.tsx';
import { ColdOpen } from '../scenes/ColdOpen.tsx';
import { Music } from '../scenes/Music.tsx';
import { Wall, wallBeats } from '../scenes/Wall.tsx';

/**
 * The square teaser: the open, then the rest of the cast in a two-quick-one-held rhythm
 * (a bar to every three demos, the held slot going to a demo that needs the time), the
 * count, the URL. The cast is sized to a multiple of three so the count lands on a downbeat.
 */
const RHYTHM = [1, 1, 2];
const wall = reel.cast.filter((slug) => slug !== reel.open);
const WALL = wallBeats(RHYTHM, wall.length);
export const TEASER_BEATS = 4 + WALL + 8 + 4;

const scene = (from: number, length: number) => ({ from: beat(from), durationInFrames: beat(from + length) - beat(from) });

export const Teaser = () => (
  <AbsoluteFill style={{ background: PAPER }}>
    <Music />
    <Sequence {...scene(0, 4)}>
      <ColdOpen slug={reel.open} nameAt={2} />
    </Sequence>
    <Sequence {...scene(4, WALL)}>
      <Wall slugs={wall} long={reel.long} rhythm={RHYTHM} />
    </Sequence>
    <Sequence {...scene(4 + WALL, 8)}>
      <ClaimCount />
    </Sequence>
    <Sequence {...scene(4 + WALL + 8, 4)}>
      <Close />
    </Sequence>
  </AbsoluteFill>
);
