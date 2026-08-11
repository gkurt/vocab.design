import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Cell = { n: number; out?: boolean };

const SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const LONG = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH = 'April 2025';
const TODAY = 9;

/** April 2025, read Monday first, with the days either side kept so the weeks stay whole. */
const WEEKS: Cell[][] = [
  [{ n: 31, out: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }],
  [{ n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }, { n: 12 }, { n: 13 }],
  [{ n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }, { n: 19 }, { n: 20 }],
  [{ n: 21 }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 }, { n: 26 }, { n: 27 }],
  [{ n: 28 }, { n: 29 }, { n: 30 }, { n: 1, out: true }, { n: 2, out: true }, { n: 3, out: true }, { n: 4, out: true }],
];

const day = (cell: Cell, column: number): string => {
  const label = `${LONG[column]} ${cell.n} Apr 2025`;
  // A month with no paging cannot honestly offer the days either side, so they are
  // shown for the shape of the week and not as choices.
  if (cell.out)
    return `<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1">${cell.n}</button>`;
  const today = cell.n === TODAY ? ' data-today' : '';
  return `<button class="sp-day" type="button" role="gridcell" aria-selected="false" data-part="day-${cell.n}" data-when="${label}" aria-label="${label}"${today}>${cell.n}</button>`;
};

/**
 * Date picker specimen: a field with a calendar button, and the month grid that
 * button opens. The subject is the calendar, since that surface is what the word
 * adds to a plain text field: the field is a field, and the reason to build the
 * component is being able to see which day of the week the 18th falls on.
 *
 * The grid is one static month. Paging is the part a specimen cannot show without
 * becoming a specimen about paging, so the days either side of April are drawn
 * (the weeks are whole) and marked as not choosable.
 *
 * The calendar is out of flow and the field holds a fixed width, so opening it and
 * filling it in moves nothing else in the frame (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const header = SHORT.map(
    (name) => `<span class="sp-label" role="columnheader" style="text-align: center; font-size: 11px">${name}</span>`,
  ).join('');
  const weeks = WEEKS.map((week) => `<div role="row" style="display: contents">${week.map(day).join('')}</div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 300px">
        <div class="sp-topbar">
          <span class="sp-label sp-context" style="width: 52px">Delivery</span>
          <input
            class="sp-input"
            type="text"
            data-part="field"
            style="width: 176px"
            placeholder="Pick a date"
            aria-label="Delivery date"
          />
          <button
            class="sp-icon-button"
            type="button"
            data-part="trigger"
            aria-expanded="false"
            aria-haspopup="dialog"
            aria-label="Choose a date"
          >${icon('calendar')}</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">Two crates of oranges</span>
              <span class="sp-text">£38</span>
            </div>
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">Delivery</span>
              <span class="sp-text">£6</span>
            </div>
            <p class="sp-text" style="margin: 0">Slots differ by day of the week.</p>
          </div>
        </div>
        <div
          class="sp-popover"
          data-part="calendar"
          data-subject
          role="dialog"
          aria-label="Choose a delivery date"
          style="top: 60px; left: 75px; --sp-arrow-x: 196px"
        >
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-text--ink" id="vd-dp-month">${MONTH}</span>
          </div>
          <div
            class="sp-grid"
            data-part="grid"
            role="grid"
            aria-labelledby="vd-dp-month"
            style="grid-template-columns: repeat(7, 28px); gap: 2px 4px; margin-top: 8px"
          >
            <div role="row" style="display: contents">${header}</div>
            ${weeks}
          </div>
        </div>
      </div>
    </div>
  `;

  const calendar = part(root, 'calendar');
  const trigger = part(root, 'trigger');
  const grid = part(root, 'grid');
  const field = part(root, 'field') as HTMLInputElement;
  const days = [...grid.querySelectorAll<HTMLElement>('button[data-when]')];

  const setOpen = (open: boolean) => {
    flag(calendar, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  // The button opens; it never flips (SPEC §8). Choosing a day, Escape, and a press
  // outside are the three dismissals, which is the popover's contract.
  trigger.addEventListener('click', () => setOpen(true));

  for (const cell of days) {
    cell.addEventListener('click', () => {
      for (const other of days) other.setAttribute('aria-selected', String(other === cell));
      const when = cell.dataset.when ?? '';
      field.value = when;
      field.setAttribute('data-picked', when);
      setOpen(false);
    });
  }

  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!calendar.contains(target) && !trigger.contains(target)) setOpen(false);
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
