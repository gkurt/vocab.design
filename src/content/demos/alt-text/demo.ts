import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const ALT = 'Steam rising from a group head as a shot pulls';

/** The picture, inline: specimens make no network requests (SPEC §5). */
const PHOTO = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="130" viewBox="0 0 340 130">
     <rect width="340" height="130" fill="#3f4a63"/>
     <circle cx="96" cy="70" r="42" fill="#7c89ab"/>
     <rect x="152" y="40" width="150" height="12" rx="6" fill="#9aa6c4"/>
     <rect x="152" y="66" width="110" height="12" rx="6" fill="#6f7c9d"/>
     <rect x="0" y="104" width="340" height="26" fill="#2c344a"/>
   </svg>`,
)}`;

/** A source that cannot decode, so the browser falls back for real rather than on cue. */
const BROKEN = 'data:image/png;base64,AAAAAAAAAAAA';

/**
 * Alt text specimen: an article figure whose image is asked for from a source that
 * decodes and from one that does not. When the picture fails, what the box shows is
 * the alternative, in the room the picture had, which is the whole argument for
 * writing one that reads as a replacement.
 *
 * The subject is the image, since the alt is an attribute of it and there is no
 * narrower element to point at. The segmented control and the attribute readout are
 * instrumentation and stay scenery (SPEC §5); the box is a fixed size in both states,
 * so failing to load moves nothing in the article.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">How a shot pulls</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="loaded" data-axis="Image">
            <button class="sp-segment" data-part="seg-loaded" value="loaded">Loads</button>
            <button class="sp-segment" data-part="seg-failed" value="failed">Fails</button>
          </sp-segmented>
        </div>
        <figure style="margin: 12px 0 0">
          <img
            data-part="photo"
            data-state="loaded"
            data-subject
            src="${PHOTO}"
            alt="${ALT}"
            style="display: block; width: 100%; height: 130px; object-fit: cover; border-radius: 6px; background: var(--sp-sunken); font-size: 12px"
          />
          <figcaption class="sp-text sp-context" style="margin-top: 6px; font-size: 12px">
            Espresso machine, group head, mid extraction
          </figcaption>
        </figure>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 10px">
          <div class="sp-line" style="width: 100%"></div>
          <div class="sp-line" style="width: 72%"></div>
          <span class="sp-label" data-part="attribute" style="margin-top: 4px">alt="${ALT}"</span>
        </div>
      </div>
    </div>
  `;

  const photo = part(root, 'photo') as HTMLImageElement;

  part(root, 'segmented').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail;
    photo.dataset.state = mode;
    photo.src = mode === 'failed' ? BROKEN : PHOTO;
  });
}
