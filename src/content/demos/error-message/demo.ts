import { part } from '#src/kit/parts.ts';

const EMPTY = 'Enter a postcode, like SW1A 1AA';
const MALFORMED = 'Postcodes have a space, like SW1A 1AA';

function fault(value: string): string | undefined {
  if (value === '') return EMPTY;
  if (!/^[a-z]{1,2}\d[a-z\d]?\s\d[a-z]{2}$/i.test(value)) return MALFORMED;
  return undefined;
}

/**
 * Error message specimen: the field is judged on submit, and the verdict is a
 * line that belongs to that field. The subject is the message itself, not the
 * field carrying it, which is what separates this term from inline validation.
 *
 * The room the line will take is measured once on mount (SPEC §5), so the
 * button below it never moves out from under the pointer that just pressed it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Delivery address</div>
        <div class="sp-field" style="margin-top: 14px">
          <div class="sp-stack sp-context" style="gap: 4px">
            <label class="sp-label" for="vd-postcode">Postcode</label>
            <input
              class="sp-input"
              id="vd-postcode"
              data-part="input"
              type="text"
              autocomplete="off"
              spellcheck="false"
              aria-describedby="vd-postcode-error"
            />
          </div>
          <div data-part="slot" style="flex: 0 0 auto">
            <p
              class="sp-text sp-text--ink"
              id="vd-postcode-error"
              data-part="error"
              data-subject
              role="alert"
              style="margin: 0"
              hidden
            ></p>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Continue</button>
          <span class="sp-text" data-part="status">Step 2 of 4</span>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'input') as HTMLInputElement;
  const slot = part(root, 'slot');
  const error = part(root, 'error');

  // Measured rather than guessed: either message could wrap, and only the taller
  // of the two says how much room the line has to be given from the start.
  let reserved = 0;
  error.hidden = false;
  for (const text of [EMPTY, MALFORMED]) {
    error.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  error.textContent = '';
  error.hidden = true;
  slot.style.height = `${reserved}px`;

  /** Submit judges the value it finds, so a pass can never leave the demo mid-claim. */
  const judge = () => {
    const message = fault(input.value.trim());
    error.hidden = message === undefined;
    error.textContent = message ?? '';
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  part(root, 'submit').addEventListener('click', judge);
}
