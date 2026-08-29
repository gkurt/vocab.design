import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One line of body text: the spacing of the grid, and the only vertical unit here. */
const UNIT = 20;
/** The leading the broken column takes instead of a whole line of the grid. */
const OFF = 17;

/**
 * The grid itself: a hairline on every line of the unit, and a heavier accent rule every
 * third line so a reader can pick the same line out in both columns at a glance. Drawn as
 * a background so the rules pass behind the type rather than striking through it.
 */
const RULES = [
  `repeating-linear-gradient(to bottom, transparent 0 ${UNIT * 3 - 2}px, var(--sp-accent) ${UNIT * 3 - 2}px ${UNIT * 3}px)`,
  `repeating-linear-gradient(to bottom, transparent 0 ${UNIT - 1}px, var(--sp-line) ${UNIT - 1}px ${UNIT}px)`,
].join(', ');

const NOTES: Record<string, string> = {
  on: `Both columns keep the ${UNIT}px line, so their lines rest on the same rules.`,
  off: `The right column is set at ${OFF}px and never lands on a rule again.`,
};

/**
 * Baseline grid specimen: the ruled field itself, with a two column page set onto it. The
 * right column can be given a leading of its own, which is the only way to see that the
 * lines are a measurement both columns answer to rather than decoration behind them.
 *
 * The subject is the lattice, the same decision the Z pattern specimen made: the term names
 * the ruled field, not the text that happens to sit on it, so the narrowest honest element
 * is the overlay drawing the rules and the page under it is the scene (SPEC §5). The lattice
 * is ruled in every state, so it never stops being the term and needs no pose condition.
 *
 * Only the right column's leading changes, inside a box of fixed size, so the lattice, the
 * left column and everything around them hold still (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const column = (side: 'left' | 'right', head: string, one: string, two: string) => `
    <div data-part="col-${side}" style="width: 196px; height: 140px; overflow: hidden; font-size: 13px">
      <p data-part="head-${side}" style="margin: 0; font-weight: 600; line-height: ${UNIT}px">${head}</p>
      <p class="sp-text" data-part="one-${side}" style="margin: ${UNIT}px 0 0; line-height: ${UNIT}px">${one}</p>
      <p class="sp-text" data-part="two-${side}" style="margin: ${UNIT}px 0 0; line-height: ${UNIT}px">${two}</p>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Right column</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="on" data-axis="Alignment">
            <button class="sp-segment" type="button" data-part="seg-on" value="on">on the grid</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">off the grid</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-row sp-context" style="flex: 0 0 auto; width: 444px; gap: 24px; padding: 0 14px">
            <span class="sp-label" style="width: 196px">left column</span>
            <span class="sp-label" style="width: 196px">right column</span>
          </div>
          <div
            data-part="page"
            style="position: relative; flex: 0 0 auto; width: 444px; height: 164px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="lattice"
              data-subject
              style="position: absolute; left: 14px; top: 14px; width: 416px; height: 140px; background-image: ${RULES}"
            ></div>
            <div class="sp-row" style="position: absolute; left: 14px; top: 14px; width: 416px; height: 140px; gap: 24px; align-items: flex-start">
              ${column('left', 'Cross column', 'Both columns are ruled by the same field of lines.', 'Nothing is measured in pixels here.')}
              ${column('right', 'The neighbour', 'Its leading is the same, so its lines land where the left ones do.', 'The pair reads as one page.')}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const lines = ['head-right', 'one-right', 'two-right'].map((name) => part(root, name));

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    const leading = key === 'on' ? UNIT : OFF;
    for (const [index, line] of lines.entries()) {
      line.style.lineHeight = `${leading}px`;
      if (index > 0) line.style.marginTop = `${leading}px`;
    }
    readout.textContent = note;
  };

  // Each segment names the leading the right column takes, so a step lands on that
  // leading rather than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('on');
}
