import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The slot the grid narrows inside: held at the widest container, so nothing around it moves. */
const SLOT_W = 300;
const SLOT_H = 180;
/** The two numbers the whole demo is built from, and the only two the rule states. */
const MIN = 88;
const GAP = 8;
const CARD_H = 38;

interface Width {
  key: string;
  label: string;
  width: number;
  note: string;
}

const WIDTHS: Width[] = [
  {
    key: 'wide',
    label: '296',
    width: 296,
    note: 'A 296 pixel container: three columns. Nobody wrote that width down anywhere, the grid divided by the minimum it was given.',
  },
  {
    key: 'medium',
    label: '196',
    width: 196,
    note: 'At 196 the count drops to two. The rule did not change and no breakpoint fired: the same line answered a smaller container.',
  },
  {
    key: 'narrow',
    label: '124',
    width: 124,
    note: 'At 124 there is no room for a second track above its minimum, so auto-fit collapses the empties and one card fills the row.',
  },
];

const CARDS = ['Tide table', 'Berth plan', 'Survey log', 'Permits'];

/** What the browser is about to work out: how many tracks of MIN fit, with a gutter between each. */
const columnsFor = (width: number) => Math.max(1, Math.floor((width + GAP) / (MIN + GAP)));

const segment = (entry: Width) => `
  <button class="sp-segment" type="button" data-part="seg-${entry.key}" value="${entry.key}" style="padding: 4px 10px; font-size: 11px">
    ${entry.label}
  </button>`;

const card = (title: string, index: number) => `
  <div
    class="sp-surface"
    data-part="card-${index + 1}"
    style="display: flex; align-items: center; min-width: 0; height: ${CARD_H}px; padding: 0 9px; overflow: hidden;
           background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
  >
    <span style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${title}</span>
  </div>`;

/**
 * RAM technique specimen: one card grid built from `repeat(auto-fit, minmax(88px, 1fr))`, with its
 * container narrowed through three widths and the column count the grid arrived at read out beside
 * the rule that produced it.
 *
 * The subject is the grid, the thing deciding its own track count, rather than a card inside it or
 * the scene around it (SPEC §5). Every width is honestly the term, so no `data-pose` condition is
 * needed. The rule listing and the width picker are scenery in the context register.
 *
 * The reading under the count changes with the switch, so it is the stage's verdict and is drawn
 * out in the strip (SPEC §5.1); the frame lost the height it was holding for it. A caption under
 * the column count, "decided by the grid, from one rule", was the article's sentence sitting in
 * the product's chrome, so it went and the count now stands over the rule that produced it.
 *
 * The grid narrows inside a slot held at its widest container and anchored to the top left, so the
 * cards reflow and nothing around them moves (SPEC §5). The column count is computed from the same
 * arithmetic the grid algorithm uses rather than measured back off the element after a style write
 * (SPEC §5), and there is no media query anywhere in this file, which is the claim being made.
 * Each segment names the container width it produces rather than stepping from the one it found
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = WIDTHS[0] as Width;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Container width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-value="${first.key}" data-axis="Width">
            ${WIDTHS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 12px; flex: 0 0 auto; height: ${SLOT_H}px">
            <div style="flex: 0 0 auto; width: ${SLOT_W}px; height: ${SLOT_H}px">
              <div
                class="sp-grid"
                data-part="grid"
                data-subject
                data-cols="${columnsFor(first.width)}"
                style="width: ${first.width}px; gap: ${GAP}px; align-content: start;
                       grid-template-columns: repeat(auto-fit, minmax(${MIN}px, 1fr));
                       transition: width 0.42s var(--sp-ease)"
              >
                ${CARDS.map(card).join('')}
              </div>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 3px">
              <span class="sp-label">Columns</span>
              <span class="sp-heading" data-part="count" style="font-size: 26px; line-height: 1.3">1</span>
              <span
                class="sp-surface"
                data-part="rule"
                style="display: block; margin-top: 5px; padding: 7px 8px; font-family: ui-monospace, monospace; font-size: 10px;
                       line-height: 1.5; color: var(--sp-ink)"
              >repeat(auto-fit,<br />&nbsp;&nbsp;minmax(${MIN}px, 1fr))</span>
            </div>
          </div>
          <span class="sp-text" data-stage-verdict data-part="readout"></span>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const count = part(root, 'count');
  const readout = part(root, 'readout');

  const resize = (key: string) => {
    const entry = WIDTHS.find((item) => item.key === key);
    if (!entry) return;
    const columns = columnsFor(entry.width);
    grid.dataset.cols = String(columns);
    grid.style.width = `${entry.width}px`;
    count.textContent = String(columns);
    readout.textContent = entry.note;
  };

  part(root, 'widths').addEventListener('change', (event) => resize((event as CustomEvent<string>).detail));

  resize(first.key);
}
