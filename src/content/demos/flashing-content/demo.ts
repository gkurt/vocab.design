import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Rate = 'safe' | 'over';

/** The kit's pulse runs one dim and brighten every 1.8 seconds, which is 0.6 a second. */
const HZ: Record<Rate, string> = { safe: '0.6', over: '8' };

const READING: Record<Rate, string> = {
  safe: '0.6 a second',
  over: '8 a second',
};

const VERDICT: Record<Rate, string> = {
  safe: 'Under three in any one second, and a small swing at that, so it plays.',
  over: 'Not played. This specimen holds a still frame instead of showing you eight flashes a second.',
};

const CAPTION: Record<Rate, string> = {
  safe: 'One slow dim and brighten. Criterion 2.3.1 counts flashes in any one second, and this region is nowhere near three.',
  over: 'Eight a second would be over the line, in a region well past the small safe area. The specimen refuses to draw it, and the rest of the reading stands.',
};

/**
 * Flashing content specimen, and the one specimen in the collection that refuses its own subject
 * matter. A region carries a slow pulse, and a segmented control offers a rate above the
 * threshold, which the demo will not play: choosing it stops the region on a still frame and names
 * the limit. Nothing here flashes in any state, at any point in the script, including while
 * attract plays it unattended.
 *
 * The safety of that is not a promise made in prose. The only movement in the file is the kit's
 * own `.sp-pulse`, one cycle every 1.8 seconds, which `motion.css` turns off under a stated motion
 * preference and the stage pauses when the specimen leaves the viewport (SPEC §7). Nothing is
 * animated in script, so there is no keyframe set to gate, and the state that names a dangerous
 * rate removes the animation rather than speeding it up.
 *
 * The subject is the pulsing region, the narrowest element the term names. The picker, the
 * threshold read-outs and the caption are scenery (SPEC §5). The region is honestly the region
 * whose rate is in question at every resting state, so it needs no `data-pose`. Both states use
 * the same boxes, so the refusal moves nothing (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Asked for</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="safe">
            <button class="sp-segment" type="button" data-part="seg-safe" value="safe"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">A slow pulse</button>
            <button class="sp-segment" type="button" data-part="seg-over" value="over"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Past the threshold</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 8px; height: 138px; gap: 10px; align-items: stretch">
          <div class="sp-surface" data-part="region" data-subject data-rate="safe"
               style="flex: 1 1 auto; min-width: 0; padding: 10px; display: flex; flex-direction: column; gap: 8px">
            <div data-part="lamp" class="sp-pulse"
                 style="height: 72px; border-radius: 6px; background: var(--sp-accent-soft);
                        display: flex; align-items: center; justify-content: center">
              <span class="sp-label" data-part="still" hidden style="font-size: 10.5px">Still frame</span>
            </div>
            <span class="sp-text sp-context" data-part="verdict" data-state="safe"
                  style="min-height: 30px; font-size: 10.5px; line-height: 1.35">${VERDICT.safe}</span>
          </div>

          <div class="sp-surface sp-context" data-part="meter"
               style="flex: 0 0 152px; padding: 10px; display: flex; flex-direction: column; gap: 4px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Rate asked for</span>
            <span class="sp-text--ink" data-part="rate" data-hz="0.6"
                  style="font-size: 18px; font-weight: 600; line-height: 1.2">${READING.safe}</span>
            <span class="sp-text" style="font-size: 10.5px; line-height: 1.35">The limit is three in any one second.</span>
            <span class="sp-text" style="font-size: 10.5px; line-height: 1.35">Saturated red counts separately.</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">Region: bigger than the small safe area</span>
          <span class="sp-label" data-part="played" style="flex: 0 0 auto; font-size: 10.5px">Nothing here ever flashes, in any state</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-rate="safe"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${CAPTION.safe}</p>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const lamp = part(root, 'lamp');
  const still = part(root, 'still');
  const verdict = part(root, 'verdict');
  const rate = part(root, 'rate');
  const caption = part(root, 'caption');

  const apply = (next: Rate) => {
    region.dataset.rate = next;
    // The dangerous rate is refused by taking the animation away, never by running one faster.
    lamp.classList.toggle('sp-pulse', next === 'safe');
    flag(still, 'hidden', next === 'safe');
    verdict.dataset.state = next === 'safe' ? 'safe' : 'refused';
    verdict.textContent = VERDICT[next];
    rate.dataset.hz = HZ[next];
    rate.textContent = READING[next];
    caption.dataset.rate = next;
    caption.textContent = CAPTION[next];
  };

  apply('safe');

  part(root, 'picker').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Rate);
  });
}
