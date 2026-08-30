/**
 * Digital collage specimen: one pasted-up composition beside the three ingredients it is
 * made of. Torn photo fragments at mismatched scales, a halftone block cut from print, a
 * paper ground with grain in it, and type set at angles no grid would produce.
 *
 * The paint is inline because the torn edges, the grain and the halftone are the term. The
 * kit is flat, cool and clean-edged: it has no texture, no tear and no dot screen, so a
 * collage assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the composition, not the tour: the term names the assembled thing, and the
 * fragments on their own are just pictures (SPEC §5). The ingredient strip, the labels and
 * the caption are the scenery that makes the assembly legible.
 *
 * Three strings used to be the site talking inside the plate. The window was headed "Pasted
 * up, not laid out" and now carries the piece's own name; a line under the composition read
 * "Pieces overlap, scales disagree, nothing meets a grid.", which the composition shows and
 * the article says, so it went; and the halftone swatch was labelled "Halftone, cut from
 * print", which is a swatch label plus its justification, so only the swatch label is left.
 *
 * Every tear, angle and placement comes from a fixed hand-written table, and the grain
 * filter carries an explicit seed, so the specimen is identical on every identify run.
 * Static: a pasted-up page has no states, so there is nothing to animate and no clock.
 *
 * `data-loop="keep"`: nothing here holds state, so the pass ends at the mount state it began in, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
const PAPER = '#ece3d2';
const PASTE = '#f7f1e4';
const EDGE = '#cdbfa4';
const INK = '#241f1b';
const RED = '#c04630';

/** Cut-out letterforms come off a printed page, so the display type is a serif. */
const CUT = "Georgia, 'Times New Roman', serif";

const CW = 272;
const CH = 162;

/** Tear tables: how far each step along an edge wanders off the straight line. Hand
    written, walked in a fixed order, so no value is ever drawn at mount (LAW 14). */
const TEAR_PHOTO = [1.9, -2.6, 3.2, -1.1, 2.4, -3.1, 1.3, -2.2, 2.8, -1.7, 2.1, -2.9, 1.6, -1.4] as const;
const TEAR_DOTS = [2.4, -1.3, 1.7, -2.9, 3.0, -1.8, 2.2, -2.5, 1.4, -3.2, 2.7, -1.1] as const;
const TEAR_STRIP = [1.4, -2.1, 2.8, -1.5, 2.0, -2.7, 3.1, -1.2, 1.8, -2.4] as const;
/** Thirteen entries against eight steps a side: coprime, so no edge repeats another's phase. */
const TEAR_WIDE = [3.4, -1.1, 4.6, -2.6, 1.5, -3.9, 2.9, -1.3, 3.7, -2.2, 1.1, -4.3, 2.4] as const;

/**
 * A ragged rectangle: the perimeter walked in `per` steps a side, each corner of the walk
 * pushed off the true edge by the next number in the table. Cyclic and order-dependent,
 * which is exactly why the table is written out rather than generated.
 */
function torn(w: number, h: number, table: readonly number[], per = 5): string {
  const pts: string[] = [];
  let k = 0;
  const off = () => table[k++ % table.length] ?? 0;
  for (let i = 0; i <= per; i++) pts.push(`${((i / per) * w).toFixed(1)},${(-off()).toFixed(1)}`);
  for (let i = 1; i <= per; i++) pts.push(`${(w + off()).toFixed(1)},${((i / per) * h).toFixed(1)}`);
  for (let i = per - 1; i >= 0; i--) pts.push(`${((i / per) * w).toFixed(1)},${(h + off()).toFixed(1)}`);
  for (let i = per - 1; i >= 1; i--) pts.push(`${(-off()).toFixed(1)},${((i / per) * h).toFixed(1)}`);
  return `M${pts.join('L')}Z`;
}

/** One cut piece: the fill, then the ragged paper border struck along the same edge. */
function piece(part: string, place: string, w: number, h: number, table: readonly number[], fill: string, inner = ''): string {
  const d = torn(w, h, table);
  return `
    <g data-part="${part}" transform="${place}" style="filter: drop-shadow(2px 3px 2px rgb(45 33 20 / 0.32))">
      <path d="${d}" fill="${fill}"/>
      ${inner}
      <path d="${d}" fill="none" stroke="${PASTE}" stroke-width="5" stroke-linejoin="round"/>
    </g>`;
}

