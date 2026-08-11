import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** Every card is one row tall, so a column's height never depends on its contents. */
const CARD_HEIGHT = 32;
const CARD = 'display: flex; align-items: center; gap: 6px; padding: 0 8px; font-size: 12px';

const COLUMNS = [
  { key: 'todo', name: 'Todo', cards: ['Rewrite intro', 'Audit links'] },
  { key: 'doing', name: 'Doing', cards: ['Plate scans'] },
  { key: 'done', name: 'Done', cards: ['Set colophon', 'Proof index'] },
];

/**
 * Kanban board specimen: three stages side by side, with one card carried from
 * Todo into Doing. The subject is the board, the row of columns together: a
 * single column is not the term and neither is the card, which has words of its
 * own. The window chrome above it is scenery.
 *
 * Counts come from the lists rather than from a tally the demo keeps, so the
 * number in a header cannot disagree with the cards under it.
 *
 * A release over the column the card already sits in returns without touching the
 * DOM. Moving the node between pointerdown and pointerup swallows the click, and
 * a reader waking a posed board with a press must not have that press vanish.
 */
export function mount(root: HTMLElement): void {
  const card = (title: string) =>
    `<div class="sp-surface" data-card style="${CARD}; height: ${CARD_HEIGHT}px">${icon('menu')}<span class="sp-grow">${title}</span></div>`;

  const columns = COLUMNS.map(
    ({ key, name, cards }) => `
      <section class="sp-surface" data-part="col-${key}" data-count="${cards.length}" style="flex: 1 1 0; min-width: 0; padding: 8px">
        <div class="sp-row sp-row--between">
          <span class="sp-label">${name}</span>
          <span class="sp-label" data-part="tally-${key}">${cards.length}</span>
        </div>
        <div class="sp-stack" data-part="list-${key}" style="margin-top: 8px; height: ${CARD_HEIGHT * 3 + 16}px">
          ${cards.map((title) => card(title)).join('')}
          ${key === 'todo' ? `<div class="sp-surface" data-card data-part="card" data-in="todo" style="${CARD}; height: ${CARD_HEIGHT}px; cursor: grab; touch-action: none">${icon('menu')}<span class="sp-grow">Index cards</span></div>` : ''}
          ${
            key === 'doing'
              ? `<div data-part="slot-doing" style="display: flex; align-items: center; justify-content: center; height: ${CARD_HEIGHT}px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-size: 11px; color: var(--sp-muted)">Next</div>`
              : ''
          }
        </div>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reprint</span>
          <span class="sp-text">3 stages</span>
        </div>
        <div class="sp-body">
          <div class="sp-row" data-part="board" data-subject style="gap: 10px; align-items: flex-start">${columns}</div>
        </div>
      </div>
    </div>
  `;

  const board = COLUMNS.map(({ key }) => ({
    key,
    col: part(root, `col-${key}`),
    list: part(root, `list-${key}`),
    tally: part(root, `tally-${key}`),
  }));
  const moving = part(root, 'card');
  const slot = part(root, 'slot-doing');
  let carrying = false;

  const sync = () => {
    for (const { col, list, tally } of board) {
      const count = list.querySelectorAll('[data-card]').length;
      col.dataset.count = String(count);
      tally.textContent = String(count);
    }
    // The empty slot is the room the arriving card takes, so Doing keeps its height.
    slot.hidden = moving.dataset.in === 'doing';
  };

  const highlight = (over: HTMLElement | undefined) => {
    for (const { col } of board) {
      const on = col === over;
      flag(col, 'data-active', on);
      col.style.background = on ? 'var(--sp-accent-soft)' : '';
      col.style.borderColor = on ? 'var(--sp-accent)' : '';
    }
  };

  const under = (x: number, y: number) =>
    board.find(({ col }) => {
      const rect = col.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });

  moving.addEventListener('pointerdown', () => {
    carrying = true;
    moving.style.boxShadow = 'var(--sp-shadow)';
    moving.style.opacity = '0.86';
  });

  root.addEventListener('pointermove', (event) => {
    if (carrying) highlight(under(event.clientX, event.clientY)?.col);
  });

  const drop = (event: PointerEvent) => {
    if (!carrying) return;
    carrying = false;
    moving.style.boxShadow = '';
    moving.style.opacity = '';
    highlight(undefined);
    const target = under(event.clientX, event.clientY);
    if (!target || target.list === moving.parentElement) return;
    target.list.append(moving);
    moving.dataset.in = target.key;
    sync();
  };

  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);
  sync();
}
