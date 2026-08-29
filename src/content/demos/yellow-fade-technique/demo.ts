import { icon } from '#src/kit/icons.ts';
import { localBox } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Full strength, held long enough that a reader looking elsewhere still catches it. */
const PEAK = 0.34;
const HOLD_MS = 900;
const FADE_MS = 1700;
const FRAME_MS = 40;
const FRAMES = Math.round(FADE_MS / FRAME_MS);

const ROW_H = 37;

type Box = { left: number; top: number; width: number; height: number };

const row = (key: string, text: string, done = false) => `
  <li
    class="sp-list-item"
    data-part="row-${key}"
    style="position: relative; height: ${ROW_H}px"
  >
    <span
      class="sp-checkbox"
      data-part="box-${key}"
      ${done ? 'data-checked' : ''}
      aria-hidden="true"
      style="cursor: default"
    ></span>
    <span
      class="sp-grow"
      data-part="text-${key}"
      data-value="${text}"
      style="${done ? 'text-decoration: line-through; color: var(--sp-muted)' : ''}"
    >${text}</span>
    <span style="flex: 0 0 auto; display: flex; justify-content: flex-end; width: 84px">
      <span class="sp-chip" data-part="mark-${key}" hidden style="cursor: default"></span>
    </span>
  </li>`;

/**
 * Yellow fade specimen: a to-do list where a change lands on one row and that row
 * washes warm, then drains back to nothing while the new text stays.
 *
 * The subject is the wash itself. The technique names a tint over a row rather
 * than the row or the list (SPEC §5), and a tint has no element of its own, so it
 * is given one: a single absolutely positioned box in a layer of its own, sized to
 * the extent of whichever row just changed. One box that moves rather than one per
 * row, because there is only ever one most-recent change.
 *
 * The layer sits under the list rather than over it, so the wash paints behind the
 * text the way a background colour would. Row geometry is measured once, at mount,
 * in the state it is measured in: nothing here transitions, and the rows carry a
 * stated height, so the numbers cannot go stale under a style write (SPEC §5).
 *
 * Two controls, each landing a different change on a different row, so a pass that
 * is fast-forwarded or resumed reaches the state it named instead of flipping what
 * it found (SPEC §8). Both are simulation controls of the only legitimate kind: an
 * update arriving from someone else is not input a reader could perform.
 *
 * The fade runs on the stage's clock, frame by frame, so identify can hold the wash
 * halfway and inspect the tint that is actually on screen. A reader who asked for
 * less motion gets the wash without the drain: the highlight is the information, and
 * jumping to the end state of a fade-out would throw the information away rather
 * than the movement.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 448px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kitchen remodel</span>
          <span class="sp-label">To-dos</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div class="sp-surface" data-part="card" style="position: relative; padding: 6px 8px">
            <div
              data-part="wash-layer"
              style="position: absolute; inset: 0; z-index: 0; pointer-events: none"
            >
              <div
                data-part="wash"
                data-subject
                data-wash="clear"
                data-on="tile"
                style="position: absolute; left: 0; top: 0; width: 0; height: ${ROW_H}px;
                       border-radius: 6px; background: var(--sp-warn); opacity: 0"
              ></div>
            </div>
            <ul class="sp-list sp-context" style="position: relative; z-index: 1">
              ${row('handles', 'Order the cabinet handles', true)}
              ${row('tile', 'Pick tile for the backsplash')}
              ${row('electrician', 'Book the electrician')}
              ${row('template', 'Confirm the countertop template')}
            </ul>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="rename">
              Ana renames one
            </button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="check">
              Ravi checks one off
            </button>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 0">
            Colour says where; the chip says what.
          </p>
        </div>
      </div>
    </div>
  `;

  const layer = part(root, 'wash-layer');
  const wash = part(root, 'wash');
  const rows = {
    tile: part(root, 'row-tile'),
    electrician: part(root, 'row-electrician'),
  };

  const boxes = new Map<string, Box>();
  const measure = () => {
    for (const [key, el] of Object.entries(rows)) {
      const r = localBox(el, layer);
      boxes.set(key, { left: r.left, top: r.top, width: r.width, height: r.height });
    }
  };

  /** A stage that mounted before layout gets one more chance, rather than a zero box. */
  const boxOf = (key: string): Box => {
    const cached = boxes.get(key);
    if (cached && cached.width > 2 && cached.height > 2) return cached;
    measure();
    return boxes.get(key) ?? { left: 0, top: 0, width: 0, height: ROW_H };
  };

  const place = (key: string) => {
    const box = boxOf(key);
    wash.style.left = `${box.left}px`;
    wash.style.top = `${box.top}px`;
    wash.style.width = `${box.width}px`;
    wash.style.height = `${box.height}px`;
    wash.dataset.on = key;
  };

  measure();
  place('tile');

  let tick: number | undefined;

  const drain = () => {
    let frame = 0;
    const step = () => {
      frame += 1;
      if (frame >= FRAMES) {
        wash.style.opacity = '0';
        wash.dataset.wash = 'clear';
        return;
      }
      const left = 1 - frame / FRAMES;
      wash.style.opacity = String(PEAK * left ** 1.6);
      wash.dataset.wash = 'fading';
      tick = clock.setTimeout(step, FRAME_MS);
    };
    tick = clock.setTimeout(step, HOLD_MS);
  };

  const washRow = (key: string) => {
    clock.clearTimeout(tick);
    place(key);
    wash.style.opacity = String(PEAK);
    wash.dataset.wash = 'full';
    if (!prefersReducedMotion(root)) drain();
  };

  const mark = (key: string, label: string, name: 'pencil' | 'check') => {
    const chip = part(root, `mark-${key}`);
    chip.innerHTML = `${icon(name)}<span>${label}</span>`;
    chip.hidden = false;
  };

  part(root, 'rename').addEventListener('click', () => {
    const text = part(root, 'text-tile');
    const next = 'Pick tile for the backsplash (slate)';
    text.textContent = next;
    text.dataset.value = next;
    mark('tile', 'Edited', 'pencil');
    rows.tile.dataset.changed = '';
    washRow('tile');
  });

  part(root, 'check').addEventListener('click', () => {
    const text = part(root, 'text-electrician');
    text.style.textDecoration = 'line-through';
    text.style.color = 'var(--sp-muted)';
    flag(part(root, 'box-electrician'), 'data-checked', true);
    mark('electrician', 'Done', 'check');
    rows.electrician.dataset.changed = '';
    washRow('electrician');
  });
}
