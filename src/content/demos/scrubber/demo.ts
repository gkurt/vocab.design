import { part } from '#src/kit/parts.ts';

const DURATION = 200;
const START = 32;
/** How much has been downloaded ahead of the playhead, the band a slider never has. */
const BUFFERED = 82;
const STEP = 5;

const timecode = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds) % 60).padStart(2, '0')}`;

const percent = (seconds: number) => (seconds / DURATION) * 100;

const clamp = (seconds: number) => Math.min(DURATION, Math.max(0, Math.round(seconds)));

/** Where in the recording the playhead is standing, coarse enough for a script to read. */
const zoneOf = (seconds: number) => (percent(seconds) < 33 ? 'start' : percent(seconds) < 66 ? 'mid' : 'end');

const marker = (at: number, index: number) =>
  `<span data-part="chapter-${index}" aria-hidden="true" style="position: absolute; left: ${at}%; top: 50%; width: 2px; height: 10px; translate: -50% -50%; border-radius: 1px; background: var(--sp-surface)"></span>`;

/**
 * Scrubber specimen: the seek control of a video, with the elapsed fill, the buffered
 * band ahead of it, chapter marks, and a playhead that can be dragged to any position.
 * The subject is that track and its playhead, since the poster, the timecodes, and the
 * title are the player the control sits in rather than the control.
 *
 * Dragging shows the preview bubble a reader aims with, which is drawn out of flow over
 * the poster, and the timecodes are tabular and fixed width, so a playhead crossing the
 * minute mark moves nothing but itself (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lecture 4 recording</span>
          <span class="sp-text">${timecode(DURATION)}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-context"
            data-part="poster"
            style="display: flex; align-items: center; justify-content: center; flex: 1 1 auto; border-radius: var(--sp-radius); background: linear-gradient(140deg, #3d4450, #1f232b)"
          >
            <span data-part="frame" style="color: #e8eaef; font-size: 12px; font-variant-numeric: tabular-nums">Frame at ${timecode(START)}</span>
          </div>
          <div class="sp-stack" style="position: relative; gap: 6px">
            <div
              class="sp-slider"
              data-part="scrubber"
              data-subject
              data-at="${zoneOf(START)}"
              style="--sp-to: ${percent(START)}%; --sp-at: ${percent(START)}%; touch-action: none"
            >
              <div class="sp-slider-track" data-part="track">
                <div
                  data-part="buffered"
                  style="position: absolute; top: 0; bottom: 0; left: 0; width: ${BUFFERED}%; border-radius: inherit; background: var(--sp-muted); opacity: 0.42"
                ></div>
                <div class="sp-slider-fill"></div>
                ${marker(30, 1)}
                ${marker(74, 2)}
                <div
                  class="sp-slider-thumb"
                  data-part="playhead"
                  role="slider"
                  tabindex="0"
                  aria-label="Seek"
                  aria-valuemin="0"
                  aria-valuemax="${DURATION}"
                  aria-valuenow="${START}"
                  aria-valuetext="${timecode(START)}"
                ></div>
              </div>
            </div>
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-text" data-part="readout" style="width: 44px; font-variant-numeric: tabular-nums">${timecode(START)}</span>
              <span class="sp-text" style="width: 44px; text-align: right; font-variant-numeric: tabular-nums">${timecode(DURATION)}</span>
            </div>
            <div
              class="sp-surface"
              data-part="preview"
              hidden
              style="position: absolute; bottom: 30px; left: ${percent(START)}%; translate: -50% 0; padding: 3px 7px; font-size: 11px; box-shadow: var(--sp-shadow); font-variant-numeric: tabular-nums"
            >${timecode(START)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scrubber = part(root, 'scrubber');
  const track = part(root, 'track');
  const playhead = part(root, 'playhead');
  const readout = part(root, 'readout');
  const frame = part(root, 'frame');
  const preview = part(root, 'preview');

  let at = START;
  /** The gap between the pointer and the playhead it grabbed, so a drag never jumps. */
  let grabbed: number | undefined;

  const render = () => {
    const pos = `${percent(at)}%`;
    scrubber.style.setProperty('--sp-to', pos);
    scrubber.style.setProperty('--sp-at', pos);
    scrubber.dataset.at = zoneOf(at);
    playhead.setAttribute('aria-valuenow', String(at));
    playhead.setAttribute('aria-valuetext', timecode(at));
    readout.textContent = timecode(at);
    // The frame under the playhead: what a position in a recording actually buys.
    frame.textContent = `Frame at ${timecode(at)}`;
    preview.style.left = pos;
    preview.textContent = timecode(at);
  };

  const timeAt = (clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return at;
    return clamp(((clientX - rect.left) / rect.width) * DURATION);
  };

  const positionOf = (seconds: number) => {
    const rect = track.getBoundingClientRect();
    return rect.left + (percent(seconds) / 100) * rect.width;
  };

  scrubber.addEventListener('pointerdown', (event) => {
    if (event.target === playhead) grabbed = event.clientX - positionOf(at);
    else {
      // A press on the track is a seek to the place pressed: the track is the duration,
      // so the point pressed is the moment meant.
      grabbed = 0;
      at = timeAt(event.clientX);
      render();
    }
    preview.hidden = false;
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const next = timeAt(event.clientX - grabbed);
    if (next === at) return;
    at = next;
    render();
  });

  const release = () => {
    if (grabbed === undefined) return;
    grabbed = undefined;
    // The preview is an aiming aid for a drag in flight, so it leaves with the drag.
    preview.hidden = true;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  playhead.addEventListener('keydown', (event) => {
    const deltas: Record<string, number> = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP };
    const delta = deltas[event.key];
    let next = at;
    if (delta !== undefined) next = clamp(at + delta);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = DURATION;
    else return;
    event.preventDefault();
    if (next === at) return;
    at = next;
    render();
  });
}
