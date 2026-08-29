/*
 * The kit is sans-only (SPEC §5), so a demo whose term is a typeface declares its
 * own stack inline. `monospace` is listed twice on purpose: naming a family ahead
 * of the generic loses the browser's smaller default size for monospaced text, and
 * repeating the generic is the standard way to keep it.
 */
const MONO = "ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace, monospace";

/* Two rows of a ledger, each exactly 18 characters, with the decimal point and the
   trailing word at the same index in both. In a fixed grid they stack; the same two
   strings in a proportional face keep none of it, spaces included. */
const ROWS = ['sum    1,284.50 ok', 'fees      19.05 ok'];

/* The character grid, drawn behind the text as one hairline per cell. `1ch` is the
   width of the zero glyph, so this ruler is a true cell grid in the monospaced
   block and an honest guess in the proportional one, which is the comparison. */
const RULER = 'repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px 1ch)';

const lines = (prefix: string) => ROWS.map((text, i) => `<div data-part="${prefix}-${i}" style="white-space: pre">${text}</div>`).join('');

/**
 * Monospace specimen: the same two rows set twice over the same character ruler.
 * The subject is the monospaced block, not one glyph: equal advance width is a
 * property of a run of text, and a single letter has nothing to line up with.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-stack" style="gap: 6px">
          <span class="sp-label sp-context">monospace</span>
          <div data-part="mono" data-subject
               style="font-family: ${MONO}; font-size: 17px; line-height: 24px; width: max-content; background-image: ${RULER}">
            ${lines('mono')}
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack sp-context" style="gap: 6px">
          <span class="sp-label">proportional</span>
          <div data-part="prop"
               style="font-size: 17px; line-height: 24px; width: max-content; background-image: ${RULER}">
            ${lines('prop')}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          Every cell above is one character wide, so the decimal points and the last word land in
          the same columns. Below, the same strings with the same spaces land nowhere in particular.
        </p>
      </div>
    </div>
  `;
}
