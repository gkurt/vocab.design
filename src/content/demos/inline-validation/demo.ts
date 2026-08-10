import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A pause in typing, not a keystroke, is what asks for a verdict. */
const SETTLE_MS = 320;

const NEEDS_AT = 'Needs an @, like ada@example.com';
const NEEDS_DOMAIN = 'Finish the domain, like example.com';
const ACCEPTED = 'We can reach you here';

type State = 'untouched' | 'invalid' | 'valid';
type Verdict = { state: Extract<State, 'invalid' | 'valid'>; text: string };

function judge(value: string): Verdict {
  const [local, domain, ...extra] = value.split('@');
  if (!local || !domain || extra.length > 0) return { state: 'invalid', text: NEEDS_AT };
  if (!/^[^\s@]+\.[a-z]{2,}$/i.test(domain)) return { state: 'invalid', text: NEEDS_DOMAIN };
  return { state: 'valid', text: ACCEPTED };
}

/**
 * Inline validation specimen: the field answers for itself, before anything is
 * submitted. The subject is the field as a unit (label, control, verdict), since
 * the term is not the message on its own but the field carrying its own opinion.
 *
 * The room the verdict will take is measured once, here, and held from mount
 * (SPEC §5): the message arrives into space that was always there, so nothing
 * below the field moves while the reader is reading it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Create your account</div>
        <div class="sp-field" data-part="field" data-subject data-state="untouched" style="margin-top: 14px">
          <label class="sp-label" for="vd-email">Email</label>
          <input
            class="sp-input"
            id="vd-email"
            data-part="input"
            type="text"
            inputmode="email"
            autocomplete="off"
            spellcheck="false"
            placeholder="you@example.com"
            aria-describedby="vd-email-verdict"
          />
          <div data-part="slot" style="flex: 0 0 auto">
            <span class="sp-text" id="vd-email-verdict" data-part="verdict" role="status"></span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Create account</button>
          <span class="sp-text">Step 1 of 3</span>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const input = part(root, 'input') as HTMLInputElement;
  const slot = part(root, 'slot');
  const verdict = part(root, 'verdict');

  // Measured rather than guessed: a message that wraps to a second line is the one
  // thing that could make this slot grow after mount.
  let reserved = 0;
  for (const text of [NEEDS_AT, NEEDS_DOMAIN, ACCEPTED]) {
    verdict.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  verdict.textContent = '';
  slot.style.height = `${reserved}px`;

  const show = (state: State, text: string) => {
    field.dataset.state = state;
    verdict.textContent = text;
    // The kit has one accent and no semantic palette, so the complaint speaks up by
    // taking ink where the confirmation stays muted.
    verdict.className = state === 'invalid' ? 'sp-text sp-text--ink' : 'sp-text';
    if (state === 'invalid') input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  let timer: number | undefined;
  const settle = () => {
    clock.clearTimeout(timer);
    const value = input.value.trim();
    if (value === '') {
      show('untouched', '');
      return;
    }
    const result = judge(value);
    show(result.state, result.text);
  };

  input.addEventListener('input', () => {
    clock.clearTimeout(timer);
    if (input.value.trim() === '') {
      show('untouched', '');
      return;
    }
    timer = clock.setTimeout(settle, SETTLE_MS);
  });

  // Leaving the field is the other moment a verdict is owed, and it is owed at once.
  input.addEventListener('blur', settle);
}
