import { part, partsOf } from '#src/kit/parts.ts';

/** Row geometry, stated once: the list scrolls, so every height here is load-bearing. */
const HEAD_H = 25;
const ROW_H = 35;
const VIEW_H = 196;

interface Day {
  id: string;
  label: string;
  events: { id: string; time: string; title: string; length: string; next?: boolean }[];
}

/** Five days, one of them free, because a list has to say a free day out loud. */
const DAYS: Day[] = [
  {
    id: 'mon',
    label: 'Today &middot; Mon 14',
    events: [
      { id: 'review', time: '9:30', title: 'Design review', length: '45 min', next: true },
      { id: 'client', time: '13:00', title: 'Client call', length: '30 min' },
      { id: 'retro', time: '16:00', title: 'Retro', length: '1 hr' },
    ],
  },
  { id: 'tue', label: 'Tue 15', events: [] },
  {
    id: 'wed',
    label: 'Wed 16',
    events: [
      { id: 'deploy', time: '11:00', title: 'Deploy', length: '30 min' },
      { id: 'oneone', time: '15:00', title: '1:1 with Sam', length: '30 min' },
    ],
  },
  {
    id: 'thu',
    label: 'Thu 17',
    events: [
      { id: 'workshop', time: '10:00', title: 'Workshop', length: '2 hr' },
      { id: 'interview', time: '14:00', title: 'Interview', length: '45 min' },
    ],
  },
  { id: 'fri', label: 'Fri 18', events: [{ id: 'talk', time: '12:00', title: 'Lunch talk', length: '1 hr' }] },
];

const shortOf = (day: Day) => day.label.replace(/^Today &middot; /, '');

const row = (event: Day['events'][number]) => `
  <li
    data-part="ev-${event.id}"
    style="display: flex; align-items: center; gap: 9px; height: ${ROW_H}px; padding: 0 10px; border-top: 1px solid var(--sp-line)"
  >
    <span style="flex: 0 0 auto; width: 42px; text-align: right; font-size: 12px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${event.time}</span>
    <span aria-hidden="true" style="flex: 0 0 auto; width: 3px; height: 18px; border-radius: 2px; background: var(--sp-accent)"></span>
    <span class="sp-grow" style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${event.title}</span>
    ${
      event.next
        ? `<span class="sp-chip" data-part="next-chip" data-selected style="flex: 0 0 auto; padding: 1px 7px; font-size: 10px">Next</span>`
        : `<span style="flex: 0 0 auto; font-size: 11px; color: var(--sp-muted); white-space: nowrap">${event.length}</span>`
    }
  </li>`;

const sections = DAYS.map(
  (day) => `
    <li>
      <h3
        class="sp-label"
        data-part="day-${day.id}"
        data-day="${day.id}"
        style="position: sticky; top: 0; z-index: 1; margin: 0; height: ${HEAD_H}px; padding: 0 10px;
               background: var(--sp-sunken); border-top: 1px solid var(--sp-line); font-size: 11px; line-height: ${HEAD_H}px"
      >${day.label}</h3>
      <ul style="margin: 0; padding: 0; list-style: none">
        ${
          day.events.length
            ? day.events.map(row).join('')
            : `<li
                 data-part="empty-day"
                 style="display: flex; align-items: center; height: 34px; padding: 0 10px 0 54px; border-top: 1px solid var(--sp-line);
                        font-size: 12px; color: var(--sp-muted)"
               >Nothing scheduled</li>`
        }
      </ul>
    </li>`,
).join('');

/**
 * Agenda view specimen: the week as a list, a heading per day, the next thing at the top.
 * The subject is the list itself, since the term names this shape of the same data rather
 * than any one row in it or the app around it. Deliberately nothing grid-shaped: no hour
 * axis, no columns, no block sized by duration, because that view is the scheduler.
 *
 * Tuesday is free and says so. A grid shows an empty day for nothing, as a column of blank
 * cells; a list either drops the day, which makes the week read busier than it is, or
 * spends a row on it. The list used to be captioned with that argument ("The same events as
 * a list, grouped by day. A free day has to be said out loud."), which no calendar prints
 * under its own agenda; Tuesday's "Nothing scheduled" row makes the point on screen.
 *
 * The one thing that moves is the scroll, and the list answers it the way an agenda does:
 * the day headings stick while their day is on screen, and the day at the top of the
 * scroller is the one the app bar names. That is read from the headings' own offsets, which
 * are already in specimen pixels, so nothing here mixes coordinate spaces (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Agenda</span>
          <span
            class="sp-label"
            data-part="header-day"
            style="flex: 0 0 auto; width: 92px; text-align: right; white-space: nowrap"
          >${shortOf(DAYS[0] as Day)}</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <ul
            class="sp-surface sp-scroll"
            data-part="agenda"
            data-subject
            data-top-day="mon"
            aria-label="Agenda"
            style="position: relative; flex: 0 0 auto; width: 374px; height: ${VIEW_H}px; margin: 0; padding: 0; list-style: none"
          >${sections}</ul>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'agenda');
  const header = part(root, 'header-day');
  const headings = DAYS.map((day) => ({ day, el: part(root, `day-${day.id}`) }));

  const follow = () => {
    // Which day heading is at the top of the scroller: the last one that has passed it.
    // offsetTop is already in specimen pixels, so no scale conversion is owed here.
    let top = headings[0];
    for (const entry of headings) {
      if (entry.el.offsetTop <= list.scrollTop + 1) top = entry;
    }
    if (!top) return;
    list.dataset.topDay = top.day.id;
    header.textContent = shortOf(top.day);
    for (const entry of partsOf(root, `day-${top.day.id}`)) entry.setAttribute('data-current', '');
    for (const entry of headings) {
      if (entry.day.id !== top.day.id) entry.el.removeAttribute('data-current');
    }
  };

  list.addEventListener('scroll', follow);
  follow();
}
