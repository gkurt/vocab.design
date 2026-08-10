import { part } from '#src/kit/parts.ts';

const HINT = 'We only use this to work out delivery.';
const ERROR = 'Enter a full postcode, like SW1A 2AA.';

const POSTCODE = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

/**
 * Text field specimen: the label, the box, and the line under it that carries a hint
 * until it has to carry a complaint. The subject is that assembly, not the `<input>`
 * alone, since the term names all of it; the heading and the form's own footer are
 * scenery.
 *
 * The verdict arrives when the field is asked to commit, not while the value is being
 * typed. Judging every keystroke is its own term (inline validation), and a field that
 * corrects you mid-word would demonstrate that one instead of this one.
 *
 * The help line's room is measured once, on mount (SPEC §5): the error text is longer
 * than the hint it replaces, and nothing below the field may move while a reader is
 * reading the thing that just appeared.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Where should it go?</div>
        <div class="sp-field" data-part="field" data-subject data-state="empty" style="margin-top: 14px">
          <label class="sp-label" for="vd-postcode">Postcode</label>
          <input
            class="sp-input"
            id="vd-postcode"
            data-part="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="SW1A 2AA"
            aria-describedby="vd-postcode-help"
          />
          <div data-part="help-slot" style="flex: 0 0 auto">
            <span class="sp-text" id="vd-postcode-help" data-part="help" data-kind="hint" role="status">${HINT}</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 16px">
          <span class="sp-text" data-part="committed" data-state="idle">No address yet</span>
          <button class="sp-button" data-part="continue" type="button">Continue</button>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const input = part(root, 'input') as HTMLInputElement;
  const slot = part(root, 'help-slot');
  const help = part(root, 'help');
  const committed = part(root, 'committed');

  let reserved = 0;
  for (const text of [HINT, ERROR]) {
    help.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  help.textContent = HINT;
  slot.style.height = `${reserved}px`;

  const showHint = () => {
    help.dataset.kind = 'hint';
    help.textContent = HINT;
    // The kit has one accent and no semantic palette, so the complaint speaks up by
    // taking ink where the hint stays muted.
    help.className = 'sp-text';
    input.removeAttribute('aria-invalid');
  };

  input.addEventListener('input', () => {
    // Editing answers the complaint: the error belongs to a value that no longer exists.
    if (field.dataset.state === 'invalid') showHint();
    field.dataset.state = input.value.trim() === '' ? 'empty' : 'editing';
  });

  part(root, 'continue').addEventListener('click', () => {
    const value = input.value.trim();
    if (!POSTCODE.test(value)) {
      field.dataset.state = 'invalid';
      help.dataset.kind = 'error';
      help.textContent = ERROR;
      help.className = 'sp-text sp-text--ink';
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    field.dataset.state = 'accepted';
    showHint();
    committed.dataset.state = 'sent';
    committed.textContent = `Delivering to ${value.toUpperCase()}`;
  });
}
