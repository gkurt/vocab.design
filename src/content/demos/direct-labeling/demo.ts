import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 340;
const H = 150;
const LEFT = 28;
const RIGHT = 58;
const TOP = 12;
const BOTTOM = 22;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MAX = 60;
const STEP = PLOT_W / (MONTHS.length - 1);
/** Rules and axes are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;

/**
 * Three hues, stated here rather than taken from the kit, for the reason `.sp-swatch`
 * takes its paint from the demo: the kit has one accent on purpose, and a chart with
 * three series cannot be drawn in it.
 */
const SERIES = [
  { key: 'harbour', name: 'Harbour', hue: 'oklch(0.55 0.17 258)', values: [22, 28, 33, 38, 44, 51] },
  { key: 'kestrel', name: 'Kestrel', hue: 'oklch(0.6 0.16 32)', values: [40, 38, 35, 31, 27, 24] },
  { key: 'meridian', name: 'Meridian', hue: 'oklch(0.56 0.12 158)', values: [12, 16, 19, 24, 26, 33] },
] as const;

const READOUT = { direct: '0 trips to the key', legend: '3 trips to the key' } as const;

const NOTE = {
  direct: 'Each line says its own name where it ends, so the reader never leaves the plot to find out which is which.',
  legend: 'The key sits off to the side, so every line has to be carried across to a swatch and back: three trips out of the data.',
} as const;

type Mode = keyof typeof READOUT;

const START: Mode = 'direct';

const x = (index: number) => LEFT + index * STEP;
const y = (value: number) => BASE - (value / MAX) * PLOT_H;

/**
 * Direct labeling specimen: one three-series line chart named two ways. The lines, the
 * scale and the colours never move; the only thing that changes is where the three names
 * are written, in a key off to the side or at the end of each line.
 *
 * The subject is the group of end-of-line labels, the narrowest thing the term names: not
 * the lines they name and not the chart around them. The key's column and the labels' right
 * margin are both reserved in both states, so switching moves nothing (SPEC §5).
 *
 * The labels are hidden by opacity with no transition on them, deliberately. A subject
 * caught mid-fade counts as on its way to the stage, and a pose freezes the demo's clock
 * rather than the browser's transitions, so a ring taken during that fade would settle on
 * ink that finishes disappearing underneath it. There is no fade to catch: the key, which
 * is scenery here, is the only thing that eases. No `data-pose` either, because the
 * counter-example state does not leave a dishonest subject visible, it leaves no subject at
 * all, which is exactly what summon is for (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  const lines = SERIES.map((series) => {
    const points = series.values.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
    return `<polyline
        data-part="line-${series.key}"
        points="${points}"
        fill="none" stroke="${series.hue}" stroke-width="${RULE}" stroke-linecap="round" stroke-linejoin="round"
      />`;
  }).join('');

  const endpoints = SERIES.map((series) => {
    const last = series.values[series.values.length - 1] ?? 0;
    return `<circle cx="${x(MONTHS.length - 1).toFixed(1)}" cy="${y(last).toFixed(1)}" r="3" fill="${series.hue}" />`;
  }).join('');

  const endLabels = SERIES.map((series) => {
    const last = series.values[series.values.length - 1] ?? 0;
    return `<text
        data-part="label-${series.key}"
        x="${(x(MONTHS.length - 1) + 7).toFixed(1)}" y="${(y(last) + 3.5).toFixed(1)}"
        fill="${series.hue}" font-size="11" font-weight="600"
      >${series.name}</text>`;
  }).join('');

  const ticks = [0, 0.5, 1]
    .map((f) => {
      const at = (BASE - f * PLOT_H + 3.5).toFixed(1);
      return `<text x="${LEFT - 8}" y="${at}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${Math.round(f * MAX)}</text>`;
    })
    .join('');

  const months = MONTHS.map(
    (month, i) =>
      `<text x="${x(i).toFixed(1)}" y="${BASE + 15}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${month}</text>`,
  ).join('');

  const key = SERIES.map(
    (series) => `<span class="sp-row" style="gap: 6px">
        <span class="sp-swatch" style="width: 10px; height: 10px; border-radius: 2px; --sp-swatch: ${series.hue}"></span>
        <span style="font-size: 11px">${series.name}</span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Weekly orders</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-axis="Labelling" data-value="${START}">
            <button class="sp-segment" type="button" data-part="mode-legend" value="legend" style="padding: 5px 10px; font-size: 12px">Legend</button>
            <button class="sp-segment" type="button" data-part="mode-direct" value="direct" style="padding: 5px 10px; font-size: 12px">Direct labels</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-label sp-context" style="font-size: 11px">Three teams, six months</span>
              <span
                class="sp-label"
                data-part="readout"
                data-mode="${START}"
                style="width: 130px; text-align: right; font-size: 11px; color: var(--sp-ink)"
              >${READOUT[START]}</span>
            </div>
            <div class="sp-row" style="gap: 10px; align-items: flex-start; margin-top: 8px">
              <svg
                data-part="plot"
                role="img"
                aria-label="Weekly orders for Harbour, Kestrel and Meridian over six months"
                viewBox="0 0 ${W} ${H}"
                width="${W}"
                height="${H}"
                style="display: block; flex: 0 0 auto"
              >
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />
                ${ticks}
                ${months}
                ${lines}
                ${endpoints}
                <g data-part="labels" data-subject style="opacity: 1">${endLabels}</g>
              </svg>
              <div
                class="sp-stack"
                data-part="key"
                style="width: 84px; gap: 8px; padding-top: 6px; opacity: 0; transition: opacity 0.22s"
              >${key}</div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE[START]}</span>
    </div>
  `;

  const labels = part(root, 'labels');
  const keyColumn = part(root, 'key');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  const show = (mode: Mode) => {
    labels.style.opacity = mode === 'direct' ? '1' : '0';
    keyColumn.style.opacity = mode === 'legend' ? '1' : '0';
    readout.dataset.mode = mode;
    readout.textContent = READOUT[mode];
    note.textContent = NOTE[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'legend' ? 'legend' : 'direct');
  });
}
