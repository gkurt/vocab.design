import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 422;
const H = 140;
/** A wide left gutter, because the reference's own label lives in it, beside the axis. */
const LEFT = 72;
const RIGHT = 10;
const TOP = 14;
const BOTTOM = 20;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Rules are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MAX = 300;
const GRID = [0, 100, 200, 300];

/** Fourteen days of p95 page latency, in milliseconds. */
const VALUES = [168, 152, 181, 205, 174, 143, 158, 232, 268, 241, 196, 163, 149, 137];
const STEP = PLOT_W / (VALUES.length - 1);

const TARGET = 220;
const AVERAGE = Math.round(VALUES.reduce((sum, v) => sum + v, 0) / VALUES.length);
const BAND_LOW = 150;
const BAND_HIGH = 250;

const x = (index: number) => LEFT + index * STEP;
const y = (value: number) => BASE - (value / MAX) * PLOT_H;

interface Reference {
  /** Does this mark fail the standard the reference states? */
  breaches: (value: number) => boolean;
  tally: (count: number) => string;
  note: string;
}

const REFERENCES: Record<string, Reference> = {
  target: {
    breaches: (v) => v > TARGET,
    tally: (n) => `${n} of ${VALUES.length} days over target`,
    note: 'A target is a constant somebody committed to, so every mark reads as met or missed.',
  },
  average: {
    breaches: (v) => v > AVERAGE,
    tally: (n) => `${n} of ${VALUES.length} days above the mean`,
    note: 'A mean is derived from the series, so it moves when the data does. Still a reference.',
  },
  band: {
    breaches: (v) => v < BAND_LOW || v > BAND_HIGH,
    tally: (n) => `${n} of ${VALUES.length} days outside budget`,
    note: 'A band is a reference with a tolerance, for a standard that is honestly a range.',
  },
};

const KINDS = ['target', 'average', 'band'];
const START = 'target';

/** The label pill, drawn in the gutter and centred on the line it names. */
const tag = (value: number, text: string) => `
  <rect
    x="2" y="${(y(value) - 9).toFixed(1)}" width="66" height="18" rx="9"
    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${RULE}"
  />
  <text
    x="35" y="${(y(value) + 3.5).toFixed(1)}"
    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
  >${text}</text>`;

const rule = (value: number) => `
  <line
    x1="${LEFT}" y1="${y(value).toFixed(1)}" x2="${W - RIGHT}" y2="${y(value).toFixed(1)}"
    stroke="var(--sp-accent)" stroke-width="${RULE}" stroke-dasharray="7 5"
  />`;

