import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const GAP = 8;
const PAD = 8;
/** The viewport outline is a real 2px edge, so it comes out of the room the columns get. */
const EDGE = 2;
/** The reserved box every viewport is centred in, so nothing outside it moves (SPEC §5). */
const CANVAS = 420;
const HEIGHT = 200;
const INNER_HEIGHT = HEIGHT - 2 * PAD - 2 * EDGE;

interface Viewport {
  key: string;
  label: string;
  width: number;
  /** Heights per column, chosen so every arrangement fills the same box exactly. */
  heights: [number, number, number];
}

const VIEWPORTS: Viewport[] = [
  { key: 'wide', label: 'wide', width: CANVAS, heights: [INNER_HEIGHT, INNER_HEIGHT, INNER_HEIGHT] },
  { key: 'medium', label: 'medium', width: 300, heights: [114, 114, 58] },
  { key: 'narrow', label: 'narrow', width: 190, heights: [54, 54, 54] },
];

const COLUMNS = [
  { label: 'Filters', lines: [100, 72] },
  { label: 'Results', lines: [92, 100] },
  { label: 'Details', lines: [100, 66] },
];

/**
 * Column drop specimen: three full-height columns in a viewport whose width is picked
 * absolutely. Wide, all three sit across; medium, the third peels off and takes the full width
 * below the other two; narrow, the second follows it down and all three are stacked. The
 * numerals stay in reading order in every arrangement, which is the pattern's own promise:
 * columns leave the row one at a time, and never out of turn.
 *
 * The subject is the column that drops, `data-part="col-3"`. The other two are scenery in the
 * context register, along with the viewport outline, the picker and the caption. Every
 * arrangement is sized to fill the same box, so the viewport never changes height and nothing
 * outside it moves as the columns rearrange (SPEC §5).
 *
 * `data-drop` and `data-rows` are measured, not declared: the demo reads which line each column
 * landed on and reports whether the third is still inline or has gone below, and how many lines
 * the three of them occupy. Nothing here transitions a width or a height, so the read after the
 * write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const columns = COLUMNS.map(
    (column, i) => `
      <div
        data-part="col-${i + 1}"
        ${i === COLUMNS.length - 1 ? 'data-subject data-drop="inline"' : 'class="sp-context"'}
        style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; overflow: hidden; padding: 6px 8px;
               background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
      >
        <div class="sp-row" style="gap: 6px">
          <span style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px;
                       border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">${i + 1}</span>
          <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">${column.label}</span>
        </div>
        <div class="sp-stack" style="gap: 4px">
          ${column.lines.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px"></div>`).join('')}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 256px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented class="sp-segmented" data-part="viewports" data-value="wide">
            ${VIEWPORTS.map(
              (viewport) => `
              <button class="sp-segment" type="button" data-part="seg-${viewport.key}" value="${viewport.key}" style="padding: 4px 10px; font-size: 11px">${viewport.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${HEIGHT}px">
            <div
              data-part="viewport"
              data-rows="one"
              style="display: flex; flex-wrap: wrap; align-content: flex-start; gap: ${GAP}px; width: ${CANVAS}px; height: ${HEIGHT}px;
                     padding: ${PAD}px; background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >${columns}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const note = part(root, 'note');
  const columnEls = COLUMNS.map((_, i) => part(root, `col-${i + 1}`));
  const dropper = columnEls[COLUMNS.length - 1];

  const apply = (key: string) => {
    const next = VIEWPORTS.find((entry) => entry.key === key);
    if (!next || !dropper) return;
    const inner = next.width - 2 * PAD - 2 * EDGE;
    const across = next.key === 'wide' ? 3 : next.key === 'medium' ? 2 : 1;
    const width = Math.floor(across === 3 ? (inner - 2 * GAP) / 3 : across === 2 ? (inner - GAP) / 2 : inner);

    viewport.style.width = `${next.width}px`;
    for (const [i, column] of columnEls.entries()) {
      // Every column that is still in the row shares the row; the dropped ones take the width.
      column.style.width = `${i < across ? width : inner}px`;
      column.style.height = `${next.heights[i]}px`;
    }

    // Read back on boxes nothing transitions: which line each column actually landed on.
    const tops = columnEls.map((column) => Math.round(column.offsetTop));
    const rows = new Set(tops).size;
    dropper.dataset.drop = tops[COLUMNS.length - 1] === tops[0] ? 'inline' : 'below';
    viewport.dataset.rows = rows === 1 ? 'one' : rows === 2 ? 'two' : 'three';
    note.textContent =
      rows === 1
        ? `${next.width}px: all three columns share the row, in order.`
        : rows === 2
          ? `${next.width}px: the third column has dropped below the other two.`
          : `${next.width}px: one column per row, still numbered one to three.`;
  };

  part(root, 'viewports').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('wide');
}
