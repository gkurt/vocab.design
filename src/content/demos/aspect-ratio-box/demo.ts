import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One width, three proportions. The box takes its height from the ratio, never the reverse. */
const WIDTH = 176;

const RATIOS: Record<string, { css: string; label: string; w: number; h: number }> = {
  '16-9': { css: '16 / 9', label: '16 / 9', w: 16, h: 9 },
  '4-3': { css: '4 / 3', label: '4 / 3', w: 4, h: 3 },
  '1-1': { css: '1 / 1', label: '1 / 1', w: 1, h: 1 },
};

/** The tallest case, reserved once so the caption beside it never moves (SPEC §5). */
const RESERVE = WIDTH;

/**
 * Aspect ratio box specimen: one width, three ratios, the height derived from the ratio by
 * the `aspect-ratio` property itself. The subject is the box, which is the only thing the
 * term names: the caption beside it and the ratio switcher are the scene.
 *
 * The box growing is the term, so the room for the tallest case is reserved up front and
 * the box grows downward inside it. The caption sits beside the box rather than under it,
 * which is what keeps the change contained: at 1:1 there is nothing below to push.
 *
 * The reported height is arithmetic from the ratio and the width the demo set, not a
 * measurement taken straight after a style write.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Ratio</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="16-9" data-axis="Aspect">
            <button class="sp-segment" type="button" data-part="seg-16-9" value="16-9">16:9</button>
            <button class="sp-segment" type="button" data-part="seg-4-3" value="4-3">4:3</button>
            <button class="sp-segment" type="button" data-part="seg-1-1" value="1-1">1:1</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; padding: 12px 14px">
          <div style="flex: 0 0 auto; width: ${WIDTH}px; height: ${RESERVE}px">
            <div
              class="sp-row"
              data-part="box"
              data-subject
              data-ratio="16-9"
              style="justify-content: center; width: ${WIDTH}px; aspect-ratio: ${RATIOS['16-9']?.css}; background: var(--sp-accent-soft); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-heading" data-part="ratio-label" style="font-variant-numeric: tabular-nums">16 / 9</span>
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0">
            <span class="sp-heading">Tidal bore, Qiantang</span>
            <div class="sp-line" style="width: 94%"></div>
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 90%"></div>
            <div class="sp-line" style="width: 58%"></div>
            <span class="sp-text" data-part="readout" style="margin-top: 6px; font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const box = part(root, 'box');
  const label = part(root, 'ratio-label');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const ratio = RATIOS[key];
    if (!ratio) return;
    box.dataset.ratio = key;
    box.style.aspectRatio = ratio.css;
    label.textContent = ratio.label;
    readout.textContent = `width ${WIDTH}px · height ${Math.round((WIDTH * ratio.h) / ratio.w)}px, from the ratio`;
  };

  // Each segment names a ratio, so the switch lands on that ratio rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('16-9');
}
