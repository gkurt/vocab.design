import { part } from '#src/kit/parts.ts';

type Row = { w: number; head?: boolean; blank?: boolean };

const SECTIONS = [
  [82, 74, 90, 66, 88, 58],
  [96, 96, 96, 70],
  [86, 92, 60, 78, 94, 68, 84],
  [72, 88, 64, 90, 76],
  [80, 94, 62, 86, 70, 90],
];

/** One flat run of rows, drawn twice: full size in the pane, at map scale in the strip. */
const DOC: Row[] = SECTIONS.flatMap((widths, i) => [
  { w: 44, head: true },
  ...widths.map((w) => ({ w })),
  ...(i === SECTIONS.length - 1 ? [] : [{ w: 0, blank: true }]),
]);

const ROW_H = 8;
const ROW_GAP = 8;

/**
 * Minimap specimen: a document pane with its own shrunken copy beside it, the slab
 * over that copy reporting which slice of the document is on screen.
 *
 * The subject is the map strip, not the pane it reports on: the term names the drawing
 * and the box over it, and the document beside it is what is being mapped, which is why
 * the pane wears the context register. The same row data renders twice, so the map is a
 * real overview rather than an illustration of one.
 *
 * The strip does both halves of the job. Scrolling the pane moves the slab (the map
 * mirrors), dragging the slab scrolls the pane, and clicking the strip centres the view
 * on the line clicked. Every scripted route lands on an absolute position rather than
 * nudging whatever it finds (SPEC §8). The slab's height is computed once from the
 * ratio the pane reports and never re-read off the element, so nothing here measures
 * after a style write (SPEC §5), and only the slab's offset ever changes.
 */
export function mount(root: HTMLElement): void {
  // Block rows rather than a flex stack: a column of flex children would shrink to the
  // scroller's height and there would be nothing to scroll.
  const paneRows = DOC.map((row) => {
    const box = `height: ${ROW_H}px; margin-bottom: ${ROW_GAP}px`;
    if (row.blank) return `<div style="${box}"></div>`;
    const paint = row.head ? 'border-radius: 4px; background: var(--sp-accent)' : 'border-radius: 4px; background: var(--sp-line)';
    return `<div style="${box}; width: ${row.w}%; ${paint}"></div>`;
  }).join('');

  const mapRows = DOC.map((row) => {
    if (row.blank) return '<span></span>';
    const paint = row.head ? 'background: var(--sp-accent)' : 'background: var(--sp-muted); opacity: 0.55';
    return `<span style="align-self: center; height: 3px; width: ${row.w}%; border-radius: 2px; ${paint}"></span>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">harbour-survey.md</span>
          <span class="sp-label">${DOC.length} lines</span>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div class="sp-surface" style="display: flex; height: 100%; overflow: hidden">
            <div
              class="sp-context"
              data-part="viewport"
              tabindex="0"
              aria-label="Harbour survey"
              style="flex: 1 1 auto; min-width: 0; overflow-y: scroll; scrollbar-width: none;
                     overscroll-behavior: contain; padding: 10px 12px"
            >${paneRows}</div>
            <div
              data-part="minimap"
              data-subject
              data-at="start"
              role="group"
              aria-label="Document map"
              style="position: relative; flex: 0 0 auto; width: 64px; padding: 6px 5px;
                     background: var(--sp-sunken); border-left: 1px solid var(--sp-line); cursor: pointer"
            >
              <div
                data-part="map"
                style="position: relative; display: grid; grid-template-rows: repeat(${DOC.length}, 1fr); gap: 1px; height: 100%"
              >
                ${mapRows}
                <span data-part="map-top" aria-hidden="true" style="position: absolute; left: 0; right: 0; top: 0; height: 26px; pointer-events: none"></span>
                <span data-part="map-foot" aria-hidden="true" style="position: absolute; left: 0; right: 0; bottom: 0; height: 26px; pointer-events: none"></span>
                <div
                  data-part="slab"
                  style="position: absolute; left: -4px; right: -4px; top: 0; height: 60px; border-radius: 3px;
                         background: color-mix(in srgb, var(--sp-accent) 16%, transparent);
                         border: 1px solid var(--sp-accent); cursor: grab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" style="font-size: 12px">The shape survives the shrinking. The words do not.</span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const strip = part(root, 'minimap');
  const map = part(root, 'map');
  const slab = part(root, 'slab');

  const span = () => Math.max(viewport.scrollHeight - viewport.clientHeight, 0);

  /** The slab's own height, kept here rather than read back off the element it was written to. */
  let slabH = 0;

  const sync = () => {
    const mapH = map.clientHeight;
    const ratio = viewport.clientHeight / viewport.scrollHeight;
    slabH = Math.min(mapH, Math.round(mapH * ratio));
    const max = span();
    const at = max > 0 ? viewport.scrollTop / max : 0;
    slab.style.height = `${slabH}px`;
    slab.style.top = `${Math.round(at * (mapH - slabH))}px`;
    if (max <= 0) strip.dataset.at = 'none';
    else if (at <= 0.02) strip.dataset.at = 'start';
    else if (at >= 0.98) strip.dataset.at = 'end';
    else strip.dataset.at = 'middle';
  };

  viewport.addEventListener('scroll', sync);

  let from: { y: number; top: number } | null = null;

  slab.addEventListener('pointerdown', (event) => {
    from = { y: (event as PointerEvent).clientY, top: viewport.scrollTop };
  });

  slab.addEventListener('pointermove', (event) => {
    if (!from) return;
    const travel = map.clientHeight - slabH;
    if (travel <= 0) return;
    const moved = ((event as PointerEvent).clientY - from.y) / travel;
    viewport.scrollTop = Math.min(Math.max(from.top + moved * span(), 0), span());
  });

  const release = () => {
    from = null;
  };
  slab.addEventListener('pointerup', release);
  slab.addEventListener('pointercancel', release);

  // Clicking the strip centres the view on the line under the pointer: the map is a
  // control, not a picture. The slab has its own gesture, so it is left alone.
  strip.addEventListener('click', (event) => {
    if (event.target === slab) return;
    const rect = map.getBoundingClientRect();
    if (rect.height <= 0) return;
    const at = ((event as MouseEvent).clientY - rect.top) / rect.height;
    const centred = at * viewport.scrollHeight - viewport.clientHeight / 2;
    viewport.scrollTop = Math.min(Math.max(centred, 0), span());
  });

  sync();
}
