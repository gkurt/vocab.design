import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PAGE_W = 452;
const PAGE_H = 196;
const GAP = 8;

interface Item {
  key: string;
  title: string;
  /** Where the item sits in each arrangement, as a grid area. */
  ranked: string;
  flat: string;
  /** Picture height, headline size and how many lines of copy, in the ranked arrangement. */
  rankedPicture: number;
  rankedType: number;
  rankedLines: number;
}

const ITEMS: Item[] = [
  {
    key: 'lead',
    title: 'The long way round',
    ranked: '1 / 1 / 5 / 3',
    flat: '1 / 1 / 4 / 2',
    rankedPicture: 56,
    rankedType: 16,
    rankedLines: 2,
  },
  {
    key: 'second-1',
    title: 'Studio notes',
    ranked: '5 / 1 / 7 / 2',
    flat: '1 / 2 / 4 / 3',
    rankedPicture: 18,
    rankedType: 12,
    rankedLines: 0,
  },
  {
    key: 'second-2',
    title: 'A shorter route',
    ranked: '5 / 2 / 7 / 3',
    flat: '1 / 3 / 4 / 4',
    rankedPicture: 18,
    rankedType: 12,
    rankedLines: 0,
  },
  {
    key: 'brief-1',
    title: 'Weather holds',
    ranked: '1 / 3 / 3 / 4',
    flat: '4 / 1 / 7 / 2',
    rankedPicture: 0,
    rankedType: 11,
    rankedLines: 1,
  },
  {
    key: 'brief-2',
    title: 'Ferries resume',
    ranked: '3 / 3 / 5 / 4',
    flat: '4 / 2 / 7 / 3',
    rankedPicture: 0,
    rankedType: 11,
    rankedLines: 1,
  },
  {
    key: 'brief-3',
    title: 'Market steady',
    ranked: '5 / 3 / 7 / 4',
    flat: '4 / 3 / 7 / 4',
    rankedPicture: 0,
    rankedType: 11,
    rankedLines: 1,
  },
];

/** Flat means equal: one picture height and one headline size for all six. */
const FLAT_PICTURE = 30;
const FLAT_TYPE = 12;

const MODES = [
  { key: 'ranked', label: 'ranked' },
  { key: 'flat', label: 'equal tiles' },
];

/**
 * Magazine layout specimen: one page of six items, arranged either ranked or flat, picked
 * absolutely. Ranked, the lead takes two of the three tracks and four of the six rows, with the
 * biggest picture and the biggest headline, two seconds share the row beneath it and three briefs
 * run down a narrow rail. Flat, the same six items become equal tiles at one picture height and
 * one type size, and the page stops saying which story matters.
 *
 * The subject is the lead item, `data-part="lead"`, since the dominance is what the term is
 * about. The seconds, the briefs, the page, the picker and the readout are scenery in the context
 * register. The flat arrangement is a counter-example the subject passes through, so the lead
 * declares the honest condition in `data-pose` and mounts satisfying it (SPEC §6). The page keeps
 * its own box in both arrangements, so nothing outside it moves (SPEC §5).
 *
 * `data-rank` is measured, not declared: the demo reads the lead's area against the largest of
 * the other five and reports whether it is still dominant. Nothing here transitions a size, so
 * the read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tile = (item: Item) => `
    <article
      data-part="${item.key}"
      ${item.key === 'lead' ? 'data-subject data-rank="lead" data-pose="[data-rank=lead]"' : 'class="sp-context"'}
      style="display: flex; flex-direction: column; gap: 4px; min-width: 0; overflow: hidden; padding: 5px 8px;
             background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
    >
      <div
        data-part="picture-${item.key}"
        style="flex: 0 0 auto; border-radius: 4px; background: linear-gradient(150deg, var(--sp-accent-soft), var(--sp-accent) 160%)"
      ></div>
      <h3
        data-part="headline-${item.key}"
        style="margin: 0; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
      >${item.title}</h3>
      <div data-part="copy-${item.key}" style="display: flex; flex-direction: column; gap: 4px">
        <span class="sp-line" style="width: 96%; height: 5px"></span>
        <span class="sp-line" data-part="extra-${item.key}" style="width: 74%; height: 5px"></span>
      </div>
    </article>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${PAGE_W}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Front page</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-value="ranked" data-axis="Arrangement" data-term="ranked">
          ${MODES.map(
            (mode) => `
            <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
          ).join('')}
        </sp-segmented>
      </div>

      <div
        data-part="page"
        style="display: grid; gap: ${GAP}px; grid-template-rows: repeat(6, 1fr); width: ${PAGE_W}px; height: ${PAGE_H}px;
               padding: 8px; background: var(--sp-sunken); border-radius: var(--sp-radius)"
      >${ITEMS.map(tile).join('')}</div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: ${PAGE_W}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const page = part(root, 'page');
  const lead = part(root, 'lead');
  const note = part(root, 'note');
  const tiles = ITEMS.map((item) => ({ item, el: part(root, item.key) }));

  const apply = (key: string) => {
    const ranked = key === 'ranked';
    page.style.gridTemplateColumns = ranked ? '1fr 1fr 116px' : 'repeat(3, 1fr)';

    for (const { item, el } of tiles) {
      el.style.gridArea = ranked ? item.ranked : item.flat;
      const picture = part(root, `picture-${item.key}`);
      const height = ranked ? item.rankedPicture : FLAT_PICTURE;
      picture.style.display = height > 0 ? 'block' : 'none';
      picture.style.height = `${height}px`;
      part(root, `headline-${item.key}`).style.fontSize = `${ranked ? item.rankedType : FLAT_TYPE}px`;
      const lines = ranked ? item.rankedLines : 1;
      part(root, `copy-${item.key}`).style.display = lines > 0 ? 'flex' : 'none';
      part(root, `extra-${item.key}`).style.display = lines > 1 ? 'block' : 'none';
    }

    // Read back on boxes nothing transitions: is the lead still the biggest thing on the page?
    const area = (el: HTMLElement) => {
      const box = el.getBoundingClientRect();
      return box.width * box.height;
    };
    const leadArea = area(lead);
    const rest = tiles.filter(({ item }) => item.key !== 'lead').map(({ el }) => area(el));
    const biggest = Math.max(...rest);
    const times = leadArea / Math.max(biggest, 1);
    lead.dataset.rank = times > 1.6 ? 'lead' : 'equal';
    note.textContent =
      times > 1.6
        ? `The lead takes ${times.toFixed(1)} times the area of the next item, and the biggest headline on the page.`
        : 'Six equal tiles: the same six stories, and nothing left saying which one is the lead.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('ranked');
}
