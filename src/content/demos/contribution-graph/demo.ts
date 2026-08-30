import { localBox } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/**
 * One year of daily practice counts, starting Sunday 9 March 2025, one digit per day.
 * The string stops at "today" (Wednesday 11 March 2026), so the last three days of the
 * final week have no digit at all: an empty cell is not a zero cell, and the difference
 * is the whole bottom of the scale.
 */
const SERIES =
  '01000004400040011002300000002222044012430004400003201300024402015540000325510330614002002200306200003653033514030718782316176442470020072904000000000000000320001010121401301040511120300010045820403201050097023418976300240600043901000000000104320000031000515500162232040130201100001206520056461314485842376933088832013710003254723254313244922521454213010568001861700376';

const START = Date.UTC(2025, 2, 9);
const COLUMNS = 53;
const ROWS = 7;
/** Specimen pixels. Cells stay square, so 53 columns of 8 plus their gutters is the width. */
const CELL = 8;
const GAP = 2;
const LABEL_W = 24;
/** Room for the grid, the gap under it, and the label that hangs there (SPEC §5). */
const FIELD_H = 120;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/** The three rows GitHub prints, which is as many as fit without the labels merging. */
const RULED_ROWS = [1, 3, 5];

const ACTIVE_RING = '0 0 0 1.5px var(--sp-ink)';

const dateAt = (index: number) => new Date(START + index * 86_400_000);

/** `null` where the year has not happened yet, which is a different thing from zero. */
const countAt = (index: number): number | null => (index < SERIES.length ? Number(SERIES[index]) : null);

/** Five steps, not a continuous ramp: four filled and one for a day that happened and held nothing. */
const levelOf = (count: number) => (count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4);

const total = [...SERIES].reduce((sum, digit) => sum + Number(digit), 0);

/** What the cell says to a screen reader: the count and the date, in one sentence. */
function spoken(index: number): string {
  const date = dateAt(index);
  const stamp = `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  const count = countAt(index);
  if (count === null) return `No data for ${stamp}`;
  if (count === 0) return `No sessions on ${stamp}`;
  return `${count} session${count === 1 ? '' : 's'} on ${stamp}`;
}

/** What the label says on screen, where the row and column headers are already visible. */
function printed(index: number): string {
  const date = dateAt(index);
  const stamp = `${WEEKDAYS_SHORT[date.getUTCDay()]} ${date.getUTCDate()} ${MONTHS_SHORT[date.getUTCMonth()]}`;
  const count = countAt(index);
  if (count === null) return `No data for ${stamp}`;
  if (count === 0) return `No sessions on ${stamp}`;
  return `${count} session${count === 1 ? '' : 's'} on ${stamp}`;
}

/** A month gets one header, spanning the columns whose week begins in it. */
function monthHeaders(): string {
  const groups: { month: number; year: number; span: number }[] = [];
  for (let column = 0; column < COLUMNS; column += 1) {
    const date = dateAt(column * ROWS);
    const last = groups.at(-1);
    if (last && last.month === date.getUTCMonth()) last.span += 1;
    else groups.push({ month: date.getUTCMonth(), year: date.getUTCFullYear(), span: 1 });
  }
  return groups
    .map(({ month, year, span }) => {
      // Under three columns there is no room for three letters, so the label is dropped
      // from the picture and kept for the header's accessible name.
      const shown = span >= 3 ? `<span aria-hidden="true">${MONTHS_SHORT[month]}</span>` : '';
      return `<th scope="col" colspan="${span}" style="padding: 0; text-align: left; font-weight: 500; color: var(--sp-muted); overflow: hidden; white-space: nowrap">
        ${shown}<span class="sp-visually-hidden">${MONTHS[month]} ${year}</span>
      </th>`;
    })
    .join('');
}

/**
 * The weekday label is absolutely positioned inside its header cell, because a 9px line of
 * type in an 8px row makes the row 11px tall and the squares stop being square.
 */
function rowHeader(row: number): string {
  const shown = RULED_ROWS.includes(row)
    ? `<span aria-hidden="true" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);
         width: ${LABEL_W}px; overflow: hidden; white-space: nowrap; line-height: 1; color: var(--sp-muted)">${WEEKDAYS_SHORT[row]}</span>`
    : '';
  return `<th scope="row" style="position: relative; padding: 0; font-weight: 400">
    ${shown}<span class="sp-visually-hidden">${WEEKDAYS[row]}</span>
  </th>`;
}

