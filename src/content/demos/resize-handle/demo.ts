import { part } from '#src/kit/parts.ts';

/** The room the panel may take, and the stops it is held at. */
const ARENA_W = 428;
const ARENA_H = 176;
const MIN_W = 150;
const MIN_H = 80;
const START_W = 240;
const START_H = 118;

/**
 * A fixed anchor the script drags a grip to. It carries no paint and no label: a drawn mark
 * would annotate the choreography rather than the term, and the panel's own size and the
 * readout are what say where a drag arrived (SPEC §5).
 */
const mark = (name: string, x: number, y: number) => `
  <div
    data-part="mark-${name}"
    aria-hidden="true"
    style="position: absolute; left: ${x}px; top: ${y}px; translate: -50% -50%; z-index: 2; pointer-events: none;
           width: 12px; height: 12px"
  ></div>`;

/**
 * Resize handle specimen: a floating panel with a corner grip and an edge grip, and an
 * arena that is all the room either of them may take.
 *
 * The subject is the corner grip, deliberately the narrowest thing on stage: the term
 * names the small ribbed mark, not the panel it resizes and not the resize itself. The
 * edge grip beside it is a second instance rather than scenery, since it is the same
 * affordance on a different axis; the arena and the readout are the scene, and the points the
 * script drags to are unpainted anchors.
 *
 * The size change is the term, so it is contained (SPEC §5): the panel grows and
 * shrinks inside an arena of fixed size, and the readout below it holds its place while
 * the numbers change. Both stops are real, and the panel says so when it is being held
 * at one. Nothing toggles: a drag reaches whatever size it is let go at.
 */
export function mount(root: HTMLElement): void {
  const ribs = 'repeating-linear-gradient(-45deg, var(--sp-muted) 0 1.5px, transparent 1.5px 4px)';

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Draft</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div
            class="sp-context"
            data-part="arena"
            style="position: relative; width: ${ARENA_W}px; height: ${ARENA_H}px; border: 1px dashed var(--sp-line); border-radius: 6px"
          >
            ${mark('grow', 386, 152)}
            ${mark('min', 108, 44)}

            <div
              data-part="panel"
              data-size="set"
              data-axis="both"
              style="position: absolute; left: 0; top: 0; width: ${START_W}px; height: ${START_H}px; overflow: hidden;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
            >
              <div class="sp-stack" style="gap: 7px; padding: 10px 12px">
                <span class="sp-heading" style="font-size: 13px">Tide log</span>
                <div class="sp-line" style="width: 86%"></div>
                <div class="sp-line" style="width: 72%"></div>
                <div class="sp-line" style="width: 80%"></div>
              </div>
              <span
                class="sp-chip"
                data-part="stop-note"
                style="position: absolute; left: 8px; bottom: 6px; padding: 2px 7px; font-size: 10px; visibility: hidden"
                >Minimum size</span
              >
              <div
                data-part="edge"
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize width"
                style="position: absolute; right: 0; top: 10px; bottom: 26px; width: 8px; cursor: ew-resize; touch-action: none;
                       display: flex; align-items: center; justify-content: center"
              ><span aria-hidden="true" style="width: 2px; height: 22px; border-radius: 999px; background: var(--sp-muted)"></span></div>
              <div
                data-part="corner"
                data-subject
                role="separator"
                aria-label="Resize panel"
                style="position: absolute; right: 0; bottom: 0; width: 16px; height: 16px; cursor: nwse-resize; touch-action: none"
              >
                <span
                  aria-hidden="true"
                  style="position: absolute; inset: 0; background-image: ${ribs}; clip-path: polygon(100% 0, 100% 100%, 0 100%)"
                ></span>
              </div>
            </div>
          </div>

          <div class="sp-row sp-row--between sp-context">
            <span class="sp-text" style="font-size: 12px">Drag either grip. The panel stops at its minimum.</span>
            <span class="sp-label" data-part="readout" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums"
              >${START_W} x ${START_H}</span
            >
          </div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  const stopNote = part(root, 'stop-note');

  let width = START_W;
  let height = START_H;
  /** Where the pointer was when the grip was taken, and the size it was taken at. */
  let from: { x: number; y: number; w: number; h: number; axis: 'both' | 'x' } | undefined;

  const set = (nextW: number, nextH: number, axis: 'both' | 'x') => {
    width = Math.round(Math.min(ARENA_W, Math.max(MIN_W, nextW)));
    height = Math.round(Math.min(ARENA_H, Math.max(MIN_H, nextH)));
    panel.style.width = `${width}px`;
    panel.style.height = `${height}px`;
    panel.dataset.axis = axis;
    const atStop = width === MIN_W || height === MIN_H;
    panel.dataset.size = atStop ? 'min' : width >= 340 ? 'grown' : 'set';
    stopNote.style.visibility = atStop ? 'visible' : 'hidden';
    readout.textContent = `${width} x ${height}`;
  };

  const take = (axis: 'both' | 'x') => (event: PointerEvent) => {
    // The pointer leaves a sixteen pixel grip on the first frame of any drag worth making, so
    // the grip captures it: without capture the moves stop there and the release lands on
    // whatever is underneath, leaving the panel held. Synthesized pointers cannot be captured.
    if (event.isTrusted) (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    from = { x: event.clientX, y: event.clientY, w: width, h: height, axis };
  };

  part(root, 'corner').addEventListener('pointerdown', take('both'));
  part(root, 'edge').addEventListener('pointerdown', take('x'));

  // The move and the release are listened for on the root, so one pair of handlers serves
  // both grips however far a drag runs.
  root.addEventListener('pointermove', (event) => {
    if (!from) return;
    const nextW = from.w + (event.clientX - from.x);
    const nextH = from.axis === 'x' ? from.h : from.h + (event.clientY - from.y);
    set(nextW, nextH, from.axis);
  });

  const release = () => {
    from = undefined;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  set(START_W, START_H, 'both');
}
