import { localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The measure the page is set to, and the one the band refuses. */
const MEASURE = '36ch';

const TRACKS = `[full-start] 1fr [content-start] min(${MEASURE}, 100%) [content-end] 1fr [full-end]`;

/**
 * Full bleed specimen: a page whose paragraphs are held to a measure, interrupted
 * by one band that reaches both edges. The grid keeps the gutters and the band
 * asks for the outer lines, so nothing here escapes a container by negative
 * margin (SPEC has no opinion on that, the term does).
 *
 * The subject is the band alone. Its neighbours staying constrained is the whole
 * comparison, so they are scenery rather than part of the claim.
 *
 * `data-bleed` is derived from the boxes themselves: the band is as wide as the
 * page and wider than the column beside it. A choreography cannot see a grid
 * line, and geometry is the only honest proof that the escape happened.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="width: 430px; height: 276px">
        <div
          data-part="page"
          style="flex: 1 1 auto; display: grid; align-content: start; grid-template-columns: ${TRACKS}; row-gap: 12px; padding: 12px 0; background: var(--sp-surface)"
        >
          <span class="sp-heading sp-context" data-part="title" style="grid-column: content">Harbour notes</span>
          <p class="sp-text sp-context" data-part="lede" style="grid-column: content; margin: 0">
            The column holds its measure. Every paragraph on the page is set to the
            same width, which is what makes the interruption legible.
          </p>
          <figure
            data-part="band"
            data-subject
            style="grid-column: full; display: flex; align-items: flex-end; margin: 0; height: 68px; padding: 8px 12px; background: var(--sp-accent-soft); border-block: 1px solid var(--sp-line)"
          >
            <span class="sp-label" data-part="band-label">Plate 4, edge to edge</span>
          </figure>
          <p class="sp-text sp-context" data-part="tail" style="grid-column: content; margin: 0">
            After the band the text picks up exactly where it left off, at the same
            measure, in the same gutters.
          </p>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const band = part(root, 'band');
  const lede = part(root, 'lede');

  const width = (el: HTMLElement) => localSize(el).width;
  flag(band, 'data-bleed', width(band) >= page.clientWidth - 1 && width(band) > width(lede) + 8);
}
