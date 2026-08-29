/**
 * New Wave specimen: the same poster set twice, once in the Swiss register the style came out
 * of and once in Weingart's, so the break reads as the argument it is rather than as mess. The
 * Swiss copy hides its grid; the New Wave copy draws the very same columns and then walks off
 * them, with rules that step in weight, a display word letterspaced until it comes apart and
 * lifted off its own baseline letter by letter, weights mixed inside that word, a line set at
 * an angle, a coarse halftone field, text reversed out of a bar, and one hot accent.
 *
 * The grid guides are drawn at 2px on purpose: the stage reads a thinner box as absent, so a
 * hairline column rule would be a claim nothing could check.
 *
 * The paint is inline because the tracking, the stepped weights and the angle are the term.
 * The kit has one type scale, one accent, no rotation and no tracking control, so a New Wave
 * poster assembled from kit tokens would be demonstrating the kit.
 *
 * The subject is the New Wave poster, not the pair and not the Swiss copy: the term names the
 * composition (SPEC §5). The Swiss version, the labels and the caption are the scenery that
 * makes the break legible.
 *
 * Static: a printed poster has no states, so there is nothing to animate and no clock to take.
 *
 * A printed poster's pass ends at its mount state, so the tree persists across attract
 * iterations (`data-loop="keep"`).
 */
const PAPER = '#f2f1ec';
const INK = '#141414';
const HOT = '#ff3b1f';
const GUIDE = '#d5d2c9';
const W = 212;
const H = 168;

/** A coarse dot screen, enlarged past legibility: texture, grey and a nod to print at once. */
const HALFTONE = 'radial-gradient(circle at 50% 50%, rgb(20 20 20 / 0.66) 0 1.2px, transparent 1.5px)';

/** The four columns the Swiss copy obeys silently and the New Wave copy puts on show. */
const COLUMNS = [14, 62, 110, 158];

/** Rules that change weight in stages across the page: the signature Weingart move. */
const STAIR = [
  { top: 16, left: 14, width: 132, height: 2 },
  { top: 24, left: 24, width: 122, height: 4 },
  { top: 36, left: 34, width: 112, height: 7 },
  { top: 52, left: 44, width: 102, height: 11 },
];

/** The display word, letterspaced apart and lifted off its own baseline letter by letter. */
const DISPLAY = [
  { char: 'T', dy: 0, weight: 800, hot: false },
  { char: 'Y', dy: -9, weight: 300, hot: false },
  { char: 'P', dy: 5, weight: 800, hot: false },
  { char: 'O', dy: -4, weight: 500, hot: true },
];

function halftone(part: string, place: string, size: string): string {
  return `
    <span data-part="${part}" aria-hidden="true"
          style="position: absolute; ${place}; ${size}; background-color: #cbc7bd;
                 background-image: ${HALFTONE}; background-size: 4px 4px"></span>`;
}

function poster(part: string, inner: string, mark = ''): string {
  return `
    <span data-part="${part}"${mark}
          style="position: relative; display: block; width: ${W}px; height: ${H}px; overflow: hidden; background: ${PAPER};
                 color: ${INK}">
      ${inner}
    </span>`;
}

function column(label: string, note: string, body: string, quiet: boolean): string {
  return `
    <div class="sp-stack${quiet ? ' sp-context' : ''}" style="flex: 0 0 ${W}px; gap: 5px; align-items: stretch">
      ${body}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${label}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">${note}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const guides = COLUMNS.map(
    (x) =>
      `<span aria-hidden="true" style="position: absolute; left: ${x}px; top: 0; width: 2px; height: 100%; background: ${GUIDE}"></span>`,
  ).join('');

  const stair = STAIR.map(
    (r) =>
      `<span aria-hidden="true" style="position: absolute; left: ${r.left}px; top: ${r.top}px; width: ${r.width}px; height: ${r.height}px; background: ${INK}"></span>`,
  ).join('');

  const letters = DISPLAY.map(
    (l) =>
      `<span style="display: inline-block; translate: 0 ${l.dy}px; font-weight: ${l.weight}; color: ${l.hot ? HOT : INK}">${l.char}</span>`,
  ).join('');

  const wave = `
    <span data-part="guides" aria-hidden="true" style="position: absolute; inset: 0">${guides}</span>
    <span data-part="stair" aria-hidden="true" style="position: absolute; inset: 0">${stair}</span>
    ${halftone('halftone', 'right: 8px; top: 10px', 'width: 56px; height: 52px; rotate: 6deg')}

    <span data-part="display"
          style="position: absolute; left: 10px; top: 74px; font-size: 42px; line-height: 1; letter-spacing: 0.2em">
      ${letters}
    </span>

    <span aria-hidden="true" style="position: absolute; left: 14px; top: 118px; width: 118px; height: 5px; background: ${HOT}"></span>

    <span data-part="angled"
          style="position: absolute; left: 16px; top: 142px; font-size: 10px; font-weight: 500; letter-spacing: 0.34em;
                 line-height: 1.2; rotate: -13deg; transform-origin: left center">
      BASEL 72
    </span>

    <span data-part="reversed"
          style="position: absolute; right: 10px; bottom: 12px; display: block; padding: 4px 9px 5px; background: ${INK};
                 color: ${PAPER}; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; line-height: 1.2">
      NEW WAVE
    </span>`;

  const swiss = `
    <span data-part="swiss-head"
          style="position: absolute; left: 14px; top: 18px; font-size: 42px; font-weight: 600; letter-spacing: 0;
                 line-height: 1">
      TYPO
    </span>
    <span aria-hidden="true" style="position: absolute; left: 14px; top: 74px; width: 184px; height: 2px; background: ${INK}"></span>
    ${halftone('swiss-halftone', 'left: 14px; top: 86px', 'width: 84px; height: 62px')}
    <span data-part="swiss-caption"
          style="position: absolute; left: 110px; top: 86px; width: 88px; font-size: 10px; line-height: 1.5">
      One family, one rule weight, everything flush to the same column.
    </span>
    <span aria-hidden="true" style="position: absolute; left: 14px; top: 156px; width: 184px; height: 2px; background: ${INK}"></span>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">The grid, shown and then broken</span>

        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${column('Swiss', 'Obeyed, so the grid disappears.', poster('poster-swiss', swiss), true)}
          ${column('New Wave', 'Drawn, then walked off.', poster('poster', wave, ' data-subject'), false)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A violation needs something to violate.
      </p>
    </div>
  `;
}
