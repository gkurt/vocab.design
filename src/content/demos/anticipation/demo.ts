import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const DURATION_MS = 780;

/** The glyph points right, so the wind-up and the launch share one axis. */
const pose = (x: number, scale = 1) => `translateX(${x}px) rotate(90deg) scale(${scale})`;

/**
 * The wind-up, then the launch. The reverse move is about a tenth of the travel and
 * takes about a fifth of the time, which is the ratio that reads as preparation rather
 * than as a stumble. Opacity and transform are pinned on different keyframes on
 * purpose: the glyph holds its ink through most of the flight and only gives it up as
 * it leaves the control, and the last beat is the reset that makes the specimen
 * loopable rather than part of the term.
 */
const WIND_UP: Keyframe[] = [
  { offset: 0, transform: pose(0), opacity: 1, easing: 'ease-out' },
  { offset: 0.22, transform: pose(-7, 0.88), easing: 'ease-in' },
  { offset: 0.5, opacity: 1 },
  { offset: 0.62, transform: pose(34), opacity: 0 },
  { offset: 0.66, transform: pose(0) },
  { offset: 0.74, opacity: 0 },
  { offset: 1, opacity: 1 },
];

/** The same launch on the same clock, started cold. */
const COLD: Keyframe[] = [
  { offset: 0, transform: pose(0), opacity: 1, easing: 'ease-in' },
  { offset: 0.5, opacity: 1 },
  { offset: 0.62, transform: pose(34), opacity: 0 },
  { offset: 0.66, transform: pose(0) },
  { offset: 0.74, opacity: 0 },
  { offset: 1, opacity: 1 },
];

/**
 * Anticipation specimen: a send control whose glyph rears back before it launches,
 * beside a scenery control that launches cold on exactly the same timing. The only
 * difference between the two animations is the wind-up keyframe, so that is the only
 * thing there is to see.
 *
 * The subject is the anticipating control, since the term names what the control does
 * before it acts, and the glyph is only where that shows. Each button clips its own
 * flight, so the glyph leaves the control rather than crossing the panel, and nothing
 * either button does can move anything else (SPEC §5).
 *
 * The keyframes go to `element.animate`, out of reach of `motion.css`, so the demo asks
 * `prefersReducedMotion` itself: a wind-up is decoration on top of a change that has to
 * work without it, so under that preference it simply does not play. `data-settled` is
 * timed on the stage's clock so a pose cannot let the run finish under a reader
 * inspecting it (SPEC §6).
 *
 * The window opened with a heading, "Back, then forward", and a line giving the ratio ("The
 * wind-up is a tenth of the travel and a fifth of the time."), and each lane's label carried
 * a description of its own animation. All of it was the site explaining the motion in words
 * over a specimen that shows it, and the article already states the ratio, so only the two
 * lane names are left.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, label: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 1 1 0; gap: 8px; align-items: flex-start">
      <button
        class="sp-button"
        type="button"
        data-part="${id}"
        ${subject ? 'data-subject' : ''}
        style="display: inline-flex; align-items: center; gap: 9px; overflow: hidden"
      >
        Send
        <span data-part="${id}-glyph" style="display: flex; transform: ${pose(0)}">${icon('share')}</span>
      </button>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" style="width: 372px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          ${lane('send', 'With anticipation', true)}
          ${lane('cold', 'Without', false)}
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  let settling: number | undefined;

  const launch = (id: string, frames: Keyframe[]) => {
    const glyph = part(root, `${id}-glyph`);
    for (const animation of glyph.getAnimations()) animation.cancel();
    clock.clearTimeout(settling);
    panel.removeAttribute('data-settled');
    panel.setAttribute('data-running', '');

    if (prefersReducedMotion(root)) {
      panel.removeAttribute('data-running');
      panel.setAttribute('data-settled', '');
      return;
    }

    glyph.animate(frames, { duration: DURATION_MS });
    settling = clock.setTimeout(() => {
      panel.removeAttribute('data-running');
      panel.setAttribute('data-settled', '');
    }, DURATION_MS + 60);
  };

  part(root, 'send').addEventListener('click', () => launch('send', WIND_UP));
  part(root, 'cold').addEventListener('click', () => launch('cold', COLD));
}
