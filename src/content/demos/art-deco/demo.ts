/**
 * Art Deco specimen: a poster card built on a vertical axis. A fanned sunburst at the
 * top, a stepped ziggurat at the foot, a doubled frame with cut corners, letterspaced
 * geometric capitals, and gold over deep emerald. Every element is centred on the same
 * axis, which is the part of the style that is structural rather than decorative.
 *
 * The palette and the metallic gradient are stated inline because they are the term:
 * the kit has one accent and a chroma-free neutral, and neither of them is gold. The
 * display face falls back through geometric sans stacks to the kit's own, since a
 * specimen may not fetch a typeface.
 *
 * Static: a poster has no states, so the specimen is looked at rather than watched.
 */
const GROUND = '#0c2b26';
const GOLD = '#c9a24b';
const GOLD_FACE = 'linear-gradient(180deg, #f5e3ab 4%, #c9a24b 46%, #8a6a24 96%)';
const DISPLAY = "'Futura', 'Century Gothic', 'Avenir Next', var(--sp-font)";
const FAN = `repeating-conic-gradient(from 270deg at 50% 100%, ${GOLD} 0deg 2.4deg, transparent 2.4deg 11deg)`;

export function mount(root: HTMLElement): void {
  const steps = [116, 82, 48].map((w) => `<span style="width: ${w}px; height: 4px; background-image: ${GOLD_FACE}"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; display: flex; flex-direction: column; align-items: center; width: 226px; height: 224px; padding: 14px 16px 12px; background: radial-gradient(120% 90% at 50% 8%, #14413a 0%, ${GROUND} 62%); color: ${GOLD}; border: 2px solid ${GOLD}; font-family: ${DISPLAY}; overflow: hidden">

        <span data-part="frame" aria-hidden="true"
              style="position: absolute; inset: 6px; border: 1px solid rgb(201 162 75 / 0.55); clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)"></span>

        <span data-part="fan" aria-hidden="true"
              style="position: relative; width: 124px; height: 54px; border-radius: 124px 124px 0 0; background-image: ${FAN}"></span>
        <span data-part="sun" aria-hidden="true"
              style="position: relative; width: 40px; height: 20px; margin-top: -20px; border-radius: 40px 40px 0 0; background-image: ${GOLD_FACE}"></span>

        <span data-part="rule" aria-hidden="true" style="position: relative; display: flex; align-items: center; gap: 6px; width: 146px; margin-top: 12px">
          <span style="flex: 1 1 0; height: 1px; background: ${GOLD}"></span>
          <span style="width: 7px; height: 7px; background-image: ${GOLD_FACE}; transform: rotate(45deg)"></span>
          <span style="flex: 1 1 0; height: 1px; background: ${GOLD}"></span>
        </span>

        <div data-part="title" style="position: relative; margin-top: 10px; font-size: 25px; font-weight: 700; letter-spacing: 0.26em; line-height: 1; text-indent: 0.26em; background-image: ${GOLD_FACE}; -webkit-background-clip: text; background-clip: text; color: transparent">
          SAVOY
        </div>
        <div data-part="subtitle" style="position: relative; margin-top: 6px; font-size: 9px; letter-spacing: 0.3em; text-indent: 0.3em; color: rgb(233 213 165 / 0.9)">
          SUPPER CLUB
        </div>

        <span data-part="steps" aria-hidden="true"
              style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; margin-top: auto">${steps}</span>
        <div data-part="foot" style="position: relative; margin-top: 8px; font-size: 8px; letter-spacing: 0.32em; text-indent: 0.32em; color: rgb(201 162 75 / 0.8)">
          EST. MCMXXVII
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 226px; margin: 0; text-align: center">
        One vertical axis, everything mirrored across it. Fan above, ziggurat below.
      </p>
    </div>
  `;
}
