import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TRACK = { w: 432, h: 64 };
const TRAVEL = 240;
const SCALE = 1.14;
const PARENT_MS = 1500;
/** Three siblings, three timings: what a group does when nothing is holding it together. */
const LOOSE = [
  { ms: 1050, ease: 'cubic-bezier(0.4, 0, 1, 1)' },
  { ms: 1500, ease: 'linear' },
  { ms: 1950, ease: 'cubic-bezier(0, 0, 0.2, 1)' },
];
const SETTLE = 2030;
/** One beat back at frame one, so the reset is a written state rather than a value the browser is
    still holding a transition against. */
const BEAT = 60;

type Move = 'slide' | 'scale';

const NOTES: Record<Move, string> = {
  slide: 'One transform on the card carries all three parts. Loose, each part keeps its own timing and the group comes apart.',
  scale: 'Scaling the parent spreads its parts apart, because they are inside it. Loose, each part scales about its own centre.',
};

const TILES = ['FM', 'HL', 'RS'];

const tile = (i: number, name: string) => `
  <span
    data-part="${name}"
    style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px;
           background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600;
           transform-origin: 50% 50%; will-change: transform"
  >${TILES[i]}</span>`;

const lane = (label: string, body: string, context: boolean) => `
  <div class="sp-stack${context ? ' sp-context' : ''}" style="flex: 0 0 auto; gap: 6px">
    <span class="sp-label" style="font-size: 11px">${label}</span>
    <div
      style="position: relative; width: ${TRACK.w}px; height: ${TRACK.h}px; border-radius: 8px;
             background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden"
    >${body}</div>
  </div>`;

/**
 * Parenting specimen: the same three parts making the same journey twice. In the loose lane each part
 * is animated on its own timing, so the group leaves as three objects and only looks like a card again
 * once the slowest one has caught up. In the parented lane nothing but the card is animated at all,
 * and the parts come along because they are inside it, which is why they cannot drift. The picker
 * swaps the move for a scale, which is where the difference stops being about timing: scaling the
 * parent spreads its parts apart, while parts scaling on their own keep their spacing.
 *
 * The subject is the parent card. The loose lane is the counter-example the specimen is read against
 * and it is a different element, never a state the subject passes through, so no `data-pose` is
 * needed: the card is the term in every resting state. That lane, the picker, the replay control and
 * the note carry the context register.
 *
 * Both lanes are CSS transitions scheduled on the stage's clock, so a pose can stop them where they
 * stand and the two lanes start on the same beat. Under `prefersReducedMotion` neither lane travels
 * and both rest on their end pose, since the comparison is between timings that reader has asked not
 * to see. Everything is absolutely placed inside tracks fixed at mount and the note holds its own
 * height, so a move can move nothing else (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const loose = TILES.map(
    (_, i) => `
    <span
      style="position: absolute; left: ${16 + i * 42}px; top: 15px"
    >${tile(i, `loose-${i + 1}`)}</span>`,
  ).join('');

  const parented = `
    <div
      data-part="card" data-subject data-move="slide" data-state="posed"
      style="position: absolute; left: 6px; top: 5px; display: flex; align-items: center; gap: 8px; padding: 10px;
             border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-sunken);
             transform-origin: 0% 50%; will-change: transform"
    >${TILES.map((_, i) => tile(i, `child-${i + 1}`)).join('')}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-move="slide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Move</span>
          <sp-segmented class="sp-segmented" data-part="move" data-axis="Transform" data-value="slide">
            <button class="sp-segment" type="button" data-part="seg-slide" value="slide">Slide</button>
            <button class="sp-segment" type="button" data-part="seg-scale" value="scale">Scale</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          ${lane('three siblings, three timings', loose, true)}
          ${lane('one parent, one timing', parented, false)}
          <span
            class="sp-text sp-context" data-part="note"
            style="flex: 0 0 auto; height: 30px; font-size: 12px; line-height: 1.3"
          >${NOTES.slide}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const card = part(root, 'card');
  const note = part(root, 'note');
  const loosers = TILES.map((_, i) => part(root, `loose-${i + 1}`));
  const reduced = prefersReducedMotion(root);

  let move: Move = 'slide';
  let beat: number | undefined;
  let settling: number | undefined;

  /** The end pose of the run, written the same way for both lanes so only the timing differs. */
  const endPose = () => (move === 'scale' ? `translateX(${TRAVEL}px) scale(${SCALE})` : `translateX(${TRAVEL}px)`);

  const paint = (pose: string, ms: number) => {
    card.style.transition = ms > 0 ? `transform ${PARENT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none';
    card.style.transform = pose === 'end' ? endPose() : 'translateX(0) scale(1)';
    for (const [i, tileEl] of loosers.entries()) {
      const spec = LOOSE[i] ?? LOOSE[0];
      if (!spec) continue;
      tileEl.style.transition = ms > 0 ? `transform ${spec.ms}ms ${spec.ease}` : 'none';
      tileEl.style.transform = pose === 'end' ? endPose() : 'translateX(0) scale(1)';
    }
  };

  const play = () => {
    clock.clearTimeout(beat);
    clock.clearTimeout(settling);
    scene.dataset.move = move;
    card.dataset.move = move;
    note.textContent = NOTES[move];

    // Reduced motion never sees the travel, so that reader is put on the end pose instead of being
    // told a move is in flight that motion.css has already turned off underneath.
    if (reduced) {
      paint('end', 0);
      card.dataset.state = 'posed';
      return;
    }

    paint('start', 0);
    card.dataset.state = 'neutral';
    beat = clock.setTimeout(() => {
      paint('end', PARENT_MS);
      card.dataset.state = 'moving';
      settling = clock.setTimeout(() => {
        card.dataset.state = 'posed';
      }, SETTLE);
    }, BEAT);
  };

  // Each segment names a move outright and Replay names a run of the current one, so no step flips
  // whatever state it happens to find (SPEC §8).
  part(root, 'move').addEventListener('change', (event) => {
    move = (event as CustomEvent<string>).detail as Move;
    play();
  });
  part(root, 'replay').addEventListener('click', play);

  play();
}
