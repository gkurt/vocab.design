import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 424;
const H = 140;
const LEFT = 36;
const RIGHT = 14;
const TOP = 12;
const BOTTOM = 24;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Marks are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const CEILING = 60;

/** Nine monthly readings, in percent of capacity. */
const READINGS = [38, 41, 36, 44, 47, 43, 51, 55, 52];
const GRID = [0, 0.25, 0.5, 0.75, 1];

const x = (index: number) => LEFT + (index * PLOT_W) / (READINGS.length - 1);
const y = (value: number) => BASE - (value / CEILING) * PLOT_H;

/**
 * The three layers of ink, counted rather than asserted. `heavy` is what the first pass of
 * erasure takes, `mid` what the second takes, `keep` what survives both, and `data` is the
 * ink whose removal would take a reading with it.
 */
const INK = {
  heavy: 1 + 1 + 3 + READINGS.length + READINGS.length + GRID.length,
  mid: GRID.length + 1 + GRID.length,
  keep: 3,
  data: 1 + READINGS.length,
};

interface Level {
  heavy: boolean;
  mid: boolean;
  note: string;
}

const LEVELS: Record<string, Level> = {
  full: {
    heavy: true,
    mid: true,
    note: `Fill, frame, legend, two grids, every tick: ${INK.heavy + INK.mid + INK.keep} marks around ${INK.data}.`,
  },
  restrained: {
    heavy: false,
    mid: true,
    note: 'Frame, fill, legend and the vertical grid erased. The readings held.',
  },
  reduced: {
    heavy: false,
    mid: false,
    note: 'Marks, a baseline, two dates. An exact value now costs a squint.',
  },
};

const START = 'full';

const total = (level: Level) => INK.data + INK.keep + (level.mid ? INK.mid : 0) + (level.heavy ? INK.heavy : 0);
const ratio = (level: Level) => {
  const all = total(level);
  return `${INK.data} of ${all} marks carry data · ${Math.round((INK.data / all) * 100)}% data ink`;
};

/**
 * Data-ink ratio specimen: one nine-point line chart erased in two passes, from a fully
 * chromed plot down to the marks, with the ratio recomputed at each step and the erased ink
 * left ghosted in place so the reader can see exactly what went.
 *
 * The subject is the data ink itself, `data-part="marks"`: the line and the nine dots, which
 * are the ink whose removal would take a reading with it. Everything else is the chrome
 * being measured against them, so it sits in the context register (SPEC §5). The marks never
 * change across the three levels, which is the demonstration, and they are data ink in every
 * one of them, so no `data-pose` is needed (SPEC §6).
 *
 * Erased ink is ghosted rather than removed: it holds its box, so nothing in the chart moves
 * as the ratio climbs (SPEC §5), and the reader can see the shape of what was deleted. The
 * counts in the read-out come from the same arrays that draw the marks, so the fraction on
 * screen is the fraction on stage.
 *
 * Static paint, no timers: the demo answers the picker and nothing else.
 */
