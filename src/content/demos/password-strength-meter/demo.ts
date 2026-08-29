import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A pause in typing, not a keystroke, is what gets announced. */
const SETTLE_MS = 700;

type Strength = 'empty' | 'weak' | 'fair' | 'strong';

const READINGS: Record<Strength, string> = {
  empty: 'Use a phrase you can remember.',
  weak: 'Weak. Add a few more words.',
  fair: 'Fair. Length helps more than symbols do.',
  strong: 'Strong. Nothing else needed.',
};

const FILL: Record<Strength, number> = { empty: 0, weak: 30, fair: 62, strong: 100 };

/**
 * Guessability, roughly: length counts twice and variety counts once, so a long
 * ordinary phrase can outscore a short scrambled one. A real meter estimates
 * against dictionaries and breach lists; the shape of the answer is the same.
 */
function score(value: string): Strength {
  if (value === '') return 'empty';
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((re) => re.test(value)).length;
  let points = 0;
  if (value.length >= 6) points++;
  if (value.length >= 10) points++;
  if (classes >= 2) points++;
  if (classes >= 3 && value.length >= 12) points++;
  if (points >= 4) return 'strong';
  if (points >= 2) return 'fair';
  return 'weak';
}

/**
 * Password strength meter specimen: the bar and the sentence beside it, moving as
 * the password is typed. The subject is the pair, not the field, because neither
 * half is the term on its own: a bar with no words is unreadable and a line of
 * advice with no bar is a hint.
 *
 * The tallest reading is measured at mount and its room held from then on
 * (SPEC §5), so a verdict that wraps cannot shove the form below it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Choose a password</div>
        <div class="sp-field sp-context" style="margin-top: 14px">
          <label class="sp-label" for="vd-pw">Password</label>
          <input
            class="sp-input"
            id="vd-pw"
            data-part="input"
            type="password"
            autocomplete="off"
            spellcheck="false"
            aria-describedby="vd-pw-reading"
          />
        </div>
        <div class="sp-stack" data-part="meter" data-subject data-strength="empty" style="margin-top: 10px; gap: 6px">
          <div class="sp-progress sp-progress--meter" data-part="bar" data-zone="ok" style="--sp-value: 0%">
            <div class="sp-progress-fill"></div>
          </div>
          <div data-part="slot">
            <span class="sp-text" id="vd-pw-reading" data-part="reading">${READINGS.empty}</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Create account</button>
        </div>
        <span class="sp-visually-hidden" data-stage-announce data-part="announcement" role="status"></span>
      </div>
    </div>
  `;

  const meter = part(root, 'meter');
  const bar = part(root, 'bar');
  const slot = part(root, 'slot');
  const reading = part(root, 'reading');
  const input = part(root, 'input') as HTMLInputElement;
  const announcement = part(root, 'announcement');

  let reserved = 0;
  for (const text of Object.values(READINGS)) {
    reading.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  slot.style.height = `${reserved}px`;
  reading.textContent = READINGS.empty;

  let timer: number | undefined;

  input.addEventListener('input', () => {
    const strength = score(input.value);
    meter.dataset.strength = strength;
    bar.style.setProperty('--sp-value', `${FILL[strength]}%`);
    // The kit keeps one second hue, for a measurement that is running out.
    bar.dataset.zone = strength === 'weak' ? 'warn' : 'ok';
    reading.textContent = READINGS[strength];

    // Spoken on a pause: a live region fired per keystroke reads the password aloud.
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => {
      announcement.textContent = strength === 'empty' ? '' : `Password strength: ${strength}`;
    }, SETTLE_MS);
  });
}
