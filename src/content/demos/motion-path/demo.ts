import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

/** Lane and viewBox are the same numbers, so a path drawn in the SVG and the same
    path handed to `offset-path` resolve in one coordinate system. */
const LANE_W = 380;
const CURVE_H = 92;
const LINE_H = 44;
const CURVE = 'M 24 80 C 110 6 250 6 356 24';
const LINE = 'M 24 32 L 356 14';
const TRAVEL_MS = 900;
const STOPS = ['0', '50', '100'];

/**
 * Motion path specimen: one dot travelling a drawn S curve, with the curve itself
 * shown as the track it rides. The only value that animates is how far along the
 * route the dot has come, which is the term stated as an interface: the route is a
 * shape, and the motion is a distance on it. The straight lane underneath covers the
 * same two endpoints with the same timing, so what the curve buys is legible without
 * anything being asserted about it.
 *
 * The subject is the route with its traveller, not the dot alone: a dot is any moving
 * thing, and what the term names is the path it was given. The straight twin, the
 * stops, the readout, and the caption are scenery.
 *
 * Nothing here is scripted animation. `offset-distance` is a transitioned property, so
 * `motion.css` gates it for the reader who asked for less movement (the write lands
 * synchronously and the dot is simply at its stop), and the settle beat comes from the
 * stage's clock, so a pose stops the trip where it stands (SPEC §6). Each stop is an
 * absolute distance rather than a step along, so a fast-forwarded or resumed pass lands
 * where it said it would (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segments = STOPS.map((stop) => `<button class="sp-segment" data-part="seg-${stop}" value="${stop}">${stop}%</button>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-at="0" data-state="settled" style="width: 420px">
        <span class="sp-heading sp-context">Along the path, not across the box</span>
        <div class="sp-stack" style="gap: 6px; margin-top: 10px">
          <div
            data-part="route"
            data-subject
            style="position: relative; width: ${LANE_W}px; height: ${CURVE_H}px; border-radius: 6px;
                   background: var(--sp-sunken); overflow: hidden"
          >
            <svg width="${LANE_W}" height="${CURVE_H}" viewBox="0 0 ${LANE_W} ${CURVE_H}" aria-hidden="true" style="display: block">
              <path d="${CURVE}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.7" />
              <circle cx="24" cy="80" r="3" fill="var(--sp-muted)" />
              <circle cx="356" cy="24" r="3" fill="var(--sp-muted)" />
            </svg>
            <span
              data-part="dot-curve"
              style="position: absolute; left: 0; top: 0; width: 16px; height: 16px; border-radius: 50%;
                     background: var(--sp-accent); offset-path: path('${CURVE}'); offset-distance: 0%;
                     transition: offset-distance ${TRAVEL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)"
            ></span>
            <span class="sp-label" style="position: absolute; left: 10px; top: 8px; font-size: 11px">offset-path: path()</span>
          </div>
          <div
            class="sp-context"
            data-part="lane-line"
            style="position: relative; width: ${LANE_W}px; height: ${LINE_H}px; border-radius: 6px;
                   background: var(--sp-sunken); overflow: hidden"
          >
            <svg width="${LANE_W}" height="${LINE_H}" viewBox="0 0 ${LANE_W} ${LINE_H}" aria-hidden="true" style="display: block">
              <path d="${LINE}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.7" />
              <circle cx="24" cy="32" r="3" fill="var(--sp-muted)" />
              <circle cx="356" cy="14" r="3" fill="var(--sp-muted)" />
            </svg>
            <span
              data-part="dot-line"
              style="position: absolute; left: 0; top: 0; width: 16px; height: 16px; border-radius: 50%;
                     background: var(--sp-accent); offset-path: path('${LINE}'); offset-distance: 0%;
                     transition: offset-distance ${TRAVEL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)"
            ></span>
            <span class="sp-label" style="position: absolute; left: 10px; top: 2px; font-size: 11px">the same trip, straight</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <sp-segmented class="sp-segmented" data-part="picker" data-value="0" data-axis="Distance">${segments}</sp-segmented>
          <span class="sp-label" data-part="readout">offset-distance: 0%</span>
        </div>
        <p class="sp-text sp-context" style="margin: 8px 0 0">
          The animated value is the distance along, not an x and a y.
        </p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  let settling: number | undefined;

  const travel = (stop: string) => {
    clock.clearTimeout(settling);
    scene.dataset.at = stop;
    for (const id of ['dot-curve', 'dot-line']) part(root, id).style.setProperty('offset-distance', `${stop}%`);
    part(root, 'readout').textContent = `offset-distance: ${stop}%`;

    if (prefersReducedMotion(root)) {
      scene.dataset.state = 'settled';
      return;
    }
    scene.dataset.state = 'moving';
    settling = clock.setTimeout(() => {
      scene.dataset.state = 'settled';
    }, TRAVEL_MS + 60);
  };

  part(root, 'picker').addEventListener('change', (event) => travel((event as CustomEvent<string>).detail));
}
