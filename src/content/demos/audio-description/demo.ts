import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Slot = {
  key: string;
  kind: 'dialogue' | 'ad';
  /** What the strip prints while the playhead is in this slot. */
  line: string;
  /** The longer description the extended track has room for. */
  extended?: string;
  width: number;
  extendedWidth: number;
};

/** One scene: three lines of dialogue with two gaps the description is written into. */
const SLOTS: Slot[] = [
  { key: 'd1', kind: 'dialogue', line: 'MARA: You kept it.', width: 24, extendedWidth: 20 },
  {
    key: 'ad1',
    kind: 'ad',
    line: 'She slides the letter across, unsigned.',
    extended: 'She slides the letter across the table, unsigned, and does not lift her eyes from it.',
    width: 14,
    extendedWidth: 22,
  },
  { key: 'd2', kind: 'dialogue', line: 'JUN: I kept all of them.', width: 24, extendedWidth: 20 },
  {
    key: 'ad2',
    kind: 'ad',
    line: 'He pockets the brass key.',
    extended: 'He pockets the brass key, and the door behind him stays open on an empty corridor.',
    width: 14,
    extendedWidth: 22,
  },
  { key: 'd3', kind: 'dialogue', line: 'MARA: Then read this one.', width: 24, extendedWidth: 16 },
];

const QUIET = 'The dialogue has the floor. The describer waits.';

const CAPTION = {
  standard: 'Each description is written to fit the gap it has. Anything longer than the gap has to be cut.',
  extended: 'Extended description stops playback until the line is finished, so the running time grows.',
} as const;

const DIALOGUE_MS = 1200;
const AD_MS = 1300;
const EXTENDED_AD_MS = 1900;

/**
 * Audio description specimen: a scene playing through three lines of dialogue with two
 * gaps, and the description track that speaks into those gaps. The strip prints what the
 * description says, since a specimen cannot play audio, and the timeline underneath shows
 * the description slots sitting between the dialogue rather than over it.
 *
 * The subject is the description strip: the narrowest element that is the track itself.
 * The picture, the timeline, the transport and the mode control are scenery (SPEC §5).
 * Both modes are honestly the term (standard and extended are two ways of writing the
 * same track), so no `data-pose` is needed: the subject never stops being a description
 * track. The specimen rests on a description rather than on a silence, so identify has
 * the term on stage without anything being played.
 *
 * The strip holds its height whether it is speaking or waiting, and the timeline slots
 * always sum to the full track, so switching modes redistributes room inside the ruler
 * instead of moving anything around it (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const slot = (s: Slot) => `
    <span data-part="slot-${s.key}" data-kind="${s.kind}" data-mode="standard"
          style="width: ${s.width}%; height: 100%; border-radius: 3px; transition: width 0.28s var(--sp-ease);
                 background: ${s.kind === 'ad' ? 'var(--sp-accent)' : 'var(--sp-line)'}"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 12px 14px">
        <div style="position: relative; height: 92px; border-radius: 6px; overflow: hidden;
                    background: linear-gradient(160deg, #2b3550 0%, #465a7d 58%, #6d7f9c 100%)">
          <div style="position: absolute; left: 44px; top: 20px; width: 46px; height: 46px; border-radius: 50%; background: #dfe6f2; opacity: 0.5"></div>
          <div style="position: absolute; right: 40px; bottom: 0; width: 96px; height: 44px; border-radius: 6px 6px 0 0; background: #1d2436; opacity: 0.55"></div>
        </div>

        <div class="sp-surface" data-part="strip" data-subject data-state="speaking" data-track="standard"
             style="margin-top: 10px; height: 62px; padding: 6px 10px; display: flex; flex-direction: column; gap: 2px">
          <span class="sp-label" style="font-size: 10px">Audio description track</span>
          <span class="sp-text sp-text--ink" data-part="strip-text" style="font-size: 12px; line-height: 1.4">${SLOTS[1]?.line ?? ''}</span>
        </div>

        <div class="sp-context" style="margin-top: 10px">
          <div data-part="timeline" data-mode="standard"
               style="position: relative; display: flex; gap: 2px; height: 18px; padding: 2px; border-radius: 5px; background: var(--sp-sunken)">
            ${SLOTS.map(slot).join('')}
            <span data-part="playhead"
                  style="position: absolute; top: -3px; bottom: -3px; left: 31%; width: 2px; border-radius: 2px;
                         background: var(--sp-ink); transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 10px">
            <button class="sp-button sp-button--sm" type="button" data-part="play">Play the scene</button>
            <sp-segmented class="sp-segmented" data-part="segmented" data-value="standard">
              <button class="sp-segment" data-part="seg-standard" value="standard">Standard</button>
              <button class="sp-segment" data-part="seg-extended" value="extended">Extended</button>
            </sp-segmented>
          </div>
          <p class="sp-text" data-part="caption" data-case="standard"
             style="margin: 8px 0 0; height: 28px; font-size: 11px">${CAPTION.standard}</p>
        </div>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  const stripText = part(root, 'strip-text');
  const timeline = part(root, 'timeline');
  const playhead = part(root, 'playhead');
  const caption = part(root, 'caption');

  let index = 1;
  let extended = false;
  let timer: number | undefined;

  const widthOf = (s: Slot) => (extended ? s.extendedWidth : s.width);

  const render = () => {
    let start = 0;
    for (const [i, s] of SLOTS.entries()) {
      const el = part(root, `slot-${s.key}`);
      el.style.width = `${widthOf(s)}%`;
      el.dataset.mode = extended ? 'extended' : 'standard';
      if (i === index) playhead.style.left = `${start + widthOf(s) / 2}%`;
      start += widthOf(s);
    }
    const current = SLOTS[index];
    const speaking = current?.kind === 'ad';
    const line = speaking ? ((extended ? current?.extended : current?.line) ?? '') : QUIET;
    strip.dataset.state = speaking ? 'speaking' : 'silent';
    strip.dataset.track = extended ? 'extended' : 'standard';
    stripText.textContent = line;
    stripText.className = speaking ? 'sp-text sp-text--ink' : 'sp-text';
    timeline.dataset.mode = extended ? 'extended' : 'standard';
    // Extended description is the mode that stops the picture until the line is done.
    if (speaking && extended) timeline.dataset.paused = '';
    else delete timeline.dataset.paused;
  };

  const advance = () => {
    if (index >= SLOTS.length - 1) {
      delete strip.dataset.playing;
      strip.dataset.ended = '';
      render();
      return;
    }
    index += 1;
    render();
    const current = SLOTS[index];
    const wait = current?.kind === 'ad' ? (extended ? EXTENDED_AD_MS : AD_MS) : DIALOGUE_MS;
    timer = clock.setTimeout(advance, wait);
  };

  // Play always starts at the top, so a pass joined halfway shows the same scene (SPEC §8).
  part(root, 'play').addEventListener('click', () => {
    clock.clearTimeout(timer);
    index = 0;
    delete strip.dataset.ended;
    strip.dataset.playing = '';
    render();
    timer = clock.setTimeout(advance, DIALOGUE_MS);
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    extended = (event as CustomEvent<string>).detail === 'extended';
    caption.dataset.case = extended ? 'extended' : 'standard';
    caption.textContent = extended ? CAPTION.extended : CAPTION.standard;
    render();
  });

  render();
}
