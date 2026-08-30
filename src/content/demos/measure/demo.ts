import { part } from '#src/kit/parts.ts';

const TEXT =
  'The harbour road stays shut until the tide falls, so every ferry this week leaves from the north pier instead. Crews expect to reopen the lower lane on Thursday morning, and the timetable posted at the terminal already carries the change.';

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
 *
 * The copy is a notice a real page would print, not prose about reading: the paragraph used
 * to describe the return sweep, which is the article's job and read as the site talking
 * inside the frame. The labels once carried a verdict each ("the rag turns violent",
 * "Bringhurst's ideal", "the return sweep misses") and the window a heading, "One paragraph,
 * three measures"; those went the same way, leaving the labels stating only the width they
 * set, which is the one thing the columns cannot say themselves.
 */
export function mount(root: HTMLElement): void {
  const column = (cpl: number, subject = false) => `
    <div class="sp-stack" style="gap: 3px">
      <span class="sp-label sp-context">${cpl} characters</span>
      <p class="sp-prose" data-part="col-${cpl}" data-cpl="${cpl}"${subject ? ' data-ideal data-subject' : ''}
         style="font-size: 10px; --sp-measure: ${cpl}ch; margin: 0">${TEXT}</p>
    </div>
  `;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" data-part="page" style="font-size: 10px; padding: 16px 15px; width: calc(95ch + 30px)">
        <div class="sp-stack" style="gap: 14px">
          <div class="sp-context">${column(45)}</div>
          ${column(66, true)}
          <div class="sp-context">${column(95)}</div>
        </div>
      </div>
    </div>
  `;

  // The claim a static specimen would otherwise leave unproven: the columns widen in the
  // order their labels say, so the `ch` unit did the work rather than the words.
  const width = (cpl: number) => part(root, `col-${cpl}`).getBoundingClientRect().width;
  if (width(45) < width(66) && width(66) < width(95)) part(root, 'page').dataset.ordered = '';
}
