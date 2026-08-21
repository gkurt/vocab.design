import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Track geometry, stated rather than measured: the dot travels a known distance. */
const TRACK = 324;
const DOT = 16;
const TRAVEL = TRACK - DOT - 6;

/** The bars are drawn to one scale, so their lengths can be compared as times. */
const SCALE_MS = 700;
const BAR_MAX = 240;

/** One curve for both lanes: the only difference on stage is how long each one runs. */
const CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)';

const LANES = [
  { id: 'short', label: 'short', ms: 150 },
  { id: 'long', label: 'long', ms: 620 },
] as const;

const LONGEST = Math.max(...LANES.map((lane) => lane.ms));

/**
 * Duration specimen: two movers over the same distance on the same curve, one that
 * takes 150 ms and one that takes 620 ms. Duration has no element of its own, so the
 * demo draws one: under each mover sits a bar whose LENGTH is that lane's time, both
 * drawn to a single scale, which is what turns a pair of numbers into a comparison.
 *
 * The subject is the long lane's bar. The term names the stretch of time, not the
 * mover that spends it, so the ring belongs on the drawn time and everything else
 * (the movers, the heading, the Replay control) is scenery in the context register.
 *
 * The run is a plain CSS transition written inline, so reduced motion drops it to the
 * settled position for free, and the specimen mounts at rest: the scripted Replay is
 * then the only owner of any run the reader can see (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, label: string, ms: number, subject: boolean) => {
    const width = Math.round(ms * (BAR_MAX / SCALE_MS));
    return `
      <div class="sp-stack" data-part="lane-${id}" style="gap: 6px; margin-top: 14px">
        <div class="sp-row sp-context">
          <span class="sp-label" style="width: 54px; flex: 0 0 auto">${label}</span>
          <span class="sp-track" style="flex: 0 0 auto; width: ${TRACK}px">
            <span class="sp-dot" data-part="dot-${id}" style="transform: translateX(0px)"></span>
          </span>
        </div>
        <div class="sp-row${subject ? '' : ' sp-context'}">
          <span style="width: 54px; flex: 0 0 auto"></span>
          <span
            data-part="bar-${id}"${subject ? ' data-subject' : ''}
            style="width: ${width}px; height: 8px; flex: 0 0 auto; border-radius: 4px; background: var(--sp-accent)"
          ></span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">${ms} ms</span>
        </div>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="stage" data-state="rest" style="width: 428px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Same distance, same curve</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        ${LANES.map((item) => lane(item.id, item.label, item.ms, item.id === 'long')).join('')}
        <span class="sp-label sp-context" style="display: block; margin-top: 14px">
          Each bar is that lane's duration, both drawn to one scale.
        </span>
      </div>
    </div>
  `;

  const stage = part(root, 'stage');
  let timers: number[] = [];

  const run = () => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    stage.dataset.state = 'running';

    for (const item of LANES) {
      const dot = part(root, `dot-${item.id}`);
      flag(part(root, `lane-${item.id}`), 'data-arrived', false);
      dot.style.transition = 'none';
      dot.style.transform = 'translateX(0px)';
    }

    void stage.offsetWidth; // Force a reflow so every lane restarts from the left together.

    for (const item of LANES) {
      const dot = part(root, `dot-${item.id}`);
      dot.style.transition = `transform ${item.ms}ms ${CURVE}`;
      dot.style.transform = `translateX(${TRAVEL}px)`;
      timers.push(clock.setTimeout(() => flag(part(root, `lane-${item.id}`), 'data-arrived', true), item.ms + 40));
    }

    timers.push(
      clock.setTimeout(() => {
        stage.dataset.state = 'done';
      }, LONGEST + 140),
    );
  };

  part(root, 'replay').addEventListener('click', run);
}
