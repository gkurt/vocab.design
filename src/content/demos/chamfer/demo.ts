/**
 * Chamfer specimen: one panel, three ways of ending its corners. A flat 45 degree cut, the
 * rounded fillet everyone reaches for by default, and no treatment at all, with the cut
 * drawn again underneath at a size where its leg can be measured.
 *
 * The silhouettes are cut with clip-path and the plates are painted inline, because the
 * shape is the term: the kit has exactly one radius and no way to say "cut" at all.
 *
 * The subject is the chamfered plate, not the corner region and not the tour. A corner is
 * a property of an outline rather than an element, and the notch here is 20px hugging the
 * plate's edge, which is too small and too far into the frame's margin for a ring to read
 * honestly (SPEC §5). The other two plates, the labels and the anatomy strip are scenery.
 *
 * Static: a cut corner has no states, so there is nothing to animate and no clock to take.
 */
const CUT = 20;
const EDGE = '#9aa6bd';
const FACE = 'linear-gradient(157deg, #39414f 0%, #2a3140 58%, #222834 100%)';

const chamferPath = (cut: number) =>
  `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px),` +
  ` calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`;

/** A machined plate: a light edge layer with the dark face inset inside it. */
function plate(part: string, outer: string, inner: string, mark: string): string {
  return `
    <span data-part="${part}"${mark} aria-hidden="true"
          style="display: block; width: 124px; height: 84px; padding: 2px; background: ${EDGE}; ${outer}">
      <span style="display: flex; flex-direction: column; justify-content: center; gap: 7px;
                   width: 100%; height: 100%; padding: 0 20px; background-image: ${FACE}; ${inner}">
        <span style="height: 5px; border-radius: 3px; background: rgb(255 255 255 / 0.34)"></span>
        <span style="height: 5px; width: 62%; border-radius: 3px; background: rgb(255 255 255 / 0.19)"></span>
      </span>
    </span>`;
}

function tile(part: string, label: string, note: string, outer: string, inner: string, mark = ''): string {
  return `
    <div class="sp-stack" style="flex: 0 0 auto; width: 132px; gap: 6px; align-items: center">
      ${plate(part, outer, inner, mark)}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35; text-align: center">${note}</span>
    </div>`;
}

/** The cut drawn large: the square corner it replaced, dashed, and the leg it eats back. */
const ANATOMY = `
  <svg data-part="anatomy-figure" viewBox="0 0 150 54" width="150" height="54" role="presentation" style="flex: 0 0 auto">
    <path d="M6 18h70l28 22v12H6z" fill="var(--sp-sunken)"/>
    <path d="M76 18h28v22z" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-dasharray="4 3"/>
    <path d="M6 18h70" fill="none" stroke="var(--sp-ink)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M104 40v12" fill="none" stroke="var(--sp-ink)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M76 18 104 40" fill="none" stroke="var(--sp-ink)" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M76 9h28" fill="none" stroke="var(--sp-muted)" stroke-width="2"/>
    <path d="M76 6v6M104 6v6" fill="none" stroke="var(--sp-muted)" stroke-width="2"/>
    <text x="108" y="13" font-size="10" fill="var(--sp-muted)">${CUT} px</text>
    <text x="60" y="40" font-size="10" fill="var(--sp-muted)">45°</text>
  </svg>`;

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 460px; padding: 11px 16px 12px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Three ways to end a corner</span>

        <div class="sp-row" data-part="tour" style="gap: 10px; align-items: flex-start; justify-content: center">
          ${tile(
            'plate-chamfer',
            'Chamfer',
            'Cut flat at 45 degrees, 20px off each edge.',
            `clip-path: ${chamferPath(CUT)}`,
            `clip-path: ${chamferPath(CUT - 3)}`,
            ' data-subject',
          )}
          ${tile('plate-fillet', 'Fillet', 'Turned through an arc of the same 20px.', 'border-radius: 20px', 'border-radius: 18px')}
          ${tile('plate-square', 'Square', 'Left as the two faces meet, at 90 degrees.', '', '')}
        </div>

        <div class="sp-divider" style="margin: 9px 0 8px"></div>

        <div class="sp-row sp-context" data-part="anatomy" style="gap: 14px; align-items: center">
          ${ANATOMY}
          <p class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.4">
            Called out by its leg, not by a radius: how far it eats back along each face before the cut begins.
          </p>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        Geometry, not shading: the silhouette changes, so it survives in one colour.
      </p>
    </div>
  `;
}
