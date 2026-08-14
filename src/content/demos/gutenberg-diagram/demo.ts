import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page under the overlays, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 190;
const INSET = 10;

const NOTES: Record<string, string> = {
  quadrants: 'Primary optical area, two fallow corners, and the terminal area.',
  gravity: 'Reading gravity: sweeps left to right, each starting a little lower.',
  off: "The page alone: evenly weighted, which is the model's one condition.",
};

/** Box, then where the name sits inside it: all four are pulled towards the page's
    middle, where the only thing under them is body text. */
const QUADRANTS: [string, string, string][] = [
  ['primary optical area', 'left: 0; top: 0', 'left: 8px; bottom: 6px'],
  ['strong fallow area', 'right: 0; top: 0', 'right: 8px; bottom: 6px'],
  ['weak fallow area', 'left: 0; bottom: 0', 'left: 8px; top: 6px'],
  ['terminal area', 'right: 0; bottom: 0', 'right: 8px; top: 6px'],
];

const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px"></div>`).join('');

/**
 * Gutenberg diagram specimen: an evenly weighted page with the four quadrants named over
 * it, and the reading gravity that runs between the first of them and the last.
 *
 * The subject is the drawn diagram, the same decision the F pattern and Z pattern
 * specimens made: the term names a model of where eyes go rather than a component, so the
 * narrowest element it names is the figure stating it, and the page underneath is the
 * scene (SPEC §5). Both overlays are sized to the page's own reading area, so identify
 * rings the diagram rather than the whole specimen, and neither takes pointer events, so a
 * reader's click reaches the page beneath.
 */
export function mount(root: HTMLElement): void {
  const quadrant = (label: string, box: string, at: string) => `
    <div style="position: absolute; ${box}; width: calc(50% - 1px); height: calc(50% - 1px); border: 1px dashed var(--sp-accent); border-radius: 6px">
      <span style="position: absolute; ${at}; padding: 1px 5px; border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; white-space: nowrap">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Overlay</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="quadrants">
            <button class="sp-segment" type="button" data-part="seg-quadrants" value="quadrants">quadrants</button>
            <button class="sp-segment" type="button" data-part="seg-gravity" value="gravity">gravity</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">page only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 12px 16px">
              <div class="sp-row sp-row--between">
                <span class="sp-row" style="gap: 7px">
                  <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent)"></span>
                  <span class="sp-heading" style="font-size: 12px">Foundry Weekly</span>
                </span>
                <span class="sp-label">Number 214</span>
              </div>
              <div class="sp-row" style="gap: 18px; align-items: flex-start">
                <div class="sp-stack" style="flex: 1 1 0; gap: 7px">${lines([100, 92, 100, 86, 96, 74])}</div>
                <div class="sp-stack" style="flex: 1 1 0; gap: 7px">${lines([94, 100, 88, 100, 90, 68])}</div>
              </div>
              <div class="sp-row sp-row--between">
                <span class="sp-label">Printed Thursdays</span>
                <span class="sp-button sp-button--sm" style="cursor: default">Subscribe</span>
              </div>
            </div>
            <div data-part="quadrants" data-subject style="position: absolute; inset: ${INSET}px; pointer-events: none">
              ${QUADRANTS.map(([label, box, at]) => quadrant(label, box, at)).join('')}
            </div>
            <svg
              data-part="gravity"
              hidden
              viewBox="0 0 424 170"
              aria-hidden="true"
              style="position: absolute; left: ${INSET}px; top: ${INSET}px; width: ${PAGE_W - INSET * 2}px; height: ${PAGE_H - INSET * 2}px; pointer-events: none; overflow: visible"
            >
              <g fill="none" stroke="var(--sp-accent)" stroke-width="5" stroke-linecap="round" opacity="0.22">
                <path d="M16 18 H392 M16 62 H400 M20 106 H404 M28 150 H408" />
              </g>
              <g fill="none" stroke="var(--sp-accent)" stroke-width="10" stroke-linecap="round" opacity="0.34">
                <path d="M16 18 L408 150" />
              </g>
              <g fill="var(--sp-accent)">
                <circle cx="16" cy="18" r="9" />
                <circle cx="408" cy="150" r="9" />
              </g>
            </svg>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 430px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const quadrants = part(root, 'quadrants');
  const gravity = part(root, 'gravity');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    // `hidden` as an attribute, not the property: the sweep is an SVG element, which has
    // no `hidden` IDL attribute to set.
    flag(quadrants, 'hidden', key !== 'quadrants');
    flag(gravity, 'hidden', key !== 'gravity');
    readout.textContent = note;
  };

  // Each segment names an overlay, so the switch lands on that overlay rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('quadrants');
}
