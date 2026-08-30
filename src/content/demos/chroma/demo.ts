import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three bases, one per third of the wheel, so the comparison is not an argument about blue. */
const BASES: Record<string, string> = { blue: '#3557E8', green: '#2E9E5B', amber: '#D8A21A' };

const START = 'blue';

/** Seven steps: enough for the drift to accumulate, few enough that each cell can be ruled. */
const STEPS = 7;

const channels = (hex: string): [number, number, number] => [
  Number.parseInt(hex.slice(1, 3), 16) / 255,
  Number.parseInt(hex.slice(3, 5), 16) / 255,
  Number.parseInt(hex.slice(5, 7), 16) / 255,
];

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

/** sRGB to Oklab, then to the polar form the term's axis is named in. */
function oklch(rgb: [number, number, number]): { l: number; c: number; h: number } {
  const [r, g, b] = rgb.map(toLinear) as [number, number, number];
  const p = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const q = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const l = 0.2104542553 * p + 0.793617785 * q - 0.0040720468 * s;
  const a = 1.9779984951 * p - 2.428592205 * q + 0.4505937099 * s;
  const bb = 0.0259040371 * p + 0.7827717662 * q - 0.808675766 * s;
  const h = (Math.atan2(bb, a) * 180) / Math.PI;
  return { l, c: Math.hypot(a, bb), h: h < 0 ? h + 360 : h };
}

function hsl(rgb: [number, number, number]): { h: number; s: number; l: number } {
  const [r, g, b] = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)), l };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const t: [number, number, number] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [t[0] + m, t[1] + m, t[2] + m];
}

/** The grey that carries the same perceived lightness, which is what makes a drift legible. */
const greyAt = (l: number) => `oklch(${l.toFixed(3)} 0 0)`;

type Ramp = { fill: string[]; grey: string[]; ticks: string[] };

/**
 * The two rows. Chroma walks from grey to the base's own chroma at a fixed Oklab lightness;
 * HSL saturation walks the same seven steps from the same grey, at the HSL lightness whose
 * neutral matches it, so both rows start at one colour and only one of them stays there.
 */
function ramps(hex: string): { base: ReturnType<typeof oklch>; hslHue: number; hslL: number; chroma: Ramp; saturation: Ramp } {
  const rgb = channels(hex);
  const base = oklch(rgb);
  const hue = hsl(rgb).h;
  // The HSL lightness whose zero-saturation grey lands on the base's Oklab lightness:
  // for a neutral, Oklab L is the cube root of relative luminance.
  const hslL = fromLinear(base.l ** 3);

  const chroma: Ramp = { fill: [], grey: [], ticks: [] };
  const saturation: Ramp = { fill: [], grey: [], ticks: [] };
  for (let i = 0; i < STEPS; i++) {
    const t = i / (STEPS - 1);
    const c = base.c * t;
    chroma.fill.push(`oklch(${base.l.toFixed(3)} ${c.toFixed(3)} ${base.h.toFixed(1)})`);
    chroma.grey.push(greyAt(base.l));
    chroma.ticks.push(c.toFixed(2));

    const rgbS = hslToRgb(hue, t, hslL);
    saturation.fill.push(`hsl(${hue.toFixed(0)} ${Math.round(t * 100)}% ${Math.round(hslL * 100)}%)`);
    saturation.grey.push(greyAt(oklch(rgbS).l));
    saturation.ticks.push(`${Math.round(t * 100)}%`);
  }
  return { base, hslHue: hue, hslL, chroma, saturation };
}

const cells = (name: string, values: string[], height: number) =>
  values
    .map(
      (value) =>
        `<span class="sp-swatch" data-part="${name}" style="flex: 1 1 0; height: ${height}px; border-radius: 0; --sp-swatch: ${value}"></span>`,
    )
    .join('');

const ticks = (name: string, values: string[]) =>
  values
    .map((value) => `<span class="sp-label" data-part="${name}" style="flex: 1 1 0; text-align: center; font-size: 9px">${value}</span>`)
    .join('');

/**
 * Chroma specimen: one hue walked from grey to its full colourfulness at a fixed perceived
 * lightness, above the same hue walked with HSL's saturation instead. Under each row is a
 * strip of the greys carrying each cell's measured lightness, so the top row's flat strip
 * and the bottom row's drifting one make the difference between the two axes visible
 * rather than asserted.
 *
 * The subject is the chroma ramp itself, the narrowest thing the term names: the greys
 * beneath it are a measurement of it, the saturation row is the counterpart it is being
 * told apart from, and both stay in the context register with the hue control. Every cell
 * is a fixed share of a fixed row, so changing hue repaints and moves nothing (SPEC §5).
 *
 * A line under the two ramps used to explain what the thin grey strips are and which one
 * holds still. No colour tool prints that about its own readout, and the article says it, so
 * the line has gone; the strips are left to be compared.
 */
export function mount(root: HTMLElement): void {
  const start = ramps(BASES[START] ?? '#3557E8');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Base" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-blue" value="blue">Blue</button>
            <button class="sp-segment" data-part="seg-green" value="green">Green</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 3px; margin-top: 10px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" data-part="chroma-formula">oklch(L C H)</span>
            <span class="sp-text" style="font-size: 11px">chroma, absolute</span>
          </div>
          <div data-part="ramp" data-subject data-hue="${START}"
               style="display: flex; border-radius: 5px; overflow: hidden">${cells('chroma-cell', start.chroma.fill, 34)}</div>
          <div class="sp-row sp-context" style="gap: 0">${cells('chroma-grey', start.chroma.grey, 6)}</div>
          <div class="sp-row sp-context" style="gap: 0">${ticks('chroma-tick', start.chroma.ticks)}</div>
        </div>

        <div class="sp-stack sp-context" style="gap: 3px; margin-top: 10px">
          <div class="sp-row sp-row--between">
            <span class="sp-label" data-part="hsl-formula">hsl(H S L)</span>
            <span class="sp-text" style="font-size: 11px">saturation, relative</span>
          </div>
          <div data-part="sat-ramp" style="display: flex; border-radius: 5px; overflow: hidden">${cells('sat-cell', start.saturation.fill, 34)}</div>
          <div class="sp-row" style="gap: 0">${cells('sat-grey', start.saturation.grey, 6)}</div>
          <div class="sp-row" style="gap: 0">${ticks('sat-tick', start.saturation.ticks)}</div>
        </div>
      </div>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const chromaFormula = part(root, 'chroma-formula');
  const hslFormula = part(root, 'hsl-formula');

  const write = (name: string, values: string[]) => {
    partsOf(root, name).forEach((cell, i) => {
      cell.style.setProperty('--sp-swatch', values[i] ?? '');
    });
  };

  const label = (name: string, values: string[]) => {
    partsOf(root, name).forEach((cell, i) => {
      cell.textContent = values[i] ?? '';
    });
  };

  const show = (name: string) => {
    const hex = BASES[name];
    if (!hex) return;
    const next = ramps(hex);
    ramp.dataset.hue = name;
    write('chroma-cell', next.chroma.fill);
    write('chroma-grey', next.chroma.grey);
    write('sat-cell', next.saturation.fill);
    write('sat-grey', next.saturation.grey);
    chromaFormula.textContent = `oklch(${next.base.l.toFixed(2)} C ${next.base.h.toFixed(0)})`;
    hslFormula.textContent = `hsl(${next.hslHue.toFixed(0)} S ${Math.round(next.hslL * 100)}%)`;
    label('chroma-tick', next.chroma.ticks);
    label('sat-tick', next.saturation.ticks);
  };
  show(START);

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
