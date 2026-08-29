import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The gradient both panels carry: a slow ramp through dark blue, where banding is
 *  easiest to see and the grain has the most to do. */
const WASH = 'linear-gradient(168deg, #3a3f8f, #232a63 46%, #10142e)';

/** One turbulence field, inlined. `encodeURIComponent` leaves single quotes alone, so
 *  the data URI can be quoted inside a style attribute that is already double quoted. */
function noise(frequency: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="4" stitchTiles="stitch"/></filter><rect width="120" height="120" filter="url(#n)"/></svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
}

const GRAINS = {
  none: { image: 'none', opacity: '0' },
  fine: { image: noise(0.9), opacity: '0.34' },
  coarse: { image: noise(0.42), opacity: '0.5' },
};

type GrainName = keyof typeof GRAINS;

/**
 * Grainy gradient specimen: the grained panel is the subject and its clean twin beside
 * it is the scenery that gives the grain something to be measured against. The noise is
 * an `feTurbulence` field inlined as a data URI, laid over the wash as its own layer at
 * low opacity with a blend mode, exactly as it ships.
 *
 * The picker chooses a grain rather than toggling one (SPEC §8), and the layer it
 * changes is absolutely positioned inside a panel of fixed size, so nothing moves.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 14px">
      <div class="sp-row" style="gap: 14px; align-items: flex-start">
        <div class="sp-stack" style="gap: 6px">
          <div data-part="panel" data-subject data-grain="fine"
               style="position: relative; width: 148px; height: 156px; border-radius: var(--sp-radius); background-image: ${WASH}; overflow: hidden">
            <span data-part="grain" aria-hidden="true"
                  style="position: absolute; inset: 0; pointer-events: none; background-image: ${GRAINS.fine.image}; opacity: ${GRAINS.fine.opacity}; mix-blend-mode: overlay"></span>
          </div>
          <span class="sp-label" style="text-align: center">With grain</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 6px">
          <div data-part="clean"
               style="width: 148px; height: 156px; border-radius: var(--sp-radius); background-image: ${WASH}"></div>
          <span class="sp-label" style="text-align: center">Clean, banding and all</span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented class="sp-segmented" data-axis="Grain" data-part="amount" data-value="fine">
          <button class="sp-segment" data-part="grain-none" value="none">None</button>
          <button class="sp-segment" data-part="grain-fine" value="fine">Fine</button>
          <button class="sp-segment" data-part="grain-coarse" value="coarse">Coarse</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const grain = part(root, 'grain');

  part(root, 'amount').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const name = (value in GRAINS ? value : 'fine') as GrainName;
    const next = GRAINS[name];
    panel.dataset.grain = name;
    grain.style.backgroundImage = next.image;
    grain.style.opacity = next.opacity;
  });
}
