/**
 * Isometric specimen: four blocks on the lattice that produced them, with the lattice left
 * ruled behind so the projection is visible rather than implied. Every edge lands on one of
 * three angles, parallel edges stay parallel, and the block at the back is drawn at exactly
 * the same size as the block at the front.
 *
 * A cube is three clipped parallelograms of one hue at three values: no transform, no
 * perspective, and no camera anywhere. Placement is the projection's own arithmetic, one
 * step along an axis being a fixed move right and down, and the DOM order is the draw order,
 * since a scene with no depth buffer is correct only if it is painted back to front.
 *
 * The grid is scenery (it is the guide, not the art), so it carries `.sp-context` and the
 * subject is the scene of blocks. Static: an illustration has no states to watch.
 *
 * A caption under the frame read "Back and front blocks are drawn the same size; only the
 * stacking order says which is which." That is the site explaining the projection, not
 * anything the drawing itself would print, and the article says it, so it went. The ruled
 * legend stays: an annotated angle belongs on a technical drawing.
 */
const CELL = 72;
const HALF = CELL / 2;
const RISE = 21;
const LINE = 'rgb(120 132 160 / 0.34)';

type Face = [top: string, left: string, right: string];
const BLUE: Face = ['#a5b6ff', '#6b8afd', '#4358c4'];
const SAND: Face = ['#ffd79a', '#f2b45c', '#c98a35'];
const TEAL: Face = ['#8fdfd6', '#43b9ad', '#2c8880'];

/** One block: a light top and two sides, clipped out of a single box of known geometry. */
function cube(x: number, y: number, body: number, [top, left, right]: Face, part: string): string {
  const face = (colour: string, points: string) =>
    `<span style="position: absolute; inset: 0; background: ${colour}; clip-path: polygon(${points})"></span>`;
  return `
    <span data-part="${part}" style="position: absolute; left: ${x}px; top: ${y}px; width: ${CELL}px; height: ${RISE * 2 + body}px">
      ${face(right, `${CELL}px ${RISE}px, ${CELL}px ${RISE + body}px, ${HALF}px ${RISE * 2 + body}px, ${HALF}px ${RISE * 2}px`)}
      ${face(left, `0 ${RISE}px, ${HALF}px ${RISE * 2}px, ${HALF}px ${RISE * 2 + body}px, 0 ${RISE + body}px`)}
      ${face(top, `${HALF}px 0, ${CELL}px ${RISE}px, ${HALF}px ${RISE * 2}px, 0 ${RISE}px`)}
    </span>`;
}

export function mount(root: HTMLElement): void {
  const grid = [
    `repeating-linear-gradient(30deg, ${LINE} 0 1px, transparent 1px ${HALF / 2}px)`,
    `repeating-linear-gradient(-30deg, ${LINE} 0 1px, transparent 1px ${HALF / 2}px)`,
    `repeating-linear-gradient(90deg, ${LINE} 0 1px, transparent 1px ${HALF}px)`,
  ].join(', ');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="frame"
           style="position: relative; width: 300px; height: 212px; overflow: hidden; background: #fbfcfe;
                  border: 1px solid #dfe2e8; border-radius: 8px">

        <span class="sp-context" data-part="grid" aria-hidden="true"
              style="position: absolute; inset: 0; background-image: ${grid}"></span>

        <span data-part="scene" data-subject aria-hidden="true"
              style="position: absolute; left: 38px; top: 30px; width: 224px; height: 152px">
          ${cube(106, 0, 38, TEAL, 'block-back')}
          ${cube(0, 34, 38, BLUE, 'block-base')}
          ${cube(0, 8, 26, SAND, 'block-stacked')}
          ${cube(152, 72, 38, TEAL, 'block-front')}
        </span>

        <span class="sp-label sp-context" data-part="legend"
              style="position: absolute; left: 10px; bottom: 8px">30 degrees, no vanishing point</span>
      </div>
    </div>
  `;
}
