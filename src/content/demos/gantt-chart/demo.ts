import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The axis: fourteen working days, one column each, and the geometry every bar is placed by. */
const DAYS = 14;
const DAY_W = 24;
const NAME_W = 104;
const ROW_H = 32;
const BAR_H = 16;
const AXIS_H = 22;

interface Task {
  id: string;
  name: string;
  start: number;
  length: number;
  /** The task this one waits for, which is what makes the bar move when that one does. */
  after?: string;
}

const TASKS: Task[] = [
  { id: 'research', name: 'Research', start: 0, length: 3 },
  { id: 'wireframes', name: 'Wireframes', start: 4, length: 3, after: 'research' },
  { id: 'visual', name: 'Visual design', start: 8, length: 3, after: 'wireframes' },
  { id: 'build', name: 'Build', start: 9, length: 4 },
  { id: 'qa', name: 'QA', start: 12, length: 2 },
];

const rowOf = (id: string) => TASKS.findIndex((task) => task.id === id);
const midOf = (id: string) => rowOf(id) * ROW_H + ROW_H / 2;
const leftOf = (task: Task) => task.start * DAY_W + 2;
const widthOf = (task: Task) => task.length * DAY_W - 4;

const dates = Array.from(
  { length: DAYS },
  (_, i) =>
    `<span class="sp-label" style="flex: 0 0 auto; width: ${DAY_W}px; text-align: center; font-size: 9px; line-height: ${AXIS_H}px">${i + 1}</span>`,
).join('');

const names = TASKS.map(
  (task) => `
    <span
      style="display: flex; align-items: center; height: ${ROW_H}px; padding: 0 8px; border-top: 1px solid var(--sp-line);
             font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
    >${task.name}</span>`,
).join('');

const bars = TASKS.map(
  (task) => `
    <button
      type="button"
      data-part="bar-${task.id}"
      data-start="${task.start}"
      aria-label="${task.name}"
      style="position: absolute; left: ${leftOf(task)}px; top: ${rowOf(task.id) * ROW_H + (ROW_H - BAR_H) / 2}px;
             width: ${widthOf(task)}px; height: ${BAR_H}px; padding: 0; border: 0; border-radius: 4px;
             background: var(--sp-accent); font: inherit; cursor: grab; touch-action: none; user-select: none"
    ></button>`,
).join('');