/**
 * Reference line specimen: fourteen days of p95 latency drawn plainly, carrying one
 * standard at a time, picked absolutely: a committed target, the series' own mean, and a
 * budget band. Each mark that fails the current standard is drawn filled rather than
 * hollow, and the tally in the title bar counts them, which is the whole argument for the
 * component: the line is what turns a row of numbers into a verdict.
 *
 * The subject is the reference, `data-part="reference"`, meaning the rule (or the band's
 * pair of rules) together with the label pill that names its value. Whichever standard is
 * up, the subject is exactly that standard's ink, since the two that are down carry the
 * `hidden` attribute and contribute no box. The series, the axis and the gridlines sit in
 * the context register, so the reference is the only accent on the plot.
 *
 * The label sits in the left gutter beside the axis rather than over the plot: a reference
 * is anchored to the axis, not to a mark, and a pill drawn inside the plot would sooner or
 * later cover the data it is there to be compared against. All three standards are honest
 * references, so no pose condition is needed (SPEC §6), and each is drawn inside the box
 * the SVG already occupies, so switching moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const gridlines = GRID.map((value) => {
    const at = y(value).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  // Only the extremes are labelled: the numbers a reader needs in the middle of this
  // plot are the ones the reference itself prints.
  const extremes = [0, MAX]
    .map(
      (value) =>
        `<text x="${LEFT - 6}" y="${(y(value) + 3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${value}</text>`,
    )
    .join('');

  const line = VALUES.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ');

  const dots = VALUES.map(
    (value, i) => `
      <circle
        data-mark="${i}" data-value="${value}"
        cx="${x(i).toFixed(1)}" cy="${y(value).toFixed(1)}" r="3.4"
        fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${RULE}"
      />`,
  ).join('');

  const days = [0, 4, 9, 13]
    .map((i) => `<text x="${x(i).toFixed(1)}" y="${BASE + 14}" text-anchor="middle" fill="var(--sp-muted)" font-size="9">${i + 1}</text>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page latency</span>
          <span
            class="sp-label"
            data-part="tally"
            data-kind="${START}"
            data-out="0"
            role="status"
            style="width: 172px; text-align: right; font-size: 12px; white-space: nowrap"
          ></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">p95 response, ms</span>
              <span class="sp-label" style="font-size: 11px">Fourteen days, to yesterday</span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Daily p95 latency over fourteen days, mostly between 140 and 270 milliseconds"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${gridlines}
                ${extremes}
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                <polyline
                  points="${line}"
                  fill="none" stroke="var(--sp-accent)" stroke-width="${RULE}"
                  stroke-linejoin="round" stroke-linecap="round"
                />
                ${dots}
                ${days}
              </g>

              <g data-part="reference" data-subject data-kind="${START}">
                <g data-part="ref-target">
                  ${rule(TARGET)}
                  ${tag(TARGET, `Target ${TARGET}`)}
                </g>

                <g data-part="ref-average" hidden>
                  ${rule(AVERAGE)}
                  ${tag(AVERAGE, `Mean ${AVERAGE}`)}
                </g>

                <g data-part="ref-band" hidden>
                  <rect
                    x="${LEFT}" y="${y(BAND_HIGH).toFixed(1)}"
                    width="${PLOT_W}" height="${(y(BAND_LOW) - y(BAND_HIGH)).toFixed(1)}"
                    fill="var(--sp-accent)" fill-opacity="0.12"
                  />
                  ${rule(BAND_HIGH)}
                  ${rule(BAND_LOW)}
                  ${tag(BAND_HIGH, `Max ${BAND_HIGH}`)}
                  ${tag(BAND_LOW, `Min ${BAND_LOW}`)}
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-target" value="target" style="padding: 4px 10px; font-size: 12px">Target</button>
          <button class="sp-segment" type="button" data-part="seg-average" value="average" style="padding: 4px 10px; font-size: 12px">Mean</button>
          <button class="sp-segment" type="button" data-part="seg-band" value="band" style="padding: 4px 10px; font-size: 12px">Band</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-kind="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        ></span>
      </div>
    </div>
  `;

  const reference = part(root, 'reference');
  const tally = part(root, 'tally');
  const note = part(root, 'note');
  const groups = KINDS.map((kind) => part(root, `ref-${kind}`));
  const marks = [...root.querySelectorAll<SVGCircleElement>('[data-mark]')];

  const setKind = (kind: string) => {
    const spec = REFERENCES[kind];
    if (!spec) return;
    reference.dataset.kind = kind;
    for (const [i, group] of groups.entries()) {
      if (KINDS[i] === kind) group.removeAttribute('hidden');
      else group.setAttribute('hidden', '');
    }

    let breached = 0;
    for (const mark of marks) {
      const failed = spec.breaches(Number(mark.dataset.value));
      if (failed) breached += 1;
      mark.setAttribute('fill', failed ? 'var(--sp-accent)' : 'var(--sp-surface)');
      mark.setAttribute('r', failed ? '4.2' : '3.4');
    }

    tally.dataset.kind = kind;
    tally.dataset.out = String(breached);
    tally.textContent = spec.tally(breached);
    note.dataset.kind = kind;
    note.textContent = spec.note;
  };

  part(root, 'picker').addEventListener('change', (event) => setKind((event as CustomEvent<string>).detail));

  setKind(START);
}
