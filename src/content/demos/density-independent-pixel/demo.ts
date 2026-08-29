import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The control the whole claim is about. Stated once, and never written to again. */
const DP = 48;
const PHONE_W = 150;
const PHONE_H = 150;

/** The device pixel grid drawn behind each screen: same room, more cells as density rises. */
const GRID_CELL: Record<string, number> = { '1x': 12, '2x': 6, '3x': 4 };

const BUCKETS: Record<string, { label: string; scale: number }> = {
  '1x': { label: 'mdpi', scale: 1 },
  '2x': { label: 'xhdpi', scale: 2 },
  '3x': { label: 'xxhdpi', scale: 3 },
};

const NOTES: Record<string, string> = {
  '1x': 'At 1x a dp is one device pixel, so the two phones are drawing the button the same way.',
  '2x': 'At 2x the same 48 dp button is painted with 96 device pixels and stays exactly as large.',
  '3x': 'At 3x it takes 144 device pixels to draw the same button. Density buys detail, never room.',
};

const gridImage = (bucket: string) => {
  const cell = GRID_CELL[bucket] ?? 12;
  const ink = 'color-mix(in srgb, var(--sp-muted) 26%, transparent)';
  return `repeating-linear-gradient(to right, ${ink} 0 1px, transparent 1px ${cell}px), repeating-linear-gradient(to bottom, ${ink} 0 1px, transparent 1px ${cell}px)`;
};

const readout = (bucket: string) => {
  const info = BUCKETS[bucket];
  if (!info) return '';
  return `${bucket} ${info.label} &middot; ${DP} dp = ${DP * info.scale} px`;
};

/**
 * Density independent pixel specimen: one 48 dp button on two phones of different density,
 * with the device pixel count under each and a pixel grid behind both.
 *
 * The subject is the button on the right hand phone, the one whose density changes: the
 * term names the unit the control is sized in, and the point is that this button never
 * changes size while everything about the screen under it does. The frames, the grids, the
 * readouts and the caption are scenery in the context register (SPEC §5). Both buttons stay
 * in the normal register on purpose, because dimming one of a matched pair would contradict
 * the claim the pair is making: they are the same control at the same size.
 *
 * Nothing in the demo ever writes the button's width or height. The bucket changes the grid
 * behind the screen and the number printed under it, and that is all (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const phone = (side: string, bucket: string, subject: boolean) => `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
      <div
        data-part="phone-${side}"
        data-density="${bucket}"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
               width: ${PHONE_W}px; height: ${PHONE_H}px; padding: 10px; border-radius: 16px;
               background: var(--sp-surface); border: 1px solid var(--sp-line); overflow: hidden;
               background-image: ${gridImage(bucket)}"
      >
        <button
          class="sp-button"
          type="button"
          data-part="button-${side}"
          ${subject ? 'data-subject' : ''}
          aria-label="New booking"
          style="display: flex; align-items: center; justify-content: center; width: ${DP}px; height: ${DP}px; padding: 0; border-radius: 14px"
        >${icon('plus')}</button>
        <span style="display: flex; flex-direction: column; align-items: center; gap: 4px">
          <span style="width: ${DP}px; height: 4px; border-radius: 2px; background: var(--sp-muted); opacity: 0.6"></span>
          <span class="sp-label sp-context" style="font-size: 10px">${DP} dp</span>
        </span>
      </div>
      <span class="sp-label sp-context" data-part="px-${side}" style="font-size: 11px">${readout(bucket)}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">One ${DP} dp button, two phones</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-axis="Screen density" data-value="3x">
            <button class="sp-segment" type="button" data-part="seg-1x" value="1x">1x</button>
            <button class="sp-segment" type="button" data-part="seg-2x" value="2x">2x</button>
            <button class="sp-segment" type="button" data-part="seg-3x" value="3x">3x</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px 12px">
          <div style="display: flex; justify-content: center; gap: 24px; flex: 0 0 auto">
            ${phone('a', '1x', false)}${phone('b', '3x', true)}
          </div>
          <span class="sp-text sp-context" data-part="caption" style="height: 40px; max-width: 428px; text-align: center">${NOTES['3x']}</span>
        </div>
      </div>
    </div>
  `;

  const phoneB = part(root, 'phone-b');
  const pxB = part(root, 'px-b');
  const caption = part(root, 'caption');

  const apply = (bucket: string) => {
    const note = NOTES[bucket];
    if (!note) return;
    phoneB.dataset.density = bucket;
    phoneB.style.backgroundImage = gridImage(bucket);
    pxB.innerHTML = readout(bucket);
    caption.textContent = note;
  };

  // Each segment names a density bucket, so a scripted step lands on that bucket rather
  // than stepping to whichever one comes next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
