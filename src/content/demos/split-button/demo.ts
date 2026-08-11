import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const VARIANTS = [
  { key: 'copy', label: 'Save as a copy', status: 'Saved as a copy' },
  { key: 'template', label: 'Save as a template', status: 'Saved as a template' },
];

/**
 * Split button specimen: the main half runs the default action outright, the
 * attached arrow opens the variants of that same action. The subject is the pair,
 * since neither half is a split button on its own.
 *
 * The menu is out of flow, so opening it moves nothing (SPEC §5). Both halves
 * reach absolute states: the main one always lands on "saved", the arrow only ever
 * opens, and the menu is dismissed by choosing, by Escape, or by a click outside
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const items = VARIANTS.map(
    ({ key, label }) => `<button class="sp-menu-item" role="menuitem" data-part="item-${key}" data-key="${key}">${label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Pitch deck</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-context" data-part="status" data-action="none">Draft, not saved</span>
            <div data-part="split" data-subject role="group" aria-label="Save" style="position: relative; display: flex">
              <button class="sp-button" data-part="main" style="border-radius: var(--sp-radius) 0 0 var(--sp-radius)">Save</button>
              <span style="width: 1px; background: var(--sp-accent-ink); opacity: 0.35"></span>
              <button
                class="sp-button sp-row"
                data-part="arrow"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="save-menu"
                aria-label="More save options"
                style="border-radius: 0 var(--sp-radius) var(--sp-radius) 0; padding: 7px 8px"
              >
                ${icon('chevronDown')}
              </button>
              <div class="sp-menu" id="save-menu" data-part="menu" role="menu" aria-label="Save options" style="top: 38px; right: 0">
                ${items}
              </div>
            </div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <div class="sp-stack sp-context">
            <div class="sp-line" style="width: 78%"></div>
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 70%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const main = part(root, 'main');
  const arrow = part(root, 'arrow');
  const menu = part(root, 'menu');
  const status = part(root, 'status');

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    arrow.setAttribute('aria-expanded', String(open));
  };

  const report = (action: string, text: string) => {
    status.dataset.action = action;
    status.textContent = text;
  };

  main.addEventListener('click', () => {
    setOpen(false);
    report('save', 'Saved just now');
  });

  arrow.addEventListener('click', () => setOpen(true));

  for (const item of menu.querySelectorAll<HTMLElement>('.sp-menu-item')) {
    const variant = VARIANTS.find((entry) => entry.key === item.dataset.key);
    item.addEventListener('click', () => {
      if (variant) report(variant.key, variant.status);
      setOpen(false);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!menu.contains(target) && !arrow.contains(target)) setOpen(false);
  });
}
