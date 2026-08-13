import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Entry = { title: string; from: string; body: string[] };

const ENTRIES: Entry[] = [
  { title: 'Lock 4 closure', from: 'Canal office', body: ['96%', '88%', '74%'] },
  { title: 'Winter mooring', from: 'Harbour master', body: ['92%', '80%', '86%'] },
  { title: 'Dredging survey', from: 'Survey team', body: ['90%', '76%', '84%'] },
  { title: 'Bridge repaint', from: 'Works depot', body: ['94%', '70%', '88%'] },
  { title: 'Ferry timetable', from: 'Operations', body: ['86%', '92%', '68%'] },
];

/** Wide enough for both panes, and narrow enough for only one. */
const WIDTHS = { wide: 428, narrow: 226 };
const LIST_TRACK = '148px';

/**
 * List detail specimen: an index on the left and the entry it selects on the right, plus a
 * narrow width where the pair becomes two screens with an explicit Back control.
 *
 * The subject is the two-pane region, not the whole scene. The pairing is the term, but the
 * width switcher above it is the specimen's own instrumentation and never part of what the
 * word names (SPEC §5), so the region is the narrowest honest answer and identify keeps
 * something to point at.
 *
 * Selecting is absolute: each row names its own entry, and Back is an explicit dismissal
 * rather than a toggle (SPEC §8). The region keeps a fixed height at both widths, so
 * collapsing moves nothing outside it.
 */
export function mount(root: HTMLElement): void {
  const rows = ENTRIES.map(
    (entry, i) => `
      <button
        class="sp-list-item"
        type="button"
        data-part="item-${i}"
        ${i === 0 ? 'data-selected' : ''}
        style="appearance: none; border: 0; width: 100%; font: inherit; font-size: 13px; text-align: left; background: transparent; cursor: pointer"
      >
        <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${entry.title}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Window</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="wide">
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; justify-content: center; align-items: center">
          <div
            class="sp-grid"
            data-part="region"
            data-subject
            data-width="wide"
            data-pane="detail"
            style="width: ${WIDTHS.wide}px; height: 186px; gap: 0; grid-template-columns: ${LIST_TRACK} 1fr; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div data-part="list" class="sp-scroll" style="min-width: 0; border-right: 1px solid var(--sp-line)">
              <div class="sp-label" style="padding: 8px 10px 4px">Notices</div>
              <div class="sp-list" style="padding: 0 4px 6px">${rows}</div>
            </div>
            <div data-part="detail" data-item="0" style="min-width: 0; display: flex; flex-direction: column; padding: 10px 12px">
              <div class="sp-row" style="gap: 6px">
                <span style="flex: 0 0 auto; width: 26px">
                  <button class="sp-icon-button" type="button" data-part="back" hidden style="width: 24px; height: 24px">
                    ${icon('chevronLeft')}
                    <span class="sp-visually-hidden">Back to notices</span>
                  </button>
                </span>
                <span class="sp-heading sp-grow" data-part="detail-title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"></span>
              </div>
              <span class="sp-label" data-part="detail-from" style="margin: 2px 0 10px 26px"></span>
              <div class="sp-stack" data-part="detail-body" style="gap: 8px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const list = part(root, 'list');
  const detail = part(root, 'detail');
  const back = part(root, 'back');
  const title = part(root, 'detail-title');
  const from = part(root, 'detail-from');
  const body = part(root, 'detail-body');
  const items = ENTRIES.map((_, i) => part(root, `item-${i}`));

  const select = (index: number) => {
    const entry = ENTRIES[index];
    if (!entry) return;
    for (const [i, item] of items.entries()) flag(item, 'data-selected', i === index);
    detail.dataset.item = String(index);
    title.textContent = entry.title;
    from.textContent = entry.from;
    body.innerHTML = entry.body.map((width) => `<div class="sp-line" style="width: ${width}"></div>`).join('');
    if (region.dataset.width === 'narrow') showPane('detail');
  };

  const showPane = (pane: 'list' | 'detail') => {
    region.dataset.pane = pane;
    const narrow = region.dataset.width === 'narrow';
    list.hidden = narrow && pane !== 'list';
    detail.hidden = narrow && pane !== 'detail';
    back.hidden = !narrow;
  };

  const setWidth = (key: string) => {
    const narrow = key === 'narrow';
    region.dataset.width = narrow ? 'narrow' : 'wide';
    region.style.width = `${narrow ? WIDTHS.narrow : WIDTHS.wide}px`;
    region.style.gridTemplateColumns = narrow ? '1fr' : `${LIST_TRACK} 1fr`;
    list.style.borderRight = narrow ? '0' : '1px solid var(--sp-line)';
    // Collapsing lands on the index, which is where a reader picks again; expanding
    // puts both panes back with the selection still marked.
    showPane(narrow ? 'list' : 'detail');
  };

  for (const [i, item] of items.entries()) item.addEventListener('click', () => select(i));
  back.addEventListener('click', () => showPane('list'));
  part(root, 'switcher').addEventListener('change', (event) => setWidth((event as CustomEvent<string>).detail));

  select(0);
  setWidth('wide');
}
