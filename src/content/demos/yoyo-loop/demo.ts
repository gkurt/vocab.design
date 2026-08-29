import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The lane the tile crosses, and the tile it has to leave room for. */
const TRACK = 434;
const TILE = 44;
const INSET = 4;
/** The track's own hairline is inside its border box, so the tile's run is two pixels short of it. */
const TRAVEL = TRACK - 2 - TILE - INSET * 2;
/** The beat the restarting lane spends back at frame one: the seam, held long enough to be seen. */
const SNAP = 70;

type Pace = 'slow' | 'brisk';

const PACES: Record<Pace, number> = { slow: 1500, brisk: 800 };

const lane = (key: string, name: string, rule: string, subject: boolean) => `
  <div class="sp-stack${subject ? '' : ' sp-context'}" data-part="lane-${key}" style="gap: 6px">
    <div class="sp-row sp-row--between">
      <span class="sp-label sp-text--ink" style="font-size: 12px">${name}</span>
      <span class="sp-label" data-part="say-${key}" style="font-size: 11px; width: 200px; text-align: right">${rule}</span>
    </div>
    <div
      data-part="track-${key}"
      style="position: relative; width: ${TRACK}px; height: 26px; border-radius: 999px;
             background: var(--sp-surface); border: 1px solid var(--sp-line)"
    >
      <span
        data-part="${key}" ${subject ? 'data-subject ' : ''}data-pace="slow" data-heading="out"
        style="position: absolute; left: ${INSET}px; top: 4px; width: ${TILE}px; height: 18px; border-radius: 999px;
               background: var(--sp-accent); transform: translateX(0px); will-change: transform"
      ></span>
    </div>
  </div>`;

/**
 * Yo-yo loop specimen: the same crossing run twice, side by side, differing only in what happens at
 * the far end. The top lane restarts, cutting back to frame one with nothing drawn in between, and
 * that cut is the seam the term exists to remove. The bottom lane alternates, walking home through
 * every frame it came through, so its loop has no cut in it anywhere.
 *
 * The subject is the yo-yo tile alone. The restarting lane is the counter-example the specimen is
 * read against and is a different element, never a state the subject passes through, so no
 * `data-pose` is needed: the subject is the term at every resting state. That lane, the pace picker
 * and the note carry the context register.
 *
 * Both loops are legs of a CSS transition scheduled on the stage's clock rather than an endless
 * `element.animate`, which is what lets a pose stop them where they stand and what keeps the two
 * lanes in one phase: they turn at the same instants, and picking a pace restarts both from frame
 * one together. Each leg publishes its direction in `data-heading`, so a script can prove the return
 * leg happens rather than trusting the pixels. Under `prefersReducedMotion` neither loop runs and
 * both tiles rest on their last frame, since endless motion is the exact thing that preference is
 * about.
 *
 * Everything is absolutely placed inside tracks fixed at mount and the note holds its own height, so
 * nothing in the scene can move anything else (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-pace="slow" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Loop</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Pace" data-part="pace" data-value="slow">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow">Slow</button>
            <button class="sp-segment" type="button" data-part="seg-brisk" value="brisk">Brisk</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 18px; padding: 14px 12px">
          ${lane('restart', 'normal', 'restarts at frame one', false)}
          ${lane('yoyo', 'alternate', 'plays back the way it came', true)}
          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="height: 34px; font-size: 12px; line-height: 1.4"
          >Both cross in 1500 ms. Only the top lane has a jump in it with no frames inside.</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const restart = part(root, 'restart');
  const yoyo = part(root, 'yoyo');
  const sayRestart = part(root, 'say-restart');
  const sayYoyo = part(root, 'say-yoyo');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);

  let pace: Pace = 'slow';
  let pending: number[] = [];

  const later = (fn: () => void, ms: number): void => {
    pending.push(clock.setTimeout(fn, ms));
  };

  const drop = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending = [];
  };

  const move = (tile: HTMLElement, to: number, ms: number) => {
    tile.style.transition = ms > 0 ? `transform ${ms}ms linear` : 'none';
    tile.style.transform = `translateX(${to}px)`;
  };

  /** The yo-yo: out, then back, turning at every leg boundary and drawing every frame twice. */
  const crossYoyo = (outward: boolean) => {
    const ms = PACES[pace];
    yoyo.dataset.heading = outward ? 'out' : 'back';
    sayYoyo.textContent = outward ? 'playing forwards' : 'playing backwards';
    move(yoyo, outward ? TRAVEL : 0, ms);
    later(() => crossYoyo(!outward), ms);
  };

  /** The plain loop: out, then a cut. `cut` is false only on the very first crossing, so both
      lanes turn on the same beats no matter how long the seam is held. */
  const crossRestart = (cut: boolean) => {
    const run = () => {
      const ms = PACES[pace] - (cut ? SNAP : 0);
      restart.dataset.heading = 'out';
      sayRestart.textContent = 'playing forwards';
      move(restart, TRAVEL, ms);
      later(() => crossRestart(true), ms);
    };
    if (!cut) return run();
    restart.dataset.heading = 'cut';
    sayRestart.textContent = 'cut back to frame one';
    move(restart, 0, 0);
    later(run, SNAP);
  };

  const start = () => {
    drop();
    for (const tile of [restart, yoyo]) {
      tile.dataset.pace = pace;
      tile.dataset.heading = 'out';
      move(tile, 0, 0);
    }
    note.textContent = `Both cross in ${PACES[pace]} ms. Only the top lane has a jump in it with no frames inside.`;
    // One beat before the first legs, so the reset to frame one is a written state rather than a
    // value the browser is still holding a transition against.
    later(() => {
      crossYoyo(true);
      crossRestart(false);
    }, SNAP);
  };

  const rest = () => {
    for (const tile of [restart, yoyo]) {
      tile.dataset.pace = pace;
      tile.dataset.heading = 'out';
      move(tile, TRAVEL, 0);
    }
    sayRestart.textContent = 'loop held';
    sayYoyo.textContent = 'loop held';
    note.textContent = 'Reduced motion: neither loop runs, so both tiles rest on their last frame.';
  };

  // Each segment names a pace outright and restarts both loops from frame one, so a resumed pass
  // lands on the pace it asked for rather than stepping to the next one (SPEC §8).
  part(root, 'pace').addEventListener('change', (event) => {
    pace = (event as CustomEvent<string>).detail as Pace;
    scene.dataset.pace = pace;
    if (reduced) return rest();
    start();
  });

  if (reduced) rest();
  else start();
}
