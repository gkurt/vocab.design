import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** Every cell is stated once: a tile changing state must never resize its cell (SPEC §5). */
const CELL = { w: 96, h: 54 };
const GAP = 8;
const PANEL_W = CELL.w * 2 + GAP + 20;

const SYSTEM: { key: string; title: string; glyph: IconName; on: boolean }[] = [
  { key: 'share', title: 'Share', glyph: 'share', on: true },
  { key: 'alerts', title: 'Alerts', glyph: 'bell', on: false },
  { key: 'agenda', title: 'Agenda', glyph: 'calendar', on: true },
  { key: 'tune', title: 'Tuning', glyph: 'sliders', on: false },
];

const VALUE = { on: 'On, until 6pm', off: 'Off' };

/**
 * Quick settings tile specimen: the system's own panel of controls, with one tile in it that an
 * app contributed. The app's tile is the wide one at the top and carries the whole anatomy the
 * term is about: a symbol, a short title, and an optional value. Tapping it switches the feature
 * and the app stays shut.
 *
 * The subject is that tile, the narrowest element the term names. The four system tiles around it
 * are the same component supplied by the shell rather than by an app, so each of them sits in the
 * context register. The panel itself is left out of that
 * register on purpose: it paints in neutrals only, and marking it would remap the accent of the
 * subject sitting inside it. A tile is honestly a tile
 * whether it is on or off, so no `data-pose` condition is needed, and the toggle is the one case
 * where flipping is right (SPEC §8): switching a feature is exactly what a tile does, and the
 * script drives both directions itself.
 *
 * Three pieces of the site's own voice have been taken out of the frame. A legend beside the
 * panel headed "Anatomy of a tile" named the symbol, the title and the value and described
 * each one; a readout in the title bar said "Deep Focus is not open"; and a caption under the
 * panel explained who supplies which part. All of that is the article's, so the frame now
 * holds only the panel, and is as wide as it.
 *
 * Nothing resizes: the cell, the symbol's box and the value's line are all fixed, so the state
 * change is a colour and a word rather than a reflow, and the value's longer string is the one
 * the slot is sized for.
 */
export function mount(root: HTMLElement): void {
  const systemTile = (tile: (typeof SYSTEM)[number]) => `
    <div
      class="sp-context"
      data-part="sys-${tile.key}"
      data-state="${tile.on ? 'on' : 'off'}"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; width: ${CELL.w}px; height: ${CELL.h}px;
             border-radius: 10px; background: ${tile.on ? 'var(--sp-accent)' : 'var(--sp-sunken)'};
             color: ${tile.on ? 'var(--sp-accent-ink)' : 'var(--sp-ink)'}; border: 1px solid var(--sp-line)"
    >
      ${icon(tile.glyph)}
      <span style="font-size: 11px; white-space: nowrap">${tile.title}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 246px; height: auto">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">System controls</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px">
          <div
            data-part="panel"
            style="display: grid; grid-template-columns: repeat(2, ${CELL.w}px); gap: ${GAP}px; width: ${PANEL_W}px; padding: 10px;
                   border-radius: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
          >
            <button
              type="button"
              data-part="tile"
              data-subject
              data-state="off"
              aria-pressed="false"
              style="grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; height: ${CELL.h}px; padding: 0 10px; border-radius: 10px;
                     background: var(--sp-sunken); border: 1px solid var(--sp-line); color: var(--sp-ink); font: inherit; text-align: left; cursor: pointer"
            >
              <span
                data-part="symbol"
                style="display: flex; align-items: center; justify-content: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 9px;
                       background: var(--sp-surface); color: var(--sp-ink)"
              >${icon('eyeOff')}</span>
              <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
                <span data-part="title" style="font-size: 12.5px; font-weight: 500; white-space: nowrap">Deep Focus</span>
                <span class="sp-label" data-part="value" style="font-size: 11px; white-space: nowrap">${VALUE.off}</span>
              </span>
            </button>
            ${SYSTEM.map(systemTile).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const tile = part(root, 'tile');
  const symbol = part(root, 'symbol');
  const value = part(root, 'value');

  const render = (on: boolean) => {
    tile.dataset.state = on ? 'on' : 'off';
    tile.setAttribute('aria-pressed', String(on));
    tile.style.background = on ? 'var(--sp-accent-soft)' : 'var(--sp-sunken)';
    tile.style.borderColor = on ? 'var(--sp-accent)' : 'var(--sp-line)';
    symbol.style.background = on ? 'var(--sp-accent)' : 'var(--sp-surface)';
    symbol.style.color = on ? 'var(--sp-accent-ink)' : 'var(--sp-ink)';
    value.textContent = on ? VALUE.on : VALUE.off;
  };

  // The one place a toggle is right: switching the feature is what the tile is for (SPEC §8).
  tile.addEventListener('click', () => render(tile.dataset.state !== 'on'));

  render(false);
}
