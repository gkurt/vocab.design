import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Phase = 'idle' | 'listening' | 'working' | 'answered';

const NOTE = {
  idle: 'No display, so the interface is language, light and sound. Everything a screen would have shown has to be said, chimed, or lit instead.',
  voice:
    'The answer came back as one short sentence and a colour. Nothing was drawn, so nothing had to be looked at, which is the promise and the difficulty at once.',
  wave: 'A gesture the room can see, answered by a chime. With no screen there is no undo sitting in a corner either: the way back has to be another sentence.',
} as const;

const SAID = {
  voice: '“Turn the kitchen lights down”',
  wave: '(a hand waved over the counter)',
} as const;

const REPLY = {
  voice: '“Kitchen at forty percent”',
  wave: '“Music paused”',
} as const;

/** Beats of one exchange, on the clock the stage hands the demo so a pose can hold them. */
const WORKING_AT = 900;
const VOICE_ANSWER_AT = 1500;
const WAVE_ANSWER_AT = 900;

/**
 * Zero UI specimen: a kitchen speaker with no display, running one task twice, once from a
 * spoken command and once from a hand wave over the counter. The device's whole output is a
 * ring of light and a chime, and the strip beside it is the companion app's transcript of
 * what was heard and said.
 *
 * Three lines of the site's own voice came out of the frame. The topbar read "No display of
 * any kind", which is the article's claim wearing a product's clothes; the transcript was
 * headed "Audio, transcribed for this page", which named the reader inside the fiction and
 * is now just "Transcript"; and a label beside the chime spelled the ring's state out in
 * words ("Ring dim, nothing running"), narrating a thing the specimen already draws. The
 * ring's colour and its pulse carry the phase now, and the transcript carries the rest. The
 * two buttons below the frame kept their words but lost the label introducing them ("Stands
 * in for the physical act:"): they are instrumentation, and "Speak to it" and "Wave a hand"
 * already say what pressing them does.
 *
 * The subject is the device, the screenless thing the term names, and not the room around
 * it: the topbar, the transcript and the two stand-in buttons below the frame are all
 * scene. Every state of the device is honestly the term (a screenless device is screenless
 * whether it is idle or answering), so there is no `data-pose` and identify may ring it at
 * any point in the pass.
 *
 * The transcript keeps both of its lines and the chime keeps its slot in every state,
 * hidden by opacity rather than removed, so an exchange moves nothing (SPEC §5). Each
 * button reaches its own absolute exchange from whatever state it finds, rather than
 * advancing a sequence (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 218px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kitchen speaker</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px">

          <span
            data-part="device"
            data-subject
            data-phase="idle"
            style="position: relative; flex: 0 0 auto; width: 124px; height: 124px; border-radius: 50%; background: var(--sp-surface); border: 1px solid var(--sp-line); background-image: radial-gradient(var(--sp-line) 1px, transparent 1.4px); background-size: 9px 9px"
          >
            <span
              data-part="ring"
              style="position: absolute; inset: 6px; border-radius: 50%; border: 5px solid var(--sp-line); transition: border-color 0.3s"
            ></span>
          </span>

          <span class="sp-stack sp-grow" style="gap: 6px; min-width: 0">
            <span class="sp-label" style="font-size: 11px">Transcript</span>
            <span class="sp-surface sp-stack" style="gap: 6px; padding: 10px 12px; height: 84px; justify-content: center">
              <span class="sp-text sp-text--ink" data-part="said" style="font-size: 12px; opacity: 0; transition: opacity 0.2s">${SAID.voice}</span>
              <span class="sp-text" data-part="reply" style="font-size: 12px; opacity: 0; transition: opacity 0.2s">${REPLY.voice}</span>
            </span>
            <span class="sp-row" style="gap: 8px; height: 24px">
              <span class="sp-chip" data-part="chime" style="cursor: default; opacity: 0; transition: opacity 0.2s">Two note chime</span>
            </span>
          </span>

        </div>
      </div>
      <div class="sp-row sp-context" style="width: 452px; gap: 10px">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="speak">Speak to it</button>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="wave">Wave a hand</button>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE.idle}</span>
    </div>
  `;

  const device = part(root, 'device');
  const ring = part(root, 'ring');
  const said = part(root, 'said');
  const reply = part(root, 'reply');
  const chime = part(root, 'chime');
  const note = part(root, 'note');

  let pending: number | undefined;
  let breathing: number | undefined;

  const setPhase = (phase: Phase) => {
    device.dataset.phase = phase;
    ring.style.borderColor = phase === 'idle' ? 'var(--sp-line)' : 'var(--sp-accent)';
    // The kit owns the two endless animations a light can have, so the stage can pause them
    // off screen and drop them under reduced motion (SPEC §5).
    ring.className = phase === 'listening' ? 'sp-pulse' : phase === 'working' ? 'sp-pending' : '';
  };

  /** One exchange, from whatever state the demo is in: an absolute destination, not a step. */
  const run = (kind: 'voice' | 'wave') => {
    clock.clearTimeout(pending);
    clock.clearTimeout(breathing);
    said.textContent = SAID[kind];
    reply.textContent = REPLY[kind];
    said.style.opacity = '1';
    reply.style.opacity = '0';
    chime.style.opacity = '0';
    note.textContent = NOTE[kind];
    setPhase(kind === 'voice' ? 'listening' : 'working');

    const answer = () => {
      reply.style.opacity = '1';
      chime.style.opacity = '1';
      setPhase('answered');
    };

    if (kind === 'voice') {
      breathing = clock.setTimeout(() => setPhase('working'), WORKING_AT);
      pending = clock.setTimeout(answer, VOICE_ANSWER_AT);
      return;
    }
    pending = clock.setTimeout(answer, WAVE_ANSWER_AT);
  };

  part(root, 'speak').addEventListener('click', () => run('voice'));
  part(root, 'wave').addEventListener('click', () => run('wave'));
}
