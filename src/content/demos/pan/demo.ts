import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The window onto the survey, and the survey itself: the difference is the room to pan. */
const VIEW = { w: 300, h: 160 };
const SHEET = { w: 480, h: 240 };
const MAX = { x: SHEET.w - VIEW.w, y: SHEET.h - VIEW.h };
const STEP = 40;

const clamp = (value: number, limit: number) => Math.min(0, Math.max(-limit, Math.round(value)));

const label = (text: string, css: string) =>
  `<span style="position: absolute; ${css}; padding: 1px 5px; border-radius: 4px; background: rgb(255 255 255 / 0.78); color: #33403a; font-size: 11px; white-space: nowrap">${text}</span>`;

/** Stand-in survey: enough landmarks that moving the window is visibly moving the window. */
const SURVEY = `
  <div style="position: absolute; inset: 0; background: linear-gradient(150deg, #e2e8d2, #c6d6bb 60%, #b3c7ae)"></div>
  <div style="position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, rgb(90 110 90 / 0.12) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgb(90 110 90 / 0.12) 0 1px, transparent 1px 40px)"></div>
  <div style="position: absolute; left: 268px; top: 128px; width: 156px; height: 88px; border-radius: 48% 52% 40% 60%; background: #7fa8c4"></div>
  <div style="position: absolute; left: -20px; top: 74px; width: 300px; height: 8px; rotate: 9deg; background: #9fb2b8"></div>
  <div style="position: absolute; left: 96px; top: -30px; width: 7px; height: 300px; rotate: -14deg; background: #d8c9a8"></div>
  <div style="position: absolute; left: 40px; top: 22px; width: 62px; height: 34px; border-radius: 3px; background: #a9b79b"></div>
  <div style="position: absolute; left: 150px; top: 40px; width: 30px; height: 26px; border-radius: 3px; background: #b9a98d"></div>
  <div style="position: absolute; left: 356px; top: 44px; width: 44px; height: 30px; border-radius: 3px; background: #a9b79b"></div>
  ${label('North ridge', 'left: 26px; top: 8px')}
  ${label('Mill road', 'left: 132px; top: 96px')}
  ${label('Harbour', 'left: 372px; top: 202px')}
`;

/**
 * Pan specimen: a window onto a survey larger than itself, moved by dragging the sheet
 * under the pointer. The subject is that window, since the term names moving the view
 * across content rather than the artwork inside it or the readouts beside it.
 *
 * Contact tracking is the whole claim, so the sheet is translated by the pointer's own
 * delta with no transition and no easing: the point under the cursor stays under the
 * cursor, and the only thing that ever interrupts that is the clamp at an edge. Both
 * edges are absolute states, which is what lets a scripted drag land somewhere a pass
 * picked up part-way still agrees with.
 *
 * Panning is a transform inside a fixed window, so nothing around it moves (SPEC §5), and
 * the offsets are tabular so the readout holds its width at every position. The readout
 * beside them is one nowrap line cut for its longest state, "Clamped at the corner", so the
 * topbar cannot reline and carry the window up with it. Arrow keys
 * and Home pan too, because content reachable only by dragging is unreachable to a reader
 * who cannot drag.
 *
 * Two labels in the body read "drag to" with an arrow, and the readout opened on "Drag the
 * survey to move the view": instructions to the reader, printed by a survey viewer that would
 * print no such thing. The two corners exist only so the script has a coordinate to drag to,
 * so they keep their boxes and lose their paint (SPEC §5), and the readout opens on the state
 * it is actually in.
 */
export function mount(root: HTMLElement): void {
  const start = { x: -Math.round(MAX.x / 2), y: -Math.round(MAX.y / 2) };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site survey</span>
          <span class="sp-label" data-part="offset" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums">x ${-start.x} y ${-start.y}</span>
          <span class="sp-text" data-part="readout" style="width: 150px; text-align: right; white-space: nowrap">View centred</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; align-items: center; justify-content: center">
          <span
            data-part="corner-nw"
            aria-hidden="true"
            style="position: absolute; left: 0; top: 0; width: 66px; height: 15px; pointer-events: none"
          ></span>
          <span
            data-part="corner-se"
            aria-hidden="true"
            style="position: absolute; right: 0; bottom: 0; width: 66px; height: 15px; pointer-events: none"
          ></span>
          <div
            data-part="canvas"
            data-subject
            data-view="middle"
            role="application"
            tabindex="0"
            aria-label="Survey, pan with the arrow keys"
            style="position: relative; overflow: hidden; width: ${VIEW.w}px; height: ${VIEW.h}px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); cursor: grab; touch-action: none"
          >
            <div
              data-part="sheet"
              style="position: absolute; left: 0; top: 0; width: ${SHEET.w}px; height: ${SHEET.h}px; transform: translate(${start.x}px, ${start.y}px)"
            >${SURVEY}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const sheet = part(root, 'sheet');
  const readout = part(root, 'readout');
  const offset = part(root, 'offset');

  let tx = start.x;
  let ty = start.y;
  let last: { x: number; y: number } | undefined;

  const render = (text: string) => {
    sheet.style.transform = `translate(${tx}px, ${ty}px)`;
    offset.textContent = `x ${-tx} y ${-ty}`;
    const atStart = tx === 0 && ty === 0;
    const atEnd = tx === -MAX.x && ty === -MAX.y;
    canvas.dataset.view = atEnd ? 'southeast' : atStart ? 'northwest' : 'middle';
    readout.textContent = text;
  };

  const moveBy = (dx: number, dy: number, text: string) => {
    tx = clamp(tx + dx, MAX.x);
    ty = clamp(ty + dy, MAX.y);
    render(text);
  };

  canvas.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) canvas.setPointerCapture(event.pointerId);
    last = localPoint(event, root);
    canvas.style.cursor = 'grabbing';
    render('Holding the survey');
  });

  root.addEventListener('pointermove', (event) => {
    if (!last) return;
    // The delta is taken from the previous point, so the spot under the pointer stays
    // under the pointer for the whole gesture: that is what makes it a pan.
    const at = localPoint(event, root);
    moveBy(at.x - last.x, at.y - last.y, 'Panning');
    last = at;
  });

  const release = () => {
    if (!last) return;
    last = undefined;
    canvas.style.cursor = 'grab';
    const clampedX = tx === 0 || tx === -MAX.x;
    const clampedY = ty === 0 || ty === -MAX.y;
    render(clampedX && clampedY ? 'Clamped at the corner' : clampedX || clampedY ? 'Clamped at an edge' : 'View moved');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  canvas.addEventListener('keydown', (event) => {
    const nudges: Record<string, [number, number]> = {
      ArrowLeft: [STEP, 0],
      ArrowRight: [-STEP, 0],
      ArrowUp: [0, STEP],
      ArrowDown: [0, -STEP],
    };
    const nudge = nudges[event.key];
    if (nudge) {
      event.preventDefault();
      moveBy(nudge[0], nudge[1], 'Panned by key');
      return;
    }
    if (event.key !== 'Home') return;
    event.preventDefault();
    tx = start.x;
    ty = start.y;
    render('Back to the middle');
  });
}
