import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * The one colour this specimen states for itself. The kit has no error hue on purpose
 * (SPEC §5), and a summary that failed to look like a failure would not be the term.
 */
const ERROR_EDGE = '#d92d20';

const FIELDS = [
  { id: 'name', label: 'Full name', value: '', message: 'Enter your full name' },
  { id: 'email', label: 'Email address', value: 'priya.rana', message: 'Enter an email address, like ada@example.com' },
] as const;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LINK = [
  'appearance: none; border: 0; padding: 0; background: none; font: inherit; font-size: 12px',
  `color: ${ERROR_EDGE}; text-decoration: underline; text-underline-offset: 2px; text-align: left; cursor: pointer`,
].join('; ');

/** One line per problem, in field order, so working down the list works down the form. */
function entryList(items: readonly { id: string; message: string }[]): string {
  return items
    .map(
      ({ id, message }) =>
        `<li><button class="sp-button--quiet" data-part="link-${id}" data-field="${id}" type="button" style="${LINK}">${message}</button></li>`,
    )
    .join('');
}

/**
 * Error summary specimen: a form answered with every problem gathered at the top, each
 * one a link to the field that caused it. The subject is the summary box, not the form:
 * the fields carry their own messages, which are their own term, and what this one names
 * is the tally above them.
 *
 * The summary's room is held from mount, and each field's message keeps its line whether
 * it is showing or not, so submitting moves nothing (SPEC §5). The entries move simulated
 * focus rather than real focus, because attract mode must never take a reader's keyboard
 * (SPEC §7), and they are buttons rather than in-page links for the same reason: a
 * specimen may not navigate the page it is sitting in. A real one links to the field id.
 *
 * The form is submitted by wiring the button, since a browser's own submit is a default
 * activation a synthesized click never triggers (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const fields = FIELDS.map(
    ({ id, label, value, message }) => `
      <div class="sp-field sp-context" data-part="field-${id}" style="flex: 1 1 0; min-width: 0">
        <label class="sp-label" for="vd-es-${id}">${label}</label>
        <input class="sp-input" id="vd-es-${id}" data-part="input-${id}" type="text" spellcheck="false" value="${value}" />
        <span class="sp-row" data-part="msg-${id}" style="gap: 6px; align-items: flex-start; visibility: hidden">
          <span style="color: ${ERROR_EDGE}; display: flex; padding-top: 1px">${icon('alert')}</span>
          <span class="sp-text sp-text--ink" style="font-size: 12px">${message}</span>
        </span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 428px; padding: 14px 18px">
        <div data-part="slot">
          <div
            class="sp-surface"
            data-part="summary"
            data-subject
            role="alert"
            tabindex="-1"
            style="padding: 8px 10px; border-color: ${ERROR_EDGE}; box-shadow: inset 3px 0 0 0 ${ERROR_EDGE}"
          >
            <span class="sp-row" style="gap: 6px">
              <span style="color: ${ERROR_EDGE}; display: flex">${icon('alert')}</span>
              <span class="sp-heading" style="font-size: 13px">There is a problem</span>
            </span>
            <ul class="sp-stack" data-part="entries" style="gap: 3px; margin: 5px 0 0; padding: 0 0 0 22px; list-style: none"></ul>
          </div>
          <div class="sp-row sp-surface sp-context" data-part="success" role="status" style="gap: 8px; padding: 8px 10px" hidden>
            ${icon('check')}
            <span class="sp-text sp-text--ink">Mooring application sent</span>
          </div>
        </div>
        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 12px">
          ${fields}
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          <button class="sp-button sp-button--sm" data-part="submit" type="button">Send application</button>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const summary = part(root, 'summary');
  const success = part(root, 'success');
  const entries = part(root, 'entries');

  const inputs = new Map(FIELDS.map((field) => [field.id, part(root, `input-${field.id}`) as HTMLInputElement]));

  const problems = () =>
    FIELDS.filter(({ id }) => {
      const value = inputs.get(id)?.value.trim() ?? '';
      return id === 'email' ? !EMAIL.test(value) : value.length === 0;
    });

  // Mounted in the state that is measured: the summary is on stage with both entries
  // in it, so the room it needs is known before it is put away (SPEC §5).
  entries.innerHTML = entryList(FIELDS);
  slot.style.height = `${slot.offsetHeight}px`;
  summary.hidden = true;

  const setSimFocus = (id: string) => {
    for (const [key, input] of inputs) flag(input, 'data-sim-focus', key === id);
  };

  entries.addEventListener('click', (event) => {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-field]')?.dataset.field;
    if (id) setSimFocus(id);
  });

  part(root, 'submit').addEventListener('click', () => {
    const failed = problems();
    for (const { id } of FIELDS) part(root, `msg-${id}`).style.visibility = failed.some((f) => f.id === id) ? 'visible' : 'hidden';
    entries.innerHTML = entryList(failed);
    summary.hidden = failed.length === 0;
    success.hidden = failed.length > 0;
    if (failed.length === 0) setSimFocus('');
  });
}
