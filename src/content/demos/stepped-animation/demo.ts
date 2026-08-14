import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const RUN_MS = 3000;
const DIAL = 76;
const FRAME = 76;
const FRAMES = 8;
const TICKS = 12;
const LEAD = 60;

/** One pose of a walk cycle, drawn from the swing of the legs at that point in the loop. */
function pose(index: number): string {
  // Half a step out of phase, so no frame of the cycle has the limbs hidden behind the body.
  const swing = Math.sin(((index + 0.5) / FRAMES) * Math.PI * 2) * 12;
  const arm = -swing * 0.7;
  return `
    <svg width="${FRAME}" height="${FRAME}" viewBox="0 0 ${FRAME} ${FRAME}" aria-hidden="true" style="display: block; flex: 0 0 auto">
      <g stroke="var(--sp-accent)" stroke-width="3" stroke-linecap="round" fill="none">
        <circle cx="38" cy="21" r="7" fill="var(--sp-accent)" stroke="none" />
        <path d="M38 30 V48" />
        <path d="M38 48 L${(38 + swing).toFixed(1)} 62" />
        <path d="M38 48 L${(38 - swing).toFixed(1)} 62" />
        <path d="M38 35 L${(38 + arm).toFixed(1)} 45" />
        <path d="M38 35 L${(38 - arm).toFixed(1)} 45" />
      </g>
    </svg>`;
}

/** A dial face with its hour marks; the hand is supplied separately so it can be driven. */
function face(hand: string, id: string): string {
  const marks = Array.from({ length: TICKS }, (_, i) => {
    const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
    const c = DIAL / 2;
    return `<line x1="${(c + Math.cos(a) * 30).toFixed(1)}" y1="${(c + Math.sin(a) * 30).toFixed(1)}"
                  x2="${(c + Math.cos(a) * 34).toFixed(1)}" y2="${(c + Math.sin(a) * 34).toFixed(1)}"
                  stroke="var(--sp-line)" stroke-width="2" stroke-linecap="round" />`;
  }).join('');
  return `
    <svg data-part="dial-${id}" width="${DIAL}" height="${DIAL}" viewBox="0 0 ${DIAL} ${DIAL}" aria-hidden="true" style="display: block">
      <circle cx="${DIAL / 2}" cy="${DIAL / 2}" r="36" fill="var(--sp-sunken)" stroke="var(--sp-line)" />
      ${marks}
      ${hand}
      <circle cx="${DIAL / 2}" cy="${DIAL / 2}" r="3" fill="var(--sp-accent)" />
    </svg>`;
}

/**
 * Stepped animation specimen: two exhibits that quantise their travel and one that does not.
 * The hand on the left advances in twelve equal jumps, the walking figure beside it advances one
 * whole frame at a time through a strip of eight, and the hand on the right sweeps the same
 * distance in the same three seconds without ever holding still. All three are transitions
 * carrying an easing function inline, so the stepping really is `steps()` doing the work rather
 * than a chain of timers imitating it, and the two spellings can be read off the labels.
 *
 * The subject is the group holding the two stepped exhibits: the term names the mechanic, and one
 * ticking hand alone would leave the sprite strip, which is the same mechanic doing its most
 * famous job, outside the thing being pointed at. The sweeping hand is the counter-example and is
 * a separate element in the context register, so no `data-pose` is needed, and the heading, the
 * Replay control and the caption stay outside the subject.
 *
 * `motion.css` gates transitions for a reader who asked for less movement, which lands every
 * exhibit on its last position. `prefersReducedMotion` is still asked directly, because with
 * transitions off the reset and the run would fall in the same tick and there would be no run;
 * the settle beat comes from the stage's clock so a pose stops the tick where it stands (SPEC §6).
 * The strip travels inside a viewport that already holds its size (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const hand = (id: string, easing: string) => `
    <line
      data-part="hand-${id}"
      x1="${DIAL / 2}" y1="${DIAL / 2}" x2="${DIAL / 2}" y2="${DIAL / 2 - 26}"
      stroke="var(--sp-accent)" stroke-width="2.5" stroke-linecap="round"
      style="transform-origin: ${DIAL / 2}px ${DIAL / 2}px; transform: rotate(0deg);
             transition: transform ${RUN_MS}ms ${easing} ${LEAD}ms"
    />`;

  const cell = (art: string, name: string, note: string) => `
    <div class="sp-stack" style="width: 118px; gap: 4px; align-items: center; text-align: center">
      ${art}
      <span class="sp-label sp-text--ink" style="font-size: 10px">${name}</span>
      <span class="sp-label" style="font-size: 10px">${note}</span>
    </div>`;

  const filmstrip = Array.from({ length: FRAMES }, (_, i) => pose(i)).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 428px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Tick, don't glide</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 12px">
          <div class="sp-row" data-part="stepped" data-subject style="gap: 0">
            ${cell(face(hand('step', `steps(${TICKS}, jump-end)`), 'step'), `steps(${TICKS}, jump-end)`, 'the hand that ticks')}
            ${cell(
              `<div
                 style="width: ${FRAME}px; height: ${FRAME}px; overflow: hidden; border-radius: 6px;
                        background: var(--sp-sunken)"
               ><div
                   data-part="strip"
                   style="display: flex; width: ${FRAME * FRAMES}px; transform: translateX(0);
                          transition: transform ${RUN_MS}ms steps(${FRAMES}, jump-none) ${LEAD}ms"
                 >${filmstrip}</div></div>`,
              `steps(${FRAMES}, jump-none)`,
              'one frame at a time',
            )}
          </div>
          <div style="flex: 0 0 1px; align-self: stretch; background: var(--sp-line)"></div>
          <div class="sp-context">
            ${cell(face(hand('sweep', 'linear'), 'sweep'), 'linear', 'the sweep, for contrast')}
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; font-size: 12px">
          One full turn and eight poses, all in ${RUN_MS / 1000} seconds. Only the number of positions differs.
        </p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const stepHand = part(root, 'hand-step');
  const sweepHand = part(root, 'hand-sweep');
  const strip = part(root, 'strip');
  let settling: number | undefined;

  const send = (out: boolean) => {
    stepHand.style.transform = `rotate(${out ? 360 : 0}deg)`;
    sweepHand.style.transform = `rotate(${out ? 360 : 0}deg)`;
    strip.style.transform = `translateX(${out ? -FRAME * (FRAMES - 1) : 0}px)`;
  };

  const play = () => {
    clock.clearTimeout(settling);

    if (prefersReducedMotion(root)) {
      send(true);
      scene.dataset.state = 'rested';
      return;
    }

    // Back to the first position with nothing to carry anything there, then a reflow so the
    // reset and the run cannot be folded into one change.
    for (const el of [stepHand, sweepHand, strip]) el.style.transition = 'none';
    send(false);
    void strip.offsetWidth;

    stepHand.style.transition = `transform ${RUN_MS}ms steps(${TICKS}, jump-end) ${LEAD}ms`;
    sweepHand.style.transition = `transform ${RUN_MS}ms linear ${LEAD}ms`;
    strip.style.transition = `transform ${RUN_MS}ms steps(${FRAMES}, jump-none) ${LEAD}ms`;
    send(true);
    scene.dataset.state = 'ticking';
    settling = clock.setTimeout(
      () => {
        scene.dataset.state = 'rested';
      },
      LEAD + RUN_MS + 60,
    );
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
