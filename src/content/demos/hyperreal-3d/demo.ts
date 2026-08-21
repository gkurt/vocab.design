/**
 * Hyperreal 3D specimen: one rendered object floated over a plain type layout. The blob is
 * drawn entirely in SVG (no photograph anywhere): a radial body gradient, a chrome band
 * reading an implied environment, a subsurface glow warming the shadow side, a rim light,
 * two specular highlights at different sharpnesses, and a blurred contact shadow holding it
 * over nothing.
 *
 * The subject is the object itself, `data-part="object"`, and not the hero around it: the
 * term names the render, not the page it was dropped onto (SPEC §5). The contact shadow sits
 * outside the subject, since it belongs to the ground rather than to the thing. Everything
 * else, the brand row, the headline, the button, is scenery in the context register, and the
 * button is there on purpose: it is the control, and the object beside it is an image that
 * answers to no affordance.
 *
 * The paint is inline because the material is the term. The kit has one accent, one flat
 * shadow and no gradients, so a hyperreal render assembled from kit tokens would be
 * demonstrating the kit.
 *
 * Static: a hero image has no states, so there is nothing to animate and no clock to take.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */

/**
 * A closed cubic through eight points at uneven radii: a soft-body pebble rather than a
 * sphere, because a symmetric ball hides most of what a lighting model is doing.
 */
function blob(cx: number, cy: number, radii: number[]): string {
  const n = radii.length;
  const at = (i: number): [number, number] => {
    const k = ((i % n) + n) % n;
    const a = (k * 2 * Math.PI) / n - Math.PI / 2;
    const r = radii[k] as number;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const fix = (v: number) => v.toFixed(1);
  const start = at(0);
  let d = `M${fix(start[0])} ${fix(start[1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    // 3/16 of the two-segment chord is the offset that draws a true circle at eight points,
    // so uneven radii read as a swollen surface rather than as corners.
    const t = 3 / 16;
    d += `C${fix(p1[0] + (p2[0] - p0[0]) * t)} ${fix(p1[1] + (p2[1] - p0[1]) * t)}`;
    d += ` ${fix(p2[0] - (p3[0] - p1[0]) * t)} ${fix(p2[1] - (p3[1] - p1[1]) * t)}`;
    d += ` ${fix(p2[0])} ${fix(p2[1])}`;
  }
  return `${d}Z`;
}

const BLOB = blob(100, 98, [90, 86, 88, 80, 74, 70, 76, 84]);

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 8px 14px">
          <span aria-hidden="true" style="width: 12px; height: 12px; border-radius: 3px; background: var(--sp-accent)"></span>
          <span class="sp-heading sp-grow" style="font-size: 13px">Halo</span>
          <span class="sp-label" style="font-size: 12px">Objects</span>
          <span class="sp-label" style="font-size: 12px">Pricing</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--sp-surface)">
          <div class="sp-stack sp-context" data-part="copy" style="flex: 1 1 auto; min-width: 0; gap: 0">
            <span class="sp-label" data-part="eyebrow" style="font-size: 10px; letter-spacing: 0.16em">HALO ONE</span>
            <span data-part="headline" style="margin-top: 8px; font-size: 23px; font-weight: 600; line-height: 1.16; letter-spacing: -0.01em">
              A render that<br />outdoes the photo.
            </span>
            <span class="sp-text" data-part="sub" style="margin-top: 9px; max-width: 244px">
              Studio lighting, chrome banding, a glow under the skin. None of it was photographed.
            </span>
            <button class="sp-button sp-button--sm" data-part="cta" type="button" style="align-self: flex-start; margin-top: 13px">
              Take a look
            </button>
          </div>

          <svg
            data-part="render"
            viewBox="0 0 200 214"
            width="168"
            height="180"
            role="img"
            aria-label="A rendered glossy blob with chrome banding, a warm glow under its surface, and a soft contact shadow"
            style="flex: 0 0 auto; display: block"
          >
            <defs>
              <clipPath id="h3-clip"><path d="${BLOB}" /></clipPath>
              <radialGradient id="h3-body" cx="0.34" cy="0.26" r="0.88">
                <stop offset="0" stop-color="#ff96e2" />
                <stop offset="0.42" stop-color="#b23bef" />
                <stop offset="1" stop-color="#2a0f52" />
              </radialGradient>
              <linearGradient id="h3-chrome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="0.26" stop-color="#f8fafc" />
                <stop offset="0.45" stop-color="#8fa1b8" />
                <stop offset="0.58" stop-color="#e6ecf4" />
                <stop offset="0.76" stop-color="#3f4d63" />
                <stop offset="1" stop-color="#0f172a" stop-opacity="0" />
              </linearGradient>
              <radialGradient id="h3-sss" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stop-color="#ffd7ab" stop-opacity="0.92" />
                <stop offset="1" stop-color="#ff7ad9" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="h3-rim" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.9" />
                <stop offset="0.52" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="1" stop-color="#9be8ff" stop-opacity="0.75" />
              </linearGradient>
              <filter id="h3-soft" x="-45%" y="-45%" width="190%" height="190%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <filter id="h3-mild" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="3.4" />
              </filter>
              <filter id="h3-tight" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            <ellipse data-part="contact" cx="100" cy="194" rx="58" ry="9" fill="#2b0f45" opacity="0.34" filter="url(#h3-soft)" />

            <g data-part="object" data-subject>
              <path d="${BLOB}" fill="url(#h3-body)" />
              <g clip-path="url(#h3-clip)">
                <ellipse data-part="glow" cx="120" cy="152" rx="76" ry="54" fill="url(#h3-sss)" filter="url(#h3-mild)" />
                <path
                  data-part="chrome"
                  d="M-6 94C40 72 96 122 140 100C172 84 190 92 208 84L208 152C180 160 150 140 118 152C80 166 28 152 -6 160Z"
                  fill="url(#h3-chrome)"
                  opacity="0.82"
                  filter="url(#h3-tight)"
                />
                <ellipse cx="58" cy="180" rx="72" ry="30" fill="#1b0736" opacity="0.42" filter="url(#h3-mild)" />
              </g>
              <path d="${BLOB}" fill="none" stroke="url(#h3-rim)" stroke-width="3" />
              <g data-part="specular">
                <ellipse cx="70" cy="50" rx="27" ry="16" fill="#ffffff" opacity="0.5" transform="rotate(-32 70 50)" filter="url(#h3-mild)" />
                <ellipse cx="62" cy="42" rx="11" ry="6" fill="#ffffff" opacity="0.95" transform="rotate(-32 62 42)" />
                <ellipse cx="152" cy="62" rx="5" ry="10" fill="#ffffff" opacity="0.7" transform="rotate(26 152 62)" filter="url(#h3-tight)" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        The button is the control. The object is a picture, and it invites nothing.
      </p>
    </div>
  `;
}
