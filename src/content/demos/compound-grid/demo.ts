import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const GAP = 8;
const CANVAS_H = 176;

/** Left edge of the (i + 1)th column of an n-column grid, in the grid's own width. */
const edge = (n: number, i: number) => `calc(((100% - ${(n - 1) * GAP}px) / ${n} + ${GAP}px) * ${i})`;

/** Width of a block spanning `span` columns of an n-column grid. */
const span = (n: number, count: number) => `calc((100% - ${(n - 1) * GAP}px) / ${n} * ${count} + ${GAP * (count - 1)}px)`;

const RHYTHMS = [
  { key: 'four', label: '4 columns' },
  { key: 'six', label: '6 columns' },
];

interface Placement {
  key: string;
  start: number;
  count: number;
}

/** The same three blocks placed on each grid. Both leave the feature's edge on the shared line. */
const LAYOUTS: Record<string, { columns: number; blocks: Placement[] }> = {
  four: {
    columns: 4,
    blocks: [
      { key: 'feature', start: 1, count: 2 },
      { key: 'notes', start: 3, count: 1 },
      { key: 'ad', start: 4, count: 1 },
    ],
  },
  six: {
    columns: 6,
    blocks: [
      { key: 'feature', start: 1, count: 3 },
      { key: 'notes', start: 4, count: 2 },
      { key: 'ad', start: 6, count: 1 },
    ],
  },
};

const NOTES: Record<string, string> = {
  four: 'Blocks on the 4-column rhythm, with the 6-column lines still drawn.',
  six: 'On the 6-column rhythm now, and the shared centre line has not moved.',
};

const BLOCK = 'display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; overflow: hidden';

/**
 * Compound grid specimen: a 4-column grid drawn as tinted tracks and a 6-column grid drawn as
 * lines, overlaid on one measure, with three blocks that move between the two rhythms. Both
 * grids agree at the centre, and the feature block's right edge lands on that line in either
 * rhythm, so switching moves two edges and leaves one exactly where it was.
 *
 * The subject is the shared line, `data-part="shared"`. It is the joint the whole term turns on
 * and it has no element of its own, so the demo gives it one: a 4px rule at the centre, wide
 * enough to be a real box rather than a hairline (SPEC §5). The alternative was the overlay
 * that draws both grids, which is nearly the whole canvas; the line is the narrower answer to
 * "which part of this is the term", and it is visible in every state, so no pose is needed.
 *
 * Both grids and all three blocks are scenery in the context register, which is what leaves the
 * shared line the only accent in the frame. The blocks are absolutely placed from the same
 * column arithmetic the guides use, so their edges are a fact of the grid rather than two sets
 * of numbers kept in step by hand, and no state change reflows anything.
 */
export function mount(root: HTMLElement): void {
  const bands = Array.from({ length: 4 }, () => '<div style="background: var(--sp-accent); opacity: 0.12; border-radius: 2px"></div>').join(
    '',
  );

  const lines = Array.from(
    { length: 5 },
    (_, i) =>
      `<div style="position: absolute; top: 0; bottom: 0; left: calc(${edge(6, i + 1)} - ${GAP / 2 + 1}px); width: 2px; background: var(--sp-accent); opacity: 0.45"></div>`,
  ).join('');

  const blocks = [
    { key: 'feature', label: 'Feature' },
    { key: 'notes', label: 'Notes' },
    { key: 'ad', label: 'Ad' },
  ]
    .map(
      (block) => `
      <div
        class="sp-surface sp-context"
        data-part="block-${block.key}"
        data-rhythm="four"
        style="${BLOCK}; position: absolute; top: 24px; height: 128px; left: 0; width: 0;
               transition: left 340ms var(--sp-ease), width 340ms var(--sp-ease)"
      >
        <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">${block.label}</span>
        <div class="sp-line" style="width: 80%; height: 6px"></div>
      </div>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">4 columns tinted, 6 ruled</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="rhythms" data-axis="Rhythm" data-value="four">
            ${RHYTHMS.map(
              (rhythm) => `
              <button class="sp-segment" type="button" data-part="seg-${rhythm.key}" value="${rhythm.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${rhythm.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${CANVAS_H}px">
            <div class="sp-context" data-part="grid-four" style="position: absolute; inset: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: ${GAP}px; pointer-events: none">${bands}</div>

            <div data-part="content" style="position: absolute; inset: 0">${blocks}</div>

            <div class="sp-context" data-part="grid-six" style="position: absolute; inset: 0; pointer-events: none; z-index: 3">${lines}</div>

            <div
              data-part="shared"
              data-subject
              style="position: absolute; top: 0; bottom: 0; left: calc(50% - 2px); width: 4px; z-index: 4;
                     background: var(--sp-accent); border-radius: 2px"
            ></div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES.four}</span>
    </div>
  `;

  const note = part(root, 'note');

  const apply = (key: string) => {
    const layout = LAYOUTS[key];
    if (!layout) return;
    for (const placement of layout.blocks) {
      const el = part(root, `block-${placement.key}`);
      el.dataset.rhythm = key;
      el.style.left = edge(layout.columns, placement.start - 1);
      el.style.width = span(layout.columns, placement.count);
    }
    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'rhythms').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount on the four-column rhythm, which is the placement the markup already declares.
  apply('four');
}
