import { flag, part } from '#src/kit/parts.ts';

const RED = '#d2453b';

type Stop = { key: 'good' | 'twin'; heard: string; state: 'flagged' | 'unflagged' };

/** What a screen reader says on arriving at each field, in the order the form is read. */
const STOPS: Stop[] = [
  { key: 'good', heard: '“Work email, edit, invalid entry. Enter a full email address.”', state: 'flagged' },
  { key: 'twin', heard: '“Postcode, edit.” Nothing says it was rejected.', state: 'unflagged' },
];

const IDLE = 'Nothing read yet';

const CAPTION = 'Both were rejected, both are red. Only the flagged field reports it to anything but an eye.';

/**
 * Invalid state specimen: a submitted form holding two rejected fields that look identical.
 * The first carries `aria-invalid="true"` and points at its message; the second has a red
 * border and red text and nothing else. Walking the screen reader through the form reads the
 * first as invalid, with the reason, and the second as an ordinary field.
 *
 * The subject is the flagged input, the narrowest element the term names: the mark lives on
 * the field, not on the message it points at and not on the form around it. The twin, the
 * readout, the attribute chips, and the walk button are scenery (SPEC §5). The field is
 * invalid at mount and stays invalid, so no `data-pose` is needed. The walk clamps at the
 * last field and the readout holds a fixed height, so stepping moves nothing (SPEC §5, §8).
 */
export function mount(root: HTMLElement): void {
  const field = (key: 'good' | 'twin', label: string, value: string, chip: string, error: string, subject: boolean) => `
    <div class="sp-field${key === 'twin' ? ' sp-context' : ''}" data-part="field-${key}" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <span class="sp-label" style="color: var(--sp-ink)">${label}</span>
      <div class="sp-input" data-part="input-${key}" ${subject ? 'data-subject' : ''}
           style="border-color: ${RED}; color: var(--sp-muted)">${value}</div>
      <span class="sp-text" data-part="err-${key}" style="height: 32px; font-size: 11px; color: ${RED}">${error}</span>
      <span class="sp-label" data-part="chip-${key}"
            style="align-self: flex-start; font-size: 10px; white-space: nowrap; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">${chip}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Checkout details, submitted</span>
          <span class="sp-text" style="font-size: 11px">2 fields rejected</span>
        </div>

        <div class="sp-surface sp-row" style="margin-top: 10px; padding: 10px 12px 12px; gap: 14px; align-items: stretch">
          ${field('good', 'Work email', 'ada@', 'aria-invalid="true"', 'Enter a full email address.', true)}
          ${field('twin', 'Postcode', '9', 'styled red only', 'Enter a valid postcode.', false)}
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 7px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 34px">
            <span class="sp-label" style="flex: 0 0 auto">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle"
                  style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; line-height: 1.4; text-align: right">${IDLE}</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; gap: 10px">
          <p class="sp-text" data-part="caption" style="margin: 0; flex: 1 1 auto; height: 34px; font-size: 11px">${CAPTION}</p>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="read"
                  style="flex: 0 0 auto">Read next field</button>
        </div>
      </div>
    </div>
  `;

  const heard = part(root, 'heard');
  const inputs = { good: part(root, 'input-good'), twin: part(root, 'input-twin') };

  let at = -1;

  const draw = () => {
    const stop = STOPS[at];
    for (const key of ['good', 'twin'] as const) flag(inputs[key], 'data-sim-focus', stop?.key === key);
    heard.dataset.state = stop?.state ?? 'idle';
    heard.textContent = stop ? stop.heard : IDLE;
  };

  draw();

  part(root, 'read').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS.length - 1);
    draw();
  });
}
