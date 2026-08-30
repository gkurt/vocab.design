import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the next page takes to arrive, and how close to the end asks for it. */
const FETCH_MS = 1100;
const NEAR_PX = 48;
const FIRST = 6;
const PAGE = 4;

const NOTES = [
  ['Herring gulls on the west quay', '9:02'],
  ['Tide line further up than Tuesday', '9:14'],
  ['Two seals off the slipway', '9:31'],
  ['Fog bank sitting past the bar', '10:05'],
  ['Ferry ran early, no queue', '10:22'],
  ['Wind backed round to the north', '10:48'],
  ['Sand martins in the cliff face', '11:03'],
  ['Crab boat landed forty pots', '11:19'],
  ['Rain on the far headland only', '11:40'],
  ['Oystercatchers working the mud', '12:02'],
  ['Swell dropping off the point', '12:18'],
  ['Last light on the harbour wall', '12:35'],
] as const;

const SENTINEL = {
  idle: '',
  loading: `
    <span class="sp-stack sp-grow" style="gap: 6px">
      <span class="sp-skeleton" style="height: 8px; width: 72%"></span>
      <span class="sp-skeleton" style="height: 8px; width: 44%"></span>
    </span>`,
  end: '<span class="sp-text sp-grow">Nothing left to load</span>',
} as const;

function row(index: number): string {
  const [text, when] = NOTES[index] ?? ['', ''];
  return `
    <li class="sp-list-item" data-part="item-${index + 1}">
      <span class="sp-grow">${text}</span>
      <span class="sp-text">${when}</span>
    </li>`;
}

/**
 * Infinite scroll specimen: the scroll itself is the request. The subject is the
 * scroller, because that is the whole difference from load more, whose subject is the
 * button it ends in: here there is no control to press, and the page arrives because
 * the reader came near the bottom of this box.
 *
 * A line under the feed once read "A real feed never reaches the end of itself.", which was
 * the site talking over a product that visibly does end twelve notes in. The article makes
 * the point, so the line went.
 *
 * The sentinel is the last row, and it says out loud what an IntersectionObserver
 * would be watching for. It holds its height in every state, so the arrival of a page
 * never re-lays the rows already read (SPEC §5), and the fetch is a clock timer, so a
 * pose can hold the loading row still (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Field notes</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="feed" data-subject style="padding: 0 4px">
            ${Array.from({ length: FIRST }, (_, i) => row(i)).join('')}
            <li class="sp-row" data-part="sentinel" data-state="idle" style="flex: 0 0 auto; height: 36px; padding: 0 10px"></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  const sentinel = part(root, 'sentinel');

  let shown = FIRST;
  let loading = false;

  const setSentinel = (state: keyof typeof SENTINEL) => {
    sentinel.dataset.state = state;
    sentinel.innerHTML = SENTINEL[state];
  };

  // Only a scroll asks for a page. Nothing runs while the specimen sits idle (SPEC §5),
  // and nothing loads before the reader has been anywhere near the bottom.
  feed.addEventListener('scroll', () => {
    if (loading || shown >= NOTES.length) return;
    if (feed.scrollHeight - feed.scrollTop - feed.clientHeight > NEAR_PX) return;
    loading = true;
    setSentinel('loading');
    clock.setTimeout(() => {
      const next = Math.min(shown + PAGE, NOTES.length);
      // Appended before the sentinel, so the row that asks for the next page stays last.
      sentinel.insertAdjacentHTML('beforebegin', Array.from({ length: next - shown }, (_, i) => row(shown + i)).join(''));
      shown = next;
      loading = false;
      setSentinel(shown >= NOTES.length ? 'end' : 'idle');
    }, FETCH_MS);
  });
}
