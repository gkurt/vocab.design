import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long each cue is held before the next one takes the bar. */
const CUE_MS = 1300;

const CUES = [
  '[rain against the window]',
  'MARA: The kettle has been on since six.',
  'JUN: Then it is tea, not coffee.',
  '[kettle clicks off]',
];

/**
 * Captions specimen: a player whose caption bar takes a cue at a time, speaker labels
 * and non-speech sound included, with a control that switches the track off the way a
 * closed caption track can be.
 *
 * The subject is the caption bar. The term names the text and the strip it is drawn in,
 * not the video under it, and the bar keeps its room whether or not there is a cue in
 * it, so turning the track off moves nothing (SPEC §5). The picture, the transport, and
 * the CC control are scenery. The specimen rests on the first cue rather than on an
 * empty bar, so identify has the term on stage without playing anything.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 404px">
        <div style="position: relative; height: 152px; border-radius: 6px; overflow: hidden;
                    background: linear-gradient(160deg, #2b3550 0%, #465a7d 58%, #6d7f9c 100%)">
          <div style="position: absolute; left: 34px; top: 30px; width: 58px; height: 58px; border-radius: 50%; background: #dfe6f2; opacity: 0.55"></div>
          <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 46px; background: #1d2436; opacity: 0.7"></div>
          <div data-part="bar" data-subject data-cue="0" data-captions="on"
               style="position: absolute; left: 14px; right: 14px; bottom: 12px; min-height: 26px; padding: 4px 10px;
                      border-radius: 6px; background: rgb(10 12 18 / 0.78); color: #ffffff; font-size: 12px;
                      line-height: 1.5; text-align: center">
            <span data-part="cue">${CUES[0]}</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="play">Play from start</button>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="on" data-axis="Captions">
            <button class="sp-segment" data-part="seg-on" value="on">CC on</button>
            <button class="sp-segment" data-part="seg-off" value="off">CC off</button>
          </sp-segmented>
        </div>
        <div class="sp-progress sp-context" data-part="timeline" style="margin-top: 10px; --sp-value: 25%">
          <div class="sp-progress-fill"></div>
        </div>
        <p class="sp-text sp-context" data-part="note" style="margin: 8px 0 0; height: 18px; font-size: 12px; white-space: nowrap">
          Speaker changes and sound are both cues.
        </p>
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const cue = part(root, 'cue');
  const timeline = part(root, 'timeline');
  const note = part(root, 'note');

  let index = 0;
  let timer: number | undefined;

  const render = () => {
    bar.dataset.cue = String(index);
    cue.textContent = bar.dataset.captions === 'off' ? '' : (CUES[index] ?? '');
    timeline.style.setProperty('--sp-value', `${((index + 1) / CUES.length) * 100}%`);
  };

  const advance = () => {
    if (index >= CUES.length - 1) {
      delete bar.dataset.playing;
      bar.dataset.ended = '';
      return;
    }
    index += 1;
    render();
    timer = clock.setTimeout(advance, CUE_MS);
  };

  // Play always starts the track from its first cue, so a pass joined halfway plays the
  // same thing it would from the top (SPEC §8).
  part(root, 'play').addEventListener('click', () => {
    clock.clearTimeout(timer);
    index = 0;
    delete bar.dataset.ended;
    bar.dataset.playing = '';
    render();
    timer = clock.setTimeout(advance, CUE_MS);
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    const on = (event as CustomEvent<string>).detail !== 'off';
    bar.dataset.captions = on ? 'on' : 'off';
    note.textContent = on ? 'Speaker changes and sound are both cues.' : 'Track off: the audio is not available as text.';
    render();
  });
}
