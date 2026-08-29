import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 422;
const H = 140;
const LEFT = 64;
const RIGHT = 14;
const TOP = 10;
const BOTTOM = 22;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Rules and whiskers are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
/** How far a whisker's end cap reaches either side of the row, in pixels. */
const CAP = 6;
const MAX = 8;
const TICKS = [0, 2, 4, 6, 8];

interface Variant {
  key: string;
  label: string;
  estimate: number;
  low: number;
  high: number;
}

/** Conversion rate per variant, in per cent, with 95 per cent intervals. */
const VARIANTS: Variant[] = [
  { key: 'control', label: 'Control', estimate: 4.1, low: 3.4, high: 4.8 },
  { key: 'blue', label: 'Blue', estimate: 4.9, low: 4.2, high: 5.6 },
  { key: 'copy', label: 'Copy', estimate: 3.2, low: 2.9, high: 3.5 },
  { key: 'both', label: 'Both', estimate: 5.4, low: 4.0, high: 6.8 },
];

/** The one whose lead over the control is entirely inside the noise. */
const SUBJECT = 'blue';

const ROW = PLOT_H / VARIANTS.length;
const x = (value: number) => LEFT + (value / MAX) * PLOT_W;
const row = (index: number) => TOP + (index + 0.5) * ROW;

const MODES = ['bare', 'bars', 'band'];
const START = 'bars';

const BASIS: Record<string, string> = {
  bare: 'Point estimates only',
  bars: '95 per cent intervals',
  band: '95 per cent intervals',
};

const VERDICT: Record<string, string> = {
  bare: 'Blue ahead by 0.8 points',
  bars: 'Blue ahead by 0.8, ranges overlap',
  band: 'Blue ahead by 0.8, ranges overlap',
};

const NOTE: Record<string, string> = {
  bare: 'Four dots, four numbers, and a chart implying it measured every one exactly.',
  bars: 'Blue and Control overlap, so this chart does not settle which one is better.',
  band: 'A shaded band states the same range without a picket fence of end caps.',
};

const whisker = (v: Variant, cy: number) => `
  <line x1="${x(v.low).toFixed(1)}" y1="${cy}" x2="${x(v.high).toFixed(1)}" y2="${cy}" stroke="var(--sp-accent)" stroke-width="${RULE}" />
  <line
    x1="${x(v.low).toFixed(1)}" y1="${cy - CAP}" x2="${x(v.low).toFixed(1)}" y2="${cy + CAP}"
    stroke="var(--sp-accent)" stroke-width="${RULE}"
  />
  <line
    x1="${x(v.high).toFixed(1)}" y1="${cy - CAP}" x2="${x(v.high).toFixed(1)}" y2="${cy + CAP}"
    stroke="var(--sp-accent)" stroke-width="${RULE}"
  />`;

const band = (v: Variant, cy: number) => `
  <rect
    x="${x(v.low).toFixed(1)}" y="${cy - 7}" width="${(x(v.high) - x(v.low)).toFixed(1)}" height="14" rx="7"
    fill="var(--sp-accent)" fill-opacity="0.2" stroke="var(--sp-accent)" stroke-width="1" stroke-opacity="0.5"
  />`;

const interval = (v: Variant, index: number, subject: boolean) => `
  <g data-part="interval-${v.key}"${subject ? ' data-subject' : ''}>
    <g data-part="whisk-${v.key}">${whisker(v, row(index))}</g>
    <g data-part="band-${v.key}" hidden>${band(v, row(index))}</g>
  </g>`;

