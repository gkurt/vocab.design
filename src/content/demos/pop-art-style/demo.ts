/**
 * Pop art specimen: one comic panel enlarged until its manufacture shows. Flat primaries
 * on a Ben Day dot field, a black outline on every shape, a starburst badge, a speech
 * balloon with a tail, and the motif repeated four times with the colourway swapped.
 *
 * Every colour, outline, and dot period is stated inline because the printing is the
 * term: the kit has one accent and no primaries. The dots are decoration here, not the
 * subject, since the technique itself is the halftone term.
 *
 * Static: a printed panel has no states, so the specimen is looked at rather than
 * watched, which also spares it a clock and a motion gate.
 */
const INK = '#101014';
const RED = '#e5142d';
const BLUE = '#1651d4';
const YELLOW = '#ffd42a';
const CREAM = '#fff6d6';
const DOTS = `radial-gradient(circle, rgb(229 20 45 / 0.5) 1.6px, transparent 1.8px)`;
const CONDENSED = "'Arial Narrow', 'Haettenschweiler', 'Oswald', Impact, var(--sp-font)";

const STAR = (() => {
  const points: string[] = [];
  for (let i = 0; i < 24; i++) {
    const radius = i % 2 === 0 ? 50 : 33;
    const angle = (Math.PI * 2 * i) / 24 - Math.PI / 2;
    points.push(`${(50 + radius * Math.cos(angle)).toFixed(1)}% ${(50 + radius * Math.sin(angle)).toFixed(1)}%`);
  }
  return `polygon(${points.join(', ')})`;
})();

const COLOURWAYS: [string, string][] = [
  [YELLOW, RED],
  [BLUE, YELLOW],
  [RED, CREAM],
  [CREAM, BLUE],
];

export function mount(root: HTMLElement): void {
  const tiles = COLOURWAYS.map(
    ([ground, motif]) => `
      <span style="position: relative; width: 50px; height: 50px; border: 3px solid ${INK}; background: ${ground}; overflow: hidden">
        <span style="position: absolute; left: 9px; top: 9px; width: 28px; height: 28px; border-radius: 50%; border: 3px solid ${INK}; background: ${motif}"></span>
        <span style="position: absolute; left: 20px; top: 20px; width: 8px; height: 8px; border-radius: 50%; background: ${INK}"></span>
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 244px; padding: 14px; border: 4px solid ${INK}; background-color: ${YELLOW}; background-image: ${DOTS}; background-size: 7px 7px; box-shadow: 7px 7px 0 ${INK}">

        <div style="display: flex; align-items: flex-start; gap: 12px">
          <span data-part="repeats" aria-hidden="true" style="display: grid; grid-template-columns: repeat(2, 50px); gap: 6px">${tiles}</span>

          <span data-part="burst" style="position: relative; width: 84px; height: 84px; margin-top: 4px; clip-path: ${STAR}; background: ${INK}">
            <span style="position: absolute; inset: 4px; clip-path: ${STAR}; background: ${RED}"></span>
            <span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transform: rotate(-8deg); font-family: ${CONDENSED}; font-size: 22px; font-weight: 700; letter-spacing: 0.04em; color: ${CREAM}; -webkit-text-stroke: 1px ${INK}">NEW!</span>
          </span>
        </div>

        <div data-part="balloon"
             style="position: relative; margin-top: 26px; padding: 10px 12px; border: 3px solid ${INK}; border-radius: 16px; background: ${CREAM}; font-family: ${CONDENSED}; font-size: 19px; font-weight: 700; letter-spacing: 0.03em; line-height: 1.15; color: ${INK}; text-transform: uppercase">
          It worked on the first try!
          <span data-part="tail" aria-hidden="true"
                style="position: absolute; left: 26px; bottom: -22px; width: 28px; height: 22px; background: ${INK}; clip-path: polygon(0 0, 100% 0, 18% 100%)"></span>
          <span aria-hidden="true"
                style="position: absolute; left: 30px; bottom: -16px; width: 20px; height: 16px; background: ${CREAM}; clip-path: polygon(0 0, 100% 0, 20% 100%)"></span>
          <span aria-hidden="true" style="position: absolute; left: 30px; bottom: -3px; width: 20px; height: 3px; background: ${CREAM}"></span>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 244px; margin: 0; text-align: center">
        Flat primaries, one outline weight, dots doing the shading, motif printed four ways.
      </p>
    </div>
  `;
}
