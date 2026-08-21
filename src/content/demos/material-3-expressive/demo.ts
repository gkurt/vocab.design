/**
 * Material 3 Expressive specimen: a static tour of the register in three inset tiles. The
 * shape tile carries the range of corner radii and the shape morph, held as three frames
 * rather than played, since a still poster can show the sequence a reader would otherwise
 * have to catch. The colour tile carries the large tonal fields. The third tile spends both
 * on a small interface fragment, oversized primary action included.
 *
 * The paint is inline because the palette, the radii and the type scale are the term. The
 * kit has one accent, one radius and one shadow by design (SPEC §5), so a Material screen
 * assembled from kit tokens would be demonstrating the kit's shape language, not Google's.
 *
 * The subject is the interface fragment, matching this batch's other register tours: the
 * term names a design language, and the narrowest thing on stage that actually is one
 * applied is the fragment (SPEC §5). The oversized action inside it was the alternative,
 * but a ring around one button would claim the term names a button. The two reference
 * tiles, the labels and the caption are the scenery that makes the register legible.
 *
 * The morph frames come from a fixed table of lobe counts and depths, so the specimen is
 * identical on every identify run. Static: a poster has no states, so there is no clock.
 *
 * A static tour ends where it began, so the pass ends at its mount state and the tree persists
 * across attract iterations (`data-loop="keep"`).
 */
const SURFACE = '#fef7ff';
const ON_SURFACE = '#1d1b20';
const P40 = '#6750a4';
const P80 = '#d0bcff';
const P90 = '#eaddff';
const P95 = '#f6edff';
const ON_P = '#ffffff';
const TERT_C = '#ffd8e4';
const SEC_C = '#e8def8';

const TW = 136;
const TH = 134;

/** The morph, written down: lobe count and lobe depth per frame, squarer to scalloped. */
const MORPH: readonly (readonly [number, number])[] = [
  [4, 0.135],
  [6, 0.1],
  [9, 0.055],
];

/** A lobed round shape: the family M3 Expressive's shape morph runs through. */
function lobed(cx: number, cy: number, r: number, lobes: number, depth: number): string {
  const samples = lobes * 14;
  const pts: string[] = [];
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const rad = r * (1 + depth * Math.cos(lobes * t));
    pts.push(`${(cx + Math.cos(t) * rad).toFixed(2)},${(cy + Math.sin(t) * rad).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

/** One tile of the tour: a tinted ground with its drawing, then a label and a note under it. */
function tile(part: string, label: string, note: string, ground: string, inner: string): string {
  return `
    <div class="sp-stack" style="flex: 0 0 ${TW}px; gap: 5px; align-items: stretch">
      <div data-part="${part}"
           style="position: relative; width: ${TW}px; height: ${TH}px; overflow: hidden; border-radius: 18px 6px 18px 6px;
                  background: ${ground}">
        ${inner}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const frames = MORPH.map(([lobes, depth], i) => {
    const fill = i === MORPH.length - 1 ? P40 : P80;
    return `<g data-part="morph-${i + 1}" transform="translate(${2 + i * 38} 0)">
        <path d="${lobed(18, 18, 15.5, lobes, depth)}" fill="${fill}"/>
      </g>`;
  }).join('');

  const shape = `
    <div style="position: absolute; inset: 10px; display: flex; flex-direction: column; gap: 8px">
      <svg data-part="morph" viewBox="0 0 116 36" width="116" height="36" role="presentation" style="display: block">
        ${frames}
      </svg>
      <span class="sp-label" data-part="shape-note" style="font-size: 10px; line-height: 1.2">One shape, three frames</span>
      <div class="sp-row" data-part="radii" style="gap: 7px; margin-top: 2px">
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 26px 8px 26px 8px; background: ${TERT_C}"></span>
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 50% 50% 8px 50%; background: ${SEC_C}"></span>
        <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 10px; background: ${P80}"></span>
      </div>
    </div>`;

  const colour = `
    <div style="position: absolute; inset: 10px; display: flex; flex-direction: column; gap: 6px">
      <span aria-hidden="true" data-part="field-primary"
            style="height: 32px; border-radius: 16px 6px 16px 6px; background: ${P40}"></span>
      <span aria-hidden="true" data-part="field-container"
            style="height: 26px; border-radius: 6px 16px 6px 16px; background: ${P90}"></span>
      <span aria-hidden="true" data-part="field-tertiary"
            style="height: 20px; border-radius: 12px; background: ${TERT_C}"></span>
      <div class="sp-row" data-part="ramp" style="gap: 4px; margin-top: auto">
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: #21005d"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: #4f378b"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${P40}"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${P80}"></span>
        <span aria-hidden="true" style="flex: 1 1 0; height: 12px; border-radius: 6px; background: ${P95}"></span>
      </div>
    </div>`;

  const fragment = `
    <div data-part="fragment" data-subject
         style="position: absolute; inset: 8px; display: flex; flex-direction: column; gap: 6px; padding: 8px;
                border-radius: 22px 10px 22px 10px; background: ${SURFACE}; color: ${ON_SURFACE};
                box-shadow: 0 3px 10px rgb(29 27 32 / 0.16)">
      <span data-part="fragment-heading" style="font-size: 15px; font-weight: 700; letter-spacing: -0.2px; line-height: 1.15">
        Today
      </span>
      <span aria-hidden="true" data-part="fragment-card"
            style="display: block; height: 20px; border-radius: 12px 5px 12px 5px; background: ${P90}"></span>
      <span aria-hidden="true"
            style="display: block; height: 12px; border-radius: 5px 12px 5px 12px; background: ${TERT_C}"></span>
      <button type="button" data-part="fragment-action"
              style="margin-top: auto; width: 100%; padding: 8px 0 9px; border: 0; border-radius: 18px 7px 18px 7px;
                     background: ${P40}; color: ${ON_P}; font: inherit; font-size: 13px; font-weight: 700;
                     line-height: 1.1; cursor: pointer">
        Start
      </button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Material, with the volume up</span>

        <div class="sp-row" data-part="tour" style="gap: 13px; align-items: flex-start; justify-content: center">
          <div class="sp-context">
            ${tile('tile-shape', 'Shape', 'Radii as a range, and a shape that morphs.', P95, shape)}
          </div>
          <div class="sp-context">
            ${tile('tile-colour', 'Colour', 'Tonal fields, not accents on grey.', SURFACE, colour)}
          </div>
          ${tile('tile-applied', 'Applied', 'An action sized to be reached, not read.', P95, fragment)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A vendor design language with a version number, announced in May 2025.
      </p>
    </div>
  `;
}
