import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 190;
const H = 78;

/** The picture, inline and at exactly the size it is declared at: specimens make no
    network requests (SPEC §5), and an intrinsic size that disagreed with the declared
    one would be demonstrating a different bug. */
const PHOTO = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
     <rect width="${W}" height="${H}" fill="#2F3A57"/>
     <circle cx="46" cy="40" r="24" fill="#7C89AB"/>
     <rect x="82" y="26" width="86" height="9" rx="4" fill="#9AA6C4"/>
     <rect x="82" y="43" width="60" height="9" rx="4" fill="#6F7C9D"/>
   </svg>`,
)}`;

/** A source that cannot decode, so the fallback is the browser's own rather than a picture of one. */
const BLOCKED = 'data:image/png;base64,AAAAAAAAAAAA';

const ALT = 'Spring sale: 20% off';

const NOTES: Record<string, string> = {
  blocked: 'One fallback kept the box and the weight the picture had. The other collapsed to a line of body copy.',
  loaded: 'With the pictures in place the two blocks are indistinguishable, which is the whole trap.',
};

/**
 * Styled alt text specimen: the same promotion block twice, once with the alt attribute
 * styled and its box declared and once with neither, under a client that blocks images
 * or fetches them. Image blocking is a client setting no pointer could perform, so a
 * labelled control is the honest way to reach it (SPEC §8); what it switches is a real
 * source that cannot decode, so the fallback on screen is the browser's own.
 *
 * The subject is the styled fallback, the `img` whose attribute is doing the work.
 * It only IS the term while the picture is missing, so it declares that condition in
 * `data-pose` and the demo mounts blocked, which is the state the technique exists for
 * (SPEC §6). The unstyled block beside it is the counter-example and stays scenery.
 *
 * Each block sits in a fixed slot, so the unstyled one collapsing cannot move the mail
 * around it (SPEC §5); the collapse is contained rather than smoothed over, because
 * losing the reserved box is exactly what the term is about.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="blocked" data-axis="Images" data-term="blocked">
            <button class="sp-segment" data-part="seg-blocked" value="blocked">Blocked</button>
            <button class="sp-segment" data-part="seg-loaded" value="loaded">Fetched</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 ${W}px; gap: 5px">
            <div data-part="styled-slot" style="width: ${W}px; height: ${H}px">
              <img
                data-part="styled"
                data-subject
                data-pose="[data-state=blocked]"
                data-state="blocked"
                src="${BLOCKED}"
                alt="${ALT}"
                width="${W}"
                height="${H}"
                style="display: block; width: ${W}px; height: ${H}px; overflow: hidden; object-fit: cover;
                       border-radius: 6px; background: #DDE4F6; color: #23408F;
                       font-size: 15px; font-weight: 700; line-height: ${H}px; text-align: center"
              />
            </div>
            <span class="sp-label" style="font-size: 10.5px; line-height: 1.35">Alt styled, width and height declared.</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 ${W}px; gap: 5px">
            <div data-part="plain-slot" style="width: ${W}px; height: ${H}px">
              <img data-part="plain" data-state="blocked" src="${BLOCKED}" alt="${ALT}" />
            </div>
            <span class="sp-label" style="font-size: 10.5px; line-height: 1.35">Alt as exported, no styling and no size.</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; height: 32px; font-size: 12px; line-height: 1.35">${NOTES.blocked}</p>
      </div>
    </div>
  `;

  const styled = part(root, 'styled') as HTMLImageElement;
  const plain = part(root, 'plain') as HTMLImageElement;
  const note = part(root, 'note');

  const apply = (mode: string) => {
    const blocked = mode !== 'loaded';
    const state = blocked ? 'blocked' : 'loaded';
    for (const image of [styled, plain]) {
      image.dataset.state = state;
      image.src = blocked ? BLOCKED : PHOTO;
    }
    note.textContent = NOTES[state] ?? '';
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
