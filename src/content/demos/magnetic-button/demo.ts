import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';

const FIELD = { w: 420, h: 190 };
const BUTTON = { w: 156, h: 44 };
/** The centre the pull is measured from, and the size of the field around it. */
const CENTRE = { x: FIELD.w / 2, y: 95 };
const RADIUS = 84;
/** How much of the distance the control gives up. A third is attraction; more is coming loose. */
const PULL = 0.3;
const CAP = 22;

const mark = (name: string, x: number, y: number) => `
  <span data-part="${name}" aria-hidden="true" style="position: absolute; left: ${x}px; top: ${y}px; width: 1px; height: 1px; pointer-events: none"></span>`;

/**
 * Magnetic button specimen: one call to action inside a drawn attraction radius. Pointer
 * moves anywhere in the frame are measured against the button's resting centre, and
 * inside the radius the button translates a fraction of that distance toward the pointer,
 * springing back to zero as soon as the pointer is outside it again.
 *
 * The subject is the button, the narrowest thing the term names. The drawn radius, the
 * two aiming marks, and the readout are instrumentation: they say where the field is and
 * how far the lean went, and they stay in the context register.
 *
 * The lean is really computed from `pointermove` rather than mimed, so a reader who takes
 * the stage over gets the effect under their own pointer. The centre is derived from the
 * field's box and the button's known place in it, never measured off the button itself:
 * the button is the thing being translated, so measuring it would feed its own offset
 * back into the next frame. `data-pull` reports whether the pointer is inside the field
 * whatever the motion preference, while the transform itself is gated, so a reader who
 * asked for less movement gets a button that holds still (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour Studio</span>
          <span class="sp-text" data-part="readout" data-pull="off" style="width: 190px; text-align: right; white-space: nowrap">At rest</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="field"
            style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            <span
              class="sp-context"
              data-part="radius"
              style="position: absolute; left: ${CENTRE.x - RADIUS}px; top: ${CENTRE.y - RADIUS}px; width: ${RADIUS * 2}px; height: ${RADIUS * 2}px;
                     border: 2px dashed var(--sp-line); border-radius: 50%; pointer-events: none"
            ></span>
            <span class="sp-label sp-context" style="position: absolute; left: 12px; top: 10px; font-size: 11px">Attraction radius: ${RADIUS}px</span>
            <button
              class="sp-button"
              type="button"
              data-part="button"
              data-subject
              data-pull="off"
              style="position: absolute; left: ${CENTRE.x - BUTTON.w / 2}px; top: ${CENTRE.y - BUTTON.h / 2}px; width: ${BUTTON.w}px;
                     height: ${BUTTON.h}px; transform: translate(0px, 0px); transition: transform 0.34s var(--sp-ease)"
            >Start a project</button>
            ${mark('far', 36, 30)}
            ${mark('near', 152, 60)}
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const button = part(root, 'button');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  const settle = (x: number, y: number, inside: boolean, distance: number) => {
    if (!reduced) button.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    const state = inside ? 'on' : 'off';
    button.dataset.pull = state;
    readout.dataset.pull = state;
    readout.textContent = inside
      ? `Leaning ${Math.round(Math.hypot(x, y))}px toward the pointer`
      : `At rest, pointer ${Math.round(distance)}px away`;
  };

  field.addEventListener('pointermove', (event: PointerEvent) => {
    const box = field.getBoundingClientRect();
    const dx = event.clientX - box.left - CENTRE.x;
    const dy = event.clientY - box.top - CENTRE.y;
    const distance = Math.hypot(dx, dy);
    if (distance > RADIUS) return settle(0, 0, false, distance);
    const scale = Math.min(PULL, CAP / Math.max(distance, 1));
    settle(dx * scale, dy * scale, true, distance);
  });

  // The pointer leaving the frame entirely is a release, and the control goes home.
  field.addEventListener('pointerleave', () => settle(0, 0, false, RADIUS * 2));
}
