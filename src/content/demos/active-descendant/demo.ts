import '#src/kit/combobox.ts';
import { part } from '#src/kit/parts.ts';

type Option = { key: string; label: string };

const OPTIONS: Option[] = [
  { key: 'bath', label: 'Bath Spa' },
  { key: 'bristol', label: 'Bristol Temple Meads' },
  { key: 'birmingham', label: 'Birmingham New Street' },
  { key: 'manchester', label: 'Manchester Piccadilly' },
];

/**
 * Active descendant specimen: a combobox where the arrow keys move which option is active
 * without moving focus off the field, and a readout that keeps the two apart: where focus
 * is, and which child the field is currently pointing at.
 *
 * The widget underneath is the kit's `<sp-combobox>`, written once against the ARIA
 * authoring practices and reused (SPEC §5). This demo adds only the readout and the resting
 * state, because the pattern itself is exactly what the kit element already implements.
 *
 * The subject is the option that is active, which is what the words "active descendant"
 * name. It is the first option, and the honest condition is declared in `data-pose`: a
 * state where that option is not the active one is a state where it is not the term, so
 * identify plays on or resets to the mount state, which satisfies it (SPEC §6). The field,
 * the readout and the result row are scenery.
 *
 * The list is opened at mount by the same Down arrow a keyboard reader would press, so the
 * specimen rests on the pattern in effect rather than on a closed field. The list is drawn
 * over room reserved for it, so opening and filtering move nothing (SPEC §5). The readout
 * is written from the attribute the field actually carries, watched rather than guessed, so
 * it cannot claim a reference the markup does not hold. The focus row reports the element and
 * nothing else: it used to read "the text field, throughout", and "throughout" was the author
 * making the point across time rather than the readout reporting the moment.
 */
export function mount(root: HTMLElement): void {
  const option = (o: Option, index: number) => `
    <li class="sp-option" data-part="option-${index}" data-key="${o.key}"
        ${index === 0 ? 'data-subject data-pose="[data-active]"' : ''}>${o.label}</li>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 428px; padding: 12px 16px">
        <sp-combobox data-part="field">
          <input class="sp-input" type="text" data-part="input" spellcheck="false" aria-label="Station"
                 placeholder="Search stations" data-sim-focus />
          <ul class="sp-listbox" data-part="listbox" style="max-height: 136px">
            ${OPTIONS.map(option).join('')}
          </ul>
        </sp-combobox>

        <!-- The room the list takes, reserved from mount so opening it moves nothing. -->
        <div style="height: 138px"></div>

        <div class="sp-surface sp-context" style="padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">DOM focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" data-on="input"
                  style="font-size: 12px; white-space: nowrap">the text field</span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 4px; height: 18px">
            <span class="sp-label">aria-activedescendant</span>
            <span class="sp-text sp-text--ink" data-part="readout" data-active="bath"
                  style="font-size: 12px; white-space: nowrap">Bath Spa</span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 4px; height: 18px">
            <span class="sp-label">Chosen</span>
            <span class="sp-text" data-part="result" data-chosen="none"
                  style="font-size: 12px; white-space: nowrap">nothing yet</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const input = part(root, 'input') as HTMLInputElement;
  const readout = part(root, 'readout');
  const result = part(root, 'result');

  const options = OPTIONS.map((_, index) => part(root, `option-${index}`));

  const render = () => {
    const id = input.getAttribute('aria-activedescendant');
    const active = id ? options.find((el) => el.id === id) : undefined;
    readout.dataset.active = active?.dataset.key ?? 'none';
    readout.textContent = active?.textContent?.trim() ?? 'no child referenced';
  };

  // Watched rather than inferred: whatever moves the reference, the readout reports it.
  new MutationObserver(render).observe(input, { attributes: true, attributeFilter: ['aria-activedescendant'] });

  field.addEventListener('select', (event) => {
    const chosen = (event as CustomEvent<string>).detail;
    result.dataset.chosen = OPTIONS.find((o) => o.label === chosen)?.key ?? 'none';
    result.className = 'sp-text sp-text--ink';
    result.textContent = chosen;
  });

  // The resting state is the one a Down arrow leaves: list open, first option active, the
  // field still holding focus. Sent as the key itself so the kit element does the work.
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
  render();
}
