/**
 * Holographic foil specimen: one card surface shown at three simulated viewing angles, so
 * the reader understands the colour is a property of the geometry rather than paint sitting
 * on the card. Each tile carries the same hue sequence, the same conic film and the same
 * metallic sheen; only where the sequence starts and which way it runs changes.
 *
 * A strip under each card reads out the hue order at that angle, which is the honest part:
 * the order never scrambles, it slides, because it follows the spectrum rather than taste.
 *
 * The paint is inline because the layered gradients and their blend modes are the term. The
 * kit is a flat, single-accent system with no gradient, no metal and no blending at all.
 *
 * The subject is the first card's surface, not the row and not a tile: the term names a
 * finish on a surface (SPEC §5). The two tipped cards beside it are the evidence that the
 * finish is angle dependent, and they, the labels and the caption are scenery. Marking the
 * row instead would have claimed the term is the comparison, which it is not.
 *
 * Every hue, stop and angle comes from a fixed table, so the specimen is identical on every
 * identify run. Static: this is a poster, not a tilt handler, so there is no clock and no
 * scripted motion (a real foil would be driven by device orientation, which the article
 * says belongs behind a reduced-motion check).
 */

/** The spectral sequence, in order. Tipping the card slides the start, it never scrambles. */
const HUES = [312, 268, 214, 168, 122, 58, 22, 336] as const;

/** Studio ground: a fixed charcoal in both themes, because foil is judged against a dark. */
const GROUND = '#1b1f27';

/**
 * The metal, laid over the colour rather than under it. Under it the bands would have to
 * blend up through a pale ground and come back washed out, which is exactly the failure the
 * article warns about: a foil that reads as one white highlight instead of a split spectrum.
 */
const SHEEN = [
  'linear-gradient(158deg,',
  'rgb(255 255 255 / 0.6) 0%,',
  'rgb(255 255 255 / 0.04) 26%,',
  'rgb(255 255 255 / 0.44) 52%,',
  'rgb(255 255 255 / 0.02) 74%,',
  'rgb(18 22 32 / 0.24) 100%)',
].join(' ');

const TW = 136;
const TH = 156;

function hueAt(i: number, rotate: number): number {
  return HUES[(i + rotate) % HUES.length] ?? HUES[0];
}

/** The banded sweep: the hue sequence laid across the card at the angle it is seen from. */
function sweep(deg: number, rotate: number): string {
  const stops = HUES.map((_, i) => {
    const pos = (i / (HUES.length - 1)) * 100;
    return `hsl(${hueAt(i, rotate)} 92% 62%) ${pos.toFixed(1)}%`;
  });
  return `linear-gradient(${deg}deg, ${stops.join(', ')})`;
}

/** The soap-film pass, at a different angle, so the bands do not read as a printed ramp. */
function film(from: number, rotate: number): string {
  const stops = HUES.map((_, i) => `hsl(${hueAt(i, rotate)} 86% 62% / 0.62) ${((i / HUES.length) * 360).toFixed(0)}deg`);
  return `conic-gradient(from ${from}deg at 32% 24%, ${stops.join(', ')}, hsl(${hueAt(0, rotate)} 86% 62% / 0.62) 360deg)`;
}

/** Concentric arcs: the CD reference, kept faint so it never reads as one light source. */
const ARCS = `
  <svg viewBox="0 0 112 72" width="112" height="72" role="presentation"
       style="position: absolute; inset: 0; display: block; opacity: 0.3; mix-blend-mode: soft-light">
    <g fill="none" stroke="#ffffff" stroke-width="1.6">
      <path d="M-14 74a58 58 0 0 1 58-58"/>
      <path d="M-6 74a50 50 0 0 1 50-50"/>
      <path d="M2 74a42 42 0 0 1 42-42"/>
      <path d="M10 74a34 34 0 0 1 34-34"/>
    </g>
  </svg>`;

