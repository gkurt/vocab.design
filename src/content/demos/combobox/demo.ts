import '#src/kit/combobox.ts';
import { part } from '#src/kit/parts.ts';

const COUNTRIES = ['Belgium', 'Denmark', 'Estonia', 'Namibia', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Portugal', 'Senegal'];

/**
 * Combobox specimen: a text field that accepts typing and a listbox that
 * narrows with it, navigable by keyboard. Behaviour comes from the kit's
 * `<sp-combobox>`, built once against the ARIA Authoring Practices pattern.
 */
export function mount(root: HTMLElement): void {
  const options = COUNTRIES.map((name) => `<li class="sp-option">${name}</li>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 280px">
        <div class="sp-field">
          <label class="sp-label sp-context" for="country">Ship to</label>
          <sp-combobox data-part="combobox" data-subject>
            <input class="sp-input" id="country" data-part="input" placeholder="Start typing a country" />
            <ul class="sp-listbox" data-part="listbox">${options}</ul>
          </sp-combobox>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="hint" style="margin-top: 10px">Free text in, one value out.</p>
      </div>
    </div>
  `;

  const hint = part(root, 'hint');
  part(root, 'combobox').addEventListener('select', (event) => {
    hint.textContent = `Shipping to ${(event as CustomEvent<string>).detail}.`;
  });
}
