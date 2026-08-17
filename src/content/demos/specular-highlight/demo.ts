/**
 * Specular highlight specimen: one shape, three finishes. The same rounded body carries a
 * tight hard reflection, a broad soft one, and a rim caught from behind, so the reader can
 * read the two things a highlight reports: how rough the surface is, and where the light is.
 *
 * Every gradient is stated inline because the paint is the term. The kit has one accent, a
 * flat surface, and no radial gradients at all, and a highlight assembled from kit classes
 * would be demonstrating the kit.
 *
 * The subject is the highlight itself, not the shape it sits on and not the tour: the term
 * names the bright reflection, which is the narrowest element here that is actually it
 * (SPEC §5). The other two tiles, the labels and the caption are scenery.
 *
 * Static: a poster has no states, so there is nothing to animate and no clock to take.
 */
const BODY = 'radial-gradient(128% 118% at 50% 116%, #5b8bf0 0%, #2a49a8 58%, #16307d 100%)';
const RIMLINE = 'inset 0 0 0 1px rgb(255 255 255 / 0.22), 0 4px 10px rgb(16 24 40 / 0.28)';

/** The body every tile shares, so only the reflection on it differs. */
const SHAPE = [
  'position: relative',
  'display: block',
  'width: 96px',
  'height: 96px',
  'border-radius: 24px',
  'overflow: hidden',
  `background-image: ${BODY}`,
  `box-shadow: ${RIMLINE}`,
].join('; ');

function tile(part: string, label: string, note: string, inner: string): string {
  return `
    <div class="sp-stack" style="flex: 0 0 auto; width: 130px; gap: 7px; align-items: center">
      <span data-part="${part}" aria-hidden="true" style="${SHAPE}">${inner}</span>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35; text-align: center">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const tight = `
    <span data-part="hl-tight" data-subject
          style="position: absolute; left: 15px; top: 12px; width: 50px; height: 33px; border-radius: 50%;
                 background: radial-gradient(closest-side, rgb(255 255 255 / 0.98) 0%,
                             rgb(255 255 255 / 0.62) 46%, rgb(255 255 255 / 0) 76%)"></span>`;

  const broad = `
    <span data-part="hl-broad"
          style="position: absolute; left: -6px; top: -10px; width: 104px; height: 82px; border-radius: 50%;
                 background: radial-gradient(closest-side, rgb(255 255 255 / 0.4) 0%,
                             rgb(255 255 255 / 0.19) 52%, rgb(255 255 255 / 0) 88%)"></span>`;

  /* Light behind the object: nothing on the face, a bright line where the edge turns away. */
  const rim = `
    <span data-part="hl-rim"
          style="position: absolute; inset: 0; border-radius: 24px;
                 box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.92), inset 0 9px 14px -9px rgb(255 255 255 / 0.55),
                             inset 0 -2px 0 rgb(255 255 255 / 0.28)"></span>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 452px; padding: 13px 16px 15px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 11px">One shape, three reflections</span>

        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${tile('tile-tight', 'Tight', 'Small and hard edged: polished, and the lamp is up to the left.', tight)}
          ${tile('tile-broad', 'Broad', 'The same lamp on a rougher surface, scattered into a smear.', broad)}
          ${tile('tile-rim', 'Rim', 'Nothing on the face: the light is behind, catching the edge.', rim)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 452px; margin: 0; text-align: center">
        Size reports the roughness, position reports where the light is.
      </p>
    </div>
  `;
}
