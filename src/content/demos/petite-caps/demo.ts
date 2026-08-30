/*
 * Measured in the browser before anything was drawn, at 200px, on every face this
 * page can reach: `font-variant-caps: petite-caps` renders pixel for pixel like
 * `small-caps` in all of them, so the real request is honoured nowhere and a pane
 * asking for it would be a duplicate of the pane beside it.
 *
 * Avenir Next is the face because it is one of the few here carrying a REAL
 * small-caps set rather than a synthesised one (its small cap is 106.2 units
 * against a 93.6 x-height and a 141.6 cap height at 200px, where a browser's own
 * synthesis would be a flat 0.7 of cap height). So the middle sample is the
 * font's own drawings, sitting 13% above the x-height rule, and only the petite
 * sample is drawn: capitals at a reduced size, tracked out, the size chosen so
 * their cap height lands exactly on the x-height.
 */
const FACE = "'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif";
const SIZE = 48;
/**
 * Cap height as a fraction of the em for this face (141.6/200, read off the loaded
 * file). A capital set at `1ex / CAP_RATIO` therefore has a cap height of exactly
 * one x-height, whatever x-height the face in effect actually has: the `ex` keeps
 * the drawing honest if a reader's machine falls back to another family.
 */
const CAP_RATIO = 0.708;
const WORD = 'OAK';
/** A guide the stage can read is a box, never a hairline (SPEC §8). */
const RULE = 2;
/** The row's inner width, which the guides span. */
const SPAN = 404;

type Sample = { part: string; label: string; width: number; html: string };

const petite = `<span data-part="petite-glyphs" style="font-size: calc(1ex / ${CAP_RATIO}); letter-spacing: 0.04em">${WORD}</span>`;

const SAMPLES: Sample[] = [
  { part: 'lower', label: 'lowercase', width: 92, html: WORD.toLowerCase() },
  { part: 'caps', label: 'caps', width: 116, html: WORD },
  { part: 'small', label: 'small caps', width: 100, html: `<span style="font-variant-caps: all-small-caps">${WORD}</span>` },
  { part: 'petite', label: 'petite caps', width: 96, html: petite },
];

/**
 * Petite caps specimen: the same three letters four ways on one baseline, ruled at
 * the two heights that decide the argument. The lowercase sample says where the
 * x-height rule comes from, the capitals reach the cap rule, the face's own small
 * caps clear the x-height rule by a little, and the petite capitals stop on it.
 * The term is that last alignment, which is why the rules are drawn rather than
 * described: a claim about a height is only readable against a line.
 *
 * The whole claim is visible at rest, so the choreography is a still one (SPEC §8):
 * there is no second state here, only four drawings of one word that have to be
 * looked at side by side.
 *
 * The subject is the petite-caps run (SPEC §5), the narrowest element the term
 * names: not the comparison, not the rules, and not the label under it. The other
 * three samples, the rules, the labels and the caption are the demo's own
 * instrumentation and stay in the context register.
 *
 * A chip under the row once read "the small caps clear the x-height rule, the
 * petite caps stop on it", and the header called the sheet "Avenir Next, one word,
 * four heights". Both were the site reading the drawing out loud inside a specimen
 * sheet that would only ever print the face and the property, so the chip went and
 * the header now names the face and its size. The article makes the same point.
 *
 * Nothing is measured at runtime. The rules are hung off a zero-height carrier
 * whose bottom edge inline layout puts on the baseline, and they are placed by the
 * font's own `ex` and `cap` units (with an em approximation first, for a browser
 * that does not know `cap`), so the ruling is the face's answer rather than the
 * demo's guess.
 */
export function mount(root: HTMLElement): void {
  const guide = (name: string, bottom: string, color: string) =>
    `<span data-part="${name}" style="position: absolute; left: 0; width: ${SPAN}px; height: ${RULE}px; ${bottom}; background: ${color}"></span>`;

  /* No whitespace between the cells: at this size an inter-word space would add
     twelve pixels between every pair and push the row past its window. */
  const sample = ({ part: name, width, html }: Sample) =>
    `<span data-part="cell-${name}" style="display: inline-block; width: ${width}px; vertical-align: baseline"` +
    `><span data-part="run-${name}"${name === 'petite' ? ' data-subject' : ''}>${html}</span></span>`;

  /* The carrier holds nothing in flow: any whitespace inside it would open a line
     box and take its baseline off the text's own, which is where the rules hang. */
  const rules =
    guide('rule-cap', 'bottom: calc(0.708em - 1px); bottom: calc(1cap - 1px)', 'color-mix(in oklab, var(--sp-accent) 55%, transparent)') +
    guide('rule-x', 'bottom: calc(1ex - 1px)', 'color-mix(in oklab, var(--sp-ink) 34%, transparent)');

  const caption = ({ part: name, label, width }: Sample) =>
    `<span class="sp-label" data-part="label-${name}" style="display: inline-block; width: ${width}px">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-caps</span>
          <span class="sp-label">Avenir Next 48</span>
        </div>
        <div data-part="samples" style="position: relative; height: 82px; margin-top: 14px; font-family: ${FACE};
             font-size: ${SIZE}px; line-height: 1.1">
          <span style="position: absolute; left: 0; bottom: 10px; width: ${SPAN}px"><i class="sp-context" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${rules}</i>${SAMPLES.map(sample).join('')}</span>
        </div>
        <div class="sp-context" data-part="labels" style="white-space: nowrap; font-size: 0">${SAMPLES.map(caption).join('')}</div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          No browser here honours petite-caps: it renders as small caps. So the middle sample is this face's own
          small-caps set and the petite one is drawn, capitals reduced until their cap height is the x-height.
        </p>
      </div>
    </div>
  `;
}
