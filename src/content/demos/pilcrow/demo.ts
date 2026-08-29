import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Every mark sits in a slot of its own: a space is an inline-block the width of a
 * space with a dot inside it, a tab is an inline-block two ems wide with an arrow in
 * it, and the break and paragraph marks hold boxes at the end of their lines. Showing
 * and hiding is `visibility` only, so the prose never reflows under the reader
 * (SPEC §5), which is also how a word processor draws them.
 */
const MARK = 'color: var(--sp-accent); font-weight: 600';

type Mode = 'hidden' | 'shown';

const IS_MODE = (value: string): value is Mode => value === 'hidden' || value === 'shown';

const READS: Record<Mode, string> = {
  hidden: 'marks off: the text, and no way to see its structure',
  shown: 'marks on: ¶ ends a paragraph, ↵ only ends a line',
};

/** A space, drawn as the dot that stands in it. */
const space = () => `<span data-mark style="display: inline-block; width: 0.3em; text-align: center; ${MARK}">·</span>`;

const words = (text: string) => text.split(' ').join(space());

/** A mark that ends a line: it holds its box whether or not it is painted. */
function ender(glyph: string, subject: boolean): string {
  const claim = subject ? 'data-part="pilcrow" data-subject' : '';
  return `<span data-mark ${claim} style="display: inline-block; min-width: 0.7em; ${MARK}">${glyph}</span>`;
}

/**
 * Pilcrow specimen: two paragraphs of an editor's text with formatting marks turned
 * on and off. The pilcrow is the mark that ends a paragraph, and the point of showing
 * it beside the space dots, the tab arrow and the line-break arrow is that only one of
 * those marks is a paragraph: the break in the first paragraph ends a line and keeps
 * the paragraph going, which is exactly the question a writer turns marks on to answer.
 *
 * The subject is the first pilcrow, the narrowest thing the term names: one character,
 * not the marks as a set and not the editor. The toolbar and the caption are the demo's
 * own instrumentation and sit in the context register (SPEC §5). No setting is
 * dishonest, so no `data-pose` is needed: a pilcrow is a pilcrow whenever it is drawn,
 * and the specimen mounts with the marks on so it is drawn at rest.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Formatting marks" data-value="shown">
            <button class="sp-segment" data-part="seg-hidden" value="hidden">hidden</button>
            <button class="sp-segment" data-part="seg-shown" value="shown">shown</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="body" data-marks="shown"
             style="margin-top: 10px; padding: 14px 16px; height: 112px; font-size: 15px; line-height: 1.7">
          <p style="margin: 0">
            ${words('The mark shows where a paragraph ends,')}${ender('↵', false)}<br>
            ${words('not where a line does.')}${ender('¶', true)}
          </p>
          <p style="margin: 0">
            <span data-mark style="display: inline-block; width: 2em; ${MARK}">→</span>${words('It is older than the indent.')}${ender('¶', false)}
          </p>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READS.shown}</span>
          <span class="sp-label">nothing reflows</span>
        </div>
      </div>
    </div>
  `;

  const body = part(root, 'body');
  const readout = part(root, 'readout');
  const marks = [...root.querySelectorAll<HTMLElement>('[data-mark]')];

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    body.dataset.marks = value;
    for (const mark of marks) mark.style.visibility = value === 'shown' ? 'visible' : 'hidden';
    readout.textContent = READS[value];
  });
}
