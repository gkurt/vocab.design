/*
 * A serif with deep tails, so the letters that hang below the line are
 * unmistakable at this size. The kit is sans-only on purpose (SPEC §5) and a
 * specimen about a vertical metric has to be set in a face whose metrics can be
 * seen. Named families first, generic last.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
const WORD = 'Typography';
const SIZE = 64;
/** The window's content width, so the ruling spans the specimen rather than the word. */
const RULE = 410;
/** The clipped twin below: a box trimmed to a height the tails do not fit in. */
const TRIM = 22;
const ROOM = 32;
const TRIM_SIZE = 26;

/** Ratios of the em, used only if a browser withholds the ink box of a glyph. */
const FALLBACK = { desc: 0.22, x: 0.48 };

/**
 * How far the ink of one string reaches above or below the baseline, in the face
 * that actually resolved. CSS can name the lowercase line as `1ex` and has no
 * unit at all for the depth of a tail, so both rules are taken from one source
 * rather than two: the glyphs' own ink boxes, measured before anything is
 * written to the page. Nothing here reads layout, so no measurement follows a
 * style write (SPEC §5).
 */
function ink(text: string, size: number): { above: number; below: number } {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return { above: 0, below: 0 };
  ctx.font = `${size}px ${FAMILY}`;
  const m = ctx.measureText(text);
  return { above: m.actualBoundingBoxAscent || 0, below: m.actualBoundingBoxDescent || 0 };
}

/**
 * Descender specimen: one word, three rules. Solid is the baseline, dotted the
 * top of the lowercase, and the accent rule below the baseline is where the
 * tails of `y`, `p` and `g` stop. The tinted band between the baseline and that
 * rule is the depth the term names, and it is the room a line of text needs
 * under itself.
 *
 * Below, in the scenery, what happens when the box does not give that room: the
 * same word in a container trimmed shorter than the face draws, with the tails
 * cut off, beside a container that leaves them alone.
 *
 * The subject is the ruled word. A descender is a distance between two lines, so
 * the narrowest thing that carries one is the sample with its rules on it;
 * ringing the window would claim the term names the whole comparison.
 */
export function mount(root: HTMLElement): void {
  /* The tails this word actually has, so the rule lands on the deepest one drawn
     rather than on a `j` the specimen never shows. */
  const desc = ink('ypg', SIZE).below || FALLBACK.desc * SIZE;
  const x = ink('x', SIZE).above || FALLBACK.x * SIZE;

  const rule = (bottom: number, style: string) =>
    `<span style="position: absolute; left: 0; bottom: ${bottom}px; width: ${RULE}px; height: 0; border-top: ${style}"></span>`;

  /* Joined with no whitespace and opened flush against the word: at this size a
     stray text node between the carrier and the sample would indent the ruling
     by a whole word space and run it past the window. */
  const carrier =
    '<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">' +
    [
      `<span data-part="band" style="position: absolute; left: 0; bottom: ${-desc}px; width: ${RULE}px;
             height: ${Math.max(desc, 3)}px;
             background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`,
      rule(x, '1px dotted var(--sp-muted)'),
      rule(0, '1px solid var(--sp-line)'),
      rule(-desc, '1px solid var(--sp-accent)'),
    ].join('') +
    '</span>';

  /* Positioned, so the letters paint after the band rather than under it: an
     absolutely positioned box is drawn after every inline in its layer, whatever
     the source order, and an opaque band would otherwise swallow the tails it is
     there to measure. */
  const word = `<span style="position: relative">${WORD}</span>`;

  /** One key in the legend: a short line drawn in a rule's own style, and its name. */
  const key = (style: string, name: string) => `
    <span class="sp-row" style="gap: 6px">
      <span style="width: 20px; height: 0; border-top: ${style}"></span>
      <span class="sp-label">${name}</span>
    </span>`;

  /** One box of the scenery: the same word held to a stated height. */
  const box = (name: string, height: number, note: string) => `
    <div class="sp-stack" style="gap: 4px">
      <div data-part="${name}" style="width: 150px; height: ${height}px; overflow: hidden; padding: 0 8px;
           border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
        <span style="font-family: ${FAMILY}; font-size: ${TRIM_SIZE}px; line-height: ${height}px">Signage</span>
      </div>
      <span class="sp-label">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Where the letters hang</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${SIZE}px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: ${RULE}px;
                font-family: ${FAMILY}; font-size: ${SIZE}px; line-height: 1.3">${carrier}${word}</span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="legend" style="gap: 6px 14px">
          ${key('1px dotted var(--sp-muted)', 'x-height')}
          ${key('1px solid var(--sp-line)', 'baseline')}
          ${key('1px solid var(--sp-accent)', `descender, ${(desc / SIZE).toFixed(2)}em below it`)}
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-row sp-context" data-part="clipping" style="gap: 16px; align-items: flex-end">
          ${box('trimmed', TRIM, `height ${TRIM}px: the tails are cut`)}
          ${box('roomy', ROOM, `height ${ROOM}px: the tails survive`)}
        </div>
      </div>
    </div>
  `;
}
