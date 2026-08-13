/*
 * The three marks, set in one face at one size. A serif is used because its
 * dashes carry side bearings a reader can see, and it is written as a local
 * stack for the reason every type specimen is: the kit has one sans on purpose
 * (SPEC §5), and a comparison of glyph widths cannot be made in it.
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const GLYPH_SIZE = 30;

type Row = { part: string; name: string; glyph: string; code: string; job: string };

const ROWS: Row[] = [
  { part: 'hyphen', name: 'Hyphen', glyph: '-', code: 'U+002D', job: 'joins: well-known, part-time' },
  { part: 'en-dash', name: 'En dash', glyph: '–', code: 'U+2013', job: 'spans: 2010–2014, pages 12–18' },
  { part: 'em-dash', name: 'Em dash', glyph: '—', code: 'U+2014', job: 'breaks: an aside, an interruption' },
];

/**
 * Em dash specimen: the dash family ruled against each other. Each mark is drawn
 * over a tinted ground that covers exactly its advance width, so the widths are
 * the font's own measurement rather than a bar the demo drew, and the reference
 * letters n and m sit underneath at the same size for the comparison the names
 * come from.
 *
 * The subject is the em dash glyph itself, not the table. The table is what the
 * mark is being told apart from, so ringing it would claim the term names the
 * comparison; the narrowest element the word actually names is the one mark
 * (SPEC §5). Everything else is scenery in the context register.
 *
 * Nothing changes state: the comparison is the demonstration.
 */
export function mount(root: HTMLElement): void {
  const cell = (row: Row) => {
    const subject = row.part === 'em-dash' ? ' data-subject' : '';
    return `<span data-part="glyph-${row.part}"${subject}
      style="background: var(--sp-accent-soft); font-family: ${FACE}; font-size: ${GLYPH_SIZE}px; line-height: 1.1">${row.glyph}</span>`;
  };

  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.part}">
        <td style="width: 92px">${row.name}</td>
        <td style="width: 116px; text-align: center">${cell(row)}</td>
        <td class="sp-label" style="width: 74px">${row.code}</td>
        <td class="sp-text">${row.job}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <table class="sp-table" style="--sp-cell-pad: 4px 8px">
          <tbody data-part="family" class="sp-context">${body}</tbody>
        </table>
        <div class="sp-row sp-context" data-part="reference" style="gap: 0; margin-top: 8px">
          <span class="sp-label" style="width: 92px; padding: 0 8px">for width</span>
          <span style="width: 116px; text-align: center">
            <span style="background: var(--sp-sunken); font-family: ${FACE}; font-size: ${GLYPH_SIZE}px; line-height: 1.1">n</span>
            <span style="background: var(--sp-sunken); font-family: ${FACE}; font-size: ${GLYPH_SIZE}px; line-height: 1.1">m</span>
          </span>
          <span class="sp-text sp-grow" style="padding-left: 8px">an en is the width of n, an em the width of m</span>
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-stack sp-context" data-part="house" style="gap: 4px">
          <span class="sp-label">two house styles, one job</span>
          <span class="sp-text sp-text--ink" style="font-family: ${FACE}; font-size: 13px">
            She turned back—the light was still on—and locked it.
          </span>
          <span class="sp-text sp-text--ink" style="font-family: ${FACE}; font-size: 13px">
            She turned back – the light was still on – and locked it.
          </span>
        </div>
      </div>
    </div>
  `;
}
