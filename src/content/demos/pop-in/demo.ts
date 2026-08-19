import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const POP_MS = 460;
const MEDAL = 88;
/** The room the medal will take, held from mount so the arrival cannot shove the panel about. */
const SLOT = 104;

/**
 * Opacity is finished long before the scale is, which is what keeps this reading as one
 * arrival rather than as a fade and a resize happening at the same time. The pass over 1 is
 * four and a half percent: enough to register as a snap, not enough to read as a cartoon.
 */
const POP: Keyframe[] = [
  { offset: 0, transform: 'scale(0.9)', opacity: 0, easing: 'cubic-bezier(0.25, 0.9, 0.35, 1)' },
  { offset: 0.28, transform: 'scale(1)', opacity: 1, easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 0.58, transform: 'scale(1.045)', opacity: 1, easing: 'cubic-bezier(0.3, 0, 0.2, 1)' },
  { offset: 1, transform: 'scale(1)', opacity: 1 },
];

/**
 * Pop in specimen: a streak medal that arrives on a panel with a snap. The medal is mounted
 * arriving, and Replay plays the arrival again, so the shape can be watched more than once:
 * a Replay control is the demo's own instrumentation and never part of the term (SPEC §5).
 * `data-plays` counts the arrivals, which is how the choreography proves one happened without
 * having to time an assert to the overshoot peak.
 *
 * The subject is the medal, the arriving element. The panel, the heading, the line beneath it
 * and the Replay button are the scene it arrives into.
 *
 * The medal is absolutely positioned in a slot whose size is written down at mount, so the
 * scale can never move the text under it (SPEC §5), and nothing is measured at all. Replay
 * always reaches the same state, arrived, rather than flipping whatever it found (SPEC §8).
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and simply leaves the medal at rest, which is the honest
 * answer for a scale entrance. `data-state` is cleared on the stage's clock, so a pose cannot
 * let an arrival finish under someone inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: 340px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Today</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          class="sp-body sp-stack"
          style="align-items: center; justify-content: center; gap: 6px; padding: 10px"
        >
          <div style="position: relative; width: ${SLOT}px; height: ${SLOT}px; flex: 0 0 auto">
            <span
              data-part="medal"
              data-subject
              data-state="settled"
              data-plays="1"
              style="position: absolute; left: ${(SLOT - MEDAL) / 2}px; top: ${(SLOT - MEDAL) / 2}px;
                     width: ${MEDAL}px; height: ${MEDAL}px; display: flex; align-items: center;
                     justify-content: center; border-radius: 50%; background: var(--sp-accent);
                     color: var(--sp-accent-ink); box-shadow: var(--sp-shadow); will-change: transform"
            ><span style="display: flex; transform: scale(2.3)">${icon('check')}</span></span>
          </div>
          <span class="sp-heading sp-context" data-part="title" style="font-size: 15px">Streak saved</span>
          <span class="sp-text sp-context" data-part="note" style="text-align: center">
            Fourteen days. The medal lands a touch large, then settles.
          </span>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 340px; margin: 0; text-align: center">
        One snap, no floor: nothing here rebounds.
      </p>
    </div>
  `;

  const medal = part(root, 'medal');
  const reduced = prefersReducedMotion(root);
  let plays = 0;
  let settling: number | undefined;

  const play = (): void => {
    clock.clearTimeout(settling);
    for (const animation of medal.getAnimations()) animation.cancel();
    plays += 1;
    medal.dataset.plays = String(plays);

    if (reduced) {
      medal.dataset.state = 'settled';
      return;
    }
    medal.dataset.state = 'popping';
    medal.animate(POP, { duration: POP_MS, fill: 'backwards' });
    settling = clock.setTimeout(() => {
      medal.dataset.state = 'settled';
    }, POP_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);

  play();
}
