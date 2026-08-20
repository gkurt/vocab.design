import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The sheet's box, stated once: switching the mark on or off moves no text (SPEC §5). */
const SHEET = { w: 320, h: 208 };
/** Rows and columns of the tiled mark, sized to cover the sheet once rotated. */
const TILES = { cols: 5, rows: 5 };

const WEIGHTS = {
  clean: { opacity: 0, note: 'No mark at all: nothing here says this page is unfinished.' },
  light: { opacity: 0.16, note: 'Tiled and turned across the whole page, faint enough to read through.' },
  heavy: { opacity: 0.5, note: 'Heavy enough to survive a screenshot, and heavy enough to stop you reading.' },
} as const;
type Weight = keyof typeof WEIGHTS;

interface Picker extends HTMLElement {
  value: string;
}

/**
 * Watermark specimen: one page of a draft contract under three settings of the same mark. The
 * middle setting is the working one, the first shows the page with nothing claiming it, and the
 * third is the craft failure worth seeing: dense enough that no screenshot escapes it and dense
 * enough that the text underneath stops being readable.
 *
 * The subject is the mark itself, given an element of its own sized to the extent it covers,
 * because a watermark has no element until a demo draws one and its extent is the whole content
 * area (SPEC §5). Each repeat is turned on its own inside a grid that fits that box exactly, which
 * is how a tiled watermark is actually built and keeps the ring tracing the page the mark covers. The sheet, its prose and
 * the picker are scenery. The mark is honestly a watermark at both weights, including the bad one,
 * so no `data-pose` condition is needed; the demo mounts with the mark on, so identify has a
 * subject on stage from the first frame.
 *
 * The layer is absolutely positioned over the page and only its opacity changes, so no setting
 * reflows a word. The picker names an absolute weight rather than toggling, so a pass picked up
 * anywhere lands on the same state (SPEC §8). The note under the sheet is a fixed-height slot, so
 * a longer sentence cannot squeeze the page above it.
 */
export function mount(root: HTMLElement): void {
  const tiles = Array.from(
    { length: TILES.cols * TILES.rows },
    () =>
      '<span style="font-size: 13px; font-weight: 700; letter-spacing: 2px; white-space: nowrap; transform: rotate(-24deg)">DRAFT</span>',
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Service agreement</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="light">
            <button class="sp-segment" type="button" data-part="seg-clean" value="clean" style="padding: 4px 9px; font-size: 12px">Clean</button>
            <button class="sp-segment" type="button" data-part="seg-light" value="light" style="padding: 4px 9px; font-size: 12px">Watermarked</button>
            <button class="sp-segment" type="button" data-part="seg-heavy" value="heavy" style="padding: 4px 9px; font-size: 12px">Too heavy</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="sheet"
            style="position: relative; width: ${SHEET.w}px; height: ${SHEET.h}px; padding: 14px 16px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
          >
            <div class="sp-context">
              <span class="sp-heading" style="font-size: 12.5px">Renewal and notice</span>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                This copy is circulated for review only and has not been signed by either party.
              </p>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                Section 3 sets the renewal date. Section 4 sets the notice each side owes the other, and the
                form that notice has to take.
              </p>
              <p class="sp-text" style="margin: 7px 0 0; font-size: 11px; line-height: 1.5">
                Nothing in this copy is binding. Figures shown in Schedule B are still under discussion.
              </p>
            </div>

            <div
              data-part="mark"
              data-subject
              data-weight="light"
              aria-hidden="true"
              style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; color: var(--sp-ink);
                     opacity: ${WEIGHTS.light.opacity}; transition: opacity 0.2s"
            >
              <div
                style="position: absolute; inset: 0; display: grid; grid-template-columns: repeat(${TILES.cols}, 1fr);
                       grid-template-rows: repeat(${TILES.rows}, 1fr); place-items: center"
              >${tiles}</div>
            </div>
          </div>
        </div>

        <span class="sp-label sp-context" data-part="note" data-state="light" style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; height: 34px; padding: 0 16px; text-align: center; line-height: 1.4; font-size: 11px"
          >${WEIGHTS.light.note}</span
        >
      </div>
    </div>
  `;

  const mark = part(root, 'mark');
  const note = part(root, 'note');
  const picker = part(root, 'picker') as Picker;

  const apply = (weight: Weight) => {
    mark.dataset.weight = weight;
    mark.style.opacity = String(WEIGHTS[weight].opacity);
    note.dataset.state = weight;
    note.textContent = WEIGHTS[weight].note;
  };

  picker.addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Weight));
  apply('light');
}
