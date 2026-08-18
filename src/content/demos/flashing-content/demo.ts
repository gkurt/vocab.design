import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

type Rate = 'slow' | 'fast' | 'over';

/**
 * The lamp's two states, pinned rather than tokenised. The exemption this specimen relies on is a
 * claim about ABSOLUTE luminance, so it has to survive a theme change: a lamp that dimmed toward a
 * dark surface would drop the darker state to nearly nothing and the whole argument with it.
 * White against #efefef is a swing of 13.7% of maximum with the darker state at 0.86.
 */
const LIT = '#ffffff';
const DIM = '#efefef';
/** 120 x 56 = 6,720px, comfortably inside the 21,824px small safe area. */
const LAMP_W = 120;
const LAMP_H = 56;

/** Half-periods in ms. `over` gets none: the refused rate is refused by never scheduling it. */
const HALF: Record<Rate, number> = { slow: 833, fast: 125, over: 0 };

const HZ: Record<Rate, string> = { slow: '0.6', fast: '4', over: '24' };
const READING: Record<Rate, string> = { slow: '0.6 a second', fast: '4 a second', over: '24 a second' };
/** What the darker state and lit area WOULD be at the refused rate, which is why it is refused. */
const DARKER: Record<Rate, string> = { slow: '0.86', fast: '0.86', over: '0.03' };
const AREA: Record<Rate, string> = { slow: '6,720px', fast: '6,720px', over: '62,376px' };
const EXEMPT: Record<Rate, string> = { slow: 'yes', fast: 'yes', over: 'no' };

const VERDICT: Record<Rate, string> = {
  slow: 'Under three a second, so the thresholds never come into it.',
  fast: 'Over three a second and still below the threshold: the swing is too light, and the lamp too small, to count as a flash at all.',
  over: 'Not played. Twenty four a second at full contrast, over a region past the safe area, is the shape of the thing this criterion exists to stop.',
};

const CAPTION: Record<Rate, string> = {
  slow: 'A slow pulse is not in scope: a flash has to be counted before any of the thresholds are worth measuring.',
  fast: 'Four a second is past the count and still lawful, because a flash needs a swing over 10% of maximum AND a darker state under 0.80. This one is 13.7% and 0.86, so the second half fails and it is not a flash.',
  over: 'The specimen refuses this one. The numbers beside it are what it would be measuring, not what it is drawing.',
};

/**
 * Flashing content specimen. It demonstrates the term the only way that is defensible: by running
 * a flash that is genuinely FASTER than the three-a-second count and genuinely below the threshold
 * anyway, and by refusing the rate that would not be.
 *
 * Two independent exemptions are stacked, and both are stated on screen rather than promised in
 * prose. The lamp swings white to #efefef, which is 13.7% of maximum relative luminance with the
 * darker state at 0.86: a general flash needs a swing of 10% or more AND a darker state below
 * 0.80, so this fails the second half and is not a flash at any rate. Independently, the lamp is
 * 120 by 56, which is 6,720px against the 21,824px small safe area. Saturated red, which carries
 * its own stricter rule and no luminance escape, appears nowhere.
 *
 * Every frame comes from the clock the stage hands mount(), so identify freezes the lamp with the
 * rest of the specimen and the stage stops it off screen (SPEC §7). Scripted motion is gated on
 * `prefersReducedMotion` (SPEC §6): a reader who has asked for less gets the lamp at rest.
 *
 * The subject is the region whose rate is being measured, which it honestly is in every resting
 * state, including the refused one where the measurement is what stops it. The picker, the meter
 * and the caption are scenery (SPEC §5), and all three states use the same boxes.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Asked for</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="slow">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">0.6 a second</button>
            <button class="sp-segment" type="button" data-part="seg-fast" value="fast"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">4 a second</button>
            <button class="sp-segment" type="button" data-part="seg-over" value="over"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">24 a second</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; height: 132px; gap: 10px; align-items: stretch">
          <div class="sp-surface" data-part="region" data-subject data-rate="slow"
               style="flex: 1 1 auto; min-width: 0; padding: 10px; display: flex; flex-direction: column;
                      gap: 8px; align-items: center">
            <div data-part="lamp"
                 style="width: ${LAMP_W}px; height: ${LAMP_H}px; flex: 0 0 auto; border-radius: 6px;
                        background: ${LIT}; border: 1px solid #d4d4d4; display: flex;
                        align-items: center; justify-content: center">
              <span data-part="still" hidden style="font-size: 10px; color: #6b6b6b">Still frame</span>
            </div>
            <span class="sp-text sp-context" data-part="verdict" data-state="slow"
                  style="min-height: 52px; font-size: 10.5px; line-height: 1.35">${VERDICT.slow}</span>
          </div>

          <div class="sp-surface sp-context" data-part="meter"
               style="flex: 0 0 176px; padding: 9px 10px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Rate</span>
              <span class="sp-text--ink" data-part="rate" data-hz="0.6" style="font-size: 11.5px">${READING.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Darker state</span>
              <span class="sp-text--ink" data-part="darker" style="font-size: 11.5px">${DARKER.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Lit area</span>
              <span class="sp-text--ink" data-part="area" style="font-size: 11.5px">${AREA.slow}</span>
            </span>
            <span class="sp-row sp-row--between" style="gap: 8px">
              <span class="sp-label" style="font-size: 9.5px">Below threshold</span>
              <span class="sp-text--ink" data-part="exempt" data-ok="yes" style="font-size: 11.5px">${EXEMPT.slow}</span>
            </span>
            <span class="sp-text" style="margin-top: 2px; font-size: 9.5px; line-height: 1.3">
              Limits: 3 a second, 10% swing, darker state 0.80, 21,824px. Saturated red counts separately.
            </span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-rate="slow"
           style="margin: 8px 0 0; height: 42px; font-size: 10.5px; line-height: 1.35">${CAPTION.slow}</p>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const lamp = part(root, 'lamp');
  const still = part(root, 'still');
  const verdict = part(root, 'verdict');
  const rate = part(root, 'rate');
  const darker = part(root, 'darker');
  const area = part(root, 'area');
  const exempt = part(root, 'exempt');
  const caption = part(root, 'caption');

  // A reader who has asked for less motion gets the lamp at rest, not a slower flash (SPEC §6).
  const reduced = prefersReducedMotion(root);
  let timer = 0;
  let lit = true;

  const beat = (half: number) => {
    lit = !lit;
    lamp.style.background = lit ? LIT : DIM;
    timer = clock.setTimeout(() => beat(half), half);
  };

  const apply = (next: Rate) => {
    clock.clearTimeout(timer);
    lit = true;
    lamp.style.background = LIT;
    region.dataset.rate = next;
    flag(still, 'hidden', next !== 'over');
    verdict.dataset.state = next;
    verdict.textContent = VERDICT[next];
    rate.dataset.hz = HZ[next];
    rate.textContent = READING[next];
    darker.textContent = DARKER[next];
    area.textContent = AREA[next];
    exempt.dataset.ok = EXEMPT[next];
    exempt.textContent = EXEMPT[next];
    caption.dataset.rate = next;
    caption.textContent = CAPTION[next];
    // The refused rate is refused by never scheduling it, never by running a faster timer.
    if (HALF[next] && !reduced) beat(HALF[next]);
  };

  apply('slow');

  part(root, 'picker').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Rate);
  });
}
