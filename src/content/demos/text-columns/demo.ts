import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'ui-monospace, monospace';

type Mode = { columns: string; width: string; spelling: string; note: string };

const MODES: Record<string, Mode> = {
  two: {
    columns: '2',
    width: 'auto',
    spelling: 'column-count: 2; column-gap: 20px',
    note: 'Two columns, with the column-rule drawn down the gap.',
  },
  three: {
    columns: '3',
    width: 'auto',
    spelling: 'column-count: 3; column-gap: 20px',
    note: 'Three columns. break-inside keeps the subheading whole.',
  },
  fitted: {
    columns: 'auto',
    width: '9em',
    spelling: 'column-width: 9em; column-gap: 20px',
    note: 'Asked by width instead: the browser fits as many as it can.',
  },
};

const PARAGRAPH = 'margin: 0 0 8px';

/**
 * Text columns specimen: one passage of running text poured through two columns, three
 * columns, and a column width the browser divides for itself.
 *
 * The subject is the block carrying the column properties, the narrowest element the term
 * names: the picker, the spelling chip and the caption are instrumentation, and the page
 * the text is set on is the scene (SPEC §5). Every state is genuinely columned, so the
 * subject never stops being the term and no pose condition is needed. The block's height
 * is fixed and the text sized to fit the narrowest of the three states, since multicol
 * answers a box it cannot fill by adding columns beyond its own edge.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Columns asked for by</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="two">
            <button class="sp-segment" type="button" data-part="seg-two" value="two">count 2</button>
            <button class="sp-segment" type="button" data-part="seg-three" value="three">count 3</button>
            <button class="sp-segment" type="button" data-part="seg-fitted" value="fitted">width</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="flex: 0 0 auto; width: 446px; height: 164px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div
              data-part="block"
              data-subject
              style="height: 140px; column-count: 2; column-gap: 20px; column-rule: 1px solid var(--sp-line); font-size: 10px; line-height: 1.5; text-align: left"
            >
              <p style="${PARAGRAPH}">
                The presses ran twice a week, and the pages were set by hand until the last of the old
                compositors retired. Brass rules were cut to length and slid into the frame between the
                galleys.
              </p>
              <h3 data-part="subhead" style="${PARAGRAPH}; break-inside: avoid; font-size: 11px; font-weight: 600">
                Setting the tide table by hand
              </h3>
              <p style="${PARAGRAPH}">
                Widths were chosen so a reader could take in a line without moving their head, the same
                reason a narrow measure still reads faster than a wide one.
              </p>
              <p style="margin: 0">
                A column taller than the window makes the reader scroll down and then back up, which is
                why the habit survives in print and rarely on screen.
              </p>
            </div>
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 24px">
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 252px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${MONO}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 20px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const block = part(root, 'block');
  const chip = part(root, 'chip');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    block.style.columnCount = mode.columns;
    block.style.columnWidth = mode.width;
    chip.textContent = mode.spelling;
    readout.textContent = mode.note;
  };

  // Each segment names how the columns are asked for, so a step lands on that spelling
  // rather than cycling through whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('two');
}
