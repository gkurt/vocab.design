import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Offered = 'none' | 'pause' | 'both';

const SLIDE_MS = 1900;
const FIGURE_MS = 1300;

const SLIDES = [
  { tag: 'Chapter one', title: 'Reef habitats' },
  { tag: 'Chapter two', title: 'Tide pools' },
  { tag: 'Chapter three', title: 'Kelp forests' },
];

const VIEWERS = [1284, 1291, 1276, 1302, 1288];

const OFFERS: Record<Offered, string> = {
  none: 'Escape offered: none',
  pause: 'Escape offered: pause',
  both: 'Escape offered: pause, or hide it',
};

const CAPTION: Record<Offered, string> = {
  none: 'Both panels move for longer than five seconds and neither was asked for. That is the whole of what criterion 2.2.2 is about.',
  pause: 'One visible control that really stops everything. The criterion asks for an escape, not for a transport bar.',
  both: 'Hide is the third escape and the honest one for a figure that keeps refreshing: the reader deletes the movement rather than freezing it.',
};

/**
 * Pause, stop, hide specimen: an auto-advancing carousel beside an auto-updating figure, with a
 * segmented control naming what escape the reader is offered. No control at all, then a pause
 * control, then pause with a hide beside it, and a strip that names the escape each state
 * actually provides.
 *
 * The subject is the pause control, the narrowest element the term names: the criterion is about
 * the control, not about the content that moves. The picker, the carousel, the live figure, the
 * hide control, the escape strip and the caption are scenery (SPEC §5). In the state that offers
 * nothing the control is absent from the scene rather than from the DOM, and identify summons the
 * script forward until it is on stage again (SPEC §6); the mount state offers it.
 *
 * The pause control toggles, which is the one case SPEC §8 allows: the toggling is the term. It
 * is never left ambiguous either way, because choosing what the reader is offered resets the
 * scene to playing and unhidden, so every press of Pause lands on content that was moving.
 *
 * Both loops run on the clock `mount()` is handed, so identify's pose stops them where they
 * stand and a remount takes them away (SPEC §6). The moving panels and the hidden placeholder
 * share one reserved height and the control row keeps its own, so no state moves anything else
 * (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const dots = SLIDES.map(
    (_, i) => `<span data-part="dot-${i + 1}" style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-line)"></span>`,
  ).join('');

  const slides = SLIDES.map(
    ({ tag, title }) => `
      <div class="sp-stack" style="flex: 0 0 100%; gap: 5px; padding: 9px 11px">
        <span class="sp-label" style="font-size: 9.5px">${tag}</span>
        <span class="sp-heading" style="font-size: 13px">${title}</span>
        <div class="sp-line" style="width: 82%"></div>
        <div class="sp-line" style="width: 58%"></div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-grow"></span>
          <sp-segmented class="sp-segmented" data-part="offered" data-axis="Controls offered" data-value="pause">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">No control</button>
            <button class="sp-segment" type="button" data-part="seg-pause" value="pause"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Pause</button>
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Pause and hide</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scene" data-motion="running"
             style="margin-top: 8px; padding: 10px; display: flex; flex-direction: column; gap: 9px">
          <div class="sp-row" data-part="moving" style="height: 96px; gap: 10px; align-items: stretch">
            <div class="sp-surface sp-context" data-part="reel"
                 style="flex: 1 1 auto; min-width: 0; overflow: hidden; display: flex; flex-direction: column;
                        background: var(--sp-sunken)">
              <div class="sp-row" data-part="track" data-index="0"
                   style="flex: 1 1 auto; gap: 0; align-items: stretch; translate: 0 0;
                          transition: translate 0.34s var(--sp-ease)">${slides}</div>
              <div class="sp-row" data-part="dots" style="justify-content: center; gap: 5px; padding-bottom: 7px">${dots}</div>
            </div>

            <div class="sp-surface sp-context" data-part="figure"
                 style="flex: 0 0 132px; padding: 9px 11px; display: flex; flex-direction: column; gap: 3px;
                        background: var(--sp-sunken)">
              <span class="sp-label" style="font-size: 9.5px">Watching now</span>
              <span class="sp-text--ink" data-part="count"
                    style="font-size: 24px; font-weight: 600; line-height: 1.15">${VIEWERS[0]}</span>
              <span class="sp-label" data-part="refresh" style="font-size: 9.5px">Refreshing every second</span>
            </div>
          </div>

          <div class="sp-surface sp-context" data-part="blanked" hidden
               style="height: 96px; display: flex; align-items: center; justify-content: center;
                      background: var(--sp-sunken)">
            <span class="sp-text" style="font-size: 11.5px">Hidden. Nothing in this region moves.</span>
          </div>

          <div class="sp-row" style="height: 28px; gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="pause" data-subject
                    style="width: 76px; justify-content: center; font-size: 11.5px">Pause</button>
            <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button" data-part="hide" hidden
                    style="width: 68px; justify-content: center; font-size: 11.5px; color: var(--sp-muted)">Hide</button>
            <span class="sp-grow"></span>
            <span class="sp-label sp-context" data-part="offers" data-offered="pause"
                  style="flex: 0 0 auto; font-size: 10.5px">${OFFERS.pause}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-offered="pause"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.pause}</p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const track = part(root, 'track');
  const moving = part(root, 'moving');
  const blanked = part(root, 'blanked');
  const count = part(root, 'count');
  const refresh = part(root, 'refresh');
  const pause = part(root, 'pause');
  const hide = part(root, 'hide');
  const offers = part(root, 'offers');
  const caption = part(root, 'caption');
  const markers = SLIDES.map((_, i) => part(root, `dot-${i + 1}`));

  let slide = 0;
  let reading = 0;
  let paused = false;
  let hidden = false;
  let slideTimer: number | undefined;
  let figureTimer: number | undefined;

  const paintSlide = () => {
    track.dataset.index = String(slide);
    track.style.translate = `${slide * -100}% 0`;
    markers.forEach((marker, i) => {
      flag(marker, 'data-current', i === slide);
      marker.style.background = i === slide ? 'var(--sp-accent)' : 'var(--sp-line)';
    });
  };

  const turn = () => {
    slide = (slide + 1) % SLIDES.length;
    paintSlide();
    slideTimer = clock.setTimeout(turn, SLIDE_MS);
  };

  const refreshCount = () => {
    reading = (reading + 1) % VIEWERS.length;
    count.textContent = String(VIEWERS[reading]);
    figureTimer = clock.setTimeout(refreshCount, FIGURE_MS);
  };

  const stop = () => {
    clock.clearTimeout(slideTimer);
    clock.clearTimeout(figureTimer);
    slideTimer = undefined;
    figureTimer = undefined;
  };

  const run = () => {
    stop();
    slideTimer = clock.setTimeout(turn, SLIDE_MS);
    figureTimer = clock.setTimeout(refreshCount, FIGURE_MS);
  };

  const paint = () => {
    const motion = hidden ? 'hidden' : paused ? 'paused' : 'running';
    scene.dataset.motion = motion;
    flag(moving, 'hidden', hidden);
    flag(blanked, 'hidden', !hidden);
    pause.textContent = paused ? 'Play' : 'Pause';
    refresh.textContent = paused ? 'Held at this reading' : 'Refreshing every second';
    if (hidden || paused) stop();
    else run();
  };

  // Choosing what the reader is offered resets the scene to moving and unhidden, so a pass that
  // was joined halfway always presses Pause on content that was actually going (SPEC §8).
  const apply = (next: Offered) => {
    paused = false;
    hidden = false;
    flag(pause, 'hidden', next === 'none');
    flag(hide, 'hidden', next !== 'both');
    offers.dataset.offered = next;
    offers.textContent = OFFERS[next];
    caption.dataset.offered = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  paintSlide();
  apply('pause');

  // The one toggle SPEC §8 allows: stopping and starting again is the term itself.
  pause.addEventListener('click', () => {
    paused = !paused;
    paint();
  });

  hide.addEventListener('click', () => {
    hidden = true;
    paint();
  });

  part(root, 'offered').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Offered);
  });
}
