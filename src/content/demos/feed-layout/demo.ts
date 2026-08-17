import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Post = { key: string; who: string; mark: string; when: string; width: number };

/** Four peers. Same width, same affordances, same weight: only the order ever changes. */
const POSTS: Post[] = [
  { key: 'post-a', who: 'Rosa Neary', mark: 'RN', when: '2 min', width: 92 },
  { key: 'post-b', who: 'Ivo Kranz', mark: 'IK', when: '14 min', width: 74 },
  { key: 'post-c', who: 'Mara Oyelaran', mark: 'MO', when: '1 h', width: 86 },
  { key: 'post-d', who: 'Bea Lund', mark: 'BL', when: '3 h', width: 68 },
];

/** The two ordering rules, each an absolute arrangement rather than a nudge (SPEC §8). */
const ORDERS: Record<string, { note: string; keys: string[] }> = {
  chronological: { note: 'newest first', keys: ['post-a', 'post-b', 'post-c', 'post-d'] },
  ranked: { note: 'most replied first', keys: ['post-c', 'post-a', 'post-d', 'post-b'] },
};

const card = (post: Post) => `
  <article class="sp-surface" data-part="${post.key}" style="flex: 0 0 auto; padding: 7px 11px">
    <div class="sp-row" style="gap: 8px; height: 24px">
      <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">${post.mark}</span>
      <span class="sp-grow" style="font-size: 12px; font-weight: 600">${post.who}</span>
      <span class="sp-label" style="font-size: 11px">${post.when}</span>
    </div>
    <div class="sp-line" style="width: ${post.width}%; margin-top: 6px"></div>
    <div class="sp-row" style="gap: 14px; height: 16px; margin-top: 7px; color: var(--sp-muted)">
      ${icon('heart')}
      <span style="font-size: 11px">reply</span>
      ${icon('share')}
    </div>
  </article>`;

/**
 * Feed layout specimen: one column of equivalent cards in a scroller, with the ordering
 * rule as an explicit pick and a "new posts" affordance above it.
 *
 * The subject is the column itself, the scroller holding the repeating items, not the
 * screen around it and not any one card: the term names the arrangement, and a card is
 * only its unit. The topbar, the rule label, and the new-posts pill are the instrumentation
 * that makes the arrangement watchable, so they wear the context register (SPEC §5).
 *
 * Reordering is `order` on the flex children rather than a rebuilt list, so the same four
 * elements survive the switch and nothing in the column changes size when the rule does.
 * The column reports where it is scrolled as `data-at`, since an item scrolled past the
 * bottom of a scroller still has a box and a script cannot ask about it any other way.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="chronological">
            <button class="sp-segment" type="button" data-part="seg-chrono" value="chronological">chronological</button>
            <button class="sp-segment" type="button" data-part="seg-ranked" value="ranked">ranked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div class="sp-row sp-row--between sp-context" style="width: 308px; height: 26px">
            <span class="sp-label" data-part="rule">newest first</span>
            <button class="sp-chip" type="button" data-part="new-posts">
              <span style="display: inline-flex; rotate: 180deg">${icon('chevronDown')}</span>New posts
            </button>
          </div>
          <div
            class="sp-scroll"
            data-part="feed"
            data-subject
            data-order="chronological"
            data-at="top"
            role="feed"
            aria-label="Posts"
            style="display: flex; flex-direction: column; gap: 6px; width: 308px; height: 190px; padding: 2px"
          >
            ${POSTS.map(card).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  const rule = part(root, 'rule');
  const cards = new Map<string, HTMLElement>(POSTS.map((post) => [post.key, part(root, post.key)]));

  const span = () => Math.max(feed.scrollHeight - feed.clientHeight, 0);

  const sync = () => {
    const max = span();
    const at = max > 0 ? feed.scrollTop / max : 0;
    if (max <= 0) feed.dataset.at = 'none';
    else if (at <= 0.02) feed.dataset.at = 'top';
    else if (at >= 0.98) feed.dataset.at = 'end';
    else feed.dataset.at = 'middle';
  };

  const apply = (key: string) => {
    const order = ORDERS[key];
    if (!order) return;
    feed.dataset.order = key;
    rule.textContent = order.note;
    order.keys.forEach((name, i) => {
      const el = cards.get(name);
      if (!el) return;
      el.style.order = String(i);
      if (i === 0) el.setAttribute('data-first', '');
      else el.removeAttribute('data-first');
    });
  };

  feed.addEventListener('scroll', sync);

  // The affordance returns the reader to the head of the column instead of inserting
  // items under the one they are reading. An absolute destination, so a script that
  // arrives here mid-pass lands in the same place every time (SPEC §8).
  part(root, 'new-posts').addEventListener('click', () => {
    feed.scrollTop = 0;
    sync();
  });

  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('chronological');
  sync();
}
