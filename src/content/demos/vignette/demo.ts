import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Vignette specimen: one bright poster, drawn in CSS and SVG, with the layer over it switched
 * between absent, a vignette, and a scrim. The picker is the article's argument made visible.
 * A vignette is compositional and radially symmetric: it spends the same ink on every edge, so
 * nothing on the frame is protected and the eye falls to the middle. A scrim is functional and
 * one sided: the same ink goes where the title has to read, and the corners keep their light.
 * Switching between them is the only honest way to show which of the two a picture is wearing.
 *
 * The picture is deliberately high key, with its shapes pushed outward and one red parasol at
 * the centre, because a falloff is only legible against edges that started bright.
 *
 * The paint is inline because the gradients are the term. The kit has no gradients, and a
 * falloff assembled from kit classes would be demonstrating the kit.
 *
 * The subject is the vignette layer, not the picture and not the scene (SPEC §5): the term names
 * the darkening laid over an image, so the beach under it and the title over it are both scenery.
 * Because one element carries the layer in every state, it takes `data-pose="[data-mode=vignette]"`
 * and mounts in that state: identify refuses to ring it while the picture is bare or wearing a
 * scrim, since a ring around either would label the opposite of the word (SPEC §6).
 */
const W = 404;
const H = 190;

/** Sea over sand, on the panel rather than in the drawing, so the SVG carries only shapes. */
const GROUND = 'linear-gradient(180deg, #8ed7d2 0%, #7cccc8 34%, #f4e3bf 34%, #ebd4a5 100%)';

/** Radially symmetric falloff: every edge pays the same amount and the centre pays nothing. */
const VIGNETTE = 'radial-gradient(110% 94% at 50% 46%, transparent 36%, rgb(10 14 26 / 0.2) 62%, rgb(10 14 26 / 0.62) 100%)';

/** One sided falloff: the ink is spent from the bottom edge up, where the title sits. */
const SCRIM = 'linear-gradient(to top, rgb(10 14 26 / 0.86), rgb(10 14 26 / 0.44) 30%, rgb(10 14 26 / 0) 64%)';

const MODES: Record<string, { vignette: string; scrim: string; note: string }> = {
  none: {
    vignette: '0',
    scrim: '0',
    note: 'No layer: the corners hold as much light as the middle, and the white title has pale sand to sit on.',
  },
  vignette: {
    vignette: '1',
    scrim: '0',
    note: 'Every edge is dimmed by the same amount, so nothing in particular is protected and the eye falls inward.',
  },
  scrim: {
    vignette: '0',
    scrim: '1',
    note: 'The same ink spent from the bottom edge up: the title clears its contrast, the corners keep their light.',
  },
};

const START = 'vignette';

/** A parasol seen from above, quartered light and red, dead centre for the falloff to point at. */
const PARASOL = `
  <ellipse cx="204" cy="121" rx="34" ry="8" fill="rgb(96 74 40 / 0.16)"/>
  <rect x="201" y="100" width="3" height="21" fill="#b98a5a"/>
  <circle cx="202" cy="100" r="28" fill="#f7f4ec"/>
  <path d="M202 100 L230 100 A28 28 0 0 1 221.8 119.8 Z" fill="#e2604f"/>
  <path d="M202 100 L202 128 A28 28 0 0 1 182.2 119.8 Z" fill="#e2604f"/>
  <path d="M202 100 L174 100 A28 28 0 0 1 182.2 80.2 Z" fill="#e2604f"/>
  <path d="M202 100 L202 72 A28 28 0 0 1 221.8 80.2 Z" fill="#e2604f"/>`;

/** The rest of the beach, kept pale and pushed outward so every edge starts bright. */
const SCENE = `
  <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation" style="display: block">
    <rect x="0" y="20" width="128" height="3" fill="rgb(255 255 255 / 0.6)"/>
    <rect x="236" y="42" width="152" height="3" fill="rgb(255 255 255 / 0.52)"/>
    <rect x="0" y="61" width="${W}" height="4" fill="#dcf3f0"/>
    <circle cx="72" cy="38" r="4" fill="#2c6f74"/>
    <circle cx="330" cy="26" r="4" fill="#2c6f74"/>
    <rect x="22" y="80" width="58" height="16" rx="4" fill="#f9f6ee" transform="rotate(-7 51 88)"/>
    <rect x="312" y="74" width="62" height="16" rx="4" fill="#ffe0b0" transform="rotate(6 343 82)"/>
    <rect x="44" y="148" width="50" height="15" rx="4" fill="#ffdcd3" transform="rotate(4 69 155)"/>
    <rect x="306" y="156" width="56" height="15" rx="4" fill="#f9f6ee" transform="rotate(-5 334 163)"/>
    ${PARASOL}
  </svg>`;

export function mount(root: HTMLElement): void {
  const state = MODES[START];

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="hero" data-mode="${START}"
           style="position: relative; width: ${W}px; height: ${H}px; border-radius: var(--sp-radius); overflow: hidden; background-image: ${GROUND}">
        ${SCENE}

        <span data-part="vignette" data-subject data-mode="${START}" data-pose="[data-mode=vignette]" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${VIGNETTE};
                     opacity: ${state?.vignette}; transition: opacity 0.22s linear"></span>
        <span data-part="scrim" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; background-image: ${SCRIM};
                     opacity: ${state?.scrim}; transition: opacity 0.22s linear"></span>

        <div data-part="title" style="position: absolute; left: 16px; right: 16px; bottom: 12px; color: #ffffff">
          <span style="display: block; font-size: 18px; font-weight: 600; line-height: 1.25">Cala Rossa, six o'clock</span>
          <span style="display: block; margin-top: 2px; font-size: 12px; line-height: 1.4; opacity: 0.94">
            Twelve umbrellas, one still up.
          </span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <span class="sp-label">Layer</span>
        <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-none" value="none">None</button>
          <button class="sp-segment" type="button" data-part="seg-vignette" value="vignette">Vignette</button>
          <button class="sp-segment" type="button" data-part="seg-scrim" value="scrim">Scrim</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-part="note"
         style="width: ${W}px; margin: 0; min-height: 40px; text-align: center">${state?.note}</p>
    </div>
  `;

  const hero = part(root, 'hero');
  const vignette = part(root, 'vignette');
  const scrim = part(root, 'scrim');
  const note = part(root, 'note');

  // Each segment names a state rather than flipping one, so a fast-forwarded or resumed pass
  // lands on the same picture it would have reached at full speed (SPEC §8).
  const lay = (kind: string) => {
    const next = MODES[kind];
    if (!next) return;
    hero.dataset.mode = kind;
    vignette.dataset.mode = kind;
    vignette.style.opacity = next.vignette;
    scrim.style.opacity = next.scrim;
    note.textContent = next.note;
  };

  part(root, 'segmented').addEventListener('change', (event) => lay((event as CustomEvent<string>).detail));
}
