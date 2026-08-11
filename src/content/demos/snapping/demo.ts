import { flag, part } from '#src/kit/parts.ts';

/** The grid the card lands on: one gutter, stated once, so the maths and the dots agree. */
const PAD = 10;
const COL = 68;
const ROW = 46;
const COLS = 4;
const ROWS = 3;
const CARD_W = 44;
const CARD_H = 30;
const CANVAS_W = PAD * 2 + COL * COLS;
const CANVAS_H = PAD * 2 + ROW * ROWS;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Snapping specimen: a card dragged freely across a dot grid whose corner lands on
 * the nearest intersection the moment it is released, with a ghost outline showing
 * where that will be while the drag is still live. The subject is the card, since
 * the snap is something the dragged object does; the grid is the reference it does
 * it against.
 *
 * Every piece is absolutely placed inside a canvas of a fixed size, so a card
 * crossing the field cannot move anything else in the scene (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const dots: string[] = [];
  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      dots.push(
        `<span data-part="dot-${c + 1}-${r + 1}" style="position: absolute; left: ${PAD + c * COL - 2}px; top: ${PAD + r * ROW - 2}px; width: 4px; height: 4px; border-radius: 50%; background: var(--sp-line)"></span>`,
      );
    }
  }

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
          <span class="sp-text" data-part="readout" style="width: 118px; text-align: right">Column 2, row 2</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-surface" data-part="canvas" style="position: relative; width: ${CANVAS_W}px; height: ${CANVAS_H}px">
            <div class="sp-context" data-part="grid">${dots.join('')}</div>
            <div
              data-part="ghost"
              style="position: absolute; left: 0; top: 0; width: ${CARD_W}px; height: ${CARD_H}px; border: 1px dashed var(--sp-accent); border-radius: 5px; visibility: hidden"
            ></div>
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-cell="2-2"
              style="position: absolute; display: flex; align-items: center; justify-content: center; width: ${CARD_W}px; height: ${CARD_H}px; font-size: 12px; cursor: grab; touch-action: none; background: var(--sp-accent-soft); border-color: var(--sp-accent)"
            >
              Tile
            </div>
          </div>
          <span class="sp-label sp-context">Dropped near a line, the corner lands on it.</span>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const card = part(root, 'card');
  const ghost = part(root, 'ghost');
  const readout = part(root, 'readout');
  let grab: { x: number; y: number } | undefined;

  /** Free position in canvas coordinates, clamped to the field. */
  const place = (left: number, top: number) => {
    card.style.left = `${clamp(left, 0, CANVAS_W - CARD_W)}px`;
    card.style.top = `${clamp(top, 0, CANVAS_H - CARD_H)}px`;
  };

  /** The intersection the card's own corner is nearest, as a cell the reader can read. */
  const nearest = (left: number, top: number) => {
    const c = clamp(Math.round((left - PAD) / COL), 0, COLS - 1);
    const r = clamp(Math.round((top - PAD) / ROW), 0, ROWS - 1);
    return { c, r, x: PAD + c * COL, y: PAD + r * ROW };
  };

  const settle = (left: number, top: number) => {
    const { c, r, x, y } = nearest(left, top);
    place(x, y);
    card.dataset.cell = `${c + 1}-${r + 1}`;
    readout.textContent = `Column ${c + 1}, row ${r + 1}`;
  };

  settle(PAD + COL, PAD + ROW);

  card.addEventListener('pointerdown', (event) => {
    const rect = card.getBoundingClientRect();
    grab = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    flag(card, 'data-dragging', true);
    card.style.boxShadow = 'var(--sp-shadow)';
  });

  root.addEventListener('pointermove', (event) => {
    if (!grab) return;
    const rect = canvas.getBoundingClientRect();
    const left = event.clientX - rect.left - grab.x;
    const top = event.clientY - rect.top - grab.y;
    place(left, top);
    // Say where it would land before it lands there: a snap nobody saw coming reads
    // as the object refusing to go where it was put.
    const target = nearest(clamp(left, 0, CANVAS_W - CARD_W), clamp(top, 0, CANVAS_H - CARD_H));
    ghost.style.left = `${target.x}px`;
    ghost.style.top = `${target.y}px`;
    ghost.style.visibility = 'visible';
  });

  const release = (event: PointerEvent) => {
    if (!grab) return;
    const rect = canvas.getBoundingClientRect();
    const left = event.clientX - rect.left - grab.x;
    const top = event.clientY - rect.top - grab.y;
    grab = undefined;
    flag(card, 'data-dragging', false);
    card.style.boxShadow = '';
    ghost.style.visibility = 'hidden';
    // Absolute landing: the release point decides the cell, not the cell it came from.
    settle(left, top);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
