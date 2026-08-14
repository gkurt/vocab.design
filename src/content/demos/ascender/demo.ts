/*
 * A serif with a pronounced difference between its capitals and its ascenders,
 * so the two upper rules land far enough apart to be told from each other. The
 * kit is sans-only on purpose (SPEC §5) and a specimen about a vertical metric
 * has to be set in a face whose metrics can be seen. Named families first,
 * generic last.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
/** No descenders, so the eye has only the upper metrics to compare. */
const WORD = 'Bookshelf';
const SIZE = 74;
/** The window's content width, so the ruling spans the specimen rather than the word. */
const RULE = 410;

/** Ratios of the em, used only if a browser withholds the ink box of a glyph. */
const FALLBACK = { asc: 0.75, cap: 0.69, x: 0.48 };

/**
 * How far the ink of one string rises above the baseline, in the face that
 * actually resolved. CSS can name two of these three lines (`1ex` and `1cap`)
 * and has no unit at all for the third, so all three are taken from one source
 * rather than two: the glyphs' own ink boxes, measured before anything is
 * written to the page. Nothing here reads layout, so no measurement follows a
 * style write (SPEC §5).
 */
function inkAbove(text: string, size: number): number {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return 0;
  ctx.font = `${size}px ${FAMILY}`;
  return ctx.measureText(text).actualBoundingBoxAscent || 0;
}

/**
 * Ascender specimen: one word, four rules. Solid is the baseline, dotted the top
 * of the lowercase, dashed where the capital stops, and the accent rule is where
 * `k`, `h`, `l` and `f` stop. The tinted band between the last two is the detail
 * worth the specimen: the ascenders finish above the capitals, not level with
 * them.
 *
 * The subject is the ruled word. An ascender is a distance between two lines, so
 * the narrowest thing that carries one is the sample with its rules on it;
 * ringing the window would claim the term names the whole comparison.
 */
export function mount(root: HTMLElement): void {
  const asc = inkAbove('bhkl', SIZE) || FALLBACK.asc * SIZE;
  const cap = inkAbove('H', SIZE) || FALLBACK.cap * SIZE;
  const x = inkAbove('x', SIZE) || FALLBACK.x * SIZE;
  const em = (px: number) => (px / SIZE).toFixed(2);

  const rule = (bottom: number, style: string) =>
    `<span style="position: absolute; left: 0; bottom: ${bottom}px; width: ${RULE}px; height: 0; border-top: ${style}"></span>`;

  /* Joined with no whitespace and opened flush against the word: at this size a
     stray text node between the carrier and the sample would indent the ruling
     by a whole word space and run it past the window. */
  const carrier =
    '<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">' +
    [
      `<span data-part="band" style="position: absolute; left: 0; bottom: ${cap}px; width: ${RULE}px;
             height: ${Math.max(asc - cap, 3)}px;
             background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`,
      rule(0, '1px solid var(--sp-line)'),
      rule(x, '1px dotted var(--sp-muted)'),
      rule(cap, '1px dashed var(--sp-muted)'),
      rule(asc, '1px solid var(--sp-accent)'),
    ].join('') +
    '</span>';

  /* Positioned, so the letters paint after the band rather than under it: an
     absolutely positioned box is drawn after every inline in its layer, whatever
     the source order, and an opaque band would otherwise swallow the ascenders it
     is there to measure. */
  const word = `<span style="position: relative">${WORD}</span>`;

  /** One key in the legend: a short line drawn in a rule's own style, and its name. */
  const key = (style: string, name: string) => `
    <span class="sp-row" style="gap: 6px">
      <span style="width: 20px; height: 0; border-top: ${style}"></span>
      <span class="sp-label">${name}</span>
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Where the lowercase stops</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${SIZE}px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: ${RULE}px;
                font-family: ${FAMILY}; font-size: ${SIZE}px; line-height: 1.3">${carrier}${word}</span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="legend" style="gap: 6px 14px; margin-top: 6px">
          ${key('1px solid var(--sp-line)', 'baseline')}
          ${key('1px dotted var(--sp-muted)', 'x-height')}
          ${key('1px dashed var(--sp-muted)', 'cap height')}
          ${key('1px solid var(--sp-accent)', 'ascender')}
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="metrics"
             style="margin-top: 8px; font-variant-numeric: tabular-nums">
          <span class="sp-label">ascender ${em(asc)}em</span>
          <span class="sp-label">cap height ${em(cap)}em</span>
          <span class="sp-label">x-height ${em(x)}em</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 6px">
          The tinted band is the whole point: the ascenders on k, h, l and f finish above the
          capital B rather than level with it.
        </p>
      </div>
    </div>
  `;
}
