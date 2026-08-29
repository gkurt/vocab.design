import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Soft hyphens (U+00AD) mark the permitted breaks inside the long words, so the
 * demonstration holds on a browser with no dictionary for the declared language:
 * `hyphens: auto` honours them as well as its own dictionary, `hyphens: none`
 * ignores both. The column is set ragged rather than justified on purpose. The
 * rivers a justified column opens are that term's demonstration (see
 * justified-text); what this one is about is the word coming apart at the seam
 * and the rag closing up behind it.
 */
const S = '­';
const BODY =
  `Un${S}hyphen${S}ated at a nar${S}row meas${S}ure, a word like ` +
  `in${S}com${S}pre${S}hen${S}si${S}ble drops whole and tears the col${S}umn open.`;
const COLUMN = 150;
const LINE_PX = 17;
/** The room the unhyphenated setting takes, held by the box so a rebreak moves nothing. */
const LINES = 6;

const NOTES: Record<string, string> = {
  none: 'Long words drop whole and the rag gapes.',
  auto: 'Breaks inside the words, so the lines even out.',
};

/**
 * Hyphenation specimen: one narrow ragged column, set twice by a segmented pick.
 * The dashed rule down the right edge is the measure, so the rag can be read
 * against the line the text is trying to reach.
 *
 * The subject is the column. In the `none` state the column is the opposite of
 * the term, which is the whole point of showing it, so the honest condition is
 * declared in `data-pose` (SPEC §6) and the specimen mounts hyphenated: identify
 * refuses to ring the unhyphenated setting and plays on until the pick comes
 * back round. The box holds the room the taller setting needs, so a rebreak
 * cannot move the scenery below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">hyphens</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="auto" data-axis="Breaks" data-term="auto">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">measure: ${COLUMN}px</span>
            <div data-part="measure" style="width: ${COLUMN}px; height: ${LINE_PX * LINES}px; border-right: 1px dashed var(--sp-line)">
              <p class="sp-text sp-text--ink" data-part="column" data-subject data-hyphens="auto"
                 data-pose="[data-hyphens=auto]" lang="en"
                 style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${LINE_PX}px;
                        -webkit-hyphens: auto; hyphens: auto">${BODY}</p>
            </div>
          </div>
          <p class="sp-text sp-context" data-part="readout" style="margin: 0; width: 96px; font-size: 12px"></p>
        </div>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <div class="sp-stack sp-context" data-part="ladder" style="gap: 2px">
          <span class="sp-label">a ladder: three breaks in a row, which a measure this narrow can produce</span>
          <span class="sp-text sp-text--ink" style="font-size: 12px; line-height: ${LINE_PX}px">un-<br />for-<br />tunate</span>
        </div>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    column.dataset.hyphens = value;
    column.style.setProperty('-webkit-hyphens', value);
    column.style.setProperty('hyphens', value);
    readout.textContent = note;
  };

  apply('auto');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
