import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Real references, so the specimen is a bibliography rather than an invented record. */
const ENTRIES = [
  'Bringhurst, Robert. The Elements of Typographic Style. Hartley &amp; Marks, 1992.',
  'Tschichold, Jan. The New Typography. University of California Press, 1995.',
  'Tufte, Edward. The Visual Display of Quantitative Information. Graphics Press, 1983.',
];

const COLUMN = 268;
const LINE = 17;
const INDENT = 26;
/** Room for the tallest of the three shapes, so a rebreak moves nothing (SPEC §5). */
const SLOT = 142;

/** The three shapes a paragraph indent comes in, written as the declarations that make them. */
const SHAPES: Record<string, { pad: number; indent: number; css: string[] }> = {
  hanging: { pad: INDENT, indent: -INDENT, css: [`padding-inline-start: ${INDENT}px`, `text-indent: -${INDENT}px`] },
  first: { pad: 0, indent: INDENT, css: [`text-indent: ${INDENT}px`] },
  none: { pad: 0, indent: 0, css: ['text-indent: 0'] },
};

/**
 * Hanging indent specimen: three real references under a guide drawn down the
 * indent position, with a segmented control picking which of the three shapes a
 * paragraph indent can take. Hanging puts the surname out to the left of the
 * guide and everything after it against the guide, a first-line indent does the
 * reverse, and none lines everything up flush.
 *
 * The subject is the first entry, not the list: a hanging indent is a property of
 * one paragraph, and every entry here has its own. Two of the three states are
 * the opposite of the term, so the honest condition is declared in `data-pose`
 * (SPEC §6): identify refuses to ring an entry that is not hanging, and the
 * specimen mounts hanging. The guide, the declarations and the caption are the
 * demo's own instrumentation and stay outside the subject.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Three references</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="hanging" data-axis="Indent" data-term="hanging">
            <button class="sp-segment" data-part="seg-hanging" value="hanging">hanging</button>
            <button class="sp-segment" data-part="seg-first" value="first">first line</button>
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div style="position: relative; width: ${COLUMN}px; height: ${SLOT}px">
            <span data-part="guide" style="position: absolute; left: ${INDENT}px; top: -4px; height: 130px; width: 2px;
                  background: color-mix(in oklab, var(--sp-accent) 45%, transparent)"></span>
            <ul class="sp-stack" data-part="list" style="gap: 10px; margin: 0; padding: 0; list-style: none">
              ${ENTRIES.map(
                (text, i) => `
                  <li data-part="entry" data-indent="hanging"${i === 0 ? ' data-subject data-pose="[data-indent=hanging]"' : ''}
                      style="font-size: 12px; line-height: ${LINE}px; padding-inline-start: ${INDENT}px;
                             text-indent: -${INDENT}px">${text}</li>`,
              ).join('')}
            </ul>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 128px">
            <!-- Room for both declarations from mount, so a shape that needs only one
                 cannot pull the caption upwards (SPEC §5). -->
            <span class="sp-label">the declaration</span>
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 64px; display: block"></span>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          The rule marks the indent. Hanging leaves the surname out to its left, which is the whole
          point: the column you scan down has nothing in front of it.
        </p>
      </div>
    </div>
  `;

  const css = part(root, 'css');

  const apply = (value: string) => {
    const shape = SHAPES[value];
    if (!shape) return;
    for (const entry of partsOf(root, 'entry')) {
      entry.dataset.indent = value;
      entry.style.paddingInlineStart = `${shape.pad}px`;
      entry.style.textIndent = `${shape.indent}px`;
    }
    css.innerHTML = shape.css.map((line) => `<span style="display: block">${line}</span>`).join('');
  };

  apply('hanging');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
