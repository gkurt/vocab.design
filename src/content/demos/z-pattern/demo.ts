import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page under the overlays, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 190;

const NOTES: Record<string, string> = {
  path: 'Across the top, down the diagonal, then across the bottom.',
  stops: 'Four stops: the middle is only crossed, and the last one is the action.',
  off: 'The page alone. The shape is not in the layout; it is what sparsity gets.',
};

const BADGE =
  'position: absolute; display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 11px; font-weight: 600';

/**
 * Z pattern specimen: a sparse landing page with the scanning shape drawn over it, as the
 * path itself and as the four corners the path lands on.
 *
 * The subject is the drawn path, the same decision the F pattern specimen made: the Z
 * describes where eyes go rather than a component, so the narrowest element the term names
 * is the figure tracing it, and the page under it is the scene (SPEC §5). The overlay is
 * sized to the shape's own bounding box, so identify rings the path rather than the whole
 * specimen, and it takes no pointer events, so a reader's click reaches the page beneath.
 */
export function mount(root: HTMLElement): void {
  const stop = (n: number, box: string, badge: string) => `
    <div style="position: absolute; ${box}; border: 1px dashed var(--sp-accent); border-radius: 6px">
      <span style="${BADGE}; ${badge}">${n}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Overlay</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="path">
            <button class="sp-segment" type="button" data-part="seg-path" value="path">scan path</button>
            <button class="sp-segment" type="button" data-part="seg-stops" value="stops">four stops</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">page only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 14px 16px">
              <div class="sp-row sp-row--between">
                <span class="sp-row" style="gap: 7px">
                  <span class="sp-swatch" style="width: 18px; height: 18px; --sp-swatch: var(--sp-accent)"></span>
                  <span class="sp-heading" style="font-size: 13px">Wharfside</span>
                </span>
                <span class="sp-row" style="gap: 12px">
                  <span class="sp-label">Berths</span>
                  <span class="sp-label">Rates</span>
                  <span class="sp-label">Contact</span>
                </span>
              </div>
              <div class="sp-row" style="gap: 18px; align-items: center">
                <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 9px">
                  <span class="sp-heading" style="font-size: 17px">Moorings on the tidal reach</span>
                  <div class="sp-line" style="width: 82%"></div>
                  <div class="sp-line" style="width: 64%"></div>
                </div>
                <div class="sp-swatch" style="flex: 0 0 auto; width: 128px; height: 72px; --sp-swatch: var(--sp-sunken)"></div>
              </div>
              <div class="sp-row sp-row--between">
                <span class="sp-label">Berths released each Monday</span>
                <span class="sp-button sp-button--sm" style="cursor: default">Book a berth</span>
              </div>
            </div>
            <div data-part="stops" hidden style="position: absolute; inset: 0; pointer-events: none">
              ${stop(1, 'left: 10px; top: 10px; width: 106px; height: 30px', 'top: -9px; left: -9px')}
              ${stop(2, 'right: 10px; top: 10px; width: 156px; height: 30px', 'top: -9px; right: -9px')}
              ${stop(3, 'left: 10px; bottom: 10px; width: 192px; height: 30px', 'bottom: -9px; left: -9px')}
              ${stop(4, 'right: 10px; bottom: 10px; width: 118px; height: 32px', 'bottom: -9px; right: -9px')}
            </div>
            <svg
              data-part="path"
              data-subject
              viewBox="0 0 416 162"
              aria-hidden="true"
              style="position: absolute; left: 14px; top: 14px; width: 416px; height: 162px; pointer-events: none; overflow: visible"
            >
              <g fill="none" stroke="var(--sp-accent)" stroke-width="11" stroke-linecap="round" opacity="0.34">
                <path d="M10 10 H394" />
                <path d="M394 14 L22 148" />
                <path d="M10 152 H394" />
              </g>
              <g fill="var(--sp-accent)">
                <circle cx="10" cy="10" r="9" />
                <circle cx="406" cy="10" r="9" />
                <circle cx="10" cy="152" r="9" />
                <circle cx="406" cy="152" r="9" />
              </g>
              <g fill="var(--sp-accent-ink)" font-size="11" font-weight="600" text-anchor="middle" font-family="inherit">
                <text x="10" y="14">1</text>
                <text x="406" y="14">2</text>
                <text x="10" y="156">3</text>
                <text x="406" y="156">4</text>
              </g>
            </svg>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 430px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const path = part(root, 'path');
  const stops = part(root, 'stops');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    // `hidden` as an attribute, not the property: the path is an SVG element, which has
    // no `hidden` IDL attribute to set.
    flag(path, 'hidden', key !== 'path');
    flag(stops, 'hidden', key !== 'stops');
    readout.textContent = note;
  };

  // Each segment names an overlay, so the switch lands on that overlay rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('path');
}
