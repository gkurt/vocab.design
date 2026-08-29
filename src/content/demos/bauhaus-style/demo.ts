/**
 * Bauhaus specimen: a poster built from the whole vocabulary at once. Three primaries on
 * warm paper, the circle, triangle, and square at poster scale and allowed to overlap,
 * one black diagonal for movement, a rule, and a lowercase geometric sans title flush
 * left on an asymmetric grid.
 *
 * The primaries, the paper, and the overlap blending are stated inline because the
 * palette is the term: the kit has one accent and no red, yellow, or blue. The display
 * face falls back through geometric sans stacks to the kit's own, since a specimen may
 * not fetch a typeface.
 *
 * Static: a poster has no states, so the specimen is looked at rather than watched.
 */
const PAPER = '#f2ece0';
const RED = '#d8392b';
const YELLOW = '#f2b90c';
const BLUE = '#1b4fa8';
const INK = '#191919';
const DISPLAY = "'Futura', 'Century Gothic', 'Avenir Next', var(--sp-font)";

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 232px; height: 246px; padding: 16px; overflow: hidden; background: ${PAPER}; font-family: ${DISPLAY}; color: ${INK}">

        <span data-part="composition" aria-hidden="true"
              style="position: absolute; left: 16px; top: 16px; width: 200px; height: 128px; isolation: isolate">
          <span data-part="square" style="position: absolute; left: 0; top: 22px; width: 96px; height: 96px; background: ${BLUE}"></span>
          <span data-part="circle" style="position: absolute; left: 60px; top: 0; width: 104px; height: 104px; border-radius: 50%; background: ${RED}; mix-blend-mode: multiply"></span>
          <span data-part="triangle" style="position: absolute; left: 108px; top: 34px; width: 92px; height: 92px; background: ${YELLOW}; clip-path: polygon(50% 0, 100% 100%, 0 100%); mix-blend-mode: multiply"></span>
          <span data-part="diagonal" style="position: absolute; left: -14px; top: 96px; width: 232px; height: 7px; background: ${INK}; transform: rotate(-27deg); transform-origin: left center"></span>
        </span>

        <span data-part="rule" aria-hidden="true" style="position: absolute; left: 16px; right: 16px; top: 152px; height: 3px; background: ${INK}"></span>

        <div data-part="title"
             style="position: absolute; left: 16px; right: 40px; top: 162px; font-size: 22px; font-weight: 700; line-height: 1.04; letter-spacing: -0.01em; text-transform: lowercase">
          form<br>follows<br>function
        </div>

        <div data-part="foot"
             style="position: absolute; right: 16px; bottom: 16px; font-size: 8px; letter-spacing: 0.3em; text-indent: 0.3em; writing-mode: vertical-rl; color: ${RED}">
          weimar 1923
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 232px; margin: 0; text-align: center">
        Three primaries, three elementary shapes, one diagonal, lowercase sans.
      </p>
    </div>
  `;
}
