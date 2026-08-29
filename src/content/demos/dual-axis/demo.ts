import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 426;
const H = 150;
const LEFT = 40;
const RIGHT = 40;
const TOP = 12;
const BOTTOM = 22;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
/** Revenue in thousands, read against the left axis, which never changes. */
const REVENUE = [312, 328, 341, 355, 369, 380, 394, 408];
/** Complaints, a count, read against whichever domain the right axis has been given. */
const COMPLAINTS = [88, 86, 90, 89, 93, 92, 96, 97];
const REVENUE_TOP = 480;
const SLOT = PLOT_W / MONTHS.length;
const BAR = 24;
/** Four evenly spaced rules, so the gridlines hold still and only their labels change. */
const TICKS = [0, 1 / 3, 2 / 3, 1];
/** Axes and gridlines are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
/** The complaint series, stated here for the reason `.sp-swatch` takes its paint from the
    demo: the kit has one accent on purpose, and two series cannot be drawn in it. */
const HUE = 'oklch(0.6 0.16 32)';

interface Scale {
  /** Whether a second axis exists at all in this state. */
  axes: 'dual' | 'single';
  from: number;
  to: number;
  readout: string;
  note: string;
}

const SCALES: Record<string, Scale> = {
  wide: {
    axes: 'dual',
    from: 0,
    to: 240,
    readout: 'Complaints look flat',
    note: 'Right axis 0 to 240. The complaint line lies low and almost flat under the bars, and the chart says complaints are a rounding error.',
  },
  tight: {
    axes: 'dual',
    from: 84,
    to: 102,
    readout: 'Complaints look steeper than revenue',
    note: 'Right axis 84 to 102. Not one number moved. The same eight counts now climb most of the plot, steeper than the bars, and the chart says complaints are outrunning revenue.',
  },
  single: {
    axes: 'single',
    from: 0,
    to: REVENUE_TOP,
    readout: 'One axis: nothing to compare',
    note: 'One axis, in thousands. Counts against currency lie flat at the bottom, which is the honest picture of two series that share no unit, and the reason a second axis is tempting.',
  },
};

const START = 'wide';

const centre = (index: number) => LEFT + index * SLOT + SLOT / 2;
const revenueY = (value: number) => BASE - (value / REVENUE_TOP) * PLOT_H;
const complaintY = (value: number, scale: Scale) => BASE - ((value - scale.from) / (scale.to - scale.from)) * PLOT_H;

/** Polyline plus its point markers, redrawn whenever the right domain changes. */
function series(scale: Scale): string {
  const points = COMPLAINTS.map((value, i) => `${centre(i).toFixed(1)},${complaintY(value, scale).toFixed(1)}`).join(' ');
  const dots = COMPLAINTS.map(
    (value, i) => `<circle cx="${centre(i).toFixed(1)}" cy="${complaintY(value, scale).toFixed(1)}" r="2.6" fill="${HUE}" />`,
  ).join('');
  return `<polyline points="${points}" fill="none" stroke="${HUE}" stroke-width="${RULE}" stroke-linecap="round" stroke-linejoin="round" />${dots}`;
}

