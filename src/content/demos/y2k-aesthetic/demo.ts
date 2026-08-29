import { part } from '#src/kit/parts.ts';

/**
 * Y2K specimen: one card carrying the whole vocabulary. Chrome type (a metal gradient
 * clipped to the glyphs, kept visible by a stroke so the headline survives a browser
 * that cannot clip a background to text), translucent plastic with a gloss highlight
 * inside its top edge, bubble lozenges, a glossy pill, and a four point lens flare
 * built from three plain spans, since a demo has no pseudo-elements to draw with.
 *
 * The card is the subject and the sky behind it is scenery: the treatment is what the
 * term names, not the backdrop it is traditionally shown over. The sky's orbs are held
 * inside it rather than hung over its floor, so the stage has nothing to amputate.
 */
export function mount(root: HTMLElement): void {
  const chrome =
    'background-image: linear-gradient(180deg, #f7fbff 6%, #9fc4e8 34%, #2f5f9c 50%, #dfeeff 58%, #7fa6cf 78%, #eaf4ff); ' +
    '-webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 0.7px rgb(18 44 84 / 0.9)';

  root.innerHTML = `
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="sky" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: radial-gradient(circle at 78% 12%, rgb(255 255 255 / 0.85) 0 8%, transparent 40%), linear-gradient(180deg, #6fc2f5, #b9e6ff 52%, #e9f7ff)">
        <span style="position: absolute; left: 8%; top: 62%; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.9), rgb(146 214 255 / 0.35) 58%, rgb(90 170 230 / 0.25)); filter: blur(1px)"></span>
        <span style="position: absolute; right: 6%; bottom: 0; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle at 30% 26%, rgb(255 255 255 / 0.8), rgb(160 224 255 / 0.3) 60%, rgb(80 160 220 / 0.2))"></span>
      </div>

      <div data-part="card" data-subject
           style="position: relative; width: 276px; padding: 16px 18px 14px; border: 1px solid rgb(255 255 255 / 0.9); border-radius: 24px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.94), rgb(210 236 255 / 0.72) 46%, rgb(255 255 255 / 0.66)); box-shadow: 0 12px 26px rgb(16 58 116 / 0.34), inset 0 1px 0 rgb(255 255 255 / 0.95), inset 0 -12px 20px rgb(255 255 255 / 0.5); color: #123a6b; overflow: hidden">
        <span aria-hidden="true"
              style="position: absolute; left: 8px; right: 8px; top: 3px; height: 34px; border-radius: 50%; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(255 255 255 / 0))"></span>

        <span data-part="flare" aria-hidden="true" style="position: absolute; right: 16px; top: 22px; width: 56px; height: 56px">
          <span style="position: absolute; left: 0; right: 0; top: 26px; height: 3px; background-image: linear-gradient(90deg, transparent, #ffffff 50%, transparent)"></span>
          <span style="position: absolute; top: 0; bottom: 0; left: 26px; width: 3px; background-image: linear-gradient(180deg, transparent, #ffffff 50%, transparent)"></span>
          <span style="position: absolute; inset: 18px; border-radius: 50%; background: radial-gradient(circle, #ffffff 20%, rgb(255 255 255 / 0.45) 45%, transparent 70%)"></span>
        </span>

        <div data-part="wordmark" style="position: relative; font-size: 30px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; ${chrome}">
          PORTAL
        </div>
        <div style="position: relative; font-size: 11px; font-weight: 700; letter-spacing: 0.24em; color: #2f6bab">MMI EDITION</div>

        <div class="sp-row" style="position: relative; margin-top: 12px; gap: 6px">
          <span style="padding: 3px 11px; border: 1px solid rgb(255 255 255 / 0.9); border-radius: 999px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(154 214 255 / 0.8)); box-shadow: 0 2px 5px rgb(16 58 116 / 0.24); font-size: 11px; font-weight: 700">CHAT</span>
          <span style="padding: 3px 11px; border: 1px solid rgb(255 255 255 / 0.9); border-radius: 999px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(198 178 255 / 0.85)); box-shadow: 0 2px 5px rgb(16 58 116 / 0.24); font-size: 11px; font-weight: 700">TUNES</span>
          <span style="padding: 3px 11px; border: 1px solid rgb(255 255 255 / 0.9); border-radius: 999px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(168 245 214 / 0.85)); box-shadow: 0 2px 5px rgb(16 58 116 / 0.24); font-size: 11px; font-weight: 700">PIX</span>
        </div>

        <button data-part="enter" type="button"
                style="position: relative; margin-top: 14px; padding: 8px 22px; border: 1px solid #3f7cc0; border-radius: 999px; background-image: linear-gradient(180deg, #ffffff, #8fc6f2 52%, #3d80c6); color: #0e2f57; font: inherit; font-size: 13px; font-weight: 800; letter-spacing: 0.1em; cursor: pointer; box-shadow: 0 3px 8px rgb(16 58 116 / 0.4), inset 0 1px 0 rgb(255 255 255 / 0.95)">
          ENTER
        </button>

        <div data-part="status"
             style="position: relative; height: 18px; margin-top: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #2f6bab; opacity: 0; transition: opacity 0.25s var(--sp-ease)">
          CONNECTED AT 56.6K
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="position: relative; max-width: 276px; text-align: center; color: #16456f">
        Chrome type, bubble lozenges, translucent plastic, one flare.
      </p>
    </div>
  `;

  const enter = part(root, 'enter');
  const status = part(root, 'status');

  // Absolute in both directions it could be resumed from: the pill settles into its
  // pressed gradient and the reserved status line is revealed, never toggled.
  enter.addEventListener('click', () => {
    enter.style.backgroundImage = 'linear-gradient(180deg, #3d80c6, #8fc6f2 52%, #ffffff)';
    enter.style.boxShadow = 'inset 0 2px 5px rgb(16 58 116 / 0.5)';
    status.style.opacity = '1';
  });
}