export function mount(root: HTMLElement): void {
  const points = READINGS.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ');

  const dots = READINGS.map(
    (value, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(value).toFixed(1)}" r="3.2" fill="var(--sp-accent)" />`,
  ).join('');

  const verticals = READINGS.map((_, i) => {
    const at = x(i).toFixed(1);
    return `<line x1="${at}" y1="${TOP}" x2="${at}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const xTicks = READINGS.map((_, i) => {
    const at = x(i).toFixed(1);
    return `<line x1="${at}" y1="${BASE}" x2="${at}" y2="${BASE + 5}" stroke="var(--sp-muted)" stroke-width="${RULE}" />`;
  }).join('');

  const yTicks = GRID.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT - 5}" y1="${at}" x2="${LEFT}" y2="${at}" stroke="var(--sp-muted)" stroke-width="${RULE}" />`;
  }).join('');

  const horizontals = GRID.map((f) => {
    const at = (BASE - f * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const yLabels = GRID.map((f) => {
    const at = BASE - f * PLOT_H;
    return `<text x="${LEFT - 9}" y="${(at + 3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9"
        style="font-variant-numeric: tabular-nums">${Math.round(f * CEILING)}</text>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Reservoir, percent of capacity</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-axis="Ink" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-full" value="full" style="padding: 4px 9px; font-size: 11px">as charted</button>
            <button class="sp-segment" type="button" data-part="seg-restrained" value="restrained" style="padding: 4px 9px; font-size: 11px">erase once</button>
            <button class="sp-segment" type="button" data-part="seg-reduced" value="reduced" style="padding: 4px 9px; font-size: 11px">erase again</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 10px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; width: 444px; padding: 8px 9px">
            <svg
              data-part="plot"
              role="img"
              aria-label="Nine monthly reservoir readings rising from thirty six to fifty five percent of capacity"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block"
            >
              <g data-part="chrome-heavy" class="sp-context" data-state="on" style="transition: opacity 0.4s var(--sp-ease)">
                <rect x="${LEFT}" y="${TOP}" width="${PLOT_W}" height="${PLOT_H}" fill="var(--sp-sunken)" />
                <rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="3" fill="none" stroke="var(--sp-muted)" stroke-width="3" />
                ${verticals}
                ${xTicks}
                ${yTicks}
                <rect x="${LEFT + 8}" y="${BASE - 30}" width="86" height="22" rx="4" fill="var(--sp-surface)" stroke="var(--sp-line)" stroke-width="${RULE}" />
                <rect x="${LEFT + 16}" y="${BASE - 24}" width="10" height="10" rx="2" fill="var(--sp-muted)" />
                <text x="${LEFT + 32}" y="${BASE - 15}" fill="var(--sp-muted)" font-size="10">Level</text>
              </g>

              <g data-part="chrome-mid" class="sp-context" data-state="on" style="transition: opacity 0.4s var(--sp-ease)">
                ${horizontals}
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${yLabels}
              </g>

              <g class="sp-context">
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                <text x="${LEFT}" y="${BASE + 16}" fill="var(--sp-muted)" font-size="10">Jan</text>
                <text x="${W - RIGHT}" y="${BASE + 16}" text-anchor="end" fill="var(--sp-muted)" font-size="10">Sep</text>
              </g>

              <g data-part="marks" data-subject>
                <polyline points="${points}" fill="none" stroke="var(--sp-accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
                ${dots}
              </g>
            </svg>
          </div>

          <span
            class="sp-text sp-text--ink"
            data-part="ratio"
            data-level="${START}"
            style="flex: 0 0 auto; height: 17px; font-size: 12px; font-weight: 500; line-height: 17px; white-space: nowrap;
                   font-variant-numeric: tabular-nums"
          >${ratio(LEVELS[START] as Level)}</span>

          <span
            class="sp-label sp-context"
            data-part="note"
            data-level="${START}"
            role="status"
            style="flex: 0 0 auto; width: 444px; height: 15px; font-size: 11px; line-height: 15px; text-align: center;
                   white-space: nowrap; overflow: hidden"
          >${(LEVELS[START] as Level).note}</span>
        </div>
      </div>
    </div>
  `;

  const heavy = part(root, 'chrome-heavy');
  const mid = part(root, 'chrome-mid');
  const readout = part(root, 'ratio');
  const note = part(root, 'note');

  /** Erased ink is ghosted, not deleted: the reader sees the shape of what went. */
  const show = (layer: HTMLElement, on: boolean) => {
    layer.dataset.state = on ? 'on' : 'ghost';
    layer.style.opacity = on ? '1' : '0.13';
  };

  const setLevel = (name: string) => {
    const level = LEVELS[name];
    if (!level) return;
    show(heavy, level.heavy);
    show(mid, level.mid);
    readout.dataset.level = name;
    readout.textContent = ratio(level);
    note.dataset.level = name;
    note.textContent = level.note;
  };

  part(root, 'picker').addEventListener('change', (event) => setLevel((event as CustomEvent<string>).detail));

  setLevel(START);
}
