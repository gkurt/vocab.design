import { part } from '#src/kit/parts.ts';

type Cell = { n: number; out?: boolean };

const SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const LONG = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH = 'April 2025';

/** April 2025, Monday first, with the days either side kept so the weeks stay whole. */
const WEEKS: Cell[][] = [
  [{ n: 31, out: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }],
  [{ n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }, { n: 12 }, { n: 13 }],
  [{ n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }, { n: 19 }, { n: 20 }],
  [{ n: 21 }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 }, { n: 26 }, { n: 27 }],
  [{ n: 28 }, { n: 29 }, { n: 30 }, { n: 1, out: true }, { n: 2, out: true }, { n: 3, out: true }, { n: 4, out: true }],
];

const dayCell = (cell: Cell, column: number): string => {
  if (cell.out)
    return `<button class="sp-day" type="button" role="gridcell" data-outside aria-disabled="true" tabindex="-1" style="width: 28px">${cell.n}</button>`;
  const label = `${LONG[column]} ${cell.n} April 2025`;
  return `<button
    class="sp-day"
    type="button"
    role="gridcell"
    data-part="day-${cell.n}"
    data-n="${cell.n}"
    aria-selected="false"
    aria-label="${label}"
    style="width: 28px"
  >${cell.n}</button>`;
};

const readoutFor = (start: number | null, end: number | null): string => {
  if (start === null) return 'Pick the first night';
  if (end === null) return `${start} April to …`;
  return `${start} to ${end} April, ${end - start} nights`;
};

/**
 * Date range picker specimen: one month grid taking a start and an end, painting the
 * span between them and previewing that span under the pointer between the two presses.
 *
 * The subject is the picker panel, grid and readout together, because the range is a
 * property of the whole panel rather than of any one day: two selected cells with no
 * band between them would be two date pickers. The presets beside it are scenery, as
 * is the frame the panel sits in.
 *
 * The band is inline paint on the day cells (an in-range wash, square ends so adjacent
 * days form one continuous strip) because that painted span is this term's own claim,
 * while the two caps keep the kit's selected day exactly as a single date picker draws
 * it. Columns sit at the day's own width with no column gap, so nothing breaks the
 * strip, and the readout line holds its height whether or not there is a range in it.
 */
export function mount(root: HTMLElement): void {
  const header = SHORT.map(
    (name) => `<span class="sp-label" role="columnheader" style="width: 28px; text-align: center; font-size: 11px">${name}</span>`,
  ).join('');
  const weeks = WEEKS.map((week) => `<div role="row" style="display: contents">${week.map(dayCell).join('')}</div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Stay dates</span>
          <span class="sp-label">Casa del Faro</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div class="sp-stack sp-context" style="width: 118px; flex: 0 0 auto; gap: 6px">
            <span class="sp-label">Presets</span>
            <button class="sp-chip" type="button" data-part="preset" style="justify-content: center">This week</button>
            <button class="sp-chip" type="button" style="justify-content: center">Next weekend</button>
            <p class="sp-text" style="margin: 4px 0 0; font-size: 12px">The rate changes at the weekend.</p>
          </div>
          <div
            class="sp-surface"
            data-part="panel"
            data-subject
            data-range="none"
            role="group"
            aria-label="Stay dates"
            style="flex: 1 1 auto; padding: 10px 12px"
          >
            <span class="sp-label sp-text--ink" id="vd-drp-month">${MONTH}</span>
            <div
              class="sp-grid"
              data-part="grid"
              role="grid"
              aria-labelledby="vd-drp-month"
              style="grid-template-columns: repeat(7, 28px); gap: 3px 0; margin-top: 6px; justify-content: center"
            >
              <div role="row" style="display: contents">${header}</div>
              ${weeks}
            </div>
            <div class="sp-divider" style="margin: 8px 0"></div>
            <span
              class="sp-text"
              data-part="readout"
              role="status"
              style="display: block; height: 18px; white-space: nowrap"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const grid = part(root, 'grid');
  const readout = part(root, 'readout');
  const cells = [...grid.querySelectorAll<HTMLElement>('button[data-n]')];

  let start: number | null = null;
  let end: number | null = null;

  const paint = (preview: number | null) => {
    const forward = preview !== null && start !== null && preview > start;
    const to = end ?? (forward ? preview : null);
    const low = start !== null && to !== null ? Math.min(start, to) : 0;
    const high = start !== null && to !== null ? Math.max(start, to) : -1;

    for (const cell of cells) {
      const n = Number(cell.dataset.n);
      const cap = n === start || n === end;
      const inside = n > low && n < high;
      const tip = end === null && n === to;
      cell.setAttribute('aria-selected', String(cap));
      if (!cap && (inside || tip)) {
        cell.dataset.inRange = '';
        cell.style.background = 'var(--sp-accent-soft)';
        cell.style.borderRadius = tip ? '0 6px 6px 0' : '0';
        continue;
      }
      delete cell.dataset.inRange;
      cell.style.removeProperty('background');
      cell.style.removeProperty('border-radius');
    }

    if (start === null) panel.dataset.range = 'none';
    else if (end === null) panel.dataset.range = 'start';
    else panel.dataset.range = 'complete';
    readout.textContent = readoutFor(start, end);
  };

  const choose = (n: number) => {
    // The first press opens a range and the second closes it. Picking backwards starts
    // a new range rather than silently swapping the two ends.
    if (start === null || end !== null || n < start) {
      start = n;
      end = null;
    } else if (n > start) {
      end = n;
    }
    paint(null);
  };

  for (const cell of cells) cell.addEventListener('click', () => choose(Number(cell.dataset.n)));

  // Hover here is the demonstration rather than repaint: between the two presses, the
  // span under the pointer is the thing the reader is being shown.
  grid.addEventListener('pointerover', (event) => {
    if (start === null || end !== null) return;
    const cell = (event.target as HTMLElement).closest<HTMLElement>('button[data-n]');
    if (cell) paint(Number(cell.dataset.n));
  });

  // A preset names both ends at once, which is how most real ranges are actually set.
  part(root, 'preset').addEventListener('click', () => {
    start = 7;
    end = 13;
    paint(null);
  });

  paint(null);
}
