import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Rail and tile are fixed sizes, so the travel is a constant rather than a measurement. */
const RAIL_W = 244;
const RAIL_H = 38;
const TILE_W = 62;
const INSET = 4;
const DISTANCE = RAIL_W - TILE_W - INSET * 2;

const SPRING = { mass: 1, stiffness: 180, damping: 12 };
const SPRING_MS = 940;
const EASE_MS = 520;
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const SAMPLES = 56;

/**
 * A damped spring, sampled into keyframes. The closed form of an underdamped
 * oscillator released from rest gives its position at any moment, so the whole
 * curve (the overshoot and the settle after it) falls out of mass, stiffness,
 * and damping rather than out of a shape somebody drew. The animation is played
 * `linear`, since the samples already carry the timing.
 */
function springFrames(distance: number): Keyframe[] {
  const w = Math.sqrt(SPRING.stiffness / SPRING.mass);
  const zeta = SPRING.damping / (2 * Math.sqrt(SPRING.stiffness * SPRING.mass));
  const wd = w * Math.sqrt(1 - zeta * zeta);
  const frames: Keyframe[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const offset = i / SAMPLES;
    const t = (offset * SPRING_MS) / 1000;
    const decay = Math.exp(-zeta * w * t);
    const value = 1 - decay * (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t));
    frames.push({ offset, transform: `translateX(${(value * distance).toFixed(2)}px)` });
  }
  return frames;
}

/**
 * Spring specimen: one distance, two ways of covering it. The subject settles
 * under a simulated spring, overshooting its stop and coming back to it, while
 * the scenery tile below runs a fixed-duration ease and halts the instant its
 * clock says to. Reading them together is the argument: the spring has no end
 * time written down anywhere, only parameters that decide when it runs out of
 * energy.
 *
 * The keyframes are generated rather than drawn, and they go to
 * `element.animate`, which the kit's motion sheet cannot reach. So the demo asks
 * `prefersReducedMotion` itself and puts both tiles at their destination instead
 * of playing the move, which is the bargain the shake specimen makes too.
 *
 * `data-settled` is set from the stage's clock rather than from the animation's
 * own promise: a pose freezes that clock, so a specimen held mid-flight for
 * inspection cannot quietly finish underneath the reader (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rail = (id: string, subject: boolean) => `
    <div
      data-part="rail-${id}"
      style="position: relative; flex: 0 0 auto; width: ${RAIL_W}px; height: ${RAIL_H}px;
             border-radius: var(--sp-radius); background: var(--sp-sunken)"
    >
      <span
        class="sp-surface"
        data-part="tile-${id}"
        ${subject ? 'data-subject' : ''}
        style="position: absolute; top: ${INSET}px; left: ${INSET}px; display: flex; align-items: center;
               justify-content: center; width: ${TILE_W}px; height: ${RAIL_H - INSET * 2}px;
               border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
               font-weight: 600; transform: translateX(0)"
      >Card</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 396px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One distance, two arrivals</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" data-part="row-spring" style="gap: 12px; margin-top: 16px">
          <span class="sp-stack sp-context" style="width: 104px; gap: 2px">
            <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Spring</span>
            <span class="sp-label" style="font-size: 11px">stiffness 180, damping 12</span>
          </span>
          ${rail('spring', true)}
        </div>
        <div class="sp-row sp-context" data-part="row-ease" style="gap: 12px; margin-top: 12px">
          <span class="sp-stack" style="width: 104px; gap: 2px">
            <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Fixed ease</span>
            <span class="sp-label" style="font-size: 11px">ease-out, ${EASE_MS}ms</span>
          </span>
          ${rail('ease', false)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 14px 0 0">
          The spring is told how heavy and how stiff, never how long.
        </p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const spring = part(root, 'tile-spring');
  const ease = part(root, 'tile-ease');
  let settling: number | undefined;

  const settle = () => {
    panel.removeAttribute('data-running');
    panel.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');
    for (const tile of [spring, ease]) {
      for (const animation of tile.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      for (const tile of [spring, ease]) tile.style.transform = `translateX(${DISTANCE}px)`;
      settle();
      return;
    }

    for (const tile of [spring, ease]) tile.style.transform = 'translateX(0)';
    spring.animate(springFrames(DISTANCE), { duration: SPRING_MS, easing: 'linear', fill: 'forwards' });
    ease.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${DISTANCE}px)` }], {
      duration: EASE_MS,
      easing: EASE,
      fill: 'forwards',
    });
    settling = clock.setTimeout(settle, SPRING_MS + 60);
  };

  part(root, 'replay').addEventListener('click', play);
}
