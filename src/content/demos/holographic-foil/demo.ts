import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Holographic foil specimen: one card the reader orbits by dragging, so the colour
 * is demonstrated as a property of the geometry rather than paint sitting on the
 * card. The tilt drives every layer at once: the card rotates in 3D, and the
 * spectral bands slide along it (background-position over oversized, repeated
 * gradients, so the slide is continuous and transitionable), the two colour
 * passes at different rates, which is the interference feel. The strip below
 * carries the same repeated sequence and slides in step, which is the honest
 * part: the order never scrambles, it slides, because it follows the spectrum
 * rather than taste.
 *
 * The paint is inline because the layered gradients and their blend modes are the
 * term. The kit is a flat, single-accent system with no gradient, no metal and no
 * blending at all.
 *
 * The subject is the card surface: the term names a finish on a surface (SPEC §5),
 * and every tilt state is that finish, so identify is honest wherever it lands.
 * The grips are aim anchors for the script's drags (SPEC §5: a data-part and no
 * paint). The drag captures the pointer on a trusted pointerdown (SPEC §7) so a
 * reader's orbit survives leaving the card, and ends on pointerup or
 * pointercancel only. The tilt follows input directly — direct manipulation, not
 * scripted animation — so it needs no reduced-motion gate; the short transitions
 * that smooth it flatten to instant there like everything else.
 */

/** The spectral sequence, in order. Tilting the card slides the start, it never scrambles. */
const HUES = [312, 268, 214, 168, 122, 58, 22, 336] as const;

/** Studio ground: a fixed charcoal in both themes, because foil is judged against a dark. */
const GROUND = '#1b1f27';

/**
 * The metal, laid over the colour rather than under it. Under it the bands would have to
 * blend up through a pale ground and come back washed out, which is exactly the failure the
 * article warns about: a foil that reads as one white highlight instead of a split spectrum.
 */
const SHEEN = [
  'linear-gradient(158deg,',
  'rgb(255 255 255 / 0.6) 0%,',
  'rgb(255 255 255 / 0.04) 26%,',
  'rgb(255 255 255 / 0.44) 52%,',
  'rgb(255 255 255 / 0.02) 74%,',
  'rgb(18 22 32 / 0.24) 100%)',
].join(' ');

/** How far a drag tilts, and how fast: the window's width overshoots the clamp on purpose. */
const MAX_TILT = 20;
const SENS = 0.25;
/** Below this the card counts as head on; the drags land well past it either way. */
const REST = 4;
const CYCLES = 3;

/** The banded sweep, repeated so background-position has a full cycle of slack each way. */
function band(deg: number, alpha: number): string {
  const total = HUES.length * CYCLES;
  const stops: string[] = [];
  for (let k = 0; k <= total; k++) {
    const hue = HUES[k % HUES.length];
    stops.push(`hsl(${hue} 92% 62% / ${alpha}) ${((k / total) * 100).toFixed(2)}%`);
  }
  return `linear-gradient(${deg}deg, ${stops.join(', ')})`;
}

