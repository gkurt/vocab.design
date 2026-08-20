import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LEAD = 'Every study of screen reading says the same thing.';
const QUOTE = 'People rarely read word by word. They scan, they pick, and they leave.';
const SOURCE = 'Field Notes on Reading, ch. 4';
const TRAIL = 'So the shape of a page matters as much as its words.';

/** Room for the taller of the two settings, so a pick moves nothing (SPEC §5). */
const ARTICLE = 126;
/** One measure for both settings, so only the quotation's treatment differs. */
const MEASURE = '--sp-measure: 44ch';

/**
 * Blockquote specimen: the same borrowed sentence set twice, once inside the
 * paragraph in typographic quotation marks and once lifted out into a block of
 * its own with its source attached. The pick is the editorial decision the term
 * is really about: at this length the marks stop holding the passage together,
 * so the shape takes over the job and the marks come off.
 *
 * The subject is the blockquote block, attribution included, because the
 * attribution is part of what is set off (SPEC §5): the term names the block,
 * not the sentence inside it and not the article around it. In the inline
 * setting there is no block, so the subject is off stage and identify summons it
 * (SPEC §6). The picker and the caption are the demo's own instrumentation and
 * stay in the context register.
 *
 * Both settings are laid into the same reserved box, top aligned, so switching
 * cannot move the caption under them.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">the quotation, set as</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="block">
            <button class="sp-segment" data-part="seg-inline" value="inline">inline</button>
            <button class="sp-segment" data-part="seg-block" value="block">a block</button>
          </sp-segmented>
        </div>
        <div style="height: ${ARTICLE}px; margin-top: 12px">
          <div class="sp-prose" data-part="view-block" style="${MEASURE}">
            <p style="margin: 0">${LEAD}</p>
            <blockquote data-part="quote" data-subject
                        style="margin: 10px 0; padding: 0 16px; border-left: 3px solid var(--sp-line)">
              ${QUOTE}
              <footer data-part="attribution" style="margin-top: 6px; font-size: 11px; color: var(--sp-muted)">
                ${SOURCE}
              </footer>
            </blockquote>
            <p style="margin: 0">${TRAIL}</p>
          </div>
          <div class="sp-prose" data-part="view-inline" style="${MEASURE}" hidden>
            <p style="margin: 0">
              ${LEAD} <span data-part="inline-quote">&#8220;${QUOTE}&#8221;</span>
              (${SOURCE}) ${TRAIL}
            </p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          A short quotation stays in the sentence. Once the marks are too far apart to hold the passage
          together, the shape takes over the job and the marks come off. The source travels with the block.
        </p>
      </div>
    </div>
  `;

  const views = { block: part(root, 'view-block'), inline: part(root, 'view-inline') };

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (value !== 'inline' && value !== 'block') return;
    flag(views.block, 'hidden', value === 'inline');
    flag(views.inline, 'hidden', value === 'block');
  });
}
