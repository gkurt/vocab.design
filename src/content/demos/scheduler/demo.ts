import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The window this specimen shows: three days, four labelled hours from 9 AM. */
const DAYS = [
  { id: 'mon', label: 'Mon 14' },
  { id: 'tue', label: 'Tue 15' },
  { id: 'wed', label: 'Wed 16' },
];
const FIRST_HOUR = 9;
const HOURS = 4;
/** One hour's height, and the span an event may be placed in, both in minutes and px. */
const HOUR_PX = 34;
const PX_PER_MIN = HOUR_PX / 60;
const SPAN_MIN = HOURS * 60;
const COL_W = 132;
/** The hour axis on the left, wide enough for a labelled hour and for the all-day row's own name. */
const AXIS_W = 44;
const CANVAS_H = HOURS * HOUR_PX;
/** Slots are half an hour, which is what makes a dragged block land on a time and not between two. */
const SNAP_MIN = 30;

interface Event {
  id: string;
  title: string;
  day: number;
  /** Minutes from the top of the window, so the geometry and the clock are one number. */
  start: number;
  length: number;
  /** Does the block have the height for a second line of type? */
  tall: boolean;
}

const EVENTS: Event[] = [
  { id: 'review', title: 'Design review', day: 0, start: 30, length: 90, tall: true },
  { id: 'standup', title: 'Standup', day: 1, start: 0, length: 45, tall: false },
  { id: 'interview', title: 'Interview', day: 1, start: 30, length: 45, tall: false },
  { id: 'deploy', title: 'Deploy', day: 2, start: 120, length: 60, tall: true },
];

const hhmm = (minutes: number) => {
  const total = FIRST_HOUR * 60 + minutes;
  const hour = Math.floor(total / 60);
  return `${hour > 12 ? hour - 12 : hour}:${String(total % 60).padStart(2, '0')}`;
};

const slotOf = (event: Event) => {
  const total = FIRST_HOUR * 60 + event.start;
  return `${DAYS[event.day]?.id}-${String(Math.floor(total / 60)).padStart(2, '0')}${String(total % 60).padStart(2, '0')}`;
};

const axis = Array.from({ length: HOURS }, (_, i) => {
  const hour = FIRST_HOUR + i;
  const name = `${hour > 12 ? hour - 12 : hour} ${hour < 12 ? 'AM' : 'PM'}`;
  return `<span class="sp-label" style="position: absolute; right: 4px; top: ${i * HOUR_PX + 9}px; font-size: 9px; white-space: nowrap">${name}</span>`;
}).join('');

const headers = DAYS.map(
  ({ label }) =>
    `<span class="sp-label sp-text--ink" style="flex: 0 0 auto; width: ${COL_W}px; text-align: center; font-size: 11px; line-height: 20px">${label}</span>`,
).join('');

const blocks = EVENTS.map(
  (event) => `
    <button
      type="button"
      data-part="ev-${event.id}"
      data-slot="${slotOf(event)}"
      aria-label="${event.title}"
      style="position: absolute; left: 0; top: 0; width: 0; height: 0; display: flex; flex-direction: column; justify-content: flex-start;
             gap: 1px; padding: 2px 5px; border: 0; border-left: 3px solid var(--sp-accent); border-radius: 4px;
             background: var(--sp-accent-soft); color: var(--sp-ink); font: inherit; font-size: 10px; line-height: 1.25;
             text-align: left; overflow: hidden; cursor: grab; touch-action: none; user-select: none"
    >
      <span style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${event.title}</span>
      ${event.tall ? `<span data-part="time-${event.id}" style="font-size: 9px; color: var(--sp-muted)">${hhmm(event.start)}</span>` : ''}
    </button>`,
).join('');

