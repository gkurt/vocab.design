import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** The two months this specimen holds. Paging past either end is not offered. */
const MONTHS = ['2025-04', '2025-05'] as const;
const NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TODAY = '2025-04-09';

type Cell = { iso: string; day: number; outside: boolean };

/** Five whole weeks, Monday first, so both months are the same height (SPEC §5). */
function cellsOf(month: string): Cell[] {
  const [year, index] = month.split('-').map(Number) as [number, number];
  const first = new Date(Date.UTC(year, index - 1, 1));
  const start = new Date(first);
  start.setUTCDate(1 - ((first.getUTCDay() + 6) % 7));
  return Array.from({ length: 35 }, (_, offset) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + offset);
    const iso = date.toISOString().slice(0, 10);
    return { iso, day: date.getUTCDate(), outside: !iso.startsWith(month) };
  });
}

const title = (month: string) => {
  const [year, index] = month.split('-').map(Number) as [number, number];
  return `${NAMES[index - 1]} ${year}`;
};

const spoken = (cell: Cell, column: number, month: string) => `${LONG[column]} ${cell.day} ${title(month)}`;

/**
 * Calendar specimen: a month laid out as a grid, standing on its own rather than
 * hanging off a field. The subject is the calendar surface (the month it names, the
 * controls that page it, and the grid itself), since the term covers reading and
 * navigating a month as well as choosing a day in it. The booking panel around it
 * is scenery.
 *
 * Two months are held and the ends are stated as spent, so paging reaches an
 * absolute month rather than stepping from wherever a pass began (SPEC §8). Every
 * month renders five whole weeks, so a page changes what the grid says and never
 * how much room it takes (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const header = SHORT.map(
    (name, column) =>
      `<span class="sp-label" role="columnheader" aria-label="${LONG[column]}" style="text-align: center; font-size: 11px">${name}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 340px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio booking</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="calendar" data-subject style="padding: 10px 12px 12px">
            <div class="sp-row sp-row--between">
              <button class="sp-icon-button" type="button" data-part="nav-prev" aria-label="Previous month">${icon('chevronLeft')}</button>
              <span
                class="sp-label sp-text--ink"
                data-part="month"
                data-month="${MONTHS[0]}"
                id="vd-cal-month"
                aria-live="polite"
                style="width: 110px; text-align: center"
              >${title(MONTHS[0])}</span>
              <button class="sp-icon-button" type="button" data-part="nav-next" aria-label="Next month">${icon('chevronRight')}</button>
            </div>
            <div
              class="sp-grid"
              data-part="grid"
              role="grid"
              aria-labelledby="vd-cal-month"
              style="grid-template-columns: repeat(7, 28px); gap: 2px 4px; margin-top: 6px"
            >
              <div role="row" style="display: contents">${header}</div>
              <div data-part="weeks" style="display: contents"></div>
            </div>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Session</span>
            <span class="sp-text sp-text--ink" data-part="chosen" data-chosen="" style="width: 120px; text-align: right">No day chosen</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const weeks = part(root, 'weeks');
  const month = part(root, 'month');
  const prev = part(root, 'nav-prev');
  const next = part(root, 'nav-next');
  const chosen = part(root, 'chosen');

  let page = 0;
  let selected = '';
  /** The one tab stop the month gets: a grid of thirty-one tab stops is not a grid. */
  let roving = '';

  const draw = () => {
    const key = MONTHS[page] as string;
    const cells = cellsOf(key);
    const inside = cells.filter((cell) => !cell.outside);
    if (!inside.some((cell) => cell.iso === roving)) roving = (inside.find((cell) => cell.iso === selected) ?? inside[0])?.iso ?? '';
    month.textContent = title(key);
    month.dataset.month = key;
    weeks.innerHTML = Array.from({ length: 5 }, (_, week) => {
      const row = cells.slice(week * 7, week * 7 + 7).map((cell, column) => {
        // A specimen holding two months cannot honestly offer the days either side,
        // so they are drawn for the shape of the week and not as choices.
        if (cell.outside)
          return `<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1">${cell.day}</button>`;
        const marks = [
          cell.iso === TODAY ? ' data-today aria-current="date"' : '',
          cell.iso === selected ? ' aria-selected="true"' : ' aria-selected="false"',
        ].join('');
        return `<button
          class="sp-day"
          type="button"
          role="gridcell"
          data-part="day-${cell.iso}"
          data-iso="${cell.iso}"
          tabindex="${cell.iso === roving ? 0 : -1}"
          aria-label="${spoken(cell, column, key)}"${marks}
        >${cell.day}</button>`;
      });
      return `<div role="row" style="display: contents">${row.join('')}</div>`;
    }).join('');
    for (const [button, spent] of [
      [prev, page === 0],
      [next, page === MONTHS.length - 1],
    ] as const) {
      button.setAttribute('aria-disabled', String(spent));
    }
  };

  const choose = (iso: string) => {
    selected = iso;
    roving = iso;
    const [year, index, day] = iso.split('-').map(Number) as [number, number, number];
    chosen.textContent = `${day} ${NAMES[index - 1]?.slice(0, 3)} ${year}`;
    chosen.dataset.chosen = iso;
    draw();
  };

  const turn = (to: number) => {
    const clamped = Math.min(MONTHS.length - 1, Math.max(0, to));
    if (clamped === page) return;
    page = clamped;
    draw();
  };

  prev.addEventListener('click', () => turn(page - 1));
  next.addEventListener('click', () => turn(page + 1));

  // Delegated, because paging rewrites the weeks: a listener per cell would have to
  // be rebound on every page, and the grid is what owns the keyboard anyway.
  weeks.addEventListener('click', (event) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>('[data-iso]');
    if (cell) choose(cell.dataset.iso as string);
  });

  weeks.addEventListener('keydown', (event) => {
    const cells = cellsOf(MONTHS[page] as string).filter((cell) => !cell.outside);
    const at = cells.findIndex((cell) => cell.iso === roving);
    const deltas: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 };
    const delta = deltas[event.key];
    if (delta !== undefined) {
      const target = cells[Math.min(cells.length - 1, Math.max(0, at + delta))];
      if (!target) return;
      event.preventDefault();
      roving = target.iso;
      draw();
      // Real focus follows a real key press only: a scripted one must never take the
      // keyboard of someone scrolling past (SPEC §7).
      if (event.isTrusted) part(root, `day-${roving}`).focus();
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (roving) choose(roving);
      return;
    }
    if (event.key === 'PageDown') turn(page + 1);
    else if (event.key === 'PageUp') turn(page - 1);
    else return;
    event.preventDefault();
  });

  draw();
}
