import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Deformable UI specimen: one live control that squashes for exactly as long as it is held,
 * leans after the hand while it is dragged, and springs back through rest on release, with a
 * states row beside it holding rest, pressed and dragged all at once.
 *
 * This is the one register on the site that cannot be judged from a screenshot, so it is the
 * one aesthetic specimen that is not a still composition: the claim is what the control does
 * while a pointer is on it. A dashed footprint behind each control draws the shape it has at
 * rest, which is what makes a thirteen percent squash measurable rather than merely felt.
 *
 * The subject takes its resting paint from the kit's `.sp-clay` primitive, which is the
 * inflated pastel solid the behaviour is usually dressed in. What the demo adds is the
 * deformation itself. The squash is keyed off `data-pressed` rather than off pointerdown,
 * because a synthesized click dispatches down and up in the same tick: the attract player
 * mirrors its own pointer into that attribute and holds it for the length of the press (a
 * beat for a click, the whole hold for a drag), which is exactly the duration the term says
 * the deformation should last. Real pointer events are handled too, so a reader who takes the
 * stage over and holds the button gets the same squash for as long as they hold it.
 *
 * Nothing here is wired to repaint hover: the player owns that attribute (SPEC §7).
 *
 * No layout shift: the control deforms with a transform inside a reserved slot, so the
 * stretched shape never pushes the socket or the states row around (SPEC §5).
 *
 * The subject is the squishy button, not the ground it sits on and not the pair: the term
 * names how a control behaves, and the button is the narrowest element that behaves that way
 * (SPEC §5). The socket, the states row and the caption are scenery. The states row sets its
 * own `data-pressed` because no pointer is on it.
 */
const GROUND_W = 234;
const GROUND_H = 196;
const SLOT_W = 148;
const SLOT_H = 76;
const BTN_W = 124;
const BTN_H = 48;
const PILL_W = 88;
const PILL_H = 46;

/** Squash and stretch, in the amounts the article calls plausible: a few percent, not tens. */
const SQUASH = 'scale(1.13, 0.82)';
/** Volume looks conserved: the spring passes through rest tall and narrow before settling. */
const SPRING: Keyframe[] = [
  { transform: SQUASH },
  { transform: 'scale(0.93, 1.11)', offset: 0.4 },
  { transform: 'scale(1.03, 0.97)', offset: 0.72 },
  { transform: 'none' },
];
/** Below this, the press was never on screen long enough to be worth springing back from. */
const SEEN_MS = 60;
/** Bounded so the leaned shape still lands inside the slot reserved for it. */
const LEAN_MAX = 14;

/** The shape the control has when nothing is touching it, drawn so the squash is measurable. */
function footprint(w: number, h: number): string {
  return `<span aria-hidden="true"
                style="position: absolute; left: 50%; top: 50%; width: ${w}px; height: ${h}px; translate: -50% -50%;
                       border: 2px dashed var(--sp-line); border-radius: 26px"></span>`;
}

/** One row of the states table: a name, a rest footprint, and the control posed on top of it. */
function state(partName: string, label: string, attrs: string, transform: string): string {
  return `
    <div class="sp-row" style="gap: 8px; align-items: center">
      <span class="sp-label" style="flex: 0 0 52px; font-size: 11px">${label}</span>
      <span style="position: relative; flex: 0 0 128px; height: 50px">
        ${footprint(PILL_W, PILL_H)}
        <span class="sp-clay" data-part="${partName}"${attrs}
              style="position: absolute; left: 50%; top: 50%; width: ${PILL_W}px; height: ${PILL_H}px;
                     translate: -50% -50%; transform: ${transform}"></span>
      </span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Matter, not paint</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div data-part="ground"
               style="position: relative; flex: 0 0 ${GROUND_W}px; height: ${GROUND_H}px; border-radius: var(--sp-radius);
                      background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line)">
            <span class="sp-label sp-context" style="position: absolute; left: 14px; top: 12px">Press, hold, drag</span>

            <span style="position: absolute; left: 8px; top: 40px; width: ${SLOT_W}px; height: ${SLOT_H}px">
              ${footprint(BTN_W, BTN_H)}
              <button type="button" class="sp-clay" data-part="squish" data-subject
                      style="position: absolute; left: 50%; top: 50%; width: ${BTN_W}px; height: ${BTN_H}px;
                             translate: -50% -50%; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer">
                Hold me
              </button>
            </span>

            <span class="sp-context" data-part="socket" aria-hidden="true"
                  style="position: absolute; right: 12px; bottom: 16px; width: 52px; height: 52px; border-radius: 18px;
                         background: var(--sp-surface); box-shadow: inset 0 2px 6px rgb(16 24 40 / 0.2)"></span>
          </div>

          <div class="sp-stack sp-context" data-part="states" style="flex: 0 0 190px; gap: 8px">
            <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">All three at once</span>
            ${state('state-rest', 'Rest', '', 'none')}
            ${state('state-pressed', 'Held', ' data-pressed', SQUASH)}
            ${state('state-dragged', 'Dragged', ' data-pressed', `${SQUASH} skewX(-9deg) translateX(6px)`)}
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Wider as it gets shorter, held for the length of the press, then springing past rest.
      </p>
    </div>
  `;

  const squish = part(root, 'squish');
  let deformed = false;
  let heldFrom = 0;
  let originX = 0;

  const setDeform = (on: boolean): void => {
    if (on === deformed) return;
    deformed = on;
    if (on) {
      heldFrom = performance.now();
      squish.style.transform = SQUASH;
      return;
    }
    squish.style.removeProperty('transform');
    // A press too brief to have been seen has nothing to spring back from, and a reader who
    // asked for less movement gets the settled state rather than the move (SPEC §5).
    if (performance.now() - heldFrom < SEEN_MS || prefersReducedMotion(root)) return;
    squish.animate(SPRING, { duration: 430, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' });
  };

  // The press's duration is carried by `data-pressed`: the player holds it for the length of
  // the press, which is the only signal a synthesized click gives that has any duration at all.
  new MutationObserver(() => setDeform(squish.hasAttribute('data-pressed'))).observe(squish, {
    attributeFilter: ['data-pressed'],
  });

  squish.addEventListener('pointerdown', (event) => {
    originX = event.clientX;
    setDeform(true);
  });

  // Dragged soft matter leans after the hand instead of tracking it rigidly. Bounded, so the
  // leaned shape stays inside the slot reserved for it.
  squish.addEventListener('pointermove', (event) => {
    if (!deformed) return;
    const lean = Math.max(-LEAN_MAX, Math.min(LEAN_MAX, (event.clientX - originX) * 0.14));
    squish.style.transform = `${SQUASH} skewX(${(-lean * 0.7).toFixed(1)}deg) translateX(${(lean * 0.5).toFixed(1)}px)`;
  });

  squish.addEventListener('pointerup', () => setDeform(false));
  squish.addEventListener('pointercancel', () => setDeform(false));
}
