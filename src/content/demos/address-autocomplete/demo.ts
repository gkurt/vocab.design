import '#src/kit/combobox.ts';
import { part } from '#src/kit/parts.ts';

const SUGGESTIONS = [
  { key: 'mill-12', text: '12 Mill Lane, Whitby, YO21 3PU' },
  { key: 'church', text: '5 Church Street, Whitby, YO22 4DE' },
  { key: 'mill-14', text: '14 Mill Lane, Whitby, YO21 3PU' },
  { key: 'millgate', text: '3 Millgate, Whitby, YO22 4AB' },
  { key: 'harbour', text: '27 Harbour Road, Whitby, YO21 1PR' },
] as const;

const FIELDS = [
  { key: 'street', label: 'Street' },
  { key: 'town', label: 'Town' },
  { key: 'postcode', label: 'Postcode' },
] as const;

const NOTE = {
  idle: 'One line to type into. The parts below stay empty until an address is chosen.',
  filled: 'One choice wrote three fields, and every part is still on screen to be corrected.',
} as const;

const VALUE = [
  'display: flex',
  'align-items: center',
  'flex: 1 1 0',
  'min-width: 0',
  'height: 24px',
  'padding: 0 8px',
  'border: 1px dashed var(--sp-line)',
  'border-radius: 5px',
  'font-size: 12px',
].join('; ');

/**
 * Address autocomplete specimen: one lookup line over a small address list, with the
 * structured fields it writes sitting underneath. Clicking the line opens the suggestions,
 * each typed character narrows them, and choosing one closes the list and fans the parts
 * out into the three fields that were empty a moment before. The list is opened by the
 * trigger and left by a choice, never by a toggle (SPEC §8), and the Start again control
 * under the frame is instrumentation rather than part of the pattern.
 *
 * The subject is the lookup combobox, not the form: the term names the completion
 * behaviour, and the fields it fills are ordinary fields that any manual address form also
 * has (SPEC §5). The shop chrome, the field rows, the status line and the note row are
 * scenery.
 *
 * The suggestion list is absolutely positioned over the fields rather than inserted above
 * them, and every field row holds its height whether it carries a value or not, so opening
 * the list and filling the form move nothing (SPEC §5). Behaviour comes from the kit's
 * `<sp-combobox>`, which is written once against the ARIA pattern and reused.
 */
export function mount(root: HTMLElement): void {
  const options = SUGGESTIONS.map(
    ({ key, text }) => `<li class="sp-option" data-part="opt-${key}" style="padding: 4px 8px; font-size: 12px">${text}</li>`,
  ).join('');

  const rows = FIELDS.map(
    ({ key, label }) => `
      <div class="sp-row" style="height: 24px; gap: 8px">
        <span class="sp-label" style="width: 62px; font-size: 11px">${label}</span>
        <span class="sp-text sp-text--ink" data-part="val-${key}" data-state="empty" style="${VALUE}"></span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Halliday</span>
          <span class="sp-label" style="font-size: 11px">Delivery address</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-field" style="flex: 0 0 auto">
            <span class="sp-label sp-context" style="font-size: 11px">Find your address</span>
            <sp-combobox data-part="lookup" data-subject>
              <input
                class="sp-input"
                data-part="lookup-input"
                type="text"
                aria-label="Find your address by street or postcode"
                placeholder="Start typing a street or postcode"
              />
              <ul class="sp-listbox" data-part="list" aria-label="Matching addresses" style="max-height: 138px">${options}</ul>
            </sp-combobox>
          </div>

          <div class="sp-stack sp-context" data-part="fields" data-filled="0" style="flex: 0 0 auto; gap: 6px">${rows}</div>

          <span class="sp-label sp-context" data-part="status" role="status" style="flex: 0 0 auto; height: 16px; font-size: 11px">
            Nothing filled in yet
          </span>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 288px; height: 34px; font-size: 11px">${NOTE.idle}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reset" type="button">Start again</button>
      </div>
    </div>
  `;

  const lookup = part(root, 'lookup');
  const input = part(root, 'lookup-input') as HTMLInputElement;
  const fields = part(root, 'fields');
  const status = part(root, 'status');
  const note = part(root, 'note');
  const values = FIELDS.map(({ key }) => part(root, `val-${key}`));

  const write = (parts: string[]) => {
    values.forEach((value, index) => {
      const text = parts[index] ?? '';
      value.textContent = text;
      value.dataset.state = text ? 'filled' : 'empty';
      value.style.borderStyle = text ? 'solid' : 'dashed';
    });
    const filled = parts.filter(Boolean).length;
    fields.dataset.filled = String(filled);
    status.textContent = filled === 0 ? 'Nothing filled in yet' : `${filled} fields written from one choice`;
    note.textContent = filled === 0 ? NOTE.idle : NOTE.filled;
  };

  // Choosing a suggestion is the only thing that fills the form, so a resumed pass can
  // never find the fields written by a step it did not run (SPEC §8).
  lookup.addEventListener('select', (event) => {
    write((event as CustomEvent<string>).detail.split(', '));
  });

  part(root, 'reset').addEventListener('click', () => {
    input.value = '';
    // The empty query unhides every option (and reopens the list); the Escape that follows
    // is how the kit's combobox is asked to close, so the specimen returns to its mount
    // state without reaching into the element's own state.
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    write([]);
  });

  write([]);
}
