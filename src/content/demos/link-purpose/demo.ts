import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Row = { key: string; title: string; note: string };

const ROWS: Row[] = [
  { key: 'link-1', title: 'Renew your card', note: 'Expires after three years.' },
  { key: 'link-2', title: 'Reserve a room', note: 'Holds up to six people.' },
  { key: 'link-3', title: 'Opening hours', note: 'Varies in August.' },
];

const VAGUE = 'Read more';

const CAPTION = {
  descriptive: 'Each link names its own destination, so the links list reads as a table of contents.',
  vague: 'The words moved out of the link. Three destinations, one name, and the list says nothing.',
} as const;

type Mode = keyof typeof CAPTION;

const LINK_STYLE = 'color: var(--sp-accent); text-decoration: underline; font-size: 12px';

/**
 * Link purpose specimen: three search results whose links carry their destinations, beside the
 * links list a screen reader can pull up. Moving the words out of the link and leaving "Read
 * more" behind changes nothing a sighted reader scanning the page would miss, and turns the
 * list into three identical entries, which is what WCAG 2.4.4 is about.
 *
 * The subject is the results region, the narrowest element holding the link text the term
 * judges. The links list, the state control, and the caption are scenery (SPEC §5). The vague
 * wording is a state the subject itself passes through, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it: identify refuses to ring the version whose
 * links say nothing (SPEC §6).
 *
 * The list is read back off the anchors themselves rather than written out, so it cannot claim
 * a name a link does not have. Every result holds a fixed height and every list line a fixed
 * height, so rewording moves nothing outside the row that changed (SPEC §5), and each segment
 * reaches its own wording rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const result = (row: Row) => `
    <div data-part="row-${row.key}" style="height: 42px">
      <p class="sp-text" data-part="copy-${row.key}" style="margin: 0; font-size: 12px; line-height: 1.4"></p>
    </div>`;

  const listLine = (row: Row) => `
    <p class="sp-text sp-text--ink" data-part="readout-${row.key}" data-state="descriptive"
       style="margin: 0; height: 18px; font-size: 12px; white-space: nowrap; overflow: hidden"></p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Link text</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="descriptive">
            <button class="sp-segment" data-part="seg-descriptive" value="descriptive">Names the page</button>
            <button class="sp-segment" data-part="seg-vague" value="vague">“Read more”</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 12px; align-items: flex-start">
          <div class="sp-surface sp-grow" data-part="results" data-subject data-pose="[data-mode=descriptive]"
               data-mode="descriptive" style="padding: 10px 12px">
            <span class="sp-label">Search results</span>
            <div style="margin-top: 6px">${ROWS.map(result).join('')}</div>
          </div>

          <div class="sp-surface sp-context" style="flex: 0 0 156px; padding: 10px 12px">
            <span class="sp-label">Links list</span>
            <div style="margin-top: 6px">${ROWS.map(listLine).join('')}</div>
            <p class="sp-text" data-part="tally" style="margin: 6px 0 0; height: 15px; font-size: 11px"></p>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-case="descriptive"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${CAPTION.descriptive}</p>
      </div>
    </div>
  `;

  const results = part(root, 'results');
  const caption = part(root, 'caption');
  const tally = part(root, 'tally');

  /** The links list, read off the anchors, the way a reader's own list is built. */
  const readList = () => {
    const names = ROWS.map((row) => part(root, row.key).textContent?.trim() ?? '');
    for (const [index, row] of ROWS.entries()) {
      const line = part(root, `readout-${row.key}`);
      const name = names[index] ?? '';
      line.textContent = name;
      line.dataset.state = name === VAGUE ? 'vague' : 'descriptive';
    }
    const distinct = new Set(names).size;
    tally.textContent = distinct === names.length ? `${distinct} distinct names` : `${distinct} name for ${names.length} pages`;
  };

  const apply = (mode: Mode) => {
    results.dataset.mode = mode;
    for (const row of ROWS) {
      const copy = part(root, `copy-${row.key}`);
      copy.innerHTML =
        mode === 'descriptive'
          ? `<a href="#" data-part="${row.key}" data-state="descriptive" style="${LINK_STYLE}">${row.title}</a>
             <span style="font-size: 11px">${row.note}</span>`
          : `<span class="sp-text--ink" style="font-size: 12px">${row.title}.</span>
             <span style="font-size: 11px">${row.note}</span>
             <a href="#" data-part="${row.key}" data-state="vague" style="${LINK_STYLE}">${VAGUE}</a>`;
    }
    caption.dataset.case = mode;
    caption.textContent = CAPTION[mode];
    readList();
  };

  apply('descriptive');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'vague' ? 'vague' : 'descriptive');
  });
}
