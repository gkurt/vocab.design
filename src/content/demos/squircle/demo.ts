/**
 * Squircle specimen: the superellipse against the rounded rectangle it is mistaken for.
 * The squircle path is generated from the superellipse equation, and the rectangle's
 * radius is derived rather than guessed: it is the radius whose corner passes through the
 * same point on the diagonal, so the two shapes agree at the corner and at the edges and
 * differ only in how they travel between them.
 *
 * The subject is the squircle itself. The dashed rectangle over it, the magnified corner
 * beside it, and the labels are all scenery, since a comparison is what makes the
 * difference legible but the shape is the term. Static: an outline has no state.
 *
 * Both figure labels used to explain the drawing as well as name it ("squircle, with a 27px
 * radius dashed over it" and "the corner at 3x: the arc turns on at the ticks"). They are
 * legends now, carrying the measurement and nothing else, since the strip's verdict already
 * says what the two curves do differently.
 */
const SIZE = 120;
const EXPONENT = 5;

/** Superellipse |x/a|^n + |y/a|^n = 1, sampled as a polyline dense enough to read as a curve. */
function superellipse(size: number, exponent: number, samples = 240): string {
  const a = size / 2;
  const power = 2 / exponent;
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const x = a + a * Math.sign(cos) * Math.abs(cos) ** power;
    const y = a + a * Math.sign(sin) * Math.abs(sin) ** power;
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join('L')}Z`;
}

/** The circular radius that meets the superellipse on the diagonal: the nominal radius. */
function matchingRadius(size: number, exponent: number): number {
  const a = size / 2;
  const diagonal = a + a * Math.SQRT1_2 ** (2 / exponent);
  return (size - diagonal) / (1 - Math.SQRT1_2);
}

export function mount(root: HTMLElement): void {
  const path = superellipse(SIZE, EXPONENT);
  const radius = matchingRadius(SIZE, EXPONENT);
  const r = radius.toFixed(2);
  const rect = `<rect x="0" y="0" width="${SIZE}" height="${SIZE}" rx="${r}" ry="${r}"></rect>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 26px">
        <div class="sp-stack" style="gap: 8px; align-items: center">
          <div style="position: relative; width: 132px; height: 132px">
            <svg data-part="shape" data-subject role="img" aria-label="Squircle"
                 viewBox="0 0 ${SIZE} ${SIZE}" style="display: block; width: 132px; height: 132px">
              <path d="${path}" fill="var(--sp-accent-soft)" stroke="var(--sp-accent)" stroke-width="1.6"></path>
            </svg>
            <svg data-part="arc" class="sp-context" aria-hidden="true" viewBox="0 0 ${SIZE} ${SIZE}"
                 style="position: absolute; inset: 0; width: 132px; height: 132px">
              <g fill="none" stroke="var(--sp-ink)" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.75">${rect}</g>
            </svg>
          </div>
          <span class="sp-label sp-context" style="text-align: center; max-width: 150px">
            dashed: ${Math.round(radius)}px radius
          </span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px; align-items: center">
          <div class="sp-surface" data-part="detail" style="padding: 6px; background: var(--sp-surface)">
            <svg aria-hidden="true" viewBox="0 0 40 40" style="display: block; width: 120px; height: 120px">
              <g fill="none" stroke="var(--sp-ink)" stroke-width="0.7" stroke-dasharray="2 1.5" opacity="0.75">${rect}</g>
              <path d="${path}" fill="none" stroke="var(--sp-accent)" stroke-width="0.9"></path>
              <g stroke="var(--sp-ink)" stroke-width="0.4" opacity="0.55">
                <path data-part="tick-x" d="M${r} 0 L${r} 7"></path>
                <path data-part="tick-y" d="M0 ${r} L7 ${r}"></path>
              </g>
            </svg>
          </div>
          <span class="sp-label" style="text-align: center; max-width: 150px">
            corner at 3x
          </span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 320px; margin: 0; text-align: center">
        Same box, same diagonal, same nominal radius. One bends all at once, one ramps.
      </p>
    </div>
  `;
}
