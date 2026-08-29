import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The tuned setting: the same words with the breaks chosen by hand, which is what
 * tuning a rag actually is. The running text is joined from these lines rather
 * than written twice, so the two settings cannot drift into different words.
 */
const TUNED = [
  'Set flush left and the right edge is',
  'free to be uneven. The',
  'trouble starts when it stops looking',
  'accidental: two short lines',
  'together punch a hole, and a long,',
  'short, long beat makes a staircase.',
];
const TEXT = TUNED.join(' ');

const COLUMN = 210;
const LINE_PX = 20;
/** The room the untuned setting takes, held by both, so a rebreak moves nothing below. */
const ROWS = 7;

const NOTES: Record<string, string> = {
  auto: 'Four lines step in by about the same amount: a staircase down the margin.',
  tuned: 'The same words, broken by hand: still uneven, with no step to follow.',
};

/**
 * Rag specimen: one flush-left column with its line ends tinted, so the right
 * edge is drawn by the text itself rather than by a line the demo made up. An
 * inline background paints each line box exactly as far as that line got, which
 * is the rag, and nothing has to be measured to show it.
 *
 * The subject is the ragged column. The term names the edge of a set paragraph,
 * and the edge has no element of its own, so the paragraph is the narrowest thing
 * that is it; the picker, the readout, and the two named failures are scenery
 * (SPEC §5). The column sits in a box holding the taller of the two settings, so
 * rebreaking cannot move the readout under it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Line breaks" data-value="auto">
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" data-part="seg-tuned" value="tuned">tuned</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div style="flex: 0 0 ${COLUMN}px; height: ${LINE_PX * ROWS}px">
            <p data-part="column" data-subject data-breaks="auto"
               style="margin: 0; font-size: 13px; line-height: ${LINE_PX}px; text-align: left">
              <span data-part="tint" style="background: var(--sp-accent-soft)">${TEXT}</span>
            </p>
          </div>
          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <span class="sp-label">what to look for</span>
            <span class="sp-text" style="font-size: 12px">a staircase: lines stepping in evenly</span>
            <span class="sp-text" style="font-size: 12px">a hole: two short lines together</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="height: 42px; margin-top: 4px; align-items: flex-start">
          <span class="sp-text" data-part="readout"></span>
        </div>
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
