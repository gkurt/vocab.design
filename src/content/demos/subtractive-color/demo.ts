const FIELD = { w: 416, h: 196 };
/** Same geometry as the additive specimen, on purpose: only the direction of the mixing differs. */
const INK = { r: 62, spread: 34, cx: 138, cy: 98 };

/**
 * Process inks rather than mathematical primaries. A real cyan is not a perfect red absorber, so
 * none of these has a zero channel, and the difference shows exactly where it matters: three
 * ideal inks multiply to nothing, three of these stop at a muddy near-black.
 */
const INKS = [
  { key: 'cyan', name: 'Cyan', color: '#12B0E8', angle: -90 },
  { key: 'magenta', name: 'Magenta', color: '#E8298C', angle: 150 },
  { key: 'yellow', name: 'Yellow', color: '#FBE712', angle: 30 },
] as const;

const channels = (hex: string) => [0, 1, 2].map((i) => Number.parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16));

/** What a stack of layers leaves behind: each one keeps its own fraction of what arrived. */
function stack(...hexes: string[]): string {
  const mixed = [0, 1, 2].map((i) => hexes.reduce((acc, hex) => (acc * (channels(hex)[i] as number)) / 255, 255));
  return `#${mixed
    .map((c) => Math.round(c).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

const [CYAN, MAGENTA, YELLOW] = [INKS[0].color, INKS[1].color, INKS[2].color];

const SUMS = [
  { key: 'blue', color: stack(CYAN, MAGENTA), text: 'C + M' },
  { key: 'green', color: stack(CYAN, YELLOW), text: 'C + Y' },
  { key: 'red', color: stack(MAGENTA, YELLOW), text: 'M + Y' },
  { key: 'sludge', color: stack(CYAN, MAGENTA, YELLOW), text: 'C + M + Y' },
] as const;

const centre = (angle: number) => ({
  x: INK.cx + Math.cos((angle * Math.PI) / 180) * INK.spread,
  y: INK.cy + Math.sin((angle * Math.PI) / 180) * INK.spread,
});

/**
 * The region every layer covers, traced as a polygon. An intersection of discs that all contain
 * the cluster's middle is star-shaped about it, so the boundary is found by asking how far the
 * nearest circle lets a ray from the middle travel. The overlap is the feature the term names and
 * it has no element of its own in a stack of three patches, so it is given one (SPEC §5).
 */
function overlapPath(): string {
  const centres = INKS.map((i) => centre(i.angle));
  const points: string[] = [];
  for (let deg = 0; deg < 360; deg += 3) {
    const ux = Math.cos((deg * Math.PI) / 180);
    const uy = Math.sin((deg * Math.PI) / 180);
    let reach = Number.POSITIVE_INFINITY;
    for (const o of centres) {
      const dx = INK.cx - o.x;
      const dy = INK.cy - o.y;
      const b = ux * dx + uy * dy;
      const c = dx * dx + dy * dy - INK.r * INK.r;
      reach = Math.min(reach, -b + Math.sqrt(Math.max(0, b * b - c)));
    }
    points.push(`${(INK.cx + ux * reach).toFixed(2)} ${(INK.cy + uy * reach).toFixed(2)}`);
  }
  return `M ${points.join(' L ')} Z`;
}

/**
 * Subtractive colour specimen: three process inks laid on white paper, multiplied together so
 * every overlap is what the layers left behind rather than a hand-picked swatch. Cyan and magenta
 * land on a dark blue, cyan and yellow on green, magenta and yellow on red, and the middle, where
 * all three have taken their share, is a muddy near-black. The legend prints each product.
 *
 * It is deliberately the same arrangement as the additive specimen, at the same size, with only
 * the ground and the direction changed: light overlapping to white there, ink overlapping to
 * almost nothing here.
 *
 * The subject is the OVERLAP where all three inks lie, the feature the term names, given the
 * element it does not otherwise have (SPEC §5): a path around its own extent, filled with the
 * value the three layers actually multiply to, composited normally so it paints its region rather
 * than darkening it a fourth time. The three patches are peer instances of the term and keep their
 * full paint; the legend is scenery in the context register. The paper is a fixed white rather
 * than the reader's theme, because taking light away is only legible from a ground that had all
 * of it.
 *
 * A heading over the field ("Taking light away: three inks, multiplied together") and a closing
 * caption ("Every layer only takes light away, so the stack runs towards black and stops in the
 * mud, which is why print carries a fourth black ink.") both went: the picture is the claim, and
 * the article already carries the fourth ink. The choreography's assert on the caption went with
 * it.
 *
 * The claim is visible at rest and there is no second state to reach, so the choreography is waits
 * and asserts only (SPEC §8). Nothing is measured and nothing changes, so nothing shifts.
 */
export function mount(root: HTMLElement): void {
  const patch = (ink: (typeof INKS)[number]) => {
    const c = centre(ink.angle);
    return `
      <div data-part="ink-${ink.key}" aria-hidden="true"
           style="position: absolute; left: ${(c.x - INK.r).toFixed(2)}px; top: ${(c.y - INK.r).toFixed(2)}px;
                  width: ${INK.r * 2}px; height: ${INK.r * 2}px; border-radius: 50%;
                  background: ${ink.color}; mix-blend-mode: multiply"></div>`;
  };

  const legendRow = (sum: (typeof SUMS)[number]) => `
    <div class="sp-row" data-part="legend-${sum.key}" style="gap: 8px">
      <span style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: ${sum.color}"></span>
      <span style="font-size: 11px; font-variant-numeric: tabular-nums; color: #3A3F49; white-space: nowrap">${sum.text}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-window" style="width: 452px; padding: 14px 18px">
        <div data-part="field"
             style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px;
                    border-radius: 6px; background: #FFFFFF; isolation: isolate; overflow: hidden;
                    box-shadow: inset 0 0 0 1px rgb(16 24 40 / 0.14)">
          ${INKS.map(patch).join('')}
          <svg width="${FIELD.w}" height="${FIELD.h}" aria-hidden="true"
               style="position: absolute; left: 0; top: 0; pointer-events: none">
            <path data-part="overlap" data-subject d="${overlapPath()}" fill="${stack(CYAN, MAGENTA, YELLOW)}"></path>
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