function cell(index: number): string {
  const count = countAt(index);
  const label = `<span class="sp-visually-hidden">${spoken(index)}</span>`;
  if (count === null) return `<td data-part="cell-${index}" data-empty style="padding: 0">${label}</td>`;
  const level = levelOf(count);
  return `<td class="sp-swatch" data-part="cell-${index}" data-level="${level}"
    style="padding: 0; border-radius: 2px; --sp-swatch: var(--l${level})">${label}</td>`;
}

const legendSwatch = (level: number) =>
  `<span class="sp-swatch" aria-hidden="true" style="width: ${CELL}px; height: ${CELL}px; border-radius: 2px; --sp-swatch: var(--l${level})"></span>`;

/**
 * Contribution graph specimen: 53 week columns by 7 weekday rows, one square per day,
 * shaded on a five step ramp, with the count for a square shown when the reader points at
 * it or walks the grid with the arrow keys.
 *
 * The subject is the table, which is the narrowest element the term names: a contribution
 * graph IS the grid of week columns, and the window chrome and the legend are the scene
 * around it. Every state is honestly the term, so there is no `data-pose`.
 *
 * A caption under the grid read "Five discrete steps, not a continuous ramp. A day with none
 * still gets the palest square; the blank corner at the end is days that have not happened
 * yet." That is the site reading its own legend out, and the article says it at length, so it
 * went. The box stays as an unpainted target with no text, because the choreography aims the
 * cursor there to leave the grid and watch the tooltip close (SPEC §5).
 *
 * The structure is the term's own history rather than decoration (see the article): a real
 * table with a caption naming the range and the shape, month headers across the top,
 * weekday headers down the side, a sentence of hidden text in every cell, and a roving tab
 * stop the arrow keys move, so the number in the tooltip is reachable without a pointer.
 * Real focus follows a real key only, since attract must never take the keyboard (SPEC §7).
 *
 * The ramp is built from the kit accent by `color-mix`, so it follows the light and dark
 * schemes; GitHub's green is a brand, not the term. The legend deliberately stays out of
 * the context register, because a legend repainted chroma-free stops being a legend.
 * The label under the grid occupies its room whether or not it is open, so pointing at a
 * square repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = Array.from({ length: ROWS }, (_, row) => {
    const cells = Array.from({ length: COLUMNS }, (_, column) => cell(column * ROWS + row)).join('');
    return `<tr style="height: ${CELL}px">${rowHeader(row)}${cells}</tr>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 606px; height: 232px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Practice log</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${total} sessions in the last year</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 12px">
          <div
            class="sp-surface"
            style="flex: 0 0 auto; padding: 10px;
                   --l0: color-mix(in oklab, var(--sp-ink) 10%, var(--sp-surface));
                   --l1: color-mix(in oklab, var(--sp-accent) 26%, var(--sp-surface));
                   --l2: color-mix(in oklab, var(--sp-accent) 48%, var(--sp-surface));
                   --l3: color-mix(in oklab, var(--sp-accent) 72%, var(--sp-surface));
                   --l4: var(--sp-accent)"
          >
            <div data-part="field" style="position: relative; height: ${FIELD_H}px">
              <table
                data-part="grid"
                data-subject
                data-hover-driven
                style="border-collapse: separate; border-spacing: ${GAP}px; table-layout: fixed; font-size: 9px; line-height: 1"
              >
                <caption class="sp-visually-hidden">
                  Practice sessions from 9 March 2025 to 11 March 2026, as ${COLUMNS} week columns by ${ROWS} weekday rows.
                  Every cell is one day and gives that day's session count.
                </caption>
                <colgroup><col style="width: ${LABEL_W}px" /><col span="${COLUMNS}" style="width: ${CELL}px" /></colgroup>
                <thead>
                  <tr style="height: 11px">
                    <td style="padding: 0"><span class="sp-visually-hidden">Weekday</span></td>
                    ${monthHeaders()}
                  </tr>
                </thead>
                <tbody data-part="weeks">${rows}</tbody>
              </table>
              <span class="sp-tooltip" data-part="tip" data-count="none" style="bottom: 0"></span>
            </div>
            <div class="sp-row" style="justify-content: flex-end; gap: 4px; margin-top: 6px; height: 14px">
              <span class="sp-label" data-part="legend" style="font-size: 10px">Less</span>
              ${[0, 1, 2, 3, 4].map(legendSwatch).join('')}
              <span class="sp-label" style="font-size: 10px">More</span>
            </div>
          </div>
        </div>
      </div>
      <span data-part="away" aria-hidden="true" style="width: 560px; height: 30px"></span>
    </div>
  `;

  const field = part(root, 'field');
  const weeks = part(root, 'weeks');
  const tip = part(root, 'tip');

  let active: HTMLElement | null = null;
  /** The one tab stop the grid gets: 371 of them would not be a grid. */
  let roving = COLUMNS * ROWS - ROWS + 3;

  const indexOf = (el: HTMLElement) => Number(el.dataset.part?.slice('cell-'.length));

  const cellAt = (index: number) => root.querySelector<HTMLElement>(`[data-part="cell-${index}"]`);

  const label = (el: HTMLElement) => {
    const index = indexOf(el);
    const count = countAt(index);
    tip.textContent = printed(index);
    tip.dataset.count = count === null ? 'none' : String(count);
    // Measured after the text lands and before the label opens: the width is what decides
    // whether a square near either end can keep its label whole. Both boxes are read in
    // specimen pixels, because a listing card scales the whole stage (SPEC §5).
    const box = localBox(el, field);
    const room = field.offsetWidth;
    const width = tip.offsetWidth;
    const centre = box.left + box.width / 2;
    const left = Math.max(0, Math.min(room - width, centre - width / 2));
    tip.style.left = `${left}px`;
    tip.style.setProperty('--sp-arrow-x', `${centre - left}px`);
    tip.setAttribute('data-open', '');
  };

  const show = (el: HTMLElement | null) => {
    if (active === el) return;
    if (active) {
      active.removeAttribute('data-active');
      active.style.boxShadow = '';
    }
    active = el;
    if (!el) {
      tip.removeAttribute('data-open');
      return;
    }
    el.setAttribute('data-active', '');
    el.style.boxShadow = ACTIVE_RING;
    label(el);
  };

  const rove = (index: number) => {
    const next = cellAt(index);
    if (!next) return;
    cellAt(roving)?.removeAttribute('tabindex');
    roving = index;
    next.tabIndex = 0;
    show(next);
  };

  cellAt(roving)?.setAttribute('tabindex', '0');

  weeks.addEventListener('pointerover', (event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-part^="cell-"]');
    if (el) show(el);
  });

  // `pointerout` bubbles where `pointerleave` does not, so this is where the grid hears
  // the pointer go. A move onto the next square names it as `relatedTarget` and the label
  // is left to that square's own `pointerover`; the script's pointer names nothing, and
  // there the out and the over land together, so the end state is the same either way.
  weeks.addEventListener('pointerout', (event) => {
    const to = event.relatedTarget;
    if (to instanceof HTMLElement && to.closest('[data-part^="cell-"]')) return;
    show(null);
  });

  weeks.addEventListener('focusin', (event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-part^="cell-"]');
    if (el) show(el);
  });

  weeks.addEventListener('keydown', (event) => {
    const from = active ?? cellAt(roving);
    if (!from) return;
    const index = indexOf(from);
    const column = Math.floor(index / ROWS);
    const row = index % ROWS;
    const moves: Record<string, [number, number]> = {
      ArrowRight: [column + 1, row],
      ArrowLeft: [column - 1, row],
      ArrowDown: [column, row + 1],
      ArrowUp: [column, row - 1],
      Home: [0, row],
      End: [COLUMNS - 1, row],
    };
    const move = moves[event.key];
    if (!move) return;
    // Every key the grid claims has its default refused, or a reader walking the year also
    // scrolls the page out from under it (SPEC §7). Tab is left alone.
    event.preventDefault();
    const [nextColumn, nextRow] = move;
    if (nextColumn < 0 || nextColumn >= COLUMNS || nextRow < 0 || nextRow >= ROWS) return;
    rove(nextColumn * ROWS + nextRow);
    // Real focus follows a real key only: a scripted one must never take the keyboard of
    // someone scrolling past (SPEC §7).
    if (event.isTrusted) cellAt(roving)?.focus();
  });
}
