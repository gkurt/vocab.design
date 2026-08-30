import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CROP_W = 400;
const CROP_H = 152;
/** Compressed from the eight to twelve seconds a real one runs, so a loop is watchable. */
const DRIFT_MS = 4800;
/** Both ends keep the plate wider than its crop, so no edge of the picture can ever show. */
const OPEN = 'scale(1.1) translate(2%, 1.5%)';
const CLOSE = 'scale(1.26) translate(-2%, -1.5%)';

/**
 * Ken Burns specimen: a still photograph, cropped, drifting. The picture is painted here from
 * gradients rather than loaded, since a specimen may not fetch anything, and the crop is a box
 * with its overflow hidden holding a plate that is always larger than it. The plate moves
 * between two transforms over a linear five seconds, which tightens the framing and slides it
 * toward the sun at the same time: one property, two readings.
 *
 * The subject is the cropped photograph, the thing a viewer would call the image. The plate
 * inside it is deliberately not the subject: it is bigger than anything on screen at every
 * moment of the drift, so a ring around it would trace a box the reader cannot see. The
 * heading and the Replay control are scenery.
 *
 * Reduced motion is the whole accessible answer for this term and it is a full stop, not a
 * shorter drift: `prefersReducedMotion` is asked directly and the plate is simply never given
 * its second transform, so the picture rests at the framing it was composed at. The settle beat
 * comes from the stage's clock so a pose stops the drift where it stands (SPEC §6), and the
 * plate is clipped by a crop that already holds its size, so nothing around it moves (SPEC §5).
 *
 * A caption under the picture read "Compressed to about five seconds here. A real one runs
 * eight to twelve, and holds still under reduced motion." Both facts are already in the
 * article, so it went rather than moving, and the window's heading, which read "A still,
 * breathing", is now a word a photo viewer would really put there.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Slideshow</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div
          data-part="photo"
          data-subject
          style="position: relative; width: ${CROP_W}px; height: ${CROP_H}px; margin-top: 12px; overflow: hidden;
                 border-radius: var(--sp-radius); border: 1px solid var(--sp-line)"
        >
          <div
            data-part="plate"
            aria-hidden="true"
            style="position: absolute; inset: 0; transform-origin: 62% 40%; transform: ${OPEN};
                   background:
                     radial-gradient(circle at 62% 38%, rgb(255 244 206 / 0.95) 0 5%, rgb(255 220 150 / 0.55) 6%, transparent 26%),
                     linear-gradient(180deg, #a9cbe8 0%, #cfd9e6 44%, #f0cfa0 66%, #e0a86f 100%)"
          >
            <div style="position: absolute; left: -12%; bottom: 8%; width: 78%; height: 62%; border-radius: 50%;
                        background: #7f8f7a; opacity: 0.85"></div>
            <div style="position: absolute; right: -18%; bottom: 4%; width: 86%; height: 54%; border-radius: 50%;
                        background: #5d6d63"></div>
            <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 22%;
                        background: linear-gradient(180deg, #46553f, #33402f)"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const plate = part(root, 'plate');
  let settling: number | undefined;

  const play = () => {
    clock.clearTimeout(settling);

    if (prefersReducedMotion(root)) {
      plate.style.transition = 'none';
      plate.style.transform = OPEN;
      scene.dataset.state = 'static';
      return;
    }

    plate.style.transition = 'none';
    plate.style.transform = OPEN;
    void plate.offsetWidth;

    plate.style.transition = `transform ${DRIFT_MS}ms linear`;
    plate.style.transform = CLOSE;
    scene.dataset.state = 'drifting';
    settling = clock.setTimeout(() => {
      scene.dataset.state = 'rested';
    }, DRIFT_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
