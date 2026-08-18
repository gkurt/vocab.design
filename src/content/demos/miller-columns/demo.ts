import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** Four columns of one size on a track wider than its viewport, so depth is paid in width. */
const COL_W = 120;
const COL_H = 190;
const GAP = 6;
const VIEW_W = 450;
const TRACK_W = COL_W * 4 + GAP * 3;
/** What the track slides by once the fourth column is filled, leaving the first partly on screen. */
const SHIFT = TRACK_W - VIEW_W;

interface Level2 {
  name: string;
  leaves: string[];
}

interface Root {
  name: string;
  kind: string;
  children: Level2[];
}

const ROOTS: Root[] = [
  {
    name: 'Music',
    kind: 'Audio',
    children: [
      { name: 'Albums', leaves: ['Blue Skies', 'Night Ferry', 'Harbour Lights'] },
      { name: 'Playlists', leaves: ['Morning', 'Long Drive', 'Focus'] },
      { name: 'Podcasts', leaves: ['Weekly', 'Archive', 'Shorts'] },
    ],
  },
  {
    name: 'Photos',
    kind: 'Image',
    children: [
      { name: '2024', leaves: ['Coast', 'Market', 'Rooftops'] },
      { name: '2023', leaves: ['Harbour', 'Fog', 'Ferry'] },
      { name: 'Screens', leaves: ['Login', 'Empty state', 'Settings'] },
    ],
  },
  {
    name: 'Documents',
    kind: 'PDF',
    children: [
      { name: 'Invoices', leaves: ['March', 'April', 'May'] },
      { name: 'Notes', leaves: ['Standup', 'Retro', 'Ideas'] },
      { name: 'Contracts', leaves: ['Lease', 'NDA', 'Supplier'] },
    ],
  },
];

const ROW = 'display: flex; align-items: center; gap: 6px; padding: 7px 8px; font-size: 12px; cursor: pointer';

/** One selectable row. `data-level` and `data-index` are what the delegated handler reads. */
function item(level: number, index: number, name: string, selected: boolean, more: boolean): string {
  return `
    <li
      class="sp-list-item"
      data-part="item-${level}-${index + 1}"
      data-level="${level}"
      data-index="${index}"
      ${selected ? 'data-selected' : ''}
      style="${ROW}"
    >
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${name}</span>
      ${more ? `<span class="sp-label" style="flex: 0 0 auto; display: flex">${icon('chevronRight')}</span>` : ''}
    </li>`;
}

const column = (index: number, head: string, body: string) => `
  <div
    class="sp-surface"
    data-part="col-${index}"
    style="display: flex; flex-direction: column; flex: 0 0 auto; width: ${COL_W}px; height: ${COL_H}px; overflow: hidden"
  >
    <span class="sp-label" data-part="head-${index}" style="flex: 0 0 auto; padding: 6px 8px; border-bottom: 1px solid var(--sp-line)">${head}</span>
    <ul class="sp-list" data-part="list-${index}" style="flex: 1 1 auto; min-height: 0; padding: 2px">${body}</ul>
  </div>`;

