import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;

/* WCAG 2: linearise each channel, weight them, divide the lighter by the darker. */
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

/* APCA 0.1.9: a plain power curve rather than the sRGB piecewise one, a soft clamp near
   black, and two exponent pairs, so which of the two colours is the text changes the answer. */
const screenY = (hex: string) =>
  0.2126729 * channel(hex, 1) ** 2.4 + 0.7151522 * channel(hex, 3) ** 2.4 + 0.072175 * channel(hex, 5) ** 2.4;
// biome-ignore lint/suspicious/noApproximativeNumericConstant: APCA 0.1.9 states blkClmp as 1.414, not as a root
const clampBlack = (y: number) => (y < 0.022 ? y + (0.022 - y) ** 1.414 : y);

/** Lc for a text colour on a background. Negative means light text on a dark field. */
const lc = (text: string, bg: string): number => {
  const t = clampBlack(screenY(text));
  const b = clampBlack(screenY(bg));
  if (Math.abs(b - t) < 0.0005) return 0;
  if (b > t) {
    const sapc = (b ** 0.56 - t ** 0.57) * 1.14;
    return (sapc < 0.1 ? 0 : sapc - 0.027) * 100;
  }
  const sapc = (b ** 0.65 - t ** 0.62) * 1.14;
  return (sapc > -0.1 ? 0 : sapc + 0.027) * 100;
};

type Size = { key: string; label: string; px: string; weight: string; wcag: number; lc: number; note: string };

/** Two settings from APCA's font lookup, beside the WCAG 2 threshold for the same text. */
const SIZES: Size[] = [
  { key: 'body', label: 'Body 16px', px: '16px', weight: '400', wcag: 4.5, lc: 75, note: 'Body text: WCAG 2 asks 4.5:1, APCA asks Lc 75.' },
  {
    key: 'large',
    label: 'Large 24px bold',
    px: '24px',
    weight: '700',
    wcag: 3,
    lc: 60,
    note: 'Large bold text: WCAG 2 asks 3:1, APCA asks Lc 60.',
  },
];

const START = 'body';

/** Four pairs, chosen so the two algorithms agree on one and part company on the rest. */
const PAIRS = [
  { key: 'ink', text: '#1B2130', bg: '#FFFFFF' },
  { key: 'grey', text: '#767676', bg: '#FFFFFF' },
  { key: 'thin', text: '#9E9E9E', bg: '#000000' },
  { key: 'white', text: '#FFFFFF', bg: '#787878' },
];

const TAIL = 'Where the two columns disagree is the whole of the argument.';

/**
 * APCA specimen: four text and background pairs scored twice, once by the ratio WCAG 2 is
 * written in and once as an Lc value, with the text size switchable because that is the input
 * the older formula does not have. Both numbers are computed from the sample's own colours, so
 * the disagreements are arithmetic rather than assertion: mid grey on black passes WCAG 2 at
 * AAA and scores under Lc 50, and white on mid grey fails 4.5:1 while clearing Lc 75.
 *
 * The subject is the comparison table. The term names the scoring, and the scoring is the two
 * columns read against each other; the size control and the threshold line are instrumentation
 * and stay in the context register (SPEC §5). Both size settings are honest APCA, so there is
 * no state identify has to refuse.
 *
 * Every sample cell is a fixed height and the number cells are fixed width, so changing size
 * repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SIZES.find((s) => s.key === START) ?? SIZES[0];
  if (!start) return;

  const cell = (kind: string, key: string) => `
    <td style="width: 122px">
      <span class="sp-row" style="gap: 6px">
        <span data-part="mark-${kind}-${key}" style="display: flex"></span>
        <span data-part="${kind}-${key}" style="font-variant-numeric: tabular-nums"></span>
      </span>
    </td>`;

  const rows = PAIRS.map(
    (pair) => `
      <tr data-part="row-${pair.key}" data-wcag="fail" data-apca="fail">
        <td style="width: 156px">
          <span data-part="sample-${pair.key}"
                style="display: flex; align-items: center; height: 30px; padding: 0 9px; border-radius: 5px; line-height: 1;
                       background: ${pair.bg}; color: ${pair.text}; font-size: ${start.px}; font-weight: ${start.weight}">Sample</span>
        </td>
        ${cell('wcag', pair.key)}
        ${cell('apca', pair.key)}
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Text</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${SIZES.map((s) => `<button class="sp-segment" data-part="seg-${s.key}" value="${s.key}">${s.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <table class="sp-table" data-part="table" data-subject data-size="${START}"
               style="margin-top: 12px; --sp-cell-pad: 3px 8px">
          <thead>
            <tr>
              <th style="width: 156px">Pair</th>
              <th style="width: 122px">WCAG 2</th>
              <th style="width: 122px">APCA</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <p class="sp-text sp-context" data-part="thresholds"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.4">${start.note} ${TAIL}</p>
      </div>
    </div>
  `;

  const table = part(root, 'table');
  const thresholds = part(root, 'thresholds');

  const rescore = (key: string) => {
    const size = SIZES.find((s) => s.key === key);
    if (!size) return;
    table.dataset.size = key;
    thresholds.textContent = `${size.note} ${TAIL}`;

    for (const pair of PAIRS) {
      const value = ratio(pair.text, pair.bg);
      const score = lc(pair.text, pair.bg);
      const wcagPass = value >= size.wcag;
      const apcaPass = Math.abs(score) >= size.lc;

      const row = part(root, `row-${pair.key}`);
      row.dataset.wcag = wcagPass ? 'pass' : 'fail';
      row.dataset.apca = apcaPass ? 'pass' : 'fail';
      part(root, `wcag-${pair.key}`).textContent = `${value.toFixed(2)}:1`;
      part(root, `apca-${pair.key}`).textContent = `Lc ${Math.round(score)}`;
      // A verdict is never colour alone (WCAG 1.4.1): the glyph is the other half of it.
      part(root, `mark-wcag-${pair.key}`).innerHTML = icon(wcagPass ? 'check' : 'close');
      part(root, `mark-apca-${pair.key}`).innerHTML = icon(apcaPass ? 'check' : 'close');

      const sample = part(root, `sample-${pair.key}`);
      sample.style.fontSize = size.px;
      sample.style.fontWeight = size.weight;
    }
  };
  rescore(START);

  part(root, 'segmented').addEventListener('change', (event) => rescore((event as CustomEvent<string>).detail));
}
