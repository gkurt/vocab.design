import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Answer = 'yes' | 'no';

const PAGES = [
  { title: 'Adding a second card', widths: [92, 78, 86, 64] },
  { title: 'Refunds and chargebacks', widths: [84, 90, 71, 80] },
  { title: 'Exporting your statements', widths: [88, 74, 92, 68] },
];

/** Every read is taken modulo the list's length, so a page is always there. */
const pageAt = (index: number) => PAGES[index % PAGES.length] as (typeof PAGES)[number];

const THANKS: Record<Answer, string> = {
  yes: 'Thanks. Recorded against this page and nothing else is asked.',
  no: 'Thanks. This page goes on the list to rewrite.',
};

const NOTE: Record<'asking' | Answer, string> = {
  asking: 'One question, at the foot of the page it is about. The answer is given here, not on a survey page somewhere else.',
  yes: 'The question is replaced by the answer in the box it already had, so nothing under the reader moves and the survey is over.',
  no: 'The unhappy answer stays in the product and goes to the people who write the page. Nothing about it is public.',
};

/**
 * Microsurvey specimen: one question at the foot of a help page, answered in place. The
 * answer replaces the question inside the same box, which is the mechanic the term is
 * about: no page, no modal, no second screen.
 *
 * The subject is the survey panel. It is a microsurvey while it asks and still one while
 * it thanks, so no `data-pose` is needed and identify is honest at every resting state
 * (SPEC §6). The article above it, the next-page control and the note line are scenery
 * (SPEC §5): moving to the next page is what makes the question come back, since a real
 * one is asked per page rather than per session.
 *
 * The panel holds one height and one width in all three states, its two layers stacked in
 * the same reserved box, so answering resizes and moves nothing (SPEC §5). Each answer
 * reaches its own named state rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%"></div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Help centre</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="next-page" type="button" style="flex: 0 0 auto">Next page</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-context" data-part="article" data-page="1">
            <div class="sp-heading" data-part="article-title" style="font-size: 13px">${pageAt(0).title}</div>
            <div class="sp-stack" data-part="article-lines" style="margin-top: 10px">${lines(pageAt(0).widths)}</div>
          </div>
          <div
            class="sp-surface"
            data-part="survey"
            data-subject
            data-state="asking"
            style="position: relative; margin-top: auto; height: 66px; background: var(--sp-surface)"
          >
            <div class="sp-row sp-row--between" data-part="ask" style="position: absolute; inset: 12px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">Was this page helpful?</span>
              <div class="sp-row" style="gap: 8px">
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-yes" type="button" style="flex: 0 0 auto">Yes</button>
                <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-no" type="button" style="flex: 0 0 auto">Not really</button>
              </div>
            </div>
            <div class="sp-row" data-part="thanks" hidden style="position: absolute; inset: 12px; gap: 8px">
              ${icon('check')}
              <span class="sp-text sp-text--ink" data-part="thanks-text" style="font-size: 12px">${THANKS.yes}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${NOTE.asking}</span>
    </div>
  `;

  const survey = part(root, 'survey');
  const ask = part(root, 'ask');
  const thanks = part(root, 'thanks');
  const thanksText = part(root, 'thanks-text');
  const article = part(root, 'article');
  const title = part(root, 'article-title');
  const articleLines = part(root, 'article-lines');
  const note = part(root, 'note');

  const answer = (which: Answer) => {
    survey.dataset.state = which;
    thanksText.textContent = THANKS[which];
    flag(ask, 'hidden', true);
    flag(thanks, 'hidden', false);
    note.textContent = NOTE[which];
  };

  part(root, 'answer-yes').addEventListener('click', () => answer('yes'));
  part(root, 'answer-no').addEventListener('click', () => answer('no'));

  // A real microsurvey is asked per page, so turning the page is what brings the question
  // back. The state is named rather than toggled: this always reaches "asking".
  part(root, 'next-page').addEventListener('click', () => {
    const page = (Number(article.dataset.page) % PAGES.length) + 1;
    article.dataset.page = String(page);
    title.textContent = pageAt(page - 1).title;
    articleLines.innerHTML = lines(pageAt(page - 1).widths);
    survey.dataset.state = 'asking';
    flag(ask, 'hidden', false);
    flag(thanks, 'hidden', true);
    note.textContent = NOTE.asking;
  });
}
