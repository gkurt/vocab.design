import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LEAD =
  'Set a column narrow enough and a paragraph will eventually break where nobody wanted it to, leaving the closing thought stranded';
const LAST = 'afterwards.';
/** The word without its full stop, which is what the readout counts. */
const WORD = LAST.slice(0, -1);

/**
 * The two measures, found by walking this copy across the range rather than
 * guessed: between 295px and 310px the closing word cannot fit on the third line
 * and is stranded on a fourth, and from 315px up it rejoins the line above.
 */
const NARROW = 303;
const WIDE = 342;

const MODES: Record<string, { measure: number; note: string }> = {
  runt: { measure: NARROW, note: `one word alone: "${WORD}", ${WORD.length} characters` },
  fixed: { measure: WIDE, note: 'a wider measure pulls it back up' },
};

const LINE = 22;
/** Room for the taller arrangement, so changing the measure moves nothing below (SPEC §5). */
const SLOT = 4 * LINE + 6;

/**
 * Runt specimen: one justified paragraph whose last line carries a single word,
 * and the same words set to a wider measure so the stub is pulled back up.
 * Justified copy makes the point hardest: every line but the last is flush on
 * both sides, so the lone word at the end is the only ragged thing in the block.
 *
 * The subject is the stranded word itself, which is what the term names. One of
 * the two states is the fix rather than the term, so the honest condition is
 * declared in `data-pose` (SPEC §6) and the specimen mounts stranded. The picker,
 * the readout and the caption are the demo's own instrumentation and stay in the
 * context register. The column holds the wider measure's room at both settings,
 * so the block never shifts sideways and nothing below it moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">The last line</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="runt">
            <button class="sp-segment" data-part="seg-runt" value="runt">runt</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">fixed</button>
          </sp-segmented>
        </div>
        <div style="width: ${WIDE}px; height: ${SLOT}px; margin-top: 10px">
          <p data-part="para" data-mode="runt"
             style="margin: 0; width: ${NARROW}px; font-size: 14px; line-height: ${LINE}px; text-align: justify">${LEAD}
            <span data-part="last" data-subject data-runt data-pose="[data-runt]">${LAST}</span></p>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="height: 18px; margin-top: 6px">
          <span class="sp-label" data-part="measure" style="font-variant-numeric: tabular-nums"></span>
          <span class="sp-label" data-part="note" style="color: var(--sp-ink)"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          Nothing is broken here: the browser filled every line and this is what was left over. A
          paragraph is a shape too, and one that ends in a stub reads as cut off.
        </p>
      </div>
    </div>
  `;

  const para = part(root, 'para');
  const last = part(root, 'last');
  const measure = part(root, 'measure');
  const note = part(root, 'note');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    para.dataset.mode = value;
    para.style.width = `${mode.measure}px`;
    flag(last, 'data-runt', value === 'runt');
    measure.textContent = `measure ${mode.measure}px`;
    note.textContent = mode.note;
  };

  apply('runt');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
