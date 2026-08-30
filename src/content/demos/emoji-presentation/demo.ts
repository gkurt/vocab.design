import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked in the browser this page runs in: `font-variant-emoji` is supported,
 * both variation selectors take effect, and a selector in the string outranks
 * the CSS (U+FE0F stays in colour under `font-variant-emoji: text`). That
 * precedence is the point of the row of spellings.
 */
const SIGN = '⚠';
const TEXT_SELECTOR = '︎';
const EMOJI_SELECTOR = '️';

const READS = {
  auto: 'font-variant-emoji: auto',
  text: 'font-variant-emoji: text',
  emoji: 'font-variant-emoji: emoji',
} as const;

type Mode = keyof typeof READS;

const IS_MODE = (value: string): value is Mode => value in READS;

/** The emoji form sets wider than the symbol, so the slot holds the wider of the two (SPEC §5). */
const SLOT = 46;

/**
 * Emoji presentation specimen: one codepoint, U+26A0, in a line of interface
 * text, with `font-variant-emoji` picked absolutely. The row underneath sets the
 * same codepoint three ways, bare and with each variation selector, under
 * whichever setting is in force, so the reader watches the two selected
 * spellings ignore the CSS entirely.
 *
 * The subject is the presented character in the line: the term names what the
 * renderer does to that character, not the sentence and not the picker. Every
 * setting is an honest presentation, so no `data-pose` is needed.
 *
 * The character sits in a fixed slot, because the emoji form is wider than the
 * symbol and the sentence around it must not reflow when the setting changes
 * (SPEC §5); the difference in advance is stated in the caption instead.
 *
 * The readout chip used to gloss the setting ("text: the monochrome symbol") and a
 * label beside it read "a selector outranks the CSS". Both were the site explaining
 * the demonstration from inside the frame. The chip now prints the declaration in
 * force, which is the same register as the codepoint labels under the spellings, and
 * the precedence claim is left to the article, where the row of spellings shows it.
 */
export function mount(root: HTMLElement): void {
  const slot = `display: inline-block; width: ${SLOT}px; text-align: center; vertical-align: -0.15em`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="font-variant-emoji" data-value="text">
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" data-part="seg-text" value="text">text</button>
            <button class="sp-segment" data-part="seg-emoji" value="emoji">emoji</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="line" style="margin-top: 8px; padding: 10px 14px; font-size: 18px; white-space: nowrap">
          <span data-part="mark" data-subject data-mode="text" style="${slot}">${SIGN}</span>Three routes delayed
        </div>
        <div class="sp-row sp-context" data-part="spellings" style="gap: 10px; margin-top: 10px">
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-bare" style="font-size: 24px; line-height: 1.2">${SIGN}</span>
            <span class="sp-label">U+26A0</span>
          </div>
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-text" style="font-size: 24px; line-height: 1.2">${SIGN}${TEXT_SELECTOR}</span>
            <span class="sp-label">plus U+FE0E</span>
          </div>
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-emoji" style="font-size: 24px; line-height: 1.2">${SIGN}${EMOJI_SELECTOR}</span>
            <span class="sp-label">plus U+FE0F</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READS.text}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The colour form is a wider glyph, so the character sits in a fixed slot to keep the line from reflowing.
        </p>
      </div>
    </div>
  `;

  const mark = part(root, 'mark');
  const readout = part(root, 'readout');
  const cells = [part(root, 'cell-bare'), part(root, 'cell-text'), part(root, 'cell-emoji')];

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    mark.dataset.mode = value;
    mark.style.setProperty('font-variant-emoji', value);
    for (const cell of cells) cell.style.setProperty('font-variant-emoji', value);
    readout.textContent = READS[value];
  });

  mark.style.setProperty('font-variant-emoji', 'text');
  for (const cell of cells) cell.style.setProperty('font-variant-emoji', 'text');
}
