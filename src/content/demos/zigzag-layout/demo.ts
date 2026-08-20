import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const ROWS = [{ lines: [46, 100, 74] }, { lines: [52, 96, 68] }, { lines: [42, 100, 80] }, { lines: [56, 92, 64] }];

const MODES = [
  { key: 'zigzag', label: 'alternating' },
  { key: 'aligned', label: 'all left' },
];

const STACK = 400;

/**
 * Zigzag layout specimen: four feature rows, each one picture beside one block of copy, with
 * the arrangement picked absolutely. Alternating, the picture goes left, right, left, right and
 * every row starts where the last one finished; aligned, all four pictures sit left and the run
 * collapses into a list. Both states are the same four rows in the same source order, because
 * the flip is presentational: only the direction each row lays out in changes.
 *
 * The subject is the stack of rows, `data-part="stack"`. One row cannot zigzag, so the term
 * names the run rather than any row in it, and the rows are the subject's own content rather
 * than scenery: the frame, the picker and the caption are the scenery, in the context register.
 *
 * `data-pattern` is measured, not declared: the demo reads which half of each row its picture
 * landed in and reports `alternating`, `aligned`, or `mixed`. The aligned state is deliberately
 * a counter-example the subject passes through, so the stack declares the honest condition in
 * `data-pose` and identify refuses to ring the list version (SPEC §6). Nothing here transitions
 * a position, so the read after the write is the real one (SPEC §5), and the rows keep their
 * boxes in both states, so nothing moves that the flip did not move.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row, i) => `
      <div
        data-part="row-${i + 1}"
        data-side="left"
        style="display: flex; flex-direction: row; align-items: center; gap: 12px; height: 46px; padding: 8px 10px;
               background: var(--sp-surface); border-radius: 6px"
      >
        <div
          data-part="picture-${i + 1}"
          style="flex: 0 0 auto; width: 76px; height: 30px; border-radius: 4px;
                 background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
        ></div>
        <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 4px">
          <div style="width: ${row.lines[0]}%; height: 7px; border-radius: 4px; background: color-mix(in oklab, var(--sp-ink) 55%, transparent)"></div>
          <div class="sp-line" style="width: ${row.lines[1]}%; height: 6px"></div>
          <div class="sp-line" style="width: ${row.lines[2]}%; height: 6px"></div>
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 266px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rows</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="zigzag">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div
            data-part="stack"
            data-subject
            data-pattern="alternating"
            data-pose="[data-pattern=alternating]"
            style="display: flex; flex-direction: column; gap: 8px; width: ${STACK}px"
          >${rows}</div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"></span>
    </div>
  `;

  const stack = part(root, 'stack');
  const note = part(root, 'note');
  const rowEls = ROWS.map((_, i) => part(root, `row-${i + 1}`));
  const pictureEls = ROWS.map((_, i) => part(root, `picture-${i + 1}`));

  const apply = (key: string) => {
    const zigzag = key === 'zigzag';
    for (const [i, row] of rowEls.entries()) {
      // Presentational only: the picture is still the first child of every row.
      row.style.flexDirection = zigzag && i % 2 === 1 ? 'row-reverse' : 'row';
    }

    // Read back on boxes nothing transitions: which half of its own row each picture landed in.
    const sides = pictureEls.map((picture, i) => {
      const row = rowEls[i];
      if (!row) return 'left';
      const rowBox = row.getBoundingClientRect();
      const pictureBox = picture.getBoundingClientRect();
      const side = pictureBox.left + pictureBox.width / 2 > rowBox.left + rowBox.width / 2 ? 'right' : 'left';
      row.dataset.side = side;
      return side;
    });
    const alternates = sides.every((side, i) => (i === 0 ? true : side !== sides[i - 1]));
    const uniform = sides.every((side) => side === sides[0]);
    stack.dataset.pattern = alternates ? 'alternating' : uniform ? 'aligned' : 'mixed';
    note.textContent = alternates
      ? 'Each row starts on the side the row above it finished.'
      : 'Four pictures hard left, and the run reads as one list.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('zigzag');
}
