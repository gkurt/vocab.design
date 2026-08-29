import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif for the rungs, as a local stack: a ladder of sizes cannot be shown in
 * the kit's single sans at one size (SPEC §5).
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const SAMPLE = 'Typeset';
const BASE = 16;

const RATIOS = {
  minor: { value: 1.2, name: 'minor third' },
  fourth: { value: 1.333, name: 'perfect fourth' },
  fifth: { value: 1.5, name: 'perfect fifth' },
} as const;

type RatioKey = keyof typeof RATIOS;

/**
 * Rung heights, largest step first, cut for the widest ratio the control offers
 * (1.5, so 54px by the fourth step) at the leading below, and no taller: the whole
 * ladder has to fit the stage with its caption. They never change, which is what
 * keeps a steeper scale from growing the ladder and shoving the caption down the
 * frame (SPEC §5).
 */
const RUNGS = [
  { step: 3, height: 64 },
  { step: 2, height: 44 },
  { step: 1, height: 31 },
  { step: 0, height: 26 },
];

const sizeAt = (ratio: number, step: number) => BASE * ratio ** step;

/**
 * Modular scale specimen: four rungs generated from one base and one ratio,
 * each ruled off and labelled with the arithmetic that produced it, and a
 * control in the scenery that swaps the ratio so the same ladder is rebuilt at
 * a different pitch.
 *
 * The subject is the ladder. A scale is the set of related steps rather than
 * any one size, so no single rung is the term and the narrowest honest answer
 * is the whole ruled run (SPEC §5); the ratio control and the readout are the
 * demo's own instrumentation and stay outside it. Every ratio the control
 * offers is a real modular scale, so there is no dishonest state here for
 * identify to refuse.
 *
 * Sizes are computed, never measured, and each rung is a fixed box that clips,
 * so switching ratios repaints the ladder without moving anything around it. The
 * window is drawn to fit the stage with the caption still on it, since a ladder
 * whose last rung is cut off by the clip box teaches the wrong thing.
 */
export function mount(root: HTMLElement): void {
  const rungs = RUNGS.map(
    ({ step, height }) => `
      <div class="sp-row" data-part="rung-${step}"
           style="height: ${height}px; gap: 12px; align-items: flex-end; overflow: hidden;
                  border-bottom: 1px solid var(--sp-line); padding-bottom: 3px">
        <span class="sp-label" data-part="math-${step}"
              style="width: 132px; font-variant-numeric: tabular-nums; white-space: nowrap"></span>
        <span data-part="sample-${step}" style="font-family: ${FACE}; white-space: nowrap; line-height: 1.1">${SAMPLE}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 8px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">base ${BASE}px</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="minor" data-axis="Ratio">
            <button class="sp-segment" data-part="seg-minor" value="minor">1.2</button>
            <button class="sp-segment" data-part="seg-fourth" value="fourth">1.333</button>
            <button class="sp-segment" data-part="seg-fifth" value="fifth">1.5</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="ladder" data-subject data-ratio="minor" style="gap: 0; margin-top: 6px">
          ${rungs}
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 6px">
          <span class="sp-text" data-part="readout"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px; font-size: 12px">
          Nothing here was chosen. Every rung is the one below it multiplied by the ratio, which is why a
          steeper ratio runs out of usable sizes by the fourth step and a shallow one barely separates them.
        </p>
      </div>
    </div>
  `;

  const ladder = part(root, 'ladder');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const ratio = RATIOS[key as RatioKey];
    if (!ratio) return;
    ladder.dataset.ratio = key;
    for (const { step } of RUNGS) {
      const size = sizeAt(ratio.value, step);
      part(root, `sample-${step}`).style.fontSize = `${size.toFixed(1)}px`;
      part(root, `math-${step}`).innerHTML =
        step === 0 ? `base = ${BASE.toFixed(1)}px` : `${BASE} × ${ratio.value}<sup>${step}</sup> = ${size.toFixed(1)}px`;
    }
    readout.textContent = `Ratio ${ratio.value}, the ${ratio.name}: ${sizeAt(ratio.value, 3).toFixed(0)}px by the fourth step.`;
  };

  apply('minor');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
