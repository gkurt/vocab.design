import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * Slower than a real scroll handler would run (16 to 100 ms is the usual range), because
 * the gap between the two readouts is the thing to look at here.
 */
const INTERVAL_MS = 300;
const FEED_HEIGHT = 88;

const PANEL = 'display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; padding: 8px 10px';

const ROWS = [
  'Mara opened a ticket',
  'Build 4182 passed',
  'Sam left a comment',
  'Deploy to staging',
  'Ola renamed a branch',
  'Build 4183 passed',
  'Kit updated a token',
  'Sam closed a ticket',
  'Build 4184 queued',
  'Mara joined the call',
];

/**
 * Throttle specimen: one scroller, two listeners on it, and a readout each. The eager
 * readout answers every scroll event; the throttled one answers at most once every
 * interval and reports the position it sampled. The subject is the throttled readout,
 * for the same reason it is in the debounce specimen: the scroller is shared by both
 * listeners and belongs to neither.
 *
 * `data-capped` is the claim the term makes, stated as an attribute so a choreography
 * can prove it: more events arrived than answers went out. It is robust in a way a
 * count is not, since the number of ticks a burst produces depends on how long the
 * burst took, and a scripted scroll is timed by the player rather than by the demo.
 *
 * The feed's title bar carried "One scroller, two listeners" beside the heading, which was
 * the site describing the wiring in the product's own chrome. It is gone; the two panels
 * below say which listener each one is, and the article says the rest.
 *
 * Both edges are here, which is what a throttle usually means in practice: the first
 * event is answered at once, and the last one is answered after the interval so the
 * readout is not left holding a stale position. The trailing timer is the stage's, so a
 * pose cannot let it fire mid-inspection (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const panel = (key: string, title: string, subject: boolean) => `
    <div class="sp-surface${subject ? '' : ' sp-context'}" data-part="${key}" data-calls="0"${subject ? ' data-subject' : ''} style="${PANEL}">
      <div class="sp-row sp-row--between">
        <span class="sp-label">${title}</span>
        <span class="sp-text" data-part="count-${key}" style="width: 66px; text-align: right">0 calls</span>
      </div>
      <span class="sp-text sp-text--ink" data-part="value-${key}" style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums">
        top 0px
      </span>
    </div>`;

  const rows = ROWS.map(
    (text) => `
      <li class="sp-list-item">
        <span class="sp-avatar">${text.slice(0, 1)}</span>
        <span class="sp-grow sp-text sp-text--ink">${text}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <ul class="sp-scroll sp-list sp-surface sp-context" data-part="feed" style="height: ${FEED_HEIGHT}px; padding: 0 4px">
            ${rows}
          </ul>
          <div class="sp-row" style="align-items: stretch; gap: 10px">
            ${panel('eager', 'Every scroll event', false)}
            ${panel('throttled', `Throttled to ${INTERVAL_MS} ms`, true)}
          </div>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  const throttled = part(root, 'throttled');
  let events = 0;
  let ticks = 0;
  let lastTick = 0;
  let trailing: number | undefined;

  const record = (key: string, calls: number) => {
    const panelEl = part(root, key);
    panelEl.dataset.calls = String(calls);
    part(root, `count-${key}`).textContent = `${calls} call${calls === 1 ? '' : 's'}`;
    part(root, `value-${key}`).textContent = `top ${Math.round(feed.scrollTop)}px`;
  };

  const sample = () => {
    lastTick = performance.now();
    ticks += 1;
    record('throttled', ticks);
    flag(throttled, 'data-live', true);
    flag(throttled, 'data-capped', events > ticks);
  };

  feed.addEventListener('scroll', () => {
    events += 1;
    record('eager', events);
    flag(throttled, 'data-capped', events > ticks);

    // The whole term: an event inside the interval is not answered, it is absorbed. The
    // last one absorbed gets its answer when the interval runs out, so the readout ends
    // up holding the position the scroll finished at rather than the one it passed.
    const since = performance.now() - lastTick;
    if (since >= INTERVAL_MS) {
      clock.clearTimeout(trailing);
      trailing = undefined;
      sample();
      return;
    }
    if (trailing !== undefined) return;
    trailing = clock.setTimeout(() => {
      trailing = undefined;
      sample();
    }, INTERVAL_MS - since);
  });
}
