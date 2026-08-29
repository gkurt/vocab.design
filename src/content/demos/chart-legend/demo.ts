import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 340;
const H = 118;
const LEFT = 30;
const RIGHT = 6;
const TOP = 8;
const BOTTOM = 18;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Rules are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MAX = 80;
const TICKS = [0, 20, 40, 60, 80];
const MOVE = 'transition: y 0.4s var(--sp-ease), height 0.4s var(--sp-ease)';

const MONTHS = ['jul', 'aug', 'sep', 'oct', 'nov'];
const SLOT = PLOT_W / MONTHS.length;
const BAR = 32;

/**
 * Series in legend order, which is also the order they stack from the top down, so the
 * key reads as a map of the bar rather than as an alphabetical list. Each carries a fill
 * pattern as well as a hue: a key coded by colour alone fails a colour-blind reader
 * (WCAG 1.4.1), so the pattern is the second cue and the legend repeats it.
 */
const SERIES = [
  { key: 'retail', name: 'Retail', colour: 'oklch(0.58 0.16 262)', values: [22, 26, 24, 30, 28] },
  { key: 'trade', name: 'Trade', colour: 'oklch(0.62 0.15 330)', values: [14, 12, 18, 16, 22] },
  { key: 'online', name: 'Online', colour: 'oklch(0.62 0.11 172)', values: [9, 13, 16, 20, 26] },
];

const PLACES: Record<string, { slot: string; direction: string; gap: string }> = {
  right: { slot: 'slot-right', direction: 'column', gap: '4px' },
  top: { slot: 'slot-top', direction: 'row', gap: '8px' },
  inline: { slot: 'slot-inline', direction: 'row', gap: '6px' },
};

const START_PLACE = 'right';
const ALL = 'all';

const centre = (index: number) => LEFT + index * SLOT + SLOT / 2;
const swatch = (key: string) =>
  `<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style="display: block; flex: 0 0 auto">
     <rect width="12" height="12" rx="2" fill="url(#fill-${key})" />
   </svg>`;

/**
 * Chart legend specimen: a stacked bar chart whose key can sit beside the plot, above it,
 * or inline in the title line, and whose entries filter the plot down to one channel.
 *
 * The subject is the legend, `data-part="legend"`, not the chart it decodes: the plot, its
 * axis and the placement picker are the scene the key is read against, and they sit in the
 * context register. Every placement and every filter state is honestly a legend, so no
 * pose condition is needed (SPEC §6).
 *
 * All three placements keep their room at all times: the inline gap in the title line, the
 * row above the plot, and the column beside it are reserved whether the legend is in them
 * or not, so moving the key never moves the chart (SPEC §5). The scale is fixed at nought
 * to eighty in every filter state for the same reason: filtering is the legend's claim,
 * rescaling the axis would be a different one.
 *
 * Filtering isolates rather than toggles. An entry means "show only this channel" and the
 * "Show all" entry is the explicit dismissal, because a scripted step has to reach a state
 * rather than flip whichever one it finds (SPEC §8). The filtered-out entries stay in the
 * key at reduced opacity, since a legend that quietly stops matching the plot is worse
 * than no legend at all.
 */
