import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const LANES = 3;
const GAP = 10;
const CANVAS_W = 434;
const CANVAS_H = 176;
const LANE_W = (CANVAS_W - (LANES - 1) * GAP) / LANES;
const ROW_H = (CANVAS_H - GAP) / 2;

/** Six items whose heights are their own, which is the only reason lanes exist. */
const HEIGHTS = [56, 38, 74, 44, 30, 62];

const MODES = [
  { key: 'lanes', label: 'lanes' },
  { key: 'rows', label: 'equal rows' },
];

const NOTES: Record<string, string> = {
  lanes: 'Lanes stay strict; each item drops into whichever lane is shortest.',
  rows: 'Equal rows instead: every item starts on a row line, and the space shows.',
};

/**
 * Grid lanes specimen: three lanes drawn as tracks, six items of their own heights, and a pick
 * between packing them into the lanes and forcing them onto equal rows. In lanes the strict
 * axis is the one drawn and the stacking axis is free, so an item lands under whichever
 * neighbour left room and the bottom edge comes out ragged; on strict rows every item starts on
 * a row line and a short one leaves the rest of its row empty.
 *
 * The subject is one lane, `data-part="lane"`, the middle track: the term names the lanes, and
 * the strict axis's track is the thing the word points at. It is given a real 138px box rather
 * than a hairline (SPEC §5), and it carries `data-pose="[data-free]"` because a lane on the
 * equal-rows layout is no longer a lane at all, only a column. The mount state is the lane
 * layout, so the pose holds there (SPEC §6).
 *
 * Items are absolutely placed from the packing arithmetic, so no state change reflows anything
 * and the two layouts occupy exactly the same box. The other two lanes and every item are
 * scenery in the context register.
 */
export function mount(root: HTMLElement): void {
  const lane = (i: number) =>
    i === 1
      ? `<div data-part="lane" data-subject data-free data-pose="[data-free]"
            style="position: absolute; top: 0; bottom: 0; left: ${i * (LANE_W + GAP)}px; width: ${LANE_W}px;
                   background: color-mix(in oklab, var(--sp-accent) 18%, transparent); border-radius: 3px"></div>`
      : `<div class="sp-context" data-part="lane-${i + 1}"
            style="position: absolute; top: 0; bottom: 0; left: ${i * (LANE_W + GAP)}px; width: ${LANE_W}px;
                   background: color-mix(in oklab, var(--sp-accent) 18%, transparent); border-radius: 3px"></div>`;

  const items = HEIGHTS.map(
    (height, i) => `
      <div
        class="sp-surface sp-context"
        data-part="item-${i + 1}"
        data-place="lane"
        style="position: absolute; display: flex; flex-direction: column; gap: 5px; overflow: hidden;
               width: ${LANE_W}px; padding: 6px 8px; left: 0; top: 0; height: ${height}px;
               transition: left 360ms var(--sp-ease), top 360ms var(--sp-ease), height 360ms var(--sp-ease)"
      >
        <span class="sp-label" style="color: var(--sp-ink); font-size: 11px; white-space: nowrap">Item ${i + 1}</span>
        ${height >= 44 ? '<div class="sp-line" style="width: 76%; height: 6px"></div>' : ''}
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">${LANES} lanes, six items</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="lanes">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div data-part="canvas" style="position: relative; width: ${CANVAS_W}px; height: ${CANVAS_H}px">
            ${Array.from({ length: LANES }, (_, i) => lane(i)).join('')}
            ${items}
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES.lanes}</span>
    </div>
  `;

  const laneEl = part(root, 'lane');
  const note = part(root, 'note');
  const itemEls = HEIGHTS.map((_, i) => part(root, `item-${i + 1}`));

  const apply = (key: string) => {
    const packed = key === 'lanes';
    if (packed) laneEl.dataset.free = '';
    else delete laneEl.dataset.free;

    const filled = Array.from({ length: LANES }, () => 0);
    for (const [i, item] of itemEls.entries()) {
      if (packed) {
        // Each item takes the lane with the most room left, which is the whole mechanism.
        const shortest = filled.indexOf(Math.min(...filled));
        item.style.left = `${shortest * (LANE_W + GAP)}px`;
        item.style.top = `${filled[shortest] ?? 0}px`;
        item.style.height = `${HEIGHTS[i]}px`;
        filled[shortest] = (filled[shortest] ?? 0) + (HEIGHTS[i] ?? 0) + GAP;
        item.dataset.place = 'lane';
        item.dataset.lane = String(shortest + 1);
      } else {
        const column = i % LANES;
        const row = Math.floor(i / LANES);
        item.style.left = `${column * (LANE_W + GAP)}px`;
        item.style.top = `${row * (ROW_H + GAP)}px`;
        // Rows are strict, so a short item leaves the rest of its row empty.
        item.style.height = `${HEIGHTS[i]}px`;
        item.dataset.place = 'row';
        item.dataset.lane = String(column + 1);
      }
    }

    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount packed into lanes, which is the term and the state the pose requires.
  apply('lanes');
}
