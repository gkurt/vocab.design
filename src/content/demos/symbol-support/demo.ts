import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Set = 'words' | 'rounded' | 'line';

const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

type Concept = { key: string; code: string; word: string };

const CONCEPTS: Concept[] = [
  { key: 'yes', code: '17456', word: 'Agree' },
  { key: 'no', code: '17457', word: 'Refuse' },
  { key: 'ask', code: '21038', word: 'Ask for help' },
];

/**
 * Two invented symbol sets. Neither copies a real proprietary set: what matters here is only that
 * the same concept code resolves to a different drawing, which is the point of the attribute.
 */
const GLYPHS: Record<'rounded' | 'line', Record<string, string>> = {
  rounded: {
    yes: '<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="m7.4 12.4 3.1 3.1 6.1-6.6" fill="none" stroke="var(--sp-surface)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>',
    no: '<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M6.8 12h10.4" fill="none" stroke="var(--sp-surface)" stroke-width="2.5" stroke-linecap="round"/>',
    ask: '<circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M9.3 9.5a2.8 2.8 0 1 1 3.9 2.7c-.9.4-1.2 1-1.2 1.9" fill="none" stroke="var(--sp-surface)" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.3" fill="var(--sp-surface)"/>',
  },
  line: {
    yes: '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m7.2 12.4 3.2 3.2 6.4-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    no: '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l8 8M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    ask: '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.3 9.6a2.8 2.8 0 1 1 3.9 2.7c-.9.4-1.2 1-1.2 1.9" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.3" fill="currentColor"/>',
  },
};

const CAPTION = {
  words: 'The page as written. For a reader who communicates in symbols, the wording is the barrier, not the layout.',
  rounded: 'The reader’s own set, resolved from the codes. The page did not change: it shipped concepts, not pictures.',
  line: 'A second reader, a second set, the same three codes. This is why the author supplies a code and never a drawing.',
} as const;

const LEGEND = {
  words: 'no symbol set installed',
  rounded: 'reader A, rounded set',
  line: 'reader B, line set',
} as const;

/**
 * Symbol support specimen: one toolbar of three controls, each carrying the concept code of what it
 * means, seen by three readers: one with no symbol set, and two whose sets draw the same codes
 * differently.
 *
 * The two sets are invented for this specimen, deliberately: reproducing a real proprietary symbol
 * set would teach the drawings rather than the mechanism, and the mechanism is that the page ships
 * codes and the reader's software ships pictures.
 *
 * The subject is the symbol standing in for the first control's wording, on the element that holds
 * the drawing rather than on the button (SPEC §5): the term names the substituted picture, and the
 * button, its label, its code line and the other two controls are scenery. The symbol is off stage
 * for the reader with no set installed, which identify summons it out of (SPEC §6), and it is the
 * term in both states it is drawn in, so no `data-pose` is needed.
 *
 * No timers: every state here is reached by a press, so the specimen needs no clock. Each control
 * keeps its size in all three states, so swapping a word for a picture moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const control = (concept: Concept, index: number) => `
    <div class="sp-stack ${index === 0 ? '' : 'sp-context'}" style="flex: 1 1 0; min-width: 0; gap: 4px; align-items: center">
      <button class="sp-button sp-button--ghost" type="button" data-part="btn-${concept.key}"
              style="width: 100%; height: 46px; display: flex; align-items: center; justify-content: center;
                     font-size: 11.5px; white-space: nowrap">
        <span class="sp-text sp-text--ink" data-part="word-${concept.key}"
              style="font-size: 11.5px; white-space: nowrap; transition: opacity 0.16s ease">${concept.word}</span>
        <span data-part="sym-${concept.key}" data-glyph="none"
              style="display: none; width: 26px; height: 26px; color: var(--sp-accent);
                     transition: opacity 0.16s ease"></span>
      </button>
      <span class="sp-label" style="font-family: ${MONO}; font-size: 8.5px; white-space: nowrap">symbol=${concept.code}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One page, three readers</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="words" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-words" value="words"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Words</button>
            <button class="sp-segment" type="button" data-part="seg-rounded" value="rounded"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Set A</button>
            <button class="sp-segment" type="button" data-part="seg-line" value="line"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Set B</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="deck" data-set="words" style="margin-top: 10px; padding: 9px 10px">
          <div class="sp-row sp-row--between sp-context" style="gap: 10px; height: 14px">
            <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Reply to the message</span>
            <span class="sp-label" data-part="legend" style="flex: 0 0 auto; font-size: 10px">${LEGEND.words}</span>
          </div>
          <div class="sp-row" style="margin-top: 7px; gap: 10px; align-items: flex-start">
            ${CONCEPTS.map(control).join('')}
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 9px 0 0; height: 16px; font-size: 11px; line-height: 16px;
                                             white-space: nowrap">The same three codes go to every reader; only the rendering differs.</p>

        <p class="sp-text sp-context" data-part="caption" data-set="words"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.words}</p>
      </div>
    </div>
  `;

  const deck = part(root, 'deck');
  const legend = part(root, 'legend');
  const caption = part(root, 'caption');
  const words = CONCEPTS.map((concept) => part(root, `word-${concept.key}`));
  const symbols = CONCEPTS.map((concept) => part(root, `sym-${concept.key}`));

  // The substituted picture on the first control: the subject, on the element that holds the drawing.
  symbols[0]?.setAttribute('data-subject', '');

  const apply = (next: Set) => {
    deck.dataset.set = next;
    legend.textContent = LEGEND[next];
    caption.dataset.set = next;
    caption.textContent = CAPTION[next];

    CONCEPTS.forEach((concept, index) => {
      const word = words[index];
      const symbol = symbols[index];
      if (!word || !symbol) return;
      if (next === 'words') {
        word.style.display = '';
        symbol.style.display = 'none';
        symbol.dataset.glyph = 'none';
        symbol.innerHTML = '';
        return;
      }
      word.style.display = 'none';
      symbol.style.display = 'block';
      symbol.dataset.glyph = `${next}-${concept.key}`;
      symbol.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" style="display: block">${GLYPHS[next][concept.key] ?? ''}</svg>`;
    });
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Set);
  });

  apply('words');
}
