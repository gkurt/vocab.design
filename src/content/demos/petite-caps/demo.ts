/*
 * Real petite capitals, from a file that has them. `pcap` is the rarest thing in
 * this corner of OpenType: measured against every face this site loads and nine
 * more from Google's library, not one answers the request, and a browser given
 * nothing to answer with substitutes the small-caps set silently. Junicode does
 * answer it, so it is vendored and cut down to 25KB (`src/fonts/README.md`), and
 * the third and fourth samples below are two different sets of drawings rather
 * than one set drawn twice.
 *
 * Which is the whole reason this file changed. The specimen used to draw its own
 * petite capitals by shrinking the caps, and print a line under them saying so.
 * A reader does not want to be told the picture is a stand-in, and does not want
 * a paragraph about `pcap` availability either. They want to see the letters.
 */
const FACE = "'Junicode', 'Source Serif 4 Variable', Georgia, serif";
const SIZE = 42;
/** A guide the stage can read is a box, never a hairline (SPEC §8). */
const RULE = 2;
/** The window's inner width, which the guides span. */
const SPAN = 404;

const WORD = 'oak';

type Sample = { part: string; label: string; text: string; caps: string; width: number };

/** Each column is set to its own sample's width at this size, and they total the span. */
const SAMPLES: Sample[] = [
  { part: 'lower', label: 'lowercase', text: WORD, caps: 'normal', width: 96 },
  { part: 'caps', label: 'caps', text: WORD.toUpperCase(), caps: 'normal', width: 112 },
  { part: 'small', label: 'small caps', text: WORD, caps: 'small-caps', width: 98 },
  { part: 'petite', label: 'petite caps', text: WORD, caps: 'petite-caps', width: 98 },
];

/**
 * Petite caps specimen: one word four ways on one baseline, ruled at the two
 * heights that decide the argument. The lowercase sample says where the x-height
 * rule comes from, the capitals reach the cap rule, the face's own small caps
 * clear the x-height rule by a little, and the petite capitals stop exactly on
 * it. That last alignment is the term, which is why the rules are drawn rather
 * than described: a claim about a height is only readable against a line.
 *
 * The whole claim is visible at rest, so the choreography is a still one (SPEC §8):
 * there is no second state here, only four drawings of one word that have to be
 * looked at side by side. For the same reason the strip is empty: there is no mode
 * switch to label and no state to read out, and a sentence in the author's voice
 * hung under a picture that already makes the point is worth nothing to a reader.
 *
 * The subject is the petite-caps run (SPEC §5), the narrowest element the term
 * names: not the comparison, not the rules, and not the label under it. The other
 * three samples, the rules and the labels are the demo's own instrumentation and
 * stay in the context register.
 *
 * Nothing is measured at runtime. The rules are hung off a zero-height carrier
 * whose bottom edge inline layout puts on the baseline, and they are placed by the
 * font's own `ex` and `cap` units (with an em approximation first, for a browser
 * that does not know `cap`), so the ruling is the face's answer rather than the
 * demo's guess: Junicode reports a cap height of 0.663em and an x-height of
 * 0.418em, and both agree with its own drawings to within a third of a pixel at
 * 100px.
 */
export function mount(root: HTMLElement): void {
  const guide = (name: string, bottom: string, color: string) =>
    `<span data-part="${name}" style="position: absolute; left: 0; width: ${SPAN}px; height: ${RULE}px; ${bottom}; background: ${color}"></span>`;

  /* No whitespace between the cells: at this size an inter-word space would add
     twelve pixels between every pair and push the row past its window. Each run is
     positioned so it paints over the guides: a rule at full strength across a line of
     type reads as a strikethrough rather than as a height. */
  const sample = ({ part: name, text, caps, width }: Sample) =>
    `<span data-part="cell-${name}" style="display: inline-block; width: ${width}px; vertical-align: baseline"` +
    `><span data-part="run-${name}"${name === 'petite' ? ' data-subject' : ''} style="position: relative; font-variant-caps: ${caps}">${text}</span></span>`;

  /* The carrier holds nothing in flow: any whitespace inside it would open a line
     box and take its baseline off the text's own, which is where the rules hang. */
  const rules =
    guide('rule-cap', 'bottom: calc(0.663em - 1px); bottom: calc(1cap - 1px)', 'color-mix(in oklab, var(--sp-accent) 35%, transparent)') +
    guide('rule-x', 'bottom: calc(1ex - 1px)', 'color-mix(in oklab, var(--sp-ink) 22%, transparent)');

  const caption = ({ part: name, label, width }: Sample) =>
    `<span class="sp-label" data-part="label-${name}" style="display: inline-block; width: ${width}px">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-caps</span>
          <span class="sp-label">Junicode 42</span>
        </div>
        <div data-part="samples" style="position: relative; height: 82px; margin-top: 14px; font-family: ${FACE};
             font-size: ${SIZE}px; line-height: 1.1">
          <span style="position: absolute; left: 0; bottom: 10px; width: ${SPAN}px"><i class="sp-context" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${rules}</i>${SAMPLES.map(sample).join('')}</span>
        </div>
        <div class="sp-context" data-part="labels" style="white-space: nowrap; font-size: 0">${SAMPLES.map(caption).join('')}</div>
      </div>
    </div>
  `;
}
