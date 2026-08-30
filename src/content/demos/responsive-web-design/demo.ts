import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** This specimen's own scale: a simulated viewport width and the arrangement it buys. */
const STEPS: Record<string, { width: number; cols: number; template: string }> = {
  phone: { width: 258, cols: 1, template: '1fr' },
  tablet: { width: 348, cols: 2, template: 'repeat(2, 1fr)' },
  desktop: { width: 438, cols: 3, template: 'repeat(3, 1fr)' },
};

/** Viewport padding plus the page's own padding: what the media inside is short of. */
const INSET = 34;

/**
 * Responsive web design specimen: one page, one set of content, shown at three simulated
 * viewport widths. All three of Marcotte's ingredients are on screen at once. The card
 * grid is stated in proportions, so it stretches continuously between the steps; the
 * picture is a share of whatever column it landed in, and shortens as it narrows because
 * its ratio is fixed rather than its height; and the column count is the one thing a
 * query changes outright.
 *
 * The subject is the page region, since the term names the layout rather than the device
 * around it: the simulated viewport, the width switcher and the readout are the scene it
 * is read against and carry the context register (SPEC §5).
 *
 * A label under the viewport once read "fluid grid · flexible media · media queries",
 * naming Marcotte's three ingredients. No browser prints that, and the article names them
 * at length, so it went and the readout took its place under the viewport.
 *
 * The reported media width is arithmetic (viewport minus the two paddings), not a
 * measurement, because a demo that measures straight after writing a width reads back
 * the width it just replaced.
 */
export function mount(root: HTMLElement): void {
  const cards = [78, 64, 71]
    .map(
      (width, index) => `
        <div
          class="sp-surface"
          data-part="card-${index + 1}"
          style="display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; padding: 4px"
        >
          <div class="sp-line" style="width: ${width}%"></div>
        </div>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Device" data-part="switcher" data-value="phone">
            <button class="sp-segment" type="button" data-part="seg-phone" value="phone">phone</button>
            <button class="sp-segment" type="button" data-part="seg-tablet" value="tablet">tablet</button>
            <button class="sp-segment" type="button" data-part="seg-desktop" value="desktop">desktop</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="phone"
            style="width: ${STEPS.phone?.width}px; height: 172px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="page"
              data-subject
              data-cols="1"
              style="display: flex; flex-direction: column; gap: 5px; height: 100%; padding: 8px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-label" style="font-size: 11px; color: var(--sp-ink); font-weight: 600">Harbour</span>
                <span class="sp-label" style="font-size: 11px">Log</span>
                <span class="sp-label" style="font-size: 11px">About</span>
              </div>
              <div
                data-part="media"
                style="flex: 0 0 auto; width: 100%; aspect-ratio: 6 / 1; border-radius: 5px; background: linear-gradient(115deg, #3f6ad8, #7cc0d8 60%, #e0b06a)"
              ></div>
              <div
                class="sp-grid"
                data-part="grid"
                style="flex: 1 1 auto; min-height: 0; gap: 5px; grid-template-columns: ${STEPS.phone?.template}; grid-auto-rows: 1fr"
              >
                ${cards}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="margin-top: 11px; font-size: 12px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const page = part(root, 'page');
  const grid = part(root, 'grid');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const step = STEPS[key];
    if (!step) return;
    viewport.style.width = `${step.width}px`;
    viewport.dataset.width = key;
    page.dataset.cols = String(step.cols);
    grid.style.gridTemplateColumns = step.template;
    readout.textContent = `${step.width}px · ${step.cols} column${step.cols === 1 ? '' : 's'} · media ${step.width - INSET}px wide`;
  };

  // Each segment names a width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('phone');
}
