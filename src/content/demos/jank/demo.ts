import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The trip both marbles are given, and the cadence a frame is owed. */
const DURATION = 1600;
const FRAME = 17;
/** How far a marble travels: the track's own width, minus its padding and its own size. */
const TRAVEL = 244;
/** Clearance so a replay's reset is painted before the first frame lands on top of it. */
const LEAD = 70;

/** Where the main thread is busy, and for how long. Three holds of uneven length, because
    a stall is never on a schedule of its own. */
const STALLS = [
  { at: 320, ms: 190 },
  { at: 820, ms: 130 },
  { at: 1180, ms: 240 },
];

/**
 * The times the stuttering marble is actually drawn at: the steady cadence with every frame
 * that fell inside a stall simply missing. The frame after a stall is the jump, since it
 * carries the position the marble should have reached while nothing was being drawn.
 */
function schedule(): { time: number; late: boolean }[] {
  const frames: { time: number; late: boolean }[] = [];
  let previous = 0;
  for (let time = FRAME; time < DURATION; time += FRAME) {
    if (STALLS.some((stall) => time >= stall.at && time < stall.at + stall.ms)) continue;
    frames.push({ time, late: time - previous > FRAME * 2 });
    previous = time;
  }
  frames.push({ time: DURATION, late: DURATION - previous > FRAME * 2 });
  return frames;
}

const FRAMES = schedule();
const HOLDS = FRAMES.filter((frame) => frame.late).length;

/**
 * Jank specimen: one marble run, twice. Both marbles are given the same distance and the
 * same 1600 ms, and the only difference is whether every frame arrives. The steady one is a
 * transition the compositor can keep drawing; the stuttering one is placed frame by frame
 * from a schedule with three stalls cut out of it, so it holds where nothing was drawn and
 * then jumps to the position it should already have had.
 *
 * The subject is the stuttering marble: the term names the motion that misses its frames,
 * not the comparison and not the run. The steady marble is scenery in the context register,
 * which is honest here because the fair version is a different element rather than a state
 * this one passes through, so nothing needs a `data-pose`: the subject is the term at rest,
 * mid-stall, and at the end alike.
 *
 * The stalls are the stage's clock, so a pose stops the run where it stands rather than
 * letting it finish under a reader inspecting it (SPEC §6), and `prefersReducedMotion` is
 * asked directly, since a chain of timers is out of reach of any stylesheet: a reader who
 * asked for less movement gets both marbles landed and the count of holds (SPEC §7). Both
 * marbles move with `translate` inside tracks that hold their own size, so a stutter can
 * never move the row it happens in (SPEC §5), and the readout keeps a fixed width for the
 * same reason.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const track = (id: string, subject: boolean) => `
    <div style="position: relative; height: 20px; padding: 3px; border-radius: 999px; background: var(--sp-sunken)">
      <span
        data-part="marble-${id}"
        ${subject ? 'data-subject data-state="rest"' : ''}
        style="position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%;
               background: var(--sp-accent); translate: 0 0"
      ></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Marble run</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Steady</span>
            <span class="sp-label">every frame on time</span>
          </div>
          ${track('steady', false)}
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Stalling</span>
            <span class="sp-label" data-part="holds" data-count="0" style="flex: 0 0 96px; text-align: right">0 holds</span>
          </div>
          ${track('jank', true)}
        </div>

        <p class="sp-text sp-context" style="margin: 14px 0 0">
          Same distance, same 1600 ms. The lower marble is only missing frames.
        </p>
      </div>
    </div>
  `;

  const steady = part(root, 'marble-steady');
  const marble = part(root, 'marble-jank');
  const holds = part(root, 'holds');
  let stepping: number | undefined;

  const land = () => {
    steady.style.transition = 'none';
    steady.style.translate = `${TRAVEL}px 0`;
    marble.style.translate = `${TRAVEL}px 0`;
    marble.dataset.state = 'landed';
    holds.dataset.count = String(HOLDS);
    holds.textContent = `${HOLDS} holds`;
  };

  const step = (index: number) => {
    const frame = FRAMES[index];
    if (!frame) return;
    marble.style.translate = `${(frame.time / DURATION) * TRAVEL}px 0`;
    if (frame.late) {
      const held = Number(holds.dataset.count) + 1;
      holds.dataset.count = String(held);
      holds.textContent = `${held} holds`;
    }
    const next = FRAMES[index + 1];
    if (!next) {
      marble.dataset.state = 'landed';
      return;
    }
    stepping = clock.setTimeout(() => step(index + 1), next.time - frame.time);
  };

  const play = () => {
    clock.clearTimeout(stepping);

    if (prefersReducedMotion(root)) {
      land();
      return;
    }

    // Back to the start with nothing to carry either marble there, then a reflow so the
    // browser cannot fold the reset and the trip into a single change.
    steady.style.transition = 'none';
    steady.style.translate = '0 0';
    marble.style.translate = '0 0';
    marble.dataset.state = 'rolling';
    holds.dataset.count = '0';
    holds.textContent = '0 holds';
    void steady.offsetWidth;

    steady.style.transition = `translate ${DURATION}ms linear ${LEAD}ms`;
    steady.style.translate = `${TRAVEL}px 0`;
    // The first frame is owed at one cadence, since no stall starts before the run does.
    stepping = clock.setTimeout(() => step(0), LEAD + FRAME);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
