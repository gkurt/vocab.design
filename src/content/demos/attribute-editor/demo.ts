import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const MAX_ROWS = 4;
const ROW_H = 28;
const ROW_GAP = 6;
/** Room for every row the editor can hold, taken from mount, so adding one moves nothing (SPEC §5). */
const ROWS_H = MAX_ROWS * ROW_H + (MAX_ROWS - 1) * ROW_GAP;

interface Pair {
  id: string;
  key: string;
  value: string;
}

const SEED: Pair[] = [
  { id: 'accept', key: 'Accept', value: 'application/json' },
  { id: 'trace', key: 'X-Trace-Id', value: '8f2c41' },
  { id: 'cache', key: 'Cache-Control', value: 'no-store' },
];

/**
 * Attribute editor specimen: a request-header section whose row count is data. Three pairs at
 * mount, a fourth added and filled in, then a middle row removed, which is where the component
 * earns its name: the row that was deleted had the focus, and the editor hands that focus to the
 * row which took its place rather than letting it fall to the document.
 *
 * The subject is the editor itself, the rows plus the add control, which is the narrowest element
 * the term names: one row is a row, and the card, the column headings, the page chrome and the
 * focus readout are scenery. It is honestly an attribute editor at every row count the script
 * visits, so no `data-pose` condition is needed.
 *
 * Attract never moves real focus (SPEC §7), so the ring is painted with `data-sim-focus` and named
 * in the readout; a real reader gets real focus, because the same handler calls `focus()` when the
 * event that asked for it was trusted. The fields and both controls are native focusables, so a
 * reader's own keyboard reaches every part of this. The rows container keeps its full height at
 * every count, so the add control never moves.
 */
export function mount(root: HTMLElement): void {
  const rowMarkup = (pair: Pair) => `
    <div
      data-part="row-${pair.id}"
      style="display: grid; grid-template-columns: 148px 1fr 24px; align-items: center; gap: 8px; height: ${ROW_H}px"
    >
      <input
        class="sp-input"
        data-part="key-${pair.id}"
        data-field="name"
        aria-label="Header name"
        value="${pair.key}"
        style="padding: 4px 8px; height: ${ROW_H}px"
      />
      <input
        class="sp-input"
        data-part="value-${pair.id}"
        data-field="value"
        aria-label="Header value"
        value="${pair.value}"
        style="padding: 4px 8px; height: ${ROW_H}px"
      />
      <button
        class="sp-icon-button"
        type="button"
        data-part="remove-${pair.id}"
        aria-label="Remove ${pair.key || 'row'}"
        style="width: 24px; height: 24px"
      >${icon('trash')}</button>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Request headers</span>
          <span
            class="sp-label"
            data-part="readout"
            data-focus="none"
            style="flex: 0 0 168px; font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >Focus: nothing yet</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 424px; padding: 14px">
            <div data-part="editor" data-subject>
              <div style="display: grid; grid-template-columns: 148px 1fr 24px; gap: 8px; margin-bottom: 7px">
                <span class="sp-label" style="font-size: 11px">Name</span>
                <span class="sp-label" style="font-size: 11px">Value</span>
                <span></span>
              </div>

              <div data-part="rows" style="display: flex; flex-direction: column; gap: ${ROW_GAP}px; height: ${ROWS_H}px; align-content: flex-start">
                ${SEED.map(rowMarkup).join('')}
              </div>

              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="add"
                style="display: inline-flex; align-items: center; gap: 6px; margin-top: 10px"
              >${icon('plus')} Add header</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const rows = part(root, 'rows');
  const readout = part(root, 'readout');
  const add = part(root, 'add');
  let added = 0;

  /** A field is named by the row it sits in, which is what makes the handover legible. */
  const describe = (el: HTMLElement): string => {
    const row = el.closest<HTMLElement>('[data-part^="row-"]');
    if (!row) return 'the add control';
    const name = row.querySelector<HTMLInputElement>('[data-part^="key-"]')?.value.trim();
    return `${name || 'new row'} ${el.dataset.field ?? ''}`.trim();
  };

  /** One ring, one readout: the editor says where focus is, since attract cannot move it. */
  const setFocus = (el: HTMLElement | undefined, real: boolean) => {
    for (const marked of root.querySelectorAll('[data-sim-focus]')) marked.removeAttribute('data-sim-focus');
    if (!el) {
      readout.dataset.focus = 'none';
      readout.textContent = 'Focus: nothing yet';
      return;
    }
    el.setAttribute('data-sim-focus', '');
    readout.dataset.focus = el.dataset.part ?? 'none';
    readout.textContent = `Focus: ${describe(el)}`;
    if (real) el.focus();
  };

  const wire = (row: HTMLElement) => {
    const fields = [...row.querySelectorAll<HTMLInputElement>('.sp-input')];
    const mark = () => {
      row.dataset.filled = String(fields.every((f) => f.value.trim() !== ''));
    };
    mark();
    for (const field of fields) {
      field.addEventListener('click', (event) => setFocus(field, event.isTrusted));
      field.addEventListener('input', mark);
    }
    const remove = row.querySelector<HTMLElement>('[data-part^="remove-"]');
    remove?.addEventListener('click', (event) => {
      const siblings = [...rows.children] as HTMLElement[];
      const index = siblings.indexOf(row);
      // Where focus goes is decided before the row leaves: the row that takes its place,
      // the one above it if this was the last, or the add control if nothing is left.
      const heir = siblings[index + 1] ?? siblings[index - 1];
      row.remove();
      const target = heir?.querySelector<HTMLElement>('.sp-input') ?? add;
      setFocus(target, event.isTrusted);
      add.removeAttribute('aria-disabled');
    });
  };

  for (const row of [...rows.children] as HTMLElement[]) wire(row);

  add.addEventListener('click', (event) => {
    if (rows.children.length >= MAX_ROWS) return;
    added += 1;
    const pair: Pair = { id: `new${added}`, key: '', value: '' };
    rows.insertAdjacentHTML('beforeend', rowMarkup(pair));
    const row = rows.lastElementChild as HTMLElement;
    wire(row);
    // Adding a row puts focus in it, so the next thing typed lands where it should.
    setFocus(row.querySelector<HTMLElement>('.sp-input') ?? undefined, event.isTrusted);
    if (rows.children.length >= MAX_ROWS) add.setAttribute('aria-disabled', 'true');
  });

  // A reader tabbing through the editor gets the same ring and the same readout.
  part(root, 'editor').addEventListener('focusin', (event) => {
    const el = event.target;
    if (el instanceof HTMLElement && (el.dataset.field || el === add)) setFocus(el, false);
  });
}
