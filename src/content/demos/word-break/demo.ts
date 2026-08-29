import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A string with no break opportunity anywhere in it, in a column too narrow to
 * hold it. Deliberately free of hyphens and slashes: a browser breaks after both,
 * so a token spelled with them would quietly wrap on its own and demonstrate
 * nothing. A hash is the honest case, and the one layouts actually meet.
 */
const TOKEN = '2f9ce1a488b04d17a3fe05c99b1d24e6';
const BODY = `Receipt archived under ${TOKEN} for the accounting department.`;
const COLUMN = 148;
const LINE = 18;
/** Room for the tallest setting, so a rebreak cannot move the scenery below it. */
const LINES = 6;

const SETTINGS: Record<string, { wrap: string; brk: string; css: string; note: string }> = {
  normal: {
    wrap: 'normal',
    brk: 'normal',
    css: 'no permission given',
    note: 'The token has no break opportunity in it, so the line runs straight out of the column.',
  },
  'break-word': {
    wrap: 'break-word',
    brk: 'normal',
    css: 'overflow-wrap: break-word',
    note: 'Splits only the word that cannot fit on a line of its own. Every other word stays whole.',
  },
  'break-all': {
    wrap: 'normal',
    brk: 'break-all',
    css: 'word-break: break-all',
    note: 'Splits wherever the line runs out, so ordinary words are chopped as readily as the token.',
  },
};

/**
 * Word break specimen: one narrow column holding a string with no break opportunity
 * in it, set three ways. The dashed rule is the column edge, so the `normal` state
 * can be seen bursting past it rather than merely reported; the slot around the
 * column is wide enough to show the burst and clips what runs past that, which is
 * exactly what a real layout does one box further out.
 *
 * The subject is the column. Two of its three states are the term doing its work and
 * the third is the problem the term exists for, so the honest condition is declared
 * in `data-pose` (SPEC §6): identify refuses to ring the overflowing column, and the
 * specimen mounts contained. The box reserves the room the tallest setting needs, so
 * a rebreak moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Unbreakable string</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Setting" data-part="segmented" data-value="break-word">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-break-word" value="break-word">break-word</button>
            <button class="sp-segment" data-part="seg-break-all" value="break-all">break-all</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">column: ${COLUMN}px</span>
            <div data-part="slot" style="width: 232px; height: ${LINE * LINES}px; overflow: hidden">
              <div style="width: ${COLUMN}px; height: 100%; border-right: 1px dashed var(--sp-line)">
                <p class="sp-text sp-text--ink" data-part="column" data-subject data-break="break-word"
                   data-contained data-pose="[data-contained]"
                   style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${LINE}px;
                          overflow-wrap: break-word">${BODY}</p>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 152px">
            <!-- Two lines' room: the longest declaration wraps, and a shorter one must not
                 pull the note under it up (SPEC §5). -->
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 36px"></span>
            <p class="sp-text" data-part="readout" style="margin: 0; font-size: 12px; height: 72px"></p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Break-word waits until a word cannot fit at all. Break-all stops waiting, which is right for a
          column of identifiers and wrong for prose.
        </p>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const readout = part(root, 'readout');
  const css = part(root, 'css');

  const apply = (value: string) => {
    const setting = SETTINGS[value];
    if (!setting) return;
    column.dataset.break = value;
    column.style.overflowWrap = setting.wrap;
    column.style.wordBreak = setting.brk;
    if (value === 'normal') column.removeAttribute('data-contained');
    else column.setAttribute('data-contained', '');
    css.textContent = setting.css;
    readout.textContent = setting.note;
  };

  apply('break-word');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
