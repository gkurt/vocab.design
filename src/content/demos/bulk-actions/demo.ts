import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const ROWS = [
  { id: 1, name: 'Ferry hire, March', amount: '£240.00' },
  { id: 2, name: 'Quay resurfacing', amount: '£1,180.00' },
  { id: 3, name: 'Mooring renewal', amount: '£96.00' },
  { id: 4, name: 'Chandlery order', amount: '£312.50' },
] as const;

const BAR_FADE = 'opacity 0.16s, visibility 0.16s';

/**
 * Bulk actions specimen: rows are chosen, and the bar that only exists while a
 * selection does carries the command that reaches all of them. The subject is that bar.
 * The table is where the selecting happens and has its own word; what this term names
 * is the toolbar that appears in front of it counting what is selected.
 *
 * The bar is drawn over the table's own toolbar rather than beside it, so starting a
 * selection never moves the rows the reader is choosing from, and the mark an action
 * leaves sits in a column reserved from mount (SPEC §5). The header checkbox carries
 * the mixed state, which is the state a two-state box cannot say. Selecting is not a
 * toggle the script flips: each row is checked once, and the selection is spent or
 * cleared explicitly (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ({ id, name, amount }) => `
      <tr data-part="row-${id}">
        <td><button class="sp-checkbox" data-part="cb-${id}" data-row="${id}" type="button" role="checkbox" aria-checked="false" aria-label="Select ${name}"></button></td>
        <td class="sp-text--ink">${name}</td>
        <td class="sp-text--ink">${amount}</td>
        <td style="text-align: right"><span class="sp-chip" data-part="tag-${id}" hidden>Archived</span></td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Invoices</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 0; padding: 0">
          <div style="position: relative; flex: 0 0 auto; height: 44px">
            <div class="sp-row sp-row--between sp-context" style="position: absolute; inset: 0; padding: 0 12px">
              <span class="sp-label">4 invoices</span>
              <span class="sp-row sp-label" style="gap: 6px">${icon('filter')}March</span>
            </div>
            <div
              class="sp-row"
              data-part="bar"
              data-subject
              data-count="0"
              role="status"
              style="position: absolute; inset: 0; gap: 8px; padding: 0 10px; background: var(--sp-accent-soft); visibility: hidden; opacity: 0; transition: ${BAR_FADE}"
            >
              <span class="sp-text sp-text--ink sp-grow" data-part="bar-count">0 selected</span>
              <button class="sp-button sp-button--sm" data-part="archive" type="button">Archive</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
            </div>
          </div>
          <div class="sp-scroll sp-context" style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface)">
            <table class="sp-table">
              <thead>
                <tr>
                  <th style="width: 38px"><button class="sp-checkbox" data-part="cb-all" type="button" role="checkbox" aria-checked="false" aria-label="Select all"></button></th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th style="width: 92px"></th>
                </tr>
              </thead>
              <tbody data-part="rows">${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const barCount = part(root, 'bar-count');
  const all = part(root, 'cb-all');
  const selected = new Set<number>();

  const paint = () => {
    for (const { id } of ROWS) {
      const on = selected.has(id);
      part(root, `cb-${id}`).setAttribute('aria-checked', String(on));
      flag(part(root, `row-${id}`), 'data-selected', on);
    }
    // Some but not all is a state of its own, and the box has a spelling for it.
    all.setAttribute('aria-checked', selected.size === 0 ? 'false' : selected.size === ROWS.length ? 'true' : 'mixed');
    bar.dataset.count = String(selected.size);
    barCount.textContent = `${selected.size} selected`;
    const open = selected.size > 0;
    bar.style.visibility = open ? 'visible' : 'hidden';
    bar.style.opacity = open ? '1' : '0';
  };

  part(root, 'rows').addEventListener('click', (event) => {
    const id = Number((event.target as HTMLElement).closest<HTMLElement>('[data-row]')?.dataset.row);
    if (!id) return;
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    paint();
  });

  all.addEventListener('click', () => {
    if (selected.size === ROWS.length) selected.clear();
    else for (const { id } of ROWS) selected.add(id);
    paint();
  });

  part(root, 'archive').addEventListener('click', () => {
    // The command reaches every selected row at once, and spends the selection with it.
    for (const id of selected) part(root, `tag-${id}`).hidden = false;
    selected.clear();
    paint();
  });

  part(root, 'cancel').addEventListener('click', () => {
    selected.clear();
    paint();
  });
}
