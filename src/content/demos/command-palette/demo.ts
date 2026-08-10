import { flag, part } from '#src/kit/parts.ts';

const COMMANDS = [
  { key: 'new', label: 'New document' },
  { key: 'invite', label: 'Invite teammate' },
  { key: 'export', label: 'Export as PDF' },
  { key: 'theme', label: 'Switch to dark theme' },
  { key: 'rename', label: 'Rename project' },
  { key: 'settings', label: 'Open settings' },
];

/**
 * Command palette specimen: one overlay, one field, and every command in the
 * application reachable by name. Choosing a row dismisses the palette and leaves
 * the change behind it, which is the whole distinction from a combobox: the
 * result is an action taken elsewhere, not a value left in a field.
 *
 * The results area keeps its height while the list narrows (SPEC §5): filtering
 * must not walk the field the reader is typing into up the frame.
 */
export function mount(root: HTMLElement): void {
  const options = COMMANDS.map(
    ({ key, label }) =>
      `<li class="sp-option" role="option" aria-selected="false" id="cmd-${key}" data-part="cmd-${key}" data-key="${key}">${label}</li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Atlas</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="open-palette">Commands</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Theme</span>
              <span class="sp-chip" data-part="theme" data-value="light" style="min-width: 78px; justify-content: center">Light</span>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Last command</span>
              <span class="sp-text" data-part="ran">None yet</span>
            </div>
          </div>
          <div class="sp-stack" style="margin-top: 14px">
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 66%"></div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="palette"
          data-subject
          role="dialog"
          aria-modal="true"
          aria-label="Commands"
          style="width: 320px; padding: 10px"
        >
          <input
            class="sp-input"
            data-part="palette-input"
            role="combobox"
            aria-controls="cmd-list"
            aria-expanded="false"
            autocomplete="off"
            placeholder="Search commands"
          />
          <div class="sp-divider" style="margin: 10px -10px 0"></div>
          <ul
            class="sp-listbox"
            id="cmd-list"
            role="listbox"
            aria-label="Commands"
            data-part="palette-list"
            style="position: static; height: 180px; max-height: none; padding: 6px 0 0; border: 0; background: transparent; box-shadow: none"
          >${options}</ul>
        </div>
      </div>
    </div>
  `;

  const palette = part(root, 'palette');
  const scrim = part(root, 'scrim');
  const list = part(root, 'palette-list');
  const input = part(root, 'palette-input') as HTMLInputElement;
  const theme = part(root, 'theme');
  const ran = part(root, 'ran');
  const rows = [...list.children] as HTMLElement[];
  const matches = () => rows.filter((row) => !row.hidden);

  const setActive = (row: HTMLElement | undefined) => {
    for (const other of rows) other.setAttribute('aria-selected', String(other === row));
    if (row) input.setAttribute('aria-activedescendant', row.id);
    else input.removeAttribute('aria-activedescendant');
  };

  const filter = () => {
    const query = input.value.trim().toLowerCase();
    for (const row of rows) row.hidden = query.length > 0 && !(row.textContent ?? '').toLowerCase().includes(query);
    setActive(matches()[0]);
  };

  const setOpen = (open: boolean) => {
    flag(palette, 'data-open', open);
    flag(scrim, 'data-open', open);
    flag(list, 'data-open', open);
    input.setAttribute('aria-expanded', String(open));
  };

  /** Opens, never toggles, and always to the same state: an empty query (SPEC §8). */
  const open = () => {
    input.value = '';
    filter();
    setOpen(true);
  };

  const run = (row: HTMLElement) => {
    ran.textContent = (row.textContent ?? '').trim();
    if (row.dataset.key === 'theme') {
      theme.dataset.value = 'dark';
      theme.textContent = 'Dark';
      flag(theme, 'data-selected', true);
    }
    setOpen(false);
  };

  part(root, 'open-palette').addEventListener('click', open);
  input.addEventListener('input', filter);
  for (const row of rows) row.addEventListener('click', () => run(row));

  // Dismissal is explicit: choose a command, press Escape, or click outside.
  root.addEventListener('pointerdown', (event) => {
    if (!palette.contains(event.target as Node)) setOpen(false);
  });

  root.addEventListener('keydown', (event) => {
    // The real gesture, for a real keyboard. Attract never sends a modifier, so the
    // scripted pass goes through the button the application shows for the same thing.
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
      input.focus();
      return;
    }
    if (!palette.hasAttribute('data-open')) return;
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    const found = matches();
    if (found.length === 0) return;
    const current = found.findIndex((row) => row.getAttribute('aria-selected') === 'true');
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive(found[(current + step + found.length) % found.length]);
      return;
    }
    const active = found[current];
    if (event.key === 'Enter' && active) run(active);
  });
}
