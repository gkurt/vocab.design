const CELL = 'border: 1px solid #000; padding: 2px 7px; text-align: left';
const ROWS = [
  ['01', 'Culvert, low tide', '4:12'],
  ['02', 'Pylon hum', '11:38'],
  ['03', 'Rain on a caravan', '6:02'],
];
const LINK = 'color: #0000ee; text-decoration: underline; cursor: pointer';
/** The browser's own visited colour, which is half of what the style is quoting. */
const VISITED = '#551a8b';

/**
 * Brutalist web design specimen: a page fragment that refuses every convention the
 * rest of the kit supplies. System serif, headings sized by level, the browser's link
 * blue and visited purple, a real horizontal rule, and a table with actual borders.
 *
 * Every value is inline and none of it reads a --sp-* token, which is the point: the
 * kit exists to make specimens look like one collection, and this term is the look a
 * document has when nobody has styled it. The subject is the fragment rather than the
 * scene, so identify still has something narrower than the frame to ring.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ([no, site, length]) => `
      <tr>
        <td style="${CELL}">${no}</td>
        <td style="${CELL}">${site}</td>
        <td style="${CELL}">${length}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div data-part="fragment" data-subject
           style="width: 336px; padding: 8px 14px; background: #ffffff; color: #000000; font-family: 'Times New Roman', Times, serif; font-size: 13px; line-height: 1.35">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; line-height: 1.15">Field Recordings</h1>
        <p style="margin: 5px 0 0">Updated 4 March. Three hundred bytes of CSS, and most of that is the table.</p>
        <p style="margin: 6px 0 0">
          <a data-part="link-index" style="${LINK}">Index</a>
          |
          <a data-part="link-archive" style="${LINK}">Archive</a>
          |
          <a data-part="link-notes" style="${LINK}">Notes</a>
        </p>
        <hr style="border: 0; border-top: 1px solid #000000; margin: 6px 0">
        <table style="border-collapse: collapse; font-family: inherit; font-size: 12px">
          <thead>
            <tr>
              <th style="${CELL}">No.</th>
              <th style="${CELL}">Site</th>
              <th style="${CELL}">Length</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="margin: 6px 0 0">
          Files are WAV. Nothing is centred, nothing is rounded, and the links are the
          colour the browser made them.
        </p>
      </div>
      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 336px; text-align: center">
        System serif, default blue and purple, a real rule, a bordered table.
      </p>
    </div>
  `;

  // Following a link is the one thing the fragment does, and what it shows is the
  // browser's visited colour. Absolute: a link once followed stays followed, so a
  // fast-forwarded or resumed pass lands on the same state (SPEC §8).
  for (const link of root.querySelectorAll<HTMLElement>('[data-part^="link-"]')) {
    link.addEventListener('click', () => {
      link.style.color = VISITED;
      link.setAttribute('data-visited', '');
    });
  }
}
