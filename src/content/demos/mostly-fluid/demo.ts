import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The maximum the grid is allowed to reach. Past it the surplus becomes margin. */
const CAP = 340;
const GAP = 8;
const PAD = 8;
const EDGE = 2;
/** The reserved box every viewport is centred in, so nothing outside it moves (SPEC §5). */
const CANVAS = 440;
const CONTENT_H = 156;
const VIEW_H = CONTENT_H + 2 * PAD + 2 * EDGE;

interface Size {
  key: string;
  label: string;
  width: number;
  note: string;
}

const SIZES: Size[] = [
  { key: 'narrow', label: 'narrow', width: 200, note: '200px: below the smallest breakpoint, so the grid stacks.' },
  { key: 'medium', label: 'medium', width: 268, note: '268px: three fluid columns, still short of the 340px cap.' },
  { key: 'wide', label: 'wide', width: 360, note: '360px: the grid has just reached its cap, margins at zero.' },
  { key: 'extra', label: 'extra wide', width: CANVAS, note: '440px: the grid holds at 340px and the margin takes the rest.' },
];

const STACKED_AREAS = "'head' 'c1' 'c2' 'c3' 'foot'";
const COLUMN_AREAS = "'head head head' 'c1 c2 c3' 'foot foot foot'";

const CARDS = ['Berths', 'Tides', 'Fuel'];

const card = (index: number, label: string) => `
  <div
    data-part="card-${index + 1}"
    style="grid-area: c${index + 1}; display: flex; flex-direction: column; gap: 3px; overflow: hidden; min-width: 0;
           padding: 4px 6px; border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
  >
    <span style="flex: 0 0 auto; font-size: 10px; font-weight: 500; line-height: 1.2; white-space: nowrap">${label}</span>
    <span style="flex: 0 0 auto; width: 84%; height: 5px; border-radius: 3px; background: var(--sp-accent-soft)"></span>
    <span data-part="card-${index + 1}-extra" style="flex: 0 0 auto; width: 62%; height: 5px; border-radius: 3px; background: var(--sp-line)"></span>
  </div>`;

const band = (area: string, label: string) => `
  <div
    data-part="${area}"
    class="sp-context"
    style="grid-area: ${area}; display: flex; align-items: center; overflow: hidden; min-height: 0; padding: 0 7px;
           border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
  >
    <span class="sp-label" style="font-size: 10px; white-space: nowrap">${label}</span>
  </div>`;

const margin = (side: string) => `
  <div
    data-part="margin-${side}"
    class="sp-context"
    style="flex: 0 0 auto; width: 0; border-radius: 4px;
           background: repeating-linear-gradient(45deg, var(--sp-line) 0 2px, transparent 2px 7px)"
  ></div>`;

