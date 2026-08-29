import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * OKLCH -> sRGB and CIE L*, written out rather than approximated, because the whole claim is
 * that the two ramps hold the same lightness. The matrices are the ones in CSS Color 4; the
 * OKLCH lightness of each rung is solved by bisection so its measured L* lands on target, which
 * is the only way a tinted rung and a pure one can be compared honestly.
 */
const DEG = Math.PI / 180;
const cube = (x: number) => x * x * x;
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

type Linear = [number, number, number];

function linearFrom(L: number, C: number, hue: number): Linear {
  const a = C * Math.cos(hue * DEG);
  const b = C * Math.sin(hue * DEG);
  const l = cube(L + 0.3963377774 * a + 0.2158037573 * b);
  const m = cube(L - 0.1055613458 * a - 0.0638541728 * b);
  const s = cube(L - 0.0894841775 * a - 1.291485548 * b);
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const luminance = ([r, g, b]: Linear) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const lstar = (y: number) => (y > 0.008856 ? 116 * Math.cbrt(Math.max(y, 0)) - 16 : 903.3 * Math.max(y, 0));

/** The OKLCH lightness whose measured CIE lightness is this tone, at this chroma and hue. */
function solveL(C: number, hue: number, tone: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 34; i++) {
    const mid = (lo + hi) / 2;
    if (lstar(luminance(linearFrom(mid, C, hue))) < tone) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

type Step = { css: string; measured: number; ink: string };

function build(tone: number, chroma: number, hue: number): Step {
  const linear = linearFrom(solveL(chroma, hue, tone), chroma, hue).map(clamp01) as Linear;
  return {
    css: `color(srgb ${linear.map((c) => encode(c).toFixed(5)).join(' ')})`,
    measured: lstar(luminance(linear)),
    // Ink that clears the rung it is printed on, which is why the ramps are compared on tone.
    ink: tone > 58 ? '#1A1D24' : '#F4F6FA',
  };
}

/** Six rungs, stated as the tone each one must land on. Both ramps are built to this list. */
const TONES = [96, 92, 84, 66, 46, 26];
/** Low chroma, not zero chroma: enough to read as warm or cool, not enough to read as colour. */
const TINT = 0.018;

const HUES = [
  { key: 'indigo', name: 'Indigo', deg: 264 },
  { key: 'teal', name: 'Teal', deg: 185 },
  { key: 'amber', name: 'Amber', deg: 70 },
] as const;

const START = 'indigo';

const hueOf = (key: string) => HUES.find((h) => h.key === key) ?? HUES[0];

/**
 * Tinted neutral specimen: two grey ramps built to the same six tones, one at zero chroma and
 * one carrying a trace of the brand hue, with the measured CIE lightness of every rung printed
 * beneath the pair. Because the rungs are solved to land on those tones rather than eyeballed,
 * the two ramps really are matched step for step, which is the property that makes a tinted
 * neutral a drop-in replacement for a pure one.
 *
 * The hue control moves the tinted ramp only. The pure ramp is the same six colours at every
 * setting, and its chroma read-out says 0.000 throughout, so the difference on screen is chroma
 * and nothing else. The two cards are the same interface rendered in each ramp, which is where
 * a tint of 0.018 stops being invisible: the surfaces, the borders and the ink all lean the same
 * way, and the greys stop reading as a separate, colder system.
 *
 * The subject is the tinted ramp, the narrowest element the term names. The pure ramp is what it
 * is measured against, and the hue control, the cards, the read-outs and the caption are
 * instrumentation, so all of them sit in the context register (SPEC §5). The tinted ramp is
 * tinted at every hue, so identify has nothing to refuse.
 *
 * Both ramps are a fixed size and only paint and text change with the hue, so nothing moves
 * (SPEC §5). Every value is computed from the tables above, so the specimen renders identically
 * on every run.
 */
export function mount(root: HTMLElement): void {
  const cells = (kind: string) =>
    TONES.map(
      (_, i) => `<span class="sp-swatch" data-part="${kind}-${i}"
                       style="flex: 1 1 0; min-width: 0; height: 34px; border-radius: 0; display: flex;
                              align-items: center; justify-content: center; font-size: 9px; font-weight: 600"></span>`,
    ).join('');

  const ramp = (kind: string, extra: string) => `
    <div class="sp-row" data-part="ramp-${kind}" ${extra}
         style="gap: 0; overflow: hidden; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
      ${cells(kind)}
    </div>`;

  const rampHead = (label: string, kind: string) => `
    <div class="sp-row sp-row--between sp-context" style="height: 13px">
      <span class="sp-label">${label}</span>
      <span class="sp-text" data-part="chroma-${kind}" style="font-size: 9px; font-variant-numeric: tabular-nums"></span>
    </div>`;

  const card = (kind: string) => `
    <div data-part="card-${kind}" data-hue="${START}"
         style="height: 62px; padding: 9px 10px; border-radius: 6px; border: 1px solid transparent">
      <div data-part="card-title-${kind}" style="font-size: 9.5px; font-weight: 600">Notifications</div>
      <div class="sp-stack" style="gap: 5px; margin-top: 7px">
        <span data-part="card-line-a-${kind}" style="display: block; height: 6px; width: 100%; border-radius: 3px"></span>
        <span data-part="card-line-b-${kind}" style="display: block; height: 6px; width: 64%; border-radius: 3px"></span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Brand hue" data-value="${START}">
            ${HUES.map((h) => `<button class="sp-segment" data-part="seg-${h.key}" value="${h.key}">${h.name}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 250px; gap: 3px">
            ${rampHead('Pure neutral', 'neutral')}
            ${ramp('neutral', 'data-chroma="0.000"')}
            <div style="height: 5px"></div>
            ${rampHead('Tinted neutral', 'tinted')}
            ${ramp('tinted', `data-subject data-hue="${START}" data-chroma="${TINT.toFixed(3)}"`)}
            <div class="sp-row sp-context" style="gap: 0">
              ${TONES.map(
                (_, i) => `<span class="sp-text" data-part="lstar-${i}" style="flex: 1 1 0; min-width: 0; text-align: center;
                                 height: 12px; font-size: 8.5px; font-variant-numeric: tabular-nums"></span>`,
              ).join('')}
            </div>
            <span class="sp-text sp-context" style="height: 24px; font-size: 9px; line-height: 1.35">
              Measured CIE lightness, shared by both ramps: the tint is chroma, never tone.
            </span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 3px">
            <span class="sp-label">Built from the pure ramp</span>
            ${card('neutral')}
            <span class="sp-label" style="margin-top: 5px">Built from the tinted ramp</span>
            ${card('tinted')}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;

  const paint = (key: string) => {
    const hue = hueOf(key);
    if (!hue) return;

    const neutral = TONES.map((tone) => build(tone, 0, 0));
    const tinted = TONES.map((tone) => build(tone, TINT, hue.deg));

    part(root, 'ramp-tinted').dataset.hue = hue.key;
    part(root, 'chroma-neutral').textContent = 'OKLCH chroma 0.000';
    part(root, 'chroma-tinted').textContent = `OKLCH chroma ${TINT.toFixed(3)} · hue ${hue.deg}`;

    for (const [kind, built] of [
      ['neutral', neutral],
      ['tinted', tinted],
    ] as const) {
      built.forEach((step, i) => {
        const cell = part(root, `${kind}-${i}`);
        cell.style.setProperty('--sp-swatch', step.css);
        cell.style.color = step.ink;
        cell.textContent = String(i + 1);
      });

      const surface = built[0];
      const border = built[2];
      const line = built[3];
      const ink = built[5];
      if (!(surface && border && line && ink)) continue;
      const cardEl = part(root, `card-${kind}`);
      cardEl.dataset.hue = kind === 'tinted' ? hue.key : 'none';
      cardEl.style.background = surface.css;
      cardEl.style.borderColor = border.css;
      part(root, `card-title-${kind}`).style.color = ink.css;
      part(root, `card-line-a-${kind}`).style.background = line.css;
      part(root, `card-line-b-${kind}`).style.background = border.css;
    }

    neutral.forEach((step, i) => {
      part(root, `lstar-${i}`).textContent = step.measured.toFixed(1);
    });

    part(root, 'caption').textContent =
      `Both ramps land on the same six tones, so swapping one for the other changes no contrast ratio. ` +
      `Only the ${hue.name.toLowerCase()} ramp moved.`;
  };
  paint(START);

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
