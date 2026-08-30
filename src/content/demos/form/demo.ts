import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** The kit keeps no error colour on purpose, so a rejected field states its own. */
const RED = '#d2453b';
/** Deliberately loose: a form checks the shape it will act on, not the whole of RFC 5322. */
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

const NOTES: Record<string, string> = {
  pristine: 'Nothing checked yet.',
  invalid: 'Submit checked every field, and holds until it is fixed.',
  ready: 'The field is valid again, so submit has re-armed.',
  sent: 'One action committed the whole set.',
};

interface Field {
  name: string;
  label: string;
  hint: string;
  error: string;
  ok: (value: string) => boolean;
}

const FIELDS: Field[] = [
  { name: 'name', label: 'Full name', hint: 'As it appears on your card.', error: 'Enter your full name.', ok: (v) => v.trim().length > 1 },
  {
    name: 'email',
    label: 'Email address',
    hint: 'The receipt goes here.',
    error: 'Use the format name@example.com',
    ok: (v) => EMAIL.test(v.trim()),
  },
];

/** Every message line is a fixed slot, so an error can never move the row below it. */
const SLOT = 'display: block; height: 14px; font-size: 11px; line-height: 14px; overflow: hidden';

const field = (f: Field) => `
  <div class="sp-field" data-part="field-${f.name}" data-state="pristine" style="gap: 3px">
    <div class="sp-row sp-row--between" style="gap: 12px">
      <label class="sp-label" for="vd-form-${f.name}" style="color: var(--sp-ink)">
        ${f.label} <span aria-hidden="true" style="color: ${RED}">*</span><span class="sp-visually-hidden">required</span>
      </label>
      <span class="sp-label" style="font-size: 11px">${f.hint}</span>
    </div>
    <input
      class="sp-input"
      id="vd-form-${f.name}"
      data-part="${f.name}"
      type="text"
      autocomplete="off"
      spellcheck="false"
      aria-describedby="vd-form-${f.name}-error"
    />
    <span id="vd-form-${f.name}-error" style="${SLOT}">
      <span data-part="${f.name}-error" style="color: ${RED}" hidden></span>
    </span>
  </div>`;

/**
 * Form specimen: two required fields under one heading, with hints, required markers, and
 * one submit that checks the whole set and reports what it rejected.
 *
 * The subject is the `<form>` element itself, which is the decision this term forces: the
 * word names the grouping rather than any control inside it, so ringing the email input
 * would be identifying a text field instead. The narration line and the Start over button
 * are the demo's own instrumentation, so they sit outside the form, in the context register.
 *
 * The pristine narration read "Nothing checked yet. The rules belong to the form.". The
 * second sentence was the site making the term's point on the line, so it went; the line
 * still reports what the last action did, and its slot is a fixed height either way.
 *
 * Nothing here leans on a browser's own activation: submit is a `<button type="button">`
 * with a click handler and the form carries `novalidate`, because synthesized input never
 * triggers native submission or a label's click-through (SPEC §8), and a specimen that only
 * worked under a real cursor would go still in attract mode. Both message lines are fixed
 * slots from mount, so an error appearing moves nothing (SPEC §5). Every state the form
 * passes through is honestly a form, so no `data-pose` condition is needed.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <form
        class="sp-window"
        data-part="form"
        data-subject
        data-state="pristine"
        novalidate
        aria-labelledby="vd-form-title"
        style="width: 434px; padding: 12px 16px"
      >
        <h2 id="vd-form-title" class="sp-heading" style="margin: 0; font-size: 14px">Create your account</h2>
        <div class="sp-stack" style="margin-top: 10px; gap: 8px">
          ${FIELDS.map(field).join('')}
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 12px; gap: 12px">
          <span class="sp-label" style="font-size: 11px"><span aria-hidden="true" style="color: ${RED}">*</span> required</span>
          <button class="sp-button sp-button--sm" type="button" data-part="submit">Create account</button>
        </div>
      </form>
      <div class="sp-row sp-context" style="width: 434px; gap: 12px">
        <span class="sp-text" data-part="status" style="flex: 1 1 auto; min-width: 0; ${SLOT}"></span>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="clear" style="flex: 0 0 auto">Start over</button>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const status = part(root, 'status');
  const submit = part(root, 'submit');
  const inputs = FIELDS.map((f) => [f, part(root, f.name) as HTMLInputElement] as const);

  const setState = (state: keyof typeof NOTES) => {
    form.dataset.state = state;
    status.textContent = NOTES[state] ?? '';
  };

  const show = (f: Field, invalid: boolean) => {
    const box = part(root, `field-${f.name}`);
    const input = part(root, f.name);
    const message = part(root, `${f.name}-error`);
    box.dataset.state = invalid ? 'invalid' : 'ok';
    input.style.borderColor = invalid ? RED : '';
    input.setAttribute('aria-invalid', String(invalid));
    message.hidden = !invalid;
    message.innerHTML = invalid
      ? `${icon('alert').replace('<svg ', '<svg style="display: inline-block; width: 11px; height: 11px; vertical-align: -1px; margin-right: 3px" ')}${f.error}`
      : '';
  };

  const check = (): boolean => {
    let bad = false;
    for (const [f, input] of inputs) {
      const invalid = !f.ok(input.value);
      show(f, invalid);
      bad ||= invalid;
    }
    return bad;
  };

  let tried = false;

  submit.addEventListener('click', () => {
    if (submit.getAttribute('aria-disabled') === 'true') return;
    tried = true;
    if (check()) {
      submit.setAttribute('aria-disabled', 'true');
      setState('invalid');
      return;
    }
    setState('sent');
  });

  // A form does not scold ahead of a try: re-checking starts only once submit has run.
  for (const [, input] of inputs) {
    input.addEventListener('input', () => {
      if (!tried) return;
      const bad = check();
      if (bad) submit.setAttribute('aria-disabled', 'true');
      else submit.removeAttribute('aria-disabled');
      setState(bad ? 'invalid' : 'ready');
    });
  }

  part(root, 'clear').addEventListener('click', () => {
    tried = false;
    for (const [f, input] of inputs) {
      input.value = '';
      part(root, `field-${f.name}`).dataset.state = 'pristine';
      input.style.borderColor = '';
      input.removeAttribute('aria-invalid');
      const message = part(root, `${f.name}-error`);
      message.hidden = true;
      message.textContent = '';
    }
    submit.removeAttribute('aria-disabled');
    setState('pristine');
  });

  setState('pristine');
}
