import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ARENA_H = 132;
const SHEET_H = 52;
/** How far below its resting place the sheet starts, in the arena's own pixels. */
const ENTER = 104;
const DURATION_MS = 900;

/**
 * The surplus, in pixels above the resting value, and the corrections after it. Each
 * pass is smaller than the one before, and the last value is exactly 0: a motion that
 * rests a pixel past its target has quietly moved the layout.
 */
const OVERSHOOT = [
  { offset: 0, y: ENTER, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)' },
  { offset: 0.56, y: -13, easing: 'ease-in-out' },
  { offset: 0.76, y: 4, easing: 'ease-in-out' },
  { offset: 0.9, y: -1.5, easing: 'ease-out' },
  { offset: 1, y: 0 },
];

/** The same distance in the same time, decelerating onto the target and staying there. */
const DEAD_ON = [
  { offset: 0, y: ENTER, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { offset: 1, y: 0 },
];

const frames = (path: { offset: number; y: number; easing?: string }[]): Keyframe[] =>
  path.map((stop) => ({ offset: stop.offset, easing: stop.easing, transform: `translateY(${stop.y}px)` }));

/**
 * Overshoot specimen: a sheet arriving at a marked target, beside a scenery twin
 * taking the same distance in the same time and stopping on it. The dashed rule is
 * the final value, so the surplus is not a feeling but a crossing anyone can see.
 *
 * The subject is the overshooting sheet. Both sheets are absolutely positioned in
 * arenas that clip them, so an arrival from off stage cannot move anything in the
 * panel (SPEC §5).
 *
 * The keyframes go to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` itself and leaves both sheets on the target rather than
 * playing a wobble at a reader who asked for less movement. `data-settled` is timed on
 * the stage's clock, so a pose cannot let the run finish underneath a reader inspecting
 * it (SPEC §6).
 *
 * Three strings went, because all three were the site talking inside the panel. The
 * heading read "Past the target, and back" and now names the scene it is showing, and
 * the two lanes carried notes ("crosses, corrects, settles", "arrives dead on") that
 * described the motion the reader is watching happen. The lane names, Overshoot and
 * Ease out, are the two easings and stay.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, label: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 1 1 0; gap: 8px">
      <div style="position: relative; height: ${ARENA_H}px; overflow: hidden; border-radius: 6px; background: var(--sp-sunken)">
        <span
          style="position: absolute; left: 8px; right: 8px; bottom: ${SHEET_H + 18}px; height: 0;
                 border-top: 1px dashed var(--sp-muted); opacity: 0.8"
        ></span>
        <span class="sp-label" style="position: absolute; left: 10px; bottom: ${SHEET_H + 22}px; font-size: 10px">target</span>
        <span
          class="sp-surface"
          data-part="sheet-${id}"
          ${subject ? 'data-subject' : ''}
          style="position: absolute; left: 8px; right: 8px; bottom: 18px; height: ${SHEET_H}px; display: flex;
                 align-items: center; padding: 0 12px; font-size: 12px; font-weight: 500; box-shadow: var(--sp-shadow);
                 transform: translateY(0)"
        >Share sheet</span>
      </div>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 392px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Share sheet arrival</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 20px; margin-top: 10px">
          ${lane('over', 'Overshoot', true)}
          ${lane('plain', 'Ease out', false)}
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const over = part(root, 'sheet-over');
  const plain = part(root, 'sheet-plain');
  let settling: number | undefined;

  const settle = () => {
    panel.removeAttribute('data-running');
    panel.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');
    for (const sheet of [over, plain]) {
      for (const animation of sheet.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      settle();
      return;
    }

    over.animate(frames(OVERSHOOT), { duration: DURATION_MS, fill: 'forwards' });
    plain.animate(frames(DEAD_ON), { duration: DURATION_MS, fill: 'forwards' });
    settling = clock.setTimeout(settle, DURATION_MS + 60);
  };

  part(root, 'replay').addEventListener('click', play);
}
