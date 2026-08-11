const BLOBS = [
  { color: '#3ddc97', size: '210px', blur: '46px', place: 'left: -6%; top: -14%', x: '48px', y: '30px' },
  { color: '#5ec8ff', size: '180px', blur: '42px', place: 'left: 34%; top: 30%', x: '-36px', y: '-28px' },
  { color: '#b46bff', size: '200px', blur: '52px', place: 'right: -8%; top: -6%', x: '-30px', y: '40px' },
  { color: '#f06ca8', size: '150px', blur: '40px', place: 'right: 18%; bottom: -18%', x: '34px', y: '-22px' },
];

/**
 * Aurora UI specimen: the backdrop is the term, so the glowing layer is the subject
 * and the card above it is scenery. Four saturated circles blurred past their own
 * edges overlap into hues the palette never named, drifting slowly enough that the
 * background never asks to be watched. The drift is the kit's, which means it is
 * transform-only, pauses off screen, and stops under a stated motion preference.
 */
export function mount(root: HTMLElement): void {
  const blobs = BLOBS.map(
    (blob, index) => `
      <span class="sp-aurora-blob sp-drift" data-part="blob-${index + 1}"
            style="--sp-blob: ${blob.color}; --sp-blob-size: ${blob.size}; --sp-blob-blur: ${blob.blur}; --sp-i: ${index}; --sp-drift-time: ${16 + index * 3}s; --sp-drift-x: ${blob.x}; --sp-drift-y: ${blob.y}; ${blob.place}"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-aurora" data-part="aurora" data-subject
           style="--sp-aurora-wash: linear-gradient(155deg, #0d1230, #1a1046 58%, #2b1038); inset: 20px 14px; border-radius: var(--sp-radius)">
        ${blobs}
      </div>
      <div class="sp-window sp-context" data-part="card" style="position: relative; width: 268px; text-align: center">
        <div class="sp-heading">Northern Lights</div>
        <p class="sp-text" style="margin: 6px 0 0">Four blurred circles over one dark base, drifting slowly enough to ignore.</p>
        <button class="sp-button sp-button--sm" data-part="cta" type="button" style="margin-top: 12px">Read the recipe</button>
      </div>
    </div>
  `;
}
