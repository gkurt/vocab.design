import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const ACTIONS = [
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'rename', label: 'Rename' },
  { key: 'archive', label: 'Archive' },
];

/**
 * Menu button specimen: a labelled button that opens a menu and does nothing else.
 * The subject is the button, not the menu, because the button is what the term
 * names: the chevron and `aria-haspopup` are its whole job description.
 *
 * The menu is out of flow, so opening it moves nothing in the panel (SPEC §5), and
 * the trigger only opens: dismissal is choosing a command, Escape, or a click
 * outside (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const items = ACTIONS.map(
    ({ key, label }) => `<button class="sp-menu-item" role="menuitem" data-part="item-${key}" data-key="${key}">${label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Design tokens</span>
          <span style="position: relative">
            <button
              class="sp-button sp-button--ghost sp-button--sm sp-row"
              data-part="trigger"
              data-subject
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="actions-menu"
              style="gap: 4px"
            >
              Actions
              ${icon('chevronDown')}
            </button>
            <div class="sp-menu" id="actions-menu" data-part="menu" role="menu" aria-label="Actions" style="top: 34px; right: 0">
              ${items}
            </div>
          </span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 71%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Last command</span>
            <span class="sp-text" data-part="status" data-action="none">None yet</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const menu = part(root, 'menu');
  const status = part(root, 'status');

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', () => setOpen(true));

  for (const item of menu.querySelectorAll<HTMLElement>('.sp-menu-item')) {
    item.addEventListener('click', () => {
      status.dataset.action = item.dataset.key ?? 'none';
      status.textContent = (item.textContent ?? '').trim();
      setOpen(false);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!menu.contains(target) && !trigger.contains(target)) setOpen(false);
  });
}
