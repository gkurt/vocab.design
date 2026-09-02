import { AbsoluteFill, Sequence } from 'remotion';
import { beat, PAPER, reel } from '../reel.ts';
import { Agent } from '../scenes/Agent.tsx';
import { ClaimCount } from '../scenes/ClaimCount.tsx';
import { Close } from '../scenes/Close.tsx';
import { ColdOpen } from '../scenes/ColdOpen.tsx';
import { Linked } from '../scenes/Linked.tsx';
import { Music } from '../scenes/Music.tsx';
import { Wall, wallBeats } from '../scenes/Wall.tsx';

/**
 * The full cut, every scene boundary on a downbeat. The wall runs two quick and one held,
 * like the teaser's.
 *
 *   0    cold open: one specimen, then its name          8 beats
 *   8    the wall: the rest of the cast                  wallBeats(rhythm)
 *   +0   the count, and the claim it carries             8
 *   +8   linked: one term, every name for it             16
 *   +24  agent: the markdown at every URL                12
 *   +36  close                                           8
 */
const wall = reel.cast.filter((slug) => slug !== reel.open);
export const RHYTHM = [1, 1, 2];
export const FULL_BEATS = 8 + wallBeats(RHYTHM, wall.length) + 8 + 16 + 12 + 8;

const scene = (from: number, length: number) => ({ from: beat(from), durationInFrames: beat(from + length) - beat(from) });

export const Full = () => {
  const wallLength = wallBeats(RHYTHM, wall.length);
  const count = 8 + wallLength;
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <Music />
      <Sequence {...scene(0, 8)}>
        <ColdOpen slug={reel.open} nameAt={4} />
      </Sequence>
      <Sequence {...scene(8, wallLength)}>
        <Wall slugs={wall} long={reel.long} rhythm={RHYTHM} />
      </Sequence>
      <Sequence {...scene(count, 8)}>
        <ClaimCount />
      </Sequence>
      <Sequence {...scene(count + 8, 16)}>
        <Linked slug={reel.linked.slug} aliases={reel.linked.aliases} />
      </Sequence>
      <Sequence {...scene(count + 24, 12)}>
        <Agent slug={reel.agent} />
      </Sequence>
      <Sequence {...scene(count + 36, 8)}>
        <Close />
      </Sequence>
    </AbsoluteFill>
  );
};
