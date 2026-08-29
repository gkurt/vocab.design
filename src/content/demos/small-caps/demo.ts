const LEAD = 'The findings were filed with ';
const ACRONYM = 'NASA';
const TAIL = ' at 9 AM and the archive went public the same week.';

/**
 * Small caps specimen: one sentence twice, differing only in how its acronym is
 * set. The subject is the run of small caps, not the paragraph, because the
 * term names the letters rather than the text they sit in.
 *
 * The kit typeface ships no small-cap glyphs, so the browser scales its
 * capitals instead. That is the honest state of this specimen and the caption
 * says it out loud rather than passing synthesis off as the real feature.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-stack sp-context" style="gap: 4px">
          <span class="sp-label">full capitals</span>
          <p class="sp-prose sp-text--ink" data-part="line-caps" style="margin: 0; max-width: none">
            ${LEAD}<span data-part="run-caps">${ACRONYM}</span>${TAIL}
          </p>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack" style="gap: 4px">
          <span class="sp-label sp-context">font-variant-caps: all-small-caps</span>
          <p class="sp-prose sp-text--ink" data-part="line-small" style="margin: 0; max-width: none">
            ${LEAD}<span data-part="run-small" data-subject style="font-variant-caps: all-small-caps">${ACRONYM}</span>${TAIL}
          </p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          This face carries no small-cap glyphs, so the browser is scaling its capitals. A face
          with true small caps would also thicken the strokes to match the lowercase.
        </p>
      </div>
    </div>
  `;
}
