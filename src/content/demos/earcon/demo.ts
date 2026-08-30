import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The pitch grid: five rows, six time slots, drawn at these sizes. */
const PLOT = { w: 216, h: 90, cols: 6, rows: 5 };
const CELL = { w: PLOT.w / PLOT.cols, h: PLOT.h / PLOT.rows };
/** One time slot, in seconds, and the pitch each row stands for. */
const BEAT = 0.13;
const SCALE = [392, 440, 494, 587, 659];
/** How often the playhead is repainted while a figure is read out. */
const TICK_MS = 40;

interface Note {
  /** Time slot, pitch row, and length in slots. */
  t: number;
  p: number;
  d: number;
}

/**
 * Three earcons, written as motives (Blattner, Sumikawa and Greenberg's word for the
 * short pitch figure an earcon is made of). "Done" is deliberately a relative of
 * "sent": the same rising shape with a tail, which is what a family means.
 */
const EARCONS: Record<string, { label: string; shape: string; blurb: string; notes: Note[] }> = {
  sent: {
    label: 'Message sent',
    shape: 'rising',
    blurb: 'Rising, three notes, 392 to 659 Hz',
    notes: [
      { t: 0, p: 1, d: 1 },
      { t: 1, p: 2, d: 1 },
      { t: 2, p: 4, d: 1 },
    ],
  },
  failed: {
    label: 'Upload failed',
    shape: 'falling',
    blurb: 'Falling, two notes, the second held',
    notes: [
      { t: 0, p: 3, d: 1 },
      { t: 1, p: 0, d: 2 },
    ],
  },
  done: {
    label: 'Task done',
    shape: 'rising-tail',
    blurb: 'Rising with a tail, four notes',
    notes: [
      { t: 0, p: 1, d: 1 },
      { t: 1, p: 2, d: 1 },
      { t: 2, p: 4, d: 1 },
      { t: 3, p: 4, d: 2 },
    ],
  },
};

const KEYS = Object.keys(EARCONS);

const lines = Array.from(
  { length: PLOT.rows },
  (_, i) =>
    `<span style="position: absolute; left: 0; top: ${Math.round(i * CELL.h + CELL.h / 2)}px; width: ${PLOT.w}px; height: 1px; background: var(--sp-line)"></span>`,
).join('');

const buttons = KEYS.map(
  (key) => `
    <button
      class="sp-button sp-button--ghost sp-button--sm"
      type="button"
      data-part="event-${key}"
      style="width: 100%; white-space: nowrap; flex: 0 0 auto"
    >${EARCONS[key]?.label}</button>`,
).join('');

/** Where a note sits in the plot, in px. */
const boxOf = (n: Note) => ({
  x: n.t * CELL.w + 2,
  y: (PLOT.rows - 1 - n.p) * CELL.h + CELL.h / 2 - 5,
  w: n.d * CELL.w - 4,
  h: 10,
});

