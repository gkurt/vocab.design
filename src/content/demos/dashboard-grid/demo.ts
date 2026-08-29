import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Column and row spans over a 12 x 3 field. Both arrangements fill it exactly. */
const SIZED: Record<string, [number, number]> = {
  'card-revenue': [3, 1],
  'card-orders': [3, 1],
  'card-refunds': [3, 1],
  'card-uptime': [3, 1],
  'card-chart': [8, 2],
  'card-list': [4, 2],
};

/** The wall of sameness: six tiles of one size, two to a row. */
const UNIFORM: [number, number] = [6, 1];

const NOTES: Record<string, string> = {
  sized: 'Area is the ranking: eight columns for the chart, three for a number.',
  uniform: 'Every tile one size. Nothing outranks anything, so nothing leads.',
};

const BARS = [46, 62, 38, 74, 58, 88, 70, 96];

const CARD = 'display: flex; flex-direction: column; gap: 4px; padding: 6px 10px; min-width: 0; overflow: hidden';

const stat = (name: string, label: string, value: string) => `
  <div class="sp-surface" data-part="${name}" style="${CARD}">
    <span class="sp-label">${label}</span>
    <span style="font-size: 16px; font-weight: 600; line-height: 1.1">${value}</span>
  </div>`;

const row = (index: number, width: number, value: string) => `
  <div data-part="order-${index}" style="display: flex; flex: 0 0 auto; height: 16px; align-items: center; gap: 8px">
    <span class="sp-line" style="flex: 0 0 auto; width: ${width}px; height: 6px"></span>
    <span class="sp-label" style="margin-left: auto; font-size: 11px">${value}</span>
  </div>`;

/**
 * Dashboard grid specimen: six live readouts on one twelve column field, laid out once by
 * importance and once at a single uniform size.
 *
 * The subject is the gridded region itself, not any one tile: the term names the field and
 * the way it apportions area, and a single card is a card (SPEC §5). The window chrome,
 * the arrangement control and the caption are scenery in the context register.
 *
 * Both arrangements are honestly the term (a uniform dashboard is still a dashboard grid,
 * just one that has stopped ranking anything), so the subject never stops being what it
 * claims and no `data-pose` is needed. The field keeps its own box across the switch, with
 * fixed tracks, so only the tiles inside it move (SPEC §5), and a tile shows what its own
 * height holds: the order list drops to the one line a single row tile has room for rather
 * than being cut off inside it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Store overview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Tile size" data-value="sized">
            <button class="sp-segment" type="button" data-part="seg-sized" value="sized">by importance</button>
            <button class="sp-segment" type="button" data-part="seg-uniform" value="uniform">uniform</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-mode="sized"
            style="flex: 0 0 auto; width: 448px; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(3, 56px)"
          >
            ${stat('card-revenue', 'Revenue', '£84.2k')}
            ${stat('card-orders', 'Orders', '1,204')}
            ${stat('card-refunds', 'Refunds', '18')}
            ${stat('card-uptime', 'Uptime', '99.9%')}
            <div class="sp-surface" data-part="card-chart" style="${CARD}">
              <span class="sp-label">Revenue by week</span>
              <div style="display: flex; flex: 1 1 auto; min-height: 0; align-items: flex-end; gap: 6px">
                ${BARS.map(
                  (height, index) =>
                    `<span class="sp-swatch" style="flex: 1 1 0; height: ${height}%; border-radius: 3px; --sp-swatch: var(--sp-${index === BARS.length - 1 ? 'accent' : 'accent-soft'})"></span>`,
                ).join('')}
              </div>
            </div>
            <div class="sp-surface" data-part="card-list" style="${CARD}">
              <span class="sp-label">Recent orders</span>
              <div style="display: flex; flex: 1 1 auto; flex-direction: column; justify-content: space-between; gap: 10px; min-height: 0; overflow: hidden">
                ${row(1, 52, '£62')}
                ${row(2, 40, '£18')}
                ${row(3, 60, '£145')}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const readout = part(root, 'readout');
  const cards = Object.keys(SIZED).map((name) => [name, part(root, name)] as const);

  const arrange = (mode: string) => {
    const note = NOTES[mode];
    if (!note) return;
    grid.dataset.mode = mode;
    for (const [name, card] of cards) {
      const [columns, rows] = mode === 'sized' ? (SIZED[name] ?? UNIFORM) : UNIFORM;
      card.style.gridColumn = `span ${columns}`;
      card.style.gridRow = `span ${rows}`;
    }
    // A one row tile has the height for a single line, so the order list shows the line that
    // fits instead of clipping three (SPEC §5). Losing what it cannot hold is what a tile
    // gives up when it stops outranking anything.
    for (const index of [2, 3]) part(root, `order-${index}`).style.display = mode === 'sized' ? 'flex' : 'none';
    readout.textContent = note;
  };

  // Each segment names an arrangement, so a step lands on that arrangement rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => arrange((event as CustomEvent<string>).detail));

  arrange('sized');
}
