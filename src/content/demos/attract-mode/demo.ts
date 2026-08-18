import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const SCREEN = { w: 226, h: 172 };
/** How long one frame of the reel is held before the loop moves on. */
const FRAME_MS = 1600;

/** The reel an unattended kiosk plays: three frames, then round again. */
const FRAMES = [
  { title: 'Highlights of the collection', line: 'Twelve rooms, six centuries', art: [24, 44, 32, 52, 38] },
  { title: 'Plan your visit', line: 'Opening times, tickets and maps', art: [50, 28, 42, 22, 46] },
  { title: 'Today at three', line: 'A gallery talk in the Long Room', art: [36, 54, 20, 48, 30] },
];

const topics = ['Collection', 'Visit', 'What is on'];

/**
 * Attract mode specimen: a museum kiosk that falls into a self-playing reel when nobody is at it and
 * drops back to its ready screen the instant the screen is touched. The reel is three frames on a
 * loop, with page dots so the loop is visible as a loop rather than as a slideshow that happens to
 * be going, and the touch that ends it is not spent ending it: the kiosk lands on the ready screen a
 * visitor can use, not on a blank one.
 *
 * Idle is reached by picking it, never by a real wall-clock wait, because a specimen that made the
 * reader sit out a genuine idle threshold would be demonstrating patience rather than the term.
 *
 * The subject is the kiosk screen. Ready is a state the screen itself passes through and it is not
 * the term, so the honest condition is declared in `data-pose` and the mount state satisfies it:
 * identify refuses to ring a kiosk that is currently attending to somebody (SPEC §6). The picker and
 * the read-out are the scene and carry the context register; the bezel is scenery too but stays out
 * of it, since its only paint is `--sp-ink` and the register would have reached through it to
 * neutralize the accent on the screen inside, which is the subject.
 *
 * The reel runs on the stage's clock, so a pose stops it where it stands and a remount takes it away
 * with everything else. Under `prefersReducedMotion` the reel never advances and the kiosk rests on
 * its first frame: a loop nobody asked for is precisely the motion that preference is about, which is
 * the same rule this site's own specimen stage follows. `data-mode` reports the setting rather than
 * whether pixels are moving, so the subject is still the term under that preference.
 *
 * Both screen layers are the same size inside a bezel fixed at mount and every read-out holds its own
 * height, so switching between them moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const first = FRAMES[0] as (typeof FRAMES)[number];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kiosk</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="idle">
            <button class="sp-segment" type="button" data-part="seg-attended" value="attended">Attended</button>
            <button class="sp-segment" type="button" data-part="seg-idle" value="idle">Nobody there</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 14px; padding: 12px">
          <div
            data-part="bezel"
            style="flex: 0 0 auto; padding: 10px 10px 24px; background: var(--sp-ink); border-radius: 12px"
          >
            <div
              data-part="screen" data-subject data-pose="[data-mode=attracting]" data-mode="attracting"
              style="position: relative; width: ${SCREEN.w}px; height: ${SCREEN.h}px; padding: 12px;
                     background: var(--sp-surface); border-radius: 5px; overflow: hidden; cursor: pointer;
                     user-select: none"
            >
              <div
                data-part="attract-layer"
                style="position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 6px"
              >
                <div data-part="art" style="display: flex; align-items: flex-end; justify-content: center; gap: 8px; height: 54px">
                  ${first.art
                    .map(
                      (h, i) => `
                    <span
                      data-part="col-${i + 1}"
                      style="flex: 0 0 auto; width: 32px; height: ${h}px; border-radius: 3px 3px 0 0;
                             background: var(--sp-accent); opacity: ${0.55 + i * 0.09}; transition: height 0.4s var(--sp-ease)"
                    ></span>`,
                    )
                    .join('')}
                </div>
                <span class="sp-heading" data-part="frame-title" style="font-size: 13px">${first.title}</span>
                <span class="sp-text" data-part="frame-line" style="font-size: 12px">${first.line}</span>
                <div class="sp-row" data-part="dots" style="margin-top: auto; justify-content: center; gap: 6px">
                  <span data-part="dot-1" data-current style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent)"></span>
                  <span data-part="dot-2" style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-line)"></span>
                  <span data-part="dot-3" style="width: 7px; height: 7px; border-radius: 50%; background: var(--sp-line)"></span>
                </div>
                <span class="sp-label" style="text-align: center; font-size: 11px">Touch anywhere to begin</span>
              </div>

              <div
                data-part="ready-layer" hidden
                style="position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 6px"
              >
                <span class="sp-heading" style="font-size: 13px">Riverside Museum</span>
                <div class="sp-stack" style="gap: 5px">
                  ${topics
                    .map(
                      (t) =>
                        `<button class="sp-button sp-button--ghost sp-button--sm" type="button" style="justify-content: flex-start; text-align: left">${t}</button>`,
                    )
                    .join('')}
                </div>
                <span class="sp-label" style="margin-top: auto; font-size: 11px">Ready. Choose a topic.</span>
              </div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Screen</span>
            <span class="sp-text--ink" data-part="state" style="font-size: 18px; font-weight: 600; line-height: 1.2">Attracting</span>
            <span class="sp-label" data-part="plays" style="font-size: 11px">Reel playing, round 1</span>
            <span class="sp-divider" style="margin: 4px 0"></span>
            <span class="sp-text" data-part="note" style="height: 90px; font-size: 11px; line-height: 1.45">Nobody is at the kiosk, so it is demonstrating itself. Touching the screen ends the reel, and the touch that ends it is not spent ending it.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const attractLayer = part(root, 'attract-layer');
  const readyLayer = part(root, 'ready-layer');
  const title = part(root, 'frame-title');
  const line = part(root, 'frame-line');
  const state = part(root, 'state');
  const plays = part(root, 'plays');
  const note = part(root, 'note');
  const picker = part(root, 'mode') as HTMLElement & { value: string };
  const columns = [1, 2, 3, 4, 5].map((i) => part(root, `col-${i}`));
  const dots = [1, 2, 3].map((i) => part(root, `dot-${i}`));
  const reduced = prefersReducedMotion(root);

  let index = 0;
  let round = 1;
  let turning: number | undefined;

  const render = () => {
    const frame = FRAMES[index] as (typeof FRAMES)[number];
    title.textContent = frame.title;
    line.textContent = frame.line;
    frame.art.forEach((h, i) => {
      const column = columns[i];
      if (column) column.style.height = `${h}px`;
    });
    dots.forEach((dot, i) => {
      flag(dot, 'data-current', i === index);
      dot.style.background = i === index ? 'var(--sp-accent)' : 'var(--sp-line)';
    });
    plays.textContent = reduced ? 'Reel held on its first frame' : `Reel playing, round ${round}`;
  };

  const advance = () => {
    index = (index + 1) % FRAMES.length;
    if (index === 0) round += 1;
    render();
    turning = clock.setTimeout(advance, FRAME_MS);
  };

  const attract = () => {
    clock.clearTimeout(turning);
    screen.dataset.mode = 'attracting';
    attractLayer.hidden = false;
    readyLayer.hidden = true;
    state.textContent = 'Attracting';
    index = 0;
    round = 1;
    render();
    note.textContent = reduced
      ? 'Reduced motion: the kiosk is idle, but a loop nobody asked for is what this preference is about, so it rests on one frame.'
      : 'Nobody is at the kiosk, so it is demonstrating itself. Touching the screen ends the reel, and the touch that ends it is not spent ending it.';
    if (!reduced) turning = clock.setTimeout(advance, FRAME_MS);
  };

  const ready = () => {
    clock.clearTimeout(turning);
    turning = undefined;
    screen.dataset.mode = 'ready';
    attractLayer.hidden = true;
    readyLayer.hidden = false;
    state.textContent = 'Ready';
    plays.textContent = 'Reel stopped, nothing carried over';
    note.textContent =
      'Somebody is here. The reel stopped on the first touch and left no state behind, so this visitor starts at a beginning.';
  };

  // Both segments name a state outright, so a resumed pass lands on the one it asked for (SPEC §8).
  picker.addEventListener('change', (event) => {
    if ((event as CustomEvent<string>).detail === 'idle') return attract();
    ready();
  });

  // Touching the screen always reaches the ready state, never flips it, and the picker follows so
  // the two never disagree about what the kiosk is doing.
  screen.addEventListener('click', () => {
    // Through the kit element's own value setter rather than a synthesized click on its segment:
    // it keeps ownership of the thumb and the change event, and the specimen never manufactures a
    // second click, which the takeover pass counts (e2e/takeover.e2e.ts expects exactly one).
    picker.value = 'attended';
    ready();
  });

  attract();
}
