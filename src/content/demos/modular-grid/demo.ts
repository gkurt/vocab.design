import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page is held at one box in every configuration, so only the divisions inside it change. */
const PAGE_W = 300;
const PAGE_H = 176;
const PAD = 6;
const GUTTER = 6;

interface Placement {
  /** grid-column and grid-row, in module lines. */
  column: string;
  row: string;
}

interface Config {
  key: string;
  label: string;
  columns: number;
  rows: number;
  /** Whether the modules themselves are drawn, or only the page sitting on them. */
  drawn: boolean;
  places: Record<string, Placement>;
  note: string;
}

const COARSE: Record<string, Placement> = {
  masthead: { column: '1 / 5', row: '1 / 2' },
  image: { column: '1 / 3', row: '2 / 4' },
  lede: { column: '3 / 5', row: '2 / 3' },
  note: { column: '3 / 4', row: '3 / 4' },
  meta: { column: '4 / 5', row: '3 / 4' },
};

const FINE: Record<string, Placement> = {
  masthead: { column: '1 / 7', row: '1 / 2' },
  image: { column: '1 / 4', row: '2 / 5' },
  lede: { column: '4 / 7', row: '2 / 3' },
  note: { column: '4 / 6', row: '3 / 5' },
  meta: { column: '6 / 7', row: '3 / 5' },
};

const CONFIGS: Config[] = [
  {
    key: 'coarse',
    label: '4 × 3',
    columns: 4,
    rows: 3,
    drawn: true,
    places: COARSE,
    note: 'Four columns crossed by three fields, so twelve modules. The picture is two modules wide by two tall, not columns plus a guess.',
  },
  {
    key: 'fine',
    label: '6 × 4',
    columns: 6,
    rows: 4,
    drawn: true,
    places: FINE,
    note: 'A finer field, six by four. The same five blocks are restated in the new modules, and every edge still lands on a module boundary.',
  },
  {
    key: 'page',
    label: 'page only',
    columns: 6,
    rows: 4,
    drawn: false,
    places: FINE,
    note: 'The modules undrawn. Nothing moved: every block is still sized and placed in them, and that is what a reader reads as coherence.',
  },
];

const BLOCKS = ['masthead', 'image', 'lede', 'note', 'meta'] as const;

const segment = (config: Config) => `
  <button class="sp-segment" type="button" data-part="seg-${config.key}" value="${config.key}" style="padding: 4px 10px; font-size: 11px">
    ${config.label}
  </button>`;

const lines = (widths: number[]) => widths.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('');

const block = (name: string, body: string, extra = '') => `
  <div
    class="sp-surface"
    data-part="block-${name}"
    style="position: relative; display: flex; flex-direction: column; justify-content: center; gap: 5px; min-width: 0;
           min-height: 0; overflow: hidden; padding: 6px 7px; background: var(--sp-accent-soft);
           border-color: var(--sp-accent-soft); ${extra}"
  >${body}</div>`;

/**
 * Modular grid specimen: one page laid on a grid that divides its height as well as its width,
 * drawn at two field sizes and then with the modules taken away.
 *
 * The subject is the page laid on the grid, not the drawn overlay (SPEC §5). The overlay is ink,
 * an aid that can be switched off without the grid ceasing to exist, while the divided field with
 * its blocks placed in it is the thing the term names. Every configuration is honestly a modular
 * grid, so no `data-pose` condition is needed. The picker and the caption are scenery in the
 * context register.
 *
 * The page holds one box across all three states, so the modules and the blocks rearrange inside
 * it and nothing around it moves (SPEC §5). Each segment names the configuration it produces
 * rather than cycling from the one it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = CONFIGS[0] as Config;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Columns and fields</span>
          <sp-segmented class="sp-segmented" data-part="configs" data-value="${first.key}" data-axis="Grid">
            ${CONFIGS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            class="sp-grid"
            data-part="page"
            data-subject
            data-config="${first.key}"
            style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; gap: ${GUTTER}px;
                   padding: ${PAD}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            ${block('masthead', '<span class="sp-label" style="font-size: 11px; color: var(--sp-ink)">Harbour Review</span>')}
            ${block('image', '', 'background: var(--sp-accent); border-color: var(--sp-accent)')}
            ${block('lede', lines([92, 74, 84]))}
            ${block('note', lines([88, 66]))}
            ${block('meta', lines([80]))}
            <!-- Drawn over the page, the way a grid overlay is: the modules have to read across
                 the blocks sitting in them, not only in the gaps between. -->
            <div
              class="sp-grid"
              data-part="modules"
              aria-hidden="true"
              style="position: absolute; inset: ${PAD}px; gap: ${GUTTER}px; pointer-events: none;
                     transition: opacity 0.24s var(--sp-ease)"
            ></div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px; width: 442px"></span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const modules = part(root, 'modules');
  const readout = part(root, 'readout');
  const blocks = new Map(BLOCKS.map((name) => [name, part(root, `block-${name}`)]));

  const lay = (key: string) => {
    const config = CONFIGS.find((entry) => entry.key === key);
    if (!config) return;
    const columns = `repeat(${config.columns}, 1fr)`;
    const rows = `repeat(${config.rows}, 1fr)`;

    page.dataset.config = config.key;
    page.style.gridTemplateColumns = columns;
    page.style.gridTemplateRows = rows;
    modules.style.gridTemplateColumns = columns;
    modules.style.gridTemplateRows = rows;
    modules.style.opacity = config.drawn ? '1' : '0';

    const cells = config.columns * config.rows;
    if (modules.childElementCount !== cells) {
      modules.innerHTML = Array.from(
        { length: cells },
        () => `<div style="border: 1px dashed var(--sp-accent); border-radius: 3px"></div>`,
      ).join('');
    }

    for (const [name, element] of blocks) {
      const place = config.places[name];
      if (!place) continue;
      element.style.gridColumn = place.column;
      element.style.gridRow = place.row;
    }

    readout.textContent = config.note;
  };

  part(root, 'configs').addEventListener('change', (event) => lay((event as CustomEvent<string>).detail));

  lay(first.key);
}
