import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const WORD = 'SIGNAL';
const SPLIT = 'text-shadow: 2px 0 rgb(255 32 86 / 0.9), -2px 0 rgb(0 224 255 / 0.9)';
/** Resting offsets: the look at rest is already split and torn, so a frozen pose is
 *  still the term rather than a screenshot of plain type waiting for a burst. */
const REST = { a: -5, b: 4 };
/** One tear per frame, then back to rest. Short, and it never loops (SPEC §5, WCAG 2.3.1). */
const BURST = [{ a: -16, b: 13 }, { a: 9, b: -11 }, { a: -21, b: 6 }, { a: 4, b: -18 }, { a: -9, b: 10 }, REST];
const FRAME_MS = 70;

/**
 * Glitch specimen: the headline is the subject, the CRT panel behind it is scenery.
 * The split is one element carrying a red and a cyan shadow; the tear is two clipped
 * copies of the same word shoved sideways, hidden from assistive technology because a
 * reader should hear the word once, not three times.
 *
 * The burst is scripted, so `motion.css` cannot reach it: it asks
 * `prefersReducedMotion` itself and lands on the resting offsets instead of playing
 * the frames.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const band = (name: string, clip: string, dx: number) => `
    <span data-part="${name}" aria-hidden="true"
          style="position: absolute; inset: 0; clip-path: inset(${clip}); translate: ${dx}px 0; ${SPLIT}">${WORD}</span>`;

  root.innerHTML = `
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="screen" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px), radial-gradient(circle at 50% 40%, #1d2230, #0b0d13 78%)"></div>

      <div data-part="title" data-subject
           style="position: relative; width: 236px; height: 56px; font-size: 46px; font-weight: 800; letter-spacing: 0.05em; line-height: 56px; text-align: center; color: #eef1f7; ${SPLIT}">
        ${WORD}
        ${band('band-top', '14% 0 62% 0', REST.a)}
        ${band('band-low', '58% 0 16% 0', REST.b)}
      </div>

      <div class="sp-context" style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px">
        <div data-part="readout" style="height: 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; color: #ff6a8a; opacity: 0; transition: opacity 0.2s var(--sp-ease)">
          SIGNAL LOST
        </div>
        <button class="sp-button sp-button--sm" data-part="corrupt" type="button">Corrupt</button>
      </div>
    </div>
  `;

  const top = part(root, 'band-top');
  const low = part(root, 'band-low');
  const readout = part(root, 'readout');
  let pending: number[] = [];

  const place = (frame: { a: number; b: number }): void => {
    top.style.translate = `${frame.a}px 0`;
    low.style.translate = `${frame.b}px 0`;
  };

  part(root, 'corrupt').addEventListener('click', () => {
    readout.style.opacity = '1';
    for (const id of pending) clock.clearTimeout(id);
    pending = [];
    if (prefersReducedMotion(root)) {
      place(REST);
      return;
    }
    pending = BURST.map((frame, index) => clock.setTimeout(() => place(frame), index * FRAME_MS));
  });
}
