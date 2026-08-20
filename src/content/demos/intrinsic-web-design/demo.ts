import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const GAP = 8;
const PAD = 10;
const EDGE = 2;
/** The reserved box both layouts are drawn in, so nothing outside it moves (SPEC §5). */
const CANVAS = 400;
const TRACKS = 12;
const ITEM_H = 76;
const BAND_H = 52;
const CONTENT_H = ITEM_H + GAP + BAND_H;

/** A twelve column skeleton at this width: twelve equal tracks with the kit's own gutter. */
const SKELETON = `repeat(${TRACKS}, ${(CANVAS - (TRACKS - 1) * GAP) / TRACKS}px)`;
/** Content out tracks: each of the first two items asks for the width it needs, the third flexes. */
const INTRINSIC = 'max-content max-content 1fr';

interface Item {
  key: string;
  label: string;
  /** Absolute widths, because a percentage inside a `max-content` track has nothing to resolve against. */
  bars: number[];
  token?: string;
  span: string;
  cell: string;
}

const ITEMS: Item[] = [
  { key: 'item-a', label: 'Fuel', bars: [24, 18], span: '1 / 5', cell: '1' },
  { key: 'item-b', label: 'Chart', bars: [58], token: 'harbour-approach-chart.pdf', span: '5 / 9', cell: '2' },
  { key: 'item-c', label: 'Notices', bars: [96, 70, 84], span: '9 / 13', cell: '3' },
];

const item = (entry: Item, subject: boolean) => `
  <div
    data-part="${entry.key}"
    ${subject ? 'data-subject data-fit="fits" data-pose="[data-fit=fits]"' : 'class="sp-context"'}
    style="grid-row: 1; overflow: hidden; height: ${ITEM_H}px; padding: 6px; border-radius: 5px;
           background: var(--sp-surface); border: 1px solid ${subject ? 'var(--sp-accent)' : 'var(--sp-line)'}"
  >
    <span
      data-part="${entry.key}-inner"
      style="display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; white-space: nowrap"
    >
      <span style="font-size: 10px; font-weight: 500; line-height: 1.2; color: ${subject ? 'var(--sp-ink)' : 'var(--sp-muted)'}">${entry.label}</span>
      ${entry.token ? `<span style="font-size: 12px; line-height: 1.3; color: var(--sp-ink)">${entry.token}</span>` : ''}
      ${entry.bars
        .map(
          (w) =>
            `<span style="width: ${w}px; height: 5px; border-radius: 3px; background: ${subject ? 'var(--sp-accent-soft)' : 'var(--sp-line)'}"></span>`,
        )
        .join('')}
    </span>
  </div>`;

/**
 * Intrinsic web design specimen: one set of content laid out two ways, picked absolutely.
 * Extrinsic, a twelve column skeleton decides every width in advance and the content is poured
 * into it: the short item is stretched across four tracks it does not need, and the long file
 * name is cut off where its four tracks run out. Intrinsic, the tracks are sized from the
 * content instead (`max-content max-content 1fr`), so the short item gets exactly its own width,
 * the long name fits whole, and only the third item flexes. The skeleton ruler stays drawn in
 * both, which is how the second layout can be seen ignoring it.
 *
 * The subject is the chart item, `data-part="item-b"`: the element whose width comes from its
 * content rather than from the grid. The track itself was the other candidate and has no element
 * of its own to mark, and marking the whole grid would claim the term is the scene. Because the
 * extrinsic layout is a counter-example the subject passes through, it declares the honest
 * condition in `data-pose` and identify refuses to ring the cut version (SPEC §6); the mount
 * state is the intrinsic one, which satisfies it.
 *
 * `data-fit` is measured, not declared: the demo compares each item's own content width with the
 * room its cell gives it and reports `cut`, `stretched`, or `fits`. A grid template change is not
 * a transition, so the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 216px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Sizing</span>
          <sp-segmented class="sp-segmented" data-part="modes" data-value="intrinsic">
            <button class="sp-segment" type="button" data-part="seg-extrinsic" value="extrinsic"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">extrinsic</button>
            <button class="sp-segment" type="button" data-part="seg-intrinsic" value="intrinsic"
                    style="padding: 4px 10px; font-size: 11px; white-space: nowrap">intrinsic</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div
            style="display: flex; flex-direction: column; gap: 8px; width: ${CANVAS + 2 * PAD + 2 * EDGE}px; padding: ${PAD}px;
                   background: var(--sp-sunken); border: ${EDGE}px dashed var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-row sp-context" data-part="skeleton" style="width: ${CANVAS}px; height: 8px; gap: ${GAP}px">
              ${Array.from({ length: TRACKS }, () => '<span style="flex: 1 1 0; height: 8px; border-radius: 2px; background: var(--sp-line)"></span>').join('')}
            </div>

            <div
              data-part="grid"
              style="display: grid; grid-template-columns: ${INTRINSIC}; grid-template-rows: ${ITEM_H}px ${BAND_H}px;
                     gap: ${GAP}px; width: ${CANVAS}px; height: ${CONTENT_H}px"
            >
              ${ITEMS.map((entry) => item(entry, entry.key === 'item-b')).join('')}
              <div
                data-part="band"
                class="sp-context"
                style="grid-row: 2; grid-column: 1 / -1; display: flex; flex-direction: column; gap: 5px; overflow: hidden;
                       padding: 6px 8px; border-radius: 5px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
              >
                <span class="sp-label" style="font-size: 10px">Approach notes</span>
                <span class="sp-line" style="width: 96%; height: 5px"></span>
                <span class="sp-line" style="width: 74%; height: 5px"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="readout" style="width: 452px; justify-content: center; gap: 8px">
        ${['short', 'name', 'tracks']
          .map(
            (knob) => `
          <span
            data-part="val-${knob}"
            style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 142px; height: 20px;
                   border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted); font-size: 11px; white-space: nowrap"
          ></span>`,
          )
          .join('')}
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const grid = part(root, 'grid');
  const note = part(root, 'note');
  const cells = ITEMS.map((entry) => part(root, entry.key));
  const inners = ITEMS.map((entry) => part(root, `${entry.key}-inner`));
  const values = { short: part(root, 'val-short'), name: part(root, 'val-name'), tracks: part(root, 'val-tracks') };

  const apply = (key: string) => {
    const extrinsic = key === 'extrinsic';

    // Mount every box in the state it is about to be measured in (SPEC §5).
    grid.style.gridTemplateColumns = extrinsic ? SKELETON : INTRINSIC;
    for (const [i, cell] of cells.entries()) {
      const entry = ITEMS[i];
      if (!entry) continue;
      cell.style.gridColumn = extrinsic ? entry.span : entry.cell;
    }

    // Read back on boxes nothing transitions: what each item's content needs against what its
    // cell actually gave it.
    const fits = cells.map((cell, i) => {
      const room = cell.clientWidth - 12;
      const natural = inners[i]?.offsetWidth ?? 0;
      const fit = natural > room + 1 ? 'cut' : room - natural > 24 ? 'stretched' : 'fits';
      cell.dataset.fit = fit;
      return { room, natural, fit };
    });

    const short = fits[0];
    const name = fits[1];
    values.short.textContent = short ? `short item ${short.room}px for ${short.natural}px` : '';
    values.name.textContent = name ? `file name ${name.natural}px in ${name.room}px` : '';
    values.tracks.textContent = extrinsic ? `tracks ${TRACKS} fixed` : 'tracks content sized';
    note.textContent = extrinsic
      ? 'A 12 column skeleton: one item cut, another stretched to fill.'
      : 'Tracks sized from the content: both items get the width they need.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('intrinsic');
}
