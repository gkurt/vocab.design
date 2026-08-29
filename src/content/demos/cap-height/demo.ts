/*
 * A serif with an unmistakable capital, so the three lines land far enough apart
 * to be told from each other at this size. The kit is sans-only on purpose
 * (SPEC §5) and a specimen about a vertical metric has to be set in a face whose
 * metrics can be seen. Named families first, generic last.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";
const WORD = 'Hamburg';
const SIZE = 46;
/** The window's content width, so the ruling spans the specimen rather than the word. */
const RULE = 258;

/*
 * Every cap-derived length is written twice, an em approximation first and the
 * `cap` unit second, so a browser that does not know the unit drops the second
 * declaration and still draws the specimen near enough to read.
 */
const CAP_TOP = 'bottom: 0.7em; bottom: 1cap';
const CAP_BOX = 'width: 0.7em; height: 0.7em; width: 1cap; height: 1cap';
const EM_BOX = 'width: 1em; height: 1em';

/**
 * Cap height specimen: one word, three rules. The solid line is the baseline the
 * word sits on, the dotted line is the top of the lowercase, and the dashed line
 * is where the capital H stops. The distance from the solid line up to the
 * dashed one is the term.
 *
 * Nothing is measured in script. A zero-height inline-block lands its own bottom
 * edge on the baseline by inline layout, and `1cap` and `1ex` inside it resolve
 * to the face's own metrics, so the ruling is the font's answer rather than the
 * demo's guess and no read follows a style write (SPEC §5).
 *
 * Below, in the scenery, the consequence: a square sized to the cap height stops
 * level with the capital beside it, and the same square sized to the em box
 * towers over it.
 *
 * The subject is the ruled word. A cap height is a distance between two lines,
 * so the narrowest thing that carries one is the sample with its rules on it;
 * ringing the window would claim the term names the whole comparison.
 */
export function mount(root: HTMLElement): void {
  const rule = (bottom: string, style: string) =>
    `<span style="position: absolute; left: 0; ${bottom}; width: ${RULE}px; height: 0; border-top: ${style}"></span>`;

  /* Joined with no whitespace and opened flush against the word: at this font
     size a stray text node between the carrier and the sample would indent the
     ruling by a whole word space and run it past the window. */
  const carrier =
    '<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">' +
    [
      rule('bottom: 0', '1px solid var(--sp-line)'),
      rule('bottom: 1ex', '1px dotted var(--sp-muted)'),
      rule(CAP_TOP, '1px dashed var(--sp-accent)'),
    ].join('') +
    '</span>';

  /** One line of the scenery: a square of the given size beside a capitalised word. */
  const aligned = (name: string, box: string, note: string) => `
    <div class="sp-row sp-row--between" data-part="${name}" style="height: 32px">
      <span style="font-family: ${FAMILY}; font-size: 22px; line-height: 1.2; white-space: nowrap">
        <span class="sp-swatch" style="display: inline-block; vertical-align: baseline; border-radius: 2px;
              ${box}; --sp-swatch: var(--sp-accent)"></span>&#8202;Filters
      </span>
      <span class="sp-label">${note}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One word, three rules</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${SIZE}px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 4px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: ${RULE}px;
                font-family: ${FAMILY}; font-size: ${SIZE}px; line-height: 1.25">${carrier}${WORD}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Solid: the baseline. Dotted: the lowercase. Dashed: where the capital stops.
        </p>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-stack sp-context" data-part="alignment" style="gap: 4px">
          ${aligned('cap-aligned', CAP_BOX, 'sized to cap height')}
          ${aligned('em-aligned', EM_BOX, 'sized to the em box')}
        </div>
      </div>
    </div>
  `;
}