/** The same sequence flattened into countable bands, for the strip under the card. */
function stripBand(): string {
  const total = HUES.length * CYCLES;
  const stops: string[] = [];
  for (let k = 0; k < total; k++) {
    const a = ((k / total) * 100).toFixed(2);
    const b = (((k + 1) / total) * 100).toFixed(2);
    stops.push(`hsl(${HUES[k % HUES.length]} 90% 62%) ${a}% ${b}%`);
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

/** Concentric arcs: the CD reference, kept faint so it never reads as one light source. */
const ARCS = `
  <svg viewBox="0 0 190 118" width="190" height="118" role="presentation"
       style="position: absolute; inset: 0; display: block; opacity: 0.3; mix-blend-mode: soft-light">
    <g fill="none" stroke="#ffffff" stroke-width="1.8">
      <path d="M-20 122a92 92 0 0 1 92-92"/>
      <path d="M-8 122a80 80 0 0 1 80-80"/>
      <path d="M4 122a68 68 0 0 1 68-68"/>
      <path d="M16 122a56 56 0 0 1 56-56"/>
    </g>
  </svg>`;

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One surface, any angle</span>

        <div data-part="stage"
             style="position: relative; display: flex; align-items: center; justify-content: center; height: 168px;
                    border-radius: 8px; background: ${GROUND}; perspective: 700px; touch-action: none; user-select: none">
          <div data-part="card" data-subject data-tilt="rest"
               style="position: relative; width: 190px; height: 118px; overflow: hidden; border-radius: 8px;
                      cursor: grab; transform: rotateX(0deg) rotateY(0deg);
                      background-image: ${SHEEN}, ${band(24, 0.62)}, ${band(118, 1)};
                      background-size: 100% 100%, ${CYCLES * 100}% 100%, ${CYCLES * 100}% 100%;
                      background-position: 0% 0%, 50% 0%, 50% 0%;
                      background-blend-mode: normal, soft-light, normal;
                      transition: transform 0.15s ease-out, background-position 0.15s ease-out;
                      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.45), 0 4px 12px rgb(0 0 0 / 0.45)">
            ${ARCS}
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; top: 16px; width: 30px; height: 22px; border-radius: 4px;
                         background: linear-gradient(140deg, #f0d78d, #a9821f)"></span>
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; bottom: 15px; width: 96px; height: 6px; border-radius: 3px;
                         background: rgb(28 24 34 / 0.5)"></span>
            <span aria-hidden="true"
                  style="position: absolute; left: 14px; bottom: 29px; width: 60px; height: 6px; border-radius: 3px;
                         background: rgb(28 24 34 / 0.34)"></span>
          </div>
          <span data-part="grip-left" style="position: absolute; left: 8px; top: 50%; width: 1px; height: 1px"></span>
          <span data-part="grip-right" style="position: absolute; right: 8px; top: 50%; width: 1px; height: 1px"></span>
        </div>

        <div class="sp-row" style="gap: 10px; align-items: center; margin-top: 10px">
          <div data-part="strip" aria-hidden="true"
               style="flex: 1 1 auto; height: 12px; border-radius: 3px;
                      background-image: ${stripBand()}; background-size: ${CYCLES * 100}% 100%; background-position: 50% 0;
                      transition: background-position 0.15s ease-out"></div>
          <span class="sp-text" data-part="angle" style="width: 118px; margin: 0; font-size: 11px; text-align: right">Head on</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Drag the card. The spectral order slides with the angle, it never scrambles.
      </p>
    </div>
  `;

  const card = part(root, 'card');
  const strip = part(root, 'strip');
  const angle = part(root, 'angle');

  let rx = 0;
  let ry = 0;

  const place = () => {
    card.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`;
    // The two colour passes slide at different rates: the parallax between them is
    // the interference feel, and 50% centres both with a full cycle of slack each way.
    const sweep = 50 + ry * 0.9 + rx * 0.35;
    const film = 50 + ry * 1.4 - rx * 0.5;
    card.style.backgroundPosition = `0% 0%, ${film.toFixed(2)}% 0%, ${sweep.toFixed(2)}% 0%`;
    strip.style.backgroundPosition = `${sweep.toFixed(2)}% 0`;
    card.dataset.tilt = Math.abs(ry) <= REST ? 'rest' : ry > 0 ? 'right' : 'left';
    angle.textContent =
      Math.abs(ry) <= REST && Math.abs(rx) <= REST ? 'Head on' : `Tipped ${Math.abs(Math.round(ry))}° ${ry > 0 ? 'right' : 'left'}`;
  };

  const clamp = (value: number) => Math.min(MAX_TILT, Math.max(-MAX_TILT, value));

  let held: number | null = null;
  let start = { x: 0, y: 0, rx: 0, ry: 0 };

  card.addEventListener('pointerdown', (event) => {
    // Trusted only: the player's synthetic pointer cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    held = event.pointerId;
    start = { ...localPoint(event, root), rx, ry };
    card.style.cursor = 'grabbing';
  });
  card.addEventListener('pointermove', (event) => {
    if (held !== event.pointerId) return;
    const at = localPoint(event, root);
    ry = clamp(start.ry + (at.x - start.x) * SENS);
    rx = clamp(start.rx - (at.y - start.y) * SENS);
    place();
  });
  const drop = (event: PointerEvent) => {
    if (held !== event.pointerId) return;
    held = null;
    card.style.cursor = 'grab';
  };
  card.addEventListener('pointerup', drop);
  card.addEventListener('pointercancel', drop);
}
