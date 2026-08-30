import { flag, part, partsOf } from '#src/kit/parts.ts';

/** Six hues walked evenly around the circle, held at one lightness and one chroma. */
const SERIES = [
  { key: 'search', name: 'Search', h: 28 },
  { key: 'social', name: 'Social', h: 88 },
  { key: 'email', name: 'Email', h: 148 },
  { key: 'direct', name: 'Direct', h: 208 },
  { key: 'ads', name: 'Ads', h: 268 },
  { key: 'other', name: 'Other', h: 328 },
];
const LEVEL = { l: 0.68, c: 0.13 };

/** Four days, each split across the six sources. Every row sums to 100. */
const DAYS = [
  { name: 'Mon', shares: [34, 18, 12, 16, 12, 8] },
  { name: 'Tue', shares: [30, 22, 10, 18, 12, 8] },
  { name: 'Wed', shares: [26, 16, 20, 14, 16, 8] },
  { name: 'Thu', shares: [38, 14, 12, 12, 14, 10] },
];

const START = 0;

const hueAt = (h: number) => `oklch(${LEVEL.l} ${LEVEL.c} ${h})`;

const RING = 'inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)';

/**
 * Categorical palette specimen: six sources coloured by hue alone, at one lightness and one
 * chroma, stacked across four days. Picking a source from the legend rings its band in every
 * bar, which is the match a reader makes between a legend and a chart.
 *
 * The subject is the palette in use: the legend with the bars it colours, since a set of
 * hues is only categorical once it is standing for categories. The heading and the readout
 * are scenery (SPEC §5). Bands are sized as percentages of a fixed row and the readout is
 * one line of fixed height, so picking a source repaints and moves nothing.
 *
 * A strip of twelve crowded hues used to sit under the chart, captioned "Twelve sources,
 * same lightness, hues crowded together", and the header carried "Hue varies, lightness does
 * not". No dashboard prints either sentence, and the strip meant nothing without its caption,
 * so both have gone; the article makes the same point about hue spacing.
 */
export function mount(root: HTMLElement): void {
  const rows = DAYS.map(
    (day) => `
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 26px; font-size: 10px">${day.name}</span>
        <div class="sp-row" style="flex: 1 1 auto; gap: 2px; height: 18px">
          ${day.shares
            .map((share, i) => {
              const series = SERIES[i];
              return `<span class="sp-swatch" data-part="band" data-series="${series?.key}"
                        style="flex: ${share} 1 0; height: 18px; border-radius: 3px; --sp-swatch: ${hueAt(series?.h ?? 0)}"></span>`;
            })
            .join('')}
        </div>
      </div>`,
  ).join('');

  const legend = SERIES.map(
    (series, i) => `
      <button class="sp-button sp-button--quiet" data-part="key-${i}" data-series="${series.key}"
              style="display: flex; align-items: center; gap: 5px; padding: 2px 5px; font-size: 10.5px; font-weight: 500">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; --sp-swatch: ${hueAt(series.h)}"></span>
        <span>${series.name}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Sessions by source</span>
        </div>

        <div class="sp-surface" data-part="palette" data-subject data-series="${SERIES[START]?.key}"
             style="margin-top: 10px; padding: 10px 12px 12px">
          <div class="sp-row sp-row--wrap" data-part="legend" style="gap: 4px 6px">${legend}</div>
          <div class="sp-stack" data-part="bars" style="gap: 6px; margin-top: 10px">${rows}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 16px">
          <span class="sp-label">Source</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-series="${SERIES[START]?.key}" style="font-size: 11px"></span>
        </div>
      </div>
    </div>
  `;

  const palette = part(root, 'palette');
  const readout = part(root, 'readout');
  const bands = partsOf(root, 'band');
  const keys = SERIES.map((_, i) => part(root, `key-${i}`));

  const pick = (index: number) => {
    const series = SERIES[index];
    if (!series) return;
    palette.dataset.series = series.key;
    for (const band of bands) band.style.boxShadow = band.dataset.series === series.key ? RING : '';
    keys.forEach((key, i) => {
      const on = i === index;
      flag(key, 'data-selected', on);
      key.style.boxShadow = on ? 'inset 0 0 0 1px var(--sp-ink)' : '';
    });
    const total = DAYS.reduce((sum, day) => sum + (day.shares[index] ?? 0), 0);
    readout.dataset.series = series.key;
    readout.textContent = `${series.name} · ${(total / DAYS.length).toFixed(1)}% of the week · H ${series.h}`;
  };
  pick(START);

  keys.forEach((key, i) => {
    key.addEventListener('click', () => pick(i));
  });
}
