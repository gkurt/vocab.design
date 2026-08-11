import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Creation = { key: string; label: string; glyph: IconName; row: string };

const CREATIONS = [
  { key: 'note', label: 'New note', glyph: 'pencil', row: 'Tide times, Saturday' },
  { key: 'list', label: 'New checklist', glyph: 'check', row: 'Packing checklist' },
] as const satisfies readonly Creation[];

const FAB_STYLE = [
  'position: absolute',
  'right: 14px',
  'bottom: 14px',
  'display: inline-flex',
  'align-items: center',
  'justify-content: center',
  'width: 46px',
  'height: 46px',
  'padding: 0',
  'border-radius: 50%',
  'box-shadow: var(--sp-shadow)',
].join('; ');

/**
 * Floating action button specimen: the one action the screen is for, on its own
 * layer in the corner rather than in the content. The round button is the subject;
 * the notes it adds to, and the small menu it raises, are scenery.
 *
 * The button is out of flow, so it never moves and never moves anything (SPEC §5),
 * and the row a choice creates is appended to a list with room already under it.
 * The button only opens the menu; choosing, Escape, or a click outside closes it.
 */
export function mount(root: HTMLElement): void {
  const items = CREATIONS.map(
    (creation) => `
      <button class="sp-menu-item" type="button" data-part="make-${creation.key}">${icon(creation.glyph)}${creation.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 214px; height: 300px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notes</span></div>
        <div class="sp-body sp-context">
          <ul class="sp-list" data-part="notes">
            <li class="sp-list-item">Gull counts, week 12</li>
            <li class="sp-list-item">Shipping forecast</li>
          </ul>
        </div>
        <div
          class="sp-menu sp-context"
          data-part="menu"
          role="menu"
          aria-label="Create"
          style="right: 14px; bottom: 68px; transform-origin: bottom right"
        >${items}</div>
        <button class="sp-button" type="button" data-part="fab" data-subject aria-label="Create" aria-haspopup="menu" style="${FAB_STYLE}">
          ${icon('plus')}
        </button>
      </div>
    </div>
  `;

  const fab = part(root, 'fab');
  const menu = part(root, 'menu');
  const notes = part(root, 'notes');

  const setOpen = (open: boolean) => {
    flag(menu, 'data-open', open);
    fab.setAttribute('aria-expanded', String(open));
  };

  const create = (creation: Creation) => {
    const row = root.ownerDocument.createElement('li');
    row.className = 'sp-list-item';
    row.dataset.part = `made-${creation.key}`;
    row.textContent = creation.row;
    notes.append(row);
    setOpen(false);
  };

  part(root, 'fab').addEventListener('click', () => setOpen(true));
  for (const creation of CREATIONS) part(root, `make-${creation.key}`).addEventListener('click', () => create(creation));

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Element | null;
    if (target && (menu.contains(target) || fab.contains(target))) return;
    setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
