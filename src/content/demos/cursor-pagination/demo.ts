import { part } from '#src/kit/parts.ts';

const PAGE = 3;
const TITLES: Record<number, string> = {
  9: 'Rye starter',
  8: 'Autolyse',
  7: 'Steam trick',
  6: 'Cold proof',
  5: 'Crumb shot',
  4: 'Banneton',
  3: 'Scoring',
  2: 'Levain',
  1: 'First loaf',
};

const VERDICT = {
  start: 'Both lanes are showing the same first page of the same feed.',
  inserted: 'A post arrived while the first page was being read. Neither rendered page changed.',
  offset: 'Offset page 2 opens with a post already read: everything after the insert slid down one.',
  proved: 'The cursor asked for what follows Cold proof, so it picked up exactly where it stopped.',
};

/**
 * Cursor pagination specimen: the same feed paged two ways, with a post inserted at the top
 * between the first page and the second. The offset lane asks for rows 4 to 6 and serves one
 * the reader has already seen; the cursor lane asks for what follows the last row it showed
 * and cannot repeat itself.
 *
 * The subject is the cursor lane's pager, the narrowest element the term names: Next and
 * Previous with no page numbers is the visible signature of paging by pointer, and it is the
 * part of the interface the mechanism actually dictates. The offset lane, its numbered pages,
 * the repeat marker, the insert control and the verdict line are the scene that makes the
 * difference legible, so they carry the context register (SPEC §5).
 *
 * Each lane keeps a fixed box with three row slots and a pager slot, so inserting a post and
 * paging forward rewrites rows without moving anything (SPEC §5). Both pagers advance rather
 * than toggle, and each stops at the end of the feed, so a resumed pass means the same thing
 * (SPEC §8). Repeats are counted from what each lane has actually shown and mirrored onto the
 * lane, so the claim is about the mechanism rather than about one authored row.
 *
 * A caption under the frame once read "Same feed, same insert, same forward step. Only the
 * question the second page asks is different." That was the article's sentence standing inside
 * the specimen, so it is gone; the insert button was likewise labelled "A post arrives", which
 * asked the reader to read it as narration rather than as the control it is, and now says what
 * pressing it does.
 */
