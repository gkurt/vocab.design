import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The threshold the primitive compares against its OWN inner width, and nothing else. */
const THRESHOLD = 340;
const PAD = 10;
const GAP = 10;
/** How far the handle may take the container, and where it starts. */
const MIN = 208;
const MAX = 412;
const START = 400;
/** Where the scripted drag aims, in container widths. */
const NARROW = 240;

const CARDS = [
  { title: 'Tides', lines: [88, 62] },
  { title: 'Berths', lines: [74, 54] },
  { title: 'Fuel', lines: [82, 48] },
];

/**
 * Switcher specimen: three cards under Every Layout's rule, in a container the reader can
 * actually resize. Wider than the threshold and the cards share a row; narrower and every one
 * of them takes a line of its own. No media query is involved and the viewport never moves:
 * the only number in the comparison is the container's own width.
 *
 * The subject is the switcher container, `data-part="switcher"`. The primitive IS the box and
 * its rule, not any card inside it (SPEC §5), and the handle and the readout stay outside it as
 * scenery. A line under the frame once read "Drag the handle: the cards answer to the container's
 * width, never to the window's.", which told the reader what to do and then said the term out
 * loud; the handle is a handle and the readout prints the width, so it went.
 *
 * The readout used to finish that width with the arrangement it had produced, "400px wide: one
 * row", which is the site announcing the term over the top of a preview that already shows it.
 * It prints the width alone now. The threshold beside it stays, because it is the legend of the
 * instrument this frame is (a container the reader resizes), and it sits in the label register
 * rather than the heading one so it reads as a legend and not as a product's name.
 *
 * The container's height is its own, as a real switcher's is, so the room the stacked
 * arrangement needs is reserved by the box around it and nothing below the arrangement ever
 * moves (SPEC §5).
 *
 * `data-axis` is measured, not declared: the demo counts the distinct rows the cards landed on
 * and says `row` or `column`, which is the only claim that could catch a switcher whose rule
 * had stopped working. Nothing here transitions a width, so the read after the write is the
 * real one (SPEC §5).
 *
 * The drag captures the pointer on a trusted pointerdown, so a reader's own drag survives
 * leaving the handle, and releases on pointerup and pointercancel, never pointerleave, which
 * does not fire while capture holds (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    (card, i) => `
      <div
        class="sp-surface"
        data-part="card-${i + 1}"
        style="flex-grow: 1; flex-basis: calc((${THRESHOLD}px - 100%) * 999); min-width: 0; padding: 8px 10px"
      >
        <span class="sp-label" style="display: block; color: var(--sp-ink); font-weight: 600; font-size: 12px; line-height: 1.25">${card.title}</span>
        <div class="sp-stack" style="gap: 4px; margin-top: 6px">
          ${card.lines.map((width) => `<div class="sp-line" style="width: ${width}%; height: 6px"></div>`).join('')}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 258px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-label sp-grow" style="font-size: 11px">Threshold ${THRESHOLD}px</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div style="position: relative; display: flex; align-items: flex-start; gap: 2px; width: ${MAX + 14}px; height: 100%">
            <div
              data-part="switcher"
              data-subject
              data-axis="row"
              style="display: flex; flex-wrap: wrap; align-items: stretch; gap: ${GAP}px; flex: 0 0 auto;
                     width: ${START}px; padding: ${PAD}px;
                     background: var(--sp-accent-soft); border-radius: var(--sp-radius)"
            >${cards}</div>

            <div
              data-part="handle"
              role="separator"
              aria-label="Container width"
              style="flex: 0 0 auto; width: 8px; height: 44px; margin-top: 14px; border-radius: 999px;
                     background: var(--sp-line); cursor: ew-resize; touch-action: none"
            ></div>

            <span data-part="aim-narrow" aria-hidden="true" style="position: absolute; top: 36px; left: ${NARROW + 6}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
            <span data-part="aim-wide" aria-hidden="true" style="position: absolute; top: 36px; left: ${START + 6}px; width: 4px; height: 4px; translate: -50% -50%; pointer-events: none"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const switcher = part(root, 'switcher');
  const handle = part(root, 'handle');
  const readout = part(root, 'readout');
  const cardEls = CARDS.map((_, i) => part(root, `card-${i + 1}`));

  const report = () => {
    // Counted from where the cards actually landed, on boxes nothing transitions.
    const rows = new Set(cardEls.map((card) => Math.round(card.offsetTop))).size;
    switcher.dataset.axis = rows === 1 ? 'row' : 'column';
    readout.textContent = `${Math.round(switcher.offsetWidth)}px`;
  };

  const resize = (width: number) => {
    switcher.style.width = `${Math.round(Math.min(Math.max(width, MIN), MAX))}px`;
    report();
  };

  let from: { x: number; width: number } | null = null;

  handle.addEventListener('pointerdown', (event) => {
    from = { x: localPoint(event, root).x, width: switcher.offsetWidth };
    // Mandatory and invisible to every scripted pass: without it a reader's drag stops the
    // moment the pointer leaves the handle. Guarded, because a synthetic pointer cannot be
    // captured and the call would throw (SPEC §7).
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
