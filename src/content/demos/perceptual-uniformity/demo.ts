import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * sRGB <-> OKLab <-> CIE L*, written out rather than approximated, because the whole
 * demonstration is a measurement. The OKLab matrices are the ones in CSS Color 4 and the
 * L* formula is the CIE one; nothing here is fitted to make either ramp look better.
 */
const DEG = Math.PI / 180;
const cube = (x: number) => x * x * x;
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

/** Gamma-encoded sRGB in 0..1, which is what `hsl()` produces and what a swatch is painted with. */
type Rgb = [number, number, number];
type Oklch = [number, number, number];

/** The CSS definition of hsl(), so the left ramp is the one a stylesheet would paint. */
function hslToRgb(h: number, s: number, l: number): Rgb {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function rgbToOklch([r, g, b]: Rgb): Oklch {
  const R = decode(r);
  const G = decode(g);
  const B = decode(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, Bb), (Math.atan2(Bb, A) / DEG + 360) % 360];
}

function oklchToRgb([L, C, h]: Oklch): Rgb {
  const a = C * Math.cos(h * DEG);
  const b = C * Math.sin(h * DEG);
  const l = cube(L + 0.3963377774 * a + 0.2158037573 * b);
  const m = cube(L - 0.1055613458 * a - 0.0638541728 * b);
  const s = cube(L - 0.0894841775 * a - 1.291485548 * b);
  return [
    clamp01(encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    clamp01(encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    clamp01(encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ];
}

/** CIE L*: the shared ruler both ramps are measured against, so neither grades itself. */
const lstar = ([r, g, b]: Rgb): number => {
  const y = 0.2126 * decode(r) + 0.7152 * decode(g) + 0.0722 * decode(b);
  return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y;
};

const css = ([r, g, b]: Rgb) => `rgb(${[r, g, b].map((c) => Math.round(c * 255)).join(' ')})`;

/** Three hues, ordered so the reader can walk from the case HSL nearly survives to the one it does not. */
const HUES: Record<string, { name: string; h: number; s: number }> = {
  blue: { name: 'Blue', h: 250, s: 0.85 },
  red: { name: 'Red', h: 12, s: 0.8 },
  yellow: { name: 'Yellow', h: 62, s: 0.9 },
};

const START = 'blue';
const STEPS = 6;
/** The two ends both ramps are pinned to, as HSL lightness, so only the middle is in dispute. */
const TOP = 0.86;
const BOTTOM = 0.26;

type Ramp = { colors: Rgb[]; light: number[]; gaps: number[] };

const ramps = (key: string): { hsl: Ramp; ok: Ramp } => {
  const hue = HUES[key] ?? HUES.blue;
  if (!hue) throw new Error('unknown hue');
  const ends = [hslToRgb(hue.h, hue.s, TOP), hslToRgb(hue.h, hue.s, BOTTOM)].map(rgbToOklch) as [Oklch, Oklch];
  const build = (at: (t: number) => Rgb): Ramp => {
    const colors = Array.from({ length: STEPS }, (_, i) => at(i / (STEPS - 1)));
    const light = colors.map(lstar);
    const gaps = light.slice(1).map((v, i) => (light[i] ?? 0) - v);
    return { colors, light, gaps };
  };
  const mix = (t: number, i: 0 | 1 | 2) => (ends[0][i] ?? 0) + ((ends[1][i] ?? 0) - (ends[0][i] ?? 0)) * t;
  return {
    hsl: build((t) => hslToRgb(hue.h, hue.s, TOP + (BOTTOM - TOP) * t)),
    ok: build((t) => oklchToRgb([mix(t, 0), mix(t, 1), mix(t, 2)])),
  };
};

const spread = (ramp: Ramp) => `steps ${Math.min(...ramp.gaps).toFixed(1)} to ${Math.max(...ramp.gaps).toFixed(1)} L*`;

/**
 * Perceptual uniformity specimen: one pair of endpoints, two ramps between them, and the
 * CIE lightness of every rung printed underneath. The left ramp steps HSL lightness evenly
 * and the right one steps OKLCH lightness evenly, and every number on screen is measured
 * from the colour the browser is actually painting rather than quoted from anywhere.
 *
 * The hue control is what makes the point arguable: at red the two ramps nearly agree, and
 * at yellow the HSL rungs change by under two L* at the top and by over twenty at the
 * bottom while the OKLCH rungs stay level.
 *
 * The subject is the OKLCH ramp, the one that is actually uniform. The HSL ramp is the
 * counter-example and the hue control, readouts and caption are instrumentation, so all of
 * them sit in the context register (SPEC §5). The subject is the uniform ramp at every hue,
 * so there is no state identify has to refuse.
 *
 * Both ramps are fixed size and only paint and text change with the hue, so nothing moves
 * (SPEC §5). Every colour comes from the fixed table above, so the specimen renders the
 * same on every run.
 */
export function mount(root: HTMLElement): void {
  const cells = (kind: string) =>
    Array.from(
      { length: STEPS },
      (_, i) => `<span class="sp-swatch" data-part="${kind}-swatch-${i}" style="flex: 1 1 0; height: 38px; border-radius: 0"></span>`,
    ).join('');

  const readouts = (kind: string) =>
    Array.from(
      { length: STEPS },
      (_, i) =>
        `<span class="sp-text" data-part="${kind}-l-${i}" style="flex: 1 1 0; text-align: center; font-size: 10px;
               font-variant-numeric: tabular-nums"></span>`,
    ).join('');

  const block = (kind: string, label: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="gap: 4px">
      <div class="sp-row sp-row--between${subject ? ' sp-context' : ''}">
        <span class="sp-label">${label}</span>
        <span class="sp-text" data-part="${kind}-spread" style="font-size: 10.5px; font-variant-numeric: tabular-nums"></span>
      </div>
      <div class="sp-row" data-part="${kind}-ramp" ${subject ? 'data-subject' : ''} data-hue="${START}"
           style="gap: 0; overflow: hidden; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
        ${cells(kind)}
      </div>
      <div class="sp-row" style="gap: 0">${readouts(kind)}</div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Hue">
            ${Object.entries(HUES)
              .map(([key, hue]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${hue.name}</button>`)
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 11px; margin-top: 12px">
          ${block('hsl', 'Even steps of HSL lightness', false)}
          ${block('ok', 'Even steps of OKLCH lightness', true)}
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 10px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          Both ramps run between the same two colours. The numbers are the measured CIE lightness of each rung, so the
          gap between them is the claim.
        </p>
      </div>
    </div>
  `;

  const paint = (key: string) => {
    const built = ramps(key);
    for (const [kind, ramp] of [
      ['hsl', built.hsl],
      ['ok', built.ok],
    ] as const) {
      part(root, `${kind}-ramp`).dataset.hue = key;
      part(root, `${kind}-spread`).textContent = spread(ramp);
      ramp.colors.forEach((color, i) => {
        part(root, `${kind}-swatch-${i}`).style.setProperty('--sp-swatch', css(color));
        part(root, `${kind}-l-${i}`).textContent = String(Math.round(ramp.light[i] ?? 0));
      });
    }
  };
  paint(START);

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
