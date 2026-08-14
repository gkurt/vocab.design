import { part } from '#src/kit/parts.ts';

type Level = 'idle' | 'polite' | 'assertive';

const EMPTY = 'Empty';

/** Where on the timeline the update fires, and how far the sentence would have run. */
const NOW = 34;
const SENTENCE_END = 62;
const SPOKEN_WIDTH = 30;

const MESSAGE = {
  polite: 'Draft saved',
  assertive: 'Session expiring in 2 minutes',
} as const;

/** The same messages, short enough for the block they are drawn inside. */
const ON_TIMELINE = {
  polite: 'Draft saved',
  assertive: 'Session expiring',
} as const;

const READOUT = {
  idle: 'Nothing has fired yet',
  polite: 'Queued behind the sentence in progress',
  assertive: 'Cut in. The sentence is abandoned mid-word',
} as const;

const CAPTION = {
  idle: 'A screen reader is part way through a sentence. Fire an update into either region and watch where it lands in the speech.',
  polite: 'Polite waits. The sentence finishes, then the region is read, so the reader loses nothing but a second or two.',
  assertive: 'Assertive interrupts. Speech stops mid-word and the rest of that sentence is gone, with no way to ask for it back.',
} as const;

/**
 * Politeness level specimen: two live regions wired to the same event stream, one polite and
 * one assertive, above a speech timeline that shows what each setting does to a sentence
 * already being read. Firing the polite update parks it after the sentence ends; firing the
 * assertive one cuts the sentence off at the moment it arrives and leaves the unread tail
 * drawn as a dashed ghost.
 *
 * The subject is the pair of regions, the narrowest element the term names: politeness is a
 * setting one region carries and only means anything against the other value, so a ring
 * around a single box would identify a live region rather than its politeness. The buttons,
 * the timeline, the readout, and the caption are scenery (SPEC §5). Each button reaches its
 * own state rather than toggling (SPEC §8), the message lines hold their height with a
 * placeholder, and the timeline blocks are positioned in percentages of a fixed track, so
 * nothing moves when the state changes.
 */
export function mount(root: HTMLElement): void {
  const region = (level: 'polite' | 'assertive') => `
    <div class="sp-surface" data-part="region-${level}" data-state="empty" style="flex: 1 1 0; min-width: 0; padding: 7px 9px 8px">
      <span class="sp-label" style="display: inline-block; font-size: 10px; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">
        aria-live="${level}"
      </span>
      <p class="sp-text sp-text--ink" data-part="msg-${level}" data-state="empty"
         style="margin: 6px 0 0; height: 30px; font-size: 11.5px; color: var(--sp-muted)">${EMPTY}</p>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label">Fire an update</span>
          <div class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fire-polite"
                    style="font-size: 11.5px">Autosave</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fire-assertive"
                    style="font-size: 11.5px">Session warning</button>
          </div>
        </div>

        <div class="sp-row" data-part="regions" data-subject data-level="idle"
             style="margin-top: 10px; gap: 10px; align-items: stretch">
          ${region('polite')}
          ${region('assertive')}
        </div>

        <div class="sp-surface sp-context" data-part="timeline" style="margin-top: 10px; padding: 8px 10px 6px">
          <div style="position: relative; height: 44px">
            <span style="position: absolute; left: 0; right: 0; top: 0; height: 20px; background: var(--sp-sunken); border-radius: 5px"></span>
            <span style="position: absolute; left: 0; right: 0; top: 24px; height: 20px; background: var(--sp-sunken); border-radius: 5px"></span>
            <span class="sp-label" style="position: absolute; left: 7px; top: 24px; height: 20px; display: flex; align-items: center; font-size: 9.5px">live region</span>
            <div data-part="speech"
                 style="position: absolute; left: 0; top: 0; height: 20px; width: ${SENTENCE_END}%; display: flex; align-items: center;
                        padding: 0 7px; border-radius: 5px; background: var(--sp-context-accent-soft); color: var(--sp-ink);
                        font-size: 10px; white-space: nowrap; overflow: hidden; transition: width 0.24s var(--sp-ease)"
                 >Reading: “Quarterly report”</div>
            <div data-part="lost"
                 style="position: absolute; top: 0; height: 20px; left: ${NOW}%; width: ${SENTENCE_END - NOW}%; display: flex;
                        align-items: center; justify-content: center; border-radius: 5px; border: 1px dashed var(--sp-muted);
                        color: var(--sp-muted); font-size: 9.5px; white-space: nowrap; overflow: hidden; visibility: hidden">never spoken</div>
            <div data-part="spoken"
                 style="position: absolute; top: 24px; height: 20px; left: ${SENTENCE_END}%; width: ${SPOKEN_WIDTH}%; display: flex;
                        align-items: center; padding: 0 7px; border-radius: 5px; background: var(--sp-accent);
                        color: var(--sp-accent-ink); font-size: 10px; white-space: nowrap; overflow: hidden;
                        visibility: hidden; transition: left 0.24s var(--sp-ease)">Draft saved</div>
            <span data-part="now" style="position: absolute; top: 0; bottom: 0; left: ${NOW}%; width: 2px; background: var(--sp-ink)"></span>
          </div>
          <div style="position: relative; height: 14px; margin-top: 2px">
            <span class="sp-label" style="position: absolute; left: ${NOW}%; font-size: 9.5px; white-space: nowrap; translate: -50% 0">update fires</span>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Speech</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-level="idle"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${READOUT.idle}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-level="idle"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.idle}</p>
      </div>
    </div>
  `;

  const regions = part(root, 'regions');
  const speech = part(root, 'speech');
  const lost = part(root, 'lost');
  const spoken = part(root, 'spoken');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  const say = (level: 'polite' | 'assertive', on: boolean) => {
    const box = part(root, `region-${level}`);
    const line = part(root, `msg-${level}`);
    box.dataset.state = on ? 'spoken' : 'empty';
    line.dataset.state = on ? 'spoken' : 'empty';
    line.textContent = on ? MESSAGE[level] : EMPTY;
    line.style.color = on ? 'var(--sp-ink)' : 'var(--sp-muted)';
  };

  const apply = (level: Level) => {
    regions.dataset.level = level;
    say('polite', level === 'polite');
    say('assertive', level === 'assertive');

    const cut = level === 'assertive';
    speech.style.width = `${cut ? NOW : SENTENCE_END}%`;
    lost.style.visibility = cut ? 'visible' : 'hidden';
    spoken.style.visibility = level === 'idle' ? 'hidden' : 'visible';
    spoken.style.left = `${cut ? NOW : SENTENCE_END}%`;
    spoken.textContent = level === 'assertive' ? ON_TIMELINE.assertive : ON_TIMELINE.polite;

    readout.dataset.level = level;
    readout.textContent = READOUT[level];
    caption.dataset.level = level;
    caption.textContent = CAPTION[level];
  };

  apply('idle');

  part(root, 'fire-polite').addEventListener('click', () => apply('polite'));
  part(root, 'fire-assertive').addEventListener('click', () => apply('assertive'));
}
