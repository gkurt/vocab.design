import { part } from '#src/kit/parts.ts';

/** Card geometry, stated once: the readout and the state flags are arithmetic from it. */
const CARD_W = 88;
const CARD_GAP = 8;
const SHELF_H = 56;

interface Shelf {
  key: string;
  title: string;
  count: number;
}

const SHELVES: Shelf[] = [
  { key: 'a', title: 'Continue watching', count: 12 },
  { key: 'b', title: 'Documentaries', count: 12 },
  { key: 'c', title: 'Because you watched Kirkwall', count: 12 },
];

/** Which shelf the term is demonstrated on, and the one the readout reports. */
const SUBJECT = 'b';

const card = (shelf: Shelf, index: number) => `
  <div data-part="card-${shelf.key}-${index}" style="flex: 0 0 auto; width: ${CARD_W}px">
    <div
      class="sp-swatch"
      style="display: flex; align-items: flex-end; justify-content: flex-end; height: 34px; padding: 2px 5px;
             font-size: 10px; line-height: 1; color: var(--sp-muted); --sp-swatch: var(--sp-accent-soft)"
    >${index}</div>
    <div class="sp-line" style="width: ${58 + ((index * 13) % 34)}%; height: 6px; margin-top: 5px"></div>
  </div>`;

const row = (shelf: Shelf) => {
  const subject = shelf.key === SUBJECT;
  const cards = Array.from({ length: shelf.count }, (_, i) => card(shelf, i + 1)).join('');
  return `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="flex: 0 0 auto; gap: 3px">
      <span class="sp-label" data-part="title-${shelf.key}" style="font-size: 11px; line-height: 14px; height: 14px">${shelf.title}</span>
      <div
        class="sp-scroll"
        data-part="shelf-${shelf.key}"
        data-at="start"
        ${subject ? 'data-subject' : ''}
        role="list"
        aria-label="${shelf.title}"
        style="display: flex; align-items: flex-start; gap: ${CARD_GAP}px; height: ${SHELF_H}px;
               overflow-x: auto; overflow-y: hidden; scrollbar-width: none"
      >${cards}</div>
    </div>`;
};

/**
 * Content shelf specimen: three category rows stacked down a catalogue page, each holding twelve
 * cards in a row about four cards wide, each scrolled sideways on its own. The rows do not move
 * together and none of them moves by itself, which is the whole of the pattern.
 *
 * The subject is one shelf row, `data-part="shelf-b"`, not the stack of them: the term names the
 * row and its sideways reading, so the narrowest element that is honestly a shelf is one
 * scroller. The other two rows, their headings, the page chrome and the readout are scenery in
 * the context register (SPEC §5), which is what makes the subject row keep its tint while they
 * go quiet. A row is a shelf in every state it can reach, so no `data-pose` condition is needed.
 *
 * Every row is a fixed-height box holding cards of a fixed width, so scrolling one moves nothing
 * outside it and the readout has its line reserved (SPEC §5). The readout reports the subject
 * row's position from real `scroll` events, so a reader who takes over and flicks the row gets
 * the same reading the script does; `data-at` is coarse on purpose (start, mid, end), because
 * how many cards fit is the container's business and not a claim the term makes.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Catalogue</span>
          <span
            class="sp-label"
            data-part="readout"
            data-at="start"
            role="status"
            style="flex: 0 0 auto; width: 216px; font-size: 11px; text-align: right; white-space: nowrap"
          ></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px; padding: 10px 12px">
          ${SHELVES.map(row).join('')}
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const subjectShelf = part(root, `shelf-${SUBJECT}`);
  const subjectTitle = SHELVES.find((shelf) => shelf.key === SUBJECT)?.title ?? '';
  const subjectCount = SHELVES.find((shelf) => shelf.key === SUBJECT)?.count ?? 0;

  const where = (el: HTMLElement) => {
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft <= 4) return 'start';
    return el.scrollLeft >= max - 4 ? 'end' : 'mid';
  };

  const say = () => {
    const step = CARD_W + CARD_GAP;
    const first = Math.round(subjectShelf.scrollLeft / step) + 1;
    const fits = Math.max(1, Math.floor((subjectShelf.clientWidth + CARD_GAP) / step));
    const last = Math.min(subjectCount, first + fits - 1);
    const hidden = subjectCount - (last - first + 1);
    readout.dataset.at = where(subjectShelf);
    readout.textContent = `${subjectTitle}: ${first} to ${last} of ${subjectCount}, ${hidden} off the row`;
  };

  for (const shelf of SHELVES.map((entry) => part(root, `shelf-${entry.key}`))) {
    shelf.addEventListener('scroll', () => {
      shelf.dataset.at = where(shelf);
      if (shelf === subjectShelf) say();
    });
  }

  say();
}
