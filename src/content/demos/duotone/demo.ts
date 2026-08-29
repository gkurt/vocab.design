import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Ramp = { shadow: string; highlight: string; label: string };

const RAMPS: Record<string, Ramp> = {
  ink: { shadow: '#2A1E7C', highlight: '#F5D06B', label: 'shadows to indigo, highlights to amber' },
  tide: { shadow: '#0B3B45', highlight: '#8FE6CB', label: 'shadows to deep teal, highlights to mint' },
  flare: { shadow: '#571043', highlight: '#FFB6C9', label: 'shadows to plum, highlights to rose' },
};

const START = 'ink';

/**
 * A photograph stand-in built from gradients: a figure against a lit ground, in greys
 * only, so the specimen ships no image and the mapping has real tonal range to work on.
 */
const PHOTO = [
  'radial-gradient(circle at 50% 30%, #f4f4f4 0 11%, #d2d2d2 11% 15%, transparent 15%)',
  'radial-gradient(ellipse 40% 30% at 50% 96%, #ededed 0 62%, #b9b9b9 62% 78%, transparent 80%)',
  'radial-gradient(circle at 78% 20%, #fbfbfb 0 6%, transparent 26%)',
  'linear-gradient(158deg, #3a3a3a 0%, #8f8f8f 54%, #1e1e1e 100%)',
].join(', ');

/**
 * Duotone specimen: one greyscale photograph stand-in beside the same image mapped onto
 * a two colour ramp, with the ramp chosen as an absolute state.
 *
 * The subject is the mapped image, not the pair: the untouched copy is what it is being
 * compared against rather than the thing being named, so it stays in the context
 * register. The mapping is the CSS sandwich the article describes, a solid shadow colour
 * in `lighten` under a solid highlight colour in `darken`, isolated so it clamps this
 * image and nothing behind it. Both frames are the same fixed size and the readout is
 * fixed height, so changing ramp repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ramp = RAMPS[START];

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Ramp" data-value="${START}">
            <button class="sp-segment" data-part="seg-ink" value="ink">Ink</button>
            <button class="sp-segment" data-part="seg-tide" value="tide">Tide</button>
            <button class="sp-segment" data-part="seg-flare" value="flare">Flare</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 14px; align-items: flex-start">
          <div class="sp-context sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <div data-part="original" style="height: 128px; border-radius: var(--sp-radius); background: ${PHOTO}"></div>
            <span class="sp-label">Original</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <div data-part="duotone" data-subject data-ramp="${START}"
                 style="position: relative; height: 128px; border-radius: var(--sp-radius); overflow: hidden;
                        isolation: isolate; background: ${PHOTO}">
              <span data-part="shadow-layer"
                    style="position: absolute; inset: 0; background: ${ramp?.shadow}; mix-blend-mode: lighten"></span>
              <span data-part="highlight-layer"
                    style="position: absolute; inset: 0; background: ${ramp?.highlight}; mix-blend-mode: darken"></span>
            </div>
            <div class="sp-row" style="gap: 6px">
              <span class="sp-label">Duotone</span>
              <span class="sp-swatch" data-part="chip-shadow" style="width: 14px; height: 14px; --sp-swatch: ${ramp?.shadow}"></span>
              <span class="sp-swatch" data-part="chip-highlight" style="width: 14px; height: 14px; --sp-swatch: ${ramp?.highlight}"></span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; min-height: 20px">
          Luminance decides the position, the ramp decides the colour: ${ramp?.label}.
        </p>
      </div>
    </div>
  `;

  const duotone = part(root, 'duotone');
  const shadowLayer = part(root, 'shadow-layer');
  const highlightLayer = part(root, 'highlight-layer');
  const chipShadow = part(root, 'chip-shadow');
  const chipHighlight = part(root, 'chip-highlight');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const name = (event as CustomEvent<string>).detail;
    const next = RAMPS[name];
    if (!next) return;
    duotone.dataset.ramp = name;
    shadowLayer.style.background = next.shadow;
    highlightLayer.style.background = next.highlight;
    chipShadow.style.setProperty('--sp-swatch', next.shadow);
    chipHighlight.style.setProperty('--sp-swatch', next.highlight);
    note.textContent = `Luminance decides the position, the ramp decides the colour: ${next.label}.`;
  });
}
