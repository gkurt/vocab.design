import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 424;
const H = 152;
const LEFT = 34;
const RIGHT = 12;
const TOP = 14;
const BOTTOM = 26;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Rules and marks are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
/** The top of the value scale, in thousands of units. */
const CEILING = 50;

const BARS = [
  { key: 'mar', label: 'Mar', value: 28 },
  { key: 'apr', label: 'Apr', value: 34 },
  { key: 'may', label: 'May', value: 31 },
  { key: 'jun', label: 'Jun', value: 42 },
  { key: 'jul', label: 'Jul', value: 47 },
];

const SLOT = PLOT_W / BARS.length;
const BAR = 34;
/** How far the fake extrusion pushes each bar back and up. */
const DEPTH = 8;
const GRID = [0, 0.25, 0.5, 0.75, 1];

const barX = (index: number) => LEFT + index * SLOT + (SLOT - BAR) / 2;
const barH = (value: number) => (value / CEILING) * PLOT_H;
const barY = (value: number) => BASE - barH(value);

/**
 * Every mark in the decoration layer, counted so the read-out can be honest: the
 * backdrop and its hatch, one gridline per rule, three pieces of fake solidity per bar
 * (cast shadow, lit top, dark side), the clip art with its word, and the heavy frame.
 */
const JUNK_COUNT = 2 + GRID.length + BARS.length * 3 + 2 + 1;

const NOTES: Record<string, string> = {
  laden: `Non-data ink: ${JUNK_COUNT} marks wrapped around 5 numbers.`,
  stripped: `All ${JUNK_COUNT} erased. Every one of the 5 numbers survived it.`,
};

/** A twelve-point clip-art burst, the mark a chart grows when a slide looks empty. */
function burst(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 24; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / 12 - Math.PI / 2;
    points.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return points.join(' ');
}

/**
 * Chartjunk specimen: one small bar chart delivered twice. It mounts laden with the ink a
 * chart wizard adds for free (a gradient sky behind the plot, a hatch over it, a thicket of
 * gridlines, a cast shadow and two fake extrusion faces per bar, a clip-art burst, and a
 * frame heavy enough to be a picture rail), then hands back the same five numbers with the
 * marks and one axis left standing. A read-out counts what went.
 *
 * The subject is the decoration layer itself, `data-part="junk"`, because chartjunk *is*
 * the non-data ink and nothing narrower is it: the bars, the axis and the category names
 * are the chart the junk was laid over, so they sit in the context register (SPEC §5).
 *
 * The stripped state is the counter-example the term needs but is not the term, so the
 * subject carries `data-pose="[data-mode=laden]"` and mounts laden: identify refuses to ring
 * a decoration layer that has been erased, and plays on until the script restores it
 * (SPEC §6). Only opacity moves, so nothing in the chart shifts when the ink goes.
 *
 * The paint is inline because the junk is the term. The kit has one accent, no gradients
 * and no hatch, so a chart junked out of kit tokens would be demonstrating the kit.
 */
