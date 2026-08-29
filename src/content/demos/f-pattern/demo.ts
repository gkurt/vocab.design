import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page under the overlays, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 212;

const NOTES: Record<string, string> = {
  path: 'Two sweeps across the top, then a run down the left edge: the first words of each line are what is reliably seen.',
  cold: 'The far end of every line, and the column beside it, collect almost no fixations at all.',
  off: 'The page on its own. Nothing about the scan is in the layout; it is what dense text gets.',
};

/**
 * F pattern specimen: a text-heavy page with the scanning shape drawn over it, as the path
 * itself and as the cold region the path never reaches.
 *
 * The subject is the drawn path. The F is a description of where eyes go rather than a
 * component, so the narrowest element the term names is the figure tracing it, and the page
 * it is traced over is the scene (SPEC §5). The overlay is sized to the shape's own bounding
 * box rather than to the page, so identify rings the path and not the whole specimen, and it
 * takes no pointer events, so a reader's click reaches the page underneath.
 */
export function mount(root: HTMLElement): void {
  const lines = (widths: string[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}"></div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Overlay</span>
          <sp-segmented class="sp-segmented" data-axis="Show" data-part="switcher" data-value="path">
            <button class="sp-segment" type="button" data-part="seg-path" value="path">scan path</button>
            <button class="sp-segment" type="button" data-part="seg-cold" value="cold">cold zone</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">page only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; gap: 14px; padding: 12px">
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 9px">
                <span class="sp-heading">Berthing and harbour dues</span>
                ${lines(['96%', '92%', '88%'])}
                <span class="sp-heading" style="font-size: 13px; margin-top: 2px">Overnight moorings</span>
                ${lines(['90%', '84%', '94%', '78%', '86%'])}
              </div>
              <div class="sp-stack" style="flex: 0 0 auto; width: 106px; gap: 8px">
                <span class="sp-label">Related</span>
                ${lines(['88%', '72%', '80%', '64%'])}
              </div>
            </div>
            <div
              data-part="cold"
              hidden
              style="position: absolute; top: 8px; right: 8px; bottom: 8px; left: 244px; border: 1px dashed var(--sp-warn); border-radius: 6px; background: repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 10px)"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; bottom: 6px; text-align: center">rarely fixated</span>
            </div>
            <svg
              data-part="path"
              data-subject
              viewBox="0 0 320 192"
              aria-hidden="true"
              style="position: absolute; left: 10px; top: 12px; width: 320px; height: 192px; pointer-events: none; overflow: visible"
            >
              <g fill="none" stroke="var(--sp-accent)" stroke-width="11" stroke-linecap="round" opacity="0.34">
                <path d="M10 10 H290" />
                <path d="M10 62 H228" />
                <path d="M10 10 V178" />
              </g>
              <g fill="var(--sp-accent)">
                <circle cx="302" cy="10" r="9" />
                <circle cx="240" cy="62" r="9" />
                <circle cx="10" cy="182" r="9" />
              </g>
              <g fill="var(--sp-accent-ink)" font-size="11" font-weight="600" text-anchor="middle" font-family="inherit">
                <text x="302" y="14">1</text>
                <text x="240" y="66">2</text>
                <text x="10" y="186">3</text>
              </g>
            </svg>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 32px; max-width: 430px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const path = part(root, 'path');
  const cold = part(root, 'cold');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    // `hidden` as an attribute, not the property: the path is an SVG element, which
    // has no `hidden` IDL attribute to set.
    flag(path, 'hidden', key !== 'path');
    flag(cold, 'hidden', key !== 'cold');
    readout.textContent = note;
  };

  // Each segment names an overlay, so the switch lands on that overlay rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('path');
}
