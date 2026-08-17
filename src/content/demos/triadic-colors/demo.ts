import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One base hue, and three spacing rules stated as absolute offsets from it. */
const BASE = 262;

type Scheme = { key: string; label: string; offsets: number[]; spacing: string; note: string };

const SCHEMES: Scheme[] = [
  {
    key: 'triadic',
    label: 'Triad',
    offsets: [0, 120, 240],
    spacing: '120° apart',
    note: 'Three hues a third of the wheel apart. Evenly spaced means evenly loud, so one leads and the other two are accents.',
  },
  {
    key: 'split',
    label: 'Split',
    offsets: [0, 150, 210],
    spacing: '150° and 210°',
    note: 'The complement swapped for the two hues either side of it. Still three, no longer evenly spaced.',
  },
  {
    key: 'square',
    label: 'Square',
    offsets: [0, 90, 180, 270],
    spacing: '90° apart',
    note: 'Four hues, a quarter of the wheel apart. The same idea one step further, and one step harder to balance.',
  },
];

const START = 'triadic';
const SLOTS = 4;

/*
 * Every colour here is held inside sRGB rather than pushed to each hue's own limit: the
 * scheme's claim is that the three are equally saturated, and letting one of them be
 * quietly gamut mapped would break that claim without saying so.
 */
const hue = (offset: number) => (BASE + offset) % 360;
const swatchOf = (h: number) => `oklch(0.62 0.115 ${h})`;
const headerOf = (h: number) => `oklch(0.45 0.1 ${h})`;
const buttonOf = (h: number) => `oklch(0.5 0.1 ${h})`;
const chipFill = (h: number) => `oklch(0.94 0.025 ${h})`;
const chipEdge = (h: number) => `oklch(0.78 0.07 ${h})`;
const chipInk = (h: number) => `oklch(0.4 0.08 ${h})`;

const DEG = Math.PI / 180;
const RING = 34;
const at = (h: number): [number, number] => [50 + RING * Math.cos(h * DEG), 50 - RING * Math.sin(h * DEG)];
const point = (h: number) =>
  at(h)
    .map((n) => n.toFixed(1))
    .join(',');

/**
 * The hue circle, drawn pale on purpose: it is the instrument, and the markers sitting on
 * it carry the palette's actual colour. At full chroma the two would be the same paint and
 * a marker would vanish into the hue it points at. Kept at a chroma every hue can hold, so
 * the wheel is not being quietly mapped either.
 */
const WHEEL = `conic-gradient(${Array.from({ length: 37 }, (_, i) => `oklch(0.8 0.055 ${(90 - i * 10 + 360) % 360}) ${i * 10}deg`).join(', ')})`;

