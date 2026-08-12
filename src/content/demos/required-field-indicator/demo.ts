import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The one colour this specimen states for itself: the kit keeps no error hue (SPEC §5),
 * and a rejected field has to look rejected for the last beat to mean anything.
 */
const ERROR_EDGE = '#d92d20';

const LEGENDS = {
  required: '* marks a required field.',
  optional: 'Every field is required unless it is marked optional.',
} as const;

type Convention = keyof typeof LEGENDS;

/**
 * Required field indicator specimen: the same three fields under both conventions. Mark
 * the required ones with an asterisk the legend explains, or mark the optional one and
 * say so, and either way the announced line underneath does not change, because the
 * convention is a visual agreement and `aria-required` is the part a reader hears.
 * Submitting with the email empty shows what the mark was promising.
 *
 * The subject is one field's mark, not the field and not the form: the term names the
 * thing that says "this cannot be left empty", and on this form that is a single glyph
 * beside a label. Beside, not inside: a mark inside a `<label for>` makes the browser
 * forward every click on it to the control, and the click a takeover reader aims at the
 * subject must land once, on the subject. It is the narrowest honest answer, and it is
 * why the announced readout sits beside it as scenery, since the other half of the
 * indicator has no box of its own to point at. The switch, the legend, and the submit
 * button are scenery too (SPEC §5).
 *
 * Nothing here resizes its neighbours: each mark lives at the end of its own label line,
 * the error keeps its room from mount, and the two conventions are reached by their own
 * segment rather than by a toggle (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 434px">
        <div class="sp-row" style="align-items: flex-start; gap: 16px">
          <div data-part="form" data-convention="required" style="width: 200px">
            <p class="sp-text sp-context" data-part="legend" style="margin: 0; font-size: 11px; height: 30px">${LEGENDS.required}</p>
            <div class="sp-field sp-context" style="margin-top: 4px">
              <span><label class="sp-label" for="vd-rfi-name">Full name</label><span class="sp-label" data-part="mark-name"
                    aria-hidden="true" style="color: var(--sp-accent); font-weight: 700"> *</span></span>
              <input class="sp-input" id="vd-rfi-name" value="Ada Lovelace" aria-required="true" readonly />
            </div>
            <div class="sp-field" style="margin-top: 10px">
              <span><label class="sp-label" for="vd-rfi-email">Email</label><span class="sp-label" data-part="mark-email" data-subject
                    aria-hidden="true" style="color: var(--sp-accent); font-weight: 700"> *</span></span>
              <input class="sp-input sp-context" id="vd-rfi-email" data-part="email" value="" aria-required="true"
                     aria-describedby="vd-rfi-error" readonly />
              <div class="sp-context" style="height: 17px">
                <span class="sp-text" id="vd-rfi-error" data-part="error" style="font-size: 11px; color: ${ERROR_EDGE}" hidden>
                  Enter an email address.
                </span>
              </div>
            </div>
            <div class="sp-field sp-context" style="margin-top: 4px">
              <label class="sp-label" for="vd-rfi-company">Company<span data-part="mark-company"
                     style="color: var(--sp-muted); font-weight: 500"></span></label>
              <input class="sp-input" id="vd-rfi-company" value="" readonly />
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="submit"
                    style="margin-top: 12px">Create account</button>
          </div>

          <div class="sp-context" style="width: 186px">
            <span class="sp-label">Which fields carry the mark</span>
            <sp-segmented class="sp-segmented" data-part="segmented" data-value="required" style="margin-top: 6px">
              <button class="sp-segment" data-part="seg-required" value="required">Required</button>
              <button class="sp-segment" data-part="seg-optional" value="optional">Optional</button>
            </sp-segmented>
            <div class="sp-surface" style="margin-top: 12px; padding: 8px 10px">
              <span class="sp-label">Announced for Email</span>
              <p class="sp-text sp-text--ink" style="margin: 4px 0 0; font-size: 12px">“Email, edit, required”</p>
              <p class="sp-text" style="margin: 6px 0 0; font-size: 11px">Same under both conventions: the mark is the visual half.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const legend = part(root, 'legend');
  const marks = {
    name: part(root, 'mark-name'),
    email: part(root, 'mark-email'),
    company: part(root, 'mark-company'),
  };

  const apply = (convention: Convention) => {
    form.dataset.convention = convention;
    legend.textContent = LEGENDS[convention];
    const required = convention === 'required' ? ' *' : '';
    marks.name.textContent = required;
    marks.email.textContent = required;
    marks.company.textContent = convention === 'optional' ? ' (optional)' : '';
  };

  apply('required');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'optional' ? 'optional' : 'required');
  });

  // The form's own button, wired to the empty field the mark was warning about.
  part(root, 'submit').addEventListener('click', () => {
    const email = part(root, 'email');
    part(root, 'error').hidden = false;
    email.setAttribute('aria-invalid', 'true');
    email.style.borderColor = ERROR_EDGE;
  });
}
