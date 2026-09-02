import { Sequence } from 'remotion';
import { beat } from '../reel.ts';
import { Slot } from './Slot.tsx';

/**
 * One specimen after another, cut on the beat, every slug once. `rhythm` says how many
 * beats each slot holds, cycling: `[2]` is a steady one per two beats, `[1, 1, 2]` two
 * quick and one held. A held slot goes to the next of `long`, the demos whose
 * demonstration needs the time; a quick one to the next of the rest, each in cast order.
 * When either runs out the other fills in, so every slug is shown whatever the rhythm.
 */
export const Wall = ({
  slugs,
  long,
  rhythm,
  overlay = false,
}: {
  slugs: string[];
  long: string[];
  rhythm: number[];
  overlay?: boolean;
}) => {
  const held = slugs.filter((slug) => long.includes(slug));
  const quick = slugs.filter((slug) => !long.includes(slug));
  let at = 0;
  const items = slugs.map((_, i) => {
    const beats = rhythm[i % rhythm.length] ?? 1;
    const slug = (beats > 1 ? (held.shift() ?? quick.shift()) : (quick.shift() ?? held.shift())) ?? '';
    const item = { slug, from: at, beats };
    at += beats;
    return item;
  });
  return (
    <>
      {items.map((item) => (
        <Sequence key={item.slug} from={beat(item.from)} durationInFrames={beat(item.from + item.beats) - beat(item.from)}>
          <Slot slug={item.slug} beats={item.beats} overlay={overlay} />
        </Sequence>
      ))}
    </>
  );
};

/** How many beats a wall of `slots` takes under `rhythm`. */
export const wallBeats = (rhythm: number[], slots: number): number =>
  Array.from({ length: slots }, (_, i) => rhythm[i % rhythm.length] ?? 1).reduce((a, b) => a + b, 0);