/**
 * Mostly fluid specimen: one grid at four picked widths. Narrow, it is below its smallest
 * breakpoint and every region is a stacked band. Medium, three fluid columns that simply take
 * what they are given. Wide, the same three columns having just reached the cap. Extra wide, the
 * cap holding while the surplus turns into the hatched margins on either side. The plainest of
 * the five multi device patterns, and the one most sites actually are.
 *
 * The cap gets its own drawn marker: a 340px measure line above the viewport, in the same
 * centred axis as the grid, so the grid can be seen growing toward it, meeting it exactly, and
 * then stopping while the margins open. The readout states all three numbers, because the cap is
 * a measurement and the eye cannot read pixels off a picture.
 *
 * The subject is the grid, `data-part="grid"`, because it is the element that is mostly fluid:
 * it is the thing that stretches and the thing that stops. The cap marker was the other
 * candidate and loses because it is annotation the term never ships, and the margins are only
 * what is left over. The bands, the cards' scenery, the outline, the marker, the picker and the
 * caption are context register; the grid keeps the kit palette.
 *
 * `data-cap` and `data-flow` are measured, not declared: the demo reads the grid's own width
 * against the cap and reads which line each card landed on. A grid template change is not a
 * transition, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 254px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Viewport</span>
          <sp-segmented class="sp-segmented" data-part="sizes" data-value="extra">
            ${SIZES.map(
              (size) => `
              <button class="sp-segment" type="button" data-part="seg-${size.key}" value="${size.key}"
                      style="padding: 4px 8px; font-size: 11px; white-space: nowrap">${size.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: ${CANVAS}px">
            <div data-part="cap" class="sp-context" style="position: relative; width: ${CAP}px; height: 14px">
              <span style="position: absolute; left: 0; right: 0; top: 6px; height: 2px; background: var(--sp-line)"></span>
              <span style="position: absolute; left: 0; top: 2px; width: 2px; height: 10px; background: var(--sp-line)"></span>
              <span style="position: absolute; right: 0; top: 2px; width: 2px; height: 10px; background: var(--sp-line)"></span>
              <span
                class="sp-label"
                style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); padding: 0 5px; background: var(--sp-sunken);
                       font-size: 10px; line-height: 14px; white-space: nowrap"
              >cap ${CAP}px</span>
            </div>

            <div style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${VIEW_H}px">
              <div
                data-part="viewport"
                style="display: flex; align-items: stretch; justify-content: center; width: ${CANVAS}px; height: ${VIEW_H}px;
                       padding: ${PAD}px; background: var(--sp-sunken); border: ${EDGE}px dashed var(--sp-line);
                       border-radius: var(--sp-radius)"
              >
                ${margin('left')}
                <div
                  data-part="grid"
                  data-subject
                  data-cap="held"
                  data-flow="columns"
                  style="display: grid; grid-template-areas: ${COLUMN_AREAS}; grid-template-columns: 1fr 1fr 1fr;
                         grid-template-rows: 24px 94px 22px; gap: ${GAP}px; flex: 0 0 auto; width: ${CAP}px; height: ${CONTENT_H}px"
                >
                  ${band('head', 'Harbour')}
                  ${CARDS.map((label, i) => card(i, label)).join('')}
                  ${band('foot', 'Notices')}
                </div>
                ${margin('right')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${['page', 'grid', 'margin']
          .map(
            (knob) => `
          <span
            data-part="val-${knob}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 108px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`,
          )
          .join('')}
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const grid = part(root, 'grid');
  const note = part(root, 'note');
  const margins = [part(root, 'margin-left'), part(root, 'margin-right')];
  const cards = CARDS.map((_, i) => part(root, `card-${i + 1}`));
  const extras = CARDS.map((_, i) => part(root, `card-${i + 1}-extra`));
  const values = { page: part(root, 'val-page'), grid: part(root, 'val-grid'), margin: part(root, 'val-margin') };

  const apply = (key: string) => {
    const next = SIZES.find((size) => size.key === key);
    if (!next) return;

    const room = next.width - 2 * PAD - 2 * EDGE;
    const width = Math.min(room, CAP);
    const stacked = next.key === 'narrow';

    // Mount every box in the state it is about to be measured in (SPEC §5).
    viewport.style.width = `${next.width}px`;
    grid.style.width = `${width}px`;
    grid.style.gridTemplateAreas = stacked ? STACKED_AREAS : COLUMN_AREAS;
    grid.style.gridTemplateColumns = stacked ? '1fr' : '1fr 1fr 1fr';
    grid.style.gridTemplateRows = stacked ? '20px 28px 28px 28px 20px' : '24px 94px 22px';
    for (const extra of extras) flag(extra, 'hidden', stacked);
    for (const band of margins) band.style.width = `${Math.max(0, Math.round((room - width) / 2))}px`;

    // Read back on boxes nothing transitions: the grid's width against the cap, and where the
    // cards landed, which is the only honest test of whether anything actually stacked.
    const gridWidth = grid.offsetWidth;
    const tops = new Set(cards.map((el) => Math.round(el.offsetTop)));
    grid.dataset.cap = gridWidth >= CAP - 1 ? 'held' : 'under';
    grid.dataset.flow = tops.size === 1 ? 'columns' : 'stacked';
    const side = margins[0]?.offsetWidth ?? 0;
    values.page.textContent = `page ${next.width}px`;
    values.grid.textContent = `grid ${gridWidth}px`;
    values.margin.textContent = `margins ${side}px`;
    note.textContent = next.note;
  };

  part(root, 'sizes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('extra');
}
