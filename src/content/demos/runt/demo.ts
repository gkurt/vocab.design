import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LEAD =
  'The harbour master keeps a notebook of arrivals, and every entry is set down in the same unhurried hand, right down to the weather';
const LAST = 'outside.';
/** The word without its full stop, which is what the readout counts. */
const WORD = LAST.slice(0, -1);

/**
 * The two measures, found by walking this copy across the range rather than
 * guessed: between 311px and 321px the closing word cannot fit on the third line
 * and is stranded on a fourth, and from 322px up it rejoins the line above. Both
 * numbers belong to this exact copy, so changing a word means walking it again.
 */
const NARROW = 316;
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
 * declared in `data-pose` (SPEC §6) and the specimen mounts stranded. The picker
 * and the readout are the demo's own instrumentation and stay in the context
 * register.
 *
 * The copy used to be about runts ("Set a column narrow enough and a paragraph will
 * eventually break where nobody wanted it to"), and a caption under it explained that
 * nothing was broken. A paragraph in a type specimen is ordinary prose, and the
 * specimen already has a verdict in the strip, so the copy is ordinary now and the
 * caption is gone. A figure beside the verdict printed the column's own width ("measure
 * 316px"): nothing in the scene is a ruler, so that was the site measuring its exhibit for
 * the reader, and the width is what the block is. It is gone too. The column holds the wider measure's room at both settings,
 * so the block never shifts sideways and nothing below it moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Last line" data-term="runt" data-part="segmented" data-value="runt">
            <button class="sp-segment" data-part="seg-runt" value="runt">runt</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">fixed</button>
          </sp-segmented>
        </div>
        <div style="width: ${WIDE}px; height: ${SLOT}px; margin-top: 10px">
          <p data-part="para" data-mode="runt"
             style="margin: 0; width: ${NARROW}px; font-size: 14px; line-height: ${LINE}px; text-align: justify">${LEAD}
            <span data-part="last" data-subject data-runt data-pose="[data-runt]">${LAST}</span></p>
        </div>
        <span class="sp-label" data-stage-verdict data-part="note" style="color: var(--sp-ink)"></span>
      </div>
    </div>
  `;

  const para = part(root, 'para');
  const last = part(root, 'last');
  const note = part(root, 'note');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    para.dataset.mode = value;
    para.style.width = `${mode.measure}px`;
    flag(last, 'data-runt', value === 'runt');
    note.textContent = mode.note;
  };

  apply('runt');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