export function mount(root: HTMLElement): void {
  const defs = SERIES.map((series) => {
    const texture =
      series.key === 'trade'
        ? '<line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" stroke-width="2.6" stroke-opacity="0.8" />'
        : series.key === 'online'
          ? '<circle cx="4" cy="4" r="1.7" fill="#ffffff" fill-opacity="0.85" />'
          : '';
    const transform = series.key === 'trade' ? ' patternTransform="rotate(45)"' : '';
    return `<pattern id="fill-${series.key}" width="8" height="8" patternUnits="userSpaceOnUse"${transform}>
        <rect width="8" height="8" fill="${series.colour}" />
        ${texture}
      </pattern>`;
  }).join('');

  const gridlines = TICKS.map((value) => {
    const at = (BASE - (value / MAX) * PLOT_H).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const tickLabels = TICKS.map((value) => {
    const at = (BASE - (value / MAX) * PLOT_H + 3).toFixed(1);
    return `<text x="${LEFT - 6}" y="${at}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${value}</text>`;
  }).join('');

  // Bands are laid out top down in legend order, so the key doubles as a map of the bar.
  const bands = MONTHS.map((month, i) => {
    const x = (LEFT + i * SLOT + (SLOT - BAR) / 2).toFixed(1);
    let bottom = BASE;
    const stack = [...SERIES].reverse().map((series) => {
      const h = ((series.values[i] ?? 0) / MAX) * PLOT_H;
      bottom -= h;
      return `<rect
          data-part="band-${month}-${series.key}"
          x="${x}" y="${bottom.toFixed(1)}" width="${BAR}" height="${h.toFixed(1)}"
          fill="url(#fill-${series.key})" style="${MOVE}"
        />`;
    });
    return stack.join('');
  }).join('');

  const monthNames = MONTHS.map(
    (month, i) =>
      `<text x="${centre(i).toFixed(1)}" y="${BASE + 13}" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${month[0]?.toUpperCase()}${month.slice(1)}</text>`,
  ).join('');

  const entries = SERIES.map(
    (series) => `
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="key-${series.key}"
        data-series="${series.key}"
        data-shown
        style="display: inline-flex; align-items: center; gap: 6px; padding: 2px 6px; font-size: 11px; line-height: 15px"
      >${swatch(series.key)}<span>${series.name}</span></button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 233px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour Supply</span>
          <span
            class="sp-label"
            data-part="readout"
            role="status"
            style="width: 74px; text-align: right; font-size: 12px; font-variant-numeric: tabular-nums"
          >296k shown</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 448px; padding: 8px 10px">
            <div class="sp-row" style="gap: 8px; height: 20px">
              <span class="sp-label sp-context" style="flex: 0 0 auto">Revenue by channel, Q3</span>
              <span data-part="slot-inline" class="sp-row" style="flex: 1 1 auto; min-width: 0; min-height: 16px; gap: 6px"></span>
            </div>

            <div data-part="slot-top" class="sp-row" style="height: 22px; gap: 8px"></div>

            <div class="sp-row" style="gap: 8px; align-items: flex-start">
              <svg
                class="sp-context"
                data-part="plot"
                data-only="${ALL}"
                role="img"
                aria-label="Revenue by channel over five months, stacked, retail largest throughout"
                viewBox="0 0 ${W} ${H}"
                width="${W}"
                height="${H}"
                style="display: block; flex: 0 0 auto"
              >
                <defs>${defs}</defs>
                ${gridlines}
                ${tickLabels}
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                ${bands}
                ${monthNames}
              </svg>

              <div data-part="slot-right" style="flex: 0 0 78px; width: 78px; padding-top: 2px"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placement" data-part="picker" data-value="${START_PLACE}">
          <button class="sp-segment" type="button" data-part="seg-right" value="right" style="padding: 4px 10px; font-size: 12px">Beside</button>
          <button class="sp-segment" type="button" data-part="seg-top" value="top" style="padding: 4px 10px; font-size: 12px">Above</button>
          <button class="sp-segment" type="button" data-part="seg-inline" value="inline" style="padding: 4px 10px; font-size: 12px">Inline</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >Beside the plot, ordered like the stack, so the key reads as a map of the bar.</span>
      </div>
    </div>
  `;

  // Built after the markup so the entries and the "Show all" reset are one element that
  // moves between the reserved slots, rather than three copies that could disagree.
  const legendHtml = `
    <div
      data-part="legend"
      data-subject
      data-place="${START_PLACE}"
      data-only="${ALL}"
      role="group"
      aria-label="Channels"
      style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start"
    >
      ${entries}
      <button
        class="sp-button sp-button--quiet"
        type="button"
        data-part="key-all"
        data-series="${ALL}"
        style="padding: 2px 6px; font-size: 11px; line-height: 15px; color: var(--sp-muted)"
      >Show all</button>
    </div>`;
  part(root, PLACES[START_PLACE]?.slot ?? 'slot-right').insertAdjacentHTML('afterbegin', legendHtml);

  const legend = part(root, 'legend');
  const plot = part(root, 'plot');
  const readout = part(root, 'readout');
  const note = part(root, 'note');
  const keys = SERIES.map((series) => part(root, `key-${series.key}`));

  const NOTE: Record<string, string> = {
    right: 'Beside the plot, ordered like the stack, so the key reads as a map of the bar.',
    top: 'Above the plot: the key is on the reading path before the marks are looked at.',
    inline: 'Inline in the title line, which only holds while there are two or three series.',
  };

  const draw = (only: string) => {
    for (const [i, month] of MONTHS.entries()) {
      let bottom = BASE;
      for (const series of [...SERIES].reverse()) {
        const shown = only === ALL || only === series.key;
        const h = shown ? ((series.values[i] ?? 0) / MAX) * PLOT_H : 0;
        bottom -= h;
        const band = part(root, `band-${month}-${series.key}`);
        band.setAttribute('y', bottom.toFixed(1));
        band.setAttribute('height', h.toFixed(1));
      }
    }
  };

  const setOnly = (only: string) => {
    legend.dataset.only = only;
    plot.dataset.only = only;
    let total = 0;
    for (const [i, series] of SERIES.entries()) {
      const shown = only === ALL || only === series.key;
      const key = keys[i];
      if (key) {
        if (shown) key.setAttribute('data-shown', '');
        else key.removeAttribute('data-shown');
        key.style.opacity = shown ? '1' : '0.4';
      }
      if (shown) total += series.values.reduce((sum, value) => sum + value, 0);
    }
    readout.textContent = `${total}k shown`;
    draw(only);
  };

  const setPlace = (name: string) => {
    const place = PLACES[name];
    if (!place) return;
    legend.dataset.place = name;
    legend.style.flexDirection = place.direction;
    legend.style.gap = place.gap;
    legend.style.alignItems = place.direction === 'column' ? 'flex-start' : 'center';
    part(root, place.slot).appendChild(legend);
    note.textContent = NOTE[name] ?? '';
  };

  for (const [i, series] of SERIES.entries()) keys[i]?.addEventListener('click', () => setOnly(series.key));
  part(root, 'key-all').addEventListener('click', () => setOnly(ALL));
  part(root, 'picker').addEventListener('change', (event) => setPlace((event as CustomEvent<string>).detail));

  setPlace(START_PLACE);
  setOnly(ALL);
}
