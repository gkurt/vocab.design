import { flag, part } from '#src/kit/parts.ts';

interface Command {
  key: string;
  label: string;
  keys?: string;
}

const MENUS: { key: string; title: string; commands: Command[] }[] = [
  {
    key: 'file',
    title: 'File',
    commands: [
      { key: 'new', label: 'New sheet', keys: 'Ctrl N' },
      { key: 'open', label: 'Open recent' },
      { key: 'save', label: 'Save', keys: 'Ctrl S' },
    ],
  },
  {
    key: 'edit',
    title: 'Edit',
    commands: [
      { key: 'undo', label: 'Undo', keys: 'Ctrl Z' },
      { key: 'cut', label: 'Cut' },
      { key: 'copy', label: 'Copy' },
      { key: 'paste', label: 'Paste' },
    ],
  },
  {
    key: 'view',
    title: 'View',
    commands: [
      { key: 'zoom', label: 'Zoom in' },
      { key: 'freeze', label: 'Freeze row' },
      { key: 'fullscreen', label: 'Full screen' },
    ],
  },
];

/**
 * Menu bar specimen: the File / Edit / View row of a desktop application. The
 * subject is the bar itself, since that is what the term names: the menus are the
 * bar's contents, and the one behaviour no row of separate menu buttons has is the
 * bar's own, that a second title opens on hover once the first has been pressed.
 *
 * The menus hang out of flow below the bar, anchored once on mount, so opening one
 * moves nothing in the document under it (SPEC §5). A title only ever opens;
 * dismissal is choosing a command, Escape, or a press outside (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const titles = MENUS.map(
    ({ key, title }) => `
      <button
        class="sp-button sp-button--quiet sp-button--sm"
        type="button"
        role="menuitem"
        data-part="title-${key}"
        data-key="${key}"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="vd-menu-${key}"
      >${title}</button>`,
  ).join('');

  const menus = MENUS.map(
    ({ key, title, commands }) => `
      <div class="sp-menu" id="vd-menu-${key}" data-part="menu-${key}" role="menu" aria-label="${title}" style="transform-origin: top left">
        ${commands
          .map(
            ({ key: command, label, keys }) => `
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-${command}" data-key="${command}">
            <span class="sp-grow">${label}</span>
            ${keys ? `<span class="sp-kbd">${keys}</span>` : ''}
          </button>`,
          )
          .join('')}
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Quarter.numbers</span>
        </div>
        <div
          class="sp-row"
          data-part="bar"
          data-subject
          role="menubar"
          aria-label="Application"
          style="flex: 0 0 auto; gap: 2px; padding: 4px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >${titles}</div>
        <div class="sp-body sp-context">
          <table class="sp-table" style="--sp-cell-pad: 5px 8px">
            <thead>
              <tr><th>Region</th><th>Q3</th><th>Q4</th></tr>
            </thead>
            <tbody>
              <tr><td>North</td><td>18,420</td><td>21,905</td></tr>
              <tr><td>South</td><td>12,180</td><td>11,640</td></tr>
              <tr><td>East</td><td>9,530</td><td>14,275</td></tr>
            </tbody>
          </table>
          <div class="sp-row sp-row--between" style="margin-top: 12px">
            <span class="sp-label">Last command</span>
            <span class="sp-text" data-part="status" data-action="none">None yet</span>
          </div>
        </div>
        ${menus}
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const status = part(root, 'status');
  const panels = MENUS.map(({ key }) => ({ key, title: part(root, `title-${key}`), menu: part(root, `menu-${key}`) }));

  // Anchored once from the bar's real geometry: the menus are out of flow, so this is
  // the only measurement they need and nothing below the bar ever makes room for them.
  const top = bar.offsetTop + bar.offsetHeight;
  for (const { title, menu } of panels) {
    menu.style.top = `${top}px`;
    menu.style.left = `${title.offsetLeft}px`;
  }

  /** `open` is the key of the menu that owns the bar, or undefined for none. */
  const setOpen = (open: string | undefined) => {
    for (const { key, title, menu } of panels) {
      const on = key === open;
      flag(menu, 'data-open', on);
      flag(title, 'data-open', on);
      title.setAttribute('aria-expanded', String(on));
    }
  };

  const armed = () => panels.some(({ menu }) => menu.hasAttribute('data-open'));

  for (const { key, title } of panels) {
    title.addEventListener('click', () => setOpen(key));
    // The bar's own behaviour: once a menu is down, the pointer alone moves along the
    // row. Before that, hovering a title does nothing at all.
    title.addEventListener('pointerenter', () => {
      if (armed()) setOpen(key);
    });
  }

  for (const item of root.querySelectorAll<HTMLElement>('.sp-menu-item')) {
    item.addEventListener('click', () => {
      status.dataset.action = item.dataset.key ?? 'none';
      status.textContent = (item.querySelector('.sp-grow')?.textContent ?? '').trim();
      setOpen(undefined);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(undefined);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    const inside = panels.some(({ title, menu }) => title.contains(target) || menu.contains(target));
    if (!inside) setOpen(undefined);
  });
}
