/**
 * Halftone specimen: tone carried by dot size on a fixed lattice. The picture is three
 * bands of one ink at three dot radii, the ramp walks the same radius from light to
 * solid, and the headline drags a dotted shadow behind it, which is the comic version
 * of the same screen.
 *
 * Every dot field is two radial gradients on one cell, the second offset by half a cell,
 * so the lattice runs on the diagonal the way a real screen angle does. The paper and
 * ink colours are stated inline because newsprint is the term's own claim; the kit's
 * surface is white on purpose and would not read as paper.
 *
 * Static: a printed tone has no states, so the specimen is looked at rather than
 * watched, which also spares it a motion gate.
 */
const PAPER = '#f4efe2';
const INK = '#191714';
const RED = '#d1382f';
const CELL = 9;

/** One dot field: the lattice, plus the same lattice pushed half a cell off the corner. */
function dots(radius: number, colour = INK): string {
  const stop = `${colour} ${radius}px, transparent ${radius + 0.6}px`;
  const half = CELL / 2;
  return [
    `background-image: radial-gradient(circle at 50% 50%, ${stop}), radial-gradient(circle at 50% 50%, ${stop})`,
    `background-size: ${CELL}px ${CELL}px`,
    `background-position: 0 0, ${half}px ${half}px`,
  ].join('; ');
}

const RAMP = [0.8, 1.5, 2.2, 2.9, 3.5];

export function mount(root: HTMLElement): void {
  const bands = [1.1, 2.1, 3.2].map((r) => `<span style="flex: 1 1 0; ${dots(r)}"></span>`).join('');
  const ramp = RAMP.map((r) => `<span style="flex: 1 1 0; height: 34px; background-color: ${PAPER}; ${dots(r)}"></span>`).join('');
  const ticks = ['10%', '30%', '50%', '70%', '90%']
    .map((t) => `<span style="flex: 1 1 0; text-align: center; font-size: 9px; letter-spacing: 0.06em; color: #6d675c">${t}</span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="width: 292px; padding: 16px; background: ${PAPER}; color: ${INK}; border: 1px solid #d8d1bf; overflow: hidden">
        <div style="display: flex; gap: 14px; align-items: flex-start">
          <span data-part="picture" aria-hidden="true"
                style="display: flex; flex-direction: column; flex: 0 0 auto; width: 96px; height: 96px; border: 1px solid #cfc7b3">${bands}</span>

          <div style="flex: 1 1 auto; min-width: 0">
            <div data-part="headline" style="position: relative; height: 44px; font-size: 33px; font-weight: 800; letter-spacing: -0.02em; line-height: 1">
              <span aria-hidden="true"
                    style="position: absolute; left: 4px; top: 4px; ${dots(2.6, RED)}; -webkit-background-clip: text; background-clip: text; color: transparent">PRINT</span>
              <span style="position: relative">PRINT</span>
            </div>
            <p style="margin: 6px 0 0; font-size: 11px; line-height: 1.45; color: #4a453d">
              Same ink, same grid. Only the dot gets bigger.
            </p>
          </div>
        </div>

        <div data-part="ramp" style="display: flex; gap: 0; margin-top: 14px; border: 1px solid #cfc7b3">${ramp}</div>
        <div data-part="ticks" aria-hidden="true" style="display: flex; margin-top: 4px">${ticks}</div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 292px; margin: 0; text-align: center">
        Tone is dot size, not ink colour: at reading distance the eye averages the lattice back into grey.
      </p>
    </div>
  `;
}
