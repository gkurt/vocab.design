import { part } from '#src/kit/parts.ts';

/** Fixed row height is the assumption that turns "which rows are visible" into a division. */
const ROW = 24;
const TOTAL = 10000;
const VIEWPORT = 168;
/** Rows kept either side of the visible band, so a flick has something to land on. */
const OVERSCAN = 3;
const VISIBLE = Math.ceil(VIEWPORT / ROW);

const DEVICES = ['pump', 'valve', 'boiler', 'chiller', 'fan', 'meter'];

function label(index: number): string {
  const minutes = index % 60;
  const hours = Math.floor(index / 60) % 24;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function row(index: number): string {
  const n = index + 1;
  return `
    <div class="sp-row" data-part="row-${n}" style="position: absolute; left: 0; right: 0; top: ${index * ROW}px; height: ${ROW}px; gap: 10px; padding: 0 10px; border-top: 1px solid var(--sp-line)">
      <span class="sp-label" style="flex: 0 0 46px; font-size: 11px">#${n}</span>
      <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${DEVICES[index % DEVICES.length]} ${(index % 24) + 1} reported in</span>
      <span class="sp-label" style="font-size: 11px">${label(index)}</span>
    </div>`;
}

/**
 * List virtualization specimen: ten thousand rows of data, thirteen rows of document.
 * The subject is the scroller, because the term names what that box does with its own
 * scroll position: the readout beside it, the log window around it, and the caption are
 * scenery (SPEC §5).
 *
 * The spacer is the whole trick made visible. It is sized to what the full list would
 * have measured, so the scrollbar's thumb and travel are the real list's, while the
 * rendered window is absolutely positioned at the offset the scroll landed on. Row
 * numbers come from the data index rather than from the DOM order, which is what lets a
 * choreography prove that row 1 has genuinely left the document.
 *
 * Nothing is measured after a style write: the row height is a constant both the layout
 * and the arithmetic are built from (SPEC §5, and the measurement gotcha in AGENTS.md).
 * Rendering is driven by scroll alone, so an idle specimen runs nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site telemetry</span>
          <span class="sp-label">10,000 rows</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-scroll sp-surface" data-part="viewport" data-subject style="flex: 0 0 auto; height: ${VIEWPORT}px">
            <div data-part="spacer" style="position: relative; height: ${TOTAL * ROW}px">
              <div data-part="window"></div>
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 18px">
            <span class="sp-label">Rows in the document</span>
            <span class="sp-text sp-text--ink" data-part="readout" data-count="0" style="font-size: 12px; white-space: nowrap"></span>
          </div>
          <span class="sp-text sp-context" data-part="caption" style="flex: 0 0 auto; height: 34px; font-size: 11px">
            The scrollbar belongs to the whole list. A spacer holds the height of everything not rendered.
          </span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const windowed = part(root, 'window');
  const readout = part(root, 'readout');

  let start = -1;

  const render = () => {
    const first = Math.max(0, Math.floor(viewport.scrollTop / ROW) - OVERSCAN);
    if (first === start) return;
    start = first;
    const end = Math.min(TOTAL, first + VISIBLE + OVERSCAN * 2);
    windowed.innerHTML = Array.from({ length: end - first }, (_, i) => row(first + i)).join('');
    readout.dataset.count = String(end - first);
    readout.textContent = `${end - first} rendered, numbered ${first + 1} to ${end}`;
  };

  viewport.addEventListener('scroll', render);
  render();
}
