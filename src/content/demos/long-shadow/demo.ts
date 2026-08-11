import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The tile's own paint. Flat, stated locally, and the same in both themes: the era is the term. */
const TILE = '#f2564b';
/** Where the trail starts, which is the tile darkened rather than black (SPEC §5: the look is the demo's claim). */
const TAIL = '#7f1d18';
const LENGTH = 74;
const STEP_PX = 1.6;

const hex = (value: string) => [1, 3, 5].map((at) => Number.parseInt(value.slice(at, at + 2), 16));

/** One opaque step along the trail: the tail colour on its way home to the tile colour. */
const between = (from: number[], to: number[], t: number) =>
  `rgb(${from.map((channel, index) => Math.round(channel + ((to[index] ?? channel) - channel) * t)).join(' ')})`;

/**
 * The trail as a stack of glyph copies, each one pixel-step further down and to the
 * right and one step closer to the tile it lands on. Copies rather than a blur, and a
 * single 45 degree direction, because both are the style's own rules.
 */
function trail(): string {
  const from = hex(TAIL);
  const to = hex(TILE);
  return Array.from({ length: LENGTH }, (_, index) => {
    const distance = ((index + 1) * STEP_PX).toFixed(1);
    // Eased, so the shadow stays dark through the run and gives its length away late.
    const fade = ((index + 1) / LENGTH) ** 1.7;
    return `${distance}px ${distance}px 0 ${between(from, to, fade)}`;
  }).join(', ');
}

/**
 * Long shadow specimen: one flat app tile whose monogram throws a hard 45 degree trail,
 * clipped by the tile that catches it. The subject is the tile, since the shadow only
 * means anything against the surface it is cast on.
 *
 * The two presets are absolute rather than a toggle: "no shadow" is the flat base the
 * era started from, so switching to it shows what the decoration was added to, and a
 * pass resumed anywhere still states which of the two it wants (SPEC §8). Nothing here
 * animates and nothing moves, since a shadow is painted outside its element's box.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="gap: 10px; align-items: center">
        <div
          data-part="tile"
          data-subject
          data-shadow="long"
          style="display: flex; align-items: center; justify-content: center; width: 136px; height: 136px; border-radius: 26px; background: ${TILE}; overflow: hidden"
        >
          <span data-part="glyph" style="font-size: 64px; font-weight: 700; line-height: 1; color: #ffffff">N</span>
        </div>
        <span class="sp-label">Notes</span>
      </div>

      <sp-segmented class="sp-segmented sp-context" data-part="segmented" data-value="long">
        <button class="sp-segment" data-part="seg-long" value="long">Long shadow</button>
        <button class="sp-segment" data-part="seg-none" value="none">No shadow</button>
      </sp-segmented>
    </div>
  `;

  const tile = part(root, 'tile');
  const glyph = part(root, 'glyph');
  const shadow = trail();

  const cast = (value: string) => {
    tile.dataset.shadow = value;
    glyph.style.textShadow = value === 'long' ? shadow : 'none';
  };
  cast('long');

  part(root, 'segmented').addEventListener('change', (event) => cast((event as CustomEvent<string>).detail));
}
