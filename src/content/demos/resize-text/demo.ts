import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SCALES = {
  '100': {
    size: '11px',
    caption: 'The reader’s text size at 100 percent. Both cards hold the same words in the same boxes.',
  },
  '200': {
    size: '22px',
    caption:
      'Only the type grew, not the boxes. The tolerant card takes the room it needs; the pixel-locked one cuts its own button off. The mistake.',
  },
} as const;

type Scale = keyof typeof SCALES;

/** Everything inside a card is sized against the card's own font size, so one number moves it all. */
const CARD_BODY = `
  <span style="display: block; font-weight: 600; font-size: 1.05em">Ferry times</span>
  <p style="margin: 0.45em 0 0; font-size: 0.92em; line-height: 1.4; color: var(--sp-muted)">Every 40 minutes.</p>`;

/**
 * Resize text specimen: one small card, drawn twice, with the reader's text size taken from
 * 100 percent to 200. Only the type scales, which is what text-only zoom does: the two cards
 * keep the width they had. The left card was built with no height of its own and its label
 * padded rather than line-heighted, so it grows and stays whole. The right one holds a pixel
 * height and a pixel line height, so at 200 percent its button loses its own words.
 *
 * The subject is the tolerant card, the region whose text is being resized. The failing twin
 * beside it is the counter-example, and the size control and caption are scenery (SPEC §5).
 *
 * Each card used to carry a label over it naming how it was built ("Sized in rem, no fixed
 * height", "Pixel height, pixel line height"). No reader of a real card is told its CSS, so
 * both went; the verdict in the strip names which card did what at each size, which is where
 * the author's reading of the two belongs (SPEC §5.1).
 *
 * The row holding both cards keeps a fixed height from mount, sized for the enlarged state,
 * so the subject grows into room that was already reserved (SPEC §5). Each segment reaches
 * its own size rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row sp-row--between sp-context" style="width: 456px; justify-content: flex-end">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Text size" data-part="segmented" data-value="100">
          <button class="sp-segment" data-part="seg-100" value="100">100%</button>
          <button class="sp-segment" data-part="seg-200" value="200">200%</button>
        </sp-segmented>
      </div>

      <div class="sp-row" style="width: 456px; height: 208px; gap: 16px; align-items: flex-start">
        <div style="width: 220px">
          <div class="sp-surface" data-part="card" data-subject data-scale="100"
               style="padding: 0.75em 0.85em; font-size: 11px">
            ${CARD_BODY}
            <button class="sp-button" type="button" data-part="cta"
                    style="margin-top: 0.7em; padding: 0.45em 0.9em; font-size: 0.92em; white-space: normal">Book a seat</button>
          </div>
        </div>

        <div style="width: 220px">
          <div class="sp-surface sp-context" data-part="twin"
               style="height: 92px; padding: 0.75em 0.85em; font-size: 11px; overflow: hidden">
            ${CARD_BODY}
            <button class="sp-button" type="button" data-part="twin-cta"
                    style="margin-top: 0.7em; padding: 0 14px; height: 26px; line-height: 26px; font-size: 0.92em; white-space: nowrap">Book a seat</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="100"
         style="width: 456px; margin: 0; height: 34px; font-size: 11px">${SCALES['100'].caption}</p>
    </div>
  `;

  const card = part(root, 'card');
  const twin = part(root, 'twin');
  const caption = part(root, 'caption');

  const apply = (scale: Scale) => {
    const spec = SCALES[scale];
    card.dataset.scale = scale;
    // Text-only zoom, not page zoom: the font size moves and the widths do not.
    card.style.fontSize = spec.size;
    twin.style.fontSize = spec.size;
    // The twin's height and line height were written in pixels, so they do not hear the
    // reader at all. It is stated rather than measured: that box was sized for 12px text.
    flag(twin, 'data-clipped', scale === '200');
    caption.dataset.case = scale;
    caption.textContent = spec.caption;
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === '200' ? '200' : '100');
  });
}
