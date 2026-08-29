/*
 * The two faces this specimen is built out of. The kit is sans-only on purpose
 * (SPEC §5), so a demo whose term *is* a typeface has to declare a stack of its
 * own: a serif specimen set in the kit's face would be demonstrating nothing.
 * Named families first, generic last, so the pair still contrasts on a machine
 * that has neither.
 */
const SERIF = "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
const SANS = "Helvetica, 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif";
const WORD = 'Handgloves';

/**
 * Serif specimen: one letter blown up beside its sans counterpart, which is the
 * only size at which a finishing stroke is visible at all, and the traditional
 * specimen word under each so the class can be read in running text too.
 *
 * The subject is the serif letterform. A serif is a stroke ending and there is
 * no element for a stroke, so the glyph that carries them is the narrowest thing
 * the stage can ring.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="gap: 18px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">serif</span>
            <span data-part="glyph-serif" data-subject
                  style="font-family: ${SERIF}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-serif" style="font-family: ${SERIF}; font-size: 21px">${WORD}</span>
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">sans-serif</span>
            <span data-part="glyph-sans" style="font-family: ${SANS}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-sans" style="font-family: ${SANS}; font-size: 21px">${WORD}</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The short strokes closing the top of the stem, the foot, and the end of the leg are the
          serifs. On the face beside it the strokes simply stop.
        </p>
      </div>
    </div>
  `;
}
