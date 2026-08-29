import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MESSAGE = 'Enter an email address, like ada@example.com';

/**
 * The one colour this specimen states for itself. The kit has no error hue on purpose
 * (SPEC §5), and the term is about not depending on one, so the demo paints the marking
 * the vocabulary actually uses and then drains it while the words stay put.
 */
const ERROR_EDGE = '#d92d20';

/**
 * Error identification specimen: a form that fails on submit. The field that failed is
 * marked three ways at once (a coloured edge, an icon, and a sentence naming the field
 * and the fix), and the switch below simulates a reader who cannot use the colour: the
 * edge and the icon go grey, and the identification survives, because it was never the
 * colour doing the work.
 *
 * The subject is the field group that carries the identified error, label and control
 * and message together, since the term names the failure being made perceivable rather
 * than the sentence on its own. The healthy field, the submit button, and the colour
 * switch are scenery (SPEC §5). The message's room is measured once and held from
 * mount, so submitting moves nothing below it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div data-part="form" data-mode="colour">
          <span class="sp-heading sp-context" style="font-size: 14px">Contact details</span>
          <div class="sp-field" data-part="field" data-state="ok" data-subject style="margin-top: 14px">
            <label class="sp-label" for="vd-ei-email">Email address</label>
            <input class="sp-input" id="vd-ei-email" data-part="input" value="ada.example.com" aria-describedby="vd-ei-error" readonly />
            <div data-part="slot" style="flex: 0 0 auto">
              <span class="sp-row" id="vd-ei-error" data-part="error" style="gap: 6px; align-items: flex-start" hidden>
                <span data-part="mark" style="color: ${ERROR_EDGE}; display: flex; padding-top: 1px">${icon('alert')}</span>
                <span class="sp-text sp-text--ink" style="font-size: 12px">${MESSAGE}</span>
              </span>
            </div>
          </div>
          <div class="sp-field sp-context" style="margin-top: 12px">
            <label class="sp-label" for="vd-ei-phone">Phone</label>
            <input class="sp-input" id="vd-ei-phone" value="+44 7700 900123" readonly />
          </div>
          <div class="sp-row sp-context" style="margin-top: 14px">
            <button class="sp-button sp-button--sm" type="button" data-part="submit">Continue</button>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 16px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Simulated vision" data-part="segmented" data-value="colour">
            <button class="sp-segment" data-part="seg-colour" value="colour">Colour</button>
            <button class="sp-segment" data-part="seg-grey" value="grey">Greyscale</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const field = part(root, 'field');
  const input = part(root, 'input');
  const slot = part(root, 'slot');
  const error = part(root, 'error');

  // Measured rather than guessed: a message that wraps to a second line is the one thing
  // that could make this slot grow after mount (SPEC §5).
  error.hidden = false;
  slot.style.height = `${slot.offsetHeight}px`;
  error.hidden = true;

  part(root, 'submit').addEventListener('click', () => {
    field.dataset.state = 'invalid';
    error.hidden = false;
    input.style.borderColor = ERROR_EDGE;
    input.setAttribute('aria-invalid', 'true');
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail;
    form.dataset.mode = mode;
    form.style.filter = mode === 'grey' ? 'grayscale(1)' : '';
  });
}
