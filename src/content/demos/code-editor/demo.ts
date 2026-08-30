import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px';
const ROW_H = 20;

/**
 * Syntax tinting is the term's own claim, so it is painted here rather than taken from
 * the kit, which has one accent on purpose. The hues sit at a lightness that reads
 * against both the light and the dark surface; comments and identifiers borrow kit
 * tokens, which already answer the theme.
 */
const TINT: Record<string, string> = {
  key: 'color: #a06ee0',
  str: 'color: #2f9560',
  num: 'color: #b8762f',
  fn: 'color: var(--sp-accent)',
  com: 'color: var(--sp-muted)',
  txt: 'color: var(--sp-ink)',
};

type Token = [string, keyof typeof TINT];

const LINES: { n: number; tokens: Token[]; inBlock?: boolean }[] = [
  { n: 1, tokens: [["// tally the day's rows", 'com']] },
  {
    n: 2,
    tokens: [
      ['const', 'key'],
      [' rows = ', 'txt'],
      ['load', 'fn'],
      ['(', 'txt'],
      ["'day.csv'", 'str'],
      [')', 'txt'],
    ],
  },
  {
    n: 3,
    tokens: [
      ['function', 'key'],
      [' ', 'txt'],
      ['summarise', 'fn'],
      ['(rows) {', 'txt'],
    ],
  },
  {
    n: 4,
    inBlock: true,
    tokens: [
      ['  let', 'key'],
      [' total = ', 'txt'],
      ['0', 'num'],
    ],
  },
  {
    n: 5,
    inBlock: true,
    tokens: [
      ['  for', 'key'],
      [' (', 'txt'],
      ['const', 'key'],
      [' r ', 'txt'],
      ['of', 'key'],
      [' rows) total += r.n', 'txt'],
    ],
  },
  {
    n: 6,
    inBlock: true,
    tokens: [
      ['  return', 'key'],
      [' total', 'txt'],
    ],
  },
  { n: 7, tokens: [['}', 'txt']] },
  {
    n: 8,
    tokens: [
      ['summarise', 'fn'],
      ['(rows)', 'txt'],
    ],
  },
];

/**
 * Code editor specimen: the pane that has an opinion about its text. Tinted runs, a
 * gutter of line numbers, the current line washed, and a fold arrow that collapses the
 * function body it knows the extent of.
 *
 * The subject is the editor pane, not the window around it: the title bar and the
 * status strip are the app the editor is embedded in, which is why they wear the
 * context register. The pane keeps a fixed height, so folding rearranges the buffer
 * inside it and moves nothing outside it (SPEC §5).
 *
 * A line under the window used to read "The gutter belongs to the line, not to the character.",
 * which is the article's point and not something an editor prints, so it is gone; the gutter
 * makes it by numbering rows.
 *
 * Folding gets two controls rather than one toggle (SPEC §8): the gutter arrow only
 * ever collapses, and the collapsed row's own ellipsis badge only ever expands, which
 * is also how a real editor offers the way back. Placing the caret is likewise
 * absolute, so a pass picked up anywhere reads the same.
 */
