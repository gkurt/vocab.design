import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The same five numbers, read as OKLCH lightness and as HSL lightness. */
const STEPS = [85, 75, 65, 55, 45];

/** Two hues far enough apart that HSL's arithmetic lightness cannot hide (SPEC §5: paint is the demo's). */
const HUES = [
  { key: 'blue', label: 'Blue', ok: 258, hsl: 250 },
  { key: 'yellow', label: 'Yellow', ok: 95, hsl: 55 },
];

/**
 * The grey a colour reads as. OKLCH states it outright, so its swatches only drop
 * their chroma; an HSL swatch has to be converted, which is the demonstration: the
 * two rows were written with the same numbers and do not come back the same grey.
 */
const hslToRgb = (h: number, s: number, l: number): number[] => {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const at = (n: number) => {
    const k = (n + h / 30) % 12;
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [at(0), at(8), at(4)];
};

const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const oklabLightness = ([r, g, b]: number[]): number => {
  const [rl, gl, bl] = [linear(r ?? 0), linear(g ?? 0), linear(b ?? 0)];
  const l = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
  const m = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
  const s = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
};

const grey = (l: number) => `oklch(${l.toFixed(3)} 0 0)`;

/**
 * OKLCH specimen: one set of lightness numbers spent twice, once in OKLCH and once in
 * HSL, with a lightness check that replaces every swatch by the grey it reads as. The
 * OKLCH rows come back flat because that is what the L in OKLCH means; the HSL rows
 * come back as a staircase and a slope, from numbers that looked identical on paper.
 *
 * Both paints are written onto each swatch at mount, so switching views is a swap
 * between two custom properties and never a measurement (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rowFor = (model: 'oklch' | 'hsl', hue: (typeof HUES)[number]) => {
    const cells = STEPS.map((step) => {
      const color = model === 'oklch' ? `oklch(${step / 100} 0.08 ${hue.ok})` : `hsl(${hue.hsl} 70% ${step}%)`;
      const flat = model === 'oklch' ? grey(step / 100) : grey(oklabLightness(hslToRgb(hue.hsl, 70, step)));
      return `<span class="sp-swatch" data-part="swatch"
                    style="flex: 1 1 0; height: 26px; --sw-color: ${color}; --sw-grey: ${flat}; --sp-swatch: var(--sw-color)"></span>`;
    }).join('');
    return `
      <div class="sp-row" style="gap: 6px">
        <span class="sp-label" style="width: 46px">${hue.label}</span>
        <span class="sp-row sp-grow" style="gap: 5px">${cells}</span>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 372px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">L steps 85 · 75 · 65 · 55 · 45</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="color" data-axis="View">
            <button class="sp-segment" data-part="seg-color" value="color">Colour</button>
            <button class="sp-segment" data-part="seg-lightness" value="lightness">Lightness</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="oklch" data-subject data-view="color" style="gap: 6px; margin-top: 14px">
          <span class="sp-text sp-text--ink">oklch(L 0.08 h)</span>
          ${HUES.map((hue) => rowFor('oklch', hue)).join('')}
        </div>

        <div class="sp-divider" style="margin: 14px 0"></div>

        <div class="sp-stack sp-context" data-part="hsl" data-view="color" style="gap: 6px">
          <span class="sp-text sp-text--ink">hsl(h 70% L%)</span>
          ${HUES.map((hue) => rowFor('hsl', hue)).join('')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 12px 0 0">
          The same numbers. Only one of the two notations meant the same thing by them.
        </p>
      </div>
    </div>
  `;

  const oklch = part(root, 'oklch');
  const hsl = part(root, 'hsl');
  const swatches = partsOf(root, 'swatch');

  const show = (view: string) => {
    oklch.dataset.view = view;
    hsl.dataset.view = view;
    for (const swatch of swatches) swatch.style.setProperty('--sp-swatch', view === 'lightness' ? 'var(--sw-grey)' : 'var(--sw-color)');
  };
  show('color');

  part(root, 'segmented').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
