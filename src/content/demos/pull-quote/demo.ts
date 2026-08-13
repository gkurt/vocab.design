/*
 * A serif for the lifted sentence and its quote mark: display type is the whole
 * device, and the kit is sans-only on purpose (SPEC §5). Named families first,
 * generic last.
 */
const DISPLAY = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const LIFTED = 'The tide gauge had been drifting for months.';

/**
 * Pull quote specimen: an article column with one of its own sentences promoted
 * to display size. The promoted copy is a duplicate, so it carries
 * `aria-hidden` and a reader hears the sentence once, from the paragraph it
 * actually belongs to; the tint on that paragraph is what ties the two together.
 *
 * Nothing changes state: the pairing is the demonstration.
 *
 * The subject is the pull quote itself. The article around it is what the quote
 * was lifted out of, so it is scenery in the context register; ringing the
 * column would claim the term names the page.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-context">
          <span class="sp-label" data-part="kicker">Harbour Review, page 14</span>
          <p class="sp-text sp-text--ink" data-part="before" style="margin: 6px 0 0; font-size: 12px; line-height: 17px">
            The survey team spent three weeks on the pontoon.
            <span data-part="running" style="background: var(--sp-accent-soft)">${LIFTED}</span>
          </p>
        </div>
        <figure data-part="pull" data-subject aria-hidden="true"
                style="position: relative; margin: 12px 0; padding: 9px 0 10px 30px;
                       border-top: 2px solid var(--sp-accent); border-bottom: 1px solid var(--sp-line)">
          <span data-part="mark" style="position: absolute; left: 0; top: 5px; font-family: ${DISPLAY}; font-size: 40px;
                line-height: 1; color: var(--sp-accent)">&#8220;</span>
          <span style="display: block; font-family: ${DISPLAY}; font-size: 17px; line-height: 23px">${LIFTED}</span>
        </figure>
        <p class="sp-text sp-text--ink sp-context" data-part="after" style="margin: 0; font-size: 12px; line-height: 17px">
          Nobody had checked it against the staff gauge since spring, and the record went out weekly.
        </p>
      </div>
    </div>
  `;
}
