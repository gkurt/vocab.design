/*
 * The kit is sans-only on purpose (SPEC §5), and a sans family's "italic" is
 * usually an oblique or a synthesized shear, which is the very thing this
 * specimen has to hold the real one against. So the demo declares a serif stack
 * whose italic is genuinely drawn, named families first and the generic last.
 */
const SERIF = "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
const GLYPHS = 'aef';
const WORD = 'afterglow';

/**
 * Italic specimen: the same three letters set three ways. Upright on the left as
 * the reference, the family's drawn italic in the middle, and on the right the
 * upright skewed by hand, which is what a mechanical oblique (and a browser's
 * faux italic) amounts to. Only the middle column redraws the letters.
 *
 * The subject is the true italic setting. The term names a style of letterform
 * and there is no element for a letterform, so the block that carries the drawn
 * italic is the narrowest thing the stage can ring, and the two columns it is
 * judged against stay scenery.
 */
export function mount(root: HTMLElement): void {
  const sample = (name: string, style: string, subject = '') => `
    <div class="sp-stack" data-part="${name}" ${subject} style="gap: 2px; align-items: center">
      <span style="font-family: ${SERIF}; font-size: 52px; line-height: 1.15; ${style}">${GLYPHS}</span>
      <span style="font-family: ${SERIF}; font-size: 17px; ${style}">${WORD}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 450px">
        <div class="sp-row" style="gap: 14px; align-items: stretch">
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">roman</span>
            ${sample('sample-roman', '')}
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">true italic</span>
            ${sample('sample-italic', 'font-style: italic', 'data-subject')}
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">oblique (skewed)</span>
            ${sample('sample-oblique', 'transform: skewX(-12deg)')}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          In the drawn italic the a drops to a single storey, the e tips its bowl, and the f gains a
          descender. The skewed column leans at the same angle with the roman letters untouched.
        </p>
      </div>
    </div>
  `;
}
