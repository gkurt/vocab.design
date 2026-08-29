import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the voice spends on one word. */
const WORD_MS = 300;

const WORDS = 'Kestrels hunt by hovering: the bird holds one patch of ground still in its eye while the wind moves everything else.'.split(
  ' ',
);

/** The word without the punctuation stuck to it, which is what a voice says and a readout should show. */
const spoken = (word: string) => word.replace(/[^\p{L}\p{N}'-]/gu, '');

const READOUT = {
  idle: 'Silent. The article says nothing until a reader asks for it.',
  done: `Finished. ${WORDS.length} words read in order, highlight cleared.`,
} as const;

/**
 * Read aloud specimen: an article paragraph that a synthetic voice reads in order, with the word
 * being spoken carried by a travelling highlight. Nothing about headings, roles or state is
 * announced, because that is the other feature.
 *
 * The subject is the highlight, given an element of its own: the term names the mark that travels
 * with the voice, not the paragraph it crosses and not the control that starts it. A feature with
 * no element of its own gets one, sized to its extent (SPEC §5), which is what this overlay is.
 * The prose, the button, the readout and the caption are scenery. The highlight is off stage before
 * a reading starts and after one ends, which identify summons it out of (SPEC §6), and it is the
 * term in every state where it is on stage, so no `data-pose` is needed.
 *
 * The demo never reads on mount, so the scripted press owns the only run (SPEC §8), and every beat
 * of it comes from the DemoClock, so a pose holds the voice on one word. The highlight is placed
 * from each word's own offsets, read at the moment that word is reached rather than cached at
 * mount, so a late-arriving typeface can never leave the mark behind the prose (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const word = (text: string, index: number) => `<span data-part="word-${index + 1}" style="display: inline-block">${text}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Reader view, one article</span>
          <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 10px; white-space: nowrap">Voice Serena, 1.0&#215;</span>
            <button class="sp-button sp-button--sm" type="button" data-part="play"
                    style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">Read aloud</button>
          </div>
        </div>

        <div data-part="prose" style="position: relative; margin-top: 10px">
          <span data-part="highlight" data-subject aria-hidden="true"
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; border-radius: 3px;
                       background: var(--sp-accent-soft); opacity: 0; visibility: hidden;
                       transition: opacity 0.14s ease, visibility 0.14s"></span>
          <p class="sp-text sp-text--ink" style="position: relative; margin: 0; font-size: 15px; line-height: 26px">
            ${WORDS.map(word).join(' ')}
          </p>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 8px; padding: 8px 10px">
          <span class="sp-label" style="font-size: 10px">Read aloud, word by word</span>
          <p class="sp-text sp-text--ink" data-part="readout" data-state="idle"
             style="margin: 3px 0 0; height: 18px; line-height: 18px; font-size: 11.5px; white-space: nowrap">${READOUT.idle}</p>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">The voice carries the prose in
          reading order and the highlight keeps the reader's place. No heading level, no role and no state is spoken:
          this is a reading aid.</p>
      </div>
    </div>
  `;

  const highlight = part(root, 'highlight');
  const readout = part(root, 'readout');
  const words = WORDS.map((_, index) => part(root, `word-${index + 1}`));
  let timer: number | undefined;

  const show = (on: boolean) => {
    highlight.style.opacity = on ? '1' : '0';
    highlight.style.visibility = on ? 'visible' : 'hidden';
  };

  const carry = (target: HTMLElement) => {
    highlight.style.left = `${target.offsetLeft - 3}px`;
    highlight.style.top = `${target.offsetTop - 2}px`;
    highlight.style.width = `${target.offsetWidth + 6}px`;
    highlight.style.height = `${target.offsetHeight + 4}px`;
  };

  const speak = (index: number) => {
    const target = words[index];
    if (!target) {
      show(false);
      readout.dataset.state = 'done';
      readout.textContent = READOUT.done;
      return;
    }
    target.setAttribute('data-read', '');
    carry(target);
    show(true);
    readout.dataset.state = 'speaking';
    readout.textContent = `Speaking “${spoken(WORDS[index] ?? '')}”, word ${index + 1} of ${WORDS.length}`;
    timer = clock.setTimeout(() => speak(index + 1), WORD_MS);
  };

  // Absolute rather than a toggle: a press reads the paragraph from its first word, whatever
  // state the reading was found in (SPEC §8).
  part(root, 'play').addEventListener('click', () => {
    clock.clearTimeout(timer);
    for (const target of words) target.removeAttribute('data-read');
    speak(0);
  });
}
