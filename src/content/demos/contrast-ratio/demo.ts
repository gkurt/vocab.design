import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The sample sits on a stated white, so the ratio the panel prints is the one on screen. */
const BACKGROUND = '#FFFFFF';

/** Four greys that land in the four bands the thresholds cut the range into. */
const FOREGROUNDS = [
  { key: 'pale', hex: '#A2A9B4' },
  { key: 'mid', hex: '#828A94' },
  { key: 'grey', hex: '#767676' },
  { key: 'ink', hex: '#4B5563' },
];
const START = 'grey';

/** The three floors WCAG states, each with the size of text it is about. */
const LEVELS = [
  { key: 'aa', label: 'AA 4.5:1', min: 4.5 },
  { key: 'large', label: 'AA large 3:1', min: 3 },
  { key: 'aaa', label: 'AAA 7:1', min: 7 },
];

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** WCAG relative luminance: green carries most of the weight, blue almost none. */
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

const bandOf = (value: number) => (value >= 7 ? 'aaa' : value >= 4.5 ? 'aa' : value >= 3 ? 'large' : 'none');

/**
 * Contrast ratio specimen: one background, four candidate foregrounds, and the number
 * computed from them rather than quoted. Each candidate lands in a different band, so the
 * three thresholds are seen switching one at a time instead of all together.
 *
 * The subject is the readout, not the sample above it. The term names the measurement: the
 * text is what is being measured and the swatch row is how the reader changes the input, so
 * both are scenery. The number is fixed width and the badges keep their places whatever
 * they say, so a new value repaints and moves nothing (SPEC §5).
 *
 * A line under the readout read "Relative luminance only. Two colours can differ wildly and
 * still measure 1:1." That is the site explaining the formula from inside its own instrument,
 * and the article's third paragraph already says it, so it was deleted.
 */
export function mount(root: HTMLElement): void {
  const swatches = FOREGROUNDS.map(
    ({ key, hex }) => `
      <button data-part="fg-${key}" aria-label="${hex}"
              style="width: 28px; height: 28px; padding: 0; border: 0; border-radius: 6px; cursor: pointer; background: ${hex}"></button>`,
  ).join('');

  const badges = LEVELS.map(
    ({ key, label }) => `
      <span data-part="badge-${key}" data-pass="false"
            style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px;
                   border: 1px solid var(--sp-line); font-size: 11px; font-weight: 500; white-space: nowrap">
        <span data-part="mark-${key}" style="display: flex"></span>${label}
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Foreground</span>
          <div class="sp-row" data-part="swatches" style="gap: 6px">${swatches}</div>
        </div>

        <div class="sp-context" data-part="sample"
             style="margin-top: 14px; padding: 12px 14px; border-radius: var(--sp-radius); border: 1px solid #E3E7EE; background: ${BACKGROUND}">
          <span data-part="sample-large" style="display: block; font-size: 19px; font-weight: 700; line-height: 1.3">Large text, 19px bold</span>
          <span data-part="sample-body" style="display: block; margin-top: 5px; font-size: 14px; line-height: 1.5">Body text at fourteen pixels.</span>
        </div>

        <div data-part="readout" data-subject data-level="none"
             style="margin-top: 12px; padding: 11px 12px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: var(--sp-surface)">
          <div class="sp-row" style="gap: 10px; align-items: baseline">
            <span data-part="ratio" style="width: 96px; font-size: 26px; font-weight: 600; line-height: 1.1">&nbsp;</span>
            <span class="sp-label" data-part="pair">&nbsp;</span>
          </div>
          <div class="sp-row sp-row--wrap" style="margin-top: 10px; gap: 6px">${badges}</div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const ratioText = part(root, 'ratio');
  const pairText = part(root, 'pair');
  const large = part(root, 'sample-large');
  const body = part(root, 'sample-body');
  const picks = FOREGROUNDS.map((fg) => ({ fg, el: part(root, `fg-${fg.key}`) }));

  const measure = (hex: string) => {
    const value = ratio(BACKGROUND, hex);
    readout.dataset.level = bandOf(value);
    ratioText.textContent = `${value.toFixed(2)}:1`;
    pairText.textContent = `${hex} on ${BACKGROUND}`;
    large.style.color = hex;
    body.style.color = hex;

    for (const level of LEVELS) {
      const pass = value >= level.min;
      const badge = part(root, `badge-${level.key}`);
      badge.dataset.pass = String(pass);
      badge.style.background = pass ? 'var(--sp-accent-soft)' : 'var(--sp-sunken)';
      badge.style.borderColor = pass ? 'var(--sp-accent)' : 'var(--sp-line)';
      // A pass is never colour alone (WCAG 1.4.1): the glyph is the other half of it.
      part(root, `mark-${level.key}`).innerHTML = icon(pass ? 'check' : 'close');
    }

    for (const pick of picks) {
      const on = pick.fg.hex === hex;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? '0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)' : '';
    }
  };
  measure(FOREGROUNDS.find((fg) => fg.key === START)?.hex ?? '#767676');

  for (const pick of picks) pick.el.addEventListener('click', () => measure(pick.fg.hex));
}
