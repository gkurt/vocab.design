import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TRACKS_W = 404;
/** The band the marker travels in, inset so its head is inside the tracks at both ends. */
const SCRUB_W = 388;
const RULER_H = 22;
const LANE_H = 40;
const LANE_GAP = 6;
const SPAN_H = RULER_H + LANE_GAP + LANE_H + 4 + LANE_H;
const DURATION_S = 8;
/** Playback: one step every 60 ms, the whole timeline in four seconds. */
const STEP_MS = 60;
const STEP_PCT = 1.5;

function timecode(pct: number): string {
  const seconds = (pct / 100) * DURATION_S;
  return `00:0${Math.floor(seconds)}.${Math.floor((seconds % 1) * 10)}`;
}

function band(pct: number): string {
  if (pct < 8) return 'start';
  return pct > 92 ? 'end' : 'mid';
}

/**
 * Playhead specimen: a two-lane editing timeline whose marker does both of its jobs. Pressing play
 * sends the playhead travelling across the tracks on the stage's clock, and dragging its head
 * scrubs it to a new position, which stops the travel the way a real editor does.
 *
 * The subject is the marker: the head and the stem it hangs from, one element, inset from the
 * tracks it crosses. Deliberately not the track (that term has its own specimen and its own
 * groove) and not the timeline: the word names the thing that moves. The ruler, the lanes, the
 * clips, the transport button and the timecode are scenery in the context register. The marker is
 * honestly a playhead at every position the script visits, so no `data-pose` condition is needed.
 *
 * Nothing about the marker transitions, because a playhead that eases toward its position reports
 * a guess instead of an instant. There is no travel on mount, so the scripted press names the only
 * run (SPEC §8), and a reader who has asked for less movement gets the end position instead of the
 * journey. The drag captures the pointer on a trusted pointerdown so a real reader's scrub survives
 * leaving the head, and it ends on pointerup and pointercancel, never pointerleave (SPEC §7).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const tick = (i: number) => {
    const major = i % 2 === 0;
    return `<span style="position: absolute; left: ${(i / 8) * 100}%; top: 0; width: 2px; height: ${major ? 9 : 5}px;
                        background: var(--sp-line); translate: -1px 0"></span>`;
  };

  const clip = (label: string, left: number, width: number, tone: string) => `
    <div
      style="position: absolute; left: ${left}%; width: ${width}%; top: 4px; bottom: 4px; padding: 4px 7px; border-radius: 5px;
             background: ${tone}; border: 1px solid var(--sp-line); overflow: hidden"
    >
      <span class="sp-label" style="font-size: 10px; white-space: nowrap">${label}</span>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Sequence 01</span>
          <span
            class="sp-label"
            data-part="timecode"
            style="flex: 0 0 116px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums"
          >00:00.0 / 00:08.0</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 440px; padding: 14px">
            <div data-part="tracks" style="position: relative; width: ${TRACKS_W}px; height: ${SPAN_H}px">
              <div class="sp-context" style="position: absolute; left: 8px; width: ${SCRUB_W}px; top: 0; height: ${SPAN_H}px">
                <div style="position: relative; height: ${RULER_H}px; border-bottom: 1px solid var(--sp-line)">
                  ${Array.from({ length: 9 }, (_, i) => tick(i)).join('')}
                </div>
                <div style="position: relative; height: ${LANE_H}px; margin-top: ${LANE_GAP}px; border-radius: 6px; background: var(--sp-sunken)">
                  ${clip('Interview.mov', 2, 54, 'var(--sp-accent-soft)')}
                  ${clip('B-roll.mov', 60, 36, 'var(--sp-accent-soft)')}
                </div>
                <div style="position: relative; height: ${LANE_H}px; margin-top: 4px; border-radius: 6px; background: var(--sp-sunken)">
                  ${clip('Score.wav', 6, 84, 'var(--sp-surface)')}
                </div>
              </div>

              <div
                data-part="playhead"
                data-subject
                data-at="start"
                style="position: absolute; left: 8px; top: 0; height: ${SPAN_H}px; width: 14px; translate: -7px 0; z-index: 2;
                       cursor: ew-resize; touch-action: none"
              >
                <span style="position: absolute; left: 0; top: 0; width: 14px; height: 10px; border-radius: 3px; background: var(--sp-accent)"></span>
                <span style="position: absolute; left: 6px; top: 8px; bottom: 0; width: 2px; background: var(--sp-accent)"></span>
              </div>

              <span data-part="aim-late" aria-hidden="true" style="position: absolute; left: ${8 + SCRUB_W * 0.72}px; top: 0; width: 4px; height: ${RULER_H}px"></span>
              <span data-part="aim-early" aria-hidden="true" style="position: absolute; left: ${8 + SCRUB_W * 0.28}px; top: 0; width: 4px; height: ${RULER_H}px"></span>
            </div>

            <div class="sp-row sp-context" style="margin-top: 12px">
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="play"
                style="min-width: 62px"
              >Play</button>
              <span class="sp-label sp-grow" style="font-size: 11px">Playback moves it. Dragging its head moves playback.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const playhead = part(root, 'playhead');
  const timecodeEl = part(root, 'timecode');
  const play = part(root, 'play');
  let pct = 0;
  let timer: number | undefined;

  const render = () => {
    playhead.style.left = `${8 + (pct / 100) * SCRUB_W}px`;
    playhead.dataset.at = band(pct);
    timecodeEl.textContent = `${timecode(pct)} / 00:08.0`;
  };

  const stop = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    flag(play, 'data-playing', false);
  };

  const advance = () => {
    pct = Math.min(100, pct + STEP_PCT);
    render();
    if (pct < 100) timer = clock.setTimeout(advance, STEP_MS);
    else stop();
  };

  play.addEventListener('click', () => {
    if (timer !== undefined) return;
    if (pct >= 100) pct = 0;
    flag(play, 'data-playing', true);
    // A reader who asked for less movement gets the position, not the journey (SPEC §6).
    if (prefersReducedMotion(root)) {
      pct = 100;
      render();
      stop();
      return;
    }
    timer = clock.setTimeout(advance, STEP_MS);
  });

  /** The band's box, taken when the press lands: scrubbing is the marker following the pointer. */
  let scrub: DOMRect | undefined;
  playhead.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) playhead.setPointerCapture(event.pointerId);
    scrub = part(root, 'tracks').getBoundingClientRect();
    // Scrubbing takes over from playback rather than fighting it.
    stop();
  });
  playhead.addEventListener('pointermove', (event) => {
    if (!scrub) return;
    pct = Math.min(100, Math.max(0, ((event.clientX - scrub.left - 8) / SCRUB_W) * 100));
    render();
  });
  const release = () => {
    scrub = undefined;
  };
  playhead.addEventListener('pointerup', release);
  playhead.addEventListener('pointercancel', release);
}
