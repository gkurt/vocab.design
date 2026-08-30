import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ARENA_H = 150;
const BADGE_H = 26;
const FALL = ARENA_H - BADGE_H;
const DURATION_MS = 1400;

/**
 * The landings and the peaks, written as pins. Each rebound reaches about half the
 * height of the one before it and takes less time, so the beats crowd together at the
 * end: evenly spaced landings read as a loop rather than as energy running out. Falls
 * leave their pin accelerating and rises leave decelerating, which is the whole reason
 * the per-keyframe easing exists.
 *
 * Nothing ever goes past `FALL`. Crossing the floor would be an elastic curve
 * oscillating around its target, which is a different term.
 */
const BOUNCE = [
  { offset: 0, y: 0, easing: 'ease-in' },
  { offset: 0.42, y: FALL, easing: 'ease-out' },
  { offset: 0.6, y: FALL - 40, easing: 'ease-in' },
  { offset: 0.76, y: FALL, easing: 'ease-out' },
  { offset: 0.87, y: FALL - 14, easing: 'ease-in' },
  { offset: 1, y: FALL },
];

/** The same distance in the same time, decelerating into the floor and stopping there. */
const PLAIN = [
  { offset: 0, y: 0, easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 0.42, y: FALL },
  { offset: 1, y: FALL },
];

const frames = (path: { offset: number; y: number; easing?: string }[]): Keyframe[] =>
  path.map((stop) => ({ offset: stop.offset, easing: stop.easing, transform: `translateY(${stop.y}px)` }));

/**
 * Bounce specimen: a notification badge dropped onto a floor it rebounds off twice,
 * beside a scenery badge that takes the same drop and simply stops. What is left to
 * see is the term: the arrival happening more than once, in decreasing amounts.
 *
 * The subject is the bouncing badge. Both badges are absolutely positioned in their own
 * arena, so neither can move anything else in the panel (SPEC §5), and the floor is
 * drawn as a rule so the landings have something to be landings on.
 *
 * The keyframes go to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` itself and parks both badges on the floor rather than
 * playing a rebound at a reader who asked for less movement. `data-settled` is timed on
 * the stage's clock, so a pose cannot let the run finish underneath someone inspecting
 * it (SPEC §6).
 *
 * The panel was headed "One drop, two landings" and each lane carried a note under its name
 * ("rebounds, decaying", "lands once, stops"). Both were the site describing the thing the
 * reader is already watching, so they went; the two lanes still name the curves they play,
 * which is what a comparison of easings has to say and all it has to say.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, label: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 1 1 0; gap: 8px">
      <div style="position: relative; height: ${ARENA_H}px">
        <span
          class="sp-chip"
          data-part="badge-${id}"
          ${subject ? 'data-subject' : ''}
          style="position: absolute; top: 0; left: 50%; margin-left: -34px; width: 68px; height: ${BADGE_H}px;
                 justify-content: center; cursor: default; background: var(--sp-accent); border-color: var(--sp-accent);
                 color: var(--sp-accent-ink); font-weight: 600; transform: translateY(${FALL}px)"
        >12 new</span>
        <span style="position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
      </div>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 384px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-end; gap: 26px; margin-top: 10px">
          ${lane('bounce', 'Bounce', true)}
          ${lane('plain', 'Ease out', false)}
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const bouncing = part(root, 'badge-bounce');
  const plain = part(root, 'badge-plain');
  let settling: number | undefined;

  const settle = () => {
    panel.removeAttribute('data-running');
    panel.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');
    for (const badge of [bouncing, plain]) {
      for (const animation of badge.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      settle();
      return;
    }

    bouncing.animate(frames(BOUNCE), { duration: DURATION_MS, fill: 'forwards' });
    plain.animate(frames(PLAIN), { duration: DURATION_MS, fill: 'forwards' });
    settling = clock.setTimeout(settle, DURATION_MS + 60);
  };

  part(root, 'replay').addEventListener('click', play);
}
