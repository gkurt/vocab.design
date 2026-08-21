import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const VIEW = { w: 300, h: 148 };
const ROW = 30;
const GAP = 4;
const PAD = 4;
/** The band along the bottom edge, and how fast holding in it scrolls (px per tick). */
const ZONE = 40;
const TICK_MS = 30;
const SLOW = 8;
const FAST = 24;

const TASKS = [
  'Charter the ferry',
  'Book the slipway',
  'Print tide tables',
  'Order buoy paint',
  'Service the winch',
  'Renew the moorings',
  'Chase the harbour permit',
  'Repaint the lights',
  'File the survey',
];

/** Where the scripted stroke starts and ends: a row near the top, a fixed point in the band. */
const DROP_AT = { x: VIEW.w / 2, y: VIEW.h - 14 };

const rowMarkup = TASKS.map(
  (name, i) => `
    <li
      class="sp-surface"
      data-part="row-${i + 1}"
      data-key="${i + 1}"
      style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: ${ROW}px; margin-bottom: ${GAP}px; padding: 0 8px; font-size: 12px; cursor: grab; touch-action: none; user-select: none"
    >
      <span aria-hidden="true" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; background: var(--sp-line)"></span>
      <span class="sp-grow" style="min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${name}</span>
      <span class="sp-label">${i + 1}</span>
    </li>`,
).join('');

