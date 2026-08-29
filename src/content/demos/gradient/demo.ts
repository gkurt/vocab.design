import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three stops, stated once. The term is the fill between them, so the values are literal. */
const STOPS = ['#2f6df0', '#b154c8', '#f2913d'];

const GEOMETRIES: Record<string, string> = {
  linear: `linear-gradient(100deg, ${STOPS[0]}, ${STOPS[1]} 52%, ${STOPS[2]})`,
  radial: `radial-gradient(circle at 32% 30%, ${STOPS[0]}, ${STOPS[1]} 46%, ${STOPS[2]})`,
  conic: `conic-gradient(from 200deg at 50% 50%, ${STOPS[0]}, ${STOPS[1]}, ${STOPS[2]}, ${STOPS[0]})`,
};

/**
 * Gradient specimen: one set of colour stops, three geometries. Switching the
 * geometry keeps the stops exactly where they are, which is what separates the two
 * halves of the definition.
 */
export function mount(root: HTMLElement): void {
  const chips = STOPS.map(
    (stop, index) => `
      <span class="sp-chip">
        <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: ${stop}"></span>${index === 1 ? '52%' : `${index * 50}%`} ${stop}
      </span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Fill</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Type" data-part="segmented" data-value="linear">
            <button class="sp-segment" data-part="seg-linear" value="linear">Linear</button>
            <button class="sp-segment" data-part="seg-radial" value="radial">Radial</button>
            <button class="sp-segment" data-part="seg-conic" value="conic">Conic</button>
          </sp-segmented>
        </div>
        <div data-part="canvas" data-subject data-type="linear"
             style="height: 132px; margin-top: 14px; border-radius: var(--sp-radius); background: ${GEOMETRIES.linear}"></div>
        <div class="sp-row sp-row--wrap sp-context" data-part="stops" style="margin-top: 12px">${chips}</div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');

  part(root, 'segmented').addEventListener('change', (event) => {
    const type = (event as CustomEvent<string>).detail;
    const fill = GEOMETRIES[type];
    if (!fill) return;
    canvas.dataset.type = type;
    canvas.style.background = fill;
  });
}
