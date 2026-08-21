import { part } from '#src/kit/parts.ts';

const TEXT =
  'The eye reads a line, sweeps back to the left edge, and drops one line down. The longer that sweep, the more often it lands on the line it just read, and the reader has to find their place again, halfway through a sentence.';

/**
 * Measure specimen: one paragraph set three times, at 45, 66, and 95 characters per
 * line, with the type size held constant so the only thing changing is the width. The
 * measures are stated in `ch` and the page is sized in `ch` too, so a label can never
 * drift from the column it names.
 *
 * The subject is the 66 character column, the measure Bringhurst calls ideal: the term
 * names one column's width, so the narrowest thing it names is a column and not the
 * comparison. The cramped and over-wide columns are what that column is read against,
 * so they are scenery (SPEC §5). Nothing here changes state, so nothing needs reserving.
 *
 * Nothing changes, so the pass ends at its mount state and the tree persists across attract
 * iterations (`data-loop="keep"`), measurement included.
 */
export function mount(root: HTMLElement): void {
  const column = (cpl: number, note: string, subject = false) => `
    <div class="sp-stack" style="gap: 3px">
      <span class="sp-label sp-context">${cpl} characters · ${note}</span>
      <p class="sp-prose" data-part="col-${cpl}" data-cpl="${cpl}"${subject ? ' data-ideal data-subject' : ''}
         style="font-size: 10px; --sp-measure: ${cpl}ch; margin: 0">${TEXT}</p>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" data-part="page" style="font-size: 10px; padding: 16px 15px; width: calc(95ch + 30px)">
        <span class="sp-heading sp-context" style="font-size: 14px">One paragraph, three measures</span>
        <div class="sp-stack" style="gap: 12px; margin-top: 12px">
          <div class="sp-context">${column(45, 'the rag turns violent')}</div>
          ${column(66, "Bringhurst's ideal", true)}
          <div class="sp-context">${column(95, 'the return sweep misses')}</div>
        </div>
      </div>
    </div>
  `;

  // The claim a static specimen would otherwise leave unproven: the columns widen in the
  // order their labels say, so the `ch` unit did the work rather than the words.
  const width = (cpl: number) => part(root, `col-${cpl}`).getBoundingClientRect().width;
  if (width(45) < width(66) && width(66) < width(95)) part(root, 'page').dataset.ordered = '';
}