/**
 * Miller columns specimen: a small library browsed through four side-by-side columns, where
 * choosing an item fills the column to its right and the set slides sideways once the path runs
 * past the viewport.
 *
 * The subject is the column set, not one column and not one row: the term names the arrangement
 * of levels side by side and the sliding that keeps them there (SPEC §5). Every state is honestly
 * that arrangement, so no `data-pose` condition is needed. The window chrome and the path readout
 * are scenery in the context register; the readout in particular is instrumentation, since the
 * columns themselves are what keep the path visible.
 *
 * All four columns exist from mount and hold their boxes, so filling one moves nothing (SPEC §5).
 * Choosing a row sets the selection at that level rather than toggling it, so a resumed pass lands
 * on a state instead of undoing one (SPEC §8), and only the columns to the right of the click are
 * rebuilt, so the row a click landed on is never pulled out from under it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Library</span>
          <span class="sp-label">depth, paid for in width</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 10px 12px">
          <div
            data-part="columns"
            data-subject
            data-depth="2"
            style="position: relative; flex: 0 0 auto; width: ${VIEW_W}px; height: ${COL_H}px; overflow: hidden"
          >
            <div
              data-part="track"
              style="position: absolute; left: 0; top: 0; display: flex; gap: ${GAP}px; width: ${TRACK_W}px; height: ${COL_H}px;
                     translate: 0 0; transition: translate 0.3s var(--sp-ease)"
            >
              ${column(1, 'Library', '')}
              ${column(2, '', '')}
              ${column(3, '', '')}
              ${column(4, '', '')}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="path" style="flex: 0 0 auto; height: 20px; font-size: 12px"></span>
        </div>
      </div>
    </div>
  `;

  const columns = part(root, 'columns');
  const track = part(root, 'track');
  const path = part(root, 'path');
  const cols = [1, 2, 3, 4].map((index) => part(root, `col-${index}`));
  const lists = [1, 2, 3, 4].map((index) => part(root, `list-${index}`));
  const heads = [1, 2, 3, 4].map((index) => part(root, `head-${index}`));

  /** Which row is chosen at each level; -1 is "nothing chosen here yet". */
  const chosen: number[] = [0, -1, -1];
  const at = (level: number) => chosen[level - 1] ?? -1;

  /** Columns from `from` rightwards are rebuilt; the ones left of it only restate their selection. */
  const render = (from: number) => {
    const branch = ROOTS[at(1)];
    const level2 = at(2) >= 0 ? branch?.children[at(2)] : undefined;
    const leaf = at(3) >= 0 ? level2?.leaves[at(3)] : undefined;
    const depth = leaf ? 4 : level2 ? 3 : 2;

    const bodies = [
      ROOTS.map((entry, index) => item(1, index, entry.name, index === at(1), true)).join(''),
      (branch?.children ?? []).map((entry, index) => item(2, index, entry.name, index === at(2), true)).join(''),
      (level2?.leaves ?? []).map((name, index) => item(3, index, name, index === at(3), false)).join(''),
      leaf
        ? `<li data-part="preview" style="display: flex; flex-direction: column; gap: 8px; padding: 8px">
             <span class="sp-swatch" style="height: 46px; --sp-swatch: var(--sp-accent-soft)"></span>
             <span class="sp-heading" style="font-size: 12px">${leaf}</span>
             <span class="sp-label" style="font-size: 11px">${branch?.kind ?? ''}</span>
             <span class="sp-label" style="font-size: 11px">in ${level2?.name ?? ''}</span>
           </li>`
        : '',
    ];

    for (const [index, list] of lists.entries()) {
      const level = index + 1;
      if (level >= from) {
        list.innerHTML = bodies[index] ?? '';
        continue;
      }
      for (const row of [...list.children]) flag(row, 'data-selected', Number((row as HTMLElement).dataset.index) === at(level));
    }

    const headings = ['Library', branch?.name ?? '', level2?.name ?? '', leaf ?? ''];
    for (const [index, head] of heads.entries()) head.textContent = headings[index] ?? '';

    // A column that has nothing to hold yet keeps its box and drops its fill, so the level waiting
    // to the right reads as reserved room rather than as a card cut off by the viewport (SPEC §5).
    const filled = [true, true, Boolean(level2), Boolean(leaf)];
    for (const [index, col] of cols.entries()) {
      const has = filled[index] ?? false;
      col.dataset.filled = has ? 'yes' : 'no';
      col.style.background = has ? 'var(--sp-surface)' : 'transparent';
      col.style.borderStyle = has ? 'solid' : 'dashed';
      const head = heads[index];
      if (head) head.style.borderBottomWidth = has ? '1px' : '0';
    }

    columns.dataset.depth = String(depth);
    track.style.translate = depth === 4 ? `${-SHIFT}px 0` : '0 0';
    path.textContent = [branch?.name, level2?.name, leaf].filter(Boolean).join(' › ');
  };

  // One delegated listener, so a rebuilt column never needs rebinding and no handler ever
  // synthesizes a second click of its own (SPEC §8).
  columns.addEventListener('click', (event) => {
    const row = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-level]');
    if (!row) return;
    const level = Number(row.dataset.level);
    chosen[level - 1] = Number(row.dataset.index);
    for (let deeper = level; deeper < chosen.length; deeper += 1) chosen[deeper] = -1;
    render(level + 1);
  });

  render(1);
}
