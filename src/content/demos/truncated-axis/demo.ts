import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 426;
const H = 150;
const LEFT = 42;
const RIGHT = 10;
const TOP = 12;
const BOTTOM = 24;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const VALUES = [46.8, 47.4, 48.0, 48.4];
const SLOT = PLOT_W / QUARTERS.length;
const BAR = 44;
/** Four evenly spaced rules, so the gridlines hold still and only their labels change. */
const TICKS = [0, 1 / 3, 2 / 3, 1];
/** Axes and gridlines are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MOVE = 'transition: transform 0.45s var(--sp-ease)';

interface Scale {
  from: number;
  to: number;
  label: (fraction: number) => string;
  readout: string;
  note: string;
}

const SCALES: Record<string, Scale> = {
  truncated: {
    from: 46.4,
    to: 48.8,
    label: (f) => (46.4 + f * 2.4).toFixed(1),
    readout: 'Last bar drawn 5.0x the first',
    note: 'Cut at 46.4 the four bars fan out. Share rose 3.4 percent across the year, and the last bar is drawn five times the height of the first.',
  },
  zero: {
    from: 0,
    to: 60,
    label: (f) => String(Math.round(f * 60)),
    readout: 'Last bar drawn 1.03x the first',
    note: 'From zero the same four numbers are the same four numbers: a 3.4 percent rise, drawn at the length a 3.4 percent rise has.',
  },
};

const START = 'truncated';

const height = (value: number, scale: Scale) => Math.max(0, ((value - scale.from) / (scale.to - scale.from)) * PLOT_H);
const centre = (index: number) => LEFT + index * SLOT + SLOT / 2;

/**
 * Truncated axis specimen: one bar series drawn against two domains, a zero baseline and a
 * baseline cut just under the smallest bar, with a read-out naming the exaggeration the cut
 * invents. The bars, the values, and the category labels never change; only the axis domain
 * does, which is the whole claim.
 *
 * The subject is the value axis itself (its line and its tick labels), the narrowest element
 * the term names: the bars are what the truncation acts on and the card, the topbar and the
 * picker are the scene around it. Because the specimen must be able to show the zero-based
 * counter-example, the axis declares truncation as its honest condition in `data-pose`, so
 * identify refuses to ring the zero-based axis, which would be a picture of the opposite
 * word (SPEC §6). It mounts truncated, the state the pose asks for.
 *
 * Nothing reflows on the switch. The gridlines sit at fixed fractions of the plot in both
 * domains, so only their labels, the bar geometry and the value labels move, all inside the
 * box the SVG already occupies (SPEC §5). Each segment names an absolute domain rather than
 * flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = SCALES[START] as Scale;

  const gridlines = TICKS.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const tickLabels = TICKS.map((f, i) => {
    const at = (BASE - f * PLOT_H + 3.5).toFixed(1);
    return `<text data-part="tick-${i}" x="${LEFT - 8}" y="${at}" text-anchor="end" fill="var(--sp-muted)" font-size="10">${first.label(f)}</text>`;
  }).join('');

  const bars = QUARTERS.map((quarter, i) => {
    const value = VALUES[i] ?? 0;
    const h = height(value, first);
    const x = (LEFT + i * SLOT + (SLOT - BAR) / 2).toFixed(1);
    return `<rect
        data-part="bar-${quarter.toLowerCase()}"
        x="${x}" y="${(BASE - h).toFixed(1)}" width="${BAR}" height="${h.toFixed(1)}"
        rx="3" fill="var(--sp-accent)"
        style="transition: y 0.45s var(--sp-ease), height 0.45s var(--sp-ease)"
      />`;
  }).join('');

  const valueLabels = QUARTERS.map((quarter, i) => {
    const value = VALUES[i] ?? 0;
    return `<g
        data-part="value-${quarter.toLowerCase()}"
        style="transform-box: view-box; transform: translate(0, ${(-height(value, first)).toFixed(1)}px); ${MOVE}"
      >
        <text x="${centre(i).toFixed(1)}" y="${BASE - 6}" text-anchor="middle" fill="var(--sp-ink)" font-size="10">${value.toFixed(1)}</text>
      </g>`;
  }).join('');

  const categories = QUARTERS.map(
    (quarter, i) =>
      `<text x="${centre(i).toFixed(1)}" y="${BASE + 16}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${quarter}</text>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 257px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Handset share, %</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="domain" data-value="${START}" data-axis="Y axis" data-term="truncated">
            <button class="sp-segment" type="button" data-part="domain-zero" value="zero" style="padding: 5px 10px; font-size: 12px">From zero</button>
            <button class="sp-segment" type="button" data-part="domain-truncated" value="truncated" style="padding: 5px 10px; font-size: 12px">Cut at 46.4</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-label sp-context" style="font-size: 11px">Q1 to Q4, actual change +3.4%</span>
              <span
                class="sp-label"
                data-part="readout"
                data-mode="${START}"
                style="width: 190px; text-align: right; font-size: 11px; color: var(--sp-ink)"
              >${first.readout}</span>
            </div>
            <svg
              data-part="plot"
              role="img"
              aria-label="Handset share by quarter, four bars, drawn against an axis cut at 46.4 percent"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 8px"
            >
              ${gridlines}
              <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
              ${bars}
              ${valueLabels}
              ${categories}
              <g data-part="axis" data-subject data-pose="[data-mode=truncated]" data-mode="${START}">
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${tickLabels}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${first.note}</span>
    </div>
  `;

  const axis = part(root, 'axis');
  const plot = part(root, 'plot');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  const draw = (name: string) => {
    const scale = SCALES[name];
    if (!scale) return;
    axis.dataset.mode = name;
    readout.dataset.mode = name;
    readout.textContent = scale.readout;
    note.textContent = scale.note;
    plot.setAttribute(
      'aria-label',
      name === 'zero'
        ? 'Handset share by quarter, four bars, drawn against an axis starting at zero'
        : 'Handset share by quarter, four bars, drawn against an axis cut at 46.4 percent',
    );
    for (const [i, f] of TICKS.entries()) part(root, `tick-${i}`).textContent = scale.label(f);
    for (const [i, quarter] of QUARTERS.entries()) {
      const value = VALUES[i] ?? 0;
      const h = height(value, scale);
      const bar = part(root, `bar-${quarter.toLowerCase()}`);
      bar.setAttribute('y', (BASE - h).toFixed(1));
      bar.setAttribute('height', h.toFixed(1));
      part(root, `value-${quarter.toLowerCase()}`).style.transform = `translate(0, ${(-h).toFixed(1)}px)`;
    }
  };

  part(root, 'domain').addEventListener('change', (event) => draw((event as CustomEvent<string>).detail));
}
