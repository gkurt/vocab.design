import { part } from '#src/kit/parts.ts';

const BLOCKS = ['Ferry timetable', 'Lock keeper notes', 'Weir maintenance', 'Mooring fees', 'Winter dredging', 'Contact the office'];

/** The minimap's own height: the whole document drawn at whatever scale fits in it. */
const MAP_HEIGHT = 168;

/**
 * Viewport specimen: a fixed rectangle with a taller document scrolling behind it, and a
 * minimap beside it drawing the same relationship at a smaller scale, where the moving
 * highlight is the viewport's share of the document.
 *
 * The subject is the rectangle, not the scene. A viewport is a frame rather than a
 * component, so the narrowest element the term names is the box that clips: the page it
 * clips, the minimap, and the readout are what the box has to be read against and carry
 * the context register (SPEC §5). It is not the top-level wrapper, so identify still has
 * something to point at.
 *
 * Every number in the readout and every offset in the minimap is read from the scroller's
 * own geometry on each scroll, never from the sizes the markup asked for.
 */
export function mount(root: HTMLElement): void {
  const blocks = BLOCKS.map(
    (title) => `
      <div class="sp-stack" style="margin-bottom: 14px">
        <span class="sp-heading">${title}</span>
        <div class="sp-line" style="width: 94%"></div>
        <div class="sp-line" style="width: 78%"></div>
        <div class="sp-line" style="width: 86%"></div>
      </div>`,
  ).join('');

  const mapBlocks = BLOCKS.map(
    () => `
      <div style="display: flex; flex-direction: column; gap: 3px; margin-bottom: 8px">
        <div class="sp-line" style="height: 4px; width: 70%; background: var(--sp-muted)"></div>
        <div class="sp-line" style="height: 3px; width: 88%"></div>
        <div class="sp-line" style="height: 3px; width: 74%"></div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 18px">
        <div
          data-part="viewport"
          data-subject
          style="position: relative; width: 246px; height: 196px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
        >
          <div class="sp-scroll sp-context" data-part="page" style="width: 100%; height: 100%; padding: 12px">
            ${blocks}
          </div>
        </div>
        <div class="sp-stack sp-context" style="align-items: center; gap: 6px">
          <span class="sp-label">document</span>
          <div
            data-part="map"
            style="position: relative; width: 54px; height: ${MAP_HEIGHT}px; padding: 5px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: 5px; overflow: hidden"
          >
            ${mapBlocks}
            <div
              data-part="lens"
              data-at="top"
              style="position: absolute; left: 0; right: 0; top: 0; height: 0; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 3px; opacity: 0.72"
            ></div>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="height: 18px">
        <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const lens = part(root, 'lens');
  const readout = part(root, 'readout');

  const sync = () => {
    const seen = page.clientHeight;
    const whole = page.scrollHeight;
    const offset = page.scrollTop;
    const travel = Math.max(whole - seen, 1);
    const fraction = Math.min(offset / travel, 1);
    lens.style.height = `${Math.round((seen / whole) * MAP_HEIGHT)}px`;
    lens.style.top = `${Math.round(fraction * (MAP_HEIGHT - (seen / whole) * MAP_HEIGHT))}px`;
    lens.dataset.at = fraction < 0.18 ? 'top' : fraction > 0.82 ? 'bottom' : 'middle';
    readout.textContent = `viewport ${seen}px · document ${whole}px · scrolled ${Math.round(offset)}px`;
  };

  page.addEventListener('scroll', sync);
  sync();
}
