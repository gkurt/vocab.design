import { part } from '#src/kit/parts.ts';

type Column = 'track' | 'plays';
type Direction = 'ascending' | 'descending';

const ROWS = [
  { key: 'nocturne', track: 'Nocturne', plays: 812, added: 'Mar 4' },
  { key: 'low-tide', track: 'Low Tide', plays: 2140, added: 'Jan 19' },
  { key: 'ember', track: 'Ember', plays: 96, added: 'Apr 22' },
  { key: 'halcyon', track: 'Halcyon', plays: 1305, added: 'Feb 2' },
];

const ARROW = { ascending: '↑', descending: '↓' } as const;

/**
 * Sort indicator specimen: four rows whose order has a reason, and one arrow that
 * is the only place that reason is written down. The subject is the arrow itself,
 * not the header and not the table, and it travels with the sort: the term names
 * the mark in whichever header currently owns it, so exactly one element carries
 * `data-subject` at any moment, the same way exactly one header carries `aria-sort`.
 *
 * Every sortable header keeps the arrow's slot at a fixed width from mount and
 * hides the inactive ones rather than emptying them (SPEC §5), so sorting reorders
 * rows without moving a single column edge. "Added" has no slot at all, which is
 * how a header says it cannot be sorted. The frame is sized to the whole table, so
 * no row is cut by the window it lives in (SPEC §5).
 *
 * A caption under the table once read "Sorted by one column at a time." That was the
 * site explaining the term inside the product's own window, where a library screen
 * would print nothing at all, so it went and the frame lost its height.
 */
export function mount(root: HTMLElement): void {
  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.key}">
        <td>${row.track}</td>
        <td style="text-align: right">${row.plays.toLocaleString('en-US')}</td>
        <td class="sp-text">${row.added}</td>
      </tr>`,
  ).join('');

  const header = (column: Column, label: string, width: number, align: string) => `
    <th data-part="col-${column}" aria-sort="none" style="width: ${width}px; padding: 2px 4px; text-align: ${align}">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="sort-${column}">
        ${label}<span
          data-part="ind-${column}"
          aria-hidden="true"
          style="display: inline-block; width: 14px; text-align: center; visibility: hidden"
        >${ARROW.ascending}</span>
      </button>
    </th>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 238px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Library</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="overflow: hidden">
            <table class="sp-table" data-part="table" aria-label="Tracks">
              <thead>
                <tr>
                  ${header('track', 'Track', 168, 'left')}
                  ${header('plays', 'Plays', 110, 'right')}
                  <th class="sp-context" style="width: 96px">Added</th>
                </tr>
              </thead>
              <tbody class="sp-context" data-part="rows">${body}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const rowsBody = part(root, 'rows');
  let column: Column = 'track';
  let direction: Direction = 'ascending';

  const render = () => {
    const order = [...ROWS].sort((a, b) => {
      const diff = column === 'track' ? a.track.localeCompare(b.track) : a.plays - b.plays;
      return direction === 'ascending' ? diff : -diff;
    });
    for (const [index, row] of order.entries()) {
      const tr = part(root, `row-${row.key}`);
      // The rank is what a choreography can see: a reordered row has no position of
      // its own left to assert against (SPEC §8).
      tr.dataset.rank = String(index + 1);
      rowsBody.append(tr);
    }
    for (const name of ['track', 'plays'] as Column[]) {
      const active = name === column;
      const indicator = part(root, `ind-${name}`);
      part(root, `col-${name}`).setAttribute('aria-sort', active ? direction : 'none');
      indicator.textContent = ARROW[direction];
      indicator.style.visibility = active ? 'visible' : 'hidden';
      if (active) indicator.setAttribute('data-subject', '');
      else indicator.removeAttribute('data-subject');
    }
  };

  // A column the table is not already sorted by always lands on ascending, so a
  // scripted pass reaches that state rather than flipping whatever it found. Turning
  // the sorted column around is the one flip the script drives itself, because the
  // direction is half of what this arrow exists to say (SPEC §8).
  const sortBy = (next: Column) => {
    direction = next === column && direction === 'ascending' ? 'descending' : 'ascending';
    column = next;
    render();
  };

  for (const name of ['track', 'plays'] as Column[]) {
    part(root, `sort-${name}`).addEventListener('click', () => sortBy(name));
  }

  render();
}