/**
 * Error bar specimen: a four variant conversion test drawn as a dot plot, with each
 * estimate's 95 per cent interval shown as whiskers, as a shaded band, or not at all. The
 * two variants at the top are arranged so that the winner's lead is obvious from the dots
 * and entirely inside the noise once the intervals are drawn, which is the whole reason
 * the component exists.
 *
 * The subject is one error bar, `data-part="interval-blue"`: the interval belonging to the
 * variant whose lead the bars overturn, and nothing else. Whichever form is up, that group
 * holds exactly the interval's ink, since the form that is down carries the `hidden`
 * attribute and contributes no box. Its box is a real one, twelve pixels of end cap by the
 * width of the interval, so a claim about it is never a claim about a hairline. The other
 * three intervals, the dots, the axis and the row labels are the chart the bar is drawn on
 * and sit in the context register.
 *
 * The bare state is honestly the same chart without its uncertainty, which is why it is a
 * state rather than a second plot: it costs no ink and no room, and the reader watches one
 * chart change its mind. Nothing moves between states, since every form is drawn inside
 * the box the SVG already occupies (SPEC §5), and the mount state is the one carrying the
 * bars, so the resting pose is of the term rather than of its absence.
 */
export function mount(root: HTMLElement): void {
  const gridlines = TICKS.map(
    (value) =>
      `<line x1="${x(value).toFixed(1)}" y1="${TOP}" x2="${x(value).toFixed(1)}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />`,
  ).join('');

  const tickLabels = TICKS.map(
    (value) =>
      `<text x="${x(value).toFixed(1)}" y="${BASE + 14}" text-anchor="middle" fill="var(--sp-muted)" font-size="9">${value}</text>`,
  ).join('');

  const labels = VARIANTS.map(
    (v, i) =>
      `<text x="${LEFT - 10}" y="${(row(i) + 3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-ink)" font-size="10">${v.label}</text>`,
  ).join('');

  const others = VARIANTS.map((v, i) => (v.key === SUBJECT ? '' : interval(v, i, false))).join('');
  const mine = VARIANTS.map((v, i) => (v.key === SUBJECT ? interval(v, i, true) : '')).join('');

  const dots = VARIANTS.map(
    (v, i) => `<circle cx="${x(v.estimate).toFixed(1)}" cy="${row(i).toFixed(1)}" r="4" fill="var(--sp-accent)" />`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout test</span>
          <span
            class="sp-label"
            data-part="verdict"
            data-mode="${START}"
            role="status"
            style="width: 196px; text-align: right; font-size: 12px; white-space: nowrap"
          ></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">Conversion rate, per cent</span>
              <span
                class="sp-label"
                data-part="basis"
                data-mode="${START}"
                style="width: 132px; text-align: right; font-size: 11px; white-space: nowrap"
              ></span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Conversion rate for four checkout variants, each between three and six per cent"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${gridlines}
                ${tickLabels}
                ${labels}
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${others}
              </g>

              ${mine}

              <g class="sp-context">${dots}</g>
            </svg>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-axis="Uncertainty" data-part="picker" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-bare" value="bare" style="padding: 4px 10px; font-size: 12px">Bare</button>
          <button class="sp-segment" type="button" data-part="seg-bars" value="bars" style="padding: 4px 10px; font-size: 12px">Error bars</button>
          <button class="sp-segment" type="button" data-part="seg-band" value="band" style="padding: 4px 10px; font-size: 12px">Band</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-mode="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        ></span>
      </div>
    </div>
  `;

  const verdict = part(root, 'verdict');
  const basis = part(root, 'basis');
  const note = part(root, 'note');
  const forms = VARIANTS.flatMap((v) => [
    { mode: 'bars', el: part(root, `whisk-${v.key}`) },
    { mode: 'band', el: part(root, `band-${v.key}`) },
  ]);

  const setMode = (mode: string) => {
    if (!MODES.includes(mode)) return;
    for (const form of forms) {
      if (form.mode === mode) form.el.removeAttribute('hidden');
      else form.el.setAttribute('hidden', '');
    }
    verdict.dataset.mode = mode;
    verdict.textContent = VERDICT[mode] ?? '';
    basis.dataset.mode = mode;
    basis.textContent = BASIS[mode] ?? '';
    note.dataset.mode = mode;
    note.textContent = NOTE[mode] ?? '';
  };

  part(root, 'picker').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode(START);
}
