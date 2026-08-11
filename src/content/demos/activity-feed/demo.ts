import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long between the two events that land while the specimen is watched. */
const BEAT_MS = 2200;

type Event = { actor: string; kind: IconName; verb: string; object: string; when: string };

const HISTORY: Event[] = [
  { actor: 'Rosa M.', kind: 'plus', verb: 'opened', object: 'Rebuild the west quay', when: '4m' },
  { actor: 'Jo W.', kind: 'star', verb: 'and 3 others starred', object: 'harbour-kit', when: '12m' },
  { actor: 'Pia K.', kind: 'pencil', verb: 'commented on', object: 'Tide tables', when: '26m' },
  { actor: 'Ivo S.', kind: 'share', verb: 'pushed 2 commits to', object: 'main', when: '1h' },
  { actor: 'Dee L.', kind: 'check', verb: 'closed', object: 'Crane hire invoice', when: '2h' },
  { actor: 'Cy R.', kind: 'inbox', verb: 'moved to In review', object: 'Quay lighting', when: '3h' },
];

const ARRIVALS: Event[] = [
  { actor: 'Fay N.', kind: 'eye', verb: 'requested a review on', object: 'Ferry timetable', when: 'now' },
  { actor: 'Ada M.', kind: 'check', verb: 'merged', object: 'Quay lighting', when: 'now' },
];

function row(event: Event, name: string): string {
  return `
    <li class="sp-list-item" data-part="${name}">
      <span class="sp-avatar">${event.actor.slice(0, 1)}</span>
      <span style="flex: 0 0 auto; color: var(--sp-muted)">${icon(event.kind)}</span>
      <span class="sp-grow sp-text" style="min-width: 0">
        <span class="sp-text--ink" style="font-weight: 500">${event.actor}</span>
        ${event.verb}
        <span class="sp-text--ink">${event.object}</span>
      </span>
      <span class="sp-text" style="flex: 0 0 auto">${event.when}</span>
    </li>`;
}

/**
 * Activity feed specimen: mixed events, newest first, each one an actor, a verb and
 * an object. Two more land on the clock while it is watched. The subject is the
 * list, not the panel it sits in: the term names the running record, and the header
 * above it is only somewhere to put the word "Activity".
 *
 * Arrivals insert at the top, the one end where a new row does not push the row
 * being read, and they land inside a scroll container, so nothing outside the list
 * moves at all (SPEC §5). The beat is a clock timer, so identify can hold a feed
 * still rather than inspect one that keeps growing under it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <span class="sp-label">harbour-kit</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list sp-scroll sp-surface" data-part="feed" data-subject data-count="${HISTORY.length}"
              style="height: 100%; padding: 0 4px">
            ${HISTORY.map((event, i) => row(event, `row-${i + 1}`)).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  const feed = part(root, 'feed');
  let landed = 0;

  const tick = () => {
    const event = ARRIVALS[landed];
    if (!event) return;
    landed += 1;
    // No entrance on the new row: a fade would mean the newest entry is the one
    // thing on screen a reader cannot yet read, which is backwards for a feed.
    feed.insertAdjacentHTML('afterbegin', row(event, `new-${landed}`));
    feed.dataset.count = String(HISTORY.length + landed);
    // The reader is at the top of a reverse chronological list, which is where the
    // newest entry belongs; anywhere else and the insert would move their place.
    feed.scrollTop = 0;
    if (landed < ARRIVALS.length) clock.setTimeout(tick, BEAT_MS);
  };

  clock.setTimeout(tick, BEAT_MS);
}