export function mount(root: HTMLElement): void {
  const tint = (tokens: Token[]) => tokens.map(([text, kind]) => `<span style="${TINT[kind]}">${text}</span>`).join('');

  const gutterCell = (n: number) => {
    const fold =
      n === 3
        ? `<button
             type="button"
             data-part="fold"
             data-aim
             aria-label="Fold function body"
             style="position: absolute; left: 3px; top: 2px; display: flex; align-items: center; justify-content: center;
                    width: 16px; height: 16px; padding: 0; border: 0; border-radius: 3px; background: transparent;
                    color: var(--sp-muted); cursor: pointer"
           >${icon('chevronDown')}</button>`
        : '';
    return `<span
        data-part="gut-${n}"
        style="position: relative; flex: 0 0 auto; width: 36px; padding-right: 8px; text-align: right;
               ${MONO}; font-size: 11px; color: var(--sp-muted)"
      >${fold}${n}</span>`;
  };

  const row = (line: (typeof LINES)[number]) => `
    <div
      data-part="row-${line.n}"
      style="display: flex; align-items: center; height: ${ROW_H}px; border-radius: 3px; cursor: text"
    >
      ${gutterCell(line.n)}
      <span
        data-part="code-${line.n}"
        style="flex: 1 1 auto; min-width: 0; padding-left: 10px; ${MONO}; white-space: pre; overflow: hidden"
      >${tint(line.tokens)}${
        line.n === 3
          ? `<button
               type="button"
               data-part="unfold"
               aria-label="Expand function body"
               hidden
               style="margin-left: 8px; padding: 0 6px; height: 14px; border: 1px solid var(--sp-line); border-radius: 4px;
                      background: var(--sp-sunken); color: var(--sp-muted); font: inherit; font-size: 10px; line-height: 12px;
                      vertical-align: middle; cursor: pointer">···</button>`
          : ''
      }</span>
    </div>`;

  const before = LINES.filter((l) => !l.inBlock && l.n < 4)
    .map(row)
    .join('');
  const inside = LINES.filter((l) => l.inBlock)
    .map(row)
    .join('');
  const after = LINES.filter((l) => !l.inBlock && l.n > 3)
    .map(row)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">summarise.ts</span>
          <span class="sp-label">TypeScript</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            class="sp-surface"
            data-part="pane"
            data-subject
            data-folded="false"
            role="group"
            aria-label="Editor"
            style="position: relative; height: 174px; overflow: hidden"
          >
            <span
              aria-hidden="true"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: 36px;
                     background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
            ></span>
            <div style="position: relative; padding: 4px 0">
              ${before}
              <div data-part="block">${inside}</div>
              ${after}
            </div>
          </div>
        </div>
        <div
          class="sp-row sp-context"
          style="flex: 0 0 auto; gap: 12px; padding: 4px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-label sp-grow" data-part="pos" data-line="1">Ln 1, Col 24</span>
          <span class="sp-label">Spaces: 2</span>
        </div>
      </div>
    </div>
  `;

  const pane = part(root, 'pane');
  const block = part(root, 'block');
  const fold = part(root, 'fold');
  const unfold = part(root, 'unfold');
  const pos = part(root, 'pos');

  const caret = root.ownerDocument.createElement('span');
  caret.className = 'sp-caret';
  caret.dataset.part = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  caret.style.marginLeft = '1px';

  let at = 1;

  const place = (n: number) => {
    at = n;
    const line = LINES.find((l) => l.n === n);
    const column = line ? line.tokens.map(([text]) => text).join('').length + 1 : 1;
    for (const l of LINES) {
      const rowEl = part(root, `row-${l.n}`);
      const current = l.n === n;
      rowEl.style.background = current ? 'var(--sp-accent-soft)' : 'transparent';
      part(root, `gut-${l.n}`).style.color = current ? 'var(--sp-ink)' : 'var(--sp-muted)';
    }
    if (n === 3) unfold.before(caret);
    else part(root, `code-${n}`).append(caret);
    pos.dataset.line = String(n);
    pos.textContent = `Ln ${n}, Col ${column}`;
  };

  const setFolded = (folded: boolean) => {
    block.hidden = folded;
    fold.hidden = folded;
    unfold.hidden = !folded;
    pane.dataset.folded = String(folded);
    if (folded && LINES.some((l) => l.inBlock && l.n === at)) place(3);
  };

  for (const line of LINES) {
    part(root, `row-${line.n}`).addEventListener('click', () => place(line.n));
  }

  fold.addEventListener('click', (event) => {
    event.stopPropagation();
    setFolded(true);
  });

  unfold.addEventListener('click', (event) => {
    event.stopPropagation();
    setFolded(false);
  });

  setFolded(false);
  place(1);
}
