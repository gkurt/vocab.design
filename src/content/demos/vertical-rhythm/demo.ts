import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One line of body text: the unit every measurement in the column is counted in. */
const UNIT = 20;
/** The gap the broken column uses instead of a whole line. */
const OFF_GAP = 13;
const RULES = `repeating-linear-gradient(to bottom, var(--sp-accent-soft) 0 1px, transparent 1px ${UNIT}px)`;

const HEADING = 'Rehearsal notes';
const COPY_ONE = 'The room is booked from ten until noon.';
const COPY_TWO = 'Bring the printed parts and a spare pen.';

/**
 * Vertical rhythm specimen: the same three blocks set twice, once with every
 * space a whole multiple of the 20px line and once with a single gap of its
 * own. A control in the scenery rules the unit behind both columns, which is the
 * only way to see that the rhythm is a measurement rather than a mood.
 *
 * The subject is the column that holds the beat. Rhythm is a property of a run
 * of blocks, so no single paragraph is the term and the narrowest honest answer
 * is one column (SPEC §5); the broken column beside it and the ruling control
 * are scenery in the context register.
 *
 * Ruling is a background-image write on a box whose size never changes, so
 * turning the grid on moves nothing (SPEC §5), and both columns are sized to
 * hold their content so neither can grow the frame.
 *
 * The columns once carried copy about themselves ("Every space is counted in
 * lines, not in pixels.") under a row of labels reading "on the grid" and "one
 * gap off the grid". Both were the site talking inside the document: the copy is
 * ordinary rehearsal prose now, at the same two lines a block so the geometry is
 * unchanged, and the labels are gone because the strip's verdict already names
 * which column loses the beat and by how much.
 */
export function mount(root: HTMLElement): void {
  const column = (variant: 'on' | 'off', gap: number) => `
    <div data-part="column-${variant}"${variant === 'on' ? ' data-subject' : ''}
         style="width: 190px; height: 140px; overflow: hidden; font-size: 13px">
      <p style="margin: 0; font-weight: 600; line-height: ${UNIT}px">${HEADING}</p>
      <p class="sp-text" style="margin: ${UNIT}px 0 0; line-height: ${UNIT}px">${COPY_ONE}</p>
      <p class="sp-text" data-part="last-${variant}" style="margin: ${gap}px 0 0; line-height: ${UNIT}px">${COPY_TWO}</p>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">${UNIT}px grid</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Rules" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-on" value="on">ruled</button>
            <button class="sp-segment" data-part="seg-off" value="off">unruled</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="grid" data-rules="on" style="gap: 24px; margin-top: 16px; align-items: flex-start">
          ${column('on', UNIT)}
          <div class="sp-context">${column('off', OFF_GAP)}</div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The right-hand column loses the beat at one gap: ${OFF_GAP}px instead of a whole line, and every
          line after it lands between the rules.
        </p>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const columns = partsOf(root, 'column-on').concat(partsOf(root, 'column-off'));

  const apply = (value: string) => {
    grid.dataset.rules = value;
    for (const column of columns) column.style.backgroundImage = value === 'on' ? RULES : 'none';
  };

  apply('on');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
