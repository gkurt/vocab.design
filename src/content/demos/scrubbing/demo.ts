import { part } from '#src/kit/parts.ts';

/** Length of the clip, in seconds, and where the playhead is standing at mount. */
const DURATION = 96;
const START = 8;
const STEP = 2;

/** The shots the clip is made of: what a frame preview has to show while the hand moves. */
const SHOTS = [
  'linear-gradient(150deg, #24303d, #4a7290)',
  'linear-gradient(150deg, #4a7290, #8fb8c9)',
  'linear-gradient(150deg, #d8c39a, #9c7c53)',
  'linear-gradient(150deg, #b6603f, #e8b17a)',
  'linear-gradient(150deg, #2f4a3a, #7fa06a)',
  'linear-gradient(150deg, #7fa06a, #d9d7a6)',
  'linear-gradient(150deg, #5b4a7a, #9d84c4)',
  'linear-gradient(150deg, #1e222c, #57606f)',
] as const;

const timecode = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds) % 60).padStart(2, '0')}`;

const percent = (seconds: number) => (seconds / DURATION) * 100;

const clamp = (seconds: number) => Math.min(DURATION, Math.max(0, Math.round(seconds)));

const shotOf = (seconds: number) => SHOTS[Math.min(SHOTS.length - 1, Math.floor((seconds / DURATION) * SHOTS.length))] ?? SHOTS[0];

/** Where in the clip the playhead is standing, coarse enough for a script to read. */
const zoneOf = (seconds: number) => (percent(seconds) < 33 ? 'start' : percent(seconds) < 70 ? 'mid' : 'end');

const cut = (at: number, name: string) =>
  `<span data-part="${name}" aria-hidden="true" style="position: absolute; left: ${at}%; bottom: -1px; width: 7px; height: 7px; translate: -50% 0; rotate: 45deg; border-radius: 1px; background: var(--sp-surface); border: 1px solid var(--sp-line); pointer-events: none"></span>`;

/**
 * Scrubbing specimen: a cutting-room timeline where the playhead is dragged through the
 * clip and every position on the way is rendered. The subject is the timeline the hand
 * moves over (the filmstrip, its cut marks, and the playhead), since that is the surface
 * the gesture is performed on; the preview frame and the readouts are the editor around
 * it.
 *
 * The specimen's claim is what happens between the ends of the drag, so the preview is
 * repainted on every `pointermove` and the counter says how many times, which is the one
 * thing a jump cannot produce. A press on the track without a move is that jump, and it
 * is labelled as a seek, so the two words are told apart by what the demo actually does.
 *
 * Two lines of the site's own voice used to stand in the editor: "A press jumps. A drag
 * shows the way." beside the preview, and "Drag the playhead" in the status line at mount.
 * The first is the article's sentence and went; the second is now the clip's length and
 * frame rate, which is what a cutting room would print there before anything has happened.
 *
 * Nothing is re-parented mid-gesture and the readouts hold their widths at every
 * position, so a playhead crossing the minute mark moves only itself (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cells = SHOTS.map((wash) => `<span style="flex: 1 1 0; background: ${wash}"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reel 3 rough cut</span>
          <span class="sp-text" data-part="readout" style="width: 190px; text-align: right">${timecode(DURATION)}, 24 fps</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row sp-context" style="gap: 12px">
            <div
              data-part="preview"
              style="flex: 0 0 auto; width: 152px; height: 86px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: ${shotOf(START)}"
            ></div>
            <div class="sp-stack" style="gap: 4px">
              <span class="sp-heading" data-part="timecode" style="font-variant-numeric: tabular-nums">${timecode(START)}</span>
              <span class="sp-label" data-part="frames" style="width: 150px">0 frames previewed</span>
            </div>
          </div>
          <div
            data-part="timeline"
            data-subject
            data-at="${zoneOf(START)}"
            data-mode="idle"
            style="position: relative; width: 400px; height: 46px; touch-action: none; cursor: ew-resize"
          >
            <div
              data-part="strip"
              style="position: absolute; inset: 0; display: flex; overflow: hidden; border-radius: 6px; border: 1px solid var(--sp-line)"
            >${cells}</div>
            ${cut(12, 'cut-a')}
            ${cut(52, 'cut-b')}
            ${cut(92, 'cut-c')}
            <span
              data-part="playhead"
              role="slider"
              tabindex="0"
              aria-label="Playhead"
              aria-valuemin="0"
              aria-valuemax="${DURATION}"
              aria-valuenow="${START}"
              aria-valuetext="${timecode(START)}"
              style="position: absolute; top: -6px; bottom: -6px; left: ${percent(START)}%; width: 2px; translate: -1px 0; background: var(--sp-ink); cursor: grab"
            >
              <span
                aria-hidden="true"
                style="position: absolute; top: -4px; left: 1px; width: 12px; height: 12px; translate: -50% 0; rotate: 45deg; border-radius: 2px; background: var(--sp-ink)"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const timeline = part(root, 'timeline');
  const strip = part(root, 'strip');
  const playhead = part(root, 'playhead');
  const preview = part(root, 'preview');
  const stamp = part(root, 'timecode');
  const frames = part(root, 'frames');
  const readout = part(root, 'readout');

  let at = START;
  /** The gap between the pointer and the playhead it grabbed, so a drag never jumps. */
  let grabbed: number | undefined;
  let previews = 0;

  const render = () => {
    playhead.style.left = `${percent(at)}%`;
    playhead.setAttribute('aria-valuenow', String(at));
    playhead.setAttribute('aria-valuetext', timecode(at));
    timeline.dataset.at = zoneOf(at);
    stamp.textContent = timecode(at);
    preview.style.background = shotOf(at);
  };

  const say = (mode: string, text: string) => {
    timeline.dataset.mode = mode;
    readout.textContent = text;
  };

  const timeAt = (clientX: number) => {
    const rect = strip.getBoundingClientRect();
    if (rect.width === 0) return at;
    return clamp(((clientX - rect.left) / rect.width) * DURATION);
  };

  const positionOf = (seconds: number) => {
    const rect = strip.getBoundingClientRect();
    return rect.left + (percent(seconds) / 100) * rect.width;
  };

  timeline.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) timeline.setPointerCapture(event.pointerId);
    previews = 0;
    frames.textContent = '0 frames previewed';
    if (event.target === playhead || playhead.contains(event.target as Node)) {
      grabbed = event.clientX - positionOf(at);
      say('grab', 'Holding the playhead');
      return;
    }
    // A press on the strip is a jump to the moment pressed: one position, nothing shown
    // on the way. This is the act the term is told apart from.
    grabbed = 0;
    at = timeAt(event.clientX);
    render();
    say('seek', `Seeked to ${timecode(at)}: one jump`);
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const next = timeAt(event.clientX - grabbed);
    if (next === at) return;
    at = next;
    previews += 1;
    // The count is the demonstration: a seek renders one frame, a scrub renders the way.
    frames.textContent = `${previews} frame${previews === 1 ? '' : 's'} previewed`;
    render();
    say('scrub', `Scrubbing: previewing at ${timecode(at)}`);
  });

  const release = () => {
    if (grabbed === undefined) return;
    grabbed = undefined;
    if (timeline.dataset.mode === 'grab') say('idle', `Held at ${timecode(at)}: nothing moved`);
    else if (timeline.dataset.mode === 'scrub') say('scrub', `Scrubbed to ${timecode(at)}`);
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
    say('scrub', `Stepped to ${timecode(at)}`);
  });
}
