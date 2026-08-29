import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CHANNELS = ['touch', 'voice', 'gaze'] as const;

type Channel = (typeof CHANNELS)[number];

const CHANNEL_LABEL: Record<Channel, string> = {
  touch: 'Input channel: touch',
  voice: 'Input channel: voice',
  gaze: 'Input channel: gaze plus pinch',
};

const SOURCE: Record<Channel, string> = {
  touch: 'Set by tap',
  voice: 'Set by voice',
  gaze: 'Set by gaze plus pinch',
};

const NOTE: Record<Channel, string> = {
  touch: 'A tap on the preset sets the timer. The screen is the channel, and the state it writes is the only state there is.',
  voice:
    'Speech reaches the same setter. The timer does not restart, does not fork, and does not disagree with what the screen already said.',
  gaze: 'The eyes aim and the pinch commits. Third channel, third source stamp, same ten minutes running.',
};

/** How long the transcript is read before the command lands, on the stage's clock. */
const HEARD_AFTER = 600;

/**
 * Multimodal interface specimen: one kitchen timer set three ways. The segmented control
 * picks the input channel, each channel carries its own affordance in the strip below, and
 * every one of them reaches the same absolute state (ten minutes, running) rather than
 * nudging whatever it found (SPEC §8). Only the source stamp changes, which is the claim:
 * three channels, one state machine.
 *
 * The subject is the task surface, the card holding the timer's state, and not the strip of
 * input affordances beneath it: the term names an interface several channels drive, and the
 * thing being driven is the narrowest honest answer. The strip stays out of the context
 * register for the reason a chart's legend does: it is apparatus the demonstration needs,
 * not scenery around it. The topbar and the note below the frame are scenery.
 *
 * No `data-pose`: an unset timer is the task surface before the task, not a counter-example,
 * so identify may honestly ring it at any point in the pass. The strip's three panels are
 * stacked in one absolutely positioned box of fixed height and the transcript keeps its line
 * whether or not it has been spoken, so switching channel moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kitchen hub</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="channel-pick" data-value="touch" data-axis="Channel">
            <button class="sp-segment" type="button" data-part="pick-touch" value="touch" style="padding: 5px 10px; font-size: 12px">Touch</button>
            <button class="sp-segment" type="button" data-part="pick-voice" value="voice" style="padding: 5px 10px; font-size: 12px">Voice</button>
            <button class="sp-segment" type="button" data-part="pick-gaze" value="gaze" style="padding: 5px 10px; font-size: 12px">Look, pinch</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div
            class="sp-surface"
            data-part="task"
            data-subject
            data-timer="unset"
            style="flex: 0 0 auto; display: flex; align-items: center; gap: 14px; height: 66px; padding: 0 14px"
          >
            <span
              data-part="face"
              style="font-size: 30px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: 0.5px; width: 104px"
            >00:00</span>
            <span class="sp-stack" style="gap: 3px; flex: 1 1 auto">
              <span data-part="status" style="font-size: 13px; font-weight: 500">Not set</span>
              <span class="sp-label" data-part="source" data-by="none" style="font-size: 11px">No channel has set it yet</span>
            </span>
          </div>

          <div class="sp-surface" data-part="strip" style="flex: 0 0 auto; height: 100px; padding: 10px 12px">
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-label" data-part="channel-name" data-mode="touch" style="font-size: 11px; color: var(--sp-ink)">${CHANNEL_LABEL.touch}</span>
              <span class="sp-label" style="font-size: 11px">All three reach one setter</span>
            </div>
            <div style="position: relative; height: 56px; margin-top: 6px">

              <div data-part="panel-touch" class="sp-row" style="position: absolute; inset: 0; gap: 12px">
                <button class="sp-button" type="button" data-part="tap-preset">Start 10 min</button>
                <span class="sp-text" style="font-size: 11px">Preset tapped on the panel</span>
              </div>

              <div data-part="panel-voice" class="sp-row" style="position: absolute; inset: 0; gap: 12px" hidden>
                <button class="sp-button sp-button--ghost" type="button" data-part="speak">Speak</button>
                <span class="sp-stack" style="gap: 3px; flex: 1 1 auto">
                  <span class="sp-text" data-part="transcript" style="font-size: 11px; opacity: 0; transition: opacity 0.2s">&ldquo;Set a ten minute timer&rdquo;</span>
                  <span class="sp-text" style="font-size: 11px">Wake word, then the command</span>
                </span>
              </div>

              <div data-part="panel-gaze" class="sp-row" style="position: absolute; inset: 0; gap: 12px" hidden>
                <span
                  data-part="gaze-target"
                  class="sp-row"
                  style="position: relative; gap: 6px; padding: 6px 10px; border: 2px solid var(--sp-accent); border-radius: 999px; font-size: 12px"
                >
                  10 min
                  <span class="sp-pulse" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent)"></span>
                </span>
                <button class="sp-button sp-button--ghost" type="button" data-part="pinch">Pinch</button>
                <span class="sp-text" style="font-size: 11px">Gaze rests, fingers commit</span>
              </div>

            </div>
          </div>

        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE.touch}</span>
    </div>
  `;

  const task = part(root, 'task');
  const face = part(root, 'face');
  const status = part(root, 'status');
  const source = part(root, 'source');
  const channelName = part(root, 'channel-name');
  const transcript = part(root, 'transcript');
  const note = part(root, 'note');

  let channel: Channel = 'touch';
  let heard: number | undefined;

  /** The one setter every channel reaches. Absolute, so a second command is a no-op. */
  const setTimer = (by: Channel) => {
    task.dataset.timer = '10-running';
    face.textContent = '10:00';
    status.textContent = 'Running';
    source.dataset.by = by;
    source.textContent = SOURCE[by];
  };

  const showChannel = (next: Channel) => {
    channel = next;
    clock.clearTimeout(heard);
    transcript.style.opacity = '0';
    channelName.dataset.mode = next;
    channelName.textContent = CHANNEL_LABEL[next];
    note.textContent = NOTE[next];
    for (const name of CHANNELS) flag(part(root, `panel-${name}`), 'hidden', name !== next);
  };

  part(root, 'channel-pick').addEventListener('change', (event) => {
    showChannel((event as CustomEvent<string>).detail as Channel);
  });

  part(root, 'tap-preset').addEventListener('click', () => setTimer('touch'));
  part(root, 'pinch').addEventListener('click', () => setTimer('gaze'));

  // Speech is heard before it is obeyed: the transcript shows, then the command lands, on
  // the clock the stage hands the demo so a pose can hold it mid-sentence.
  part(root, 'speak').addEventListener('click', () => {
    transcript.style.opacity = '1';
    clock.clearTimeout(heard);
    heard = clock.setTimeout(() => {
      if (channel === 'voice') setTimer('voice');
    }, HEARD_AFTER);
  });
}