/** Grain and dot screen, scoped per SVG: an id in a shadow root is shared by everything in it. */
function defs(p: string): string {
  return `
    <defs>
      <filter id="${p}-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" seed="7"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <pattern id="${p}-dots" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="#ded5c3"/>
        <circle cx="2.5" cy="2.5" r="1.6" fill="${INK}"/>
      </pattern>
      <linearGradient id="${p}-photo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#5a7c95"/>
        <stop offset="1" stop-color="#1e2c39"/>
      </linearGradient>
      <linearGradient id="${p}-warm" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#dd9147"/>
        <stop offset="1" stop-color="#a8382a"/>
      </linearGradient>
    </defs>`;
}

/** One row of the ingredient strip: a swatch of the technique, then its name. */
function ingredient(part: string, label: string, body: string): string {
  return `
    <div class="sp-stack" style="gap: 3px; align-items: stretch">
      <svg data-part="${part}" viewBox="0 0 150 34" width="150" height="34" role="presentation" style="display: block; border-radius: 2px">
        ${body}
      </svg>
      <span class="sp-label" style="font-size: 11px; line-height: 1.2">${label}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const composition = `
    <svg viewBox="0 0 ${CW} ${CH}" width="${CW}" height="${CH}" role="presentation" style="display: block">
      ${defs('dc')}
      <rect width="${CW}" height="${CH}" fill="${PAPER}"/>
      <rect data-part="grain" width="${CW}" height="${CH}" filter="url(#dc-grain)" opacity="0.26"/>

      ${piece(
        'frag-photo',
        'translate(10 22) rotate(-5)',
        116,
        96,
        TEAR_PHOTO,
        'url(#dc-photo)',
        `<circle cx="40" cy="34" r="17" fill="#e8dcc4" opacity="0.85"/>
         <path d="M8 96 46 52l26 26 20-16 24 34Z" fill="#0f1a24" opacity="0.6"/>`,
      )}

      ${piece(
        'frag-dots',
        'translate(152 10) rotate(6)',
        92,
        66,
        TEAR_DOTS,
        'url(#dc-dots)',
        `<circle cx="46" cy="33" r="20" fill="${PASTE}" opacity="0.55"/>`,
      )}

      ${piece(
        'frag-strip',
        'translate(156 90) rotate(-9)',
        92,
        50,
        TEAR_STRIP,
        'url(#dc-warm)',
        `<rect x="10" y="14" width="34" height="22" fill="${INK}" opacity="0.55"/>
         <rect x="52" y="8" width="30" height="34" fill="${PASTE}" opacity="0.6"/>`,
      )}

      <g data-part="tab" transform="translate(104 84) rotate(8)">
        <rect width="58" height="19" fill="${RED}"/>
        <text x="7" y="14" font-size="11" font-weight="700" letter-spacing="1.4" fill="${PASTE}">MIXED</text>
      </g>

      <text data-part="headline" x="12" y="152" transform="rotate(-4 12 152)"
            font-family="${CUT}" font-size="32" font-weight="700" letter-spacing="-1" fill="${INK}">PASTE</text>

      <text data-part="hand" x="150" y="150" transform="rotate(3 150 150)"
            font-size="9.5" letter-spacing="0.6" fill="#5c5147">no. 14, cut &amp; laid down</text>
    </svg>`;

  const strip = `
    <div class="sp-stack sp-context" data-part="strip" style="flex: 0 0 150px; gap: 6px; align-items: stretch">
        ${ingredient(
          'ing-torn',
          'Torn edge',
          `<rect width="150" height="34" fill="${EDGE}" opacity="0.5"/>
           <g transform="translate(10 4)" style="filter: drop-shadow(1px 2px 1px rgb(45 33 20 / 0.3))">
             <path d="${torn(130, 26, TEAR_WIDE, 8)}" fill="#3b556b"/>
             <path d="${torn(130, 26, TEAR_WIDE, 8)}" fill="none" stroke="${PASTE}" stroke-width="4" stroke-linejoin="round"/>
           </g>`,
        )}
        ${ingredient(
          'ing-grain',
          'Paper grain',
          `${defs('dg')}
           <rect width="150" height="34" fill="${PAPER}"/>
           <rect width="150" height="34" filter="url(#dg-grain)" opacity="0.62"/>`,
        )}
        ${ingredient(
          'ing-dots',
          'Halftone',
          `${defs('dh')}
           <rect width="150" height="34" fill="url(#dh-dots)"/>
           <circle cx="42" cy="17" r="13" fill="${PASTE}" opacity="0.6"/>`,
        )}
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Collage no. 14</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div class="sp-stack" style="flex: 0 0 ${CW}px; gap: 5px; align-items: stretch">
            <div data-part="composition" data-subject style="width: ${CW}px; height: ${CH}px; overflow: hidden; border-radius: 2px">
              ${composition}
            </div>
            <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">The composition</span>
          </div>
          ${strip}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Assembled from found material, which is why the seams are left showing.
      </p>
    </div>
  `;
}
