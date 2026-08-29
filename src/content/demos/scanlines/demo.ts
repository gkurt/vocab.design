import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Scanlines specimen: a broadcast test card behind the raster, so the term is the
 * overlay rather than a costume. Everything under the lines is ordinary: a channel
 * number, a clock, colour bars. The switcher takes the raster away and puts it back,
 * which is the only way to show what one repeating gradient is actually doing.
 *
 * The tube colours, the vignette, and the line period are stated inline because they
 * are the term. The overlay is inert: `aria-hidden`, no pointer events, decoration
 * only.
 *
 * The warm-up flicker plays through `element.animate`, which `motion.css` cannot
 * reach, so the demo asks `prefersReducedMotion` itself and lands on the lit screen
 * without the flash (SPEC §7). It is one shot, tied to the raster coming back, so
 * nothing here runs while the specimen is idle.
 */
const RASTER = 'repeating-linear-gradient(to bottom, rgb(0 0 0 / 0.44) 0 1px, transparent 1px 3px)';
const VIGNETTE = 'radial-gradient(120% 100% at 50% 46%, transparent 42%, rgb(2 6 10 / 0.62) 100%)';
const BARS = ['#c8c8c8', '#c8c800', '#00c8c8', '#00c832', '#c800c8', '#c81e1e', '#2a2ac8'];

export function mount(root: HTMLElement): void {
  const bars = BARS.map((colour) => `<span style="flex: 1 1 0; background: ${colour}"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="screen" data-subject
           style="position: relative; width: 300px; height: 172px; padding: 14px 16px; border-radius: 16px / 22px; background: #0d1418; color: #d8f0ff; overflow: hidden; box-shadow: inset 0 0 40px rgb(120 200 255 / 0.12), 0 0 0 4px #23282c, 0 10px 24px rgb(0 0 0 / 0.45)">
        <div data-part="content"
             style="position: relative; height: 100%; display: flex; flex-direction: column; text-shadow: 0 0 8px rgb(150 220 255 / 0.55)">
          <div style="display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.24em">
            <span>CH 04</span>
            <span style="font-variant-numeric: tabular-nums">23:47</span>
          </div>
          <div style="flex: 1 1 auto; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; letter-spacing: 0.14em">
            TEST CARD
          </div>
          <div data-part="bars" aria-hidden="true" style="display: flex; height: 26px; opacity: 0.82">${bars}</div>
        </div>

        <span aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none; background-image: ${VIGNETTE}"></span>
        <span data-part="raster" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${RASTER}; transition: opacity 0.18s linear"></span>
      </div>

      <div class="sp-context sp-row" style="gap: 8px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Raster" data-part="switcher" data-value="on">
          <button class="sp-segment" type="button" data-part="seg-on" value="on">Over</button>
          <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        One repeating gradient, one pixel dark every three, laid over a picture that is otherwise flat.
      </p>
    </div>
  `;

  const screen = part(root, 'screen');
  const raster = part(root, 'raster');

  // Each segment names a state, so a resumed or fast-forwarded pass lands on the same
  // screen rather than on whichever state it happened to find (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => {
    const next = (event as CustomEvent<string>).detail;
    raster.style.opacity = next === 'on' ? '1' : '0';
    if (next !== 'on' || prefersReducedMotion(root)) return;
    screen.animate([{ filter: 'brightness(1.4)' }, { filter: 'brightness(0.78)' }, { filter: 'brightness(1)' }], {
      duration: 420,
      easing: 'ease-out',
    });
  });
}
