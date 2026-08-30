import { icon } from '#src/kit/icons.ts';

/**
 * Frutiger Metro specimen: one panel with both parents inside it. The left block is Metro's
 * half, a flat gradient plane carrying grid-snapped type and a row of solid tiles; the right
 * block is Aero's half, the same bubbles, swooshes, bloom, silhouetted figures and green hill
 * the glossy register was made of, redrawn as flat vector shapes with no specular highlight
 * anywhere and no photograph behind them.
 *
 * The subject is the panel, `data-part="panel"`: the mashup is the composition, and neither
 * half alone is the term (the left half on its own is Metro, the right half on its own is a
 * flat Aero illustration). It is not the top-level wrapper, so identify still has something
 * to point at (SPEC §5–6). The heading and the caption are scenery in the context register.
 *
 * The poster's subline read "flat vector, no gloss", which is the site naming its own
 * drawing technique on the artwork. A poster prints a place and a date, so it does.
 *
 * The paint is inline because the palette, the gradients and the drawing are the term. The
 * kit has one accent, cool neutrals, no gradient and no illustration, so a Vectordelia panel
 * assembled from kit tokens would be demonstrating the kit.
 *
 * Static: a poster has no states, so there is nothing to animate and no clock to take.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
const W = 438;
const H = 190;
/** The hard vertical seam between the two parents: Metro's plane, then Aero's scene. */
const SPLIT = 180;
const SCENE_W = W - SPLIT;

const TILES = [
  { key: 'star', name: 'star', fill: '#ff5a36' },
  { key: 'heart', name: 'heart', fill: '#ffc233' },
  { key: 'bell', name: 'bell', fill: '#28c07a' },
  { key: 'share', name: 'share', fill: '#7c6cff' },
] as const;

/** Flat circles with a ring and no highlight: an Aero bubble with the gloss taken out. */
const BUBBLES = [
  { cx: 44, cy: 42, r: 17 },
  { cx: 86, cy: 24, r: 9 },
  { cx: 122, cy: 58, r: 13 },
  { cx: 176, cy: 32, r: 20 },
  { cx: 216, cy: 66, r: 10 },
  { cx: 62, cy: 88, r: 7 },
  { cx: 240, cy: 22, r: 6 },
  { cx: 148, cy: 98, r: 8 },
];

/** Three silhouettes on the near hill, drawn in a 22 by 48 box with the feet at the bottom. */
const FIGURES = [
  { x: 54, y: 137, s: 0.6 },
  { x: 100, y: 141, s: 0.5 },
  { x: 196, y: 140, s: 0.66 },
];

const FIGURE = `
  <circle cx="11" cy="6.4" r="5.4" />
  <path d="M11 13c-4.2 0-7 2.3-7.8 6L1.4 27.4l3.3.9 1.9-6.4V48h3.4V33.5h1.8V48h3.4V21.9l1.9 6.4 3.3-.9-1.8-8.4C18 15.3 15.2 13 11 13Z" />`;

/** Flat blades on the hill: nature, stated as two triangles rather than as photographed grass. */
const BLADES = ['M18 152 L21 132 L25 152 Z', 'M27 154 L31 138 L35 154 Z', 'M226 150 L230 130 L234 150 Z', 'M236 152 L240 140 L243 152 Z'];

export function mount(root: HTMLElement): void {
  const bubbles = BUBBLES.map(
    (b) =>
      `<circle cx="${b.cx}" cy="${b.cy}" r="${b.r}" fill="rgb(255 255 255 / 0.3)" stroke="rgb(255 255 255 / 0.62)" stroke-width="2" />`,
  ).join('');

  const figures = FIGURES.map((f) => `<g transform="translate(${f.x} ${f.y}) scale(${f.s})">${FIGURE}</g>`).join('');

  const blades = BLADES.map((d) => `<path d="${d}" fill="#1f8a4c" />`).join('');

  const tiles = TILES.map(
    (tile) => `
      <span data-part="tile-${tile.key}"
            style="display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;
                   background: ${tile.fill}; color: #ffffff">
        ${icon(tile.name)}
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading sp-context" data-part="heading" style="display: block; margin-bottom: 9px">
          One register, two parents
        </span>

        <div data-part="panel" data-subject
             style="position: relative; width: ${W}px; height: ${H}px; overflow: hidden; color: #ffffff">

          <div data-part="type-block"
               style="position: absolute; left: 0; top: 0; width: ${SPLIT}px; height: 100%;
                      background: linear-gradient(158deg, #0a5f88 0%, #0f9bb0 58%, #16b490 100%)">
            <span data-part="eyebrow"
                  style="position: absolute; left: 20px; top: 22px; font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
                         line-height: 1; color: rgb(255 255 255 / 0.82)">
              VECTORDELIA
            </span>
            <span data-part="word"
                  style="position: absolute; left: 18px; top: 38px; font-size: 40px; font-weight: 200; letter-spacing: -0.015em;
                         line-height: 1">
              bloom
            </span>
            <span aria-hidden="true"
                  style="position: absolute; left: 20px; top: 96px; width: 96px; height: 2px; background: rgb(255 255 255 / 0.6)"></span>
            <span data-part="subline"
                  style="position: absolute; left: 20px; top: 108px; font-size: 11px; line-height: 1.3; color: rgb(255 255 255 / 0.88)">
              Pier Park, 14 June
            </span>
            <span data-part="tiles" class="sp-row" style="position: absolute; left: 20px; top: 134px; gap: 8px">
              ${tiles}
            </span>
          </div>

          <svg data-part="scene" viewBox="0 0 ${SCENE_W} ${H}" width="${SCENE_W}" height="${H}" role="presentation"
               style="position: absolute; left: ${SPLIT}px; top: 0; display: block">
            <defs>
              <linearGradient id="fm-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#25b6f0" />
                <stop offset="0.55" stop-color="#4dd7c8" />
                <stop offset="1" stop-color="#8ae9a4" />
              </linearGradient>
              <radialGradient id="fm-bloom" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.66" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="${SCENE_W}" height="${H}" fill="url(#fm-sky)" />
            <ellipse cx="152" cy="66" rx="118" ry="76" fill="url(#fm-bloom)" />

            <g data-part="swooshes" fill="none" stroke-linecap="round">
              <path d="M-12 130 C 48 90, 108 148, 172 94 S 246 50, 272 76" stroke="rgb(255 255 255 / 0.44)" stroke-width="14" />
              <path d="M-12 152 C 58 118, 118 168, 188 118 S 250 82, 272 100" stroke="rgb(198 245 126 / 0.85)" stroke-width="7" />
            </g>

            <g data-part="bubbles">${bubbles}</g>

            <path d="M0 150 L70 142 L140 152 L206 138 L258 148 L258 190 L0 190 Z" fill="#3fbf6a" />
            ${blades}
            <path d="M0 170 L90 164 L180 172 L258 165 L258 190 L0 190 Z" fill="#2b9b57" />
            <g data-part="figures" fill="#0d2a3d">${figures}</g>
          </svg>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Aero's imagery, drawn with Metro's flat geometry and grid-snapped type.
      </p>
    </div>
  `;
}
