import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FRAME = { w: 340, h: 252 };
const TOPBAR_H = 40;
const BODY = { w: FRAME.w - 2, h: FRAME.h - 2 - TOPBAR_H };

/** Long enough that the travel is readable, and that a claim can sit mid-flight. */
const MOVE_MS = 560;
const MOVE = ['left', 'top', 'width', 'height', 'border-radius'].map((p) => `${p} ${MOVE_MS}ms var(--sp-ease)`).join(', ');

const ROW_H = 56;

/** The container's two rectangles: one list row, and the whole body edge to edge. */
const COMPACT = { left: 10, top: 74, width: BODY.w - 20, height: ROW_H, radius: 8 };
const OPEN = { left: 0, top: 0, width: BODY.w, height: BODY.h, radius: 0 };

/** The image inside it survives the move, so it travels with the container instead of fading. */
const THUMB_COMPACT = { left: 8, top: 8, width: 40, height: 40, radius: 6 };
const THUMB_OPEN = { left: 0, top: 0, width: BODY.w, height: 84, radius: 0 };

const box = (b: { left: number; top: number; width: number; height: number; radius: number }) =>
  `left: ${b.left}px; top: ${b.top}px; width: ${b.width}px; height: ${b.height}px; border-radius: ${b.radius}px`;

/**
 * Container transform specimen: a list row that becomes the detail screen. Pressing the row
 * interpolates one container from the row's rectangle to the whole body, corner radius
 * included, while the row's contents fade out and the detail's fade in inside it. The
 * thumbnail is the piece that survives the move, so it travels with the container as a
 * growing hero band rather than crossfading with everything else, which is the Material
 * recipe and the whole reason the destination reads as the row rather than as a new screen.
 *
 * The subject is the transforming container. The rows above and below it, the bar, and the
 * caption are scenery: they are the list the container leaves, not the move.
 *
 * Every rectangle in the scene is written down rather than measured, and the container is
 * absolutely positioned inside a body whose size is fixed at mount, so growing it cannot
 * push anything around (SPEC §5) and nothing is measured after a style write.
 *
 * Open and close are two controls resolving to two states, never one trigger flipping
 * whatever it finds (SPEC §8). The move is a CSS transition, so `motion.css` flattens it for
 * a reader who asked for less movement and the two states simply swap. `data-state` is
 * cleared on the stage's clock, so a pose cannot let the move finish under someone
 * inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const row = (top: number, title: string, note: string, fill: string) => `
    <div
      class="sp-surface sp-context"
      style="position: absolute; left: 10px; top: ${top}px; width: ${COMPACT.width}px; height: ${ROW_H}px;
             display: flex; align-items: center; gap: 8px; padding: 8px"
    >
      <span style="flex: 0 0 40px; height: 40px; border-radius: 6px; background: ${fill}"></span>
      <span class="sp-stack" style="gap: 5px; min-width: 0">
        <span class="sp-heading" style="font-size: 13px">${title}</span>
        <span class="sp-label" style="font-size: 11px">${note}</span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame" style="width: ${FRAME.w}px; height: ${FRAME.h}px">
        <div class="sp-topbar sp-context" style="height: ${TOPBAR_H}px">
          <span class="sp-heading sp-grow">Trails</span>
          <span class="sp-label" data-part="readout">list</span>
        </div>
        <div class="sp-body" data-part="body" style="position: relative; padding: 0; overflow: hidden">
          ${row(10, 'Cwm Idwal', '4.2 km, rough', 'linear-gradient(135deg, #7c8798, #4c5765)')}
          ${row(138, 'Nant Ffrancon', '9.8 km, easy', 'linear-gradient(135deg, #93867a, #61574d)')}

          <div
            data-part="container"
            data-subject
            data-mode="compact"
            data-state="settled"
            style="position: absolute; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   box-shadow: var(--sp-shadow); ${box(COMPACT)}; transition: ${MOVE}"
          >
            <span
              data-part="thumb"
              style="position: absolute; background: linear-gradient(135deg, #3f6cd1, #7b4fd6); ${box(THUMB_COMPACT)};
                     transition: ${MOVE}"
            ></span>

            <button
              type="button"
              data-part="open"
              style="position: absolute; left: 0; top: 0; width: ${COMPACT.width}px; height: ${ROW_H}px;
                     display: flex; align-items: center; padding: 8px 8px 8px 56px; gap: 8px; border: 0;
                     background: transparent; font: inherit; color: var(--sp-ink); text-align: left; cursor: pointer;
                     opacity: 1; transition: opacity 180ms linear 200ms"
            >
              <span class="sp-stack" style="gap: 5px; min-width: 0">
                <span class="sp-heading" style="font-size: 13px">Glyder Fach</span>
                <span class="sp-label" style="font-size: 11px">6.5 km, scramble</span>
              </span>
            </button>

            <div
              data-part="detail"
              style="position: absolute; left: 0; top: ${THUMB_OPEN.height}px; width: ${OPEN.width}px;
                     padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;
                     opacity: 0; visibility: hidden; transition: opacity 220ms linear, visibility 220ms linear"
            >
              <span class="sp-heading" data-part="detail-title">Glyder Fach</span>
              <span class="sp-text" style="margin: 0">
                6.5 km over the Cantilever and back down the miners track. Scramble grade one.
              </span>
              <span class="sp-line" style="width: 62%"></span>
            </div>

            <button
              class="sp-icon-button"
              type="button"
              data-part="close"
              aria-label="Back to the list"
              style="position: absolute; left: 6px; top: 6px; color: #ffffff; background: rgb(12 16 34 / 0.42);
                     opacity: 0; visibility: hidden; transition: opacity 220ms linear, visibility 220ms linear"
            >${icon('chevronLeft')}</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 340px; margin: 0; text-align: center">
        One box, two rectangles: the row is the screen.
      </p>
    </div>
  `;

  const container = part(root, 'container');
  const thumb = part(root, 'thumb');
  const opener = part(root, 'open');
  const detail = part(root, 'detail');
  const closer = part(root, 'close');
  const readout = part(root, 'readout');
  let settling: number | undefined;

  const pose = (open: boolean): void => {
    if (open === (container.dataset.mode === 'detail')) return;
    clock.clearTimeout(settling);

    const target = open ? OPEN : COMPACT;
    const image = open ? THUMB_OPEN : THUMB_COMPACT;
    for (const [el, b] of [
      [container, target],
      [thumb, image],
    ] as const) {
      el.style.left = `${b.left}px`;
      el.style.top = `${b.top}px`;
      el.style.width = `${b.width}px`;
      el.style.height = `${b.height}px`;
      el.style.borderRadius = `${b.radius}px`;
    }

    container.dataset.mode = open ? 'detail' : 'compact';
    container.dataset.state = 'moving';
    container.style.borderColor = open ? 'transparent' : 'var(--sp-line)';

    // The leaving contents go first and the arriving ones follow, so the box is never
    // showing both halves at once halfway through its travel.
    opener.style.opacity = open ? '0' : '1';
    opener.style.transitionDelay = open ? '0ms' : '240ms';
    opener.style.pointerEvents = open ? 'none' : 'auto';
    for (const el of [detail, closer]) {
      el.style.opacity = open ? '1' : '0';
      el.style.visibility = open ? 'visible' : 'hidden';
      el.style.transitionDelay = open ? '260ms' : '0ms';
    }
    readout.textContent = open ? 'detail' : 'list';

    settling = clock.setTimeout(() => {
      container.dataset.state = 'settled';
    }, MOVE_MS + 100);
  };

  opener.addEventListener('click', () => pose(true));
  closer.addEventListener('click', () => pose(false));
}
