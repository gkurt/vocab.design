import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const HIDDEN = [
  { key: 'rename', label: 'Rename', mark: 'pencil' },
  { key: 'move', label: 'Move to folder', mark: 'share' },
  { key: 'archive', label: 'Archive', mark: 'inbox' },
  { key: 'delete', label: 'Delete', mark: 'trash' },
] as const;

/**
 * Overflow menu specimen: a toolbar with room for three actions and seven to place.
 * The subject is the panel, because the term names what is inside it rather than the
 * trigger, which here is a plain "More" button. The panel is out of flow, so opening
 * it moves nothing in the frame (SPEC §5), and it opens only: dismissal is choosing
 * an item, Escape, or a click outside (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const items = HIDDEN.map(
    ({ key, label, mark }) => `
      <button class="sp-menu-item" role="menuitem" data-part="item-${key}" data-key="${key}">
        ${icon(mark)}
        <span>${label}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 204px">
        <div class="sp-topbar" role="toolbar" aria-label="Document actions" style="gap: 4px">
          <span class="sp-context" style="display: contents">
            <button class="sp-icon-button" data-part="act-star" aria-label="Star">${icon('star')}</button>
            <button class="sp-icon-button" data-part="act-copy" aria-label="Duplicate">${icon('copy')}</button>
            <button class="sp-icon-button" data-part="act-share" aria-label="Share">${icon('share')}</button>
          </span>
          <span class="sp-grow"></span>
          <div style="position: relative">
            <span class="sp-context">
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="more"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; flex: 0 0 auto"
              >
                <span>More</span>
                <span data-part="chev" style="display: inline-flex; transition: transform 0.18s var(--sp-ease)">${icon('chevronDown')}</span>
              </button>
            </span>
            <div class="sp-menu" data-part="menu" data-subject role="menu" aria-label="More actions" style="top: 32px; right: 0; min-width: 168px">
              ${items}
            </div>
          </div>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="flex: 1 1 auto; padding: 12px; display: flex; flex-direction: column; gap: 8px">
            <span class="sp-line" style="width: 62%"></span>
            <span class="sp-line" style="width: 84%"></span>
            <span class="sp-line" style="width: 46%"></span>
          </div>
          <span class="sp-text" data-part="readout" data-value="none" role="status" style="white-space: nowrap">No action run yet</span>
        </div>
      </div>
      <p class="sp-text sp-context" style="max-width: 430px; text-align: center; margin: 0">
        Three actions fit in the bar. The other four are the same actions, waiting behind one trigger.
      </p>
    </div>
  `;

  const more = part(root, 'more');
  const menu = part(root, 'menu');
  const chev = part(root, 'chev');
  const readout = part(root, 'readout');

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    flag(more, 'data-open', open);
    more.setAttribute('aria-expanded', String(open));
    chev.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  more.addEventListener('click', () => setOpen(true));
  for (const { key, label } of HIDDEN) {
    part(root, `item-${key}`).addEventListener('click', () => {
      readout.dataset.value = key;
      readout.textContent = `${label} ran`;
      setOpen(false);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!menu.contains(target) && !more.contains(target)) setOpen(false);
  });
}
