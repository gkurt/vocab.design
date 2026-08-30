import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const VIEW = { w: 300, h: 176 };
/** How far the world turns per pixel of movement, and how far it may look up or down. */
const DEGREES_PER_PX = 0.4;
const PITCH_LIMIT = 30;

const SKY = 'linear-gradient(#1b2836 0 52%, #33506b 52%, #4b6b83)';
const GRID = 'repeating-linear-gradient(90deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 40px)';
const MARKS = 'repeating-linear-gradient(90deg, rgb(255 255 255 / 0.34) 0 2px, transparent 2px 120px)';

/**
 * A fixed anchor the script travels between. It carries no paint: the drawn pointer and the
 * heading are what the reader watches, and a drawn mark would annotate the choreography
 * rather than the term (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    aria-hidden="true"
    style="position: absolute; left: ${x - 4}px; top: ${y - 4}px; width: 8px; height: 8px; pointer-events: none"
  ></span>`;

/**
 * Pointer lock specimen: an orbit viewport that reads movement instead of position. Unlocked,
 * the drawn pointer tracks the pointer and stops dead at the viewport's edges. Locked, the
 * pointer is hidden, a reticle takes its place, and the same movement turns the world with no
 * edge to reach, including while the pointer is well outside the viewport.
 *
 * The subject is the viewport. The term names what happens to input inside one element, and
 * the viewport is the narrowest thing that both loses its cursor and gains the deltas; the
 * device chrome, the readouts, the engage control and the escape legend are the scene around
 * it and carry the context register, and the points the script travels between are unpainted
 * anchors.
 *
 * The viewport carries `data-hover-driven`: moving a pointer over it with no button down IS
 * this term's interaction, both halves of it, so a reader's dwell there takes the stage over
 * without a click (SPEC §7).
 *
 * **The real API is never called here.** `requestPointerLock` would take the reader's actual
 * cursor away from the page this specimen is embedded in, which no exhibit may do, so the
 * lock is simulated: the drawn pointer is hidden, the viewport's own cursor is set to none,
 * and the movement is read from the events the demo already receives. Everything else is
 * real, including the escape release, which is the one part of the API a page cannot override.
 *
 * Deltas come from `movementX` and `movementY` where the platform supplies them, and from
 * differencing the position where it does not: attract's synthesized events carry no
 * movement, and the difference is the same number a locked pointer would have reported.
 *
 * The world moves by a background offset inside a clipped viewport and every readout holds
 * its width, so turning moves nothing at all (SPEC §5).
 *
 * The simulation is disclosed here, not in the frame. Three lines of the site's voice went:
 * the button read "Engage the lock (simulated)" and now says what it does, "Lock the cursor";
 * a note beside it read "The real API is never called on this page."; and the anchor in the
 * side panel was captioned "Movement arrives out here too", which is a stage direction printed
 * on a 3D viewer's chrome. The anchor stays, unpainted, and the readout says what is happening
 * as the pointer moves. Its resting text was "Move over the viewport", an instruction to the
 * reader; it rests on the state the viewport is in instead.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orbit</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap">Unlocked</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row" style="gap: 12px; align-items: stretch">
            <div
              data-part="viewport"
              data-subject
              data-hover-driven
              data-turn="none"
              data-outside="no"
              style="position: relative; flex: 0 0 auto; width: ${VIEW.w}px; height: ${VIEW.h}px; border-radius: var(--sp-radius); overflow: hidden; background: ${SKY}; cursor: crosshair; touch-action: none; user-select: none"
            >
              <span
                data-part="scene"
                style="position: absolute; inset: -40px 0; background-image: ${GRID}, ${MARKS}; background-position: 0 0, 0 0"
              ></span>
              <span
                data-part="horizon"
                style="position: absolute; left: 0; right: 0; top: ${VIEW.h * 0.52}px; height: 1px; background: rgb(255 255 255 / 0.45)"
              ></span>
              <span
                data-part="reticle"
                hidden
                style="position: absolute; left: 50%; top: 50%; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; border: 1px solid rgb(255 255 255 / 0.8); pointer-events: none"
              >
                <span style="position: absolute; left: 50%; top: 4px; bottom: 4px; width: 1px; margin-left: -0.5px; background: rgb(255 255 255 / 0.8)"></span>
                <span style="position: absolute; top: 50%; left: 4px; right: 4px; height: 1px; margin-top: -0.5px; background: rgb(255 255 255 / 0.8)"></span>
              </span>
              <span
                data-part="pointer"
                style="position: absolute; left: ${VIEW.w / 2}px; top: ${VIEW.h / 2}px; width: 11px; height: 11px; margin: -6px 0 0 -6px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.5); pointer-events: none"
              ></span>
              ${dot('dot-left', 32, 138)}
              ${dot('dot-right', 268, 138)}
            </div>

            <div class="sp-stack sp-context" style="width: 124px; gap: 8px">
              <span class="sp-label" data-part="heading" style="font-variant-numeric: tabular-nums">heading 0&deg;</span>
              <div class="sp-divider"></div>
              <span class="sp-label"><span class="sp-kbd">Esc</span> releases</span>
              <div class="sp-row" style="gap: 6px; margin-top: 4px">
                <span data-part="dot-out" aria-hidden="true" style="width: 8px; height: 8px"></span>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="engage">Lock the cursor</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const scene = part(root, 'scene');
  const horizon = part(root, 'horizon');
  const reticle = part(root, 'reticle');
  const pointer = part(root, 'pointer');
  const readout = part(root, 'readout');
  const heading = part(root, 'heading');

  let locked = false;
  let last: { x: number; y: number } | undefined;
  let panX = 0;
  let panY = 0;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const paint = () => {
    const degrees = (((panX * DEGREES_PER_PX) % 360) + 360) % 360;
    scene.style.backgroundPosition = `${-panX}px ${panY / 2}px, ${-panX}px ${panY / 2}px`;
    horizon.style.top = `${VIEW.h * 0.52 + panY / 2}px`;
    heading.textContent = `heading ${Math.round(degrees)}°`;
  };

  const inside = (event: PointerEvent) => {
    const box = viewport.getBoundingClientRect();
    return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  };

  /** Unlocked: a position, clamped by the edges it can reach. */
  const place = (event: PointerEvent) => {
    const at = localPoint(event, viewport);
    const x = Math.max(0, Math.min(VIEW.w, at.x));
    const y = Math.max(0, Math.min(VIEW.h, at.y));
    pointer.style.left = `${x}px`;
    pointer.style.top = `${y}px`;
    if (x === 0 || x === VIEW.w || y === 0 || y === VIEW.h) return say('Unlocked: the cursor stops at the edge');
    say(`Unlocked: the cursor is at ${Math.round(x)}, ${Math.round(y)}`);
  };

  const setLocked = (on: boolean, text: string) => {
    locked = on;
    pointer.hidden = on;
    reticle.hidden = !on;
    viewport.style.cursor = on ? 'none' : 'crosshair';
    if (on) viewport.setAttribute('data-locked', '');
    else viewport.removeAttribute('data-locked');
    viewport.dataset.outside = 'no';
    say(text);
  };

  root.addEventListener('pointermove', (event) => {
    const dx = event.movementX || (last ? event.clientX - last.x : 0);
    const dy = event.movementY || (last ? event.clientY - last.y : 0);
    last = { x: event.clientX, y: event.clientY };
    if (!locked) return place(event);
    if (dx === 0 && dy === 0) return;
    panX += dx;
    panY = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, panY + dy));
    paint();
    if (dx !== 0) viewport.dataset.turn = dx > 0 ? 'right' : 'left';
    // Locked, the movement is delivered wherever the pointer has wandered to, which is
    // the whole point: there is no edge left for it to stop at.
    const out = !inside(event);
    viewport.dataset.outside = out ? 'yes' : 'no';
    const sign = dx > 0 ? '+' : '';
    say(out ? `Outside, still turning: ${sign}${Math.round(dx)}` : `movement ${sign}${Math.round(dx)}, ${Math.round(dy)}`);
  });

  part(root, 'engage').addEventListener('click', () => setLocked(true, 'Locked: cursor hidden, movement only'));

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !locked) return;
    setLocked(false, 'Released with Escape');
  });

  paint();
}
