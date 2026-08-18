/**
 * Mid-century modern specimen: a static tour of the register in three inset tiles. The
 * motif tile carries the atomic-age drawing (a thin-line starburst and a boomerang on a
 * paper ground), the shape tile carries the geometry-with-one-organic-exception, and the
 * third tile applies both to a small interface fragment.
 *
 * The paint is inline because the palette and the drawing are the term. The kit's neutrals
 * are cool, it has one accent, no texture and no warm hue at all, so a mid-century screen
 * assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the interface fragment, not the tour and not one motif: the term names a
 * register applied to a design, and the fragment is the narrowest element on stage that is
 * actually one (SPEC §5). The two reference tiles, the labels and the caption are the
 * scenery that makes the register legible.
 *
 * Static: a poster has no states, so there is nothing to animate and no clock to take.
 */
const CREAM = '#f2e7d3';
const PAPER = '#faf3e6';
const MUSTARD = '#dda32b';
const TEAL = '#2b7d75';
const ORANGE = '#c1552a';
const INK = '#332f29';

/** Geometric sans first, with the kit's own stack behind it wherever none is installed. */
const GEOMETRIC = "Futura, 'Century Gothic', 'Avenir Next', var(--sp-font)";

/** Tooth in the ground: a period print was never laid down on a perfectly smooth surface. */
const TOOTH = [
  'repeating-radial-gradient(circle at 0 0, rgb(90 74 48 / 0.1) 0 0.6px, transparent 0.6px 3px)',
  'repeating-radial-gradient(circle at 1.6px 2.5px, rgb(90 74 48 / 0.07) 0 0.5px, transparent 0.5px 3.6px)',
].join(', ');

const W = 138;
const H = 132;

/** Twelve rays, long ones tipped with a dot: the atomic-age starburst as it was printed. */
const RAY_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as const;

function starburst(cx: number, cy: number): string {
  const rays = RAY_ANGLES.map((deg, i) => {
    const long = i % 2 === 0;
    const len = long ? 31 : 18;
    const rad = (deg * Math.PI) / 180;
    const x = (cx + Math.cos(rad) * len).toFixed(1);
    const y = (cy + Math.sin(rad) * len).toFixed(1);
    const tip = long ? `<circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/>` : '';
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${long ? INK : TEAL}" stroke-width="2" stroke-linecap="round"/>${tip}`;
  }).join('');
  return `${rays}<circle cx="${cx}" cy="${cy}" r="5.5" fill="${MUSTARD}"/>`;
}

/** One drawing, sat in the middle of its tile: the art is laid out in a 138 by 116 box. */
function art(part: string, body: string): string {
  return `
    <svg data-part="${part}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation" style="display: block">
      <g transform="translate(0 8)">${body}</g>
    </svg>`;
}

/** One tile of the tour: a paper ground with its drawing, then a label and a note under it. */
function tile(part: string, label: string, note: string, inner: string, mark = ''): string {
  return `
    <div class="sp-stack" style="flex: 0 0 ${W}px; gap: 5px; align-items: stretch">
      <div data-part="${part}"${mark}
           style="position: relative; width: ${W}px; height: ${H}px; overflow: hidden; border-radius: 3px;
                  background-color: ${CREAM}; background-image: ${TOOTH}; background-size: 3.3px 3px, 4.4px 3.9px">
        ${inner}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const motif = art(
    'motif',
    `${starburst(50, 40)}
     <path data-part="boomerang" d="M14 100C28 74 58 62 86 70 62 78 38 90 26 106Z" fill="${ORANGE}"/>
     <ellipse cx="106" cy="40" rx="24" ry="10" fill="none" stroke="${TEAL}" stroke-width="2" transform="rotate(-28 106 40)"/>
     <circle cx="106" cy="40" r="4" fill="${TEAL}"/>`,
  );

  const shapes = art(
    'shapes',
    `<path data-part="kidney" d="M18 34C18 18 42 11 59 19c15 7 27 2 35 10 10 10 2 26-14 26-18 0-26-8-40-6-14 2-22-4-22-15Z" fill="${TEAL}"/>
     <rect x="16" y="72" width="30" height="30" fill="${ORANGE}"/>
     <circle cx="76" cy="87" r="15" fill="${MUSTARD}"/>
     <path d="M106 71h16l-5 32h-6Z" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
  );

  const fragment = `
    <div data-part="fragment" data-subject
         style="position: absolute; inset: 8px; display: flex; flex-direction: column; padding: 9px 10px 10px;
                border-radius: 3px; background: ${PAPER}; color: ${INK}; box-shadow: 0 4px 10px rgb(80 60 34 / 0.2)">
      <span data-part="fragment-eyebrow"
            style="font-family: ${GEOMETRIC}; font-size: 9px; font-weight: 600; letter-spacing: 0.18em; line-height: 1.2; color: ${TEAL}">
        NEW ARRIVALS
      </span>
      <span data-part="fragment-heading"
            style="margin-top: 3px; font-family: ${GEOMETRIC}; font-size: 17px; font-weight: 600; letter-spacing: 0.09em; line-height: 1.2">
        SUNBURST
      </span>
      <span aria-hidden="true" style="width: 32px; height: 3px; margin-top: 6px; background: ${ORANGE}"></span>
      <span style="margin-top: 6px; font-size: 10px; line-height: 1.35; opacity: 0.82">Walnut and brass.</span>
      <button type="button" data-part="fragment-button"
              style="align-self: flex-start; margin-top: auto; padding: 5px 14px 6px; border: 0; border-radius: 999px;
                     background: ${MUSTARD}; color: ${INK}; font-family: ${GEOMETRIC}; font-size: 11px; font-weight: 600;
                     letter-spacing: 0.08em; line-height: 1.1; cursor: pointer">
        RESERVE
      </button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One period, three moves</span>

        <div class="sp-row" data-part="tour" style="gap: 11px; align-items: flex-start; justify-content: center">
          <div class="sp-context">
            ${tile('tile-motif', 'Motif', 'Starburst, boomerang, orbit: thin lines.', motif)}
          </div>
          <div class="sp-context">
            ${tile('tile-shapes', 'Shapes', 'Geometry with one organic exception.', shapes)}
          </div>
          ${tile('tile-applied', 'Applied', 'The register, spent on an interface.', fragment)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Muted mustard, teal and orange, on a ground with tooth in it.
      </p>
    </div>
  `;
}
