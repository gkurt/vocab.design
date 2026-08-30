import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The plan, drawn once at full size and once shrunk: same markup, one scale factor apart. */
const COLUMNS = 8;
const ROWS = 6;
const CELL = { width: 68, height: 56 };
const PAD = 8;
const GAP = 8;
const PLAN = {
  width: COLUMNS * CELL.width + (COLUMNS - 1) * GAP + PAD * 2,
  height: ROWS * CELL.height + (ROWS - 1) * GAP + PAD * 2,
};
const VIEW = { width: 296, height: 194 };
const MAP_W = 128;
const MAP_H = Math.round((PLAN.height * MAP_W) / PLAN.width);
const SCALE = MAP_W / PLAN.width;
const RECT = { width: Math.round(VIEW.width * SCALE), height: Math.round(VIEW.height * SCALE) };
/** The plot the surveyor is looking at, so both scales are showing the same place. */
const MARKED = { column: 6, row: 4 };

const zone = (fx: number, fy: number) => {
  const ns = fy < 0.34 ? 'n' : fy > 0.66 ? 's' : 'm';
  const we = fx < 0.34 ? 'w' : fx > 0.66 ? 'e' : 'm';
  return `${ns}${we}`;
};

function plan(labelled: boolean): string {
  const cells = Array.from({ length: COLUMNS * ROWS }, (_, i) => {
    const column = i % COLUMNS;
    const row = Math.floor(i / COLUMNS);
    const marked = column === MARKED.column && row === MARKED.row;
    const fill = marked ? 'var(--sp-accent)' : 'var(--sp-surface)';
    const label = labelled
      ? `<span class="sp-label" style="font-size: 10px; color: ${marked ? 'var(--sp-accent-ink)' : 'var(--sp-muted)'}">${String.fromCharCode(65 + column)}${row + 1}</span>`
      : '';
    return `<div style="display: flex; align-items: center; justify-content: center; background: ${fill}; border: 1px solid var(--sp-line); border-radius: 4px">${label}</div>`;
  }).join('');

  return `
    <div
      style="display: grid; grid-template-columns: repeat(${COLUMNS}, ${CELL.width}px); grid-auto-rows: ${CELL.height}px;
             gap: ${GAP}px; padding: ${PAD}px; width: ${PLAN.width}px; height: ${PLAN.height}px; background: var(--sp-sunken)"
    >${cells}</div>`;
}

