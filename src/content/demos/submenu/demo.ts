import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Submenu specimen: an Edit menu whose "Paste special" row owns a panel of its own,
 * opening beside the row rather than under it, and choices inside it land on the
 * document.
 *
 * The subject is the flyout panel. Not the row that owns it (the arrow there is the
 * signal that a panel exists, not the panel), and not the parent menu, which is a
 * plain menu and has its own term. The panel is placed beside its row and inset from
 * every frame edge, so the ring identify draws sits clear of the window it is in.
 *
 * Both panels open by click and are dismissed explicitly (a choice, Escape, a press
 * outside), never toggled, so a pass resumed or fast-forwarded at any point reaches
 * the same state (SPEC §8). Hover intent and the safe triangle are the article's
 * subject rather than this specimen's: a dwell a synthesized pointer performs reads
 * as nothing at all, and a hover that opened the panel would race the click after it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context">
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            type="button"
            data-part="trigger"
            aria-haspopup="menu"
            aria-expanded="false"
          >Edit</button>
          <span class="sp-grow"></span>
          <span class="sp-label">Minutes, draft 3</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 8px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 96%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </div>
          <div style="height: 18px; margin-top: 18px">
            <span class="sp-label" data-part="readout" data-choice="none">Nothing pasted yet</span>
          </div>
        </div>
        <div class="sp-menu" data-part="menu" role="menu" aria-label="Edit" style="left: 10px; top: 44px">
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-undo">Undo</button>
          <button class="sp-menu-item" type="button" role="menuitem">Cut</button>
          <button
            class="sp-menu-item"
            type="button"
            role="menuitem"
            data-part="parent-item"
            aria-haspopup="menu"
            aria-expanded="false"
          ><span class="sp-grow">Paste special</span>${icon('chevronRight')}</button>
          <button class="sp-menu-item" type="button" role="menuitem">Delete</button>
        </div>
        <div class="sp-menu" data-part="submenu" data-subject role="menu" aria-label="Paste special" style="left: 176px">
          <button class="sp-menu-item" type="button" role="menuitem" data-value="formatting" data-label="keep formatting">Keep formatting</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-value="style" data-label="match style">Match style</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-part="sub-plain" data-value="plain" data-label="plain text">Plain text</button>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const menu = part(root, 'menu');
  const submenu = part(root, 'submenu');
  const parentItem = part(root, 'parent-item');
  const readout = part(root, 'readout');

  // Aligned to the row that owns it, read once on mount rather than guessed at.
  // Both menus are laid out already (hidden by visibility, which keeps their boxes),
  // and nothing has written to these offsets, so the read is honest (SPEC §5).
  submenu.style.top = `${menu.offsetTop + parentItem.offsetTop - 4}px`;

  const setSubmenu = (open: boolean) => {
    flag(submenu, 'data-open', open);
    flag(parentItem, 'data-active', open);
    parentItem.setAttribute('aria-expanded', String(open));
  };

  const setMenu = (open: boolean) => {
    flag(menu, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (!open) setSubmenu(false);
  };

  trigger.addEventListener('click', () => setMenu(true));
  // The row does not run a command, it opens the panel beside it.
  parentItem.addEventListener('click', () => setSubmenu(true));

  for (const item of menu.querySelectorAll<HTMLElement>('.sp-menu-item')) {
    if (item === parentItem) continue;
    item.addEventListener('click', () => setMenu(false));
  }

  for (const item of submenu.querySelectorAll<HTMLElement>('.sp-menu-item')) {
    item.addEventListener('click', () => {
      readout.textContent = `Pasted as ${item.dataset.label}`;
      readout.dataset.choice = item.dataset.value ?? 'none';
      setMenu(false);
    });
  }

  // Escape shuts the deepest panel first, which is the whole point of nesting.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (submenu.hasAttribute('data-open')) setSubmenu(false);
    else setMenu(false);
  });

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (trigger.contains(target) || menu.contains(target) || submenu.contains(target)) return;
    setMenu(false);
  });
}
