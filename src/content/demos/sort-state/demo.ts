import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type ColumnKey = 'name' | 'size' | 'modified';
type Direction = 'ascending' | 'descending';

const COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'size', label: 'Size' },
  { key: 'modified', label: 'Modified' },
];

const ROWS = [
  { name: 'Contract.pdf', size: 240, modified: 3, when: '3 days ago' },
  { name: 'Budget.xlsx', size: 88, modified: 1, when: 'yesterday' },
  { name: 'Notes.md', size: 12, modified: 9, when: '9 days ago' },
  { name: 'Site map.png', size: 620, modified: 5, when: '5 days ago' },
];

function header({ key, label }: { key: ColumnKey; label: string }): string {
  return `
    <th scope="col" data-part="th-${key}" aria-sort="none" style="width: ${key === 'name' ? '46%' : '27%'}">
      <button class="sp-button sp-button--quiet" type="button" data-part="sort-${key}"
              style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 6px; margin: -3px -6px;
                     border: 0; border-radius: 5px; font: inherit; font-size: 12px; color: inherit; cursor: pointer">
        <span>${label}</span>
        <span data-part="arrow-${key}" style="display: inline-flex; visibility: hidden">${icon('chevronDown')}</span>
      </button>
    </th>`;
}

/**
 * Sort state specimen: a small file table where the order on screen and the order announced
 * are the same fact. Picking a column sorts the rows, moves the arrow, and moves `aria-sort`
 * with it, so exactly one header ever claims a direction; the readout underneath prints what
 * assistive technology would get and which header is carrying it.
 *
 * The subject is the sorted header cell, and it travels with the sort rather than staying on
 * the column that happened to be sorted at mount: the term names the state, so the honest
 * subject is whichever header currently holds it. Exactly one exists at every moment
 * (SPEC §5). The table body, the frame, and the readout strip are scenery.
 *
 * Pressing the header that is already sorted reverses it, which is the one sanctioned toggle
 * (SPEC §8): the flip between ascending and descending is the term itself, and the script
 * drives both directions on purpose. Every other press reaches an absolute state, a named
 * column sorted ascending. The arrow's room is reserved in every header and the row count
 * never changes, so sorting moves nothing that did not sort (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 246px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 14px">Project files</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="padding: 2px 10px">
            <table class="sp-table" style="--sp-cell-pad: 6px 4px">
              <thead><tr>${COLUMNS.map(header).join('')}</tr></thead>
              <tbody data-part="rows" class="sp-context"></tbody>
            </table>
          </div>
          <div class="sp-surface sp-context" style="padding: 7px 10px">
            <div class="sp-row sp-row--between" style="height: 17px">
              <span class="sp-label">Screen reader</span>
              <span class="sp-text sp-text--ink" data-part="heard" style="font-size: 12px; white-space: nowrap"></span>
            </div>
            <div class="sp-row sp-row--between" style="height: 17px; margin-top: 2px">
              <span class="sp-label">aria-sort</span>
              <span class="sp-text sp-text--ink" data-part="carried" style="font-size: 12px; white-space: nowrap"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const rows = part(root, 'rows');
  const heard = part(root, 'heard');
  const carried = part(root, 'carried');

  let sortedBy: ColumnKey = 'name';
  let direction: Direction = 'ascending';

  const render = () => {
    const sign = direction === 'ascending' ? 1 : -1;
    const ordered = [...ROWS].sort((a, b) => {
      if (sortedBy === 'name') return sign * a.name.localeCompare(b.name);
      return sign * (a[sortedBy] - b[sortedBy]);
    });
    rows.innerHTML = ordered
      .map(
        (row) => `
          <tr>
            <td>${row.name}</td>
            <td>${row.size} KB</td>
            <td>${row.when}</td>
          </tr>`,
      )
      .join('');

    for (const { key, label } of COLUMNS) {
      const th = part(root, `th-${key}`);
      const current = key === sortedBy;
      th.setAttribute('aria-sort', current ? direction : 'none');
      flag(th, 'data-subject', current);
      const arrow = part(root, `arrow-${key}`);
      arrow.style.visibility = current ? 'visible' : 'hidden';
      arrow.style.transform = current && direction === 'ascending' ? 'rotate(180deg)' : '';
      if (current) heard.textContent = `“${label}, sorted ${direction}, column header”`;
    }
    carried.textContent = `${direction}, on ${COLUMNS.find((c) => c.key === sortedBy)?.label} alone`;
  };

  render();

  for (const { key } of COLUMNS) {
    part(root, `sort-${key}`).addEventListener('click', () => {
      if (key === sortedBy) direction = direction === 'ascending' ? 'descending' : 'ascending';
      else {
        sortedBy = key;
        direction = 'ascending';
      }
      render();
    });
  }
}
