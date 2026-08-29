import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** A shallow, dark ramp: the condition banding actually shows up in. */
const TOP = '#2b3566';
const BOTTOM = '#0d1024';

const LEVELS = [6, 12, 24];
const START = 6;

/** The colour a given fraction of the way down the ramp, mixed the way a screen would. */
const at = (t: number) => `color-mix(in srgb, ${TOP} ${Math.round((1 - t) * 100)}%, ${BOTTOM})`;

/**
 * The ramp quantised to `count` flat levels, written with two stops at each boundary so
 * every band has a hard edge. Built deliberately rather than hoped for: whether a shallow
 * ramp bands depends on the reader's panel, and a specimen may not depend on that.
 */
const banded = (count: number) => {
  const stops: string[] = [];
  for (let i = 0; i < count; i++) {
    const from = ((i / count) * 100).toFixed(3);
    const to = (((i + 1) / count) * 100).toFixed(3);
    stops.push(`${at(i / (count - 1))} ${from}% ${to}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`;
};

const SMOOTH = `linear-gradient(to bottom, ${TOP}, ${BOTTOM})`;

/**
 * Colour banding specimen: the same shallow dark ramp twice, quantised on the left and as
 * authored on the right. The level count is an absolute state, and every one of the three
 * is coarse enough to stripe, so the subject never stops being the term.
 *
 * The subject is the banded ramp: the narrowest element the word names is the fill the
 * stripes are in, not the pair. Its smooth twin is the comparison and stays in the context
 * register, along with the picker and the readout (SPEC §5).
 *
 * Both panels are fixed size and only paint changes, so switching levels moves nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Levels" data-value="${START}">
            ${LEVELS.map((n) => `<button class="sp-segment" data-part="seg-${n}" value="${n}">${n}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="ramp" data-subject data-levels="${START}"
                 style="height: 142px; border-radius: 8px; background-image: ${banded(START)}"></div>
            <span class="sp-label" data-part="ramp-label" style="text-align: center">Quantised to ${START}</span>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="smooth" style="height: 142px; border-radius: 8px; background-image: ${SMOOTH}"></div>
            <span class="sp-label" style="text-align: center">As authored</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The stripes on the left are hard stops, drawn on purpose. The panel on the right may band too, and that one is your display.
        </p>
      </div>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const label = part(root, 'ramp-label');

  const quantise = (value: string) => {
    const count = Number(value);
    if (!LEVELS.includes(count)) return;
    ramp.dataset.levels = String(count);
    ramp.style.backgroundImage = banded(count);
    label.textContent = `Quantised to ${count}`;
  };
  quantise(String(START));

  part(root, 'segmented').addEventListener('change', (event) => quantise((event as CustomEvent<string>).detail));
}
