import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Column and row spans over a 6 x 4 field. Both arrangements fill it exactly. */
const CELLS = [
  { label: 'Revenue', span: [4, 2], lines: 2 },
  { label: 'Active', span: [2, 2], lines: 1 },
  { label: 'Churn', span: [3, 1], lines: 0 },
  { label: 'Signups', span: [3, 1], lines: 0 },
  { label: 'Regions', span: [2, 1], lines: 0 },
  { label: 'Latency', span: [4, 1], lines: 0 },
];

const UNIFORM = [2, 2];

/**
 * Bento grid specimen: the same six cells, once at deliberately different sizes
 * and once all equal. The term is the unevenness, so the specimen puts a plain
 * grid beside it in time rather than in space, and holds the field's own box
 * still across the switch so that only the cells inside it move.
 */
export function mount(root: HTMLElement): void {
  const cells = CELLS.map(
    (cell, index) => `
      <div class="sp-surface" data-part="cell-${index + 1}" style="padding: 8px 10px; overflow: hidden">
        <span class="sp-label">${cell.label}</span>
        ${Array.from({ length: cell.lines }, () => '<div class="sp-line" style="margin-top: 8px; width: 70%"></div>').join('')}
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Overview</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="bento">
            <button class="sp-segment" data-part="seg-bento" value="bento">Bento</button>
            <button class="sp-segment" data-part="seg-uniform" value="uniform">Uniform</button>
          </sp-segmented>
        </div>
        <div class="sp-grid" data-part="grid" data-subject data-mode="bento"
             style="margin-top: 14px; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(4, 44px)">
          ${cells}
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const tiles = CELLS.map((_, index) => part(root, `cell-${index + 1}`));

  const arrange = (mode: string) => {
    grid.dataset.mode = mode;
    tiles.forEach((tile, index) => {
      // Uniform is every cell at 2 x 2, which tiles the same field three across and
      // two down. The field keeps its box either way; only its cells change.
      const [columns, rows] = mode === 'bento' ? (CELLS[index]?.span ?? UNIFORM) : UNIFORM;
      tile.style.gridColumn = `span ${columns}`;
      tile.style.gridRow = `span ${rows}`;
    });
  };
  arrange('bento');

  part(root, 'segmented').addEventListener('change', (event) => arrange((event as CustomEvent<string>).detail));
}
