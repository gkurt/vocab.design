import { flag, part } from '#src/kit/parts.ts';

type Column = 'client' | 'amount';
type Direction = 'ascending' | 'descending';

const ROWS = [
  { key: 'ada', client: 'Ada Lovelace', status: 'Paid', amount: 1240 },
  { key: 'ivy', client: 'Ivy Chen', status: 'Overdue', amount: 4015 },
  { key: 'nils', client: 'Nils Berg', status: 'Pending', amount: 320 },
  { key: 'ravi', client: 'Ravi Patel', status: 'Paid', amount: 860 },
];

const money = (amount: number) => `$${amount.toLocaleString('en-US')}.00`;

/**
 * Data table specimen: the table itself is the subject, since the term names the
 * tabular control and not the panel it sits in. Sorting a column reorders the rows
 * and the selection rides along with them, which is the property that separates a
 * worked table from a read one.
 *
 * Nothing outside the rows moves while it works (SPEC §5): every column has a fixed
 * width, the sort arrow keeps its slot in both headers whether or not that column is
 * the sorted one, and the summary bar has a reserved height, so the Clear action can
 * appear without walking the table up the frame.
 */
export function mount(root: HTMLElement): void {
  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.key}">
        <td style="width: 36px">
          <button
            class="sp-checkbox"
            type="button"
            role="checkbox"
            aria-checked="false"
            data-part="check-${row.key}"
            aria-label="Select ${row.client}"
          ></button>
        </td>
        <td>${row.client}</td>
        <td class="sp-text">${row.status}</td>
        <td style="text-align: right">${money(row.amount)}</td>
      </tr>`,
  ).join('');

  const header = (column: Column, label: string, width: number, align: string) => `
    <th data-part="col-${column}" aria-sort="none" style="width: ${width}px; padding: 2px 4px; text-align: ${align}">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="sort-${column}">
        ${label}<span data-part="arrow-${column}" style="display: inline-block; width: 10px; text-align: left"></span>
      </button>
    </th>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Invoices</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="overflow: hidden">
            <table class="sp-table" data-part="table" data-subject aria-label="Invoices">
              <thead>
                <tr>
                  <th style="width: 36px">
                    <button
                      class="sp-checkbox"
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-part="check-all"
                      aria-label="Select every row"
                    ></button>
                  </th>
                  ${header('client', 'Client', 168, 'left')}
                  <th style="width: 92px">Status</th>
                  ${header('amount', 'Amount', 118, 'right')}
                </tr>
              </thead>
              <tbody data-part="rows">${body}</tbody>
            </table>
          </div>
          <div class="sp-row sp-context" style="height: 32px; margin-top: 8px">
            <span class="sp-text sp-grow" data-part="summary"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="clear" hidden>Clear</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const rowsBody = part(root, 'rows');
  const summary = part(root, 'summary');
  const clear = part(root, 'clear');
  const checkAll = part(root, 'check-all');
  const selected = new Set<string>();
  let column: Column = 'client';
  let direction: Direction = 'ascending';

  const render = () => {
    const order = [...ROWS].sort((a, b) => {
      const diff = column === 'client' ? a.client.localeCompare(b.client) : a.amount - b.amount;
      return direction === 'ascending' ? diff : -diff;
    });
    for (const [index, row] of order.entries()) {
      const tr = part(root, `row-${row.key}`);
      // The rank is what a choreography can see: rows have no position of their own
      // to assert against once they have been reordered (SPEC §8).
      tr.dataset.rank = String(index + 1);
      rowsBody.append(tr);
      flag(tr, 'data-selected', selected.has(row.key));
      part(root, `check-${row.key}`).setAttribute('aria-checked', String(selected.has(row.key)));
    }
    for (const name of ['client', 'amount'] as Column[]) {
      const active = name === column;
      part(root, `col-${name}`).setAttribute('aria-sort', active ? direction : 'none');
      part(root, `arrow-${name}`).textContent = active ? (direction === 'ascending' ? '↑' : '↓') : '';
    }
    // Some-but-not-all is a state of its own, and the header checkbox is where it shows.
    checkAll.setAttribute('aria-checked', selected.size === 0 ? 'false' : selected.size === ROWS.length ? 'true' : 'mixed');
    summary.textContent = selected.size === 0 ? `${ROWS.length} invoices` : `${selected.size} selected`;
    clear.hidden = selected.size === 0;
  };

  // Sorting a column the table is not already sorted by always lands on ascending, so
  // a scripted pass reaches a state rather than flipping whatever it found (SPEC §8).
  const sortBy = (next: Column) => {
    direction = next === column && direction === 'ascending' ? 'descending' : 'ascending';
    column = next;
    render();
  };

  for (const name of ['client', 'amount'] as Column[]) {
    part(root, `sort-${name}`).addEventListener('click', () => sortBy(name));
  }

  for (const row of ROWS) {
    part(root, `check-${row.key}`).addEventListener('click', () => {
      if (selected.has(row.key)) selected.delete(row.key);
      else selected.add(row.key);
      render();
    });
  }

  checkAll.addEventListener('click', () => {
    if (selected.size === ROWS.length) selected.clear();
    else for (const row of ROWS) selected.add(row.key);
    render();
  });

  // Clearing is the explicit dismissal of a selection, and it lands on the same
  // state however many rows were picked.
  clear.addEventListener('click', () => {
    selected.clear();
    render();
  });

  render();
}
