/*
 * The two faces this site actually loads, so every shape below is the real file's
 * drawing rather than whatever the machine happened to have. Written out as local
 * stacks for the reason every type specimen is: the kit has one sans on purpose
 * (SPEC §5), and a demonstration that one character has many drawings cannot be
 * made inside a single face.
 */
const SANS = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";
const SERIF = "'Source Serif 4 Variable', ui-serif, Georgia, serif";
const CODE = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px';
const GLYPH_SIZE = 44;

/**
 * Glyph specimen: the mapping from characters to drawn shapes, going wrong in both
 * directions at once. The top row is one character rendered by two faces, which is
 * two glyphs. The bottom row is two characters rendered by one face, which is one
 * glyph, because Source Serif carries the fi ligature and draws the pair as a
 * single shape (verified against the loaded file: switching ligatures off changes
 * the drawing and the advance width, which is why the two boxes are different
 * widths). The kit's sans leaves fi alone, so the row is set in the serif.
 *
 * The subject is one drawn shape, the serif a, and not the comparison around it:
 * the word names the drawing, so the narrowest element it applies to is a single
 * glyph (SPEC §5), the same call the em dash specimen makes. The face names, the
 * codepoints and the notes are scenery in the context register. Nothing changes
 * state, so there is no room to reserve and no counter-example to pose out.
 */
export function mount(root: HTMLElement): void {
  const cell = (name: string, text: string, family: string, note: string, extra = '', subject = false) => `
    <div class="sp-stack" style="flex: 0 0 88px; gap: 2px; align-items: center">
      <span data-part="${name}"${subject ? ' data-subject' : ''}
            style="background: var(--sp-sunken); font-family: ${family}; font-size: ${GLYPH_SIZE}px; line-height: 1.15; ${extra}">${text}</span>
      <span class="sp-label sp-context" style="font-size: 11px; white-space: nowrap">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">characters in</span>
          <span class="sp-label">shapes out</span>
        </div>
        <div class="sp-row" data-part="row-one-character" style="gap: 14px; margin-top: 8px">
          <span class="sp-context" style="${CODE}; flex: 0 0 62px; color: var(--sp-muted)">U+0061</span>
          ${cell('glyph-sans', 'a', SANS, 'Geist')}
          ${cell('glyph-serif', 'a', SERIF, 'Source Serif', '', true)}
          <span class="sp-text sp-context sp-grow" style="font-size: 12px">
            One character,<br />two glyphs.
          </span>
        </div>
        <div class="sp-row" data-part="row-one-glyph" style="gap: 14px; margin-top: 10px">
          <span class="sp-context" style="${CODE}; flex: 0 0 62px; color: var(--sp-muted)">U+0066<br />U+0069</span>
          ${cell('glyph-fused', 'fi', SERIF, 'liga on', 'font-variant-ligatures: common-ligatures')}
          ${cell('glyph-split', 'fi', SERIF, 'liga off', 'font-variant-ligatures: none')}
          <span class="sp-text sp-context sp-grow" style="font-size: 12px">
            Two characters,<br />one glyph.
          </span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin: 10px 0 0; font-size: 12px">
          A codepoint is what gets stored and a glyph is what gets drawn. The two never line up one
          for one, which is why counting either tells you nothing about the other.
        </p>
      </div>
    </div>
  `;
}
