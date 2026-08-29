import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * One headline, written out twice. The strings are typed rather than transformed,
 * which is the article's point: `text-transform: capitalize` would raise "and",
 * "of" and "a" along with everything else.
 */
const CASES: Record<string, { line: string; note: string }> = {
  title: {
    line: 'The Rise and Fall of a Harbour with No Ships',
    note: 'and, of and a stay down. "with" is the edge: Chicago keeps it down, AP raises it.',
  },
  sentence: {
    line: 'The rise and fall of a harbour with no ships',
    note: 'The first word only, plus any name. The same line, one register quieter.',
  },
};

/** Two lines of room for the headline and two for the note, whichever is showing. */
const LINE_PX = 28;

/**
 * Title case specimen: the same headline under the two capitalisation rules, with
 * the menu row underneath where the convention still lives (Apple capitalises its
 * menu items, and "Move to Trash" keeps its two-letter preposition down).
 *
 * The subject is the headline. Sentence case is a counter-example the subject
 * itself passes through, so the honest condition is declared in `data-pose` and
 * the specimen mounts title cased (SPEC §6): identify refuses to ring the sentence
 * pick and plays on until the script comes back round. The headline box and the
 * note below it hold their room in both states (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 14px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="title" data-axis="Capitalisation" data-term="title">
            <button class="sp-segment" data-part="seg-title" value="title">Title</button>
            <button class="sp-segment" data-part="seg-sentence" value="sentence">sentence</button>
          </sp-segmented>
        </div>
        <div style="height: ${LINE_PX * 2}px; margin-top: 10px">
          <h3 data-part="headline" data-subject data-case="title" data-pose="[data-case=title]"
              style="margin: 0; font-size: 20px; font-weight: 600; line-height: ${LINE_PX}px">${CASES.title?.line}</h3>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 6px 0 0; height: 34px; font-size: 12px; line-height: 17px"></p>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <div class="sp-stack sp-context" data-part="menu" style="gap: 5px">
          <span class="sp-label">where the convention held: a menu</span>
          <div class="sp-row" style="gap: 4px">
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-save">Save As</span>
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-duplicate">Duplicate Window</span>
            <span class="sp-button sp-button--sm sp-button--quiet" data-part="menu-trash">Move to Trash</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const headline = part(root, 'headline');
  const note = part(root, 'note');

  const apply = (value: string) => {
    const chosen = CASES[value];
    if (!chosen) return;
    headline.dataset.case = value;
    headline.textContent = chosen.line;
    note.textContent = chosen.note;
  };

  apply('title');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
