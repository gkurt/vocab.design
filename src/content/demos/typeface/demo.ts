/*
 * One family, written out as a stack of its own, because the kit is sans-only on
 * purpose (SPEC §5) and a specimen about a typeface set in the kit's face would
 * be demonstrating nothing. Named families first, generic last, so the samples
 * still share a design on a machine that has none of them installed.
 */
const FAMILY = "Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif";
const SAMPLE = 'Handgloves';

/** Every row is one font: a single size and style of the one typeface above them. */
const FONTS = [
  { key: 'display', label: 'regular 34px', size: 34, weight: 400, style: 'normal' },
  { key: 'regular', label: 'regular 21px', size: 21, weight: 400, style: 'normal' },
  { key: 'italic', label: 'italic 21px', size: 21, weight: 400, style: 'italic' },
  { key: 'bold', label: 'bold 21px', size: 21, weight: 700, style: 'normal' },
  { key: 'small', label: 'regular 13px', size: 13, weight: 400, style: 'normal' },
];

/**
 * Typeface specimen: one design, five fonts. Each row is a distinct font (one
 * size, one style, the countable thing that used to sit in a drawer) and every
 * row is drawn from the same letterforms, which is the typeface. The labels name
 * the fonts, so the block they label is the only thing left to be the design.
 *
 * The subject is the specimen block rather than any one row: a row is a font,
 * and ringing one would claim the term names an instance. Nothing here changes
 * state, so there is no room to reserve (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = FONTS.map(
    ({ key, label, size, weight, style }) => `
      <div class="sp-row" style="gap: 14px; align-items: baseline">
        <span class="sp-label sp-context" style="width: 92px; flex: 0 0 auto">${label}</span>
        <span data-part="font-${key}" style="font-family: ${FAMILY}; font-size: ${size}px; font-weight: ${weight};
              font-style: ${style}; line-height: 1.25">${SAMPLE}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One typeface</span>
          <span class="sp-label">five fonts</span>
        </div>
        <div class="sp-stack" data-part="specimen" data-subject style="gap: 7px; margin-top: 12px">
          ${rows}
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          The design is one thing, shared by every row. A font is one size and one style of it.
        </p>
      </div>
    </div>
  `;
}