/**
 * Scheduler specimen: three days across, four hours down, and every event a block in the
 * cell it really happens in. The subject is that grid surface (the day headings, the
 * all-day band and the hour field), because the term names the crossing of the two axes
 * rather than any one block in it. The window frame and its view switcher are scenery: a
 * scheduler is one of several ways to draw the same events, and the switcher is where that
 * choice lives without being part of the thing chosen.
 *
 * The window is a window on purpose. Seven days of twenty-four hours cannot be drawn
 * honestly at this size, so the axis is labelled and three days of four hours are shown,
 * rather than a grid of unlabelled cells pretending to be a week.
 *
 * Dragging a block is the real gesture, computed from the pointer. Capture is taken on a
 * trusted pointerdown, since a reader's drag would otherwise die the moment the pointer
 * leaves a 130 px block, and the guard is mandatory: the attract player's synthetic
 * pointers have nothing to capture and the call throws (SPEC §7). The pointer is read
 * through `localPoint` because a narrow column scales the whole stage, and a drag measured
 * off `clientY` would move a block by a fraction of the finger's travel (SPEC §5).
 *
 * Every block is absolutely placed inside the hour field, so a move changes nothing about
 * the rows around it (SPEC §5). What DOES move is a block sharing a slot with the one that
 * arrived: overlaps are laid out side by side at equal width, which is the scheduler doing
 * its own work rather than incidental shift.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Studio week</span>
          <div class="sp-segmented" role="tablist" aria-label="View">
            <span class="sp-segment" role="tab" aria-selected="false" style="padding: 3px 10px; font-size: 12px">Day</span>
            <span class="sp-segment" role="tab" aria-selected="true" style="padding: 3px 10px; font-size: 12px; background: var(--sp-surface)">Week</span>
            <span class="sp-segment" role="tab" aria-selected="false" style="padding: 3px 10px; font-size: 12px">Month</span>
          </div>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div
            class="sp-surface"
            data-part="scheduler"
            data-subject
            style="flex: 0 0 auto; width: 442px; overflow: hidden"
          >
            <div style="display: flex; height: 21px; border-bottom: 1px solid var(--sp-line)">
              <span style="flex: 0 0 auto; width: ${AXIS_W}px"></span>
              ${headers}
            </div>
            <div style="display: flex; align-items: center; height: 25px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${AXIS_W}px; padding-right: 6px; text-align: right; font-size: 9px; line-height: 24px; white-space: nowrap">all-day</span>
              <span style="flex: 0 0 auto; width: ${COL_W}px"></span>
              <span style="flex: 0 0 auto; width: ${COL_W}px; padding: 0 3px">
                <span
                  data-part="all-day"
                  style="display: block; padding: 1px 6px; border-radius: 3px; background: var(--sp-accent-soft);
                         border-left: 3px solid var(--sp-accent); font-size: 9px; line-height: 14px; white-space: nowrap;
                         overflow: hidden; text-overflow: ellipsis"
                >Offsite</span>
              </span>
              <span style="flex: 0 0 auto; width: ${COL_W}px"></span>
            </div>
            <div data-part="grid" style="position: relative; height: ${CANVAS_H}px">
              <div style="position: absolute; left: 0; top: 0; width: ${AXIS_W}px; height: 100%">${axis}</div>
              <div
                data-part="canvas"
                style="position: absolute; left: ${AXIS_W}px; top: 0; width: ${COL_W * DAYS.length}px; height: 100%;
                       background-image:
                         repeating-linear-gradient(to bottom, var(--sp-line) 0 1px, transparent 1px ${HOUR_PX}px),
                         repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px ${COL_W}px)"
              >
                ${blocks}
                <span data-part="drop" style="position: absolute; left: ${COL_W + 3}px; top: ${180 * PX_PER_MIN}px; width: ${COL_W - 6}px; height: ${HOUR_PX}px; pointer-events: none"></span>
                <span data-part="now" aria-hidden="true" style="position: absolute; left: 0; top: 41px; width: 100%; height: 8px; pointer-events: none">
                  <span style="position: absolute; left: 0; top: 0; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-warn)"></span>
                  <span style="position: absolute; left: 4px; right: 0; top: 3px; height: 2px; background: var(--sp-warn)"></span>
                </span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" style="width: 430px; margin-top: 8px; font-size: 11px; line-height: 1.35; text-align: center">
            Three of the week's days, four of its hours. Two events in one slot share the column.
          </span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const grid = part(root, 'grid');
  const blockOf = new Map(EVENTS.map((event) => [event.id, part(root, `ev-${event.id}`)]));

  /**
   * Place every block. Events sharing a day are swept in start order into overlap
   * clusters, and a cluster of n gets n equal sub-columns, which is the honest half-width
   * answer to two things booked at once.
   */
  const layout = () => {
    for (let day = 0; day < DAYS.length; day++) {
      const inDay = EVENTS.filter((event) => event.day === day).sort((a, b) => a.start - b.start);
      let cluster: Event[] = [];
      let clusterEnd = -1;
      const flush = () => {
        const lanes: number[] = [];
        for (const event of cluster) {
          let lane = lanes.findIndex((end) => end <= event.start);
          if (lane < 0) lane = lanes.length;
          lanes[lane] = event.start + event.length;
          const width = (COL_W - 6) / cluster.length;
          const el = blockOf.get(event.id);
          if (!el) continue;
          el.style.left = `${day * COL_W + 3 + lane * width}px`;
          el.style.width = `${width - (cluster.length > 1 ? 2 : 0)}px`;
          el.style.top = `${event.start * PX_PER_MIN}px`;
          el.style.height = `${event.length * PX_PER_MIN - 2}px`;
        }
        cluster = [];
        clusterEnd = -1;
      };
      for (const event of inDay) {
        if (cluster.length && event.start >= clusterEnd) flush();
        cluster.push(event);
        clusterEnd = Math.max(clusterEnd, event.start + event.length);
      }
      if (cluster.length) flush();
    }
  };

  const say = (event: Event) => {
    const el = blockOf.get(event.id);
    if (el) el.dataset.slot = slotOf(event);
    const time = root.querySelector<HTMLElement>(`[data-part="time-${event.id}"]`);
    if (time) time.textContent = hhmm(event.start);
  };

  let held: { event: Event; el: HTMLElement; x: number; y: number; start: number } | undefined;

  for (const event of EVENTS) {
    const el = blockOf.get(event.id);
    if (!el) continue;
    el.addEventListener('pointerdown', (pointer) => {
      // A drag has to keep reporting once the pointer leaves the block. Synthetic pointers
      // have no capture to take and the call throws, so the guard is mandatory (SPEC §7).
      if (pointer.isTrusted) el.setPointerCapture(pointer.pointerId);
      const at = localPoint(pointer, canvas);
      held = { event, el, x: at.x, y: at.y, start: event.start };
      el.style.cursor = 'grabbing';
      el.style.zIndex = '2';
      el.style.boxShadow = 'var(--sp-shadow)';
      grid.dataset.dragging = event.id;
    });
  }

  const move = (pointer: PointerEvent) => {
    if (!held) return;
    const at = localPoint(pointer, canvas);
    const wanted = held.start + (at.y - held.y) / PX_PER_MIN;
    const snapped = Math.round(wanted / SNAP_MIN) * SNAP_MIN;
    held.event.start = Math.max(0, Math.min(SPAN_MIN - held.event.length, snapped));
    held.event.day = Math.max(0, Math.min(DAYS.length - 1, Math.floor(at.x / COL_W)));
    layout();
    say(held.event);
  };

  const release = () => {
    if (!held) return;
    held.el.style.cursor = 'grab';
    held.el.style.zIndex = '';
    held.el.style.boxShadow = '';
    grid.dataset.dragging = 'none';
    held = undefined;
  };

  grid.addEventListener('pointermove', move);
  grid.addEventListener('pointerup', release);
  grid.addEventListener('pointercancel', release);

  grid.dataset.dragging = 'none';
  layout();
}
