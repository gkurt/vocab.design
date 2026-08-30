import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The drawn sound: how many slices it is cut into, and the box they are drawn in. */
const BAR = { w: 4, gap: 3, count: 56 };
const PANEL = { w: BAR.count * (BAR.w + BAR.gap) - BAR.gap, h: 56 };
const MAX_H = 48;
/** How long an object's physical reaction lasts before it settles back. */
const REACT_MS = 260;

/** Deterministic noise, so the same sound is drawn the same way on every mount. */
const noise = (seed: number, i: number) => {
  const x = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Sound {
  /** The readout, and the shape of its amplitude over time. */
  shape: string;
  blurb: string;
  seconds: string;
  seed: number;
  /** Amplitude at 0..1 through the sound, and how much slice-to-slice grit rides on it. */
  envelope: (t: number) => number;
  grit: number;
}

const SOUNDS: Record<string, Sound> = {
  crumple: {
    shape: 'burst',
    blurb: 'Paper crumpling',
    seconds: '0.42 s',
    seed: 3,
    envelope: (t) => (t < 0.05 ? t / 0.05 : Math.exp(-3.4 * (t - 0.05))),
    grit: 0.7,
  },
  whoosh: {
    shape: 'swell',
    blurb: 'Envelope leaving',
    seconds: '0.55 s',
    seed: 11,
    envelope: (t) => Math.sin(Math.PI * t) ** 1.5,
    grit: 0.16,
  },
};

/** The paper, drawn as a sheet with a folded corner. Scenery, never the subject. */
const PAPER = `
  <button
    type="button"
    data-part="obj-paper"
    style="position: relative; width: 88px; height: 76px; padding: 0; border: 1px solid var(--sp-line); border-radius: 4px;
           background: var(--sp-surface); cursor: pointer; transition: transform 130ms var(--sp-ease)"
  >
    <span style="position: absolute; right: 0; top: 0; border-top: 16px solid var(--sp-sunken); border-left: 16px solid transparent"></span>
    <span style="position: absolute; left: 10px; top: 26px; width: 52px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
    <span style="position: absolute; left: 10px; top: 38px; width: 64px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
    <span style="position: absolute; left: 10px; top: 50px; width: 40px; height: 4px; border-radius: 2px; background: var(--sp-line)"></span>
  </button>`;

/** The envelope, drawn as a body with its flap folded down. Scenery too. */
const ENVELOPE = `
  <button
    type="button"
    data-part="obj-envelope"
    style="position: relative; width: 104px; height: 72px; padding: 0; border: 1px solid var(--sp-line); border-radius: 4px;
           background: var(--sp-surface); overflow: hidden; cursor: pointer; transition: transform 130ms var(--sp-ease)"
  >
    <span style="position: absolute; left: 0; top: 0; border-top: 34px solid var(--sp-sunken); border-left: 51px solid transparent; border-right: 51px solid transparent"></span>
  </button>`;

/**
 * Auditory icon specimen: two everyday things that make their own noise. Pressing the
 * paper crumples it and draws the crumple; pressing the envelope sends it and draws the
 * whoosh. The two drawings are visibly different sounds, one a rattling burst and one a
 * smooth swell, which is the point: the sound is recognised rather than learned.
 *
 * The subject is the drawn sound, an amplitude envelope sized to its own extent, and
 * deliberately not the object that made it: the paper and the envelope are the scenery a
 * sound needs in order to be about something, so they sit in the context register. That
 * also keeps this specimen's subject a different kind of thing from an earcon's, which is
 * a pitch figure on a grid, since the contrast between the two terms is the whole point.
 *
 * AUDIO: playback happens only behind `event.isTrusted`. Attract mode and CI are silent,
 * because a specimen that makes noise at a reader who is only browsing is hostile, while
 * a reader who presses the paper themselves hears the sound the drawing describes. The
 * demonstration is complete with no audio at all, which is why nothing here draws a
 * speaker with waves coming out of it (SPEC §8). The noise is synthesized from a buffer
 * rather than fetched, since a specimen makes no network requests (SPEC §5); the term is
 * about the sound resembling an event, and filtered noise is what a crumple is made of.
 *
 * A line under the frame used to announce that policy to the reader ("Drawn, never played:
 * this demonstration is silent. Press the paper yourself and you hear the shape above."),
 * the panel was labelled "the sound it made", and the readout described each drawing in
 * adjectives ("a rattling burst, dying away"). All of it was the site talking about its own
 * exhibit: the panel is titled "Waveform" now, the readout names the event whose sound is
 * drawn, and the note is gone.
 *
 * Visual timing comes from the DemoClock so a pose can freeze a reaction mid-squash; the
 * AudioContext keeps its own schedule, which is the only clock a sound can have. The wave
 * is drawn inside a fixed panel and the objects react by transform, so a sound moves
 * nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Desk</span>
          <span class="sp-text" data-part="readout" data-shape="swell" style="flex: 0 0 auto; width: 320px; text-align: right; white-space: nowrap">${SOUNDS.whoosh?.blurb}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div class="sp-row sp-context" style="gap: 28px; align-items: center; justify-content: center; height: 80px">
            ${PAPER}
            ${ENVELOPE}
          </div>
          <div class="sp-surface" style="padding: 8px 10px 6px">
            <div data-part="stage" style="position: relative; width: ${PANEL.w}px; height: ${PANEL.h}px">
              <span class="sp-context" style="position: absolute; left: 0; top: ${PANEL.h / 2 - 1}px; width: ${PANEL.w}px; height: 2px; background: var(--sp-line)"></span>
              <span data-part="wave" data-subject data-sound="whoosh" style="position: absolute; left: 0; top: 0; width: 10px; height: 10px"></span>
            </div>
            <div class="sp-row sp-context" style="justify-content: space-between; margin-top: 4px">
              <span class="sp-label" style="font-size: 10px">Waveform</span>
              <span class="sp-label" data-part="length" style="font-size: 10px">${SOUNDS.whoosh?.seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const wave = part(root, 'wave');
  const readout = part(root, 'readout');
  const length = part(root, 'length');
  const paper = part(root, 'obj-paper');
  const envelope = part(root, 'obj-envelope');

  let settle: number | undefined;
  let audio: AudioContext | undefined;

  const draw = (key: string) => {
    const sound = SOUNDS[key];
    if (!sound) return;
    const bars = Array.from({ length: BAR.count }, (_, i) => {
      const t = i / (BAR.count - 1);
      const amp = Math.max(0, Math.min(1, sound.envelope(t))) * (1 - sound.grit + sound.grit * noise(sound.seed, i));
      const h = Math.max(3, Math.round(amp * MAX_H));
      return { x: i * (BAR.w + BAR.gap), y: Math.round((PANEL.h - h) / 2), h };
    });
    const top = Math.min(...bars.map((b) => b.y));
    const bottom = Math.max(...bars.map((b) => b.y + b.h));
    // The subject traces the sound's own extent, so it is sized from the slices rather
    // than handed the panel's box by proxy (SPEC §5).
    wave.dataset.sound = key;
    wave.style.top = `${top}px`;
    wave.style.width = `${PANEL.w}px`;
    wave.style.height = `${bottom - top}px`;
    wave.innerHTML = bars
      .map(
        (b) =>
          `<span style="position: absolute; left: ${b.x}px; top: ${b.y - top}px; width: ${BAR.w}px; height: ${b.h}px; border-radius: 2px; background: var(--sp-accent)"></span>`,
      )
      .join('');
    readout.dataset.shape = sound.shape;
    readout.textContent = sound.blurb;
    length.textContent = sound.seconds;
  };

  /** The object answers physically, which is the half of the term the drawing cannot carry. */
  const react = (el: HTMLElement, held: string) => {
    clock.clearTimeout(settle);
    el.style.transform = held;
    settle = clock.setTimeout(() => {
      el.style.transform = 'none';
    }, REACT_MS);
  };

  /**
   * The sound itself, and the only place it is ever made: filtered noise shaped by the
   * same envelope the drawing uses, so what a reader hears is what they are looking at.
   */
  const play = (key: string) => {
    const sound = SOUNDS[key];
    if (!sound) return;
    audio ??= new AudioContext();
    if (audio.state === 'suspended') void audio.resume();
    const seconds = Number.parseFloat(sound.seconds);
    const frames = Math.floor(audio.sampleRate * seconds);
    const buffer = audio.createBuffer(1, frames, audio.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      const t = i / frames;
      channel[i] = (Math.random() * 2 - 1) * Math.max(0, Math.min(1, sound.envelope(t))) * 0.5;
    }
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    source.buffer = buffer;
    filter.type = key === 'crumple' ? 'highpass' : 'bandpass';
    filter.frequency.value = key === 'crumple' ? 1800 : 700;
    gain.gain.value = 0.3;
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
  };

  const trigger = (key: string, el: HTMLElement, held: string) => {
    el.addEventListener('click', (event) => {
      draw(key);
      react(el, held);
      // Silence unless a person did it: the player's synthesized clicks make no sound,
      // so attract mode and CI never play a note.
      if (event.isTrusted) play(key);
    });
  };

  trigger('crumple', paper, 'scale(0.86) rotate(-3deg)');
  trigger('whoosh', envelope, 'translateX(22px) scale(0.96)');

  draw('whoosh');
}
