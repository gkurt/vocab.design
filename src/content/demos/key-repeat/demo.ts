import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The two numbers the operating system owns, stated here so the timeline can name them. */
const DELAY_MS = 520;
const RATE_MS = 110;

const CELLS = 18;
const CELL = 18;
const GAP = 3;
const PITCH = CELL + GAP;
const LAST = CELLS - 1;

const cellMarkup = Array.from(
  { length: CELLS },
  (_, i) =>
    `<span
       data-cell="${i}"
       style="flex: 0 0 auto; width: ${CELL}px; height: 26px; border-radius: 4px; background: var(--sp-sunken); transition: background-color 0.1s linear"
     ></span>`,
).join('');

/**
 * Key repeat specimen: a caret stepping along a row of character cells, once for a press and
 * over and over for a hold, with the initial delay and the repeat rate drawn as the two
 * phases of the timeline underneath. The subject is the track, since the term names what a
 * held key keeps doing to the thing under the caret rather than the key legend or the
 * timeline that measures it; the timeline, the legend, and the hold control are
 * instrumentation and stay in the context register.
 *
 * A synthesized key press is a keydown and a keyup in the same instant (SPEC §7), so a hold
 * is the one part of the gesture that has to be mimed: a labelled control arms it and a
 * second one releases it, both absolute states. The real key stays wired all the same, so a
 * reader who takes the stage over and holds ArrowRight gets the operating system's own
 * repeat, `event.repeat` and all, counted separately in the readout.
 *
 * The caret moves by a transform and every readout holds its width, so a repeat moves the
 * caret and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Line editor</span>
          <span
            class="sp-text"
            data-part="readout"
            data-source="none"
            style="width: 218px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >Press or hold ArrowRight</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 14px">
          <div
            class="sp-surface"
            data-part="track"
            data-subject
            data-index="0"
            data-phase="idle"
            style="position: relative; display: flex; gap: ${GAP}px; padding: 8px; overflow: hidden"
          >
            ${cellMarkup}
            <span
              data-part="caret"
              style="position: absolute; left: 6px; top: 6px; width: 3px; height: 30px; border-radius: 2px; background: var(--sp-accent); transform: translateX(0px); transition: transform 0.07s linear"
            ></span>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px">
            <div class="sp-row" style="gap: 6px">
              <span
                data-part="phase-delay"
                style="display: flex; align-items: center; justify-content: center; width: 128px; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >initial delay ${DELAY_MS} ms</span>
              <span
                data-part="phase-rate"
                class="sp-grow"
                style="display: flex; align-items: center; justify-content: center; height: 24px; border-radius: 5px; background: var(--sp-sunken); font-size: 11px; font-weight: 500; color: var(--sp-muted)"
              >then one every ${RATE_MS} ms until release</span>
            </div>
            <span class="sp-label" style="font-size: 11px">Both numbers belong to the operating system, not to the page.</span>
          </div>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd">ArrowRight</span>
              <span class="sp-label">tapped once, one step</span>
            </span>
            <span class="sp-row" style="gap: 8px">
              <span class="sp-label">Simulated hold</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="hold" type="button">Hold</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="release" type="button">Release</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const caret = part(root, 'caret');
  const readout = part(root, 'readout');
  const delaySeg = part(root, 'phase-delay');
  const rateSeg = part(root, 'phase-rate');
  const holdButton = part(root, 'hold');
  const cells = [...root.querySelectorAll<HTMLElement>('[data-cell]')];

  let index = 0;
  let repeats = 0;
  let held = false;
  let timer: number | undefined;

  const draw = () => {
    for (const [i, cell] of cells.entries()) cell.style.background = i < index ? 'var(--sp-accent-soft)' : 'var(--sp-sunken)';
    caret.style.transform = `translateX(${index * PITCH}px)`;
    track.dataset.index = String(index);
  };

  const lit = (el: HTMLElement, on: boolean) => {
    el.style.background = on ? 'var(--sp-accent)' : 'var(--sp-sunken)';
    el.style.color = on ? 'var(--sp-accent-ink)' : 'var(--sp-muted)';
  };

  const phase = (next: 'idle' | 'delay' | 'repeating') => {
    track.dataset.phase = next;
    lit(delaySeg, next === 'delay');
    lit(rateSeg, next === 'repeating');
  };

  const say = (source: string, text: string) => {
    readout.dataset.source = source;
    readout.textContent = text;
  };

  const step = () => {
    index = Math.min(LAST, index + 1);
    draw();
  };

  const stopHold = (why: string) => {
    clock.clearTimeout(timer);
    timer = undefined;
    held = false;
    flag(holdButton, 'data-selected', false);
    phase('idle');
    say('sim', `${why}: 1 press, ${repeats} repeats`);
  };

  const tick = () => {
    if (!held) return;
    phase('repeating');
    repeats += 1;
    step();
    if (repeats >= 3) flag(track, 'data-ran', true);
    say('sim', `Held: 1 press, ${repeats} repeats`);
    if (index >= LAST) return stopHold('Caret at the end');
    timer = clock.setTimeout(tick, RATE_MS);
  };

  // Reached, never flipped (SPEC §8): arming always starts a run from the same place, so
  // every pass produces the same delay and the same rate.
  const startHold = () => {
    if (held) return;
    held = true;
    repeats = 0;
    index = 0;
    flag(track, 'data-ran', false);
    flag(holdButton, 'data-selected', true);
    step();
    phase('delay');
    say('sim', 'Held: 1 press, 0 repeats');
    timer = clock.setTimeout(tick, DELAY_MS);
  };

  holdButton.addEventListener('click', startHold);
  part(root, 'release').addEventListener('click', () => {
    if (held) return stopHold('Released');
    phase('idle');
    say('none', 'Released: nothing held');
  });

  // The real key, for a reader who has taken the stage over: the first keydown is the
  // press and every one after it carries `repeat`, which is the flag an expensive handler
  // is supposed to check before it acts.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' || held) return;
    event.preventDefault();
    if (!event.repeat) {
      repeats = 0;
      flag(track, 'data-ran', false);
      step();
      phase('delay');
      say('key', 'One press, one step');
      return;
    }
    repeats += 1;
    step();
    if (repeats >= 3) flag(track, 'data-ran', true);
    phase('repeating');
    say('key', `Held: 1 press, ${repeats} repeats`);
  });

  root.addEventListener('keyup', (event) => {
    if (event.key !== 'ArrowRight' || held) return;
    phase('idle');
  });

  phase('idle');
  draw();
}
