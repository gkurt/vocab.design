import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The ramp states its own two colours, because the ratio printed beside it is a measurement
 * against named values. #898989 on #f4f5f7 is 3.2:1: over the 3:1 large text is allowed and
 * under the 4.5:1 everything else owes, which is the only pair of colours that can show the
 * threshold doing anything at all.
 */
const PAPER = '#f4f5f7';
const INK = '#23262b';
const SAMPLE = '#898989';
const RATIO = '3.2:1';

type Weight = 'regular' | 'bold';

/** 18 pt is 24 px; 14 pt bold is 18.66 px. The rows straddle both. */
const LIMIT: Record<Weight, number> = { regular: 24, bold: 18.66 };

/** Where the boundary is drawn: the middle of the gap it falls in, per weight. */
const LINE_TOP: Record<Weight, number> = { regular: 74, bold: 30 };

const STARTS: Record<Weight, string> = { regular: '24 px (18 pt)', bold: '18.7 px (14 pt bold)' };

const CAPTION: Record<Weight, string> = {
  regular:
    'Eighteen point is 24 px, and that is where the required ratio drops from 4.5:1 to 3:1. The same grey fails at 20 px and passes at 26 px.',
  bold: 'Bold moves the boundary down to 14 point, about 18.7 px, so the 20 px line counts as large text and passes on exactly the same two colours.',
};

const ROWS = [
  { px: 16, pt: '12 pt', top: 0, height: 24 },
  { px: 20, pt: '15 pt', top: 40, height: 28 },
  { px: 26, pt: '19.5 pt', top: 84, height: 34 },
] as const;

const PHRASE = 'Boarding now';

/**
 * Large text threshold specimen: one string at three sizes, in one pair of colours measuring
 * 3.2:1, with the boundary drawn across the ramp. Above the line the text is large-scale and
 * 3:1 is enough, so 3.2:1 passes; below it the same grey owes 4.5:1 and fails. Switching the
 * ramp to bold moves the boundary from 24 px down to 18.7 px, and the 20 px line changes its
 * verdict without a single colour changing.
 *
 * The subject is the boundary itself, which has no element of its own in a real design, so it
 * is given one: the rule drawn across the ramp, four pixels tall so the stage can see it
 * (SPEC §5). The samples, the verdicts, the picker and the caption are scenery. Both positions
 * of the line are the threshold, so there is no dishonest state to pose against.
 *
 * Every row is absolutely placed at a fixed top inside a container of stated height, so the
 * line is the only thing that moves when the weight changes (SPEC §5), and nothing is measured
 * after a style write. No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const large = (px: number, weight: Weight) => px >= LIMIT[weight];

  const row = (item: (typeof ROWS)[number]) => `
    <div class="sp-row sp-row--between" data-part="row-${item.px}"
         style="position: absolute; left: 0; right: 0; top: ${item.top}px; height: ${item.height}px; gap: 10px">
      <span data-part="sample-${item.px}" data-weight="regular"
            style="flex: 0 0 auto; font-size: ${item.px}px; line-height: 1; color: ${SAMPLE}">${PHRASE}</span>
      <span class="sp-row" style="flex: 0 0 auto; gap: 12px">
        <span style="width: 78px; text-align: right; font-size: 10px; color: ${INK}">${item.px} px · ${item.pt}</span>
        <span data-part="verdict-${item.px}" data-pass="${large(item.px, 'regular') ? 'yes' : 'no'}"
              style="width: 82px; text-align: right; font-size: 10px; font-weight: 600; color: ${INK}">
          ${large(item.px, 'regular') ? 'Passes 3:1' : 'Fails 4.5:1'}
        </span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Sample weight" data-part="weight" data-value="regular">
            <button class="sp-segment" type="button" data-part="seg-regular" value="regular"
                    style="padding: 4px 12px; font-size: 11.5px">Regular</button>
            <button class="sp-segment" type="button" data-part="seg-bold" value="bold"
                    style="padding: 4px 12px; font-size: 11.5px">Bold</button>
          </sp-segmented>
        </div>

        <div data-part="ramp" style="margin-top: 10px; padding: 12px; border-radius: 8px; background: ${PAPER}">
          <div style="position: relative; height: 118px">
            ${ROWS.map(row).join('')}
            <span data-part="threshold" data-subject data-weight="regular"
                  style="position: absolute; left: 0; right: 0; top: ${LINE_TOP.regular}px; height: 4px;
                         border-radius: 2px; background: var(--sp-accent); transition: top 0.28s var(--sp-ease)"></span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Large text starts at
            <span data-part="starts" data-weight="regular"
                  style="color: var(--sp-ink); font-weight: 500">${STARTS.regular}</span></span>
          <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">
            All three samples at ${RATIO}
          </span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-weight="regular"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.regular}</p>
      </div>
    </div>
  `;

  const threshold = part(root, 'threshold');
  const starts = part(root, 'starts');
  const caption = part(root, 'caption');

  const apply = (weight: Weight) => {
    threshold.dataset.weight = weight;
    threshold.style.top = `${LINE_TOP[weight]}px`;
    for (const item of ROWS) {
      const sample = part(root, `sample-${item.px}`);
      sample.dataset.weight = weight;
      sample.style.fontWeight = weight === 'bold' ? '700' : '400';
      const verdict = part(root, `verdict-${item.px}`);
      const passes = large(item.px, weight);
      verdict.dataset.pass = passes ? 'yes' : 'no';
      verdict.textContent = passes ? 'Passes 3:1' : 'Fails 4.5:1';
    }
    starts.dataset.weight = weight;
    starts.textContent = STARTS[weight];
    caption.dataset.weight = weight;
    caption.textContent = CAPTION[weight];
  };

  part(root, 'weight').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Weight);
  });

  apply('regular');
}
