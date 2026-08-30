import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import { pinchSpread } from '#src/kit/touch.ts';

/** The canvas's fixed inner size; the scene's transform is clamped so it always covers it. */
const W = 322;
const H = 152;
const MIN_SCALE = 1;
const MAX_SCALE = 4;

/** Stand-in coastline, with a lighthouse for the first gesture to anchor on. */
const SCENE = `
  <div style="position: absolute; inset: 0; background: linear-gradient(#a9cbe6, #e2edf3 58%, #cdd8c6)"></div>
  <div style="position: absolute; left: 18%; top: 14%; width: 30px; height: 30px; border-radius: 50%; background: #f7d685"></div>
  <div style="position: absolute; left: -14%; bottom: 30%; width: 64%; height: 40%; border-radius: 50% 50% 0 0; background: #8298a7"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 30%; background: #527082"></div>
  <div style="position: absolute; left: 60.6%; top: 36%; width: 9px; height: 26px; border-radius: 2px 2px 0 0; background: #f4f1ea"></div>
  <div style="position: absolute; left: 60.6%; top: 36%; width: 9px; height: 7px; border-radius: 2px 2px 0 0; background: #c0503f"></div>
  <div style="position: absolute; left: 24%; bottom: 12%; width: 30px; height: 9px; border-radius: 3px; background: #33495a"></div>
`;

/**
 * Pinch to zoom specimen: a canvas whose scale is anchored to the point the two
 * fingers meet, not to the middle of the box. The subject is the canvas, since the
 * term names the surface the gesture scales rather than the picture inside it.
 *
 * The gesture is performed, never picked: the choreography's `pinch` step, a real
 * two-finger pinch, and a reader's modifier+drag all arrive through `pinchSpread` as
 * one scale signal, and the trackpad's pinch (a wheel event with ctrlKey set) is
 * wired beside it. The zoom anchors at the reported gesture centre (the content
 * point under the fingers stays under them) with the pan clamped so the scene
 * always covers the canvas, which is what snaps everything home at 1x. The two
 * grips are aim anchors for the script (SPEC §5: a data-part and no paint); the
 * dot marks where the last gesture anchored, which is the term's own claim.
 *
 * The scale is a transform inside a fixed box, so a zoomed canvas never moves
 * anything around it (SPEC §5), and the readout holds its width at every factor.
 *
 * A badge on the canvas used to read "Anchored between the fingers" and then narrate
 * the gesture ("Pinch open: scale up"), and a line under it told the reader which
 * inputs work: "Two fingers or a trackpad pinch; a mouse holds Ctrl and drags." Both
 * were the site captioning its own demonstration inside a map viewer that would print
 * neither, so both went. The anchor dot and the scale readout carry the claim, and the
 * article says which inputs a pinch arrives on.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lighthouse</span>
          <span class="sp-text" data-part="readout" style="width: 108px; text-align: right">Scale 1x</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-touch
            data-scale="1"
            style="position: relative; overflow: hidden; width: ${W}px; height: ${H}px; touch-action: none; user-select: none"
          >
            <div
              data-part="scene"
              style="position: absolute; inset: 0; transform: translate(0px, 0px) scale(1); transform-origin: 0 0; transition: transform 0.09s linear"
            >${SCENE}</div>
            <span
              data-part="anchor"
              style="position: absolute; left: 0; top: 0; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.2s var(--sp-ease)"
            ></span>
            <span data-part="grip-a" style="position: absolute; left: 62%; top: 42%; width: 1px; height: 1px"></span>
            <span data-part="grip-b" style="position: absolute; left: 30%; top: 45%; width: 1px; height: 1px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const scene = part(root, 'scene');
  const anchor = part(root, 'anchor');
  const readout = part(root, 'readout');

  let s = 1;
  let tx = 0;
  let ty = 0;

  const render = (view: { s: number; tx: number; ty: number }) => {
    scene.style.transform = `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`;
    // One decimal for both, so the attribute an assert reads never disagrees
    // with the readout, and a hair of float error never misses a named factor.
    canvas.dataset.scale = String(Number(view.s.toFixed(1)));
    readout.textContent = `Scale ${Number(view.s.toFixed(1))}x`;
  };

  const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

  /** The term's whole claim: the content point under `c` before the zoom is still under it after. */
  const zoomAt = (factor: number, c: { x: number; y: number }, from = { s, tx, ty }) => {
    const ns = clamp(from.s * factor, MIN_SCALE, MAX_SCALE);
    return {
      s: ns,
      tx: clamp(c.x - ((c.x - from.tx) / from.s) * ns, W * (1 - ns), 0),
      ty: clamp(c.y - ((c.y - from.ty) / from.s) * ns, H * (1 - ns), 0),
    };
  };

  /**
   * Client coordinates to canvas coordinates. The canvas itself never transforms, so its
   * rect is safe to read; the scale a listing card draws it at is not the specimen's own,
   * and everything measured here goes back out as a length.
   */
  const toCanvas = (client: { x: number; y: number }) => localPoint({ clientX: client.x, clientY: client.y }, canvas);

  const mark = (at: { x: number; y: number }) => {
    anchor.style.left = `${at.x}px`;
    anchor.style.top = `${at.y}px`;
    anchor.style.opacity = '1';
  };

  /** The view a gesture measures from, snapshotted as it engages so the anchor holds for its whole run. */
  let grip = { s: 1, tx: 0, ty: 0, at: { x: 0, y: 0 } };

  pinchSpread(canvas, {
    onStart: (center) => {
      grip = { s, tx, ty, at: toCanvas(center) };
      mark(grip.at);
    },
    onPinch: (factor) => render(zoomAt(factor, grip.at, grip)),
    onEnd: (factor) => {
      ({ s, tx, ty } = zoomAt(factor, grip.at, grip));
      render({ s, tx, ty });
    },
  });

  // The trackpad pinch, for real: browsers deliver it as a wheel event with ctrlKey set.
  canvas.addEventListener(
    'wheel',
    (event) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      const at = toCanvas({ x: event.clientX, y: event.clientY });
      mark(at);
      ({ s, tx, ty } = zoomAt(Math.exp(-event.deltaY * 0.0035), at));
      render({ s, tx, ty });
    },
    { passive: false },
  );
}
