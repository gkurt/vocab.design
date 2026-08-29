import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const COLUMN = 400;
/** Two ems of the prose size: the traditional indent, and big enough to be seen at 13px. */
const INDENT = 26;
const LINE = 18;
/** Room for the tallest arrangement (indent plus a blank line), so a pick moves nothing (SPEC §5). */
const SLOT = 152;

/** The three ways the boundary between two paragraphs can be marked, and what each costs. */
const MODES: Record<string, { indent: boolean; space: boolean; css: string; note: string }> = {
  indent: { indent: true, space: false, css: 'p + p { text-indent: 2em }', note: 'marked once' },
  space: { indent: false, space: true, css: 'p + p { margin-block-start: 0.8em }', note: 'marked once, the other way' },
  both: { indent: true, space: true, css: 'text-indent and margin-block-start', note: 'marked twice: redundant' },
};

/**
 * First-line indent specimen: three paragraphs of running prose under a heading,
 * with a guide dropped down the indent position. The opening paragraph is flush,
 * because there is nothing above it to be separated from, and every paragraph
 * after it starts at the guide. The segmented control picks how the boundary is
 * marked, an absolute pick rather than a flip, and `both` is the redundant case
 * the note calls out.
 *
 * The subject is the indent itself, traced by a box the width of the indent and the
 * height of one line at the start of the second paragraph. The term names that gap, not
 * the block that declares it, and a gap has no element of its own, so the demo gives it
 * one sized to its extent (SPEC §5). It rides inside the paragraph, so no measurement is
 * needed: the paragraph's own top left corner is where the indent starts. Two of the three
 * states leave the block flush, which closes the gap to nothing, so the honest condition is
 * declared in `data-pose` (SPEC §6) and the specimen mounts indented. The guide, the
 * declaration, the note and the caption are the demo's own instrumentation.
 */
export function mount(root: HTMLElement): void {
  const body = [
    'The opening paragraph is set flush. Nothing sits above it here, so a notch would mark a boundary that is not there.',
    'Every paragraph after it opens one indent in. The eye catches that notch and reads a new thought beginning.',
    'A blank line would say the same thing twice. One marker is enough, which is why the two are alternatives.',
  ];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Marked with" data-term="indent" data-value="indent" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-indent" value="indent">indent</button>
            <button class="sp-segment" data-part="seg-space" value="space">space</button>
            <button class="sp-segment" data-part="seg-both" value="both">both</button>
          </sp-segmented>
        </div>
        <div style="position: relative; width: ${COLUMN}px; height: ${SLOT}px; margin-top: 10px">
          <span data-part="guide" style="position: absolute; left: ${INDENT}px; top: 0; height: ${SLOT}px; width: 2px;
                background: color-mix(in oklab, var(--sp-accent) 45%, transparent)"></span>
          <div data-part="prose" data-mode="indent" style="position: relative; font-size: 13px; line-height: ${LINE}px">
            <h4 class="sp-heading sp-context" style="margin: 0 0 6px; font-size: 13px; line-height: 17px">Setting a paragraph</h4>
            ${body
              .map(
                (text, i) => `
                  <p data-part="para-${i + 1}"${i === 1 ? ' data-indent' : ''}
                     style="position: relative; margin: 0; text-indent: ${i === 0 ? 0 : INDENT}px">${
                       i === 1
                         ? `<span data-part="indent-trace" data-subject data-indent data-pose="[data-indent]" aria-hidden="true"
                                  style="position: absolute; left: 0; top: 0; width: ${INDENT}px; height: ${LINE}px; pointer-events: none;
                                         background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`
                         : ''
}${text}</p>`,
              )
              .join('')}
          </div>
        </div>
        <!-- One line each, never wrapped: the row's height is reserved, so a longer
             declaration must not grow it and push the caption (SPEC §5). -->
        <div class="sp-row sp-row--between sp-context" style="height: 18px; margin-top: 8px">
          <span class="sp-label" data-part="css" style="color: var(--sp-ink); white-space: nowrap"></span>
          <span class="sp-label" data-stage-verdict data-part="note" style="white-space: nowrap"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin: 8px 0 0">
          The first paragraph after a heading stays flush. An indent and a blank line are alternatives,
          never partners.
        </p>
      </div>
    </div>
  `;

  const prose = part(root, 'prose');
  const css = part(root, 'css');
  const note = part(root, 'note');
  const second = part(root, 'para-2');
  const trace = part(root, 'indent-trace');
  const third = part(root, 'para-3');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    prose.dataset.mode = value;
    for (const para of [second, third]) {
      para.style.textIndent = mode.indent ? `${INDENT}px` : '0';
      para.style.marginTop = mode.space ? '10px' : '0';
    }
    flag(second, 'data-indent', mode.indent);
    trace.style.width = mode.indent ? `${INDENT}px` : '0';
    flag(trace, 'data-indent', mode.indent);
    css.textContent = mode.css;
    note.textContent = mode.note;
  };

  apply('indent');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
