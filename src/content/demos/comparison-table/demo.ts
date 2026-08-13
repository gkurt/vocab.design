import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Cell = boolean | string;
type Row = { key: string; feature: string; cells: [Cell, Cell, Cell] };

const PLANS = ['Starter', 'Team', 'Scale'] as const;
/** The column the seller is pushing, marked once and highlighted down its length. */
const PICKED = 1;

const ROWS: Row[] = [
  { key: 'projects', feature: 'Projects', cells: ['3', '25', 'Unlimited'] },
  { key: 'seats', feature: 'Team seats', cells: ['1', '10', '50'] },
  { key: 'history', feature: 'Version history', cells: [false, true, true] },
  { key: 'sso', feature: 'Single sign-on', cells: [false, false, true] },
  { key: 'sla', feature: 'Uptime SLA', cells: [false, false, '99.9%'] },
  { key: 'forum', feature: 'Community forum', cells: [true, true, true] },
  { key: 'ssl', feature: 'SSL included', cells: [true, true, true] },
  { key: 'backups', feature: 'Daily backups', cells: [true, true, true] },
  { key: 'email', feature: 'Email support', cells: [true, true, true] },
];

const same = (row: Row): boolean => row.cells.every((c) => c === row.cells[0]);

/** A tick and a dash mean nothing on their own, so each cell says its state in words too. */
function cell(value: Cell, picked: boolean): string {
  const tint = picked ? 'background: var(--sp-accent-soft); ' : '';
  const style = `${tint}width: 92px; text-align: center`;
  if (value === true) return `<td style="${style}">${icon('check')}<span class="sp-visually-hidden">Included</span></td>`;
  if (value === false)
    return `<td style="${style}; color: var(--sp-muted)">${icon('minus')}<span class="sp-visually-hidden">Not included</span></td>`;
  return `<td style="${style}">${value}</td>`;
}

/**
 * Comparison table specimen: three plans as columns, nine features as rows, and the
 * state that drops every row the plans agree on. The subject is the table itself; the
 * window and the view switcher around it are instrumentation, so they sit in the
 * scenery register (SPEC §5).
 *
 * The table lives in a box of fixed height that scrolls, so hiding four rows buys the
 * reader the whole comparison in one view without the frame changing size. The check
 * and dash glyphs each carry hidden text, since a decorative icon announces nothing.
 */
export function mount(root: HTMLElement): void {
  const head = PLANS.map((name, i) => {
    const picked = i === PICKED;
    // A sticky header needs a fill of its own, or the rows scroll through it.
    const tint = `background: var(--sp-${picked ? 'accent-soft' : 'surface'}); `;
    const flagRow = picked
      ? '<span style="display: block; color: var(--sp-accent); font-size: 10px; letter-spacing: 0.05em">RECOMMENDED</span>'
      : '';
    return `
      <th
        scope="col"
        data-part="col-${name.toLowerCase()}"
        ${picked ? 'data-recommended' : ''}
        style="${tint}width: 92px; text-align: center; white-space: normal; position: sticky; top: 0"
      ><span style="display: block; color: var(--sp-ink)">${name}</span>${flagRow}</th>`;
  }).join('');

  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.key}"${same(row) ? ' data-same' : ''}>
        <th scope="row" style="width: 132px; font-weight: 400; color: var(--sp-ink)">${row.feature}</th>
        ${row.cells.map((value, i) => cell(value, i === PICKED)).join('')}
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Plans</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="all">
            <button class="sp-segment" type="button" data-part="seg-all" value="all">All features</button>
            <button class="sp-segment" type="button" data-part="seg-diff" value="diff">Differences only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 10px">
          <div class="sp-surface sp-scroll" style="height: 200px">
            <table class="sp-table" data-part="table" data-subject data-mode="all" aria-label="Plan comparison">
              <thead>
                <tr>
                  <th scope="col" style="width: 132px; position: sticky; top: 0; background: var(--sp-surface)">Feature</th>
                  ${head}
                </tr>
              </thead>
              <tbody>${body}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const table = part(root, 'table');
  const rows = ROWS.map((row) => ({ row, el: part(root, `row-${row.key}`) }));

  // Each segment names a view, so the switch lands on that view rather than flipping
  // whatever it found (SPEC §8).
  part(root, 'mode').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    table.dataset.mode = value;
    for (const { row, el } of rows) flag(el, 'hidden', value === 'diff' && same(row));
  });
}
