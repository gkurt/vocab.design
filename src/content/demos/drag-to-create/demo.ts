import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** Under this much travel the press was a click and nothing is made. */
const THRESHOLD = 6;
/** Where the script's stroke starts, nudges, and ends. Aim points only: nothing is drawn here. */
const START = { x: 70, y: 50 };
const NUDGE = { x: 74, y: 52 };
const CORNER = { x: 202, y: 110 };

const anchor = (name: string, at: { x: number; y: number }) =>
  `<span data-part="${name}" style="position: absolute; left: ${at.x - 3}px; top: ${at.y - 3}px; width: 6px; height: 6px; pointer-events: none"></span>`;

const handles = ['left: -3px; top: -3px', 'right: -3px; top: -3px', 'left: -3px; bottom: -3px', 'right: -3px; bottom: -3px']
  .map(
    (place) =>
      `<span aria-hidden="true" style="position: absolute; ${place}; width: 6px; height: 6px; border-radius: 2px; background: var(--sp-accent)"></span>`,
  )
  .join('');

/**
 * Drag to create specimen: an empty canvas where one stroke both makes a frame and decides
 * how big it is. The subject is the CREATED OBJECT, which is why it exists in the tree from
 * mount at no size at all: the term names the thing that was not there before the press,
 * so identify has to be able to summon it by playing the stroke rather than ring the
 * surface it appeared on.
 *
 * Deliberately not a grid. The neighbouring scheduler also drags, and this demo is about
 * the object arriving out of the stroke, so the ground is a plain canvas with no slots to
 * snap to and nothing already on it.
 *
 * Both halves of the gesture are shown: a press that barely travels is a click and leaves
 * nothing behind, and a real stroke commits a frame at exactly its extent, arriving
 * selected so that undoing it is one keystroke away.
 *
 * The extent is read through `localPoint`, which is what a scaled stage requires: measured
 * off `clientX` a phone would draw a frame at a fraction of the finger's travel (SPEC §5).
 * Capture is taken on a trusted pointerdown so a reader's stroke survives leaving the
 * canvas, and the guard is mandatory, since the attract player's synthetic pointers have
 * nothing to capture and the call throws (SPEC §7). The stroke ends on pointerup and on
 * pointercancel, never on pointerleave, which does not fire while capture holds.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span
            class="sp-label"
            data-part="readout"
            style="flex: 0 0 auto; width: 152px; text-align: right; white-space: nowrap"
          >Nothing drawn yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div
            data-part="canvas"
            data-outcome="none"
            style="position: relative; flex: 0 0 auto; width: 442px; height: 196px; border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius); background-color: var(--sp-surface);
                   background-image: radial-gradient(var(--sp-line) 1px, transparent 1px);
                   background-size: 16px 16px; overflow: hidden; cursor: crosshair; touch-action: none; user-select: none"
          >
            <span
              class="sp-label"
              data-stage-verdict data-part="hint"
              style="position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); text-align: center;
                     font-size: 12px; pointer-events: none"
            >Drag anywhere to draw a frame</span>
            <div
              data-part="drawn"
              data-subject
              data-state="none"
              style="position: absolute; left: ${START.x}px; top: ${START.y}px; width: 0; height: 0; border-radius: 4px;
                     background: var(--sp-accent-soft); box-shadow: inset 0 0 0 2px var(--sp-accent); opacity: 0;
                     pointer-events: none"
            >
              <span data-part="handles" style="position: absolute; inset: 0; opacity: 0">${handles}</span>
            </div>
            ${anchor('start', START)}
            ${anchor('nudge', NUDGE)}
            ${anchor('corner', CORNER)}
          </div>
          <span class="sp-text sp-context" style="width: 442px; margin-top: 8px; font-size: 11px; line-height: 1.35; text-align: center">
            One stroke makes the object and sizes it. A press that barely moves is a click, so nothing is made.
          </span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const drawn = part(root, 'drawn');
  const grips = part(root, 'handles');
  const hint = part(root, 'hint');
  const readout = part(root, 'readout');

  let origin: { x: number; y: number } | undefined;
  let made = false;

  const place = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    drawn.style.left = `${Math.min(a.x, b.x)}px`;
    drawn.style.top = `${Math.min(a.y, b.y)}px`;
    drawn.style.width = `${Math.abs(b.x - a.x)}px`;
    drawn.style.height = `${Math.abs(b.y - a.y)}px`;
  };

  const clear = () => {
    drawn.style.width = '0px';
    drawn.style.height = '0px';
    drawn.style.opacity = '0';
    drawn.removeAttribute('data-selected');
    grips.style.opacity = '0';
    drawn.dataset.state = 'none';
  };

  canvas.addEventListener('pointerdown', (pointer) => {
    // Without the capture a reader's stroke dies the moment it leaves the canvas. The guard
    // is mandatory: synthetic pointers have nothing to capture and the call throws (SPEC §7).
    if (pointer.isTrusted) canvas.setPointerCapture(pointer.pointerId);
    // Read in the canvas's own pixels: a scaled stage would otherwise draw a half-size frame.
    origin = localPoint(pointer, canvas);
    made = false;
    canvas.dataset.outcome = 'drawing';
    clear();
  });

  canvas.addEventListener('pointermove', (pointer) => {
    if (!origin) return;
    const at = localPoint(pointer, canvas);
    place(origin, at);
    made = Math.abs(at.x - origin.x) >= THRESHOLD && Math.abs(at.y - origin.y) >= THRESHOLD;
    // Nothing is previewed until the stroke has cleared the threshold, so a press that
    // was never a drag never flashes an object the reader did not ask for.
    drawn.style.opacity = made ? '1' : '0';
    drawn.dataset.state = made ? 'drawing' : 'none';
    readout.textContent = made
      ? `${Math.round(Math.abs(at.x - origin.x))} x ${Math.round(Math.abs(at.y - origin.y))}`
      : 'Too small to be a frame';
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    if (!made) {
      // Under the threshold the press was a click, and a click makes nothing.
      clear();
      canvas.dataset.outcome = 'tap';
      readout.textContent = `Under ${THRESHOLD} px, so a click`;
      return;
    }
    // The object arrives selected, which is what puts undo one keystroke away.
    drawn.dataset.state = 'made';
    drawn.setAttribute('data-selected', '');
    grips.style.opacity = '1';
    canvas.dataset.outcome = 'made';
    hint.style.opacity = '0';
    readout.textContent = `Frame ${drawn.style.width.replace('px', '')} x ${drawn.style.height.replace('px', '')}`;
  };

  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
}
