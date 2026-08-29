/**
 * Biophilic design specimen: one app panel built entirely from the register's form language,
 * with a reference column beside it naming the three moves it is made of. Uneven rounding on
 * the panel itself, a blob-edged hero card, a leaf-vein rule instead of a straight divider,
 * an earth palette of moss, bark, sky and clay, and a daylight wash that falls off across the
 * surface from one corner.
 *
 * There is not a single image in the specimen, which is the argument: the claim of the term
 * is the geometry, the light and the palette, so a panel with no photograph of a plant in it
 * still has to read as grown. A version that only worked with a fern behind it would be
 * demonstrating wallpaper.
 *
 * The paint is inline because the earth palette, the asymmetric radii and the daylight
 * gradient are the term. The kit has one radius, one accent, cool neutrals and no gradient at
 * all, so a biophilic panel assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the panel, not the whole scene and not one card inside it: the term names a
 * register spent on an interface surface, and the panel is the narrowest element on stage that
 * actually is one (SPEC §5). The reference column and the caption are the scenery that make
 * the form language legible.
 *
 * Static: the register's ambient drift belongs behind a reduced-motion check, and the article
 * says so, so the specimen is a still composition with no clock and no scripted motion.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
const MOSS = '#4f6b46';
const MOSS_PALE = '#93a882';
const BARK = '#7a5c44';
const SKY = '#9fbecd';
const CLAY = '#c58a63';
const INK = '#2f3529';
const PAPER = '#f6f1e6';

/** Daylight: brightest at one corner and falling off across the surface, like a room. */
const DAYLIGHT = [
  'radial-gradient(150px 120px at 86% 4%, rgb(255 240 199 / 0.9), rgb(255 240 199 / 0) 72%)',
  'linear-gradient(166deg, #e7f0f1 0%, #f6f1e6 52%, #ede2ce 100%)',
].join(', ');

const PANEL_W = 274;
const PANEL_H = 180;
const REF_W = 150;

/**
 * A leaf as a rule: a lens outline, a midrib along it, and pairs of veins running forward off
 * the midrib. Every stroke is 2px, because the stage treats a thinner box as absent and a
 * one-pixel rule would be a claim nothing could check.
 *
 * The outline is one quadratic each way, whose peak sits at half its control offset, so the
 * control point goes twice the half-height out to land the curve on the edge of the box. The
 * veins are sized from the same expression, which is what keeps them inside the leaf.
 */
