const FIELD = { w: 416, h: 196 };
/** The three emitters: one radius, three centres on a triangle about the cluster's middle. */
const LIGHT = { r: 62, spread: 34, cx: 138, cy: 98 };

/** Red at the top, green lower left, blue lower right, in the order the model names them. */
const LIGHTS = [
  { key: 'red', name: 'Red', color: '#FF0000', angle: -90 },
  { key: 'green', name: 'Green', color: '#00FF00', angle: 150 },
  { key: 'blue', name: 'Blue', color: '#0000FF', angle: 30 },
] as const;

const SUMS = [
  { key: 'yellow', color: '#FFFF00', text: 'R + G' },
  { key: 'cyan', color: '#00FFFF', text: 'G + B' },
  { key: 'magenta', color: '#FF00FF', text: 'B + R' },
  { key: 'white', color: '#FFFFFF', text: 'R + G + B' },
] as const;

const centre = (angle: number) => ({
  x: LIGHT.cx + Math.cos((angle * Math.PI) / 180) * LIGHT.spread,
  y: LIGHT.cy + Math.sin((angle * Math.PI) / 180) * LIGHT.spread,
});

/**
 * The region where all three discs overlap, traced as a polygon.
 *
 * An intersection of discs that all contain the cluster's middle is star-shaped about that
 * middle, so the boundary can be found by asking, along each direction, how far the nearest
 * circle lets the ray travel. That is arithmetic rather than arc geometry, and it gives the
 * feature the element it needs: the overlap is what the term names, and a term whose feature has
 * no element of its own gets one sized to its extent (SPEC §5).
 */
function overlapPath(): string {
  const centres = LIGHTS.map((l) => centre(l.angle));
  const points: string[] = [];
  for (let deg = 0; deg < 360; deg += 3) {
    const ux = Math.cos((deg * Math.PI) / 180);
    const uy = Math.sin((deg * Math.PI) / 180);
    let reach = Number.POSITIVE_INFINITY;
    for (const o of centres) {
      const dx = LIGHT.cx - o.x;
      const dy = LIGHT.cy - o.y;
      const b = ux * dx + uy * dy;
      const c = dx * dx + dy * dy - LIGHT.r * LIGHT.r;
      reach = Math.min(reach, -b + Math.sqrt(Math.max(0, b * b - c)));
    }
    points.push(`${(LIGHT.cx + ux * reach).toFixed(2)} ${(LIGHT.cy + uy * reach).toFixed(2)}`);
  }
  return `M ${points.join(' L ')} Z`;
}

/**
 * Additive colour specimen: three emitters overlapping on black, screened together so the sums
 * are computed by the compositor rather than hand-coloured. Red and green land on yellow, green
 * and blue on cyan, blue and red on magenta, and the middle, where all three arrive, is white.
 * A legend beside the cluster names each sum, so the picture is a set of stated additions rather
 * than an impression of glowing.
 *
 * The subject is the OVERLAP where all three lights land, which is the feature the term names
 * and the one region that could not exist under the opposite model (SPEC §5). It has no element
 * of its own in a stack of three discs, so it is given one: a path traced around its extent,
 * filled with the colour the addition produces and screened like everything else in the group,
 * so what identify rings is the drawn feature rather than the canvas holding it.
 *
 * The three discs are peer instances of the term rather than scenery, so they keep their full
 * paint and take no register; the legend is scenery and carries `.sp-context`. The field used to
 * be introduced by a label ("Adding light: three emitters, screened together") and closed by a
 * caption ("Nothing here is painted twice ... all three at full strength are white"), both of them
 * the article talking over the picture. The legend names every sum, so the picture says it, and
 * the two lines are gone along with the choreography's claim on the caption. The ground is a
 * fixed black rather than the reader's theme, because adding light is only legible against no
 * light at all.
 *
 * The claim is visible at rest and there is no second state to reach, so the choreography is
 * waits and asserts only (SPEC §8). Nothing is measured and nothing changes, so nothing shifts.
 */
export function mount(root: HTMLElement): void {
  const disc = (light: (typeof LIGHTS)[number]) => {
    const c = centre(light.angle);
    return `
      <div data-part="light-${light.key}" aria-hidden="true"
           style="position: absolute; left: ${(c.x - LIGHT.r).toFixed(2)}px; top: ${(c.y - LIGHT.r).toFixed(2)}px;
                  width: ${LIGHT.r * 2}px; height: ${LIGHT.r * 2}px; border-radius: 50%;
                  background: ${light.color}; mix-blend-mode: screen"></div>`;
  };

  const legendRow = (sum: (typeof SUMS)[number]) => `
    <div class="sp-row" data-part="legend-${sum.key}" style="gap: 8px">
      <span style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: ${sum.color}"></span>
      <span style="font-size: 11px; font-variant-numeric: tabular-nums; color: #D7DCE6; white-space: nowrap">${sum.text}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-window" style="width: 452px; padding: 12px 18px 14px">
        <div data-part="field"
             style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px; margin-top: 7px;
                    border-radius: 6px; background: #000000; isolation: isolate; overflow: hidden">
          ${LIGHTS.map(disc).join('')}
          <svg width="${FIELD.w}" height="${FIELD.h}" aria-hidden="true"
               style="position: absolute; left: 0; top: 0; mix-blend-mode: screen; pointer-events: none">
            <path data-part="overlap" data-subject d="${overlapPath()}" fill="#FFFFFF"></path>
          </svg>
          <div class="sp-stack sp-context" data-part="legend"
               style="position: absolute; right: 18px; top: 50%; transform: translateY(-50%); gap: 10px">
            ${SUMS.map(legendRow).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
