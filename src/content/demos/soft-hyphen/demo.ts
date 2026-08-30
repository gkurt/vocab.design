import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif, since a conditional hyphen is a print convention and the kit is
 * sans-only on purpose (SPEC §5). Named families first, generic last.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";

/* The same word, spelled two legitimate ways: solid with a soft hyphen inside
   it, and with a real hyphen. U+00AD is written as the character itself so the
   demo carries no HTML entity into a text node it does not control. */
const SHY = 'The result was counter­intuitive.';
const HARD = 'The result was counter-intuitive.';

/** Narrow enough that the compound cannot fit on a line of its own. */
const WIDTHS: Record<string, number> = { narrow: 100, wide: 300 };
const SIZE = 16;
const NOTES: Record<string, string> = {
  narrow: 'The word has to break, so the soft hyphen is drawn.',
  wide: 'The word fits, so the soft hyphen draws nothing at all.',
};
const LINE_PX = 22;
/** The room the narrow setting takes, held by both wells so a rebreak moves nothing. */
const LINES = 3;

/**
 * Soft hyphen specimen: one sentence set twice, once with U+00AD inside the
 * compound and once with a real hyphen, at a width the reader can change. Narrow
 * enough and the soft hyphen appears at the line end; wide enough and it is not
 * there at all, while the real hyphen is there at every width because it is a
 * letter of the word rather than a permission.
 *
 * Both settings are `hyphens: manual`, which is the default: a soft hyphen needs
 * no CSS and no language dictionary, which is most of why it is worth knowing.
 *
 * The subject is the column carrying the soft hyphen. The term names a character
 * inside a word, and the narrowest thing that can show a character that only
 * sometimes exists is the text it is breaking; the hard-hyphen twin and the width
 * control are scenery. The column mounts narrow, the state where the character is
 * visible.
 *
 * The line under the columns ("The word has to break, so the soft hyphen is drawn.")
 * is the author reading the state rather than anything a document would print, and it
 * changes with the width switch, so it is a verdict: the stage draws it above the
 * controls (SPEC §5.1) and the specimen no longer reserves a row for it.
 */
export function mount(root: HTMLElement): void {
  const well = (name: string, text: string, note: string, subject: boolean) => `
    <div class="sp-stack" style="gap: 4px">
      <span class="sp-label sp-context">${note}</span>
      <div style="width: ${WIDTHS.wide}px; height: ${LINE_PX * LINES}px">
        <p class="sp-text sp-text--ink" data-part="${name}"${subject ? ' data-subject' : ''} data-width="narrow" lang="en"
           style="margin: 0; width: ${WIDTHS.narrow}px; font-family: ${FAMILY}; font-size: ${SIZE}px;
                  line-height: ${LINE_PX}px; -webkit-hyphens: manual; hyphens: manual">${text}</p>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Column width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="segmented" data-value="narrow">
            <button class="sp-segment" data-part="seg-narrow" value="narrow">narrow</button>
            <button class="sp-segment" data-part="seg-wide" value="wide">wide</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" style="gap: 10px; margin-top: 12px">
          ${well('shy', SHY, 'counter&shy;intuitive', true)}
          ${well('hard', HARD, 'counter-intuitive', false)}
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout"></span>
      </div>
    </div>
  `;

  const apply = (value: string) => {
    const width = WIDTHS[value];
    const note = NOTES[value];
    if (width === undefined || !note) return;
    for (const column of partsOf(root, 'shy').concat(partsOf(root, 'hard'))) {
      column.dataset.width = value;
      column.style.width = `${width}px`;
    }
    part(root, 'readout').textContent = note;
  };

  apply('narrow');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
