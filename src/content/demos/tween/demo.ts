import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TILE = 40;
const ARENA_W = 356;
/** Room above and below for the corners a rotated square swings out of its box. */
const ARENA_H = TILE + 18;
const TRAVEL = ARENA_W - TILE;
const DURATION_MS = 1500;
/** The frames the strip draws between the two stated poses, as fractions of the run. */
const GHOSTS = [0.2, 0.4, 0.6, 0.8];

/** One pose of the tween, at `t` of the way from the first value to the last. */
const pose = (t: number) => `translateX(${(t * TRAVEL).toFixed(1)}px) rotate(${(t * 45).toFixed(1)}deg)`;

/**
 * Tween specimen: two poses stated, everything between them generated. The strip
 * above draws the run as frames, the two ends solid because they are the values
 * somebody wrote and the four between them onion-skinned because nobody did. The
 * tile below then takes the same path as one animation.
 *
 * The subject is the tweened tile: the term names the animation running between two
 * values, and the strip is the scenery that says which two. The timing is `linear`
 * on purpose, so an evenly spaced ghost really is the frame at that moment; a curve
 * would put the drawn frames somewhere the diagram does not claim they are.
 *
 * The keyframes go to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` itself and leaves the tile on its last value instead of
 * playing the run (SPEC §5). `data-settled` is timed on the stage's clock, so a pose
 * cannot let the run finish underneath a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const frame = (t: number, drawn: boolean) => `
    <span
      style="position: absolute; left: 0; top: 9px; width: ${TILE}px; height: ${TILE}px; border-radius: 8px;
             transform: ${pose(t)}; ${
               drawn ? 'background: var(--sp-accent)' : `border: 1px dashed var(--sp-accent); opacity: ${(0.3 + t * 0.4).toFixed(2)}`
}"
    ></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Two values, one animation</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-context" style="margin-top: 12px">
          <div style="position: relative; width: ${ARENA_W}px; height: ${ARENA_H}px">
            ${frame(0, true)}${GHOSTS.map((t) => frame(t, false)).join('')}${frame(1, true)}
          </div>
          <div class="sp-row sp-row--between" style="width: ${ARENA_W}px; margin-top: 6px">
            <span class="sp-label" style="font-size: 11px">first value, stated</span>
            <span class="sp-label" style="font-size: 11px">generated</span>
            <span class="sp-label" style="font-size: 11px">last value, stated</span>
          </div>
        </div>

        <div style="position: relative; width: ${ARENA_W}px; height: ${ARENA_H}px; margin-top: 12px">
          <span
            data-part="tile"
            data-subject
            style="position: absolute; left: 0; top: 9px; width: ${TILE}px; height: ${TILE}px; border-radius: 8px;
                   background: var(--sp-accent); transform: ${pose(1)}"
          ></span>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const tile = part(root, 'tile');
  let settling: number | undefined;

  const settle = () => {
    panel.removeAttribute('data-running');
    panel.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');
    for (const animation of tile.getAnimations()) animation.cancel();

    if (prefersReducedMotion(root)) {
      settle();
      return;
    }

    tile.animate([{ transform: pose(0) }, { transform: pose(1) }], { duration: DURATION_MS, easing: 'linear', fill: 'forwards' });
    settling = clock.setTimeout(settle, DURATION_MS + 60);
  };

  part(root, 'replay').addEventListener('click', play);
}
