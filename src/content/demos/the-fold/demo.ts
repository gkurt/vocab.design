import { localBox } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** Where the first screenful ends, measured from the top of the simulated viewport. */
const FOLD = 178;
const WIDTH = 330;
const HEIGHT = 268;

const BLOCKS = ['Harbour notice', 'Pilot rotation', 'Dredging window', 'Berth allocations', 'Fuel bunkering', 'Winter closures'];

/**
 * The fold specimen: a page in a simulated viewport, with the line the viewport's bottom
 * edge draws marked across it. Scrolling moves the page and the line stays exactly where it
 * was, which is the claim: the fold belongs to the window, not to the document.
 *
 * The subject is the line itself. The fold is a boundary rather than a component, so the
 * narrowest element that names it is the rule drawn at that height; the page it crosses,
 * the paper above it, the grey below it, and the two labels are all scene. It takes no
 * pointer events, so a reader's click reaches the page underneath it.
 *
 * Which blocks are above, cut, and below is measured from the blocks' own geometry on mount
 * and on every scroll, never assumed from the positions the markup asked for.
 */
export function mount(root: HTMLElement): void {
  const blocks = BLOCKS.map(
    (title, i) => `
      <div class="sp-stack" data-part="block-${i}" style="width: 200px; margin-bottom: 14px">
        <span class="sp-heading">${title}</span>
        <div class="sp-line" style="width: 92%"></div>
        <div class="sp-line" style="width: 76%"></div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div style="position: relative; width: ${WIDTH}px; height: ${HEIGHT}px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden">
        <div
          class="sp-scroll sp-context"
          data-part="page"
          style="width: 100%; height: 100%; padding: 12px; background: linear-gradient(to bottom, var(--sp-surface) 0 ${FOLD}px, var(--sp-bg) ${FOLD}px 100%)"
        >
          ${blocks}
        </div>
        <span class="sp-label sp-context" style="position: absolute; top: ${FOLD - 22}px; right: 10px; pointer-events: none">above the fold</span>
        <span class="sp-label sp-context" style="position: absolute; top: ${FOLD + 10}px; right: 10px; pointer-events: none">below the fold</span>
        <div
          data-part="fold"
          data-subject
          style="position: absolute; top: ${FOLD}px; left: 0; right: 0; height: 3px; pointer-events: none; background: repeating-linear-gradient(to right, var(--sp-accent) 0 7px, transparent 7px 14px)"
        ></div>
      </div>
      <div class="sp-row sp-context" style="height: 18px">
        <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const readout = part(root, 'readout');
  const blockEls = BLOCKS.map((_, i) => part(root, `block-${i}`));

  const sync = () => {
    // The fold is a length the specimen declares, so the blocks are measured in the same
    // pixels rather than in whatever the page is drawing them at (SPEC §5).
    let above = 0;
    let cut = 0;
    for (const block of blockEls) {
      const rect = localBox(block, page);
      const side = rect.top + rect.height <= FOLD ? 'above' : rect.top >= FOLD ? 'below' : 'cut';
      block.dataset.side = side;
      if (side === 'above') above++;
      if (side === 'cut') cut++;
    }
    readout.textContent = `${above} above the fold · ${cut} cut by it · ${blockEls.length - above - cut} below`;
  };

  page.addEventListener('scroll', sync);
  sync();
}
