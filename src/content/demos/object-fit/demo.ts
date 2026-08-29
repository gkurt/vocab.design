import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The media's own size and the slot's: deliberately different shapes, which is the whole term. */
const MEDIA_W = 160;
const MEDIA_H = 90;
const BOX_W = 214;
const BOX_H = 156;

/** A stand-in photograph, drawn rather than fetched (the kit budget allows no requests, SPEC §5).
    The sun is a circle on purpose: it is the part of the picture that says out loud when the
    fit has distorted rather than cropped. */
const MEDIA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${MEDIA_W}" height="${MEDIA_H}">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4d7fc4"/><stop offset="1" stop-color="#cfe2f6"/>
  </linearGradient></defs>
  <rect width="${MEDIA_W}" height="${MEDIA_H}" fill="url(#sky)"/>
  <circle cx="36" cy="27" r="13" fill="#f3ce6b"/>
  <path d="M0 68 L42 40 L80 68 Z" fill="#527f60"/>
  <path d="M54 68 L104 32 L156 68 Z" fill="#38604b"/>
  <rect y="68" width="${MEDIA_W}" height="${MEDIA_H - 68}" fill="#2c4a3d"/>
</svg>`;

const FITS: Record<string, string> = {
  fill: `fill: scaled to ${BOX_W} by ${BOX_H} on both axes, so the sun is no longer round.`,
  contain: `contain: the whole picture kept, empty bands above and below it.`,
  cover: `cover: scaled until every edge is covered, the left and right of the picture cropped away.`,
  none: `none: drawn at its natural ${MEDIA_W} by ${MEDIA_H}, the box clipping or padding whatever is left.`,
};

/**
 * Object fit specimen: one real replaced element in one fixed slot, under each of the four
 * fits. The media is a 16:9 drawing and the slot is not, so contain letterboxes, cover crops,
 * fill distorts the sun into an ellipse, and none leaves it at its natural size.
 *
 * The subject is the media box: the element whose `object-fit` is being set. Its own box never
 * changes size, only what the picture does inside it, so the ring identify draws lands on the
 * same rectangle in every state. The switcher and the caption are scene (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const media = `data:image/svg+xml;utf8,${encodeURIComponent(MEDIA_SVG)}`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fit</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="cover" data-axis="object-fit">
            <button class="sp-segment" type="button" data-part="seg-fill" value="fill">fill</button>
            <button class="sp-segment" type="button" data-part="seg-contain" value="contain">contain</button>
            <button class="sp-segment" type="button" data-part="seg-cover" value="cover">cover</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">none</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 12px">
          <img
            data-part="box"
            data-subject
            data-fit="cover"
            src="${media}"
            alt="Landscape photograph stand-in"
            style="width: ${BOX_W}px; height: ${BOX_H}px; object-fit: cover; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          />
          <span class="sp-text sp-context" data-part="readout" style="height: 34px; max-width: 400px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const box = part(root, 'box');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = FITS[key];
    if (!note) return;
    box.dataset.fit = key;
    box.style.objectFit = key;
    readout.textContent = note;
  };

  // Each segment names a fit, so the switch lands on that fit rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('cover');
}
