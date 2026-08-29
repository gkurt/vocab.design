import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const TOP = '#6472d4';
const BOTTOM = '#1b2049';
/** Coarse enough that the steps are unmistakable on any panel, so the cure has work to do. */
const LEVELS = 9;

const at = (t: number) => `color-mix(in srgb, ${TOP} ${Math.round((1 - t) * 100)}%, ${BOTTOM})`;

/** The ramp quantised to hard-edged bands: the condition dithering is applied to. */
const banded = () => {
  const stops: string[] = [];
  for (let i = 0; i < LEVELS; i++) {
    const from = ((i / LEVELS) * 100).toFixed(3);
    const to = (((i + 1) / LEVELS) * 100).toFixed(3);
    stops.push(`${at(i / (LEVELS - 1))} ${from}% ${to}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`;
};

/**
 * One turbulence field, inlined. `encodeURIComponent` leaves single quotes alone, so the
 * data URI can be quoted inside a style attribute that is already double quoted.
 */
function noise(frequency: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="110" height="110"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="1" stitchTiles="stitch"/></filter><rect width="110" height="110" filter="url(#n)"/></svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
}

const FIELD = noise(0.92);

/** Every state is dithered; only how hard changes, so the subject never stops being the term. */
const STRENGTHS: Record<string, { opacity: string; label: string }> = {
  light: { opacity: '0.32', label: 'Light' },
  medium: { opacity: '0.6', label: 'Medium' },
  heavy: { opacity: '0.92', label: 'Heavy' },
};

const START = 'medium';

/**
 * Dithering specimen: the same nine-level ramp twice, dithered on the left and raw on the
 * right, with the noise field itself magnified beside them so the trick is inspectable.
 * The bands are built with hard stops rather than hoped for, because whether a shallow ramp
 * steps on its own depends on the reader's panel.
 *
 * The subject is the dithered panel: the term names the fill with the noise in it, and the
 * grain layer is part of that fill rather than a thing beside it. The raw twin, the zoom,
 * the picker and the caption are all scenery in the context register (SPEC §5).
 *
 * Every box is fixed size and only the grain's opacity changes, so nothing moves.
 */
export function mount(root: HTMLElement): void {
  const start = STRENGTHS[START];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Dither" data-value="${START}">
            ${Object.entries(STRENGTHS)
              .map(([key, s]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${s.label}</button>`)
              .join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="dithered" data-subject data-strength="${START}"
                 style="position: relative; height: 136px; border-radius: 8px; overflow: hidden; background-image: ${banded()}">
              <span data-part="grain" aria-hidden="true"
                    style="position: absolute; inset: 0; pointer-events: none; background-image: ${FIELD};
                           opacity: ${start.opacity}; mix-blend-mode: overlay"></span>
            </div>
            <span class="sp-label" style="text-align: center">Dithered</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="raw" style="height: 136px; border-radius: 8px; background-image: ${banded()}"></div>
            <span class="sp-label" style="text-align: center">Raw, 9 levels</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 74px; gap: 5px">
            <div data-part="zoom"
                 style="position: relative; height: 136px; border-radius: 8px; overflow: hidden; background-color: #414ca3">
              <span aria-hidden="true"
                    style="position: absolute; inset: 0; background-image: ${FIELD}; background-size: 760px 760px;
                           opacity: 0.8; mix-blend-mode: overlay"></span>
            </div>
            <span class="sp-label" style="text-align: center; font-size: 10px">Noise, 7x</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The noise is not hiding the steps, it is straddling them: pixels either side of a boundary average back to the missing colour.
        </p>
      </div>
    </div>
  `;

  const dithered = part(root, 'dithered');
  const grain = part(root, 'grain');

  const apply = (key: string) => {
    const strength = STRENGTHS[key];
    if (!strength) return;
    dithered.dataset.strength = key;
    grain.style.opacity = strength.opacity;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
