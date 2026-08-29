/**
 * Synthwave specimen: the poster played straight. A slatted sun on the horizon, a neon
 * grid running to one vanishing point, mountains cut out of the sky, a star field, and a
 * chrome title in heavy italic capitals. No window frame, no bust, no katakana: those
 * belong to the vaporwave specimen, and the difference between the two is the point.
 *
 * Every colour, the slat spacing, and the chrome ramp are stated inline because the
 * palette is the term. Nothing moves: the scrolling grid is this style's one animated
 * cliche, and a poster is looked at rather than watched, which also spares it a motion
 * gate.
 */
const CHROME =
  'background-image: linear-gradient(180deg, #ffffff 4%, #d7f4ff 34%, #8ad4ff 48%, #ff62c4 62%, #7b2bd1 96%); ' +
  '-webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 0.8px rgb(12 4 34 / 0.9)';

const GRID =
  'repeating-linear-gradient(90deg, rgb(120 240 255 / 0.85) 0 1px, transparent 1px 26px), ' +
  'repeating-linear-gradient(0deg, rgb(255 92 196 / 0.8) 0 1px, transparent 1px 18px)';

const DISPLAY = "'Arial Black', 'Helvetica Neue', 'Impact', var(--sp-font)";
const STARS: [number, number, number][] = [
  [22, 18, 2],
  [58, 34, 1],
  [96, 14, 1],
  [148, 26, 2],
  [196, 12, 1],
  [232, 30, 2],
  [40, 52, 1],
  [214, 54, 1],
];

export function mount(root: HTMLElement): void {
  const slats = [56, 66, 76, 84, 92]
    .map(
      (top, i) =>
        `<span style="position: absolute; left: -2px; right: -2px; top: ${top}px; height: ${3 + i}px; background: rgb(28 6 52 / 0.9)"></span>`,
    )
    .join('');

  const stars = STARS.map(
    ([x, y, size]) =>
      `<span style="position: absolute; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; border-radius: 50%; background: rgb(255 255 255 / 0.9)"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 268px; height: 228px; overflow: hidden; border-radius: 4px; background-image: linear-gradient(180deg, #08021c 0%, #2b0a55 42%, #6b1470 62%, #b62a7c 74%); box-shadow: 0 10px 24px rgb(10 2 30 / 0.5)">

        <span data-part="stars" aria-hidden="true" style="position: absolute; inset: 0">${stars}</span>

        <span data-part="sun" aria-hidden="true"
              style="position: absolute; left: 50%; top: 34px; width: 118px; height: 118px; margin-left: -59px; border-radius: 50%; background-image: linear-gradient(180deg, #fff4a8 4%, #ffb04d 42%, #ff3d84 96%); overflow: hidden">${slats}</span>

        <span data-part="mountains" aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 92px; height: 46px; background: #24063f; clip-path: polygon(0 100%, 0 62%, 16% 22%, 30% 58%, 44% 30%, 58% 66%, 74% 18%, 88% 54%, 100% 34%, 100% 100%)"></span>

        <span aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 90px; height: 2px; background: rgb(255 214 255 / 0.9); box-shadow: 0 0 12px rgb(255 120 220 / 0.85)"></span>

        <span data-part="grid" aria-hidden="true"
              style="position: absolute; left: -70%; right: -70%; bottom: -14px; height: 118px; background-image: ${GRID}; transform: perspective(120px) rotateX(68deg); transform-origin: bottom center"></span>

        <div data-part="title"
             style="position: absolute; left: 0; right: 0; top: 96px; text-align: center; font-family: ${DISPLAY}; font-style: italic; font-size: 33px; font-weight: 900; letter-spacing: 0.06em; line-height: 1; text-transform: uppercase; ${CHROME}">
          Night Drive
        </div>

        <div data-part="strip"
             style="position: absolute; left: 0; right: 0; top: 136px; text-align: center; font-family: ${DISPLAY}; font-size: 9px; letter-spacing: 0.42em; text-indent: 0.42em; color: #9ff3ff; text-shadow: 0 0 10px rgb(80 230 255 / 0.9)">
          OUTRUN 1984
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 268px; margin: 0; text-align: center">
        Slatted sun, one vanishing point, chrome capitals, meant sincerely.
      </p>
    </div>
  `;
}
