import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TARGET = 128_400;
const FRAMES = 24;
const FRAME_MS = 45;

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * Count-up specimen: a quarter's revenue interpolated toward its value instead
 * of being set. Frames come from the stage's clock, so identify can hold the
 * count halfway and read the number that is actually on screen.
 *
 * The value is eased out hard, spending most of the run near the figure it is
 * arriving at: a linear count reads as a machine reporting rather than as a
 * number settling. The subject is the counting value alone, since the label and
 * the delta beside it are an ordinary stat that would be there anyway.
 *
 * Width is reserved rather than earned. Tabular figures keep every digit the
 * same width, and `min-width` holds the room the final string needs, so the row
 * cannot grow from "$0" out to "$128,400" while the reader watches (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 316px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Overview</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="refresh">Refresh</button>
        </div>
        <div class="sp-stack" style="gap: 4px; margin-top: 16px">
          <span class="sp-label sp-context">Revenue this quarter</span>
          <span
            data-part="value"
            data-subject
            style="display: block; min-width: 9ch; font-size: 34px; font-weight: 600; line-height: 1.15; font-variant-numeric: tabular-nums"
          >${money.format(0)}</span>
          <span class="sp-row sp-context" style="gap: 8px; margin-top: 2px">
            <span class="sp-chip" style="cursor: default">+12.4%</span>
            <span class="sp-text">vs last quarter</span>
          </span>
        </div>
      </div>
    </div>
  `;

  const value = part(root, 'value');
  let tick: number | undefined;

  const paint = (n: number) => {
    value.textContent = money.format(n);
  };

  const settle = () => {
    paint(TARGET);
    value.removeAttribute('data-counting');
    value.setAttribute('data-settled', '');
  };

  const run = () => {
    clock.clearTimeout(tick);
    // A reader who asked for less motion gets the figure, which was always the point.
    if (prefersReducedMotion(root)) return settle();

    value.setAttribute('data-counting', '');
    value.removeAttribute('data-settled');

    // Progress is counted in frames rather than read off the wall clock, so a
    // count held by identify resumes where it was instead of jumping to where
    // real time got to while it was frozen (SPEC §6).
    let frames = 0;
    const frame = () => {
      frames += 1;
      if (frames >= FRAMES) return settle();
      const t = frames / FRAMES;
      paint(Math.round(TARGET * (1 - (1 - t) ** 3)));
      tick = clock.setTimeout(frame, FRAME_MS);
    };

    paint(0);
    frame();
  };

  part(root, 'refresh').addEventListener('click', run);
  run();
}
