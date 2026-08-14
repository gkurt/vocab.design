import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked against the stack that actually loads. Neither Geist Variable (the kit
 * face) nor the chrome serif applies `sups`, `subs` or `ordn`: a run set with
 * `font-variant-position: super` measures exactly the width and height of the same
 * run set plain, so no glyph is being substituted and nothing is being synthesized.
 * Rather than screenshot a declaration doing nothing and call it superscript, the
 * specimen offers both settings, shows the real result of each, and says which one
 * is doing the work here.
 */
const RAISED = {
  /** Size, shift, and the zeroed line-height that keeps the line box from growing. */
  css: 'font-size: 0.68em; line-height: 0; position: relative; top: -0.46em; vertical-align: baseline',
  variant: 'font-variant-position: super',
} as const;

const NOTES: Record<string, string> = {
  css: 'font-size 0.68em, a baseline shift, and line-height 0 so the line box does not grow.',
  variant: 'font-variant-position: super, which does nothing here: neither face this page loads ships sups glyphs.',
};

/** The line's leading, drawn as rules so a grown line box is visible against them. */
const LEADING = 1.3;
const RULED =
  'Sales rose 3%<sup style="STYLE">1</sup> again in the second half, the fourth such rise<sup style="STYLE">2</sup> in a row of five.';

/**
 * Superscript specimen: one line using all three raised jobs (a footnote marker, an
 * ordinal, an exponent), set either by the OpenType feature or by the CSS fallback.
 * Below, in the scenery, the reason the fallback carries three declarations rather
 * than one: `vertical-align: super` alone grows the line box, and the ruled column
 * on the left drifts off its own rhythm where a marker lands.
 *
 * The subject is the line. Superscript names the raised characters and the line they
 * sit in, not the comparison around it. The feature setting renders nothing raised
 * in this stack, which is the honest finding and also a state where the subject is
 * not the term, so the condition is declared in `data-pose` (SPEC §6): identify
 * refuses to pose it and the specimen mounts on the fallback.
 */
export function mount(root: HTMLElement): void {
  const ruled = (style: string) => RULED.replaceAll('STYLE', style);

  const column = (label: string, style: string, part: string) => `
    <div class="sp-stack" style="gap: 4px; width: 196px">
      <span class="sp-label">${label}</span>
      <p class="sp-prose sp-prose--ruled sp-text--ink" data-part="${part}"
         style="--sp-leading: ${LEADING}; margin: 0; font-size: 12px; max-width: none">${ruled(style)}</p>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Raised characters</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="css">
            <button class="sp-segment" data-part="seg-variant" value="variant">sups</button>
            <button class="sp-segment" data-part="seg-css" value="css">CSS</button>
          </sp-segmented>
        </div>
        <p data-part="line" data-subject data-raised="css" data-pose="[data-raised=css]"
           style="margin: 12px 0 0; font-size: 19px; line-height: 1.5; height: 30px; white-space: nowrap">Up 3%<sup
             data-part="marker" style="${RAISED.css}">1</sup> in the 1<span data-part="ordinal"
             style="${RAISED.css}">st</span> quarter, on 240 m<span data-part="exponent"
             style="${RAISED.css}">2</span>.</p>
        <p class="sp-text sp-context" data-part="readout" style="margin: 6px 0 0; height: 38px"></p>
        <div class="sp-divider sp-context" style="margin: 4px 0 8px"></div>
        <div class="sp-row sp-context" data-part="compare" style="gap: 14px; align-items: flex-start">
          ${column('vertical-align: super alone', 'font-size: 0.68em; vertical-align: super', 'grown')}
          ${column('with line-height: 0', RAISED.css, 'held')}
        </div>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const readout = part(root, 'readout');
  const marks = ['marker', 'ordinal', 'exponent'].map((name) => part(root, name));

  const apply = (value: string) => {
    const note = NOTES[value];
    const style = RAISED[value as keyof typeof RAISED];
    if (!note || !style) return;
    line.dataset.raised = value;
    for (const mark of marks) mark.style.cssText = style;
    readout.textContent = note;
  };

  apply('css');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
