import { type IconName, icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const FILES: { name: string; glyph: IconName }[] = [
  { name: 'Poster.pdf', glyph: 'copy' },
  { name: 'Sketches', glyph: 'inbox' },
  { name: 'Notes.txt', glyph: 'pencil' },
];

const EDGE = 8;

/**
 * Secondary click specimen: a file tile that answers the two pointer buttons with two
 * different things. The primary press selects it and nothing else happens; the secondary
 * press selects it too and asks for the list of things that could be done to it.
 *
 * The subject is the tile, not the menu that appears: the menu is its own term, and what
 * this one names is the press, which belongs to the thing being pressed. The middle tile
 * carries it so the identify pin has room on either side.
 *
 * Neither button toggles (SPEC §8). A primary click selects the tile it landed on, a
 * secondary click opens the menu, and the menu is dismissed by choosing an item, by
 * Escape, or by a press outside it, so a pass resumed at any step still demonstrates the
 * distinction rather than its opposite.
 */
export function mount(root: HTMLElement): void {
  const tiles = FILES.map(
    (file, index) => `
      <div
        class="sp-option sp-surface"
        role="option"
        aria-selected="false"
        data-part="tile-${index + 1}"
        ${index === 1 ? 'data-subject' : ''}
        style="display: flex; flex-direction: column; gap: 8px; padding: 8px"
      >
        <span style="display: flex; align-items: center; justify-content: center; height: 44px; border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted)">
          ${icon(file.glyph)}
        </span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${file.name}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 218px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
          ${icon('search')}
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-grid" role="listbox" aria-label="Files" data-part="grid" style="grid-template-columns: repeat(3, 1fr)">
            ${tiles}
          </div>
          <span class="sp-text sp-context" data-part="legend" style="font-size: 12px">
            Primary press selects. Secondary press asks for options.
          </span>
        </div>
        <div class="sp-menu" data-part="menu" role="menu" aria-label="File actions">
          <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-open">Open</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-rename">Rename</button>
          <button class="sp-menu-item" type="button" role="menuitem">Duplicate</button>
          <button class="sp-menu-item" type="button" role="menuitem">Move to trash</button>
        </div>
      </div>
    </div>
  `;

  const frame = root.querySelector('.sp-frame') as HTMLElement;
  const grid = part(root, 'grid');
  const menu = part(root, 'menu');

  const select = (tile: Element) => {
    for (const other of grid.children) other.setAttribute('aria-selected', String(other === tile));
  };

  /** At the pointer, then pulled back inside the frame rather than clipped by it. */
  const place = (x: number, y: number) => {
    const point = localPoint({ clientX: x, clientY: y }, frame);
    const left = Math.min(point.x, frame.offsetWidth - menu.offsetWidth - EDGE);
    const top = Math.min(point.y, frame.offsetHeight - menu.offsetHeight - EDGE);
    menu.style.left = `${Math.max(left, EDGE)}px`;
    menu.style.top = `${Math.max(top, EDGE)}px`;
  };

  for (const tile of grid.children) {
    // The primary press: this is now the selected file, and that is all it means.
    tile.addEventListener('click', () => select(tile));

    tile.addEventListener('contextmenu', (event) => {
      // Without this the browser's own menu covers the specimen, which is the one thing
      // a specimen about the secondary press must not let happen.
      event.preventDefault();
      select(tile);
      place((event as MouseEvent).clientX, (event as MouseEvent).clientY);
      flag(menu, 'data-open', true);
    });
  }

  for (const item of menu.querySelectorAll('.sp-menu-item')) item.addEventListener('click', () => flag(menu, 'data-open', false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') flag(menu, 'data-open', false);
  });
  root.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target as Node)) flag(menu, 'data-open', false);
  });
}
