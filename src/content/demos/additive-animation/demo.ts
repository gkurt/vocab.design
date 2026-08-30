import { localBox } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LANE = { w: 410, h: 54 };
const PUCK = { w: 46, h: 38 };
const NUDGE = 90;
const RUN_MS = 420;

type Mode = 'add' | 'replace';

const tick = (x: number, label: string) => `
  <span style="position: absolute; left: ${x}px; top: 0; width: 2px; height: ${LANE.h}px; background: var(--sp-line)"></span>
  <span class="sp-label" style="position: absolute; left: ${x}px; top: ${LANE.h + 2}px; font-size: 11px">${label}</span>`;

/**
 * Additive animation specimen: one puck, one Nudge button, and a segmented control choosing what
 * happens when the second press lands before the first move has finished. Under `replace` the new
 * animation discards the old one and restarts from zero, so two presses end one nudge along. Under
 * `add` the two compose and the puck ends two nudges along, which is the term.
 *
 * The end position is measured off the live element after it settles, not asserted from the
 * specification, and the count of nudges it lands on is published as `data-stacked` so the
 * choreography can hold the demo to its own claim. Both paths were run in a browser first: `add`
 * without `persist()` collapses back to a single nudge, because a finished filling animation is
 * removed automatically once it stops contributing, so each additive effect is persisted here.
 *
 * The subject is the puck. `replace` is the counter-example the control exists to offer, and it is a
 * state the puck itself passes through, so the honest condition lives in `data-pose` and the mount
 * state (`add`) satisfies it (SPEC §6). The lane, the ticks, the buttons and the readout are scene.
 * The readout reports the puck at every state, resting one included ("The puck sits at 0px."): at
 * rest it used to tell the reader what to press, which is the article's job and not a readout's.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and writes the landed offset straight onto the puck, which keeps the
 * arithmetic on show with no travel at all. The settle beat comes from the stage's clock, so a pose
 * stops the puck where it stands, and the measurement is taken in that callback rather than in the
 * same tick as the style write (AGENTS.md). The lane holds a fixed box, so nothing else moves.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rested" data-stacked="0" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Composite</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Operation" data-term="add" data-part="mode" data-value="add">
            <button class="sp-segment" type="button" data-part="seg-add" value="add">Add</button>
            <button class="sp-segment" type="button" data-part="seg-replace" value="replace">Replace</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div data-part="lane" style="position: relative; width: ${LANE.w}px; height: ${LANE.h + 18}px">
            <div class="sp-context">${tick(0, '0')}${tick(NUDGE, `${NUDGE}`)}${tick(NUDGE * 2, `${NUDGE * 2}`)}</div>
            <div
              data-part="puck" data-subject data-pose="[data-mode=add]" data-mode="add"
              style="position: absolute; left: 0; top: ${(LANE.h - PUCK.h) / 2}px; width: ${PUCK.w}px; height: ${PUCK.h}px;
                     border-radius: 7px; background: var(--sp-accent)"
            ></div>
          </div>

          <div class="sp-row sp-context" style="gap: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="nudge">Nudge</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Reset</button>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 2px; width: ${LANE.w}px; height: 38px">
            <span class="sp-label" data-part="recipe" style="font-size: 11px">composite: add</span>
            <span class="sp-text sp-text--ink" data-part="claim" style="font-size: 12px; line-height: 1.35">
              Press Nudge twice: the second move is added to the first.
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const lane = part(root, 'lane');
  const puck = part(root, 'puck');
  const recipe = part(root, 'recipe');
  const claim = part(root, 'claim');
  const reduced = prefersReducedMotion(root);

  let mode: Mode = 'add';
  let landed = 0;
  let running: Animation[] = [];
  let settling: number | undefined;

  const publish = (at: number) => {
    const stacked = Math.max(0, Math.round(at / NUDGE));
    scene.dataset.stacked = `${stacked}`;
    scene.dataset.state = 'rested';
    claim.textContent =
      stacked === 0
        ? 'The puck sits at 0px.'
        : mode === 'add'
          ? `${stacked} nudge${stacked === 1 ? '' : 's'} composed: the puck sits at ${at}px.`
          : `The last nudge replaced the ones before it: the puck sits at ${at}px.`;
  };

  /** Read off the live element, a settle beat after the move, never in the tick that wrote it. */
  const settle = () => publish(Math.round(localBox(puck, lane).left));

  const nudge = () => {
    clock.clearTimeout(settling);
    scene.dataset.state = 'moving';

    if (reduced) {
      landed = mode === 'add' ? landed + NUDGE : NUDGE;
      puck.style.transform = `translateX(${landed}px)`;
      return publish(landed);
    }

    if (mode === 'replace') for (const animation of running) animation.cancel();
    const animation = puck.animate([{ transform: 'translateX(0px)' }, { transform: `translateX(${NUDGE}px)` }], {
      duration: RUN_MS,
      easing: 'cubic-bezier(0.3, 0.9, 0.3, 1)',
      fill: 'forwards',
      composite: mode === 'add' ? 'add' : 'replace',
    });
    // Without this the browser removes each filling effect once it stops contributing, and the
    // stack quietly collapses back to a single nudge. Verified in a browser, both ways.
    if (mode === 'add') animation.persist();
    running = mode === 'add' ? [...running, animation] : [animation];
    settling = clock.setTimeout(settle, RUN_MS + 90);
  };

  const reset = () => {
    clock.clearTimeout(settling);
    for (const animation of running) animation.cancel();
    running = [];
    landed = 0;
    puck.style.transform = 'translateX(0px)';
    publish(0);
  };

  // Nudge names a move and Reset names the start, so neither step flips whatever it finds; the
  // segments name a composite, and changing one clears the lane so each demonstration starts clean.
  part(root, 'nudge').addEventListener('click', nudge);
  part(root, 'reset').addEventListener('click', reset);
  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    puck.dataset.mode = mode;
    recipe.textContent = `composite: ${mode}`;
    reset();
  });

  reset();
}
