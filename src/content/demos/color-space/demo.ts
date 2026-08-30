import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Three pairs of endpoints, each roughly opposite on the wheel, so the walk between them
 * has somewhere different to go depending on the space it happens in.
 */
const PAIRS: Record<string, { from: string; to: string }> = {
  blue: { from: '#1D63D2', to: '#F2B23A' },
  rose: { from: '#D23A6B', to: '#3AC4B0' },
  green: { from: '#2E8B45', to: '#8C4FD8' },
};

const START = 'blue';

const channels = (hex: string): [number, number, number] => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
];

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** The same point written on three sets of axes. Computed, so the readout cannot drift from the swatch. */
const srgbText = (hex: string) => {
  const [r, g, b] = channels(hex);
  return `rgb(${r} ${g} ${b})`;
};

const hslText = (hex: string) => {
  const [r, g, b] = channels(hex).map((v) => v / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
};

const oklchText = (hex: string) => {
  const [r, g, b] = channels(hex).map((v) => toLinear(v / 255)) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const hue = (Math.atan2(bb, a) * 180) / Math.PI;
  return `oklch(${lightness.toFixed(2)} ${Math.hypot(a, bb).toFixed(2)} ${Math.round(hue < 0 ? hue + 360 : hue)})`;
};

const READOUTS = [
  { key: 'srgb', axes: 'red green blue', text: srgbText },
  { key: 'hsl', axes: 'hue saturation lightness', text: hslText },
  { key: 'oklch', axes: 'lightness chroma hue', text: oklchText },
] as const;

const ramp = (space: string, from: string, to: string) => `linear-gradient(to right in ${space}, ${from}, ${to})`;

/**
 * Colour space specimen: one colour written on three sets of axes, above the same two
 * endpoints walked in two spaces. Nothing about the endpoints or the stops changes between
 * the two strips, so the only thing the difference can be attributed to is the coordinate
 * system the walk happens in.
 *
 * The subject is the comparison panel, not the readout stack: three notations of one point
 * are three spellings of a value, while a space is only identifiable by what its axes do to
 * arithmetic, which is the pair of strips. The readouts and the pair control stay in the
 * context register. Each strip is headed with its own method and nothing more: the headers
 * used to carry a gloss of the route as well ("straight across the channels", "around the
 * hue circle"), which is the article describing what the two strips already show.
 *
 * Strips are a fixed height, readout values are tabular and their rows a fixed height, so
 * changing the pair repaints and moves nothing (SPEC §5). The axis column is
 * given the room its longest triple needs on one line, rather than wrapping into the row under it.
 */
export function mount(root: HTMLElement): void {
  const pair = PAIRS[START] ?? PAIRS.blue;
  if (!pair) return;

  const rows = READOUTS.map(
    (row) => `
      <div class="sp-row" style="gap: 8px; height: 17px">
        <span class="sp-label" style="flex: 0 0 46px; font-size: 10px">${row.key}</span>
        <span class="sp-text" data-part="value-${row.key}"
              style="flex: 0 0 138px; font-size: 11px; color: var(--sp-ink); font-variant-numeric: tabular-nums">${row.text(pair.from)}</span>
        <span class="sp-text" style="font-size: 10px; white-space: nowrap">${row.axes}</span>
      </div>`,
  ).join('');

  const strip = (space: string) => `
    <div class="sp-stack" style="gap: 4px">
      <div class="sp-row">
        <span class="sp-label" style="color: var(--sp-ink)">in ${space}</span>
      </div>
      <span data-part="strip-${space}" style="display: block; height: 34px; border-radius: 5px;
            background: ${ramp(space, pair.from, pair.to)}"></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Endpoints" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-blue" value="blue">Blue</button>
            <button class="sp-segment" data-part="seg-rose" value="rose">Rose</button>
            <button class="sp-segment" data-part="seg-green" value="green">Green</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" data-part="readouts" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <span class="sp-swatch" data-part="sample" style="flex: 0 0 auto; width: 34px; height: 51px;
                --sp-swatch: ${pair.from}"></span>
          <div class="sp-stack" style="gap: 0">${rows}</div>
        </div>

        <div class="sp-stack" data-part="panel" data-subject data-pair="${START}"
             style="gap: 10px; margin-top: 12px; padding: 10px; border-radius: var(--sp-radius); background: var(--sp-sunken)">
          ${strip('srgb')}
          ${strip('oklch')}
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const sample = part(root, 'sample');

  const show = (name: string) => {
    const next = PAIRS[name];
    if (!next) return;
    panel.dataset.pair = name;
    sample.style.setProperty('--sp-swatch', next.from);
    for (const row of READOUTS) part(root, `value-${row.key}`).textContent = row.text(next.from);
    for (const space of ['srgb', 'oklch']) part(root, `strip-${space}`).style.background = ramp(space, next.from, next.to);
  };

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
