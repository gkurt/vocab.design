import { displayScale, localBox, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The pair, and the size it is examined at: big enough for one kern to be a visible slab. */
const PAIR = 'To';
const SIZE = 64;
/** A face with no kern for this pair leaves nothing to draw, so the band keeps a box. */
const FLOOR = 3;

/**
 * Kerning specimen: one pair, twice, with the font's own kern table switched off
 * above and on below. Both lines start at the same left edge, so the kerned pair
 * is visibly the shorter of the two, and the space the kern takes out is drawn as
 * a band of exactly that width between the two letters.
 *
 * The subject is that band. Kerning is an adjustment to one pair, a quantity with
 * no element of its own, so the specimen gives it one (SPEC §5): a slab sitting at
 * the junction of the T and the o, as wide as the correction the face applies
 * there. Ringing either line instead would claim the term is a pair of letters
 * rather than the space between them.
 *
 * The width is measured, never asserted: two probe spans of the same text in the
 * same face, one `font-kerning: none` and one `normal`, differ by exactly the
 * table's value for this pair. The measurement is taken again on the demo's clock
 * once, because the kit's webfont may still be arriving at mount and the kern
 * belongs to the face, not to the fallback (SPEC §5).
 *
 * The window used to open on a header reading "One pair, one correction" beside "the face's
 * own kern table". Neither is anything a specimen sheet would print, and the article says
 * both, so the row went; the two settings and the measurement under them are the whole scene.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const line = (name: string, mode: string) => `
    <div class="sp-row" style="gap: 14px; height: ${SIZE + 8}px; align-items: center">
      <span class="sp-label sp-context" style="width: 132px; flex: 0 0 auto">font-kerning: ${mode}</span>
      <div style="position: relative; flex: 0 0 auto">
        <span data-part="${name}" style="display: inline-block; font-size: ${SIZE}px; line-height: 1; font-weight: 500;
              white-space: nowrap; font-kerning: ${mode}">${PAIR}</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div>
          ${line('pair-none', 'none')}
          ${line('pair-normal', 'normal')}
        </div>
        <div data-part="gap-layer" style="position: relative; height: 0"></div>
        <div class="sp-row sp-row--between sp-context" style="height: 18px; margin-top: 6px">
          <span class="sp-label" style="color: var(--sp-ink)">T + o</span>
          <span class="sp-label" data-part="measured" style="font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px; height: 40px">
          The band is the correction, drawn to scale: what this face takes out from between a T and a
          round o, and from no other pair on the line.
        </p>
      </div>
    </div>
  `;

  const none = part(root, 'pair-none');
  const normal = part(root, 'pair-normal');
  const layer = part(root, 'gap-layer');

  /**
   * The x of the boundary between the two letters, relative to the layer, in the
   * specimen's own pixels: the band drawn from it is a length, and a listing preview
   * shows this specimen at half size (`#src/kit/measure.ts`).
   */
  const junction = (pair: HTMLElement): number => {
    const node = pair.firstChild;
    if (!(node instanceof Text)) return localBox(pair, layer).left;
    const scale = displayScale(layer);
    const origin = layer.getBoundingClientRect();
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 1);
    return (range.getBoundingClientRect().right - origin.left) / scale;
  };

  const band = document.createElement('span');
  band.dataset.part = 'kern-band';
  band.setAttribute('data-subject', '');
  band.style.cssText = 'position: absolute; border-radius: 2px; background: var(--sp-accent)';
  layer.append(band);

  const draw = () => {
    const kern = localSize(none).width - localSize(normal).width;
    const width = Math.max(kern, FLOOR);
    const top = localBox(none, layer).top;
    band.style.left = `${junction(none) - width}px`;
    band.style.top = `${top + SIZE * 0.14}px`;
    band.style.width = `${width}px`;
    band.style.height = `${SIZE * 0.72}px`;
    part(root, 'measured').textContent =
      kern >= 0.5
        ? `kerned by ${kern.toFixed(1)}px at ${SIZE}px, or ${(kern / SIZE).toFixed(3)}em`
        : 'this face carries no kern for the pair';
  };

  draw();
  // The kit's webfont may still be arriving, and the kern belongs to the face.
  clock.setTimeout(draw, 400);
}
