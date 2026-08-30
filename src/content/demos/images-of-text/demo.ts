import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The banner keeps one palette in both themes, because a picture of text cannot follow one. */
const BANNER_BG = '#2f3d8f';
const BANNER_INK = '#ffffff';
const BANNER_SUB = 'rgb(255 255 255 / 0.74)';

const W = 200;
/** Cut for the two lines the banner carries, headline and date, at their own line heights. */
const H = 56;
const ZOOM = 1.4;
/** The slot is cut for the zoomed banner, so zooming never moves the row below it (SPEC §5). */
const SLOT = `width: ${Math.ceil(W * ZOOM) + 4}px; height: ${Math.ceil(H * ZOOM) + 2}px`;

const CAPTION = {
  '100': 'At native size the two are indistinguishable, which is why this ships so often.',
  '140': 'Zoomed, the live text is laid out again at the new size. The picture only gets bigger pixels.',
} as const;

type Level = keyof typeof CAPTION;

const FACT = 'flex: 1 1 auto; min-width: 0; font-size: 11px';

/**
 * Images of text specimen: one promo banner set as live text, and the same banner flattened
 * into a raster of exactly the pixels it needs at native size. Zooming is done with the CSS
 * `zoom` property, which is what a browser's own zoom does: the text is laid out again and
 * the canvas is resampled, so the difference the term is about draws itself.
 *
 * The subject is the live-text banner. The term is a WCAG criterion whose requirement is
 * "use text", so identify points at the banner that is text, the way the use-of-color
 * specimen rings the redundantly coded example rather than the failure. The raster beside
 * it, the zoom control, the two labels and the caption are scenery (SPEC §5).
 *
 * Each row once carried a sentence under its label, "Selects. Translates. Restyles." beside
 * the live banner and "200 by 56 pixels. Alt text at best." beside the raster. Both were the
 * site reading the comparison out for you, and the article makes the same points at length,
 * so only the two legend labels remain.
 *
 * The raster is a real one: the canvas is painted once at mount at its own pixel grid, and
 * nothing repaints it afterwards, so scaling it has nothing to work with but those pixels.
 * Both banners sit in slots cut for the zoomed size, so changing zoom moves nothing outside
 * them, and each segment reaches its own level rather than flipping the other's (SPEC §8).
 * The banner's own height is the room its two lines and its padding actually need, so the
 * live text is never cut by the box that is supposed to be showing it off.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 14px 16px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Page zoom" data-part="segmented" data-value="100">
            <button class="sp-segment" data-part="seg-100" value="100">100%</button>
            <button class="sp-segment" data-part="seg-140" value="140">140%</button>
          </sp-segmented>
        </div>

        <div data-part="scene" data-zoom="100" style="margin-top: 12px">
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            <div style="${SLOT}">
              <div data-part="banner-text" data-subject
                   style="width: ${W}px; height: ${H}px; padding: 8px 12px; border-radius: 6px; overflow: hidden;
                          background: ${BANNER_BG}; color: ${BANNER_INK};
                          font-family: ui-sans-serif, system-ui, sans-serif">
                <div style="font-size: 15px; font-weight: 600; line-height: 1.2">Summer reading</div>
                <div style="margin-top: 2px; font-size: 11px; color: ${BANNER_SUB}">Ends 31 August</div>
              </div>
            </div>
            <div class="sp-context" style="${FACT}">
              <span class="sp-label">Live text</span>
            </div>
          </div>

          <div class="sp-row" style="margin-top: 10px; gap: 12px; align-items: flex-start">
            <div style="${SLOT}">
              <canvas data-part="banner-image" width="${W}" height="${H}"
                      style="width: ${W}px; height: ${H}px; border-radius: 6px; image-rendering: pixelated"></canvas>
            </div>
            <div class="sp-context" style="${FACT}">
              <span class="sp-label">Image of text</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="100"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${CAPTION['100']}</p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const text = part(root, 'banner-text');
  const image = part(root, 'banner-image') as HTMLCanvasElement;
  const caption = part(root, 'caption');

  // Painted once, at the size the asset was cut for. Every later pixel is invented by the
  // browser's resampler, which is the whole of the term.
  const ctx = image.getContext('2d');
  if (ctx) {
    ctx.fillStyle = BANNER_BG;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = BANNER_INK;
    ctx.font = '600 15px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('Summer reading', 12, 24);
    ctx.fillStyle = BANNER_SUB;
    ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('Ends 31 August', 12, 38);
  }

  const apply = (level: Level) => {
    scene.dataset.zoom = level;
    const factor = level === '140' ? String(ZOOM) : '1';
    // `zoom` is the browser's own: layout runs again for the text and the bitmap is scaled.
    text.style.setProperty('zoom', factor);
    image.style.setProperty('zoom', factor);
    caption.dataset.case = level;
    caption.textContent = CAPTION[level];
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === '140' ? '140' : '100');
  });
}
