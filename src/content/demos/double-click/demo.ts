import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const FILES = [
  { name: 'Notes.md', size: '4 KB' },
  { name: 'Budget.xlsx', size: '38 KB' },
  { name: 'Cover.png', size: '1.2 MB' },
];

const TILE =
  'display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; width: 96px; height: 74px; font-size: 12px; cursor: default';

/**
 * Double click specimen: file tiles where one press selects and two open. Both
 * behaviours are wired on the same tile, so the gesture is told apart from the
 * click it is built out of rather than being asserted in a caption. The subject
 * is the tile the two gestures land on.
 *
 * The detail view takes a box that is reserved from the start, holding the same
 * height as the prompt it replaces, so opening a file never moves the tiles
 * above it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tiles = FILES.map(
    ({ name, size }, index) => `
      <div
        class="sp-surface${index === 1 ? '' : ' sp-context'}"
        data-part="tile-${index + 1}"${index === 1 ? ' data-subject' : ''}
        role="option"
        aria-selected="false"
        style="${TILE}"
      >
        ${icon('copy')}
        <span>${name}</span>
        <span class="sp-label">${size}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Documents</span>
          <span class="sp-text" data-stage-verdict data-part="hint">Click selects, double click opens</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row" role="listbox" aria-label="Files" data-part="tiles" style="justify-content: center">${tiles}</div>
          <div style="position: relative; height: 78px">
            <div
              class="sp-surface sp-context"
              data-part="detail-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--sp-muted)"
            >
              No file open
            </div>
            <div
              class="sp-surface"
              data-part="detail"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px"
            >
              <span class="sp-grow sp-heading" data-part="detail-name">Budget.xlsx</span>
              <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="detail-close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const detail = part(root, 'detail');
  const empty = part(root, 'detail-empty');
  const name = part(root, 'detail-name');
  const cells = FILES.map((_, index) => part(root, `tile-${index + 1}`));

  const select = (index: number) => {
    for (const [at, tile] of cells.entries()) {
      const on = at === index;
      flag(tile, 'data-selected', on);
      tile.setAttribute('aria-selected', String(on));
      // A tile is not one of the kit primitives that carry a selected look, so the
      // selection is painted from the same tokens those primitives use.
      tile.style.background = on ? 'var(--sp-accent-soft)' : '';
      tile.style.borderColor = on ? 'var(--sp-accent)' : '';
    }
  };

  const open = (index: number) => {
    name.textContent = FILES[index]?.name ?? '';
    detail.hidden = false;
    empty.hidden = true;
  };

  for (const [index, tile] of cells.entries()) {
    // The single click still runs when the second one arrives, which is how a
    // browser delivers the gesture: select, then open.
    tile.addEventListener('click', () => select(index));
    tile.addEventListener('dblclick', () => open(index));
  }

  part(root, 'detail-close').addEventListener('click', () => {
    detail.hidden = true;
    empty.hidden = false;
  });
}
