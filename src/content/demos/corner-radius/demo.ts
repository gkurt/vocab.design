/**
 * Corner radius specimen: one plate at four radii, in the same box, with the same fill
 * and the same type, so the only thing moving across the row is the corner. The last
 * value is half the plate's height, where the two arcs on a side meet and the corner
 * stops being a corner.
 *
 * The subject is the traced arc on the 24px plate, drawn as its own element sized to the
 * radius it spans (SPEC §5). The term names a feature of an outline rather than an
 * element, so ringing a whole plate would claim the plate is the term and ringing the row
 * would claim the comparison is; the four plates are peers and the arc is the one
 * instance drawn.
 *
 * Static: a radius has one state, so the script is waits and asserts and the demo takes
 * no clock (SPEC §8).
 */
const PLATE_W = 104;
const PLATE_H = 72;

/** The ladder the row walks: 0, small, large, and half the height, which is a pill cap. */
const STEPS: { r: number; word: string }[] = [
  { r: 0, word: 'square' },
  { r: 8, word: 'soft' },
  { r: 24, word: 'rounded' },
  { r: PLATE_H / 2, word: 'pill cap' },
];

/** The radius whose arc is drawn: large enough to read, still a corner rather than a cap. */
const TRACED = 24;

function plate(r: number, word: string): string {
  const traced =
    r === TRACED
      ? `<svg data-part="arc" data-subject aria-hidden="true" viewBox="0 0 ${r} ${r}"
              style="position: absolute; left: 0; top: 0; width: ${r}px; height: ${r}px; overflow: visible">
           <path d="M0 ${r} A${r} ${r} 0 0 1 ${r} 0" fill="none" stroke="var(--sp-accent)"
                 stroke-width="2.6" stroke-linecap="round"></path>
         </svg>`
      : '';

  return `
    <div class="sp-stack" style="flex: 0 0 auto; width: ${PLATE_W}px; gap: 5px; align-items: center">
      <div style="position: relative; width: ${PLATE_W}px; height: ${PLATE_H}px">
        <div data-part="plate-${r}" aria-hidden="true"
             style="display: flex; flex-direction: column; justify-content: center; gap: 8px;
                    width: 100%; height: 100%; padding: 0 18px; background: var(--sp-surface);
                    border: 1px solid var(--sp-line); border-radius: ${r}px">
          <span class="sp-line" style="width: 100%"></span>
          <span class="sp-line" style="width: 62%"></span>
        </div>
        ${traced}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-variant-numeric: tabular-nums">${r} px</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.2">${word}</span>
    </div>`;
}

/** The corner drawn large: the angle it replaced dashed in, and the two radii that place the arc. */
const ANATOMY = `
  <svg data-part="anatomy" viewBox="0 0 168 66" width="168" height="66" role="presentation" style="flex: 0 0 auto">
    <path d="M16 44 L16 14 L46 14" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-dasharray="4 3"/>
    <path d="M46 14 H160" fill="none" stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16 44 V62" fill="none" stroke="var(--sp-muted)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16 44 A30 30 0 0 1 46 14" fill="none" stroke="var(--sp-ink)" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M16 44 H46 M46 44 V14" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="3 2.5"/>
    <circle cx="46" cy="44" r="2.6" fill="var(--sp-muted)"/>
    <text x="27" y="40" font-size="11" font-style="italic" fill="var(--sp-muted)">r</text>
    <text x="49" y="33" font-size="11" font-style="italic" fill="var(--sp-muted)">r</text>
  </svg>`;

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 472px; padding: 12px 14px">
        <span class="sp-heading sp-context" data-part="heading" style="display: block; margin-bottom: 9px">
          One plate, four radii
        </span>

        <div class="sp-row" data-part="tour" style="gap: 8px; align-items: flex-start; justify-content: center">
          ${STEPS.map((step) => plate(step.r, step.word)).join('')}
        </div>

        <div class="sp-divider" style="margin: 10px 0 9px"></div>

        <div class="sp-row sp-context" style="gap: 14px; align-items: center">
          ${ANATOMY}
          <p class="sp-text" data-part="anatomy-note" style="margin: 0; font-size: 11px; line-height: 1.4">
            The radius is the circle's, measured back along each edge to where the straight run stops.
            At half the shorter side the two arcs meet, the run between them is gone, and every larger
            number lands on the same cap.
          </p>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 440px; margin: 0; text-align: center">
        Same box, same fill, same type: one number moving, and the whole register moving with it.
      </p>
    </div>
  `;
}