/** The hue readout under each card: the same sequence, flattened so the slide is countable. */
function readout(part: string, rotate: number): string {
  const cells = HUES.map(
    (_, i) => `<span aria-hidden="true" style="flex: 1 1 0; height: 12px; background: hsl(${hueAt(i, rotate)} 90% 62%)"></span>`,
  ).join('');
  return `<div data-part="${part}" style="display: flex; overflow: hidden; border-radius: 3px">${cells}</div>`;
}

/** One simulated viewing angle: `deg` lays the sweep, `from` starts the conic film, and
    `rotate` says where in the spectral sequence this angle happens to begin. */
type View = {
  part: string;
  cardPart: string;
  readPart: string;
  angle: string;
  deg: number;
  from: number;
  rotate: number;
  subject?: boolean;
};

/** One viewing angle: the card, the hue readout, and the angle it is being seen from. */
function tile({ part, cardPart, readPart, angle, deg, from, rotate, subject }: View): string {
  return `
    <div data-part="${part}"
         style="display: flex; flex-direction: column; gap: 11px; width: ${TW}px; height: ${TH}px; padding: 12px;
                border-radius: 8px; background: ${GROUND}">
      <div data-part="${cardPart}"${subject ? ' data-subject' : ''}
           style="position: relative; width: 112px; height: 72px; overflow: hidden; border-radius: 7px;
                  background-image: ${SHEEN}, ${film(from, rotate)}, ${sweep(deg, rotate)};
                  background-blend-mode: normal, soft-light, normal;
                  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.45), 0 3px 9px rgb(0 0 0 / 0.4)">
        ${ARCS}
        <span aria-hidden="true"
              style="position: absolute; left: 10px; top: 12px; width: 24px; height: 18px; border-radius: 3px;
                     background: linear-gradient(140deg, #f0d78d, #a9821f)"></span>
        <span aria-hidden="true"
              style="position: absolute; left: 10px; bottom: 11px; width: 74px; height: 5px; border-radius: 3px;
                     background: rgb(28 24 34 / 0.5)"></span>
        <span aria-hidden="true"
              style="position: absolute; left: 10px; bottom: 22px; width: 46px; height: 5px; border-radius: 3px;
                     background: rgb(28 24 34 / 0.34)"></span>
      </div>
      ${readout(readPart, rotate)}
      <span style="margin-top: auto; font-size: 11px; line-height: 1.2; color: #cfd5e2">${angle}</span>
    </div>`;
}

/** One column of the tour: the view, then what it is showing. Context is everything but
    the first, whose card carries the subject: the tipped cards are its evidence. */
function column(view: View, label: string, note: string): string {
  const quiet = view.subject ? '' : ' sp-context';
  return `
    <div class="sp-stack${quiet}" style="flex: 0 0 ${TW}px; gap: 5px; align-items: stretch">
      ${tile(view)}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

/** The three views, written out: only where the sequence starts and how it lies changes. */
const HEAD_ON: View = {
  part: 'tile-head',
  cardPart: 'card-head',
  readPart: 'read-head',
  angle: 'Head on',
  deg: 118,
  from: 208,
  rotate: 0,
  subject: true,
};
const TIPPED: View = {
  part: 'tile-tip',
  cardPart: 'card-tip',
  readPart: 'read-tip',
  angle: 'Tipped a little',
  deg: 104,
  from: 262,
  rotate: 3,
};
const STEEP: View = {
  part: 'tile-steep',
  cardPart: 'card-steep',
  readPart: 'read-steep',
  angle: 'Tipped further',
  deg: 88,
  from: 316,
  rotate: 5,
};

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">One surface, three angles</span>

        <div class="sp-row" data-part="tour" style="gap: 13px; align-items: flex-start; justify-content: center">
          ${column(HEAD_ON, 'The finish', 'Spectral order over metal.')}
          ${column(TIPPED, 'Same card', 'The sequence slides along.')}
          ${column(STEEP, 'Same card', 'It never jumps out of order.')}
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Wavelength separation across the surface, not one light reflected in one spot.
      </p>
    </div>
  `;
}
