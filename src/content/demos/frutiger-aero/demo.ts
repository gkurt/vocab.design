import { part } from '#src/kit/parts.ts';

/** Bubbles: placed by the demo, drifted by the kit, so the float stops under a stated
 *  motion preference and off screen without the demo owning an animation. */
const BUBBLES = [
  { place: 'left: 12%; top: 24%', size: '46px', x: '10px', y: '-22px' },
  { place: 'left: 26%; bottom: 22%', size: '28px', x: '-8px', y: '-30px' },
  { place: 'right: 14%; top: 34%', size: '60px', x: '-14px', y: '-18px' },
  { place: 'right: 30%; bottom: 14%', size: '22px', x: '12px', y: '-26px' },
];

/**
 * Frutiger Aero specimen: the glossy card is the subject and the sky, grass, and
 * bubbles behind it are the scenery the style is traditionally shown against. Gloss is
 * two gradients and a highlight inside the top edge; everything else the era owned
 * (aqua through lime, humanist sans, water where a flat design would use a colour) is
 * stated inline, because the paint is this term's own claim rather than the kit's.
 */
export function mount(root: HTMLElement): void {
  const bubbles = BUBBLES.map(
    (bubble, index) => `
      <span class="sp-drift" aria-hidden="true"
            style="position: absolute; ${bubble.place}; width: ${bubble.size}; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgb(255 255 255 / 0.75); background: radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.95), rgb(180 230 255 / 0.4) 55%, rgb(120 195 240 / 0.22)); --sp-i: ${index}; --sp-drift-time: ${14 + index * 3}s; --sp-drift-x: ${bubble.x}; --sp-drift-y: ${bubble.y}"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="padding: 0">
      <div class="sp-context" data-part="sky" aria-hidden="true"
           style="position: absolute; inset: 0; background-image: radial-gradient(circle at 82% 8%, rgb(255 255 255 / 0.9) 0 6%, transparent 38%), linear-gradient(180deg, #35a7e8, #8fd8f7 46%, #d9f3ff)">
        ${bubbles}
        <span style="position: absolute; left: -6%; right: -6%; bottom: -34px; height: 96px; border-radius: 50% 50% 0 0; background-image: linear-gradient(180deg, #7ed957, #2f8f3d)"></span>
        <span style="position: absolute; left: 18%; right: -18%; bottom: -46px; height: 92px; border-radius: 50% 50% 0 0; background-image: linear-gradient(180deg, #a6e86f, #4aa54a)"></span>
      </div>

      <div data-part="card" data-subject
           style="position: relative; width: 288px; padding: 15px 17px 13px; border: 1px solid rgb(255 255 255 / 0.92); border-radius: 20px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(206 240 255 / 0.78) 52%, rgb(255 255 255 / 0.72)); box-shadow: 0 14px 28px rgb(8 58 92 / 0.32), inset 0 1px 0 rgb(255 255 255 / 0.95); color: #0d3b57; overflow: hidden">
        <span aria-hidden="true"
              style="position: absolute; left: 7px; right: 7px; top: 3px; height: 30px; border-radius: 50%; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.92), rgb(255 255 255 / 0))"></span>

        <div class="sp-row sp-row--between" style="position: relative">
          <div>
            <div data-part="wordmark" style="font-size: 20px; font-weight: 600; letter-spacing: 0.01em">AquaSync</div>
            <div style="font-size: 11px; letter-spacing: 0.06em; color: #2b7fa8">HOME MEDIA, EVERYWHERE</div>
          </div>
          <span data-part="drop" aria-hidden="true"
                style="width: 34px; height: 34px; border-radius: 50% 50% 50% 6px; rotate: -8deg; background: radial-gradient(circle at 34% 26%, rgb(255 255 255 / 0.98), rgb(126 217 247 / 0.85) 52%, rgb(43 148 200 / 0.9)); box-shadow: inset 0 -3px 6px rgb(255 255 255 / 0.6), 0 3px 6px rgb(8 58 92 / 0.28)"></span>
        </div>

        <p style="position: relative; margin: 11px 0 0; font-size: 12px; line-height: 1.5; color: #185a7d">
          Your photos, your music, and your files on every screen in the house.
        </p>

        <div class="sp-row" style="position: relative; margin-top: 13px; gap: 9px">
          <button data-part="start" type="button"
                  style="padding: 8px 20px; border: 1px solid #2f8ec2; border-radius: 999px; background-image: linear-gradient(180deg, #ffffff, #8fd8f7 50%, #2f9fd6); color: #073b56; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 3px 7px rgb(8 58 92 / 0.34), inset 0 1px 0 rgb(255 255 255 / 0.95)">
            Get started
          </button>
          <span style="padding: 6px 14px; border: 1px solid rgb(255 255 255 / 0.9); border-radius: 999px; background-image: linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(198 236 255 / 0.75)); font-size: 12px; font-weight: 600; color: #2b7fa8">Tour</span>
        </div>

        <div data-part="status"
             style="position: relative; height: 17px; margin-top: 9px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: #1c7a45; opacity: 0; transition: opacity 0.25s var(--sp-ease)">
          CONNECTED TO 3 DEVICES
        </div>
      </div>
    </div>
  `;

  const start = part(root, 'start');
  const status = part(root, 'status');

  // Absolute in the one direction it can be resumed from: the pill settles into its
  // pressed gradient and the reserved line is revealed, never toggled (SPEC §8).
  start.addEventListener('click', () => {
    start.style.backgroundImage = 'linear-gradient(180deg, #2f9fd6, #8fd8f7 50%, #ffffff)';
    start.style.boxShadow = 'inset 0 2px 5px rgb(8 58 92 / 0.45)';
    status.style.opacity = '1';
  });
}
