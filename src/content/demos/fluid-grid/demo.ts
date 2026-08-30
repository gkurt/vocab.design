import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two simulated viewport widths this specimen steps between. */
const WIDTHS: Record<string, number> = { narrow: 256, wide: 438 };
/** The fixed twin's own numbers, drawn from a comp that was 438px wide. */
const COLUMN = 110;
const GAP = 8;
const PAD = 8;

/**
 * Fluid grid specimen: the same three cards laid out twice inside one simulated viewport,
 * once with proportional columns and once with the pixel columns a fixed comp would have
 * produced. The gutters are the same eight pixels in both, which is the point: fluidity
 * belongs to the tracks, not to the gaps.
 *
 * The subject is the fluid grid region, the narrowest element the term names. The fixed
 * twin below it is what the term has to be read against, so it and the viewport, the
 * switcher and the readout carry the context register (SPEC §5).
 *
 * Every reported width is arithmetic from the viewport width, the column count and the
 * gutter, never a measurement taken after a style write (SPEC gotcha).
 *
 * The two rows were once labelled "columns as proportions" and "columns at 110px", which is
 * the site describing its own comparison. They now print the declaration each row was laid
 * out with, so the annotation states a fact about the markup rather than a lesson.
 */
export function mount(root: HTMLElement): void {
  const cards = (key: string, fills: number[]) =>
    fills
      .map(
        (fill, index) => `
        <div
          class="sp-surface"
          data-part="${key}-card-${index + 1}"
          style="display: flex; align-items: center; justify-content: center; min-width: 0; height: 46px; padding: 6px"
        >
          <div class="sp-line" style="width: ${fill}%"></div>
        </div>`,
      )
      .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Width" data-part="switcher" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">256px</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">438px</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="narrow"
            style="width: ${WIDTHS.narrow}px; padding: ${PAD}px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label">repeat(3, 1fr)</span>
            <div
              class="sp-grid"
              data-part="fluid"
              data-subject
              style="margin-top: 4px; gap: ${GAP}px; grid-template-columns: repeat(3, 1fr)"
            >
              ${cards('fluid', [76, 62, 70])}
            </div>
            <span class="sp-label" style="display: block; margin-top: 12px">repeat(3, ${COLUMN}px)</span>
            <div
              data-part="fixed"
              style="margin-top: 4px; display: grid; gap: ${GAP}px; grid-template-columns: repeat(3, ${COLUMN}px); overflow: hidden"
            >
              ${cards('fixed', [76, 62, 70])}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="margin-top: 9px; font-size: 12px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const fixed = part(root, 'fixed');
  const fluid = part(root, 'fluid');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const width = WIDTHS[key];
    if (!width) return;
    const inner = width - PAD * 2;
    const fluidColumn = Math.round((inner - GAP * 2) / 3);
    const slack = inner - (COLUMN * 3 + GAP * 2);
    viewport.style.width = `${width}px`;
    viewport.dataset.width = key;
    fluid.dataset.column = String(fluidColumn);
    flag(fixed, 'data-overflowing', slack < 0);
    flag(fixed, 'data-slack', slack > 0);
    readout.textContent =
      slack < 0
        ? `viewport ${width}px · fluid columns ${fluidColumn}px · fixed columns run ${-slack}px past the edge`
        : `viewport ${width}px · fluid columns ${fluidColumn}px · fixed columns leave ${slack}px of dead space`;
  };

  // Each segment names a width, so the switch lands on that width rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('narrow');
}
