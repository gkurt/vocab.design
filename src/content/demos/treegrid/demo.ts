import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** Room for every row the grid can show at once, header included, so expanding shifts nothing outside it. */
const REGION_H = 216;

const COLUMNS = ['region', 'owner', 'spend', 'change'] as const;
type Column = (typeof COLUMNS)[number];

interface Row {
  key: string;
  name: string;
  owner: string;
  spend: string;
  change: string;
  level: 1 | 2;
  parent?: string;
  /** Rows that nest under this one, which is what the twisty reveals. */
  kids?: string[];
}

const ROWS: Row[] = [
  { key: 'north', name: 'North', owner: 'A. Okafor', spend: '£41,200', change: '+4%', level: 1, kids: ['leeds', 'york'] },
  { key: 'leeds', name: 'Leeds', owner: 'R. Vance', spend: '£18,400', change: '+6%', level: 2, parent: 'north' },
  { key: 'york', name: 'York', owner: 'M. Idris', spend: '£12,900', change: '-2%', level: 2, parent: 'north' },
  { key: 'south', name: 'South', owner: 'J. Perez', spend: '£28,750', change: '+1%', level: 1 },
  { key: 'west', name: 'West', owner: 'L. Groves', spend: '£33,100', change: '-5%', level: 1, kids: ['truro'] },
  { key: 'truro', name: 'Truro', owner: 'D. Hale', spend: '£7,300', change: '-1%', level: 2, parent: 'west' },
];

const byKey = new Map(ROWS.map((row) => [row.key, row]));
const TOP = ROWS.filter((row) => row.level === 1);
const CELL_LABEL: Record<Column, string> = { region: 'Region', owner: 'Owner', spend: 'Spend', change: 'Change' };

const cell = (row: Row, column: Column, value: string) => `
  <td role="gridcell" id="cell-${row.key}-${column}" data-part="cell-${row.key}-${column}" style="border-bottom: 1px solid var(--sp-line)">${value}</td>`;

/** Where the row sits among its siblings, which is what a screen reader reads out. */
const posinset = (row: Row) => {
  const siblings = row.parent ? (byKey.get(row.parent)?.kids ?? []) : TOP.map((top) => top.key);
  return siblings.indexOf(row.key) + 1;
};

const rowMarkup = (row: Row) => {
  const twisty = row.kids
    ? `<button
         class="sp-icon-button"
         type="button"
         data-part="twisty-${row.key}"
         aria-label="Expand ${row.name}"
         tabindex="-1"
         style="width: 18px; height: 18px; flex: 0 0 auto"
       >${icon('chevronRight', 'sp-icon--chevron')}</button>`
    : '<span style="flex: 0 0 auto; width: 18px"></span>';
  return `
    <tr
      role="row"
      data-part="row-${row.key}"
      aria-level="${row.level}"
      aria-posinset="${posinset(row)}"
      ${row.kids ? 'aria-expanded="false"' : ''}
      ${row.level === 2 ? 'hidden' : ''}
    >
      <th
        role="rowheader"
        scope="row"
        id="cell-${row.key}-region"
        data-part="cell-${row.key}-region"
        style="font-size: 13px; font-weight: 400; color: var(--sp-ink); border-bottom: 1px solid var(--sp-line)"
      >
        <span class="sp-row" style="gap: 6px; padding-left: ${(row.level - 1) * 22}px">${twisty}<span>${row.name}</span></span>
      </th>
      ${cell(row, 'owner', row.owner)}
      ${cell(row, 'spend', row.spend)}
      ${cell(row, 'change', row.change)}
    </tr>`;
};

