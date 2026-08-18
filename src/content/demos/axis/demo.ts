import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 424;
const H = 140;
const LEFT = 48;
const RIGHT = 10;
const TOP = 12;
const BOTTOM = 22;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Gridlines and rules are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MOVE = 'transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)';

const PACKAGES = [
  { name: 'core', value: 3 },
  { name: 'icons', value: 26 },
  { name: 'forms', value: 140 },
  { name: 'charts', value: 900 },
  { name: 'editor', value: 3200 },
  { name: 'bundle', value: 8600 },
];

const SLOT = PLOT_W / PACKAGES.length;
const BAR = 34;
/** Five evenly spaced lines in every scale, so changing scale relabels the axis without moving it. */
const SLOTS = [0, 0.25, 0.5, 0.75, 1];

interface Scale {
  domain: string;
  step: string;
  /** The value this fraction of the axis stands for. */
  tick: (fraction: number) => number;
  height: (value: number) => number;
  note: string;
}

const SCALES: Record<string, Scale> = {
  raw: {
    domain: '0 to 8,600',
    step: '2,150',
    tick: (f) => Math.round(f * 8600),
    height: (v) => (v / 8600) * PLOT_H,
    note: 'Ticks straight off the data: every label is an accident of the maximum.',
  },
  nice: {
    domain: '0 to 10,000',
    step: '2,500',
    tick: (f) => Math.round(f * 10000),
    height: (v) => (v / 10000) * PLOT_H,
    note: 'A rounded domain: round labels, bought with headroom above the tallest bar.',
  },
  log: {
    domain: '1 to 10,000',
    step: 'x10',
    tick: (f) => Math.round(10 ** (f * 4)),
    height: (v) => (Math.log10(v) / 4) * PLOT_H,
    note: 'Each line ten times the last, which is what makes the small bars readable.',
  },
};

const START = 'raw';

const fmt = (value: number) => value.toLocaleString('en-GB');
const centre = (index: number) => LEFT + index * SLOT + SLOT / 2;

/**
 * Axis specimen: one plain bar chart whose value axis is re-derived three ways, from the
 * data's own extent, onto a rounded domain, and onto a log scale, with the domain and the
 * step between ticks printed beside it.
 *
 * The subject is the axis itself, `data-part="axis"`: the ruled edge with its tick marks
 * and tick labels, and nothing else. The bars, the gridlines, the category edge along the
 * bottom and the scale picker are the chart the axis is drawn for, which is why the bars
 * sit in the context register and the axis keeps the ink. All three scales are honest
 * axes, so no pose condition is needed (SPEC §6).
 *
 * Every scale prints five ticks at the same five fractions of the plot, so switching
 * scale moves no line and no label: only the numbers on them change, and the bars, inside
 * a box the SVG already occupies (SPEC §5). That is also what makes the log scale legible
 * as a claim rather than a redraw, since the three smallest packages go from nothing at
 * all to readable heights without the frame around them shifting a pixel.
 */
export function mount(root: HTMLElement): void {
  const first = SCALES[START] as Scale;

  const gridlines = SLOTS.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const ticks = SLOTS.map((f, i) => {
    const at = BASE - f * PLOT_H;
    const value = first.tick(f);
    return `
      <line x1="${LEFT - 5}" y1="${at.toFixed(1)}" x2="${LEFT}" y2="${at.toFixed(1)}" stroke="var(--sp-ink)" stroke-width="${RULE}" />
      <text
        data-part="tick-${i}"
        data-value="${value}"
        x="${LEFT - 10}" y="${(at + 3.5).toFixed(1)}"
        text-anchor="end" fill="var(--sp-ink)" font-size="10"
        style="font-variant-numeric: tabular-nums"
      >${fmt(value)}</text>`;
  }).join('');

  const bars = PACKAGES.map((pkg, i) => {
    const h = Math.max(0, first.height(pkg.value));
    const x = (LEFT + i * SLOT + (SLOT - BAR) / 2).toFixed(1);
    return `<rect
        data-part="bar-${pkg.name}"
        x="${x}" y="${(BASE - h).toFixed(1)}" width="${BAR}" height="${h.toFixed(1)}"
        rx="3" fill="var(--sp-accent)" style="${MOVE}"
      />`;
  }).join('');

  const names = PACKAGES.map(
    (pkg, i) =>
      `<text x="${centre(i).toFixed(1)}" y="${BASE + 14}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${pkg.name}</text>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bundle audit</span>
          <span class="sp-label" style="font-size: 12px">Six packages</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 17px">
              <span class="sp-label">Package size, kB</span>
              <span class="sp-row" style="gap: 8px">
                <span class="sp-label">Domain</span>
                <span
                  data-part="domain"
                  data-scale="${START}"
                  style="width: 76px; text-align: right; font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums"
                >${first.domain}</span>
                <span class="sp-label">Step</span>
                <span
                  data-part="step"
                  style="width: 38px; text-align: right; font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums"
                >${first.step}</span>
              </span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Six package sizes in kilobytes, from three up to eight thousand six hundred"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 6px"
            >
              ${gridlines}
              <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
              <g class="sp-context">${bars}</g>
              ${names}
              <g data-part="axis" data-subject data-scale="${START}">
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-ink)" stroke-width="${RULE}" />
                ${ticks}
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-raw" value="raw" style="padding: 4px 10px; font-size: 12px">Data extent</button>
          <button class="sp-segment" type="button" data-part="seg-nice" value="nice" style="padding: 4px 10px; font-size: 12px">Nice scale</button>
          <button class="sp-segment" type="button" data-part="seg-log" value="log" style="padding: 4px 10px; font-size: 12px">Log</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-scale="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${first.note}</span>
      </div>
    </div>
  `;

  const axis = part(root, 'axis');
  const domain = part(root, 'domain');
  const step = part(root, 'step');
  const note = part(root, 'note');

  const setScale = (name: string) => {
    const scale = SCALES[name];
    if (!scale) return;
    axis.dataset.scale = name;
    domain.dataset.scale = name;
    domain.textContent = scale.domain;
    step.textContent = scale.step;
    for (const [i, f] of SLOTS.entries()) {
      const label = part(root, `tick-${i}`);
      const value = scale.tick(f);
      label.dataset.value = String(value);
      label.textContent = fmt(value);
    }
    for (const pkg of PACKAGES) {
      const bar = part(root, `bar-${pkg.name}`);
      const h = Math.max(0, scale.height(pkg.value));
      bar.setAttribute('y', (BASE - h).toFixed(1));
      bar.setAttribute('height', h.toFixed(1));
    }
    note.dataset.scale = name;
    note.textContent = scale.note;
  };

  part(root, 'picker').addEventListener('change', (event) => setScale((event as CustomEvent<string>).detail));

  setScale(START);
}
