import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three sheets of one size: a rule changes where the flow is cut, never the paper. */
const SHEET_W = 116;
const SHEET_H = 170;
const SEAM_W = 16;
/** The figure's full height, so the two halves of a split add back up to one picture. */
const FIG_H = 76;
const FIG_PAINT = 'linear-gradient(#7f96d8, #b9cdea 46%, #3f6a4c 47%, #2b4c37)';

const NOTES: Record<string, string> = {
  none: 'No break rules: the boundary lands inside the figure, so half of it prints on page one and half on page two.',
  avoid:
    'break-inside: avoid moves the figure to page two whole. Page one ends early, and that empty space is the price of not cutting it.',
  before:
    'break-before: page on the Fees heading pushes it to page three, so it arrives with the text it introduces instead of closing page two.',
};

const segment = (key: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 9px; font-size: 11px">
    ${label}
  </button>`;

const line = (width: number) => `<span class="sp-line" style="flex: 0 0 auto; width: ${width}%; height: 6px"></span>`;

const heading = (text: string, page: number) => `
  <span class="sp-heading" data-part="heading-fees" data-page="${page}" style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px">
    ${text}
  </span>`;

const title = () => `
  <span class="sp-heading" style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px">Berth transfer</span>`;

/** The picture, cut or whole. `grow` lets the top half take exactly the room the page has left. */
const figure = (name: string, height: number | 'grow', offset: number) => `
  <span
    data-part="${name}"
    style="${height === 'grow' ? 'flex: 1 1 auto; min-height: 0' : `flex: 0 0 auto; height: ${height}px`}; overflow: hidden; border-radius: 2px"
  >
    <span style="display: block; width: 100%; height: ${FIG_H}px; margin-top: ${-offset}px; background: ${FIG_PAINT}"></span>
  </span>`;

const caption = () => `<span class="sp-line" data-part="fig-caption" style="flex: 0 0 auto; width: 64%; height: 4px"></span>`;

const BODY = [92, 84, 96, 73, 88, 79];
const AFTER_FIG = [90, 66];
const CLOSING = [94, 82, 71, 58];

/** What each rule prints on each of the three sheets. */
const PAGES: Record<string, [string, string, string]> = {
  none: [
    [title(), ...BODY.map(line), figure('fig-top', 'grow', 0)].join(''),
    [figure('fig-bottom', 42, 34), caption(), ...AFTER_FIG.map(line), heading('Fees', 2)].join(''),
    CLOSING.map(line).join(''),
  ],
  avoid: [
    [title(), ...BODY.map(line)].join(''),
    [figure('fig-whole', FIG_H, 0), caption(), ...AFTER_FIG.map(line), heading('Fees', 2)].join(''),
    CLOSING.map(line).join(''),
  ],
  before: [
    [title(), ...BODY.map(line)].join(''),
    [figure('fig-whole', FIG_H, 0), caption(), ...AFTER_FIG.map(line)].join(''),
    [heading('Fees', 3), ...CLOSING.map(line)].join(''),
  ],
};

const sheet = (n: number) => `
  <div
    data-part="page-${n}"
    style="display: flex; flex-direction: column; gap: 9px; flex: 0 0 ${SHEET_W}px; height: ${SHEET_H}px; padding: 10px;
           overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 3px"
  ></div>`;

const seam = (n: number) => `
  <span
    data-part="seam-${n}"
    style="display: flex; align-items: center; justify-content: center; flex: 0 0 ${SEAM_W}px; align-self: stretch"
  >
    <span style="width: 2px; height: 100%; background: repeating-linear-gradient(var(--sp-line) 0 4px, transparent 4px 8px)"></span>
  </span>`;

/**
 * Page break specimen: a print preview of one article across three sheets, with a picker for
 * the break rules that decide where the flow may be cut.
 *
 * The subject is the flow, the article laid across the sheets, because a break is not a thing
 * in the document: it is where the flow is cut, which only exists as a relationship between the
 * content and the boxes it is poured into. The narrower candidates all fail the test, since the
 * figure is not a break and neither is a sheet. The picker and the caption are scenery in the
 * context register (SPEC §5). Every rule produces an honest page break, so no state needs a
 * `data-pose`.
 *
 * The sheets never change size or position, so a rule changes only which blocks land on which
 * sheet (SPEC §5). The top half of a split figure takes the room the page has left over rather
 * than a measured height, so nothing is read back after a style write. Each segment names the
 * rule it applies (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Print preview</span>
          <sp-segmented class="sp-segmented" data-part="rules" data-value="none">
            ${segment('none', 'no rules')}${segment('avoid', 'break-inside')}${segment('before', 'break-before')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="flow" data-subject data-rule="none" style="display: flex; flex: 0 0 auto; height: ${SHEET_H}px">
            ${sheet(1)}${seam(1)}${sheet(2)}${seam(2)}${sheet(3)}
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 58px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const flow = part(root, 'flow');
  const readout = part(root, 'readout');
  const sheets = [part(root, 'page-1'), part(root, 'page-2'), part(root, 'page-3')];

  const apply = (key: string) => {
    const pages = PAGES[key];
    const note = NOTES[key];
    if (!pages || !note) return;
    flow.dataset.rule = key;
    sheets.forEach((el, i) => {
      el.innerHTML = pages[i] ?? '';
    });
    readout.textContent = note;
  };

  // Each segment names the rule it applies, so a resumed script reaches that rule rather than
  // stepping to whichever one comes next (SPEC §8).
  part(root, 'rules').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('none');
}
