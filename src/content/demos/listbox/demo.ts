import { part } from '#src/kit/parts.ts';

const FORMATS = [
  { key: 'pdf', label: 'PDF document' },
  { key: 'png', label: 'PNG image' },
  { key: 'svg', label: 'SVG vector' },
  { key: 'csv', label: 'CSV table' },
  { key: 'json', label: 'JSON data' },
];

/**
 * Listbox specimen: the list of options with no popup around it, which is the
 * whole point of the word. The subject is the list element: the rows are its
 * options and the field label above it is scenery.
 *
 * Selection is exclusive and set rather than moved, so a pass that starts
 * anywhere lands on the same option (SPEC §8). Arrow keys, Home and End are wired
 * for a real keyboard and the script drives the pointer instead, since a relative
 * step would demonstrate a different option every time it was resumed. Every
 * option fits the box the list is given, so choosing never scrolls or resizes it.
 */
export function mount(root: HTMLElement): void {
  const options = FORMATS.map(
    ({ key, label }) => `
      <li class="sp-option" role="option" id="fmt-${key}" data-part="opt-${key}" aria-selected="false">${label}</li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export</span></div>
        <div class="sp-body">
          <div class="sp-label sp-context" id="fmt-label" style="margin-bottom: 6px">Format</div>
          <ul
            class="sp-listbox sp-listbox--static"
            data-part="listbox"
            data-subject
            role="listbox"
            tabindex="0"
            aria-labelledby="fmt-label"
            style="height: 172px; max-height: none; overflow: hidden"
          >${options}</ul>
        </div>
      </div>
    </div>
  `;

  const listbox = part(root, 'listbox');
  const rows = FORMATS.map(({ key }) => part(root, `opt-${key}`));

  const select = (row: HTMLElement) => {
    for (const other of rows) other.setAttribute('aria-selected', String(other === row));
    listbox.setAttribute('aria-activedescendant', row.id);
  };

  for (const row of rows) row.addEventListener('click', () => select(row));

  listbox.addEventListener('keydown', (event) => {
    const at = rows.findIndex((row) => row.getAttribute('aria-selected') === 'true');
    const last = rows.length - 1;
    let next = at;
    if (event.key === 'ArrowDown') next = Math.min(last, at + 1);
    else if (event.key === 'ArrowUp') next = Math.max(0, at - 1);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    const row = rows[next];
    if (row) select(row);
  });

  const first = rows[0];
  if (first) select(first);
}
