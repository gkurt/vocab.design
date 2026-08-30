import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The marks are hung by hand, with a negative margin on the span that carries them,
 * because `hanging-punctuation` still ships in Safari alone and a specimen of a
 * property that does nothing in the browser reading it would be a specimen of
 * nothing. The lines are set by hand for the same reason a compositor sets them:
 * which line a mark lands at the start of is the whole subject.
 */
const FACE = "'Source Serif 4 Variable', Georgia, serif";
/** The quote is the widest of the marks, so it is the one the column is measured against. */
const QUOTE_PULL = '0.42em';
const HYPHEN_PULL = '0.34em';

type Mode = 'inline' | 'hung';

const IS_MODE = (value: string): value is Mode => value === 'inline' || value === 'hung';

const READS: Record<Mode, string> = {
  inline: 'inline: the three lines that begin with a mark start late',
  hung: 'hung: every line of text starts on the guide',
};

const LINES = ['The bar shifts a little each', 'winter, and the channel must', 'be sounded again in the spring.'];
const ITEMS = ['soundings taken at low water', 'and the marks moved to suit'];

/**
 * Hanging punctuation specimen: a quoted passage and two dashed lines, with a guide
 * drawn down the text edge so the correction can be read off it. Hung, the opening
 * quote and both hyphens sit outside the column and every line of text starts on the
 * guide. Inline, the marks take their place in the column and the lines they start
 * begin late, which is the dent the term exists to remove.
 *
 * The subject is the opening quote, the narrowest thing the term names: one hung mark,
 * not the passage and not the column. The guide, the picker and the caption are the
 * demo's own instrumentation and sit in the context register (SPEC §5). The inline
 * setting is the counter-example the subject itself passes through, so the honest
 * condition is declared in `data-pose` and the specimen mounts hung (SPEC §6).
 *
 * Only the marks and the text on their own lines move; the column, the guide and every
 * other line hold their positions (SPEC §5).
 *
 * The reading of the setting is the stage's to draw, not the page's: the chip that used to
 * sit under the column is marked `data-stage-verdict` and appears in the strip above the
 * switch that produced it. The label beside it, "guide: the text edge", was the site naming
 * its own instrument inside the frame and is gone.
 *
 * The set passage used to be about hanging punctuation ("Light marks sit outside the column,
 * so the edge of the text reads straight to the eye", with two dashed lines saying the same
 * again), so the specimen was a page explaining the treatment it was demonstrating. It is a
 * harbour note now. The lines are still set by hand at the same widths, and the marks still
 * fall in the same three places: the opening quote, and the hyphen on each of the two items.
 */
export function mount(root: HTMLElement): void {
  const mark = (glyph: string, pull: string, claim: string) =>
    `<span ${claim} style="display: inline-block; margin-left: -${pull}">${glyph}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Marks" data-term="hung" data-value="hung" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-inline" value="inline">inline</button>
            <button class="sp-segment" data-part="seg-hung" value="hung">hung</button>
          </sp-segmented>
        </div>
        <div style="position: relative; margin-top: 12px; padding-left: 22px; height: 168px">
          <span data-part="guide" class="sp-context" aria-hidden="true"
                style="position: absolute; left: 22px; top: 0; bottom: 0; width: 2px; background: color-mix(in oklab, var(--sp-accent) 55%, transparent)"></span>
          <div data-part="column" data-hung style="font-family: ${FACE}; font-size: 18px; line-height: 1.55; white-space: nowrap">
            <div>${mark('&ldquo;', QUOTE_PULL, 'data-part="quote" data-subject data-pose="[data-hung]" data-hung')}${LINES[0]}</div>
            <div>${LINES[1]}</div>
            <div>${LINES[2]}&rdquo;</div>
            <div style="height: 10px"></div>
            ${ITEMS.map((item, i) => `<div>${mark('-&nbsp;', HYPHEN_PULL, `data-part="dash-${i}"`)}${item}</div>`).join('')}
          </div>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="display: block; margin-top: 8px">${READS.hung}</span>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const quote = part(root, 'quote');
  const dashes = [part(root, 'dash-0'), part(root, 'dash-1')];
  const readout = part(root, 'readout');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    const hung = value === 'hung';
    flag(column, 'data-hung', hung);
    flag(quote, 'data-hung', hung);
    quote.style.marginLeft = hung ? `-${QUOTE_PULL}` : '0';
    for (const dash of dashes) dash.style.marginLeft = hung ? `-${HYPHEN_PULL}` : '0';
    readout.textContent = READS[value];
  });
}
