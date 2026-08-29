/*
 * Same two stacks as the serif specimen, from the other side. The kit is sans-only
 * (SPEC §5), but this demo still declares both faces inline rather than borrowing
 * the kit's: the term is a typeface, so the comparison has to be stated in the
 * specimen and not inherited from whatever the stage happens to be set in.
 */
const SANS = "Helvetica, 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif";
const SERIF = "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
const WORD = 'Handgloves';

/**
 * Sans-serif specimen: the mirror of the serif one. The sans letterform leads and
 * the serif stands beside it as scenery, so the absence is what the reader is
 * pointed at rather than the presence.
 *
 * The subject is the sans letterform: the term names a face by what its stems do
 * at the ends, and the glyph is the narrowest element that shows it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="gap: 18px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">sans-serif</span>
            <span data-part="glyph-sans" data-subject
                  style="font-family: ${SANS}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-sans" style="font-family: ${SANS}; font-size: 21px">${WORD}</span>
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">serif</span>
            <span data-part="glyph-serif" style="font-family: ${SERIF}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-serif" style="font-family: ${SERIF}; font-size: 21px">${WORD}</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The stems end where they end: no bracket, no flare, no foot. Everything else about the
          two letters, the weight and the width and the skeleton, is a separate decision.
        </p>
      </div>
    </div>
  `;
}
