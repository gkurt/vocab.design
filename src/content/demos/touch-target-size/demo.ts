import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

type Cell = { key: string; size: number; note: string };

const CELLS = [
  { key: 'small', size: 24, note: 'clears the WCAG floor, still a squeeze' },
  { key: 'big', size: 44, note: 'the platform figure for a thumb' },
] as const satisfies readonly Cell[];

/**
 * Touch target size specimen: the same star at the same 16 px, in two controls that
 * do not react over the same area. The segmented control switches what the dashed
 * measurement traces, glyph or target, which is the whole distinction the term is
 * about: the painted mark is not the region that answers a finger.
 *
 * The subject is the comfortable control, since the term names the control's own
 * activation region rather than the pair or the annotation drawn over it. Both cells
 * hold a fixed 52 px box, so the measurement can change what it traces without
 * anything in the row moving (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cells = CELLS.map(
    (cell) => `
      <div class="sp-stack" style="align-items: center; gap: 10px; width: 132px">
        <div data-part="stage-${cell.key}" style="position: relative; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px">
          <button
            class="sp-button sp-button--ghost"
            type="button"
            aria-label="Favourite"
            data-part="target-${cell.key}"
            ${cell.key === 'big' ? 'data-subject' : ''}
            style="display: flex; align-items: center; justify-content: center; width: ${cell.size}px; height: ${cell.size}px; padding: 0"
          >${icon('star')}</button>
          <span
            data-part="zone-${cell.key}"
            data-mode="target"
            style="position: absolute; border: 1px dashed var(--sp-accent); border-radius: 7px; pointer-events: none"
          ></span>
        </div>
        <div class="sp-stack sp-context" style="align-items: center; gap: 2px">
          <span class="sp-label" data-part="size-${cell.key}"></span>
          <span class="sp-text" style="font-size: 11px; text-align: center">${cell.note}</span>
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Photo actions</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="target">
            <button class="sp-segment" data-part="seg-glyph" value="glyph">Glyph</button>
            <button class="sp-segment" data-part="seg-target" value="target">Target</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="justify-content: center; gap: 16px; margin-top: 16px">${cells}</div>
      </div>
    </div>
  `;

  const measure = (mode: string) => {
    for (const cell of CELLS) {
      const stage = part(root, `stage-${cell.key}`);
      const button = part(root, `target-${cell.key}`);
      const glyph = button.querySelector('svg');
      const zone = part(root, `zone-${cell.key}`);
      const measured = mode === 'glyph' ? glyph : button;
      const box = measured ? localBox(measured, stage) : undefined;
      if (!box) continue;
      zone.dataset.mode = mode;
      zone.style.left = `${box.left - 3}px`;
      zone.style.top = `${box.top - 3}px`;
      zone.style.width = `${box.width + 6}px`;
      zone.style.height = `${box.height + 6}px`;
      // Read off the specimen rather than repeated from the markup: the caption is a
      // measurement, and a measurement that was typed in could be wrong.
      part(root, `size-${cell.key}`).textContent = `${Math.round(box.width)} × ${Math.round(box.height)} px`;
    }
  };
  measure('target');

  part(root, 'segmented').addEventListener('change', (event) => measure((event as CustomEvent<string>).detail));

  for (const cell of CELLS) {
    const button = part(root, `target-${cell.key}`);
    button.addEventListener('click', () => flag(button, 'data-selected', true));
  }
}
