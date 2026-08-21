import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const COLUMNS = 3;
const GAP = 8;
/** Six to start, then two the reader adds. Every height is different on purpose. */
const HEIGHTS = [58, 84, 44, 70, 52, 66, 60, 54];
const SEEDED = 6;

/**
 * Masonry specimen: the packer itself. Each item is handed to whichever column is
 * currently shortest, in source order, which is the whole definition, and the
 * columns therefore end at three different heights. Adding an item performs the
 * rule rather than describing it: the new tile lands wherever the wall has room.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 294px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="add"
                  style="display: inline-flex; align-items: center; gap: 6px">${icon('plus')}Add item</button>
        </div>
        <div class="sp-body" style="padding: 12px; overflow: hidden">
          <div data-part="wall" data-subject
               style="display: flex; align-items: flex-start; gap: ${GAP}px; height: 100%">
            ${Array.from(
              { length: COLUMNS },
              (_, i) =>
                `<div data-part="col-${i + 1}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: ${GAP}px"></div>`,
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const columns = Array.from({ length: COLUMNS }, (_, i) => part(root, `col-${i + 1}`));
  const filled = Array.from({ length: COLUMNS }, () => 0);
  let placed = 0;

  const place = (): void => {
    const height = HEIGHTS[placed] ?? 56;
    // The rule, stated once: whichever column is shortest right now takes the item.
    let target = 0;
    for (let i = 1; i < COLUMNS; i++) {
      if ((filled[i] ?? 0) < (filled[target] ?? 0)) target = i;
    }
    placed += 1;
    const tile = document.createElement('div');
    tile.className = 'sp-surface';
    tile.dataset.part = `item-${placed}`;
    tile.dataset.col = String(target + 1);
    tile.style.cssText = `flex: 0 0 auto; height: ${height}px; padding: 6px 8px; display: flex; align-items: flex-end`;
    tile.innerHTML = `<span class="sp-label">${placed}</span>`;
    columns[target]?.append(tile);
    filled[target] = (filled[target] ?? 0) + height + (columns[target]?.childElementCount === 1 ? 0 : GAP);
  };

  for (let i = 0; i < SEEDED; i++) place();

  part(root, 'add').addEventListener('click', () => {
    if (placed < HEIGHTS.length) place();
  });
}