/**
 * Triadic scheme specimen: one base hue, the wheel it was picked from with a marker per
 * member, the resulting swatches, and a small interface painted from them so the scheme is
 * seen spent rather than only named. The interface deliberately gives one hue the header
 * and the other two chip and button scale, which is the working form of the rule.
 *
 * The subject is the swatch row, not the markers: the term names the palette, and the wheel
 * is the instrument that explains where the palette came from. The wheel, the applied
 * interface, the readouts and the picker are all instrumentation and sit in the context
 * register (SPEC §5).
 *
 * Split-complementary is a counter-example the subject itself passes through, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it: identify refuses to
 * ring a row of hues that is not a triad (SPEC §6).
 *
 * All four swatch slots are laid out from mount and the fourth is merely hidden, so a scheme
 * with one more member moves none of the others (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = SCHEMES.find((s) => s.key === START) ?? SCHEMES[0];
  if (!start) return;

  const swatches = Array.from(
    { length: SLOTS },
    (_, i) => `
      <span class="sp-swatch" data-part="swatch-${i}"${i >= (start.offsets.length ?? 0) ? ' hidden' : ''}
            style="flex: 0 0 auto; width: 42px; height: 42px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3);
                   --sp-swatch: ${swatchOf(hue(start.offsets[i] ?? 0))}"></span>`,
  ).join('');

  const markers = Array.from(
    { length: SLOTS },
    (_, i) => `
      <circle data-part="mark-${i}"${i >= start.offsets.length ? ' hidden' : ''} r="7.5" stroke="#ffffff" stroke-width="2"
              cx="${at(hue(start.offsets[i] ?? 0))[0].toFixed(1)}" cy="${at(hue(start.offsets[i] ?? 0))[1].toFixed(1)}"
              fill="${swatchOf(hue(start.offsets[i] ?? 0))}"></circle>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Scheme</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${SCHEMES.map((s) => `<button class="sp-segment" data-part="seg-${s.key}" value="${s.key}">${s.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 116px; height: 116px; border-radius: 50%;
                 background-image: ${WHEEL}">
              <svg viewBox="0 0 100 100" style="position: absolute; inset: 0; width: 100%; height: 100%" aria-hidden="true">
                <polygon data-part="frame" points="${start.offsets.map((o) => point(hue(o))).join(' ')}" fill="none"
                         stroke="#23262b" stroke-width="2" stroke-linejoin="round" opacity="0.5"></polygon>
                ${markers}
              </svg>
            </div>
            <span class="sp-label" data-part="spacing" style="font-size: 10px">${start.spacing}</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 9px">
            <div class="sp-row" data-part="palette" data-subject data-pose="[data-scheme=triadic]" data-scheme="${START}"
                 style="gap: 8px; height: 42px">${swatches}</div>

            <div class="sp-surface sp-context" data-part="applied" style="overflow: hidden">
              <div data-part="app-header" style="display: flex; align-items: center; height: 26px; padding: 0 10px;
                   font-size: 11.5px; font-weight: 600; color: #ffffff; background: ${headerOf(hue(start.offsets[0] ?? 0))}">Field guide</div>
              <div class="sp-row" style="gap: 8px; padding: 9px 10px">
                <span class="sp-line" style="flex: 1 1 auto; height: 7px"></span>
                <span data-part="app-chip" style="flex: 0 0 auto; padding: 2px 9px; border-radius: 999px; font-size: 11px;
                      background: ${chipFill(hue(start.offsets[1] ?? 0))}; border: 1px solid ${chipEdge(hue(start.offsets[1] ?? 0))};
                      color: ${chipInk(hue(start.offsets[1] ?? 0))}">New</span>
                <button class="sp-button sp-button--sm" data-part="app-button" type="button"
                        style="flex: 0 0 auto; padding: 4px 12px; font-size: 11.5px; color: #ffffff;
                               background: ${buttonOf(hue(start.offsets[2] ?? 0))}">Save</button>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 9px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${start.note}</p>
      </div>
    </div>
  `;

  const palette = part(root, 'palette');

  const apply = (key: string) => {
    const scheme = SCHEMES.find((s) => s.key === key);
    if (!scheme) return;
    palette.dataset.scheme = key;
    for (let i = 0; i < SLOTS; i++) {
      const offset = scheme.offsets[i];
      const swatch = part(root, `swatch-${i}`);
      const mark = part(root, `mark-${i}`);
      if (offset === undefined) {
        swatch.hidden = true;
        mark.setAttribute('hidden', '');
        continue;
      }
      const h = hue(offset);
      swatch.hidden = false;
      swatch.style.setProperty('--sp-swatch', swatchOf(h));
      mark.removeAttribute('hidden');
      mark.setAttribute('cx', at(h)[0].toFixed(1));
      mark.setAttribute('cy', at(h)[1].toFixed(1));
      mark.setAttribute('fill', swatchOf(h));
    }
    part(root, 'frame').setAttribute('points', scheme.offsets.map((o) => point(hue(o))).join(' '));
    part(root, 'app-header').style.background = headerOf(hue(scheme.offsets[0] ?? 0));
    const chip = part(root, 'app-chip');
    const h1 = hue(scheme.offsets[1] ?? 0);
    chip.style.background = chipFill(h1);
    chip.style.borderColor = chipEdge(h1);
    chip.style.color = chipInk(h1);
    part(root, 'app-button').style.background = buttonOf(hue(scheme.offsets[2] ?? 0));
    part(root, 'spacing').textContent = scheme.spacing;
    part(root, 'note').textContent = scheme.note;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
