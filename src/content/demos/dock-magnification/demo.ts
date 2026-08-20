import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';

const SCENE = { w: 420, h: 190 };
const BASE = 34;
const GAP = 8;
/** How many pixels the item directly under the pointer gains, and how wide the falloff is. */
const PEAK = 26;
const SIGMA = 52;
const PAD = { x: 10, y: 8 };
const DOCK_BOTTOM = 12;
/** The strip the dock owns. Above it the pointer is on the desktop and the row rests. */
const REACH = 96;

const TILES: { glyph: IconName; wash: string }[] = [
  { glyph: 'inbox', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)' },
  { glyph: 'calendar', wash: 'linear-gradient(160deg, #ef7c5c, #d1492f)' },
  { glyph: 'search', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)' },
  { glyph: 'pencil', wash: 'linear-gradient(160deg, #f2b134, #d18e12)' },
  { glyph: 'heart', wash: 'linear-gradient(160deg, #e8637f, #c23b5c)' },
  { glyph: 'star', wash: 'linear-gradient(160deg, #8f7bf0, #5f4bd4)' },
  { glyph: 'bell', wash: 'linear-gradient(160deg, #56b7d6, #2b8bb0)' },
  { glyph: 'trash', wash: 'linear-gradient(160deg, #8c95a6, #626b7c)' },
];

const REST_ROW_W = TILES.length * BASE + (TILES.length - 1) * GAP;
/** Where each tile's centre sits with nothing magnified: the frame every distance is measured in. */
const REST_LEFT = (SCENE.w - (REST_ROW_W + PAD.x * 2)) / 2 + PAD.x;
const restCentre = (i: number) => REST_LEFT + i * (BASE + GAP) + BASE / 2;

/** The falloff itself: a bell curve, so neighbours ramp down instead of stepping. */
const sizeAt = (distance: number) => BASE + PEAK * Math.exp(-((distance / SIGMA) ** 2));

/**
 * Dock magnification specimen: eight tiles along the bottom of a desktop, each sized by how far
 * its resting centre is from the pointer. Nothing is hovered in the binary sense; every tile in
 * the row gets a size from the same bell curve, which is what makes the row bulge rather than pop
 * one tile bigger.
 *
 * The subject is the dock row, not one tile. The term names what the row does as a whole: a single
 * tile getting bigger is a hover state, and the neighbours ramping down are the other half of the
 * definition. The desktop behind it, the baseline guide and the readout are the scene.
 *
 * The bulge is computed from real `pointermove` events, so a reader who takes the stage over gets
 * it under their own pointer; the scene carries `data-hover-driven` because hovering IS this term's
 * whole interaction, so resting the pointer on the scene takes the stage over without a click. The
 * player's own pointer mirroring is left alone, since nothing here repaints a hover. Every pass
 * ends where it began (the pointer leaves the strip and the row rests flat), so the root declares
 * `data-loop="keep"`: attract iterations reuse this tree instead of remounting it, and audit proves
 * the claim by playing the script twice without a remount between. Distances are measured against the tiles' resting centres, which are arithmetic
 * from the layout rather than read back off the tiles: the tiles are the thing being resized, so
 * measuring them would feed last frame's bulge into this one. The dock is anchored to the bottom of
 * the scene and grows upward and outward from there, so a magnified row can move nothing above it
 * (SPEC §5). `data-mag` reports whether the pointer is in the dock's strip whatever the motion
 * preference, while the resizing itself is gated, so a reader who asked for less movement gets a
 * row that rests flat.
 */
export function mount(root: HTMLElement): void {
  const tile = (spec: (typeof TILES)[number], i: number) => `
    <span
      data-part="tile-${i + 1}"
      style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${BASE}px; height: ${BASE}px;
             border-radius: 9px; background: ${spec.wash}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.3)"
    >${icon(spec.glyph)}</span>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desktop</span>
          <span class="sp-text" data-part="readout" data-mag="off" style="width: 232px; text-align: right; white-space: nowrap">At rest, every tile ${BASE}px</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="scene"
            data-hover-driven
            style="position: relative; width: ${SCENE.w}px; height: ${SCENE.h}px; border-radius: 8px; overflow: hidden;
                   background: linear-gradient(165deg, #2f3b63 0%, #4a5a92 52%, #7d6ba8 100%); touch-action: none"
          >
            <div class="sp-context" style="position: absolute; left: 26px; top: 22px; width: 190px; height: 76px; border-radius: 7px;
                                           background: rgb(255 255 255 / 0.16); border: 1px solid rgb(255 255 255 / 0.24)"></div>
            <div class="sp-context" style="position: absolute; left: 226px; top: 40px; width: 158px; height: 58px; border-radius: 7px;
                                           background: rgb(255 255 255 / 0.11); border: 1px solid rgb(255 255 255 / 0.2)"></div>
            <span
              data-part="away"
              aria-hidden="true"
              style="position: absolute; left: ${SCENE.w / 2}px; top: 18px; width: 1px; height: 1px; pointer-events: none"
            ></span>
            <span
              data-part="baseline"
              aria-hidden="true"
              style="position: absolute; left: 10px; right: 10px; bottom: ${DOCK_BOTTOM - 8}px; height: 2px;
                     background: rgb(255 255 255 / 0.5); pointer-events: none"
            ></span>
            <div
              class="sp-row"
              data-part="dock"
              data-subject
              data-mag="off"
              style="position: absolute; left: 50%; bottom: ${DOCK_BOTTOM}px; translate: -50% 0; align-items: flex-end; gap: ${GAP}px;
                     padding: ${PAD.y}px ${PAD.x}px; border-radius: 16px; background: rgb(255 255 255 / 0.2);
                     border: 1px solid rgb(255 255 255 / 0.3); backdrop-filter: blur(8px)"
            >${TILES.map(tile).join('')}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const dock = part(root, 'dock');
  const readout = part(root, 'readout');
  const tiles = TILES.map((_, i) => part(root, `tile-${i + 1}`));
  const reduced = prefersReducedMotion(root);

  const say = (mag: boolean, text: string) => {
    const state = mag ? 'on' : 'off';
    dock.dataset.mag = state;
    readout.dataset.mag = state;
    readout.textContent = text;
  };

  const rest = () => {
    for (const el of tiles) {
      el.style.width = `${BASE}px`;
      el.style.height = `${BASE}px`;
    }
    say(false, `At rest, every tile ${BASE}px`);
  };

  const magnify = (x: number) => {
    if (reduced) return say(true, 'Reduced motion: the row rests flat');
    let largest = BASE;
    tiles.forEach((el, i) => {
      const size = sizeAt(Math.abs(x - restCentre(i)));
      el.style.width = `${size.toFixed(1)}px`;
      el.style.height = `${size.toFixed(1)}px`;
      largest = Math.max(largest, size);
    });
    say(true, `Largest tile ${Math.round(largest)}px, farthest still ${BASE}px`);
  };

  scene.addEventListener('pointermove', (event: PointerEvent) => {
    const box = scene.getBoundingClientRect();
    const y = event.clientY - box.top;
    if (y < SCENE.h - REACH) return rest();
    magnify(event.clientX - box.left);
  });

  // The pointer leaving the desktop entirely is a release, and the row goes home.
  scene.addEventListener('pointerleave', rest);
}
