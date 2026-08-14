import { flag, part, partsOf } from '#src/kit/parts.ts';

/** One hue, sampled at five steps that only ever get darker. */
const HUE = 254;
const STOPS = [
  { l: 0.95, c: 0.02, from: 0, to: 3, label: '0 to 3' },
  { l: 0.86, c: 0.05, from: 4, to: 7, label: '4 to 7' },
  { l: 0.74, c: 0.09, from: 8, to: 11, label: '8 to 11' },
  { l: 0.6, c: 0.13, from: 12, to: 15, label: '12 to 15' },
  { l: 0.45, c: 0.13, from: 16, to: 99, label: '16 up' },
];

/** Orders per hour across a week: ordinary counts, so the picture has to be decoded by value. */
const VALUES = [
  [2, 5, 9, 14, 18, 11, 4],
  [3, 8, 13, 19, 21, 15, 6],
  [1, 6, 12, 17, 16, 9, 3],
  [0, 4, 7, 11, 10, 5, 2],
];

const START = 4;

const colorAt = (i: number) => {
  const stop = STOPS[i];
  return stop ? `oklch(${stop.l} ${stop.c} ${HUE})` : 'transparent';
};

const binOf = (value: number) => STOPS.findIndex((stop) => value >= stop.from && value <= stop.to);

const RING = 'inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)';

/**
 * Sequential palette specimen: a week of hourly counts drawn as a grid of cells, each cell
 * filled from a single hue sampled at five steps of lightness, with the ramp itself ruled
 * beside the grid and its stops labelled with the range each one stands for. Picking a step
 * rings every cell that carries it, which is the decoding a reader does against a legend.
 *
 * The subject is the plot: the ramp with the grid it colours, since a palette is only a
 * palette once it is carrying the data. The heading, the readout, and the caption are
 * scenery (SPEC §5). Every cell and every legend row is a fixed size and the readout is one
 * line of fixed height, so picking a step repaints and moves nothing.
 */
export function mount(root: HTMLElement): void {
  const cells = VALUES.flatMap((row, y) =>
    row.map(
      (value, x) => `
        <span class="sp-swatch" data-part="cell" data-bin="${binOf(value)}" data-at="${x}-${y}"
              style="width: 26px; height: 26px; border-radius: 4px; --sp-swatch: ${colorAt(binOf(value))}"></span>`,
    ),
  ).join('');

  const legend = STOPS.map(
    (stop, i) => `
      <button class="sp-button sp-button--quiet" data-part="stop-${i}"
              style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 500">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px;
              box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14); --sp-swatch: ${colorAt(i)}"></span>
        <span>${stop.label}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Orders per hour</span>
          <span class="sp-text" style="font-size: 11px">One hue, five steps of lightness</span>
        </div>

        <div class="sp-surface" data-part="plot" data-subject data-bin="${START}"
             style="margin-top: 10px; padding: 12px; display: flex; gap: 14px; align-items: flex-start">
          <div class="sp-grid" data-part="grid" style="grid-template-columns: repeat(7, 26px); gap: 4px">${cells}</div>
          <div class="sp-stack sp-grow" data-part="ramp" style="gap: 2px">${legend}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 18px">
          <span class="sp-label">Step</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-bin="${START}" style="font-size: 12px"></span>
        </div>
        <p class="sp-text sp-context" style="margin: 6px 0 0; height: 34px; font-size: 11px">
          The hue never changes. Every step down the ramp is darker than the one above it, which is the only
          thing the reader has to rank.</p>
      </div>
    </div>
  `;

  const plot = part(root, 'plot');
  const readout = part(root, 'readout');
  const cellEls = partsOf(root, 'cell');
  const picks = STOPS.map((_, i) => part(root, `stop-${i}`));

  const show = (index: number) => {
    const stop = STOPS[index];
    if (!stop) return;
    plot.dataset.bin = String(index);
    let count = 0;
    for (const cell of cellEls) {
      const on = cell.dataset.bin === String(index);
      if (on) count += 1;
      cell.style.boxShadow = on ? RING : '';
    }
    picks.forEach((pick, i) => {
      const on = i === index;
      flag(pick, 'data-selected', on);
      pick.style.boxShadow = on ? 'inset 0 0 0 1px var(--sp-ink)' : '';
    });
    readout.dataset.bin = String(index);
    readout.textContent = `${stop.label} orders · ${count} cells · L ${stop.l.toFixed(2)}`;
  };
  show(START);

  picks.forEach((pick, i) => {
    pick.addEventListener('click', () => show(i));
  });
}
