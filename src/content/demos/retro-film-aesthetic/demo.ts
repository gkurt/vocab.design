/**
 * Retro film specimen: one drawn frame shown twice, treated and untreated, so the register
 * reads as a treatment rather than as a picture. The treated copy carries the four things
 * the look is made of: grain over everything, a warm halation bloom around the brightest
 * part of the frame, lifted blacks and a vignette from the lens, and a date back printed
 * in the corner.
 *
 * The source is an inline SVG rather than a photograph, and every artefact is an inline
 * gradient laid over it, which is the honest version of the claim: none of this was
 * captured, all of it is drawn.
 *
 * The paint is inline because the treatment is the term. The kit has no gradients, no
 * grain and no blend modes, and a film look assembled from kit classes would be
 * demonstrating the kit.
 *
 * The subject is the treated frame, not the pair and not the untreated copy: the term names
 * what has been done to an image (SPEC §5). The clean frame, the labels and the caption are
 * the scenery that makes the treatment legible.
 *
 * Static: a developed frame has no states, so there is nothing to animate and no clock.
 */
const W = 200;
const H = 150;

/**
 * Grain, drawn the way the emulsion made it: fractal noise rather than a repeating dot
 * pattern, because a tiled dot grid reads as a printing screen and film grain has no grid.
 * feTurbulence runs a specified generator from a fixed seed, so the speckle is the same on
 * every mount. Only the treated frame carries it, so the filter id is unique in this root.
 */
const GRAIN = `
  <svg data-part="grain" aria-hidden="true" width="${W}" height="${H}"
       style="position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay; opacity: 0.42">
    <filter id="rf-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#rf-grain)"/>
  </svg>`;

/** The sky, on the panel rather than in the drawing: the frame is rendered twice, and two
    copies of an SVG gradient in one root would be two elements claiming the same id. */
const SKY = 'linear-gradient(180deg, #f6cf9b 0%, #eda269 55%, #d9744d 100%)';

/** The frame itself: a dusk landscape with one bright sun for the halation to bloom around. */
const SCENE = `
  <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation" style="display: block">
    <circle cx="132" cy="54" r="17" fill="#fff5d2"/>
    <path d="M0 96 44 74l38 15 32-19 42 20 44-14v40H0z" fill="#c07a53"/>
    <path d="M0 112 38 96l40 14 34-10 46 16 42-12v34H0z" fill="#8a4c39"/>
    <path d="M0 126h200v24H0z" fill="#4a2a23"/>
    <path d="M28 126v-20l6-7 6 7v20zM162 126v-15l5-6 5 6v15z" fill="#3a2019"/>
  </svg>`;

/** One overlay layer of the treatment, stacked over the frame inside its own isolation. */
function layer(part: string, paint: string): string {
  return `<span data-part="${part}" aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none; ${paint}"></span>`;
}

function panel(part: string, mark: string, inner: string): string {
  return `
    <span data-part="${part}"${mark}
          style="position: relative; display: block; width: ${W}px; height: ${H}px; overflow: hidden;
                 isolation: isolate; border-radius: 3px; background-image: ${SKY}">
      ${SCENE}${inner}
    </span>`;
}

function column(label: string, note: string, body: string, context: boolean): string {
  return `
    <div class="sp-stack${context ? ' sp-context' : ''}" style="flex: 0 0 auto; width: ${W}px; gap: 6px; align-items: center">
      ${body}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35; text-align: center">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const treatment = [
    /* Halation: light that punched through the emulsion, bounced off the film base, and
       came back to expose the grains around the highlight. */
    layer(
      'halation',
      'mix-blend-mode: screen; background: radial-gradient(circle at 66% 36%, rgb(255 192 116 / 0.74) 0%,' +
        ' rgb(255 142 66 / 0.4) 19%, rgb(255 120 48 / 0.14) 36%, transparent 58%)',
    ),
    /* Faded contrast: the blacks lifted and the whole frame pulled warm. */
    layer('fade', 'background: linear-gradient(184deg, rgb(255 224 180 / 0.26), rgb(104 72 56 / 0.26))'),
    layer('vignette', 'background: radial-gradient(122% 104% at 50% 46%, transparent 42%, rgb(34 18 12 / 0.54) 100%)'),
    GRAIN,
    /* Dust and a hair on the gate: drawn at 2px so they are marks rather than hairlines. */
    `<span data-part="dust" aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none">
       <span style="position: absolute; left: 38px; top: 16px; width: 2px; height: 21px; background: rgb(255 246 226 / 0.5); rotate: 8deg"></span>
       <span style="position: absolute; left: 152px; top: 96px; width: 2px; height: 13px; background: rgb(255 246 226 / 0.42); rotate: -12deg"></span>
       <span style="position: absolute; left: 74px; top: 118px; width: 3px; height: 3px; border-radius: 50%; background: rgb(38 22 16 / 0.55)"></span>
       <span style="position: absolute; left: 108px; top: 30px; width: 2px; height: 2px; border-radius: 50%; background: rgb(38 22 16 / 0.5)"></span>
     </span>`,
    `<span data-part="datestamp" aria-hidden="true"
           style="position: absolute; right: 9px; bottom: 7px; font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
                  font-size: 12px; letter-spacing: 0.06em; color: #ff8b3c; text-shadow: 0 0 7px rgb(255 139 60 / 0.85)">
       '89 08 14
     </span>`,
  ].join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 16px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">The same frame, twice</span>

        <div class="sp-row" data-part="tour" style="gap: 18px; align-items: flex-start; justify-content: center">
          ${column(
            'Treated',
            'Grain, halation, lifted blacks, a vignette, and a date back.',
            panel('treated', ' data-subject', treatment),
            false,
          )}
          ${column('As drawn', 'The same frame with none of it applied.', panel('clean', '', ''), true)}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Grain is silver, halation is light bouncing back off the film base, and here both are drawn rather than captured.
      </p>
    </div>
  `;
}