export function mount(root: HTMLElement): void {
  const slots = (lane: string) =>
    [0, 1, 2]
      .map(
        (index) => `
        <div class="sp-list-item" data-part="${lane}-row-${index}" style="gap: 7px; height: 26px; padding: 0 7px; font-size: 11px">
          <span data-part="${lane}-id-${index}" style="flex: 0 0 auto; width: 18px; color: var(--sp-muted); font-variant-numeric: tabular-nums">#8</span>
          <span class="sp-grow" data-part="${lane}-title-${index}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Autolyse</span>
          <span
            class="sp-chip"
            data-part="${lane}-repeat-${index}"
            hidden
            style="flex: 0 0 auto; padding: 0 6px; font-size: 9.5px; cursor: default; white-space: nowrap"
          >seen</span>
        </div>`,
      )
      .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Bakes, newest first</span>
          <button class="sp-button sp-button--sm" data-part="insert" type="button" style="flex: 0 0 auto; white-space: nowrap">Add a post</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row" style="flex: 0 0 auto; align-items: stretch; gap: 8px; height: 142px">
            <div class="sp-surface sp-context" data-part="offset-lane" data-repeats="0" style="display: flex; flex-direction: column; flex: 1 1 0; min-width: 0; padding: 7px 8px; background: var(--sp-surface)">
              <span class="sp-label" data-part="offset-query" style="flex: 0 0 auto; height: 15px; line-height: 15px; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /bakes?page=1</span>
              <div style="flex: 1 1 auto; margin-top: 3px">${slots('offset')}</div>
              <div class="sp-row" data-part="offset-pager" style="flex: 0 0 auto; gap: 4px; height: 24px">
                ${[1, 2, 3]
                  .map(
                    (page) => `
                  <button
                    class="sp-chip"
                    data-part="offset-page-${page}"
                    type="button"
                    style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                    ${page === 1 ? 'data-selected' : ''}
                  >${page}</button>`,
                  )
                  .join('')}
              </div>
            </div>

            <div class="sp-surface" data-part="cursor-lane" data-repeats="0" style="display: flex; flex-direction: column; flex: 1 1 0; min-width: 0; padding: 7px 8px; background: var(--sp-surface)">
              <span class="sp-label" data-part="cursor-query" style="flex: 0 0 auto; height: 15px; line-height: 15px; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /bakes?first=3</span>
              <div style="flex: 1 1 auto; margin-top: 3px">${slots('cursor')}</div>
              <div class="sp-row" data-part="cursor-pager" data-subject style="flex: 0 0 auto; gap: 4px; height: 24px">
                <button
                  class="sp-chip"
                  data-part="cursor-prev"
                  type="button"
                  aria-disabled="true"
                  style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                >Previous</button>
                <button
                  class="sp-chip"
                  data-part="cursor-next"
                  type="button"
                  style="flex: 0 0 auto; padding: 1px 8px; font-size: 10.5px; white-space: nowrap"
                >Next</button>
              </div>
            </div>
          </div>

          <div data-stage-verdict class="sp-surface sp-context" data-part="verdict" data-state="start" style="flex: 1 1 auto; min-height: 0; padding: 7px 9px">
            <span class="sp-text sp-text--ink" data-part="verdict-text" style="display: block; font-size: 11px; line-height: 1.35">${VERDICT.start}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  let feed = [8, 7, 6, 5, 4, 3, 2, 1];
  let offsetPage = 1;
  let cursor: number | undefined;
  const seen: Record<'offset' | 'cursor', Set<number>> = { offset: new Set(), cursor: new Set() };
  const repeats: Record<'offset' | 'cursor', number> = { offset: 0, cursor: 0 };

  const verdict = part(root, 'verdict');
  const verdictText = part(root, 'verdict-text');

  const say = (state: keyof typeof VERDICT) => {
    verdict.dataset.state = state;
    verdictText.textContent = VERDICT[state];
  };

  const show = (lane: 'offset' | 'cursor', ids: number[]) => {
    let repeated = 0;
    for (let index = 0; index < PAGE; index += 1) {
      const id = ids[index];
      const row = part(root, `${lane}-row-${index}`);
      const chip = part(root, `${lane}-repeat-${index}`);
      row.toggleAttribute('hidden', id === undefined);
      if (id === undefined) {
        chip.hidden = true;
        continue;
      }
      part(root, `${lane}-id-${index}`).textContent = `#${id}`;
      part(root, `${lane}-title-${index}`).textContent = TITLES[id] ?? '';
      const again = seen[lane].has(id);
      chip.hidden = !again;
      if (again) repeated += 1;
      seen[lane].add(id);
    }
    repeats[lane] += repeated;
    part(root, `${lane}-lane`).dataset.repeats = String(repeats[lane]);
  };

  // First page of each lane, served from the same feed.
  show('offset', feed.slice(0, PAGE));
  show('cursor', feed.slice(0, PAGE));
  cursor = feed[PAGE - 1];

  part(root, 'insert').addEventListener('click', () => {
    if (feed[0] === 9) return;
    feed = [9, ...feed];
    say('inserted');
  });

  // Skip three more rows of whatever the feed is now: the offset is a position, not a place.
  part(root, 'offset-page-2').addEventListener('click', () => {
    if (offsetPage === 2) return;
    offsetPage = 2;
    part(root, 'offset-page-1').removeAttribute('data-selected');
    part(root, 'offset-page-2').setAttribute('data-selected', '');
    part(root, 'offset-query').textContent = 'GET /bakes?page=2';
    show('offset', feed.slice(PAGE, PAGE * 2));
    say('offset');
  });

  part(root, 'cursor-next').addEventListener('click', () => {
    const from = cursor === undefined ? -1 : feed.indexOf(cursor);
    const next = feed.slice(from + 1, from + 1 + PAGE);
    if (next.length === 0) return;
    part(root, 'cursor-query').textContent = `GET /bakes?after=${TITLES[cursor ?? 0] ?? ''}`;
    show('cursor', next);
    cursor = next[next.length - 1];
    part(root, 'cursor-prev').removeAttribute('aria-disabled');
    say('proved');
  });
}
