import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CANVAS = { w: 400, h: 198 };
const CENTRE = { x: 200, y: 98 };
const RADIUS = 52;
/** Room around the circle for the labels that sit on it, so the ring's box holds all its ink. */
const PAD = 44;
const RING = (RADIUS + PAD) * 2;

/** How long a press has to sit still before the ring is worth drawing. */
const REVEAL_MS = 260;
/** How far the pointer has to travel before the press counts as a stroke instead. */
const MOVE_MIN = 12;

const SECTORS = [
  { key: 'delete', label: 'Delete', dir: 'north', dx: 0, dy: -1 },
  { key: 'duplicate', label: 'Duplicate', dir: 'east', dx: 1, dy: 0 },
  { key: 'group', label: 'Group', dir: 'south', dx: 0, dy: 1 },
  { key: 'rename', label: 'Rename', dir: 'west', dx: -1, dy: 0 },
];

const sectors = SECTORS.map(
  ({ key, label, dx, dy }) => `
    <button
      class="sp-chip"
      type="button"
      data-part="sector-${key}"
      style="position: absolute; left: ${RING / 2 + dx * RADIUS}px; top: ${RING / 2 + dy * RADIUS}px; transform: translate(-50%, -50%)"
    >${label}</button>`,
).join('');

/**
 * A fixed anchor the script grabs, sitting under the ring and carrying no paint: a drawn stop
 * point would annotate the choreography rather than the term, and the ghost cursor is the only
 * pointer artifact the stage draws (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;

/**
 * Marking menu specimen: a press on the canvas that can be answered two ways. Held still, it
 * draws a ring of four commands after a quarter of a second and waits to be picked from.
 * Carried off in a direction before that, it never draws the ring at all and the stroke itself
 * is the choice, which is the claim the term rests on.
 *
 * The subject is the ring. The term names the menu, not the canvas it is summoned over and not
 * the command it runs, so the ring is what the pin belongs on. The canvas, its objects and the
 * echo line are the scene around it in the context register, and the two points the script
 * presses and strokes to are unpainted anchors. The ring is off stage at mount, which identify
 * handles by summoning it: the choreography's press is followed by a wait and a visible assert,
 * which is the beat a summon is allowed to poll.
 *
 * The wiring is a real press, and the two paths differ only in when the pointer moves. A press
 * arms a reveal timer on the stage's clock, and travelling past a small radius cancels it,
 * which is exactly how an expert outruns their own menu. Releasing without having travelled
 * pins the ring open instead, so a reader who taps rather than holds still is not left with
 * nothing; the ring is then dismissed by choosing from it or by pressing the canvas again, and
 * no control toggles it.
 *
 * The ring is absolutely positioned over a fixed canvas and the echo line holds its width, so
 * summoning and dismissing it move nothing (SPEC §5).
 *
 * The toolbar used to carry a line narrating the gesture as it happened: "Press and hold, or
 * stroke a direction" at rest, then "Holding: the ring is on its way", "Stroking: too fast for
 * the ring to be drawn", "Released without a direction, so the menu stays up" and two more. No
 * drawing app narrates its own input, and the ring appearing or not appearing shows the same
 * thing. The line and the reporting that fed it are gone; the echo under the canvas still names
 * the command that ran, and `data-path` still carries which route it took for the script.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-chose="none"
            data-path="none"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0">
              <span style="position: absolute; left: 26px; top: 26px; width: 88px; height: 54px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 40px; top: 110px; width: 62px; height: 48px; border-radius: 50%; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 300px; top: 40px; width: 72px; height: 102px; border-radius: 6px; background: var(--sp-sunken)"></span>
            </span>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              ${dot('press-point', CENTRE.x, CENTRE.y)}
              ${dot('mark-north', CENTRE.x, CENTRE.y - RADIUS - 6)}
            </span>

            <span
              data-part="ring"
              data-subject
              style="position: absolute; left: ${CENTRE.x - RING / 2}px; top: ${CENTRE.y - RING / 2}px; width: ${RING}px; height: ${RING}px; opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s; z-index: 3"
            >
              <span style="position: absolute; inset: ${PAD}px; border-radius: 50%; border: 2px dashed var(--sp-accent); background: var(--sp-surface)"></span>
              ${sectors}
            </span>
          </div>

          <span
            class="sp-label sp-context"
            data-part="echo"
            style="width: ${CANVAS.w}px; text-align: center; white-space: nowrap"
          >Nothing run yet</span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const ring = part(root, 'ring');
  const echo = part(root, 'echo');

  let timer: number | undefined;
  let origin: { x: number; y: number } | undefined;
  let open = false;

  const highlight = (key: string | undefined) => {
    for (const sector of SECTORS) {
      const chip = part(root, `sector-${sector.key}`);
      if (sector.key === key) chip.setAttribute('data-selected', '');
      else chip.removeAttribute('data-selected');
    }
  };

  const showRing = (on: boolean) => {
    open = on;
    ring.style.opacity = on ? '1' : '0';
    ring.style.visibility = on ? 'visible' : 'hidden';
    if (!on) highlight(undefined);
  };

  /** The heading of a stroke, resolved to the nearest of the four directions. */
  const headingOf = (dx: number, dy: number) => {
    if (Math.hypot(dx, dy) < MOVE_MIN) return undefined;
    return SECTORS.reduce((a, b) => (b.dx * dx + b.dy * dy > a.dx * dx + a.dy * dy ? b : a));
  };

  const commit = (sector: (typeof SECTORS)[number], path: 'ring' | 'mark') => {
    clock.clearTimeout(timer);
    timer = undefined;
    showRing(false);
    canvas.dataset.chose = sector.key;
    canvas.dataset.path = path;
    if (path === 'mark') {
      echo.textContent = `${sector.label} ran from a mark to the ${sector.dir}`;
      return;
    }
    echo.textContent = `${sector.label} ran from the drawn menu`;
  };

  canvas.addEventListener('pointerdown', (event) => {
    // A press inside the open ring belongs to the command it landed on, not to a new gesture.
    if (ring.contains(event.target as Node)) return;
    // A real stroke has to survive leaving the canvas; a synthetic pointer cannot be captured.
    if (event.isTrusted) canvas.setPointerCapture(event.pointerId);
    // Otherwise a press always starts a fresh gesture, so a resumed pass can never press into
    // a state where the press means something else (SPEC §8).
    clock.clearTimeout(timer);
    showRing(false);
    canvas.dataset.path = 'none';
    origin = localPoint(event, root);
    timer = clock.setTimeout(() => {
      timer = undefined;
      showRing(true);
      canvas.dataset.path = 'ring';
    }, REVEAL_MS);
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const at = localPoint(event, root);
    const dx = at.x - origin.x;
    const dy = at.y - origin.y;
    // Moving off the press outruns the menu: the reveal is cancelled and the stroke stands in
    // for it, which is the whole of the expert path.
    if (Math.hypot(dx, dy) >= MOVE_MIN && timer !== undefined) {
      clock.clearTimeout(timer);
      timer = undefined;
      canvas.dataset.path = 'mark';
    }
    if (open) highlight(headingOf(dx, dy)?.key);
  });

  const release = (event: PointerEvent) => {
    if (!origin) return;
    const from = origin;
    origin = undefined;
    const at = localPoint(event, root);
    const heading = headingOf(at.x - from.x, at.y - from.y);
    if (heading) return commit(heading, open ? 'ring' : 'mark');
    // Let go without going anywhere: the ring is pinned open rather than thrown away, so a
    // press that turned out to be a tap still ends with the commands on screen.
    clock.clearTimeout(timer);
    timer = undefined;
    showRing(true);
    canvas.dataset.path = 'ring';
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  for (const sector of SECTORS) {
    part(root, `sector-${sector.key}`).addEventListener('click', () => commit(sector, 'ring'));
  }
}
