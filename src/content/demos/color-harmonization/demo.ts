import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * OKLCH -> sRGB, written out rather than approximated, because every hue and hex on screen is
 * measured from the colour the browser is actually painting. The matrices are the ones in CSS
 * Color 4. Material rotates a CAM16 hue in HCT; the rotation here is the same walk around a
 * perceptual hue circle, done in the one a browser can compute exactly.
 */
const DEG = Math.PI / 180;
const cube = (x: number) => x * x * x;
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

function oklchToRgb(L: number, C: number, hue: number): [number, number, number] {
  const a = C * Math.cos(hue * DEG);
  const b = C * Math.sin(hue * DEG);
  const l = cube(L + 0.3963377774 * a + 0.2158037573 * b);
  const m = cube(L - 0.1055613458 * a - 0.0638541728 * b);
  const s = cube(L - 0.0894841775 * a - 1.291485548 * b);
  return [
    clamp01(encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    clamp01(encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    clamp01(encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ];
}

const hex = (L: number, C: number, hue: number) =>
  `#${oklchToRgb(L, C, hue)
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')
    .toUpperCase()}`;

/** The signed shortest way round the circle, which is the direction harmonization walks. */
const shortest = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180;

/**
 * Material's rule: move toward the target by half the gap, but never further than the cap.
 * A colour already near the scheme is barely touched; one on the far side stops at the cap.
 */
const harmonize = (from: number, to: number, cap: number) => {
  const gap = shortest(from, to);
  const move = Math.min(Math.abs(gap) / 2, cap);
  return { hue: (from + Math.sign(gap) * move + 360) % 360, move };
};

/** The scheme everything is harmonized toward: one generated indigo. */
const SEED = { L: 0.55, C: 0.15, h: 262 };

/** Three colours that arrived from outside the scheme and cannot simply be regenerated. */
const SOURCES = [
  { key: 'error', name: 'Error red', L: 0.58, C: 0.17, h: 27 },
  { key: 'success', name: 'Success green', L: 0.62, C: 0.13, h: 145 },
  { key: 'brand', name: 'Brand purple', L: 0.55, C: 0.16, h: 305 },
] as const;

const CAPS = [8, 15, 30] as const;
const START = 15;

const round = (n: number) => Math.round(n);

/**
 * Colour harmonization specimen: three colours that came from outside a generated indigo
 * scheme, shown raw on the top row and harmonized on the bottom one, with the OKLCH hue of
 * every swatch printed beneath it and the rotation each one took printed beside that.
 *
 * The cap control is the argument. At 8 degrees every colour is unmistakably itself and only
 * just leans toward the scheme; at 30 the red and the green have moved far enough that a
 * status colour starts to lose the meaning it was chosen for, which is exactly why Material
 * caps the move at 15. The purple never reaches the cap at all, because it was already close
 * enough for the halving rule to bite first, and the read-out says so.
 *
 * The subject is the harmonized row, the three swatches the operation produced. It is the
 * narrowest element the term names: the raw row is what harmonization is measured against
 * rather than an instance of it, and the seed, the cap control and the caption are
 * instrumentation, so all of them sit in the context register (SPEC §5). Every cap rotates
 * every swatch, so the subject is harmonized in all three states and identify has nothing to
 * refuse.
 *
 * Every cell is a fixed size and only paint and text change with the cap, so nothing moves
 * (SPEC §5). All values are computed from the tables above, so the specimen renders
 * identically on every run.
 */
export function mount(root: HTMLElement): void {
  const GUTTER = 78;

  const swatch = (name: string, extra: string) =>
    `<span class="sp-swatch" data-part="${name}" ${extra}
           style="display: block; height: 38px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>`;

  const cell = (inner: string) => `<div style="flex: 1 1 0; min-width: 0">${inner}</div>`;

  const readLine = (name: string, size: number, cls = 'sp-text') =>
    `<span class="${cls}" data-part="${name}" style="display: block; height: 13px; text-align: center; font-size: ${size}px;
           font-variant-numeric: tabular-nums"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Scheme seed</span>
            <span class="sp-swatch" data-part="seed" style="width: 22px; height: 16px; --sp-swatch: ${hex(SEED.L, SEED.C, SEED.h)};
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>
            <span class="sp-text" style="font-size: 10px; font-variant-numeric: tabular-nums">hue ${SEED.h}</span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Max shift" data-value="${START}">
              ${CAPS.map((cap) => `<button class="sp-segment" data-part="seg-${cap}" value="${cap}">${cap}&deg;</button>`).join('')}
            </sp-segmented>
          </div>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 11px; height: 14px">
          <span style="flex: 0 0 ${GUTTER}px"></span>
          ${SOURCES.map((s) => cell(`<span class="sp-label" style="display: block; text-align: center">${s.name}</span>`)).join('')}
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 4px; align-items: flex-start">
          <span class="sp-label" style="flex: 0 0 ${GUTTER}px; padding-top: 12px">Arrived as</span>
          ${SOURCES.map((s) => cell(swatch(`src-${s.key}`, '') + readLine(`src-read-${s.key}`, 9))).join('')}
        </div>

        <div class="sp-row" style="gap: 8px; margin-top: 8px; align-items: flex-start">
          <span class="sp-label sp-context" style="flex: 0 0 ${GUTTER}px; padding-top: 12px">Harmonized</span>
          <div class="sp-row" data-part="harmonized" data-subject data-cap="${START}"
               style="flex: 1 1 auto; gap: 8px; min-width: 0; align-items: flex-start">
            ${SOURCES.map((s) => cell(swatch(`out-${s.key}`, `data-shift="0"`) + readLine(`out-read-${s.key}`, 9) + readLine(`shift-${s.key}`, 9))).join('')}
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  for (const s of SOURCES) {
    part(root, `src-${s.key}`).style.setProperty('--sp-swatch', hex(s.L, s.C, s.h));
    part(root, `src-read-${s.key}`).textContent = `hue ${s.h} · ${hex(s.L, s.C, s.h)}`;
  }

  const apply = (raw: string) => {
    const cap = Number(raw) || START;
    part(root, 'harmonized').dataset.cap = String(cap);

    let capped = 0;
    for (const s of SOURCES) {
      const { hue, move } = harmonize(s.h, SEED.h, cap);
      const paint = hex(s.L, s.C, hue);
      const out = part(root, `out-${s.key}`);
      out.style.setProperty('--sp-swatch', paint);
      out.dataset.shift = String(round(move));
      part(root, `out-read-${s.key}`).textContent = `hue ${round(hue)} · ${paint}`;
      part(root, `shift-${s.key}`).textContent = `rotated ${round(move)}°`;
      if (round(move) >= cap) capped += 1;
    }

    part(root, 'caption').textContent =
      `Hue only: tone and chroma are untouched, so every contrast ratio survives the move. ` +
      `${capped} of ${SOURCES.length} hit the ${cap}° cap; the rest stopped at half the gap.`;
  };
  apply(String(START));

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
