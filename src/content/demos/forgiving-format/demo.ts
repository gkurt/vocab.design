import { part } from '#src/kit/parts.ts';

const SAMPLES = [
  { key: 'spaces', text: '07700 900123' },
  { key: 'plus', text: '+44 7700 900 123' },
  { key: 'dashes', text: '0770-090-0123' },
] as const;

/** What the field is really after: ten national digits, however they arrived. */
function normalise(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('44')) digits = digits.slice(2);
  else if (digits.startsWith('0')) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  return `+44 ${digits.slice(0, 4)} ${digits.slice(4)}`;
}

/** The twin's rule, stated exactly as such a field states it: eleven digits, nothing else. */
const strictOk = (raw: string) => /^0\d{10}$/.test(raw);

/**
 * Forgiving format specimen: one phone number typed four ways into two fields with the
 * same job and opposite policies. The forgiving field takes whatever arrives and prints
 * the single form it will store; the strict twin beside it refuses anything that is not
 * already punctuated its way.
 *
 * The subject is the forgiving field, meaning the input together with the line that says
 * what it stored: a bare input would be a text field, and normalising is the thing this
 * term adds, so the readout belongs inside the claim exactly as the mask's template does.
 * The labels, the sample chips, and the strict twin are scenery (SPEC §5).
 *
 * Two strings were the site talking rather than the form. The strict field was labelled
 * "The same field, strict", which points at the construction instead of naming the input,
 * and is "Mobile number, strict" now. A line under the frame read "The digits were always
 * there. Only one of these two fields made that the reader's problem."; the article says
 * it, so it went.
 *
 * Both readouts keep their space in every state, so an accepted or rejected verdict
 * changes words and not geometry (SPEC §5). The chips set a value rather than toggling
 * one, and the field mounts empty so the typed pass starts from nothing (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const chips = SAMPLES.map(
    (s) => `<button class="sp-chip" data-part="chip-${s.key}" type="button" style="font-size: 11px">${s.text}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 274px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Delivery details</span><span class="sp-label">1 of 2</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 28px; gap: 6px">
            <span class="sp-label" style="font-size: 11px">Or fill it:</span>
            ${chips}
          </div>

          <div class="sp-field" style="flex: 0 0 auto; gap: 4px">
            <label class="sp-label sp-context" for="vd-forgiving">Mobile number, typed any way</label>
            <div data-part="forgiving" data-subject data-state="empty">
              <input class="sp-input" id="vd-forgiving" data-part="forgiving-input" type="text" inputmode="tel" autocomplete="off" spellcheck="false" placeholder="Spaces, dashes and +44 all welcome" />
              <span class="sp-text" data-part="forgiving-readout" style="display: block; height: 16px; margin-top: 4px; font-size: 11px">Nothing typed yet.</span>
            </div>
          </div>

          <div class="sp-field sp-context" style="flex: 0 0 auto; gap: 4px">
            <label class="sp-label" for="vd-strict">Mobile number, strict</label>
            <div data-part="strict" data-state="empty">
              <input class="sp-input" id="vd-strict" data-part="strict-input" type="text" inputmode="tel" autocomplete="off" spellcheck="false" placeholder="11 digits, no spaces" />
              <span class="sp-text" data-part="strict-readout" style="display: block; height: 16px; margin-top: 4px; font-size: 11px">Waiting.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  const forgiving = part(root, 'forgiving');
  const forgivingInput = part(root, 'forgiving-input') as HTMLInputElement;
  const forgivingReadout = part(root, 'forgiving-readout');
  const strict = part(root, 'strict');
  const strictInput = part(root, 'strict-input') as HTMLInputElement;
  const strictReadout = part(root, 'strict-readout');

  const apply = (raw: string) => {
    forgivingInput.value = raw;
    strictInput.value = raw;

    const stored = normalise(raw);
    if (raw.length === 0) {
      forgiving.dataset.state = 'empty';
      forgivingReadout.textContent = 'Nothing typed yet.';
    } else if (stored) {
      forgiving.dataset.state = 'accepted';
      forgivingReadout.textContent = `Accepted. Stored as ${stored}`;
    } else {
      forgiving.dataset.state = 'reading';
      forgivingReadout.textContent = 'Reading. Ten national digits are needed.';
    }

    if (raw.length === 0) {
      strict.dataset.state = 'empty';
      strictReadout.textContent = 'Waiting.';
    } else if (strictOk(raw)) {
      strict.dataset.state = 'accepted';
      strictReadout.textContent = 'Accepted.';
    } else {
      strict.dataset.state = 'rejected';
      strictReadout.textContent = 'Rejected. Enter a valid phone number.';
    }
  };

  forgivingInput.addEventListener('input', () => apply(forgivingInput.value));
  strictInput.addEventListener('input', () => apply(strictInput.value));

  for (const sample of SAMPLES) {
    part(root, `chip-${sample.key}`).addEventListener('click', () => apply(sample.text));
  }
}
