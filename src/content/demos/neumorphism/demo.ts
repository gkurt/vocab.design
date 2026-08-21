import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * The whole palette. One base colour for the scene and for every control on it, plus
 * the two tints of that base the shadows are made of. Stated here rather than taken
 * from kit tokens, and identical in both themes, for the same reason `.sp-glass` and
 * `.sp-clay` state theirs: the sameness of the colour IS the term, and a specimen
 * repainted by the theme would be demonstrating something else.
 */
const BASE = '#e6e9ef';
const LIT = '#ffffff';
const SHADE = '#b7bdc9';
const INK = '#4c5566';
const QUIET = '#79839a';

/** The two poles the style is built from: light up and left, dark down and right. */
const RAISED = `-6px -6px 12px ${LIT}, 6px 6px 12px ${SHADE}`;
const CARVED = `inset -5px -5px 10px ${LIT}, inset 5px 5px 10px ${SHADE}`;
const RAISED_SM = `-3px -3px 7px ${LIT}, 3px 3px 7px ${SHADE}`;

/** How long the press is held after release, so the inversion is watchable. */
const LATCH_MS = 900;

/**
 * Neumorphism specimen: three controls moulded out of one flat background colour, with
 * nothing but soft light to tell them apart from it. The dial and the switch show the
 * two poles at rest (a raised disc in a carved well, a raised knob on a carved track);
 * the button performs the only state change the style has, inverting both of its
 * shadows so the shape reads as pressed into the surface.
 *
 * The subject is the button: one extruded control, the narrowest thing here the term
 * names, and it is the term in both of its states. The dial, the switch, the caption
 * and the contrast readout are context.
 *
 * The paint is inline because it is the claim: no kit class carries a shadow pair
 * derived from the background colour, and the pressed inversion has to be written by
 * the demo's own handlers, since a demo has no stylesheet to hang a state rule on.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app" style="background: ${BASE}; gap: 22px; color: ${INK}">
      <div class="sp-row" style="gap: 34px">
        <div data-part="dial" class="sp-context" style="width: 84px; height: 84px; border-radius: 50%;
             display: flex; align-items: center; justify-content: center; background: ${BASE}; box-shadow: ${RAISED}">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: ${BASE}; box-shadow: ${CARVED};
                      display: flex; align-items: flex-start; justify-content: center; padding-top: 7px">
            <span style="width: 3px; height: 13px; border-radius: 2px; background: ${QUIET}"></span>
          </div>
        </div>

        <button data-part="button" data-subject type="button" data-state="raised"
                style="width: 138px; height: 52px; border: 0; border-radius: 16px; background: ${BASE}; color: ${INK};
                       font: inherit; font-size: 14px; font-weight: 600; letter-spacing: 0.01em; cursor: pointer;
                       box-shadow: ${RAISED}; transition: box-shadow 0.16s var(--sp-ease)">
          Play
        </button>

        <div data-part="switch" class="sp-context" style="width: 68px; height: 36px; border-radius: 999px;
             background: ${BASE}; box-shadow: ${CARVED}; display: flex; align-items: center; padding: 0 5px">
          <span style="width: 26px; height: 26px; border-radius: 50%; background: ${BASE}; box-shadow: ${RAISED_SM}"></span>
        </div>
      </div>

      <p data-part="caption" style="margin: 0; max-width: 400px; text-align: center; font-size: 12.5px;
                                    line-height: 1.5; color: ${QUIET}">
        One colour for the whole scene. Every control is two shadows of it: light up and to the
        left, dark down and to the right.
      </p>

      <p data-part="readout" class="sp-context" style="margin: 0; font-size: 11.5px; color: ${QUIET}">
        Control edge against its background: 1.0:1. WCAG asks 3:1.
      </p>
    </div>
  `;

  const button = part(root, 'button');
  let release: number | undefined;

  const setPressed = (pressed: boolean) => {
    button.dataset.state = pressed ? 'pressed' : 'raised';
    button.style.boxShadow = pressed ? CARVED : RAISED;
  };

  button.addEventListener('pointerdown', () => {
    clock.clearTimeout(release);
    setPressed(true);
  });

  // The press outlives the release by a beat, so the inversion is legible whether it
  // came from a scripted click or from a reader's own tap.
  const letGo = () => {
    clock.clearTimeout(release);
    release = clock.setTimeout(() => setPressed(false), LATCH_MS);
  };
  button.addEventListener('pointerup', letGo);
  button.addEventListener('pointercancel', letGo);
}
