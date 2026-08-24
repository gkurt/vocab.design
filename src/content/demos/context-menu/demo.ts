import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const FILES = ['Brand guidelines.pdf', 'Q3 roadmap.key', 'Offsite photos'];
const EDGE = 8;

/**
 * Context menu specimen: right-click a row and the actions arrive at the pointer,
 * scoped to the thing underneath it. The subject is the menu, which does not exist
 * until it is asked for, so identify has to summon it.
 */
export function mount(root: HTMLElement): void {
  const rows = FILES.map(
    (name, index) => `
      <li class="sp-list-item" data-part="row-${index + 1}">
        <span class="sp-grow sp-text sp-text--ink">${name}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 220px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Shared with me</span>
          ${icon('search')}
        </div>
        <div class="sp-body sp-context" data-part="page" style="padding: 0">
          <ul class="sp-list" data-part="files">${rows}</ul>
        </div>
        <div class="sp-menu" data-part="menu" data-subject role="menu" aria-label="File actions">
          <button class="sp-menu-item" role="menuitem" data-part="menu-open">Open</button>
          <button class="sp-menu-item" role="menuitem">Rename</button>
          <button class="sp-menu-item" role="menuitem">Copy link</button>
          <button class="sp-menu-item" role="menuitem">Move to trash</button>
        </div>
      </div>
    </div>
  `;

  const frame = root.querySelector('.sp-frame') as HTMLElement;
  const menu = part(root, 'menu');
  let owner: Element | undefined;

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    if (!open) owner?.removeAttribute('data-selected');
  };

  /** At the pointer, then pulled back inside the frame rather than clipped by it. */
  const place = (x: number, y: number) => {
    const point = localPoint({ clientX: x, clientY: y }, frame);
    const left = Math.min(point.x, frame.offsetWidth - menu.offsetWidth - EDGE);
    const top = Math.min(point.y, frame.offsetHeight - menu.offsetHeight - EDGE);
    menu.style.left = `${Math.max(left, EDGE)}px`;
    menu.style.top = `${Math.max(top, EDGE)}px`;
  };

  for (const row of part(root, 'files').children) {
    row.addEventListener('contextmenu', (event) => {
      // Without this the browser's own menu covers the specimen, which is the one
      // thing a context menu specimen must not do.
      event.preventDefault();
      owner?.removeAttribute('data-selected');
      owner = row;
      row.setAttribute('data-selected', '');
      place((event as MouseEvent).clientX, (event as MouseEvent).clientY);
      setOpen(true);
    });
  }

  // Opens only: dismissal is choosing an item, Escape, or a click outside (SPEC §8).
  for (const item of menu.querySelectorAll('.sp-menu-item')) item.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target as Node)) setOpen(false);
  });
}
