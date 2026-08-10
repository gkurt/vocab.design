import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Kebab menu specimen: three stacked dots that hold the actions a row cannot
 * afford to show. The subject is the trigger, because that is the thing people
 * point at when they reach for the word.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 210px; overflow: visible">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Q3 roadmap</span>
          <span class="sp-context"><button class="sp-icon-button" data-part="edit" aria-label="Edit">${icon('pencil')}</button></span>
          <span style="position: relative">
            <button class="sp-icon-button" data-part="trigger" data-subject aria-haspopup="menu" aria-expanded="false" aria-label="More actions">
              ${icon('kebab', 'sp-icon--dots')}
            </button>
            <div class="sp-menu" data-part="menu" role="menu" style="top: 32px; right: 0">
              <button class="sp-menu-item" role="menuitem" data-part="menu-rename">Rename</button>
              <button class="sp-menu-item" role="menuitem">Duplicate</button>
              <button class="sp-menu-item" role="menuitem">Move to…</button>
              <button class="sp-menu-item" role="menuitem">Delete</button>
            </div>
          </span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 74%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const menu = part(root, 'menu');
  const trigger = part(root, 'trigger');
  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  // Opens only: dismissal is choosing an item, Escape, or a click outside (SPEC §8).
  trigger.addEventListener('click', () => setOpen(true));
  for (const item of menu.querySelectorAll('.sp-menu-item')) item.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!menu.contains(target) && !trigger.contains(target)) setOpen(false);
  });
}
