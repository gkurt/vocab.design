import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CANVAS = { w: 396, h: 168 };
const TILE = { w: 82, h: 56 };
const GRID = { x: 16, y: 36, gapX: 12, gapY: 8, cols: 4 };

/** Where the scripted stroke starts and ends: empty canvas, then a gap between tiles. */
const START = { x: 26, y: 18 };
const END = { x: 200, y: 116 };
/** The boundary the held state parks, so identify has an outline to ring. */
const POSE = { x1: 26, y1: 18, x2: 200, y2: 116 };

const FILES = ['Tide chart', 'Slipway', 'Ferry log', 'Harbour', 'Moorings', 'Buoys', 'Lights', 'Charts'];

const tiles = FILES.map((name, i) => {
  const col = i % GRID.cols;
  const row = Math.floor(i / GRID.cols);
  const x = GRID.x + col * (TILE.w + GRID.gapX);
  const y = GRID.y + row * (TILE.h + GRID.gapY);
  return { key: i + 1, name, x, y };
});

const tileMarkup = tiles
  .map(
    ({ key, name, x, y }) => `
      <div
        class="sp-surface"
        data-part="tile-${key}"
        style="position: absolute; left: ${x}px; top: ${y}px; width: ${TILE.w}px; height: ${TILE.h}px; padding: 7px 8px; user-select: none"
      >
        <span class="sp-line" style="display: block; width: 60%; height: 20px; border-radius: 3px"></span>
        <span class="sp-label" style="display: block; margin-top: 6px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${name}</span>
      </div>`,
  )
  .join('');

/** An unpainted anchor for one end of the scripted stroke: a drawn stop point would annotate
    the choreography rather than the term (SPEC §5). */
const dot = (name: string, at: { x: number; y: number }) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${at.x - 6}px; top: ${at.y - 6}px; width: 12px; height: 12px; pointer-events: none"
  ></span>`;

/**
 * Lasso selection specimen: a canvas of file tiles where a drag begun on empty space draws a
 * boundary, previews what it currently holds, and commits that set when the pointer comes
 * up. The subject is the boundary itself, since the term names the outline rather than the
 * canvas it is drawn over or the tiles it catches; the counts and the hold control are
 * instrumentation and stay in the context register, and both ends of the scripted stroke are
 * unpainted anchors. A caught tile keeps the accent, because the set the boundary holds is the
 * other half of what the term does.
 *
 * A boundary exists only while a hand is drawing one, which would leave identify nothing to
 * ring, so the specimen carries a labelled control that parks one for inspection, the same
 * answer the smart guides specimen gives to the same problem (SPEC §5-6).
 *
 * The gesture is really computed rather than mimed: the rectangle comes from the pointer,
 * the catch is a box intersection test against each tile, and a press that lands on a tile
 * is not a lasso at all. Selection is painted as a background and a ring drawn inside the
 * tile's own box, so a tile joining the set moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Survey files</span>
          <span class="sp-text" data-part="readout" data-count="0" style="width: 210px; text-align: right; white-space: nowrap">Drag from empty space</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="canvas"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            ${tileMarkup}
            ${dot('start', START)}
            ${dot('end', END)}
            <span
              data-part="lasso"
              data-subject
              style="position: absolute; left: 0; top: 0; width: 0; height: 0; border: 1px dashed var(--sp-accent); background: var(--sp-accent-soft); opacity: 0; transition: opacity 0.1s linear; pointer-events: none"
            ></span>
          </div>
          <div class="sp-row sp-row--between sp-context" style="width: 100%">
            <span class="sp-label" style="white-space: nowrap">Rectangle here, freehand originally</span>
            <span class="sp-row" style="gap: 8px">
              <span class="sp-label">Boundary</span>
              <sp-segmented class="sp-segmented" data-part="hold" data-value="drag">
                <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">Dragging</button>
                <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held</button>
              </sp-segmented>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const lasso = part(root, 'lasso');
  const readout = part(root, 'readout');
  const hold = part(root, 'hold') as HTMLElement & { value: string };
  const cells = tiles.map((tile) => ({ ...tile, el: part(root, `tile-${tile.key}`) }));

  let origin: { x: number; y: number } | undefined;
  const caught = new Set<number>();

  const paint = (committed: boolean) => {
    for (const cell of cells) {
      const inside = caught.has(cell.key);
      flag(cell.el, 'data-candidate', inside && !committed);
      flag(cell.el, 'data-selected', inside && committed);
      cell.el.style.boxShadow = inside ? `0 0 0 1.5px var(--sp-accent)` : '';
      cell.el.style.background = inside ? 'var(--sp-accent-soft)' : '';
    }
    readout.dataset.count = String(caught.size);
  };

  /** Touching counts, which is the rule design tools use; the article says who does not. */
  const catchTiles = (box: { x1: number; y1: number; x2: number; y2: number }) => {
    caught.clear();
    for (const cell of cells) {
      const hit = box.x1 < cell.x + TILE.w && box.x2 > cell.x && box.y1 < cell.y + TILE.h && box.y2 > cell.y;
      if (hit) caught.add(cell.key);
    }
  };

  const drawLasso = (box: { x1: number; y1: number; x2: number; y2: number }) => {
    lasso.style.left = `${box.x1}px`;
    lasso.style.top = `${box.y1}px`;
    lasso.style.width = `${box.x2 - box.x1}px`;
    lasso.style.height = `${box.y2 - box.y1}px`;
    lasso.style.opacity = '1';
  };

  const at = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  canvas.addEventListener('pointerdown', (event) => {
    // A press that lands on a tile is a move, not a lasso: the empty space is the gesture.
    if (event.target instanceof HTMLElement && event.target.closest('[data-part^="tile-"]')) return;
    // A real stroke has to survive leaving the canvas; a synthetic pointer cannot be captured.
    if (event.isTrusted) canvas.setPointerCapture(event.pointerId);
    origin = at(event);
    caught.clear();
    paint(true);
    drawLasso({ x1: origin.x, y1: origin.y, x2: origin.x, y2: origin.y });
    readout.textContent = 'Drawing: nothing caught yet';
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const now = at(event);
    const box = {
      x1: Math.min(origin.x, now.x),
      y1: Math.min(origin.y, now.y),
      x2: Math.max(origin.x, now.x),
      y2: Math.max(origin.y, now.y),
    };
    drawLasso(box);
    catchTiles(box);
    paint(false);
    readout.textContent = `Holding ${caught.size} of ${cells.length}`;
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    paint(true);
    readout.textContent = `${caught.size} of ${cells.length} selected`;
    // The outline is feedback for a gesture, so it leaves with it, unless the labelled
    // control is holding it on for a reader who wants to look at one.
    if (hold.value !== 'held') lasso.style.opacity = '0';
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  hold.addEventListener('change', () => {
    if (hold.value === 'held') {
      drawLasso(POSE);
      catchTiles(POSE);
      paint(false);
      readout.textContent = `Held: the boundary and its ${caught.size} catch`;
      return;
    }
    lasso.style.opacity = '0';
    paint(true);
    readout.textContent = `${caught.size} of ${cells.length} selected`;
  });

  paint(true);
}
