/**
 * Acid graphics specimen: a rave flyer rebuilt as a poster. A checkerboard floor thrown
 * into forced perspective, a liquid chrome headline outlined in acid green, a 1988 smiley,
 * a wireframe globe, concentric rings, and a sticker dropped on at an angle, all over near
 * black with the hues left to clash.
 *
 * The poster is the subject; the caption below it is scenery. Every colour, the chrome
 * gradient, and the checker are stated inline because they are this term's own claim: the
 * kit has one accent on purpose and none of this could be spelled with it.
 *
 * Static, like every composition specimen: a poster has no states to watch.
 */
const FACE = "'Arial Black', 'Helvetica Neue', Impact, var(--sp-font)";
const MONO = "'Courier New', ui-monospace, monospace";
const BLACK = '#08090a';
const ACID = '#c8ff00';
const MAGENTA = '#ff2bd6';
const CYAN = '#31e8ff';
const CHROME = 'linear-gradient(178deg, #ffffff 2%, #b9c6d8 20%, #66768f 38%, #ffffff 52%, #8b9ab2 68%, #dbe6f5 84%, #5d6b82 100%)';
const CHECKER = `repeating-conic-gradient(${ACID} 0% 25%, ${BLACK} 0% 50%)`;

export function mount(root: HTMLElement): void {
  const smiley = `
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="${ACID}"/>
      <ellipse cx="16" cy="19" rx="2.6" ry="4.4" fill="${BLACK}"/>
      <ellipse cx="32" cy="19" rx="2.6" ry="4.4" fill="${BLACK}"/>
      <path d="M12 28c3.6 7.4 20.4 7.4 24 0" fill="none" stroke="${BLACK}" stroke-width="3.4" stroke-linecap="round"/>
    </svg>`;

  const globe = `
    <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" style="stroke: ${CYAN}; fill: none; stroke-width: 1.1">
      <circle cx="22" cy="22" r="20"/>
      <ellipse cx="22" cy="22" rx="8" ry="20"/>
      <ellipse cx="22" cy="22" rx="15" ry="20"/>
      <path d="M2.6 15h38.8M2.6 29h38.8M2 22h40"/>
    </svg>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 256px; height: 244px; background: ${BLACK}; font-family: ${FACE}; overflow: hidden">

        <span aria-hidden="true"
              style="position: absolute; top: -40px; right: -30px; width: 180px; height: 150px;
                     background: radial-gradient(circle at 60% 40%, rgb(255 43 214 / 0.55), transparent 68%)"></span>

        <span data-part="checker" aria-hidden="true"
              style="position: absolute; left: -70px; right: -70px; bottom: 0; height: 250px;
                     background-image: ${CHECKER}; background-size: 34px 34px; opacity: 0.5;
                     transform: perspective(420px) rotateX(60deg); transform-origin: 50% 100%"></span>

        <span aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: 42px;
                     background-image: linear-gradient(to top, ${BLACK} 12%, transparent)"></span>

        <span data-part="eyebrow"
              style="position: absolute; top: 13px; left: 15px; font-family: ${MONO}; font-size: 10px; font-weight: 700;
                     letter-spacing: 0.22em; color: ${ACID}">RAVE//04</span>

        <span data-part="smiley" aria-hidden="true"
              style="position: absolute; top: 12px; right: 14px; line-height: 0; transform: rotate(-12deg)">${smiley}</span>

        <span data-part="title"
              style="position: absolute; top: 52px; left: 13px; font-size: 54px; line-height: 0.9; letter-spacing: -0.03em;
                     background-image: ${CHROME}; -webkit-background-clip: text; background-clip: text; color: transparent;
                     -webkit-text-stroke: 1.4px ${ACID}; transform: skewX(-7deg) scaleY(1.16); transform-origin: 0 50%">ACID</span>

        <span data-part="globe" aria-hidden="true"
              style="position: absolute; top: 64px; right: 18px; line-height: 0">${globe}</span>

        <span data-part="subtitle"
              style="position: absolute; top: 122px; left: 15px; font-family: ${MONO}; font-size: 10px; font-weight: 700;
                     letter-spacing: 0.34em; color: ${CYAN}">LIQUID METAL</span>

        <span data-part="sticker"
              style="position: absolute; top: 150px; left: 16px; padding: 4px 11px; background: ${MAGENTA}; color: ${BLACK};
                     font-size: 12px; letter-spacing: 0.05em; border-radius: 999px; transform: rotate(-7deg)">24 HRS</span>

        <span data-part="rings" aria-hidden="true"
              style="position: absolute; bottom: 46px; right: 20px; width: 58px; height: 58px; border-radius: 50%;
                     background-image: repeating-radial-gradient(circle, ${MAGENTA} 0 2px, transparent 2px 7px)"></span>

        <span data-part="foot"
              style="position: absolute; bottom: 12px; left: 15px; font-family: ${MONO}; font-size: 9px; font-weight: 700;
                     letter-spacing: 0.16em; color: ${ACID}">SAT 04 // WAREHOUSE 12</span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 256px; margin: 0; text-align: center">
        Chrome type, clashing hues on black, a smiley and a wireframe globe.
      </p>
    </div>
  `;
}
