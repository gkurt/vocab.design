import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two simulated viewport widths, either side of the cap. */
const WIDTHS: Record<string, number> = { narrow: 300, wide: 440 };
const MAX = 300;
const PAD = 16;

/**
 * Container specimen: one content column inside a simulated viewport that changes
 * width under it. Below the cap the column is the viewport minus its padding; above
 * the cap it stops at 300px and the leftover becomes margin either side.
 *
 * The subject is the column itself, which is the narrowest thing the term names: the
 * viewport it sits in, the full width band above it, and the width switcher are the
 * scene it has to be read against, so they carry the context register (SPEC §5).
 *
 * The band across the top of the viewport used to be labelled "full width band", which is
 * the site naming its own diagram inside a page about tides; it carries a notice a tide site
 * would really run instead, and the band being full width is visible without being said. The
 * measurement line under the viewport changes with the width switch, so it is marked
 * `data-stage-verdict` and the stage draws it in the strip rather than inside the frame.
 *
 * The resulting width is arithmetic rather than a measurement, because the only
 * inputs are the viewport width, the cap and the padding, and a demo that measures
 * straight after writing a style is reading the value it just replaced.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Width" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">300px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">440px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center">
          <div
            data-part="viewport"
            data-width="narrow"
            style="display: flex; flex-direction: column; width: ${WIDTHS.narrow}px; height: 158px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div class="sp-context" data-part="bleed" style="padding: 6px 0; text-align: center; background: var(--sp-line)">
              <span class="sp-label">Spring tides, 12 to 15 March</span>
            </div>
            <div
              class="sp-stack"
              data-part="container"
              data-subject
              style="flex: 1 1 auto; width: 100%; max-width: ${MAX}px; margin-inline: auto; padding: 12px ${PAD}px; background: var(--sp-surface)"
            >
              <span class="sp-heading">Tide tables</span>
              <div class="sp-line" style="width: 96%"></div>
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 61%"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout"
                style="margin-top: 10px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const container = part(root, 'container');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const width = WIDTHS[key];
    if (!width) return;
    const capped = width > MAX;
    viewport.style.width = `${width}px`;
    viewport.dataset.width = key;
    flag(container, 'data-capped', capped);
    readout.textContent = capped
      ? `viewport ${width}px · container held at ${MAX}px, ${(width - MAX) / 2}px margin each side`
      : `viewport ${width}px · container ${width}px, ${PAD}px padding each side`;
  };

  // Each segment names a width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('narrow');
}