/**
 * Dual axis specimen: revenue in thousands as bars against a left axis that never changes,
 * and a complaint count as a line against a right axis whose domain the segmented control
 * hands over. Not one datum moves in the whole pass. The bars are redrawn from the same
 * eight numbers every time, and only the right domain decides whether the complaint line
 * lies flat under them or climbs past them, which is the term: a second axis is a free knob
 * on the one comparison the reader came to make.
 *
 * The subject is the right-hand axis itself, its line and its tick labels, the narrowest
 * element the term names: the line it scales is what the knob acts on, and the card, the
 * legend and the picker are the scene around it. The specimen has to be able to show the
 * one-axis counter-example, so the axis declares the two-axis condition as its honest
 * condition in `data-pose`; identify refuses to ring an axis that is not there (SPEC §6).
 * It mounts dual, the state the pose asks for.
 *
 * Nothing reflows. The gridlines sit at fixed fractions of the plot in every state, the
 * bars never move at all, and the right axis leaves by opacity rather than by removal, so
 * the box the SVG occupies is the same in all three (SPEC §5). Each segment names an
 * absolute domain rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = SCALES[START] as Scale;

  const gridlines = TICKS.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const leftLabels = TICKS.map((f) => {
    const at = (BASE - f * PLOT_H + 3.5).toFixed(1);
    return `<text x="${LEFT - 7}" y="${at}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${Math.round(f * REVENUE_TOP)}</text>`;
  }).join('');

  const rightLabels = TICKS.map((f, i) => {
    const at = (BASE - f * PLOT_H + 3.5).toFixed(1);
    const value = first.from + f * (first.to - first.from);
    return `<text data-part="right-tick-${i}" x="${W - RIGHT + 7}" y="${at}" fill="var(--sp-muted)" font-size="10">${Math.round(value)}</text>`;
  }).join('');

  const bars = REVENUE.map((value, i) => {
    const y = revenueY(value);
    const x = (LEFT + i * SLOT + (SLOT - BAR) / 2).toFixed(1);
    return `<rect x="${x}" y="${y.toFixed(1)}" width="${BAR}" height="${(BASE - y).toFixed(1)}" rx="2" fill="var(--sp-accent)" />`;
  }).join('');

  const months = MONTHS.map(
    (month, i) =>
      `<text x="${centre(i).toFixed(1)}" y="${BASE + 15}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${month}</text>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Revenue, complaints</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="scale" data-axis="Scale" data-value="${START}">
            <button class="sp-segment" type="button" data-part="scale-wide" value="wide" style="padding: 5px 9px; font-size: 12px">0 to 240</button>
            <button class="sp-segment" type="button" data-part="scale-tight" value="tight" style="padding: 5px 9px; font-size: 12px">84 to 102</button>
            <button class="sp-segment" type="button" data-part="scale-single" value="single" style="padding: 5px 9px; font-size: 12px">One axis</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-row" style="gap: 10px">
                <span class="sp-row" style="gap: 5px">
                  <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: var(--sp-accent)"></span>
                  <span style="font-size: 11px">Revenue, thousands</span>
                </span>
                <span class="sp-row" style="gap: 5px">
                  <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: ${HUE}"></span>
                  <span style="font-size: 11px">Complaints</span>
                </span>
              </span>
              <span
                class="sp-label"
                data-part="readout"
                data-mode="${START}"
                style="width: 216px; text-align: right; font-size: 11px; color: var(--sp-ink)"
              >${first.readout}</span>
            </div>
            <svg
              data-part="plot"
              role="img"
              aria-label="Revenue as bars against a left axis and complaints as a line against a right axis scaled 0 to 240"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 8px"
            >
              ${gridlines}
              <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
              ${bars}
              <g data-part="series">${series(first)}</g>
              ${months}
              <g>
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${leftLabels}
              </g>
              <g
                data-part="right-axis"
                data-subject
                data-pose="[data-axes=dual]"
                data-axes="${first.axes}"
                style="opacity: 1; transition: opacity 0.2s"
              >
                <line x1="${W - RIGHT}" y1="${TOP}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${rightLabels}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${first.note}</span>
    </div>
  `;

  const axis = part(root, 'right-axis');
  const plot = part(root, 'plot');
  const line = part(root, 'series');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  const draw = (name: string) => {
    const scale = SCALES[name];
    if (!scale) return;
    axis.dataset.axes = scale.axes;
    axis.style.opacity = scale.axes === 'dual' ? '1' : '0';
    readout.dataset.mode = name;
    readout.textContent = scale.readout;
    note.textContent = scale.note;
    line.innerHTML = series(scale);
    plot.setAttribute(
      'aria-label',
      scale.axes === 'dual'
        ? `Revenue as bars against a left axis and complaints as a line against a right axis scaled ${scale.from} to ${scale.to}`
        : 'Revenue as bars and complaints as a line, both against one left axis in thousands',
    );
    for (const [i, f] of TICKS.entries()) {
      part(root, `right-tick-${i}`).textContent = String(Math.round(scale.from + f * (scale.to - scale.from)));
    }
  };

  part(root, 'scale').addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
}
