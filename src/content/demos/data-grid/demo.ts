import { flag, part } from '#src/kit/parts.ts';

const COLUMNS = ['a', 'b', 'c'] as const;
const HEADERS = ['Q1', 'Q2', 'Q3'];
const ROWS = [
  { key: '1', region: 'North', values: ['4120', '4380', '4510'] },
  { key: '2', region: 'South', values: ['2870', '2940', '3105'] },
  { key: '3', region: 'East', values: ['1960', '2080', '1240'] },
  { key: '4', region: 'West', values: ['3340', '3290', '3475'] },
];

type Column = (typeof COLUMNS)[number];

const ref = (column: Column, row: number) => `${column.toUpperCase()}${row + 1}`;

/**
 * Data grid specimen: a small forecast sheet worked cell by cell. The subject is the
 * grid itself, the narrowest element the term names: not the window it sits in, and
 * not any one cell, since a cell on its own is just a cell.
 *
 * The keyboard contract is the content, and the choreography asserts it (SPEC §8):
 * the whole widget is one tab stop, the arrow keys walk the focused cell, and Enter
 * opens that cell for editing. Focus is drawn with `data-sim-focus` because attract
 * never moves real focus (SPEC §7), and the roving `tabindex` beside it is what a
 * reader who takes the specimen over actually meets.
 *
 * Nothing moves while it works (SPEC §5): every column has a fixed width, the editor
 * is laid absolutely over the cell it edits rather than swapped for its text, and the
 * cell reference and mode readouts have reserved widths, so the strip they sit in
 * holds still as they change.
 *
 * A line under the table used to tell the reader "Arrow keys move the cell. Enter opens it,
 * Enter again commits." No spreadsheet prints its own key bindings under the grid, and the
 * article walks the same keyboard model, so it is gone. The Ready/Editing readout in the
 * title bar is the one thing left that reports the mode, which is what a grid really shows.
 */
export function mount(root: HTMLElement): void {
  const body = ROWS.map(
    (row, r) => `
      <tr role="row" data-part="row-${row.key}">
        <td role="rowheader" style="width: 118px; color: var(--sp-ink)">${row.region}</td>
        ${COLUMNS.map(
          (column, c) => `
          <td
            role="gridcell"
            tabindex="-1"
            data-part="cell-${column}${r + 1}"
            data-value="${row.values[c]}"
            style="position: relative; width: 102px; text-align: right; font-variant-numeric: tabular-nums"
          ><span data-part="text-${column}${r + 1}">${row.values[c]}</span></td>`,
        ).join('')}
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Forecast</span>
          <span class="sp-label" data-part="ref" data-cell="A1" style="width: 24px; text-align: right">A1</span>
          <span class="sp-label" data-part="mode" data-value="ready" style="width: 50px; text-align: right">Ready</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 3px">
            <table class="sp-table" data-part="grid" data-subject role="grid" aria-label="Regional forecast" style="--sp-cell-pad: 6px 9px">
              <thead>
                <tr role="row">
                  <td style="width: 118px"></td>
                  ${HEADERS.map((label) => `<th role="columnheader" style="width: 102px; text-align: right">${label}</th>`).join('')}
                </tr>
              </thead>
              <tbody>${body}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const refOut = part(root, 'ref');
  const mode = part(root, 'mode');

  const cellAt = (c: Column, r: number) => part(root, `cell-${c}${r + 1}`);

  const editor = root.ownerDocument.createElement('input');
  editor.className = 'sp-input';
  editor.dataset.part = 'editor';
  editor.setAttribute('aria-label', 'Cell value');
  editor.hidden = true;
  editor.style.cssText =
    'position: absolute; inset: 0; width: auto; padding: 0 8px; border-radius: 3px; border-color: var(--sp-accent); text-align: right; font-variant-numeric: tabular-nums';
  cellAt('a', 0).append(editor);

  let column: Column = 'a';
  let row = 0;
  let editing = false;

  const paint = () => {
    for (const [r] of ROWS.entries()) {
      for (const c of COLUMNS) {
        const cell = cellAt(c, r);
        const active = c === column && r === row;
        cell.tabIndex = active ? 0 : -1;
        flag(cell, 'data-active', active);
        flag(cell, 'data-sim-focus', active);
      }
    }
    refOut.dataset.cell = ref(column, row);
    refOut.textContent = ref(column, row);
    mode.dataset.value = editing ? 'editing' : 'ready';
    mode.textContent = editing ? 'Editing' : 'Ready';
  };

  const close = () => {
    editing = false;
    editor.hidden = true;
    editor.value = '';
  };

  /**
   * Editing opens empty, the way typing over a selected cell replaces it. The input
   * is laid over the cell rather than swapped for its text, so the row keeps its
   * height and the columns either side keep their width (SPEC §5).
   */
  const openEditor = () => {
    cellAt(column, row).append(editor);
    editor.value = '';
    editor.hidden = false;
    editing = true;
    paint();
  };

  const commit = () => {
    if (!editing) return;
    const next = editor.value.trim();
    if (next !== '') {
      cellAt(column, row).dataset.value = next;
      part(root, `text-${column}${row + 1}`).textContent = next;
    }
    close();
    paint();
  };

  /** Land on a cell outright, so a click and an arrow key both reach a state (SPEC §8). */
  const goTo = (c: Column, r: number) => {
    commit();
    column = c;
    row = Math.min(Math.max(r, 0), ROWS.length - 1);
    paint();
  };

  const move = (dx: number, dy: number) => {
    const index = Math.min(Math.max(COLUMNS.indexOf(column) + dx, 0), COLUMNS.length - 1);
    goTo(COLUMNS[index] as Column, row + dy);
  };

  for (const [r] of ROWS.entries()) {
    for (const c of COLUMNS) {
      cellAt(c, r).addEventListener('click', () => {
        if (editing && c === column && r === row) return;
        goTo(c, r);
      });
    }
  }

  // One handler for the whole widget: a grid is one tab stop, and the keys belong to
  // the grid rather than to whichever cell happens to hold focus.
  root.addEventListener('keydown', (event) => {
    if (editing) {
      if (event.key === 'Enter') commit();
      else if (event.key === 'Escape') {
        close();
        paint();
      } else return;
      event.preventDefault();
      return;
    }
    if (event.key === 'ArrowRight') move(1, 0);
    else if (event.key === 'ArrowLeft') move(-1, 0);
    else if (event.key === 'ArrowDown') move(0, 1);
    else if (event.key === 'ArrowUp') move(0, -1);
    else if (event.key === 'Home') goTo('a', row);
    else if (event.key === 'End') goTo('c', row);
    else if (event.key === 'Enter' || event.key === 'F2') openEditor();
    else return;
    event.preventDefault();
  });

  paint();
}
