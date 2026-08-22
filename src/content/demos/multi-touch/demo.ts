import { part } from '#src/kit/parts.ts';
import { contactCount, pinchSpread } from '#src/kit/touch.ts';

const CANVAS = { w: 300, h: 150 };
const MAX_SCALE = 2.6;

/** What the surface makes of each contact count: the whole point of the term. */
const READING: Record<number, string> = {
  0: 'No contacts',
  1: 'One contact: a pan, not a pinch',
  2: 'Two contacts: pinching',
  3: 'Three contacts: not a pinch',
};

/**
 * Multi-touch specimen: a photo surface that reports how many contacts are down and
 * changes what it does with them. The subject is the canvas, because the term names the
 * surface that can tell contact counts apart rather than any one contact or the window
 * around it. The topbar, the readout and the resolved-count label are instrumentation and
 * stay in the context register.
 *
 * The count IS the claim, so the demo reads it from `contactCount` rather than inferring
 * it from a gesture it did not ask for, and it holds the highest count it resolved in
 * `data-last` so the distinction survives the fingers lifting. Two contacts pinch through
 * `pinchSpread`; three deliberately do NOT, which is what distinguishing counts means.
 *
 * Nothing here draws a finger. The stage draws every contact, the ghost's discs for the
 * script and the reader's own mirrored pair for a hand (SPEC §7), so painted dots would be
 * double vision. A reader on a mouse stands in for a pair with Ctrl and for three with
 * Ctrl and Shift.
 *
 * The picture scales by a transform inside a clipped canvas and every readout holds its
 * width, so zooming moves nothing but the photograph (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 220px; text-align: right; white-space: nowrap">No contacts</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-contacts="0"
            data-last="0"
            data-gesture="rest"
            data-scale="1.00"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: 50% 50%; background: linear-gradient(150deg, #24303d, #4a7290 58%, #8fb8c9)"
            >
              <span style="position: absolute; left: 34px; top: 20px; width: 52px; height: 52px; border-radius: 50%; background: #f0c37c"></span>
              <span style="position: absolute; left: 116px; top: 50px; width: 26px; height: 36px; background: rgb(16 24 40 / 0.46)"></span>
              <span style="position: absolute; left: 148px; top: 60px; width: 18px; height: 26px; background: rgb(16 24 40 / 0.34)"></span>
              <span style="position: absolute; left: 172px; top: 42px; width: 14px; height: 44px; background: rgb(16 24 40 / 0.52)"></span>
              <span style="position: absolute; left: 0; right: 0; top: 86px; height: 2px; background: rgb(255 255 255 / 0.4)"></span>
              <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 54px; background: linear-gradient(rgb(16 24 40 / 0), rgb(16 24 40 / 0.55))"></span>
            </span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="resolved"
            style="width: ${CANVAS.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >The surface has resolved 0 contacts</span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const photo = part(root, 'photo');
  const readout = part(root, 'readout');
  const resolved = part(root, 'resolved');

  /** The committed zoom, which a pinch leaves behind and a three-contact gesture must not touch. */
  let scale = 1;
  /** The scale the last gesture left behind, which the live signal is measured against. */
  let committed = 1;
  let live = 0;

  const paint = () => {
    photo.style.transform = `scale(${scale.toFixed(3)})`;
    canvas.dataset.scale = scale.toFixed(2);
  };

  contactCount(canvas, {
    onChange: (count) => {
      live = count;
      canvas.dataset.contacts = String(count);
      // The highest count resolved so far survives the lift, so the distinction the
      // surface drew is still readable once the fingers are gone.
      if (count > Number(canvas.dataset.last)) canvas.dataset.last = String(count);
      canvas.dataset.gesture = count === 0 ? 'rest' : count === 2 ? 'pinch' : count === 1 ? 'pan' : 'three';
      readout.textContent = READING[Math.min(3, count)] ?? 'Contacts down';
      resolved.textContent = `The surface has resolved ${canvas.dataset.last} contacts`;
    },
  });

  pinchSpread(canvas, {
    // The signal is relative to where the gesture engaged, so the response anchors on the
    // scale committed at that moment rather than compounding every move into the last one.
    onStart: () => {
      committed = scale;
    },
    onPinch: (ratio) => {
      // Only a pair is a pinch. Three contacts are a different gesture, so the picture
      // holds still and the readout says why, which is the term doing its work.
      if (live !== 2) return;
      scale = Math.min(MAX_SCALE, Math.max(1, committed * ratio));
      paint();
      readout.textContent = `Two contacts: scale ${canvas.dataset.scale}`;
    },
    onEnd: () => {
      committed = scale;
      if (live === 2) readout.textContent = `Pinched to scale ${canvas.dataset.scale}`;
    },
  });

  paint();
}
