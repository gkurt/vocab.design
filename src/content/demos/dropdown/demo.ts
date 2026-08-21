import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const ORDERS = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
];

const START = 'newest';

/**
 * Dropdown specimen: the word names the geometry, so the subject is the panel that
 * drops rather than the trigger that drops it or the widget the two make together.
 * The panel is out of flow, so opening it moves nothing behind it (SPEC §5), and the
 * trigger only ever opens: dismissal is choosing a row (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = ORDERS.map(
    ({ key, label }) => `
      <button class="sp-menu-item" role="menuitemradio" data-part="opt-${key}" data-key="${key}" aria-checked="${key === START}">
        <span style="width: 14px; display: inline-flex">${key === START ? icon('check') : ''}</span>
        <span>${label}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 200px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Issues</span>
          <div style="position: relative">
            <span class="sp-context">
              <button
                class="sp-button sp-button--quiet"
                data-part="trigger"
                data-value="${START}"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; justify-content: space-between; gap: 6px; white-space: nowrap; flex: 0 0 auto; min-width: 120px"
              >
                <span data-part="label">Newest</span>
                <span data-part="chev" style="display: inline-flex; transition: transform 0.18s var(--sp-ease)">${icon('chevronDown')}</span>
              </button>
            </span>
            <div class="sp-menu" data-part="panel" data-subject role="menu" aria-label="Sort order" style="top: 36px; right: 0; min-width: 148px">
              ${rows}
            </div>
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 120px"></span>
            </div>
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 168px"></span>
            </div>
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 92px"></span>
            </div>
          </div>
        </div>
      </div>
      <p class="sp-text sp-context" style="max-width: 420px; text-align: center; margin: 0">
        One shape, three words: values that stick are a select, commands are a menu, a field you can type in is a combobox.
      </p>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const panel = part(root, 'panel');
  const label = part(root, 'label');
  const chev = part(root, 'chev');

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    chev.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  const choose = (row: HTMLElement) => {
    const order = ORDERS.find((entry) => entry.key === row.dataset.key);
    if (!order) return;
    for (const other of panel.children) other.setAttribute('aria-checked', String(other === row));
    for (const other of panel.children) {
      const mark = other.firstElementChild as HTMLElement | null;
      if (mark) mark.innerHTML = other === row ? icon('check') : '';
    }
    trigger.dataset.value = order.key;
    label.textContent = order.label;
    setOpen(false);
  };

  trigger.addEventListener('click', () => setOpen(true));
  for (const row of ORDERS) part(root, `opt-${row.key}`).addEventListener('click', (event) => choose(event.currentTarget as HTMLElement));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!panel.contains(target) && !trigger.contains(target)) setOpen(false);
  });
}
