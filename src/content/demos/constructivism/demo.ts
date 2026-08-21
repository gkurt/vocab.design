/**
 * Constructivism specimen: one poster built from the register's parts, and the same parts
 * set square beside it, so the diagonal reads as the choice it was rather than as decoration.
 * Two inks on paper, a montage block, heavy sans capitals riding the bar, and rules at real
 * construction weight.
 *
 * The paint is inline because the two inks and the angle are the term. The kit has one
 * accent, no red, no warm paper and nothing that rotates, so a constructivist poster
 * assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the angled composition, not the pair and not the square copy: the term
 * names the composition (SPEC §5). The square version, the labels and the caption are the
 * scenery that makes the angle legible. The word on the poster is the movement's own name
 * for what it did, not a period slogan.
 *
 * Static: a printed poster has no states, so there is nothing to animate and no clock.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
const PAPER = '#eee7d9';
const RED = '#c62a1f';
const INK = '#1b1815';
const W = 212;
const H = 168;

/** The montage block: a cut photograph stands in as a halftone field with a shape in it. */
const HALFTONE = 'radial-gradient(circle at 50% 50%, rgb(27 24 21 / 0.55) 0 1.1px, transparent 1.3px)';

function montage(part: string, place: string): string {
  return `
    <span data-part="${part}" aria-hidden="true"
          style="position: absolute; ${place}; width: 78px; height: 62px; overflow: hidden; background: #b9b2a4;
                 background-image: ${HALFTONE}; background-size: 4px 4px">
      <span style="position: absolute; left: 12px; top: 12px; width: 26px; height: 26px; border-radius: 50%; background: ${INK}"></span>
      <span style="position: absolute; left: 40px; top: 20px; width: 30px; height: 30px; background: ${INK};
                   clip-path: polygon(0 50%, 100% 0, 100% 100%)"></span>
    </span>`;
}

export function mount(root: HTMLElement): void {
  /* The bar and the capitals rotate together: the type rides the bar rather than sitting
     beside it, which is the move, and one shared rotation is the only way to guarantee it. */
  const angled = `
    <span data-part="wedge" aria-hidden="true"
          style="position: absolute; left: 0; top: 96px; width: 150px; height: 72px; background: ${RED};
                 clip-path: polygon(0 100%, 0 18%, 100% 100%)"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 118px; top: 176px; width: 150px; height: 5px; background: ${INK}; rotate: -21deg"></span>
    <span data-part="disc" aria-hidden="true"
          style="position: absolute; right: 14px; top: 10px; width: 52px; height: 52px; border-radius: 50%; background: ${RED}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: -20px; top: 66px; width: 264px; height: 4px; background: ${RED}; rotate: -21deg"></span>
    ${montage('montage', 'left: 12px; top: 12px; rotate: -7deg')}
    <span data-part="band"
          style="position: absolute; left: -40px; top: 96px; display: flex; align-items: center; width: 300px; height: 34px;
                 padding-left: 52px; background: ${INK}; rotate: -21deg">
      <span data-part="headline"
            style="font-size: 25px; font-weight: 800; letter-spacing: 0.01em; line-height: 1.1; color: ${PAPER}">
        CONSTRUCT
      </span>
    </span>`;

  const square = `
    <span data-part="square-band" aria-hidden="true"
          style="position: absolute; left: 0; top: 100px; width: 100%; height: 30px; background: ${INK}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 0; top: 82px; width: 100%; height: 4px; background: ${RED}"></span>
    <span aria-hidden="true"
          style="position: absolute; left: 8px; top: 138px; width: 96px; height: 20px; background: ${RED}"></span>
    <span aria-hidden="true"
          style="position: absolute; right: 14px; top: 10px; width: 52px; height: 52px; border-radius: 50%; background: ${RED}"></span>
    ${montage('square-montage', 'left: 12px; top: 12px')}
    <span data-part="square-headline"
          style="position: absolute; left: 10px; top: 102px; font-size: 25px; font-weight: 800; letter-spacing: 0.01em;
                 line-height: 1.08; color: ${PAPER}">
      CONSTRUCT
    </span>`;

  const poster = (part: string, inner: string, mark = ''): string => `
    <span data-part="${part}"${mark}
          style="position: relative; display: block; width: ${W}px; height: ${H}px; overflow: hidden; background: ${PAPER}">
      ${inner}
    </span>`;

  const column = (label: string, note: string, body: string, context: boolean): string => `
    <div class="sp-stack${context ? ' sp-context' : ''}" style="flex: 0 0 ${W}px; gap: 5px; align-items: stretch">
      ${body}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">The angle is the argument</span>

        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${column('On the angle', 'Two inks, a montage block, capitals riding the bar.', poster('composition', angled, ' data-subject'), false)}
          ${column('Set square', 'The same parts with the angle taken back out.', poster('square', square), true)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Red and black on cheap paper, and one diagonal doing all the work.
      </p>
    </div>
  `;
}