/**
 * Tree grid specimen: six rows in one grid, three of them top level, where a twisty opens
 * child ROWS rather than a panel. The children carry the same four columns as their parent,
 * so a child's spend sits in the spend column directly under it, which is the claim the term
 * rests on and the line between this and expandable-row.
 *
 * The subject is the grid: the `<table role="treegrid">` inside the frame, with the frame,
 * the toolbar and the caption around it as scenery. The caption sits outside the table on
 * purpose, so the subject is a scope element rather than the whole scene and identify can
 * still point at the grid.
 *
 * Cell navigation is the other half of the term, so the grid carries `tabindex="0"` and reads
 * real arrow keys: a reader's own keyboard drives it exactly as the script does (SPEC §8). The
 * ring is `data-sim-focus` and `aria-activedescendant`, never `.focus()`, because attract must
 * never move real focus (SPEC §7). Right on a collapsed row expands it, which is the APG
 * behaviour and an absolute direction rather than a flip; the twisty toggles its own row,
 * which is the one place a toggle belongs, since opening and closing is the term itself.
 *
 * The region reserves room for every row the grid can show at once (SPEC §5), so expanding
 * moves rows within the table and nothing outside it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 304px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spend by region</span>
          <span class="sp-text" data-part="readout" style="width: 190px; text-align: right; white-space: nowrap; font-size: 12px">Cell: North, Owner</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="collapse" style="flex: 0 0 auto; padding: 3px 9px; font-size: 12px">Collapse all</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="height: ${REGION_H}px; overflow: hidden">
            <table
              class="sp-table"
              role="treegrid"
              data-part="grid"
              data-subject
              data-open="none"
              aria-label="Spend by region"
              tabindex="0"
              style="--sp-cell-pad: 4px 10px"
            >
              <thead class="sp-context">
                <tr role="row">
                  <th style="width: 172px; border-bottom: 1px solid var(--sp-line)">Region</th>
                  <th style="width: 108px; border-bottom: 1px solid var(--sp-line)">Owner</th>
                  <th style="width: 90px; border-bottom: 1px solid var(--sp-line)">Spend</th>
                  <th style="border-bottom: 1px solid var(--sp-line)">Change</th>
                </tr>
              </thead>
              <tbody>
                ${ROWS.map(rowMarkup).join('')}
              </tbody>
            </table>
          </div>

          <span class="sp-label sp-context" style="height: 15px; line-height: 15px; text-align: center; white-space: nowrap; font-size: 11px">
            What opens is more rows in the same columns, not a detail panel.
          </span>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const readout = part(root, 'readout');

  const expanded = new Set<string>();
  let here = { row: 'north', column: 'owner' as Column };

  const visible = () => ROWS.filter((row) => !row.parent || expanded.has(row.parent));

  const say = () => {
    const row = byKey.get(here.row);
    readout.textContent = `Cell: ${row?.name ?? ''}, ${CELL_LABEL[here.column]}`;
  };

  const paint = () => {
    for (const row of ROWS) {
      const tr = part(root, `row-${row.key}`);
      const shown = !row.parent || expanded.has(row.parent);
      tr.toggleAttribute('hidden', !shown);
      if (row.kids) {
        const open = expanded.has(row.key);
        tr.setAttribute('aria-expanded', String(open));
        const twisty = part(root, `twisty-${row.key}`);
        twisty.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} ${row.name}`);
      }
      for (const column of COLUMNS) {
        const target = part(root, `cell-${row.key}-${column}`);
        flag(target, 'data-sim-focus', row.key === here.row && column === here.column);
      }
    }
    grid.dataset.open = expanded.size === 0 ? 'none' : [...expanded].join(' ');
    grid.setAttribute('aria-activedescendant', `cell-${here.row}-${here.column}`);
    say();
  };

  const setExpanded = (key: string, open: boolean) => {
    if (open) expanded.add(key);
    else expanded.delete(key);
    // Collapsing under the ring would strand it on a row nobody can see, so it climbs
    // to the parent row and keeps its column.
    const row = byKey.get(here.row);
    if (row?.parent && !expanded.has(row.parent)) here = { row: row.parent, column: here.column };
    paint();
  };

  for (const row of ROWS) {
    if (row.kids) {
      // Opening and closing is what the term names, so this twisty is allowed to flip (SPEC §8).
      part(root, `twisty-${row.key}`).addEventListener('click', () => setExpanded(row.key, !expanded.has(row.key)));
    }
    for (const column of COLUMNS) {
      part(root, `cell-${row.key}-${column}`).addEventListener('click', () => {
        here = { row: row.key, column };
        paint();
      });
    }
  }

  part(root, 'collapse').addEventListener('click', () => {
    expanded.clear();
    const row = byKey.get(here.row);
    if (row?.parent) here = { row: row.parent, column: here.column };
    paint();
  });

  grid.addEventListener('keydown', (event) => {
    const key = event.key;
    const rows = visible();
    const rowIndex = rows.findIndex((row) => row.key === here.row);
    const columnIndex = COLUMNS.indexOf(here.column);
    const row = rows[rowIndex];
    if (!row) return;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      const next = rows[Math.min(Math.max(rowIndex + (key === 'ArrowDown' ? 1 : -1), 0), rows.length - 1)];
      if (next) here = { row: next.key, column: here.column };
      paint();
      return;
    }

    if (key === 'ArrowRight') {
      event.preventDefault();
      // On the row header of a shut row, Right opens it rather than moving: the APG
      // behaviour, and an absolute direction rather than a toggle.
      if (here.column === 'region' && row.kids && !expanded.has(row.key)) return setExpanded(row.key, true);
      const next = COLUMNS[Math.min(columnIndex + 1, COLUMNS.length - 1)];
      if (next) here = { row: here.row, column: next };
      paint();
      return;
    }

    if (key === 'ArrowLeft') {
      event.preventDefault();
      if (here.column === 'region' && row.kids && expanded.has(row.key)) return setExpanded(row.key, false);
      const next = COLUMNS[Math.max(columnIndex - 1, 0)];
      if (next) here = { row: here.row, column: next };
      paint();
    }
  });

  paint();
}