/**
 * Gantt chart specimen: five tasks as five rows, each bar lying along a shared date axis,
 * and two dependency lines saying what waits for what. The subject is the chart body (the
 * axis, the rows, the bars and the arrows between them), because the term names that whole
 * crossing of tasks with dates rather than any one bar. The project window around it is
 * scenery.
 *
 * The demonstration is the dependency rather than the encoding: dragging Wireframes later
 * carries Visual design with it, keeping the gap the plan was drawn with, which is the one
 * thing a picture of bars cannot do. Bars run ALONG their row here; a block sitting inside
 * an hour column is a scheduler, and the two views must never read alike.
 *
 * The drag is computed from the pointer, snapped to whole days. Capture is taken on a
 * trusted pointerdown, because a reader's drag would otherwise die the moment the pointer
 * leaves a 68 px bar, and the guard is mandatory: the attract player's synthetic pointers
 * have nothing to capture and the call throws (SPEC §7). The pointer is read through
 * `localPoint`, so a narrow column that scales the stage does not halve the day a bar lands
 * on (SPEC §5).
 *
 * A caption under the chart used to read "One row per task, bars along the dates. Move a bar and
 * whatever waits on it moves too.", which is the article's sentence sitting inside a project tool
 * that would never print it. The drag says it instead.
 *
 * Bars and arrows are absolutely placed inside a fixed field, so a move never changes the
 * height of a row or the position of the rows below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Launch plan</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">September</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="chart" data-subject style="flex: 0 0 auto; width: 442px; overflow: hidden">
            <div style="display: flex; height: ${AXIS_H}px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${NAME_W}px; padding: 0 8px; font-size: 10px; line-height: ${AXIS_H}px">Task</span>
              ${dates}
            </div>
            <div style="display: flex">
              <div style="flex: 0 0 auto; display: flex; flex-direction: column; width: ${NAME_W}px; border-right: 1px solid var(--sp-line)">${names}</div>
              <div
                data-part="field"
                style="position: relative; flex: 0 0 auto; width: ${DAYS * DAY_W}px; height: ${TASKS.length * ROW_H}px;
                       background-image:
                         repeating-linear-gradient(to bottom, var(--sp-line) 0 1px, transparent 1px ${ROW_H}px),
                         repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px ${DAY_W * 2}px)"
              >
                <svg
                  data-part="deps"
                  aria-hidden="true"
                  width="${DAYS * DAY_W}"
                  height="${TASKS.length * ROW_H}"
                  style="position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible"
                >
                  <path data-part="dep-wireframes" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-linecap="round" d=""></path>
                  <path data-part="dep-visual" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-linecap="round" d=""></path>
                </svg>
                ${bars}
                <span data-part="drop" style="position: absolute; left: ${6 * DAY_W + 2}px; top: ${ROW_H + (ROW_H - BAR_H) / 2}px; width: ${3 * DAY_W - 4}px; height: ${BAR_H}px; pointer-events: none"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const barOf = new Map(TASKS.map((task) => [task.id, part(root, `bar-${task.id}`)]));

  const draw = () => {
    for (const task of TASKS) {
      const el = barOf.get(task.id);
      if (el) {
        el.style.left = `${leftOf(task)}px`;
        el.dataset.start = String(task.start);
      }
      if (!task.after) continue;
      const from = TASKS.find((other) => other.id === task.after);
      const line = root.querySelector<SVGPathElement>(`[data-part="dep-${task.id}"]`);
      if (!from || !line) continue;
      const x1 = leftOf(from) + widthOf(from);
      const y1 = midOf(from.id);
      const x2 = leftOf(task) - 2;
      const y2 = midOf(task.id);
      // An elbow out of the predecessor's end, down the gap, into the successor's start,
      // with a chevron for the arrowhead so nothing here needs an SVG marker.
      line.setAttribute('d', `M ${x1} ${y1} H ${x1 + 8} V ${y2} H ${x2} M ${x2 - 5} ${y2 - 4} L ${x2} ${y2} L ${x2 - 5} ${y2 + 4}`);
    }
  };

  /** Everything downstream of a task, so a move carries its whole chain. */
  const chainOf = (id: string): Task[] => {
    const out: Task[] = [];
    const walk = (parent: string) => {
      for (const task of TASKS) {
        if (task.after !== parent) continue;
        out.push(task);
        walk(task.id);
      }
    };
    walk(id);
    return out;
  };

  let held: { task: Task; el: HTMLElement; x: number; starts: Map<string, number> } | undefined;

  for (const task of TASKS) {
    const el = barOf.get(task.id);
    if (!el) continue;
    el.addEventListener('pointerdown', (pointer) => {
      // Synthetic pointers have no capture to take and the call throws, so the guard is
      // mandatory; without the capture a reader's drag dies at the bar's edge (SPEC §7).
      if (pointer.isTrusted) el.setPointerCapture(pointer.pointerId);
      const moving = [task, ...chainOf(task.id)];
      held = {
        task,
        el,
        x: localPoint(pointer, field).x,
        starts: new Map(moving.map((one) => [one.id, one.start])),
      };
      el.style.cursor = 'grabbing';
      el.style.boxShadow = 'var(--sp-shadow)';
      field.dataset.moving = task.id;
    });
  }

  field.addEventListener('pointermove', (pointer) => {
    if (!held) return;
    const wanted = Math.round((localPoint(pointer, field).x - held.x) / DAY_W);
    // The whole chain shifts together, so the gap the plan was drawn with survives the move.
    let shift = wanted;
    for (const [id, start] of held.starts) {
      const task = TASKS.find((one) => one.id === id);
      if (!task) continue;
      shift = Math.max(-start, Math.min(DAYS - start - task.length, shift));
    }
    for (const [id, start] of held.starts) {
      const task = TASKS.find((one) => one.id === id);
      if (task) task.start = start + shift;
    }
    draw();
  });

  const release = () => {
    if (!held) return;
    held.el.style.cursor = 'grab';
    held.el.style.boxShadow = '';
    field.dataset.moving = 'none';
    held = undefined;
  };

  field.addEventListener('pointerup', release);
  field.addEventListener('pointercancel', release);

  field.dataset.moving = 'none';
  draw();
}
