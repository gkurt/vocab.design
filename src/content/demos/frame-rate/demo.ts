import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** One trip across the track, the same distance and the same time for every rate. */
const TRAVEL = 1400;
/** A beat of clearance, so a replay's reset is painted before the first step lands on it. */
const LEAD = 70;

/**
 * Three rates, each stated as the budget it leaves: a frame every 16.7 ms, every 33 ms,
 * every 83 ms. The intervals are what the demo actually steps at, so the numbers beside the
 * tracks are the numbers being drawn.
 */
const RATES = [
  { id: 'fps60', name: '60 fps', budget: '16.7 ms a frame', interval: 17 },
  { id: 'fps30', name: '30 fps', budget: '33 ms a frame', interval: 33 },
  { id: 'fps12', name: '12 fps', budget: '83 ms a frame', interval: 83 },
];

/**
 * Frame rate specimen: one move, drawn three times at three budgets. Every dot covers the
 * same distance in the same 1400 ms and only the number of pictures differs, so what the
 * reader compares is the rate itself rather than the speed. The 12 fps row is where the
 * illusion comes apart: the same travel arrives as seventeen visible placements.
 *
 * The subject is the comparison of the three rates, not any one track: a single dot
 * crossing a track is just a move, and the term names the count of frames it was drawn
 * with. Following the whole-scene reading SPEC §5 gives easing, the comparison is the
 * specimen, but it is marked on the group rather than on the demo's wrapper, so identify
 * still has a part to point at. The frame, the heading, and the Replay control are
 * instrumentation and stay outside it.
 *
 * Nothing here is a CSS animation: each dot is placed by a timer at its own interval, which
 * is the only way a frame rate can be shown rather than described. The steps therefore come
 * from the stage's clock, so a pose stops the run where it stands (SPEC §6), and
 * `prefersReducedMotion` is asked directly, since no stylesheet can reach a chain of
 * timers: a reader who asked for less movement gets the finished frame and the counts
 * (SPEC §7). Each dot is positioned as a percentage of its own track and pulled back by its
 * own width, so no box is ever measured and the rows hold still whatever the numbers say.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = RATES.map(
    (rate) => `
      <div class="sp-stack" style="gap: 5px">
        <div class="sp-row" style="gap: 8px">
          <span class="sp-label sp-text--ink" style="flex: 0 0 46px">${rate.name}</span>
          <span class="sp-label sp-grow">${rate.budget}</span>
          <span class="sp-label" data-part="count-${rate.id}" style="flex: 0 0 74px; text-align: right">0 frames</span>
        </div>
        <div style="position: relative; height: 14px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            data-part="dot-${rate.id}"
            data-at="start"
            style="position: absolute; top: 1px; left: 0; width: 12px; height: 12px; border-radius: 50%;
                   background: var(--sp-accent); transition: none"
          ></span>
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Frame budget</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          class="sp-stack"
          data-part="rates"
          data-subject
          data-state="settled"
          style="gap: 12px; margin-top: 12px"
        >
          ${rows}
        </div>
        <p class="sp-text sp-context" style="margin: 12px 0 0">
          The same 1400 ms of travel, drawn with 83, 43 and 17 pictures.
        </p>
      </div>
    </div>
  `;

  const rates = part(root, 'rates');
  const pending: number[] = [];

  const place = (id: string, frames: number) => {
    const rate = RATES.find((entry) => entry.id === id);
    if (!rate) return;
    const t = Math.min(1, (frames * rate.interval) / TRAVEL);
    const dot = part(root, `dot-${id}`);
    dot.style.left = `${t * 100}%`;
    // Percentages on `translate` resolve against the dot's own width, which keeps it inside
    // the track at both ends without anything being measured.
    dot.style.translate = `${t * -100}% 0`;
    dot.dataset.at = t >= 1 ? 'end' : 'travel';
    part(root, `count-${id}`).textContent = `${frames} frames`;
  };

  const step = (id: string, frames: number) => {
    const rate = RATES.find((entry) => entry.id === id);
    if (!rate) return;
    place(id, frames);
    if (frames * rate.interval < TRAVEL) {
      pending.push(clock.setTimeout(() => step(id, frames + 1), rate.interval));
    }
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;

    if (prefersReducedMotion(root)) {
      for (const rate of RATES) place(rate.id, Math.ceil(TRAVEL / rate.interval));
      rates.dataset.state = 'settled';
      return;
    }

    for (const rate of RATES) {
      const dot = part(root, `dot-${rate.id}`);
      dot.style.left = '0';
      dot.style.translate = '0 0';
      dot.dataset.at = 'start';
      part(root, `count-${rate.id}`).textContent = '0 frames';
    }
    rates.dataset.state = 'playing';

    const settle = () => {
      rates.dataset.state = 'settled';
    };
    for (const rate of RATES) pending.push(clock.setTimeout(() => step(rate.id, 1), LEAD + rate.interval));
    pending.push(clock.setTimeout(settle, LEAD + TRAVEL + 140));
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
