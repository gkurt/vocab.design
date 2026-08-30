import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const MIN_W = 48;
const MAX_W = 112;
/** The width at which the card counts as pulled wide, so the pass can prove a resize. */
const WIDE_AT = 90;

/**
 * Direct manipulation specimen: a card that is moved by being pushed and widened by
 * being pulled, beside a twin of the same card that can only be changed by describing
 * the change in numbers and pressing Apply.
 *
 * The subject is the card with its handles, since that is the object the gesture acts
 * on and the term is about acting on the object. The canvas, the dashed drop zone, the
 * guide, and the whole numeric panel are scenery (SPEC §5): the panel is the
 * counter-example the term is defined against, not a second reading of the term.
 *
 * That panel used to be headed "The twin is changed the other way: describe the move, then
 * Apply.", which is the site narrating the comparison from inside the editor. No inspector
 * writes that above its own fields, and the article makes the contrast anyway, so the panel
 * carries the plain heading a properties pane would really print.
 *
 * Nothing transitions on the card. A dragged object that eases is an object lagging
 * the pointer, and a position written and then read back through a transition is the
 * old position, which is the measurement bug this codebase keeps running into.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 202px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span class="sp-label" data-part="readout" role="status">x 18 &middot; w 64</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div data-part="canvas" style="position: relative; height: 100%">

            <div data-part="dock" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 176px; top: 22px; width: 72px; height: 56px; border: 1px dashed var(--sp-line); border-radius: 8px"></div>
            <div data-part="guide" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 278px; top: 18px; width: 0; height: 64px; border-left: 1px dashed var(--sp-line)"></div>

            <div
              class="sp-surface"
              data-part="card"
              data-subject
              role="group"
              aria-label="Cover block"
              style="position: absolute; left: 18px; top: 26px; width: 64px; height: 48px; background: var(--sp-accent-soft); border-color: var(--sp-accent); cursor: grab; touch-action: none"
            >
              <span
                data-part="grip"
                aria-hidden="true"
                style="position: absolute; right: 2px; bottom: 2px; width: 12px; height: 12px; border-right: 2px solid var(--sp-accent); border-bottom: 2px solid var(--sp-accent); border-bottom-right-radius: 4px; cursor: se-resize; touch-action: none"
              ></span>
            </div>

            <div class="sp-context" data-part="twin" aria-hidden="true"
                 style="position: absolute; left: 18px; top: 90px; width: 64px; height: 34px; border: 1px dashed var(--sp-context-accent); border-radius: 8px; background: var(--sp-context-accent-soft)"></div>
            <span class="sp-label sp-context" style="position: absolute; left: 90px; top: 98px; font-size: 11px">no handles</span>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="gap: 6px; width: 294px">
        <span class="sp-label" style="font-size: 11px">Twin block: position and size</span>
        <div class="sp-row" style="gap: 6px">
          <input class="sp-input" data-part="twin-x" type="text" inputmode="numeric" aria-label="Twin x" value="18" style="width: 54px; text-align: center" />
          <input class="sp-input" data-part="twin-y" type="text" inputmode="numeric" aria-label="Twin y" value="90" style="width: 54px; text-align: center" />
          <input class="sp-input" data-part="twin-w" type="text" inputmode="numeric" aria-label="Twin width" value="64" style="width: 54px; text-align: center" />
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="apply" type="button">Apply</button>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const card = part(root, 'card');
  const grip = part(root, 'grip');
  const dock = part(root, 'dock');
  const twin = part(root, 'twin');
  const readout = part(root, 'readout');

  const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

  const report = () => {
    const left = card.offsetLeft;
    const width = card.offsetWidth;
    readout.textContent = `x ${left} · w ${width}`;
    flag(card, 'data-wide', width >= WIDE_AT);
    const midX = left + width / 2;
    const midY = card.offsetTop + card.offsetHeight / 2;
    const overX = midX >= dock.offsetLeft && midX <= dock.offsetLeft + dock.offsetWidth;
    const overY = midY >= dock.offsetTop && midY <= dock.offsetTop + dock.offsetHeight;
    flag(card, 'data-docked', overX && overY);
  };

  const place = (left: number, top: number) => {
    card.style.left = `${clamp(left, 0, canvas.clientWidth - card.offsetWidth)}px`;
    card.style.top = `${clamp(top, 0, canvas.clientHeight - card.offsetHeight)}px`;
    report();
  };

  const widen = (width: number) => {
    card.style.width = `${clamp(width, MIN_W, Math.min(MAX_W, canvas.clientWidth - card.offsetLeft))}px`;
    report();
  };

  let held: { kind: 'move' | 'resize'; x: number; y: number; left: number; top: number; width: number } | undefined;

  const take = (kind: 'move' | 'resize', event: PointerEvent) => {
    // The grip sits inside the card, so one capture on the card carries either grab past the
    // canvas edge. A synthetic pointer has none to capture and the call would throw.
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    held = { kind, ...localPoint(event, root), left: card.offsetLeft, top: card.offsetTop, width: card.offsetWidth };
  };

  // The grip's own press is not a move: it is read first and the card's handler
  // stands down, so one gesture never means two things.
  grip.addEventListener('pointerdown', (event) => take('resize', event));

  card.addEventListener('pointerdown', (event) => {
    if (event.target === grip) return;
    take('move', event);
  });

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    const at = localPoint(event, root);
    if (held.kind === 'move') place(held.left + (at.x - held.x), held.top + (at.y - held.y));
    else widen(held.width + (at.x - held.x));
  });

  const drop = () => {
    held = undefined;
  };
  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);

  // The indirect route, wired so it is a real alternative rather than a picture of
  // one: nothing about the twin can be reached by pointing at the twin.
  part(root, 'apply').addEventListener('click', () => {
    const read = (name: string, fallback: number) => {
      const value = Number.parseInt((part(root, name) as HTMLInputElement).value, 10);
      return Number.isFinite(value) ? value : fallback;
    };
    twin.style.left = `${clamp(read('twin-x', 18), 0, canvas.clientWidth - twin.offsetWidth)}px`;
    twin.style.top = `${clamp(read('twin-y', 90), 0, canvas.clientHeight - twin.offsetHeight)}px`;
    twin.style.width = `${clamp(read('twin-w', 64), MIN_W, MAX_W)}px`;
  });

  report();
}
