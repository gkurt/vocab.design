import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The column's own ceiling and floor, which is where the reflow decision lives. */
const CEILING = 176;
const FLOOR = 152;
/** Half the gutter, stated as a side margin on each column, as a mail cell's is. */
const HALF_GAP = 4;
/** How far the handle may take the container, and where it starts. */
const MIN = 214;
const MAX = 392;
const START = 388;
/** Where the scripted drag aims, in container widths. */
const NARROW = 216;
/** Room for the stacked arrangement, so neither state moves what is under it. */
const HEIGHT = 168;

const line = (width: string) => `<div class="sp-line" style="width: ${width}; height: 6px"></div>`;

const column = (name: string, title: string, widths: string[]) => `
  <div data-part="${name}" style="display: inline-block; vertical-align: top; width: 100%;
       max-width: ${CEILING}px; min-width: ${FLOOR}px; margin: 0 ${HALF_GAP}px; padding: 8px 9px;
       background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px">
    <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 11px; line-height: 1.4">${title}</span>
    <div class="sp-stack" style="gap: 5px; margin-top: 6px">${widths.map(line).join('')}</div>
  </div>`;

/**
 * Fluid hybrid specimen: a two column mail body in a container the reader can resize,
 * with no media query and no breakpoint anywhere in it. The columns are `width: 100%`
 * with a `max-width` ceiling and a `min-width` floor, set inline-block. A column's
 * width is its percentage clamped between the two, so the pair sits across while twice
 * that width fits and the second drops to its own line the moment it does not.
 *
 * Under the card, the other half of the technique, drawn as a labelled schematic rather
 * than as an impersonation of any client (SPEC §1): the fixed-width ghost tables that
 * live inside an MSO conditional comment. They are drawn at the same ceiling the fluid
 * columns carry, and they never reflow, because the engine they are for is only ever on
 * a desktop.
 *
 * The subject is the fluid container. The rule is the box, not either column inside it
 * (SPEC §5), so the handle, the readout, the ghost schematic and the caption are all
 * scenery. `data-flow` is measured rather than declared: the demo counts the distinct
 * rows the columns landed on, which is the only claim that could catch a reflow that
 * had stopped working. Nothing here transitions a width, so the read after the write is
 * the real one, and the container holds room for the stacked arrangement, so nothing
 * below it ever moves (SPEC §5).
 *
 * The drag captures the pointer on a trusted pointerdown, so a reader's own drag
 * survives leaving the handle, and releases on pointerup and pointercancel, never
 * pointerleave, which does not fire while capture holds (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 268px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 12px">Column: 100%, max ${CEILING}px, min ${FLOOR}px</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 8px 10px">
          <div style="position: relative; display: flex; align-items: flex-start; gap: 2px; width: ${MAX + 12}px">
            <div data-part="fluid" data-subject data-flow="row"
                 style="flex: 0 0 auto; width: ${START}px; height: ${HEIGHT}px; padding: 8px 4px;
                        background: var(--sp-accent-soft); border-radius: var(--sp-radius); overflow: hidden;
                        font-size: 0; line-height: 0">
              <div style="margin: 0 ${HALF_GAP}px 8px; padding: 6px 9px; background: var(--sp-surface);
                          border: 1px solid var(--sp-line); border-radius: 6px">
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px; line-height: 1.4">Northwind weekly</span>
              </div>
              ${column('col-1', 'Harbour', ['100%', '82%'])}${column('col-2', 'Tides', ['100%', '66%'])}
            </div>

            <div data-part="handle" role="separator" aria-label="Container width"
                 style="flex: 0 0 auto; width: 8px; height: 40px; margin-top: 12px; border-radius: 999px;
                        background: var(--sp-line); cursor: ew-resize; touch-action: none"></div>

            <span data-part="aim-narrow" aria-hidden="true"
                  style="position: absolute; top: 32px; left: ${NARROW + 6}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            <span data-part="aim-wide" aria-hidden="true"
                  style="position: absolute; top: 32px; left: ${START + 6}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
          </div>

          <div class="sp-stack sp-context" data-part="ghost" style="gap: 4px; width: ${MAX}px">
            <span class="sp-label" style="font-size: 10px; line-height: 1.3">Ghost tables, MSO only: fixed at ${CEILING}px, never reflowing</span>
            <div class="sp-row" style="gap: ${HALF_GAP * 2}px">
              <div data-part="ghost-1" style="width: ${CEILING}px; height: 18px; border: 2px dashed var(--sp-muted); border-radius: 5px"></div>
              <div data-part="ghost-2" style="width: ${CEILING}px; height: 18px; border: 2px dashed var(--sp-muted); border-radius: 5px"></div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">
        Drag the handle: when twice the ceiling stops fitting, the second column drops.
      </span>
    </div>
  `;

  const fluid = part(root, 'fluid');
  const handle = part(root, 'handle');
  const readout = part(root, 'readout');
  const columns = [part(root, 'col-1'), part(root, 'col-2')];

  const report = () => {
    // Counted from where the columns actually landed, on boxes nothing transitions.
    const rows = new Set(columns.map((col) => Math.round(col.offsetTop))).size;
    fluid.dataset.flow = rows === 1 ? 'row' : 'column';
    readout.textContent = `${Math.round(fluid.offsetWidth)}px: ${rows === 1 ? 'two across' : 'stacked'}`;
  };

  const resize = (width: number) => {
    fluid.style.width = `${Math.round(Math.min(Math.max(width, MIN), MAX))}px`;
    report();
  };

  let from: { x: number; width: number } | null = null;

  handle.addEventListener('pointerdown', (event) => {
    from = { x: localPoint(event, root).x, width: fluid.offsetWidth };
    // Mandatory and invisible to every scripted pass: without it a reader's drag stops
    // the moment the pointer leaves the handle. Guarded, because a synthetic pointer
    // cannot be captured and the call would throw (SPEC §7).
    if (event.isTrusted) handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointermove', (event) => {
    if (!from) return;
    resize(from.width + (localPoint(event, root).x - from.x));
  });

  const release = () => {
    from = null;
  };

  handle.addEventListener('pointerup', release);
  handle.addEventListener('pointercancel', release);

  report();
}
