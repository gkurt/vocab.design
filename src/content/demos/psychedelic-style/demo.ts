/**
 * Psychedelic specimen: a 1967 dance poster. Concentric contour bands in a complementary
 * pair set at nearly the same lightness, so the boundaries shimmer, a kaleidoscopic rosette
 * in the corner, and hand-lettering flavour built by stretching each line until the block
 * fills the ellipse cut for it.
 *
 * The lettering cannot be a real Wes Wilson face (a specimen fetches nothing), so the shape
 * filling is done the way the term describes it rather than with a typeface: each line takes
 * its own horizontal scale and the counters are closed up with negative tracking. The two
 * inks are stated inline because the vibration between them is the term, and it cannot be
 * spelled with a kit token.
 *
 * Static: a poster has no states, so the specimen is looked at rather than watched.
 */
const ORANGE = '#ee5f14';
const BLUE = '#3b46d8';
const FACE = "'Bookman Old Style', 'Cooper Black', Georgia, var(--sp-font)";

/** One line of lettering, stretched to fill the width the shape leaves it. */
function line(text: string, size: number, scale: number, part: string): string {
  return `<span data-part="${part}"
    style="display: block; font-size: ${size}px; line-height: 0.94; letter-spacing: -0.055em;
           transform: scaleX(${scale}); transform-origin: 50% 50%">${text}</span>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 246px; height: 238px; overflow: hidden; background: ${ORANGE};
                  font-family: ${FACE}; font-weight: 700">

        <span data-part="swirl" aria-hidden="true"
              style="position: absolute; inset: -30%; transform: rotate(-9deg);
                     background-image: repeating-radial-gradient(ellipse 62% 46% at 50% 50%,
                       ${BLUE} 0 11px, ${ORANGE} 11px 23px)"></span>

        <span data-part="rosette" aria-hidden="true"
              style="position: absolute; top: -34px; right: -36px; width: 130px; height: 130px; border-radius: 50%;
                     opacity: 0.85;
                     background-image: repeating-conic-gradient(from 6deg at 50% 50%,
                       ${ORANGE} 0 7deg, ${BLUE} 7deg 14deg)"></span>

        <span data-part="shape" aria-hidden="true"
              style="position: absolute; left: 14px; right: 14px; top: 54px; height: 128px;
                     border-radius: 50% / 42%; background: ${ORANGE}; box-shadow: 0 0 0 4px ${BLUE}"></span>

        <div data-part="lettering"
             style="position: absolute; left: 30px; right: 30px; top: 66px; height: 104px; display: flex;
                    flex-direction: column; align-items: center; justify-content: center; gap: 2px;
                    color: ${BLUE}; text-align: center">
          ${line('AVALON', 30, 1.02, 'line-one')}
          ${line('BALLROOM', 25, 1.06, 'line-two')}
          ${line('SEPT 8 9 10', 15, 1.3, 'line-three')}
        </div>

        <span data-part="eyebrow"
              style="position: absolute; top: 12px; left: 0; padding: 3px 14px 4px 12px; background: ${BLUE};
                     border-radius: 0 999px 999px 0; color: ${ORANGE}; font-size: 13px; letter-spacing: 0.02em;
                     transform: scaleX(1.08); transform-origin: 0 50%">TWO NIGHTS</span>

        <span data-part="foot"
              style="position: absolute; bottom: 10px; left: 0; right: 0; padding: 3px 0 4px; background: ${BLUE};
                     text-align: center; font-size: 12px; letter-spacing: 0.16em; color: ${ORANGE}">SAN FRANCISCO</span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        Two inks at one lightness buzz along every edge; the words fill the shape.
      </p>
    </div>
  `;
}
