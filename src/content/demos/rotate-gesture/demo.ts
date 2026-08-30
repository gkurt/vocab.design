import { part } from '#src/kit/parts.ts';
import { pinchSpread } from '#src/kit/touch.ts';

const CANVAS = { w: 300, h: 150 };

/** The range the photo is allowed to turn, and how close to level a live turn sticks. */
const LIMIT = 25;
const DETENT = 5;

/**
 * Rotate gesture specimen: a photo canvas that turns under two orbiting contacts. A
 * strong horizon runs across the photograph so a turn of ten degrees is legible at
 * specimen size, and the photograph is inset well past the canvas on every side so a
 * rotation never uncovers a corner.
 *
 * The gesture is performed, never picked: the canvas is a touch surface wired through
 * `pinchSpread`, so the script's `pinch` step with a `turn`, a real two-finger twist,
 * and a reader's modifier+drag (swinging around the mirror centre) all arrive as one
 * rotation signal. The contacts themselves are drawn by the stage (the ghost's twin
 * discs in attract, the reader's own mirrored pair in takeover), so the demo draws
 * only what the term names: the surface, turning. Cardinal detents apply to the live
 * signal (fingers wobble and level should stick), and the turn is clamped to a range
 * a photo-straightening surface would keep.
 *
 * The subject is the canvas: the term names the surface that turns under the pair,
 * not either contact and not the window around it. One contact says so and changes
 * nothing, which is the term's own nuance and worth a readout line.
 *
 * A line under the frame read "Two fingers twist; a mouse holds Ctrl, drags, and swings.",
 * which is the site telling the reader how to work the exhibit. The article says it, so
 * the line went; the readout in the title bar still answers a mouse that arrives without
 * the modifier.
 *
 * Everything but the photograph holds its place and its width, so a turn moves only
 * the picture (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 228px; text-align: right; white-space: nowrap">Level</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-touch
            data-contacts="0"
            data-gesture="rest"
            data-angle="0"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: -70px; transform: rotate(0deg); transform-origin: 50% 50%; background: linear-gradient(#5c7fb0, #a8c2dc 46%, #d9c9a6 46%, #b79a68)"
            >
              <span style="position: absolute; left: 108px; top: 92px; width: 44px; height: 44px; border-radius: 50%; background: #f6dda0"></span>
              <span style="position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; background: rgb(16 24 40 / 0.42)"></span>
              <span style="position: absolute; left: 232px; top: 96px; width: 54px; height: 46px; background: rgb(16 24 40 / 0.38)"></span>
              <span style="position: absolute; left: 300px; top: 112px; width: 38px; height: 30px; background: rgb(16 24 40 / 0.28)"></span>
              <span style="position: absolute; left: 96px; top: 168px; width: 250px; height: 4px; background: rgb(255 255 255 / 0.35)"></span>
            </span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="angle"
            style="width: ${CANVAS.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >fingers level, photo turned 0&deg;</span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const photo = part(root, 'photo');
  const readout = part(root, 'readout');
  const angleLabel = part(root, 'angle');

  /** The angle the surface has committed to, the one it is showing, and the gesture's base. */
  let settled = 0;
  let live = 0;
  let baseTurn = 0;

  const say = (text: string) => {
    readout.textContent = text;
  };

  /** Cardinal detent, for the live signal only: fingers wobble and level should stick. */
  const detent = (deg: number) => (Math.abs(deg) <= DETENT ? 0 : deg);

  const place = (deg: number) => {
    live = detent(Math.max(-LIMIT, Math.min(LIMIT, deg)));
    photo.style.transform = `rotate(${live.toFixed(2)}deg)`;
    const shown = Math.round(live);
    canvas.dataset.angle = String(shown);
    angleLabel.textContent = shown === 0 ? 'fingers level, photo turned 0°' : `fingers at ${shown}°, photo turned ${shown}°`;
  };

  pinchSpread(canvas, {
    onStart: () => {
      baseTurn = settled;
      canvas.dataset.gesture = 'turning';
      say('Two contacts: turning');
    },
    onPinch: (_scale, turn) => {
      place(baseTurn + turn);
      say(live === 0 ? 'Snapped level' : `Turning: ${Math.round(live)}° off level`);
    },
    onEnd: () => {
      settled = live;
      canvas.dataset.gesture = Math.round(live) === 0 ? 'rest' : 'turned';
      say(`Turned to ${Math.round(live)}°`);
    },
  });

  // The term's own nuance, kept as a readout line: one contact is not a turn.
  const fingers = new Set<number>();
  canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      fingers.add(event.pointerId);
      canvas.dataset.contacts = String(fingers.size);
      if (fingers.size === 1) say('One contact: a turn needs two');
    } else if (!event.ctrlKey) {
      say('A mouse turn holds Ctrl and drags');
    }
  });
  const lift = (event: PointerEvent) => {
    if (!fingers.delete(event.pointerId)) return;
    canvas.dataset.contacts = String(fingers.size);
  };
  canvas.addEventListener('pointerup', lift);
  canvas.addEventListener('pointercancel', lift);

  place(0);
}
