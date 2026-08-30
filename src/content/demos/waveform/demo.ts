import { part } from '#src/kit/parts.ts';

/**
 * The recording's own shape, written out by hand: a summary of the sample data is what a
 * waveform is, and a specimen that scattered its bars at mount would draw a different
 * recording on every run (SPEC §8, and the identify snapshot is committed text).
 */
const AMPLITUDES = [
  0.18, 0.32, 0.55, 0.71, 0.62, 0.44, 0.68, 0.86, 0.74, 0.52, 0.35, 0.22, 0.14, 0.09, 0.12, 0.28, 0.47, 0.66, 0.81, 0.93, 0.77, 0.58, 0.41,
  0.29, 0.19, 0.11, 0.08, 0.15, 0.34, 0.51, 0.69, 0.84, 0.72, 0.55, 0.38, 0.26, 0.44, 0.61, 0.49, 0.33, 0.21, 0.15, 0.1, 0.07,
];

const BARS = AMPLITUDES.length;
/** Seconds of audio, so a bar is one slice of it. */
const DURATION = 64;
const START = 12;
const TRACK = 88;

const secondsAt = (index: number) => Math.round((index * DURATION) / BARS);

const timecode = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const bar = (amplitude: number, index: number) => `
  <button
    type="button"
    data-part="bar-${index}"
    data-index="${index}"
    data-played="${index < START}"
    aria-label="Seek to ${timecode(secondsAt(index))}"
    style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 0; border: 0;
           background: transparent; cursor: pointer"
  ><span style="width: 100%; height: ${Math.round(6 + amplitude * (TRACK - 16))}px; border-radius: 2px"></span></button>`;

/**
 * Waveform specimen: a voice note drawn as amplitude bars around a centre line, with the
 * played portion filled, the rest left quiet, and a playhead standing where the listener
 * is. Pressing any bar seeks to it, and the elapsed time follows.
 *
 * The subject is the bar field itself, the drawing of the audio. The playhead, the centre
 * line, the timecodes and the window are the player around it, since the term names the
 * picture of the sound rather than the transport that reads it. The picture is honest at
 * every position, so no `data-pose` condition is needed.
 *
 * Every bar is a full-height button over a short mark, so a narrow bar is still something a
 * reader can hit, and a bar is an absolute destination rather than a nudge (SPEC §8). The
 * heights come from `AMPLITUDES` and nothing is measured or randomized at mount, so the
 * same recording is drawn on every run, and only the fills and the playhead ever change,
 * which leaves the layout still (SPEC §5).
 *
 * A line under the player once read "Silence and loudness are visible, so a listener can
 * aim at the part they want.", which is the article's point made inside a voice-note
 * player that would never print it. It is gone; the body still centres what is left.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Voice note from Priya</span>
          <span class="sp-label" style="font-size: 12px">${timecode(DURATION)}</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px">
          <div class="sp-surface" style="padding: 12px">
            <div data-part="track" style="position: relative; height: ${TRACK}px">
              <div
                class="sp-context"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: ${TRACK / 2 - 1}px; height: 2px; background: var(--sp-line)"
              ></div>
              <div
                data-part="wave"
                data-subject
                data-at="${START}"
                style="position: relative; display: grid; grid-template-columns: repeat(${BARS}, 1fr); align-items: center; gap: 3px; height: 100%"
              >${AMPLITUDES.map(bar).join('')}</div>
              <div
                class="sp-context"
                data-part="playhead"
                aria-hidden="true"
                style="position: absolute; top: -3px; bottom: -3px; left: 0; width: 3px; border-radius: 2px; background: var(--sp-ink); pointer-events: none"
              ></div>
            </div>

            <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
              <span
                class="sp-label"
                data-part="elapsed"
                data-time="${timecode(secondsAt(START))}"
                role="status"
                style="font-variant-numeric: tabular-nums"
              >${timecode(secondsAt(START))}</span>
              <span class="sp-label" style="font-variant-numeric: tabular-nums">${timecode(DURATION)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const wave = part(root, 'wave');
  const playhead = part(root, 'playhead');
  const elapsed = part(root, 'elapsed');
  const bars = AMPLITUDES.map((_, i) => part(root, `bar-${i}`));

  let at = START;

  const draw = () => {
    bars.forEach((button, i) => {
      const played = i < at;
      button.dataset.played = String(played);
      const mark = button.firstElementChild;
      if (!(mark instanceof HTMLElement)) return;
      mark.style.background = played ? 'var(--sp-accent)' : 'var(--sp-muted)';
      mark.style.opacity = played ? '1' : '0.35';
    });
    wave.dataset.at = String(at);
    playhead.style.left = `${(at * 100) / BARS}%`;
    elapsed.textContent = timecode(secondsAt(at));
    elapsed.dataset.time = timecode(secondsAt(at));
  };

  wave.addEventListener('click', (event) => {
    const pressed = (event.target as Element | null)?.closest('[data-index]');
    if (!(pressed instanceof HTMLElement)) return;
    at = Number(pressed.dataset.index);
    draw();
  });

  draw();
}
