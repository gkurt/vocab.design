import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The tuned setting: the same words with the breaks chosen by hand, which is what
 * tuning a rag actually is. The running text is joined from these lines rather
 * than written twice, so the two settings cannot drift into different words.
 */
const TUNED = [
  'The harbour road turns inland after',
  'the last of the boat sheds, and from',
  'there it climbs for a mile',
  'through gorse before the water comes',
  'back into view, wider now and',
  'the colour of slate.',
];
const TEXT = TUNED.join(' ');

const COLUMN = 210;
const LINE_PX = 20;
/** The room the untuned setting takes, held by both, so a rebreak moves nothing below. */
const ROWS = 7;

const NOTES: Record<string, string> = {
  auto: 'Breaks left to the browser.',
  tuned: 'The same words, broken by hand.',
};

/**
 * Rag specimen: one flush-left column with its line ends tinted, so the right
 * edge is drawn by the text itself rather than by a line the demo made up. An
 * inline background paints each line box exactly as far as that line got, which
 * is the rag, and nothing has to be measured to show it.
 *
 * The running text is ordinary body copy. It used to be a paragraph explaining
 * what a rag is, which put the article's voice inside the specimen: a reader who
 * has not read the article is looking at a column of type that talks about
 * itself. Beside it stood a "what to look for" legend naming a hole and a
 * staircase; that is the article's job too, so it went with it and the window
 * narrowed to the column it holds.
 *
 * The subject is the ragged column. The term names the edge of a set paragraph,
 * and the edge has no element of its own, so the paragraph is the narrowest thing
 * that is it. The readout changes with the switch, so it is the stage's verdict
 * and is drawn out in the strip (SPEC §5.1). The column sits in a box holding the
 * taller of the two settings, so rebreaking moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 250px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Line breaks" data-value="auto">
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" data-part="seg-tuned" value="tuned">tuned</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start">
          <div style="flex: 0 0 ${COLUMN}px; height: ${LINE_PX * ROWS}px">
            <p data-part="column" data-subject data-breaks="auto"
               style="margin: 0; font-size: 13px; line-height: ${LINE_PX}px; text-align: left">
              <span data-part="tint" style="background: var(--sp-accent-soft)">${TEXT}</span>
            </p>
          </div>
        </div>
        <span class="sp-text" data-stage-verdict data-part="readout"></span>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const tint = part(root, 'tint');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    column.dataset.breaks = value;
    tint.innerHTML = value === 'tuned' ? TUNED.join('<br>') : TEXT;
    readout.textContent = note;
  };

  apply('auto');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
