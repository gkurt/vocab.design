import { flag, part } from '#src/kit/parts.ts';

interface Shortcut {
  key: string;
  label: string;
  keys: string[];
}

const GROUPS: { key: string; title: string; items: Shortcut[] }[] = [
  {
    key: 'editing',
    title: 'Editing',
    items: [
      { key: 'undo', label: 'Undo', keys: ['Ctrl', 'Z'] },
      { key: 'redo', label: 'Redo', keys: ['Ctrl', 'Shift', 'Z'] },
      { key: 'duplicate', label: 'Duplicate row', keys: ['Ctrl', 'D'] },
      { key: 'find', label: 'Find in ledger', keys: ['Ctrl', 'F'] },
    ],
  },
  {
    key: 'moving',
    title: 'Getting around',
    items: [
      { key: 'palette', label: 'Command palette', keys: ['Ctrl', 'K'] },
      { key: 'next', label: 'Next account', keys: ['Ctrl', ']'] },
      { key: 'goto', label: 'Go to date', keys: ['Ctrl', 'G'] },
      { key: 'help', label: 'This list', keys: ['?'] },
    ],
  },
];

const ROWS = [
  { date: '04 Mar', payee: 'Harbour Supply', amount: '248.00' },
  { date: '05 Mar', payee: 'Tally Coffee', amount: '11.40' },
  { date: '07 Mar', payee: 'Northwind Freight', amount: '96.50' },
  { date: '09 Mar', payee: 'Meridian Print', amount: '412.00' },
];

/**
 * Keyboard shortcuts dialog specimen: a ledger with a quiet hint in its status bar, and
 * the dialog that hint is about, opened by pressing the key it names. The specimen
 * demonstrates its own discovery path, which is the whole argument for the component:
 * the list is one keystroke from wherever the reader was standing.
 *
 * The subject is the dialog, `data-part="dialog"`: the panel with its grouped rows and key
 * chips. The application behind it, the scrim over that application and the status bar hint
 * are scenery, so they sit in the context register. The subject is off stage at mount, so
 * identify summons it by fast-forwarding to the press that opens it (SPEC §6), which is why
 * the press is followed immediately by a visible assert.
 *
 * The key only ever opens and dismissal is explicit, by Escape or by the panel's own close
 * button, so a pass resumed at any point lands in the same place (SPEC §8). Nothing behind
 * the dialog moves when it appears: the scrim and the panel are both out of flow (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const groups = GROUPS.map(
    ({ key, title, items }) => `
      <div class="sp-stack" data-part="group-${key}" style="flex: 1 1 0; min-width: 0; gap: 5px">
        <span class="sp-label" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em">${title}</span>
        ${items
          .map(
            (item) => `
          <div class="sp-row sp-row--between" data-part="row-${item.key}" style="gap: 8px">
            <span style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${item.label}</span>
            <span class="sp-row" style="gap: 3px; flex: 0 0 auto">
              ${item.keys.map((k) => `<span class="sp-kbd">${k}</span>`).join('')}
            </span>
          </div>`,
          )
          .join('')}
      </div>`,
  ).join('');

  const rows = ROWS.map(
    (row) => `
      <tr>
        <td style="font-variant-numeric: tabular-nums">${row.date}</td>
        <td>${row.payee}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${row.amount}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Ledger</span>
          <span class="sp-label" style="font-size: 12px">March</span>
        </div>

        <div class="sp-body sp-context" style="padding: 0">
          <table class="sp-table" style="--sp-cell-pad: 7px 12px">
            <thead>
              <tr><th>Date</th><th>Payee</th><th style="text-align: right">Amount</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        <div
          class="sp-row sp-context"
          data-part="statusbar"
          style="flex: 0 0 auto; gap: 6px; padding: 5px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-label sp-grow" style="font-size: 11px">4 entries</span>
          <span class="sp-row" data-part="hint" style="gap: 5px">
            <span class="sp-label" style="font-size: 11px">Shortcuts</span>
            <span class="sp-kbd">?</span>
          </span>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>

        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          style="width: 408px; padding: 14px 16px"
        >
          <div class="sp-row sp-row--between" style="margin-bottom: 10px">
            <span class="sp-heading" style="font-size: 14px">Keyboard shortcuts</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close">Close</button>
          </div>
          <div class="sp-row" style="align-items: flex-start; gap: 22px">${groups}</div>
        </div>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  root.addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    // The gesture only ever opens; a toggle would let a resumed pass close it (SPEC §8).
    if (key === '?') setOpen(true);
    if (key === 'Escape') setOpen(false);
  });

  part(root, 'close').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('pointerdown', () => setOpen(false));

  setOpen(false);
}
