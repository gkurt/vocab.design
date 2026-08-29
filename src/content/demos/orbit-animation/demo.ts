import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SCENE = { w: 200, h: 186 };
const CENTRE = { x: SCENE.w / 2, y: SCENE.h / 2 };
const OUTER = { r: 78, size: 26 };
const INNER = { r: 50, size: 18 };

/** Periods for one full revolution. Every one of them is a real orbit; none is a counter-example. */
const SPEEDS: Record<string, { outer: number; inner: number; note: string }> = {
  slow: { outer: 11000, inner: 8200, note: 'Slow: one turn every 11 seconds.' },
  steady: { outer: 7000, inner: 5200, note: 'Steady: one turn every 7 seconds.' },
  quick: { outer: 3800, inner: 2800, note: 'Quick: one turn every 3.8 seconds, and already too eager.' },
};

/** Where each satellite rests when nothing is revolving, so a still scene is still a constellation. */
const RESTING = { outer: -34, inner: 128 };

const ring = (r: number, name: string) => `
  <span
    class="sp-context"
    data-part="${name}"
    style="position: absolute; left: ${CENTRE.x - r}px; top: ${CENTRE.y - r}px; width: ${r * 2}px; height: ${r * 2}px;
           border: 2px solid var(--sp-line); border-radius: 50%"
  ></span>`;

/**
 * Orbit specimen: a hub with two satellites revolving around it on drawn paths, at a period
 * the segmented control picks. Each satellite sits at the top of a square box centred on the
 * hub and the box is what rotates, which is the trick the article describes: a perfect circle
 * with no trigonometry in it. The satellite carries a counter-rotation of the same period, so
 * its glyph stays upright all the way round.
 *
 * The subject is the outer satellite, the element whose revolving the term names (SPEC §5).
 * The paths, the hub, the inner satellite and the picker are the constellation it revolves in,
 * and they stay in the context register.
 *
 * Every speed is a real orbit, so the subject never stops being the term and no `data-pose` is
 * needed. `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and parks both satellites at written-down angles instead of
 * playing the revolution. Both boxes are absolutely positioned in a scene fixed at mount and
 * the motion is a rotation, so an orbit can never move anything else (SPEC §5). The frame is
 * cut to hold that scene with the body's own padding still around it, so the widest point of
 * the outer orbit is never grazed by the clip.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: 380px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sync</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="speed" data-value="steady" data-axis="Speed">
            <button class="sp-segment" type="button" data-part="seg-slow" value="slow">Slow</button>
            <button class="sp-segment" type="button" data-part="seg-steady" value="steady">Steady</button>
            <button class="sp-segment" type="button" data-part="seg-quick" value="quick">Quick</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="scene" style="position: relative; width: ${SCENE.w}px; height: ${SCENE.h}px">
            ${ring(OUTER.r, 'path-outer')}
            ${ring(INNER.r, 'path-inner')}

            <span
              class="sp-context"
              data-part="hub"
              style="position: absolute; left: ${CENTRE.x - 28}px; top: ${CENTRE.y - 28}px; width: 56px; height: 56px;
                     display: flex; align-items: center; justify-content: center; border-radius: 16px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); color: var(--sp-ink);
                     box-shadow: var(--sp-shadow)"
            >${icon('inbox')}</span>

            <span
              data-part="arm-inner"
              style="position: absolute; left: ${CENTRE.x - INNER.r}px; top: ${CENTRE.y - INNER.r}px;
                     width: ${INNER.r * 2}px; height: ${INNER.r * 2}px; pointer-events: none"
            >
              <span
                class="sp-context"
                data-part="moon"
                style="position: absolute; left: ${INNER.r - INNER.size / 2}px; top: ${-INNER.size / 2}px;
                       width: ${INNER.size}px; height: ${INNER.size}px; display: flex; align-items: center;
                       justify-content: center; border-radius: 50%; background: var(--sp-accent);
                       color: var(--sp-accent-ink)"
              >${icon('star')}</span>
            </span>

            <span
              data-part="arm-outer"
              style="position: absolute; left: ${CENTRE.x - OUTER.r}px; top: ${CENTRE.y - OUTER.r}px;
                     width: ${OUTER.r * 2}px; height: ${OUTER.r * 2}px; pointer-events: none"
            >
              <span
                data-part="satellite"
                data-subject
                data-speed="steady"
                style="position: absolute; left: ${OUTER.r - OUTER.size / 2}px; top: ${-OUTER.size / 2}px;
                       width: ${OUTER.size}px; height: ${OUTER.size}px; display: flex; align-items: center;
                       justify-content: center; border-radius: 50%; background: var(--sp-accent);
                       color: var(--sp-accent-ink); box-shadow: var(--sp-shadow)"
              >${icon('bell')}</span>
            </span>
          </div>
        </div>
      </div>

              <span data-stage-verdict data-part="note">${SPEEDS.steady?.note}</span>
      
    </div>
  `;

  const note = part(root, 'note');
  const satellite = part(root, 'satellite');
  const reduced = prefersReducedMotion(root);
  const pairs = [
    { arm: part(root, 'arm-outer'), rider: satellite, rest: RESTING.outer, key: 'outer' as const },
    { arm: part(root, 'arm-inner'), rider: part(root, 'moon'), rest: RESTING.inner, key: 'inner' as const },
  ];

  const apply = (key: string): void => {
    const speed = SPEEDS[key];
    if (!speed) return;
    note.textContent = speed.note;
    satellite.dataset.speed = key;

    for (const pair of pairs) {
      for (const el of [pair.arm, pair.rider]) {
        for (const animation of el.getAnimations()) animation.cancel();
      }
      if (reduced) {
        // Parked at a written-down angle: a constellation standing still is still a constellation.
        pair.arm.style.transform = `rotate(${pair.rest}deg)`;
        pair.rider.style.transform = `rotate(${-pair.rest}deg)`;
        continue;
      }
      pair.arm.style.transform = 'none';
      pair.rider.style.transform = 'none';
      const duration = speed[pair.key];
      const timing = { duration, iterations: Number.POSITIVE_INFINITY, easing: 'linear' } as const;
      const turn = pair.arm.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], timing);
      // The same period the other way, so the glyph keeps its heading all the way round.
      const hold = pair.rider.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }], timing);
      // Started partway round, so the two satellites are never in formation.
      const phase = ((((pair.rest % 360) + 360) % 360) / 360) * duration;
      turn.currentTime = phase;
      hold.currentTime = phase;
    }
  };

  // Each segment names a period outright, so a resumed pass lands on the one it asked for
  // rather than stepping to the next (SPEC §8).
  part(root, 'speed').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('steady');
}