/**
 * Overview plus detail specimen: a harbour plan too big for its region, shown at full size in
 * one region and shrunk to a map in another, with the box on the map marking what the detail
 * is showing.
 *
 * The subject is the overview region, `data-part="overview"`: the compressed half is what this
 * layout adds to a plain scrolling view, and the detail beside it is what is being compressed,
 * which is why the detail wears the context register (SPEC §5).
 *
 * The coupling runs both ways, which is what separates the layout from a one way minimap:
 * scrolling the detail moves the box, and dragging the box scrolls the detail. Both regions
 * publish the quadrant they are looking at, so an assert can prove the two halves agree after
 * a gesture that only touched one of them. The map is the same markup as the plan under a
 * single scale transform, so it is a real reduction rather than a drawing of one.
 *
 * The drag captures the pointer on a trusted pointerdown, so a reader's own drag survives
 * leaving the box, and releases on pointerup and pointercancel, never pointerleave, which does
 * not fire while capture holds (SPEC §7). The box's size is computed from the ratio once and
 * never read back off the element, so nothing here measures after a style write (SPEC §5).
 *
 * Two strings went. Under the map sat "Drag the box, or scroll the plan. Either one moves
 * the other.", an instruction to the reader rather than anything a plan viewer prints, and
 * under the frame sat "Both scales at once: the plan at full size, and the whole of it
 * shrunk beside it.", which described the layout instead of being it. The article carries
 * both points; the coupling is visible in the pass itself.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour plan</span>
          <span class="sp-label" data-part="readout" role="status" style="font-size: 11px">Berth ${String.fromCharCode(65 + MARKED.column)}${MARKED.row + 1} is the one under survey</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px; padding: 12px">
          <div
            class="sp-context"
            data-part="detail"
            data-at="nw"
            tabindex="0"
            aria-label="Harbour plan, detail"
            style="flex: 0 0 auto; width: ${VIEW.width}px; height: ${VIEW.height}px; overflow: auto; scrollbar-width: none;
                   overscroll-behavior: contain; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${plan(true)}</div>

          <div
            data-part="overview"
            data-subject
            data-at="nw"
            role="group"
            aria-label="Overview"
            style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 7px; width: 142px; padding: 8px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label" style="color: var(--sp-ink)">Overview</span>
            <div
              data-part="map"
              style="position: relative; width: ${MAP_W + 2}px; height: ${MAP_H + 2}px; overflow: hidden; border-radius: 4px; border: 1px solid var(--sp-line)"
            >
              <div aria-hidden="true" style="position: absolute; top: 0; left: 0; transform: scale(${SCALE}); transform-origin: top left">${plan(false)}</div>
              <div
                data-part="box"
                role="slider"
                aria-label="Visible area"
                style="position: absolute; top: 0; left: 0; width: ${RECT.width}px; height: ${RECT.height}px; cursor: grab;
                       background: color-mix(in srgb, var(--sp-accent) 18%, transparent); border: 2px solid var(--sp-accent);
                       border-radius: 3px; touch-action: none"
              ></div>
              <span data-part="corner-nw" aria-hidden="true" style="position: absolute; left: ${Math.round(RECT.width / 2)}px; top: ${Math.round(RECT.height / 2)}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
              <span data-part="corner-se" aria-hidden="true" style="position: absolute; left: ${MAP_W - Math.round(RECT.width / 2)}px; top: ${MAP_H - Math.round(RECT.height / 2)}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const detail = part(root, 'detail');
  const overview = part(root, 'overview');
  const box = part(root, 'box');

  const maxScrollX = () => Math.max(detail.scrollWidth - detail.clientWidth, 0);
  const maxScrollY = () => Math.max(detail.scrollHeight - detail.clientHeight, 0);
  const travelX = MAP_W - RECT.width;
  const travelY = MAP_H - RECT.height;

  const sync = () => {
    const fx = maxScrollX() > 0 ? detail.scrollLeft / maxScrollX() : 0;
    const fy = maxScrollY() > 0 ? detail.scrollTop / maxScrollY() : 0;
    box.style.left = `${Math.round(fx * travelX)}px`;
    box.style.top = `${Math.round(fy * travelY)}px`;
    const at = zone(fx, fy);
    overview.dataset.at = at;
    detail.dataset.at = at;
  };

  detail.addEventListener('scroll', sync);

  let from: { x: number; y: number; left: number; top: number } | null = null;

  box.addEventListener('pointerdown', (event) => {
    from = { ...localPoint(event, root), left: detail.scrollLeft, top: detail.scrollTop };
    box.style.cursor = 'grabbing';
    // Mandatory and invisible to every scripted pass: without it a reader's drag stops the
    // moment the pointer leaves the box. Guarded, because a synthetic pointer cannot be
    // captured and the call would throw (SPEC §7).
    if (event.isTrusted) box.setPointerCapture(event.pointerId);
  });

  box.addEventListener('pointermove', (event) => {
    if (!from) return;
    const at = localPoint(event, root);
    if (travelX > 0) detail.scrollLeft = from.left + ((at.x - from.x) / travelX) * maxScrollX();
    if (travelY > 0) detail.scrollTop = from.top + ((at.y - from.y) / travelY) * maxScrollY();
  });

  const release = () => {
    if (!from) return;
    from = null;
    box.style.cursor = 'grab';
  };

  box.addEventListener('pointerup', release);
  box.addEventListener('pointercancel', release);

  sync();
}
