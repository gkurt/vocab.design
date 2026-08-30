import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const COLUMNS = 12;
const GUTTER = 8;
const SLOTS = 4;
const TRACKS = `display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); gap: ${GUTTER}px`;

/** Each division of the same twelve columns, in whole columns. */
const DIVISIONS: Record<string, { spans: number[]; names: string[] }> = {
  halves: { spans: [6, 6], names: ['one half', 'one half'] },
  thirds: { spans: [4, 4, 4], names: ['one third', 'one third', 'one third'] },
  quarters: { spans: [3, 3, 3, 3], names: ['one quarter', 'one quarter', 'one quarter', 'one quarter'] },
  split: { spans: [8, 4], names: ['two thirds', 'one third'] },
};

/**
 * 12 column grid specimen: twelve numbered columns with blocks laid across them, and a
 * switch between the divisions twelve makes whole. The columns never move; only what spans
 * them does, which is the whole reason for choosing this count.
 *
 * The subject is the gridded region: the columns and the blocks laid on them together, since
 * a column count means nothing without something spanning it. The division switcher above is
 * the specimen's own instrumentation and stays outside (SPEC §5), so identify has something
 * narrower than the frame to ring.
 *
 * The ruler and the blocks share one set of track definitions and one gutter, so their
 * alignment is a fact of the layout rather than two sets of numbers kept in step by hand.
 * The block row keeps a fixed height, so a division with four blocks fills tracks that were
 * already reserved instead of growing the region (SPEC §5).
 *
 * A line under the region used to state the arithmetic for whichever division was picked
 * ("12 ÷ 2 = 6. Halves, with no fraction of a column anywhere."). That was the site making
 * the case for twelve from inside the layout tool, and the article makes it at length, so
 * the line went and the frame lost its height rather than standing over a gap. The spans
 * are still printed on the blocks themselves, where a layout tool really does print them.
 */
export function mount(root: HTMLElement): void {
  const ticks = Array.from(
    { length: COLUMNS },
    (_, i) => `
      <div style="display: flex; align-items: center; justify-content: center; height: 20px; border-radius: 3px; background: var(--sp-accent-soft)">
        <span class="sp-label" style="font-size: 10px; color: var(--sp-accent)">${i + 1}</span>
      </div>`,
  ).join('');

  const slots = Array.from(
    { length: SLOTS },
    (_, i) => `
      <div
        class="sp-surface"
        data-part="block-${i}"
        data-span="0"
        hidden
        style="display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; padding: 10px; background: var(--sp-sunken)"
      >
        <span class="sp-heading" data-part="span-${i}" style="font-size: 15px"></span>
        <span class="sp-label" data-part="name-${i}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"></span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Split</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Spans" data-part="switcher" data-value="halves">
            <button class="sp-segment" type="button" data-part="seg-halves" value="halves">6+6</button>
            <button class="sp-segment" type="button" data-part="seg-thirds" value="thirds">4+4+4</button>
            <button class="sp-segment" type="button" data-part="seg-quarters" value="quarters">3+3+3+3</button>
            <button class="sp-segment" type="button" data-part="seg-split" value="split">8+4</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px 16px">
          <div
            data-part="region"
            data-subject
            data-division="halves"
            style="width: 424px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div data-part="ruler" style="${TRACKS}">${ticks}</div>
            <div data-part="blocks" style="${TRACKS}; grid-auto-rows: 106px; margin-top: 10px">${slots}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const blocks = Array.from({ length: SLOTS }, (_, i) => ({
    box: part(root, `block-${i}`),
    span: part(root, `span-${i}`),
    name: part(root, `name-${i}`),
  }));

  const apply = (key: string) => {
    const division = DIVISIONS[key];
    if (!division) return;
    region.dataset.division = key;
    blocks.forEach((block, i) => {
      const span = division.spans[i] ?? 0;
      const name = division.names[i] ?? '';
      block.box.dataset.span = String(span);
      flag(block.box, 'hidden', span === 0);
      if (span > 0) block.box.style.gridColumn = `span ${span}`;
      block.span.textContent = `span ${span}`;
      block.name.textContent = name;
    });
  };

  // Each segment names a division, so the switch lands on that one rather than stepping
  // to the next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('halves');
}
