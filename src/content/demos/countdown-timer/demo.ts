import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TICK_MS = 1000;
/** Four seconds above the hour, so the last stretch arrives while it is watched. */
const START_S = 3604;
/** Below this the readout changes hue and wording: the last stretch, said twice. */
const WARN_S = 3600;

const two = (n: number) => String(n).padStart(2, '0');

function clockFace(total: number): string {
  return `${two(Math.floor(total / 3600))}:${two(Math.floor(total / 60) % 60)}:${two(total % 60)}`;
}

/**
 * Countdown timer specimen: a real shipping cutoff, counting toward a consequence
 * the panel states in words. The subject is the readout alone, not the order panel:
 * the term names the running clock, and the product beside it is only what the
 * clock is attached to.
 *
 * The digits are tabular, so a 1 and a 0 take the same room and the line cannot
 * twitch once a second (SPEC §5). Crossing the hour is a state, not a decoration:
 * it carries the kit's warn hue and a change of wording, because colour must never
 * be the only signal. The tick is a clock timer, so identify can hold the readout
 * still instead of inspecting a number that keeps moving (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Slate table lamp</span>
          <span class="sp-text sp-text--ink">64.00</span>
        </div>
        <div class="sp-divider" style="margin: 12px 0"></div>
        <div class="sp-label sp-context">Delivered tomorrow if you order within</div>
        <div data-part="readout" data-subject role="timer" aria-label="Time left to order for delivery tomorrow"
             style="margin-top: 6px; font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums">
          ${clockFace(START_S)}
        </div>
        <div class="sp-text sp-context" data-part="consequence" style="margin-top: 6px">
          After the 6pm cutoff the next van leaves on Thursday.
        </div>
        <button class="sp-button sp-context" data-part="basket" type="button" style="width: 100%; margin-top: 14px">Add to basket</button>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const consequence = part(root, 'consequence');
  let left = START_S;

  const tick = () => {
    left = Math.max(0, left - 1);
    readout.textContent = clockFace(left);
    if (left < WARN_S && readout.dataset.zone !== 'warn') {
      readout.dataset.zone = 'warn';
      readout.style.color = 'var(--sp-warn)';
      consequence.textContent = 'Under an hour left, then the next van is Thursday.';
    }
    if (left > 0) clock.setTimeout(tick, TICK_MS);
  };

  clock.setTimeout(tick, TICK_MS);
}