function leafRule(width: number, height: number, stroke: string): string {
  const mid = height / 2;
  const half = mid - 1.5;
  const cx = (width / 2).toFixed(1);
  const right = (width - 1.5).toFixed(1);
  const outline = `M1.5 ${mid} Q ${cx} ${mid - half * 2} ${right} ${mid} Q ${cx} ${mid + half * 2} 1.5 ${mid} Z`;
  const veins = [0.2, 0.36, 0.52, 0.68, 0.84]
    .map((t) => {
      const x = (width * t).toFixed(1);
      const reach = 4 * half * t * (1 - t) * 0.66;
      const dx = reach.toFixed(1);
      const dy = (reach * 0.82).toFixed(1);
      return `<path d="M${x} ${mid} l${dx} -${dy}"/><path d="M${x} ${mid} l${dx} ${dy}"/>`;
    })
    .join('');
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="presentation" style="display: block">
      <g fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round">
        <path d="${outline}"/><path d="M4 ${mid}h${width - 8}"/>${veins}
      </g>
    </svg>`;
}

/** One row of the reference column: a shape, then the move it is an example of. */
function reference(part: string, note: string, art: string): string {
  return `
    <div class="sp-row" data-part="${part}" style="gap: 9px; align-items: center">
      <span aria-hidden="true" style="flex: 0 0 46px; display: block">${art}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.3">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const swatches = [MOSS, MOSS_PALE, BARK, CLAY, SKY]
    .map((c) => `<span aria-hidden="true" style="flex: 1 1 0; height: 16px; border-radius: 5px 2px 5px 2px; background: ${c}"></span>`)
    .join('');

  const refColumn = `
    <div class="sp-stack sp-context" data-part="reference" style="flex: 0 0 ${REF_W}px; gap: 9px">
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">The form language</span>
      ${reference(
        'ref-blob',
        'A silhouette that is not a rounded rectangle.',
        `<span style="display: block; width: 46px; height: 34px; background: ${MOSS};
                      border-radius: 58% 42% 46% 54% / 62% 38% 62% 38%"></span>`,
      )}
      ${reference(
        'ref-corner',
        'Rounding that differs corner to corner.',
        `<span style="display: block; width: 46px; height: 34px; background: ${CLAY};
                      border-radius: 20px 5px 22px 7px"></span>`,
      )}
      ${reference('ref-vein', 'A rule that branches instead of ruling.', leafRule(46, 30, BARK))}
      <div class="sp-row" data-part="ref-palette" style="gap: 4px; margin-top: 2px">${swatches}</div>
    </div>`;

  const panel = `
    <div data-part="panel" data-subject
         style="position: relative; display: flex; flex-direction: column; gap: 9px; width: ${PANEL_W}px; height: ${PANEL_H}px;
                padding: 13px 14px; color: ${INK}; background-image: ${DAYLIGHT}; border-radius: 30px 12px 32px 14px;
                box-shadow: 0 5px 16px rgb(58 62 44 / 0.16)">
      <div class="sp-row sp-row--between" data-part="panel-head">
        <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.01em">Tuesday, early</span>
        <span data-part="panel-seed" aria-hidden="true"
              style="width: 26px; height: 22px; background: ${SKY}; border-radius: 64% 36% 52% 48% / 58% 42% 62% 38%"></span>
      </div>

      <div data-part="panel-hero"
           style="position: relative; display: flex; flex-direction: column; justify-content: center; gap: 3px; height: 62px;
                  padding: 0 26px; background: linear-gradient(122deg, ${MOSS}, #63805a); color: ${PAPER};
                  border-radius: 44px 18px 48px 22px">
        <span style="font-size: 11px; letter-spacing: 0.05em; opacity: 0.86">DAYLIGHT LEFT</span>
        <span style="font-size: 19px; font-weight: 600; line-height: 1.1">4 h 20 m</span>
        <span aria-hidden="true"
              style="position: absolute; right: 16px; top: 12px; width: 38px; height: 38px; background: rgb(246 241 230 / 0.26);
                     border-radius: 58% 42% 46% 54% / 62% 38% 62% 38%"></span>
      </div>

      <span data-part="vein" aria-hidden="true" style="display: block; height: 20px; opacity: 0.55">
        ${leafRule(PANEL_W - 28, 20, BARK)}
      </span>

      <div class="sp-row" data-part="panel-tiles" style="gap: 9px; margin-top: auto">
        <span data-part="tile-water"
              style="flex: 1 1 0; padding: 7px 11px 8px; background: rgb(159 190 205 / 0.55); border-radius: 6px 20px 6px 20px">
          <span style="display: block; font-size: 11px; opacity: 0.78">Rain</span>
          <span style="display: block; font-size: 14px; font-weight: 600">6 mm</span>
        </span>
        <span data-part="tile-soil"
              style="flex: 1 1 0; padding: 7px 11px 8px; background: rgb(197 138 99 / 0.42); border-radius: 20px 6px 20px 6px">
          <span style="display: block; font-size: 11px; opacity: 0.78">Soil</span>
          <span style="display: block; font-size: 14px; font-weight: 600">Damp</span>
        </span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">A panel with no picture of a plant in it</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${panel}
          ${refColumn}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Earth colour, uneven edges, and light that falls off across the surface.
      </p>
    </div>
  `;
}
