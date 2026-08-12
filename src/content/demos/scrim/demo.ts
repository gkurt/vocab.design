import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The three states the layer can be in. `none` is drawn as a zero opacity layer rather than
 * as no layer at all, so the element the term names stays in the tree while the reader sees
 * what the picture looks like without it.
 */
const SCRIMS: Record<string, { paint: string; opacity: string; note: string }> = {
  none: {
    paint: 'transparent',
    opacity: '0',
    note: 'No layer: the caption is white on a pale part of the picture, which is unreadable and unmeasurable.',
  },
  solid: {
    paint: 'rgb(10 14 26 / 0.48)',
    opacity: '1',
    note: 'A flat wash reaches the caption, and it spends the same dimming on the parts of the picture nobody needed darkened.',
  },
  gradient: {
    paint: 'linear-gradient(to top, rgb(8 11 22 / 0.9), rgb(8 11 22 / 0.45) 36%, rgb(8 11 22 / 0) 72%)',
    opacity: '1',
    note: 'Stops put the dimming where the text is and let it run out before the top, so the caption reads and the picture survives.',
  },
};

const START = 'gradient';

/** A pale bloom sits behind the caption, so bare white text has nothing to read against. */
const BLOBS = [
  { colour: '#FFE9A8', size: '190px', left: '-30px', top: '76px' },
  { colour: '#F7A45C', size: '150px', left: '128px', top: '-40px' },
  { colour: '#5B3E86', size: '170px', left: '236px', top: '84px' },
];

/**
 * Scrim specimen: a caption over a busy picture, with the layer between them switched
 * between absent, a flat wash, and a gradient that spends its dimming only where the words
 * are.
 *
 * The subject is the layer itself. Nothing narrower is the term: a scrim is one element
 * whose whole job is to take light away from what is behind it, so the picture under it and
 * the caption over it are both scenery, and neither of them is what the word names. The
 * layer is absolutely positioned over a fixed size picture and the note keeps its height, so
 * changing state repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const blobs = BLOBS.map(
    ({ colour, size, left, top }) => `
      <span class="sp-aurora-blob" style="--sp-blob: ${colour}; --sp-blob-size: ${size}; left: ${left}; top: ${top}"></span>`,
  ).join('');

  const state = SCRIMS[START];

  root.innerHTML = `
    <div class="sp-app">
      <div data-part="hero" style="position: relative; width: 340px; height: 178px; border-radius: var(--sp-radius); overflow: hidden">
        <div class="sp-aurora" style="--sp-aurora-wash: linear-gradient(120deg, #F3CE86, #E08A57 46%, #6D4B8F)">${blobs}</div>

        <div data-part="scrim" data-subject data-scrim="${START}"
             style="position: absolute; inset: 0; background: ${state?.paint}; opacity: ${state?.opacity}"></div>

        <div data-part="caption" style="position: absolute; left: 14px; right: 14px; bottom: 12px; color: #FFFFFF">
          <span style="display: block; font-size: 17px; font-weight: 600; line-height: 1.25">Night market, Kowloon</span>
          <span style="display: block; margin-top: 3px; font-size: 12px; line-height: 1.4; opacity: 0.92">
            Twelve stalls, open until two.
          </span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <span class="sp-label">Layer</span>
        <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
          <button class="sp-segment" data-part="seg-none" value="none">None</button>
          <button class="sp-segment" data-part="seg-solid" value="solid">Solid</button>
          <button class="sp-segment" data-part="seg-gradient" value="gradient">Gradient</button>
        </sp-segmented>
      </div>

      <p class="sp-text sp-context" data-part="note" style="width: 340px; margin: 0; min-height: 60px">${state?.note}</p>
    </div>
  `;

  const scrim = part(root, 'scrim');
  const note = part(root, 'note');

  const lay = (kind: string) => {
    const next = SCRIMS[kind];
    if (!next) return;
    scrim.dataset.scrim = kind;
    scrim.style.background = next.paint;
    scrim.style.opacity = next.opacity;
    note.textContent = next.note;
  };

  part(root, 'segmented').addEventListener('change', (event) => lay((event as CustomEvent<string>).detail));
}