export function mount(root: HTMLElement): void {
  const gridlines = GRID.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}"
      stroke="#7a5ad6" stroke-width="3" stroke-dasharray="7 4" opacity="0.6" />`;
  }).join('');

  const solids = BARS.map((bar, i) => {
    const x = barX(i);
    const y = barY(bar.value);
    const top = `${x},${y} ${x + DEPTH},${y - DEPTH} ${x + BAR + DEPTH},${y - DEPTH} ${x + BAR},${y}`;
    const side = `${x + BAR},${y} ${x + BAR + DEPTH},${y - DEPTH} ${x + BAR + DEPTH},${BASE - DEPTH} ${x + BAR},${BASE}`;
    return `
      <ellipse cx="${(x + BAR / 2 + 5).toFixed(1)}" cy="${BASE + 4}" rx="${BAR / 2 + 5}" ry="3.5" fill="rgb(16 24 40 / 0.26)" />
      <polygon points="${top}" fill="url(#cj-top)" />
      <polygon points="${side}" fill="url(#cj-side)" />`;
  }).join('');

  const bars = BARS.map((bar, i) => {
    const h = barH(bar.value);
    return `<rect
        data-part="bar-${bar.key}"
        x="${barX(i).toFixed(1)}" y="${barY(bar.value).toFixed(1)}" width="${BAR}" height="${h.toFixed(1)}"
        fill="var(--sp-accent)"
      />`;
  }).join('');

  const names = BARS.map(
    (bar, i) =>
      `<text x="${(barX(i) + BAR / 2).toFixed(1)}" y="${BASE + 15}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${bar.label}</text>`,
  ).join('');

  const ticks = [0, 0.5, 1]
    .map((f) => {
      const at = BASE - f * PLOT_H;
      return `
        <line x1="${LEFT - 5}" y1="${at.toFixed(1)}" x2="${LEFT}" y2="${at.toFixed(1)}" stroke="var(--sp-ink)" stroke-width="${RULE}" />
        <text x="${LEFT - 9}" y="${(at + 3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-ink)" font-size="9"
          style="font-variant-numeric: tabular-nums">${Math.round(f * CEILING)}</text>`;
    })
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Units shipped, thousands</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Version" data-term="laden" data-part="picker" data-value="laden">
            <button class="sp-segment" type="button" data-part="seg-laden" value="laden" style="padding: 4px 10px; font-size: 12px">
              as delivered
            </button>
            <button class="sp-segment" type="button" data-part="seg-stripped" value="stripped" style="padding: 4px 10px; font-size: 12px">
              ink erased
            </button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; width: 444px; padding: 8px 9px">
            <svg
              data-part="plot"
              role="img"
              aria-label="Units shipped over five months, rising from twenty eight to forty seven thousand"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block"
            >
              <defs>
                <linearGradient id="cj-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#b9d6ff" />
                  <stop offset="1" stop-color="#ffd2e8" />
                </linearGradient>
                <linearGradient id="cj-top" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#a4bbff" />
                  <stop offset="1" stop-color="#5d7ced" />
                </linearGradient>
                <linearGradient id="cj-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#3f56c4" />
                  <stop offset="1" stop-color="#232f78" />
                </linearGradient>
                <pattern id="cj-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="9" stroke="#ffffff" stroke-width="3.4" opacity="0.55" />
                </pattern>
              </defs>

              <g data-part="junk" data-subject data-pose="[data-mode=laden]" data-mode="laden" style="transition: opacity 0.4s var(--sp-ease)">
                <rect x="${LEFT}" y="${TOP}" width="${PLOT_W}" height="${PLOT_H}" fill="url(#cj-sky)" />
                <rect x="${LEFT}" y="${TOP}" width="${PLOT_W}" height="${PLOT_H}" fill="url(#cj-hatch)" />
                ${gridlines}
                ${solids}
                <polygon points="${burst(80, 40, 24, 12)}" fill="#ffb020" stroke="#d1720f" stroke-width="2" stroke-linejoin="round" />
                <text x="80" y="44" text-anchor="middle" fill="#6d2f00" font-size="11" font-weight="700"
                  transform="rotate(-11 80 40)">RECORD!</text>
                <rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="4" fill="none" stroke="#1e3a8f" stroke-width="6" />
              </g>

              <g class="sp-context">
                ${bars}
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${names}
              </g>

              <g data-part="axis">
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-ink)" stroke-width="${RULE}" />
                ${ticks}
              </g>
            </svg>
          </div>

          <span
            class="sp-label sp-context"
            data-part="tally"
            data-mode="laden"
            role="status"
            style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap"
          >${NOTES.laden}</span>
        </div>
      </div>
    </div>
  `;

  const junk = part(root, 'junk');
  const tally = part(root, 'tally');

  const setMode = (mode: string) => {
    const note = NOTES[mode];
    if (!note) return;
    junk.dataset.mode = mode;
    junk.style.opacity = mode === 'laden' ? '1' : '0';
    tally.dataset.mode = mode;
    tally.textContent = note;
  };

  part(root, 'picker').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode('laden');
}
