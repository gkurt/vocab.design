import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LANE = { w: 396, h: 92 };
const BOX = 40;
const EDGE = 14;
const TRAVEL = LANE.w - BOX - EDGE * 2;
/** Short on purpose: this is the only speed at which a sharp frame looks wrong (see the article). */
const LEG_MS = 520;
const TURN_MS = 240;
/** How far the smear reaches behind the box. */
const TAIL = 62;

/** The trailing gradient and the softened head: a smear faked in the only ways a browser allows. */
const smear = (id: string) => `
  <span
    data-part="tail-${id}"
    style="position: absolute; top: 0; bottom: 0; left: ${-TAIL}px; width: ${TAIL + BOX / 2}px; border-radius: 9px;
           background: linear-gradient(to right, transparent, var(--sp-accent)); filter: blur(4px); opacity: 0"
  ></span>
  <span
    data-part="head-${id}"
    style="position: absolute; inset: 0; border-radius: 9px; background: var(--sp-accent)"
  ></span>`;

/**
 * Motion blur specimen: one box crossing a lane and coming back, fast, under a control that turns
 * the smear on and off. The smear is faked, because nothing in a browser produces the real thing:
 * a gradient tail behind the box plus a light blur on the box itself, both stated inline, and the
 * tail flips to the other side at the turn so it always trails the direction of travel.
 *
 * Under the lane sits a still of one frame mid-flight in whichever mode is picked, which is the
 * only way the difference is legible rather than a guess: at this speed a reader cannot hold two
 * live passes side by side, and a still is exactly what a film frame is.
 *
 * The subject is the moving box. `Off` is the counter-example the box itself passes through, so
 * the honest condition lives in `data-pose` and identify plays on rather than posing a sharp box
 * (SPEC §6); the mount state is the blurred one. `motion.css` cannot reach an `element.animate`
 * keyframe set, so the demo asks `prefersReducedMotion` itself and rests the box on the far end of
 * the lane without ever running the pass. The box travels inside a lane that already holds its
 * size, so nothing in the panel moves as it crosses (SPEC §5), and the beats between legs come
 * from the stage's clock so a pose stops the run where it stands.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rested" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Speed</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="on" data-axis="Blur" data-term="on">
            <button class="sp-segment" type="button" data-part="seg-off" value="off">Off</button>
            <button class="sp-segment" type="button" data-part="seg-on" value="on">Blurred</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div
            data-part="lane"
            style="position: relative; width: ${LANE.w}px; height: ${LANE.h}px; border-radius: 8px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line)"
          >
            <span
              aria-hidden="true"
              style="position: absolute; left: ${EDGE}px; right: ${EDGE}px; top: 50%; height: 2px; margin-top: -1px;
                     background: var(--sp-line)"
            ></span>
            <div
              data-part="box"
              data-subject
              data-blur="on"
              data-pose="[data-blur=on]"
              style="position: absolute; left: ${EDGE}px; top: ${(LANE.h - BOX) / 2}px; width: ${BOX}px; height: ${BOX}px;
                     transform: translateX(0); will-change: transform"
            >${smear('live')}</div>
          </div>

          <div
            class="sp-context"
            data-part="still"
            data-blur="on"
            style="display: flex; align-items: center; gap: 12px; width: ${LANE.w}px; padding: 8px 12px;
                   border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-sunken)"
          >
            <span style="position: relative; flex: 0 0 auto; width: ${BOX + TAIL}px; height: ${BOX}px">
              <span style="position: absolute; right: 0; top: 0; width: ${BOX}px; height: ${BOX}px">${smear('still')}</span>
            </span>
            <span class="sp-stack" style="gap: 2px; min-width: 0">
              <span class="sp-label" style="font-size: 11px">One frame, mid-flight</span>
              <span class="sp-text sp-text--ink" data-stage-verdict data-part="verdict" style="font-size: 12px; white-space: nowrap">Smeared along its direction of travel</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const box = part(root, 'box');
  const still = part(root, 'still');
  const verdict = part(root, 'verdict');
  const liveTail = part(root, 'tail-live');
  const liveHead = part(root, 'head-live');
  const stillTail = part(root, 'tail-still');
  const stillHead = part(root, 'head-still');
  const reduced = prefersReducedMotion(root);

  let blurred = true;
  let running: Animation | undefined;
  let turning: number | undefined;
  let settling: number | undefined;

  /** `dir` is +1 for travel to the right, so the tail sits on the left. */
  const aimTail = (el: HTMLElement, dir: 1 | -1) => {
    el.style.left = dir === 1 ? `${-TAIL}px` : `${BOX / 2}px`;
    el.style.background = `linear-gradient(to ${dir === 1 ? 'right' : 'left'}, transparent, var(--sp-accent))`;
  };

  /** The smear exists only while something is moving: a box at rest with a tail would be a lie. */
  const paint = (moving: boolean) => {
    const on = blurred && moving;
    liveTail.style.opacity = on ? '1' : '0';
    liveHead.style.filter = on ? 'blur(1.6px)' : 'none';
  };

  const setMode = (value: string) => {
    blurred = value !== 'off';
    box.dataset.blur = blurred ? 'on' : 'off';
    still.dataset.blur = blurred ? 'on' : 'off';
    stillTail.style.opacity = blurred ? '1' : '0';
    stillHead.style.filter = blurred ? 'blur(1.6px)' : 'none';
    verdict.textContent = blurred ? 'Smeared along its direction of travel' : 'Sharp, so the move reads as a jump';
    paint(scene.dataset.state === 'crossing');
  };

  const leg = (from: number, to: number, dir: 1 | -1) => {
    aimTail(liveTail, dir);
    paint(true);
    running?.cancel();
    running = box.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], {
      duration: LEG_MS,
      easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
      fill: 'forwards',
    });
  };

  const play = () => {
    clock.clearTimeout(turning);
    clock.clearTimeout(settling);

    if (reduced) {
      running?.cancel();
      box.style.transform = `translateX(${TRAVEL}px)`;
      scene.dataset.state = 'rested';
      paint(false);
      return;
    }

    scene.dataset.state = 'crossing';
    leg(0, TRAVEL, 1);
    turning = clock.setTimeout(() => leg(TRAVEL, 0, -1), LEG_MS + TURN_MS);
    settling = clock.setTimeout(
      () => {
        scene.dataset.state = 'rested';
        paint(false);
      },
      LEG_MS * 2 + TURN_MS + 40,
    );
  };

  // Each segment names a mode outright, and Replay names a run: neither flips whatever it finds.
  part(root, 'mode').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));
  part(root, 'replay').addEventListener('click', play);

  aimTail(stillTail, 1);
  setMode('on');
  play();
}