/**
 * Drag autoscroll specimen: a backlog taller than its box, where holding a dragged row in the
 * band along the bottom edge makes the list scroll itself until an off-screen row arrives
 * under the pointer. The subject is the scroller, since the term names what the container
 * does with a drag held at its edge rather than the row being carried; the ruler and the
 * readouts are instrumentation and stay in the context register, while the drawn band is the
 * term's own geometry and the scripted stroke's end point is an unpainted anchor.
 *
 * Everything is computed from the pointer rather than mimed: the band is a test on the
 * pointer's depth into the last forty pixels, the speed is scaled by that depth, and the
 * scrolling itself runs on the stage's clock, which is what lets a pose stop it mid-travel.
 * Which rows were on screen when the press landed is recorded at `pointerdown`, so the
 * readout can say honestly whether the drop went somewhere the reader could see.
 *
 * The band and the ruler are drawn outside the scroller so they hold still while it moves,
 * the dragged row is dimmed rather than removed, and the insertion marker is a line in the
 * gap between rows, so nothing the drag is not carrying moves (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Backlog</span>
          <span class="sp-text" data-part="readout" data-drop="none" style="width: 236px; text-align: right; white-space: nowrap">Drag a row into the edge band</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${VIEW.w}px; height: ${VIEW.h}px">
            <div
              class="sp-scroll sp-surface"
              data-part="list"
              data-subject
              data-autoscroll="idle"
              data-moved="no"
              style="position: absolute; inset: 0; background: var(--sp-sunken)"
            >
              <ul class="sp-list" data-part="rows" style="position: relative; padding: ${PAD}px; gap: 0">
                ${rowMarkup}
                <span
                  data-part="marker"
                  style="position: absolute; left: ${PAD + 2}px; right: ${PAD + 2}px; top: 0; height: 2px; border-radius: 1px; background: var(--sp-accent); opacity: 0"
                ></span>
              </ul>
            </div>
            <div class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span
                data-part="zone"
                style="position: absolute; left: 0; right: 0; bottom: 0; height: ${ZONE}px; border-top: 1px dashed var(--sp-muted); background: rgb(127 132 145 / 0.22); border-bottom-left-radius: var(--sp-radius); border-bottom-right-radius: var(--sp-radius)"
              ></span>
              <!-- An unpainted anchor for the scripted stroke: a drawn stop point would annotate
                   the choreography rather than the term (SPEC §5). -->
              <span
                data-part="drop-dot"
                style="position: absolute; left: ${DROP_AT.x - 5}px; top: ${DROP_AT.y - 5}px; width: 10px; height: 10px"
              ></span>
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label" style="width: 40px">Scroll</span>
          <div class="sp-progress" data-part="ruler" style="width: 96px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
          <span class="sp-label sp-grow" style="text-align: right; white-space: nowrap">The band is the last ${ZONE} px, and the deeper the faster</span>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const rows = part(root, 'rows');
  const marker = part(root, 'marker');
  const readout = part(root, 'readout');
  const ruler = part(root, 'ruler').firstElementChild as HTMLElement;
  const items = TASKS.map((_, i) => part(root, `row-${i + 1}`));

  let dragged: HTMLElement | undefined;
  let pointerY = 0;
  let timer: number | undefined;
  let seenAtStart = new Set<HTMLElement>();
  /** The row the drop would land after, and whether that row was on screen at pointerdown. */
  let target: HTMLElement | undefined;

  const maxScroll = () => Math.max(1, list.scrollHeight - list.clientHeight);

  const say = (drop: string, text: string) => {
    readout.dataset.drop = drop;
    readout.textContent = text;
  };

  const drawRuler = () => {
    ruler.style.setProperty('--sp-value', `${(list.scrollTop / maxScroll()) * 100}%`);
    list.dataset.moved = list.scrollTop > 1 ? 'yes' : 'no';
  };

  const order = () => [...rows.querySelectorAll<HTMLElement>('[data-key]')];

  /** The row the pointer is on, or the last one it has passed, in the scroller's own box. */
  const rowAt = (y: number): HTMLElement | undefined => {
    const box = list.getBoundingClientRect();
    const at = box.top + Math.max(0, Math.min(VIEW.h - 1, y));
    const all = order();
    let found = all[0];
    for (const row of all) {
      if (row.getBoundingClientRect().top <= at) found = row;
    }
    return found;
  };

  const aim = () => {
    target = rowAt(pointerY);
    if (!target) return;
    marker.style.top = `${target.offsetTop + ROW + GAP / 2 - 1}px`;
    marker.style.opacity = '1';
  };

  const stopScroll = (state: 'idle' | 'end') => {
    clock.clearTimeout(timer);
    timer = undefined;
    list.dataset.autoscroll = state;
  };

  const tick = () => {
    if (!dragged) return stopScroll('idle');
    const depth = Math.min(1, Math.max(0, (pointerY - (VIEW.h - ZONE)) / ZONE));
    const step = SLOW + (FAST - SLOW) * depth;
    const before = list.scrollTop;
    list.scrollTop = Math.min(maxScroll(), before + step);
    drawRuler();
    aim();
    if (list.scrollTop === before) return stopScroll('end');
    flag(list, 'data-ran', true);
    say('running', `Scrolling at ${Math.round(step)} px a tick`);
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const follow = (clientY: number) => {
    const box = list.getBoundingClientRect();
    pointerY = clientY - box.top;
    aim();
    // Dwell inside the band is the trigger, so crossing it on the way somewhere costs
    // nothing: the run only starts once the pointer is still inside on a move.
    if (pointerY < VIEW.h - ZONE) {
      if (list.dataset.autoscroll !== 'idle') stopScroll('idle');
      say('holding', 'Above the band: the list holds still');
      return;
    }
    if (list.dataset.autoscroll === 'running' || list.dataset.autoscroll === 'end') return;
    list.dataset.autoscroll = 'running';
    tick();
  };

  for (const row of items) {
    row.addEventListener('pointerdown', (event) => {
      // A real drag has to survive leaving the row; a synthetic pointer cannot be captured.
      if (event.isTrusted) row.setPointerCapture(event.pointerId);
      dragged = row;
      seenAtStart = new Set(order().filter((other) => other.offsetTop + ROW > list.scrollTop && other.offsetTop < list.scrollTop + VIEW.h));
      row.style.opacity = '0.45';
      flag(row, 'data-dragging', true);
      follow(event.clientY);
    });
  }

  root.addEventListener('pointermove', (event) => {
    if (!dragged) return;
    follow(event.clientY);
  });

  const release = () => {
    if (!dragged) return;
    stopScroll('idle');
    const row = dragged;
    dragged = undefined;
    row.style.opacity = '';
    flag(row, 'data-dragging', false);
    marker.style.opacity = '0';
    if (target && target !== row) target.after(row);
    const landed = target ?? row;
    const name = TASKS[Number(landed.dataset.key ?? 1) - 1] ?? '';
    const far = !seenAtStart.has(landed);
    say(far ? 'far' : 'near', far ? `Dropped after "${name}", which was off screen` : `Dropped after "${name}", already on screen`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  drawRuler();
}
