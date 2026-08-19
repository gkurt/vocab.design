import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One labelled band of the face's repertoire, drawn as a run of glyph cells. */
const BLOCKS = [
  { key: 'basic', label: 'Basic Latin' },
  { key: 'latin1', label: 'Latin-1 Supplement' },
  { key: 'lat-ext', label: 'Latin Extended-A' },
  { key: 'greek', label: 'Greek' },
  { key: 'cyrillic', label: 'Cyrillic' },
  { key: 'symbols', label: 'Symbols, arrows' },
] as const;

const ROW_H = 17;
const GAP = 3;
const LABEL_W = 118;
const CELLS = 12;
const CELL_W = 18;
const CELL_H = 9;
const CELL_GAP = 4;
const GRID_H = BLOCKS.length * ROW_H + (BLOCKS.length - 1) * GAP;

/*
 * The byte figures are illustrative and the caption says so. A demo cannot weigh
 * a font it does not ship, and inventing a measurement it never took would be
 * worse than a stated approximation.
 */
const MODES = {
  full: {
    rows: BLOCKS.length,
    range: 'no unicode-range: the whole file is fetched',
    size: '≈ 180 KB',
  },
  latin: {
    rows: 3,
    range: 'unicode-range: U+0000-00FF, U+0100-017F',
    size: '≈ 42 KB',
  },
  used: {
    rows: 1,
    range: 'unicode-range: U+0020-007E',
    size: '≈ 11 KB',
  },
} as const;

type Mode = keyof typeof MODES;

const IS_MODE = (value: string): value is Mode => value in MODES;

const height = (rows: number) => rows * ROW_H + (rows - 1) * GAP;

/**
 * Font subsetting specimen: the face's repertoire drawn as bands of glyph cells,
 * with a picker choosing how much of it ships. The lit cells are what the file
 * contains and the outlined region is the subset itself, which shrinks from the
 * whole repertoire to the Latin blocks to the printable ASCII the page really
 * types. The readout beside it gives the `unicode-range` that pick would be
 * declared with, and the payload it stands for.
 *
 * The subject is the outlined region, not the grid: the subset is the feature
 * and it has no element of its own until the demo draws one, sized to its extent
 * (SPEC §5). Shipping the full face is a counter-example the subject passes
 * through, since a region covering everything is not a subset, so the honest
 * condition is declared in `data-pose` and the specimen mounts on the Latin
 * subset (SPEC §6).
 *
 * The grid keeps a fixed box at every pick, so only the region and the cells
 * change and nothing below moves (SPEC §5). The sizes are illustrative, and the
 * caption says so: nothing here is weighed.
 */
export function mount(root: HTMLElement): void {
  const cells = Array.from(
    { length: CELLS },
    () => `<span class="sp-swatch" style="width: ${CELL_W}px; height: ${CELL_H}px; border-radius: 2px"></span>`,
  ).join('');

  const row = (key: string, label: string) => `
    <div data-part="row-${key}" data-lit="off" style="display: flex; align-items: center; gap: ${CELL_GAP}px; height: ${ROW_H}px">
      <span class="sp-label" style="width: ${LABEL_W}px; flex: 0 0 auto; white-space: nowrap">${label}</span>
      ${cells}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">what ships</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="latin">
            <button class="sp-segment" data-part="seg-full" value="full">full face</button>
            <button class="sp-segment" data-part="seg-latin" value="latin">Latin</button>
            <button class="sp-segment" data-part="seg-used" value="used">used only</button>
          </sp-segmented>
        </div>
        <div data-part="grid" style="position: relative; height: ${GRID_H}px; margin-top: 10px">
          <div class="sp-stack sp-context" style="gap: ${GAP}px">
            ${BLOCKS.map((block) => row(block.key, block.label)).join('')}
          </div>
          <span data-part="subset" data-subject data-subset data-pose="[data-subset]"
                style="position: absolute; left: -6px; right: -6px; top: -5px; height: ${height(MODES.latin.rows) + 10}px;
                       border: 2px solid var(--sp-accent); border-radius: 6px"></span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 30px; margin-top: 10px">
          <span class="sp-chip" data-part="range" style="cursor: default">${MODES.latin.range}</span>
          <span class="sp-label" data-part="size" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">${MODES.latin.size}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          Payload figures here are illustrative, not weighed: what a subset saves depends on the face.
        </p>
      </div>
    </div>
  `;

  const subset = part(root, 'subset');
  const range = part(root, 'range');
  const size = part(root, 'size');
  const rows = BLOCKS.map((block) => part(root, `row-${block.key}`));

  const apply = (value: Mode) => {
    const mode = MODES[value];
    subset.style.height = `${height(mode.rows) + 10}px`;
    flag(subset, 'data-subset', value !== 'full');
    subset.dataset.ships = value;
    rows.forEach((element, index) => {
      const lit = index < mode.rows;
      element.dataset.lit = lit ? 'on' : 'off';
      element.style.setProperty('--sp-swatch', lit ? 'var(--sp-accent)' : 'var(--sp-line)');
    });
    range.textContent = mode.range;
    size.textContent = mode.size;
  };

  apply('latin');
  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (IS_MODE(value)) apply(value);
  });
}
