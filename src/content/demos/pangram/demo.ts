import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The coverage is computed from the sentence, never stated: the tally is built by
 * walking the letters of whichever line is set, so a cell is struck because that
 * letter really occurs. The near miss is the same famous sentence with four words
 * of it removed, which is how a sentence stops being a pangram without looking any
 * different at a glance.
 */
const SERIF = "'Source Serif 4 Variable', Georgia, serif";
const SIZE = 20;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
/** Room for the longest sentence, so a pick moves nothing below it (SPEC §5). */
const LINE = 58;

const LINES = {
  fox: { text: 'The quick brown fox jumps over the lazy dog', note: 'complete, and a weak proof' },
  jugs: { text: 'Pack my box with five dozen liquor jugs', note: 'complete in 32 letters' },
  near: { text: 'The quick brown fox jumps over the dog', note: 'one word away from the fox' },
} as const;

type Name = keyof typeof LINES;
const IS_NAME = (value: string): value is Name => value in LINES;

/**
 * Pangram specimen: one line of type under a pick between two real pangrams and a
 * near miss, with the alphabet tallied underneath. Each cell is struck the moment
 * its letter occurs in the line above, so the claim the word makes (every letter,
 * at least once) is checkable by eye rather than asserted by a caption. The near
 * miss is one word away from the famous sentence and four letters short, which is
 * the whole reason a tally is worth drawing: nothing about the line itself says
 * which letters are missing.
 *
 * The subject is the set line (SPEC §5): the term names a sentence, and the
 * narrowest element that is the sentence is the line, not the scene and not the
 * tally that measures it. The near miss is the counter-example the line itself
 * passes through, so the honest condition is declared in `data-pose` and the
 * specimen mounts on a complete one (SPEC §6). The picker, the tally, the readout
 * and the caption are the demo's own instrumentation and stay in the context
 * register.
 *
 * The tally has a cell per letter at a fixed size and the line has a box sized for
 * its longest setting, so no pick moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = (letter: string) => `
    <span data-part="tally-${letter}" data-used="no"
          style="display: inline-flex; align-items: center; justify-content: center; width: 13px; height: 18px;
                 border-radius: 3px; font-size: 11px; font-weight: 500; line-height: 1">${letter}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="white-space: nowrap">the line</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="fox" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="seg-fox" value="fox" style="white-space: nowrap">fox</button>
            <button class="sp-segment" data-part="seg-jugs" value="jugs" style="white-space: nowrap">jugs</button>
            <button class="sp-segment" data-part="seg-near" value="near" style="white-space: nowrap">near miss</button>
          </sp-segmented>
        </div>
        <div style="height: ${LINE}px; margin-top: 10px">
          <p data-part="line" data-subject data-complete="yes" data-pose="[data-complete=yes]"
             style="margin: 0; font-family: ${SERIF}; font-size: ${SIZE}px; line-height: 1.35">${LINES.fox.text}</p>
        </div>
        <span class="sp-label sp-context" style="display: block">struck as the letter occurs</span>
        <div class="sp-row sp-context" data-part="tally" style="gap: 2px; margin-top: 6px; height: 20px">
          ${[...ALPHABET].map(cell).join('')}
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 8px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          Completeness is all the word claims. It says nothing about whether the sentence is a good proof of a
          face, which is why designers reach for other words.
        </p>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const readout = part(root, 'readout');
  const cells = [...ALPHABET].map((letter) => [letter, part(root, `tally-${letter}`)] as const);

  const apply = (value: string) => {
    if (!IS_NAME(value)) return;
    const { text, note } = LINES[value];
    line.textContent = text;
    const used = new Set([...text.toLowerCase()].filter((c) => ALPHABET.includes(c)));

    for (const [letter, el] of cells) {
      const on = used.has(letter);
      el.dataset.used = on ? 'yes' : 'no';
      el.style.background = on ? 'var(--sp-accent)' : 'var(--sp-sunken)';
      el.style.color = on ? 'var(--sp-accent-ink)' : 'var(--sp-muted)';
    }

    const missing = [...ALPHABET].filter((letter) => !used.has(letter));
    line.dataset.complete = missing.length === 0 ? 'yes' : 'no';
    line.dataset.count = String(used.size);
    readout.textContent = missing.length ? `${used.size} of 26: no ${missing.join(', ')}. ${note}` : `26 of 26. ${note}`;
  };

  apply('fox');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