/**
 * Earcon specimen: three events, each with an abstract pitch figure written on a small
 * grid. Choosing an event draws its figure and reads a playhead across it, so the sound
 * is portrayed as the thing it is made of, a short motive of pitches in time.
 *
 * The figure is the subject. The term names the sound, a sound has no element, so it is
 * given one (SPEC §5): an overlay sized to the notes' own extent, not the grid it is
 * plotted on and not the button that fired it. Every event mounts with a figure already
 * drawn, so the pin has something honest to ring at any moment of the pass.
 *
 * AUDIO: playback happens only behind `event.isTrusted`, which is the whole design.
 * Attract mode and CI are therefore silent, since a specimen that makes noise at a
 * reader who is only browsing is hostile, while a reader who clicks an event for
 * themselves genuinely hears the earcon through WebAudio. Nothing here depends on
 * hearing it: the drawn figure carries the whole demonstration, which is why there is
 * no speaker glyph with animated waves pretending a sound is playing (SPEC §8).
 *
 * A line under the frame used to read "Drawn, never played: this demonstration is silent.
 * Click an event yourself to hear the figure above." That was the site explaining its own
 * demonstration inside the exhibit, and the readout no longer names the event either, since
 * the buttons do: it describes the figure ("Rising, three notes, 392 to 659 Hz"), which is
 * what a sound set would print beside a preview.
 *
 * Visual timing comes from the DemoClock so a pose can freeze the playhead; the
 * AudioContext keeps its own schedule, which is the only clock a sound can have.
 * The figure is absolutely positioned inside a fixed plot and every readout holds its
 * width, so changing event moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sound set</span>
          <span class="sp-text" data-part="readout" data-shape="rising" style="flex: 0 0 auto; width: 290px; text-align: right; white-space: nowrap">${EARCONS.sent?.blurb}</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; align-items: stretch">
          <div class="sp-stack sp-context" style="width: 150px; gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 10px">Event</span>
            ${buttons}
          </div>
          <div class="sp-surface" style="flex: 1 1 auto; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px">
            <div style="position: relative; width: ${PLOT.w}px; height: ${PLOT.h}px; align-self: center">
              <span class="sp-context" style="position: absolute; inset: 0">${lines}</span>
              <span data-part="figure" data-subject data-event="sent" style="position: absolute; left: 0; top: 0; width: 10px; height: 10px"></span>
              <span data-part="playhead" style="position: absolute; left: 0; top: 0; width: 2px; height: ${PLOT.h}px; background: var(--sp-ink); opacity: 0"></span>
            </div>
            <span class="sp-label sp-context" style="font-size: 10px; text-align: center">pitch, over time</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const figure = part(root, 'figure');
  const playhead = part(root, 'playhead');
  const readout = part(root, 'readout');
  const buttonEls = KEYS.map((key) => part(root, `event-${key}`));

  let sweep: number | undefined;
  let audio: AudioContext | undefined;

  const draw = (key: string) => {
    const earcon = EARCONS[key];
    if (!earcon) return;
    const boxes = earcon.notes.map(boxOf);
    const left = Math.min(...boxes.map((b) => b.x));
    const top = Math.min(...boxes.map((b) => b.y));
    const right = Math.max(...boxes.map((b) => b.x + b.w));
    const bottom = Math.max(...boxes.map((b) => b.y + b.h));
    // The subject traces the figure's own extent, so it is placed and sized from the
    // notes rather than given the plot's box by proxy (SPEC §5).
    figure.dataset.event = key;
    figure.style.left = `${left}px`;
    figure.style.top = `${top}px`;
    figure.style.width = `${right - left}px`;
    figure.style.height = `${bottom - top}px`;
    figure.innerHTML = boxes
      .map(
        (b, i) => `
          <span
            data-part="note-${i}"
            style="position: absolute; left: ${b.x - left}px; top: ${b.y - top}px; width: ${b.w}px; height: ${b.h}px;
                   border-radius: 3px; background: var(--sp-accent)"
          ></span>`,
      )
      .join('');
    readout.dataset.shape = earcon.shape;
    readout.textContent = earcon.blurb;
    for (const [i, el] of buttonEls.entries()) flag(el, 'data-selected', KEYS[i] === key);
  };

  /** The playhead reads the figure out in time, which is all a sound is on paper. */
  const read = (key: string) => {
    const earcon = EARCONS[key];
    if (!earcon) return;
    const slots = Math.max(...earcon.notes.map((n) => n.t + n.d));
    const total = slots * BEAT * 1000;
    let elapsed = 0;
    clock.clearTimeout(sweep);
    playhead.style.opacity = '0.55';
    const step = () => {
      elapsed += TICK_MS;
      playhead.style.left = `${Math.min(elapsed / total, 1) * slots * CELL.w}px`;
      if (elapsed < total) {
        sweep = clock.setTimeout(step, TICK_MS);
        return;
      }
      playhead.style.opacity = '0';
      playhead.style.left = '0px';
    };
    playhead.style.left = '0px';
    sweep = clock.setTimeout(step, TICK_MS);
  };

  /**
   * The sound itself, and the only place it is ever made. Short sine tones with a
   * plucked envelope: an earcon is synthesized on purpose, so nothing here is a
   * recording of anything.
   */
  const play = (key: string) => {
    const earcon = EARCONS[key];
    if (!earcon) return;
    audio ??= new AudioContext();
    if (audio.state === 'suspended') void audio.resume();
    const start = audio.currentTime + 0.03;
    for (const note of earcon.notes) {
      const at = start + note.t * BEAT;
      const length = note.d * BEAT * 0.9;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.value = SCALE[note.p] ?? 440;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.12, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0005, at + length);
      osc.connect(gain).connect(audio.destination);
      osc.start(at);
      osc.stop(at + length + 0.03);
    }
  };

  for (const [i, el] of buttonEls.entries()) {
    const key = KEYS[i];
    if (!key) continue;
    // Each button reaches one state rather than flipping anything, so a pass resumed
    // anywhere still lands on the event it named (SPEC §8).
    el.addEventListener('click', (event) => {
      draw(key);
      read(key);
      // Silence unless a person did it: the player's synthesized clicks make no sound,
      // so attract mode and CI never play a note.
      if (event.isTrusted) play(key);
    });
  }

  draw('sent');
}
