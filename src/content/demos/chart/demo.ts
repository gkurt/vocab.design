import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 426;
const H = 168;
const LEFT = 36;
const RIGHT = 10;
const TOP = 14;
const BOTTOM = 22;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const SLOT = PLOT_W / MONTHS.length;
const BAR = 30;
/** Four evenly spaced rules, so the gridlines hold still and only their labels change. */
const TICKS = [0, 1 / 3, 2 / 3, 1];
/** Gridlines and axes are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MOVE = 'transition: transform 0.45s var(--sp-ease)';

interface Series {
  label: string;
  legend: string;
  values: number[];
  max: number;
  target: number;
  tick: (value: number) => string;
  format: (value: number) => string;
}

const SERIES: Record<string, Series> = {
  revenue: {
    label: 'Revenue',
    legend: 'Revenue, thousands of pounds',
    values: [42, 55, 48, 61, 72, 84],
    max: 90,
    target: 70,
    tick: (v) => String(v),
    format: (v) => `£${v}k`,
  },
  signups: {
    label: 'Signups',
    legend: 'Signups, people',
    values: [310, 280, 420, 390, 505, 610],
    max: 750,
    target: 450,
    tick: (v) => String(v),
    format: (v) => String(v),
  },
};

const START = 'revenue';

const height = (value: number, max: number) => (value / max) * PLOT_H;
const y = (value: number, max: number) => BASE - height(value, max);
const centre = (index: number) => LEFT + index * SLOT + SLOT / 2;

/**
 * Chart specimen: six months of one series drawn as bars against a pair of scales, with
 * gridlines, a dashed target rule, a legend, and a value label on the peak.
 *
 * The subject is the plot itself, the SVG carrying the axes and the marks, rather than
 * the card it sits in: the term names the drawing of the data, and the card, the window
 * chrome and the series picker are the scene around it. The legend stays out of the
 * context register because it is chart apparatus rather than scenery; without it the
 * marks do not say what they stand for.
 *
 * The segmented control names a series outright rather than cycling, so a pass picked up
 * anywhere lands on the same reading (SPEC §8). Both series are honestly the term, so no
 * pose condition is needed. Nothing reflows on the switch: the gridlines sit at fixed
 * fractions of the plot in both scales, so only their labels, the bars, the target rule
 * and the value label move, all inside a box the SVG already occupies (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const first = SERIES[START] as Series;

  const gridlines = TICKS.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const tickLabels = TICKS.map((f, i) => {
    const at = (BASE - f * PLOT_H + 3.5).toFixed(1);
    const value = first.tick(Math.round(f * first.max));
    return `<text data-part="tick-${i}" x="${LEFT - 8}" y="${at}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${value}</text>`;
  }).join('');

  const bars = MONTHS.map((month, i) => {
    const value = first.values[i] ?? 0;
    const x = (LEFT + i * SLOT + (SLOT - BAR) / 2).toFixed(1);
    return `<rect
        data-part="bar-${month.toLowerCase()}"
        x="${x}" y="${y(value, first.max).toFixed(1)}" width="${BAR}" height="${height(value, first.max).toFixed(1)}"
        rx="3" fill="var(--sp-accent)"
        style="transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)"
      />`;
  }).join('');

  const months = MONTHS.map(
    (month, i) =>
      `<text x="${centre(i).toFixed(1)}" y="${BASE + 15}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${month}</text>`,
  ).join('');

  const peak = Math.max(...first.values);
  const peakAt = first.values.indexOf(peak);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Half year, Harbour Supply</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-revenue" value="revenue">Revenue</button>
            <button class="sp-segment" type="button" data-part="seg-signups" value="signups">Signups</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row" data-part="legend" style="gap: 16px; height: 17px">
              <span class="sp-row" style="gap: 6px">
                <span class="sp-swatch" style="width: 12px; height: 12px; border-radius: 3px; --sp-swatch: var(--sp-accent)"></span>
                <span data-part="legend-series" style="font-size: 11px">${first.legend}</span>
              </span>
              <span class="sp-row" style="gap: 6px">
                <span aria-hidden="true" style="width: 16px; height: ${RULE}px; background: repeating-linear-gradient(to right, var(--sp-muted) 0 5px, transparent 5px 9px)"></span>
                <span class="sp-label" data-part="legend-target" style="font-size: 11px">Target ${first.target}</span>
              </span>
            </div>
            <svg
              data-part="plot"
              data-subject
              data-series="${START}"
              data-peak="${peak}"
              role="img"
              aria-label="Monthly revenue for the last six months, peaking in June"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 8px"
            >
              ${gridlines}
              ${tickLabels}
              <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
              <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
              ${bars}
              ${months}
              <g data-part="target" style="transform-box: view-box; transform: translate(0, ${(y(first.target, first.max) - BASE).toFixed(1)}px); ${MOVE}">
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" stroke-dasharray="7 5" />
              </g>
              <g
                data-part="value-label"
                data-value="${peak}"
                style="transform-box: view-box; transform: translate(0, ${(y(peak, first.max) - BASE).toFixed(1)}px); ${MOVE}"
              >
                <text
                  data-part="value-text"
                  x="${centre(peakAt).toFixed(1)}" y="${BASE - 7}"
                  text-anchor="middle" fill="var(--sp-ink)" font-size="12" font-weight="600"
                >${first.format(peak)}</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;

  const plot = part(root, 'plot');
  const legendSeries = part(root, 'legend-series');
  const legendTarget = part(root, 'legend-target');
  const target = part(root, 'target');
  const valueLabel = part(root, 'value-label');
  const valueText = part(root, 'value-text');

  const draw = (name: string) => {
    const series = SERIES[name];
    if (!series) return;
    const top = Math.max(...series.values);
    plot.dataset.series = name;
    plot.dataset.peak = String(top);
    plot.setAttribute('aria-label', `Monthly ${series.label.toLowerCase()} for the last six months, peaking in June`);
    for (const [i, f] of TICKS.entries()) part(root, `tick-${i}`).textContent = series.tick(Math.round(f * series.max));
    for (const [i, month] of MONTHS.entries()) {
      const bar = part(root, `bar-${month.toLowerCase()}`);
      const value = series.values[i] ?? 0;
      bar.setAttribute('y', y(value, series.max).toFixed(1));
      bar.setAttribute('height', height(value, series.max).toFixed(1));
    }
    target.style.transform = `translate(0, ${(y(series.target, series.max) - BASE).toFixed(1)}px)`;
    valueLabel.dataset.value = String(top);
    valueLabel.style.transform = `translate(0, ${(y(top, series.max) - BASE).toFixed(1)}px)`;
    valueText.textContent = series.format(top);
    legendSeries.textContent = series.legend;
    legendTarget.textContent = `Target ${series.target}`;
  };

  part(root, 'switcher').addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
}
