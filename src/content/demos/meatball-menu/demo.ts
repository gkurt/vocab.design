import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const ITEMS = ['View profile', 'Send message', 'Mute updates', 'Remove from team'];

/**
 * Meatball menu specimen: the dots laid flat at the end of a card header. The subject
 * is the trigger, because the word names the glyph rather than the menu behind it;
 * the card and its copy are scenery. The menu is out of flow, so opening it moves
 * nothing in the card (SPEC §5), and the trigger only opens: dismissal is a click
 * outside or Escape (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = ITEMS.map((label) => `<button class="sp-menu-item" role="menuitem">${label}</button>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-surface" style="width: 330px; padding: 14px 16px">
        <div class="sp-row" style="gap: 10px">
          <span class="sp-avatar sp-context">RK</span>
          <span class="sp-stack sp-grow sp-context" style="gap: 2px">
            <span class="sp-heading" data-part="who" style="font-size: 14px">Riya Kapoor</span>
            <span class="sp-label">Design engineer</span>
          </span>
          <span style="position: relative; flex: 0 0 auto">
            <button
              class="sp-icon-button"
              data-part="trigger"
              data-subject
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="More actions"
            >${icon('meatball', 'sp-icon--dots')}</button>
            <div class="sp-menu" data-part="menu" role="menu" aria-label="More actions" style="top: 32px; right: 0; min-width: 164px">
              ${rows}
            </div>
          </span>
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0"></div>
        <div class="sp-stack sp-context" style="gap: 8px">
          <span class="sp-line" style="width: 78%"></span>
          <span class="sp-line" style="width: 54%"></span>
        </div>
      </div>
      <p class="sp-text sp-context" data-part="caption" style="max-width: 400px; text-align: center; margin: 0">
        Same menu either way: skewered dots make it a kebab, dots lying flat make it a meatball.
      </p>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const menu = part(root, 'menu');

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

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
