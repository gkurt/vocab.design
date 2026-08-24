import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ARENA_H = 148;
const BALL = 34;
const FALL = ARENA_H - BALL;
const DURATION_MS = 1600;

/**
 * One trajectory, written once. `y` is how far down the ball has travelled, `sx`/`sy`
 * are the deformation the flexible ball adds at that moment, and `easing` is the curve
 * into the next frame: gravity accelerates on the way down and runs out on the way up,
 * which is the difference between a bounce and a sine wave.
 *
 * Volume is conserved by hand, the way it is in cel animation: every frame that widens
 * the ball flattens it by roughly as much, so it reads as mass being pushed around
 * rather than as an image being resized.
 *
 * The bounces lose height the way they lose time: the second hop is under half the first
 * one's flight and about a fifth of its height, because height goes with the square of
 * the time in the air. A hop that rises further than the one before it is a ball being
 * thrown, not dropped, and it is the one thing here that reads as wrong.
 */
const PATH = [
  { offset: 0, y: 0, sx: 1, sy: 1, easing: 'ease-in' },
  { offset: 0.26, y: FALL, sx: 0.88, sy: 1.16, easing: 'ease-out' },
  { offset: 0.31, y: FALL, sx: 1.24, sy: 0.72, easing: 'ease-in' },
  { offset: 0.36, y: FALL, sx: 0.9, sy: 1.12, easing: 'ease-out' },
  { offset: 0.56, y: FALL * 0.36, sx: 1, sy: 1, easing: 'ease-in' },
  { offset: 0.76, y: FALL, sx: 0.94, sy: 1.08, easing: 'ease-out' },
  { offset: 0.8, y: FALL, sx: 1.14, sy: 0.84, easing: 'ease-in' },
  { offset: 0.84, y: FALL, sx: 0.97, sy: 1.04, easing: 'ease-out' },
  { offset: 0.93, y: FALL * 0.86, sx: 1, sy: 1, easing: 'ease-in' },
  { offset: 1, y: FALL, sx: 1, sy: 1 },
];

const frames = (deform: boolean): Keyframe[] =>
  PATH.map((step) => ({
    offset: step.offset,
    easing: step.easing,
    transform: `translateY(${step.y.toFixed(1)}px) scale(${deform ? step.sx : 1}, ${deform ? step.sy : 1})`,
  }));

/**
 * Squash and stretch specimen: two balls dropped down the same path, one of which is
 * allowed to deform. The rigid ball is scenery and keeps its shape the whole way, so
 * what is left to see is the term: stretched along the direction of travel in flight,
 * flattened against the floor at the moment it is stopped.
 *
 * The subject is the flexible ball. The transform origin is its base, so squashing
 * spreads it on the floor instead of sinking it through the floor, and neither ball can
 * move anything else in the panel (SPEC §5).
 *
 * The keyframes are generated and go to `element.animate`, which `motion.css` cannot
 * reach, so the demo asks `prefersReducedMotion` itself and parks both balls on the
 * floor instead of playing the drop. `data-settled` is timed on the stage's clock rather
 * than on the animation's own promise, so a pose cannot let the run finish underneath a
 * reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const column = (id: string, label: string, note: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 1 1 0; gap: 8px">
      <div data-part="arena-${id}" style="position: relative; height: ${ARENA_H}px">
        <span
          data-part="ball-${id}"
          ${subject ? 'data-subject' : ''}
          style="position: absolute; top: 0; left: 50%; width: ${BALL}px; height: ${BALL}px; margin-left: ${-BALL / 2}px;
                 border-radius: 50%; background: var(--sp-accent); transform-origin: bottom center;
                 transform: translateY(${FALL}px)"
        ></span>
      </div>
      <span class="sp-divider"></span>
      <span class="sp-stack" style="gap: 1px">
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${label}</span>
        <span class="sp-label" style="font-size: 11px">${note}</span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 392px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One drop, two materials</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-end; gap: 28px; margin-top: 12px">
          ${column('soft', 'Squash and stretch', 'deforms along its travel', true)}
          ${column('rigid', 'Rigid', 'same path, one shape', false)}
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const soft = part(root, 'ball-soft');
  const rigid = part(root, 'ball-rigid');
  let settling: number | undefined;

  const settle = () => {
    panel.removeAttribute('data-running');
    panel.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');
    for (const ball of [soft, rigid]) {
      for (const animation of ball.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      for (const ball of [soft, rigid]) ball.style.transform = `translateY(${FALL}px)`;
      settle();
      return;
    }

    soft.animate(frames(true), { duration: DURATION_MS, fill: 'forwards' });
    rigid.animate(frames(false), { duration: DURATION_MS, fill: 'forwards' });
    settling = clock.setTimeout(settle, DURATION_MS + 60);
  };

  part(root, 'replay').addEventListener('click', play);
}
