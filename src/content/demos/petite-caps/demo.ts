import { part } from '#src/kit/parts.ts';

/*
 * Nothing here is drawn: every sample is a real request, made of the face this
 * site already loads, and the specimen reports what the reader's own browser did
 * with it. That reporting is the point. `pcap` is the one feature in this corner
 * of the vocabulary that essentially no font ships, and the specified answer to a
 * missing `pcap` is the small-caps set, so the honest demonstration is the two
 * requests side by side plus a verdict that says whether they came back the same.
 *
 * Which is also why the verdict is measured rather than written. "No browser here
 * honours petite-caps" was true of the machine this was authored on and said
 * nothing about the machine it is read on; comparing the two runs at mount says
 * something about the machine it is read on and nothing else.
 */
const FACE = "'Source Serif 4 Variable', Georgia, serif";
const SIZE = 42;
/** A guide the stage can read is a box, never a hairline (SPEC §8). */
const RULE = 2;
/** The window's inner width, which the guides span. */
const SPAN = 404;
/** Each column is set to its own sample's width at this size, and they total the span. */

const WORD = 'oak';

type Sample = { part: string; label: string; text: string; caps: string; width: number };

const SAMPLES: Sample[] = [
  { part: 'lower', label: 'lowercase', text: WORD, caps: 'normal', width: 96 },
  { part: 'caps', label: 'caps', text: WORD.toUpperCase(), caps: 'normal', width: 112 },
  { part: 'small', label: 'small caps', text: WORD, caps: 'small-caps', width: 98 },
  { part: 'petite', label: 'petite caps', text: WORD, caps: 'petite-caps', width: 98 },
];

const VERDICT = {
  same: 'The petite request came back drawn exactly like the small-caps one: this face has no pcap set, and the substitution the spec asks for is the one on screen.',
  distinct: 'The petite request came back shorter than the small-caps one, so this face answered with a real pcap set of its own.',
} as const;

/**
 * Petite caps specimen: the same three letters four ways on one baseline, ruled at
 * the two heights that decide the argument. The lowercase sample says where the
 * x-height rule comes from, the capitals reach the cap rule, and the last two are
 * the same word asking for small caps and for petite caps. The term is where the
 * petite drawing should stop, which is why the rules are drawn rather than
 * described: a claim about a height is only readable against a line.
 *
 * The whole claim is visible at rest, so the choreography is a still one (SPEC §8):
 * there is no second state here, only four drawings of one word that have to be
 * looked at side by side.
 *
 * The subject is the petite-caps run (SPEC §5), the narrowest element the term
 * names: not the comparison, not the rules, and not the label under it. The other
 * three samples, the rules, the labels and the verdict are the demo's own
 * instrumentation and stay in the context register.
 *
 * A chip under the row once read "the small caps clear the x-height rule, the
 * petite caps stop on it", and the header called the sheet "Avenir Next, one word,
 * four heights". Both were the site reading the drawing out loud inside a specimen
 * sheet that would only ever print the face and the property, so the chip went and
 * the header now names the face and its size.
 *
 * The one measurement is taken at mount, on the state that is mounted, and it is a
 * comparison of two runs against each other rather than against a number, so it is
 * free of the stage's scale (SPEC §5). The rules are hung off a zero-height carrier
 * whose bottom edge inline layout puts on the baseline, and they are placed by the
 * font's own `ex` and `cap` units (with an em approximation first, for a browser
 * that does not know `cap`), so the ruling is the face's answer rather than the
 * demo's guess.
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
    guide('rule-cap', 'bottom: calc(0.67em - 1px); bottom: calc(1cap - 1px)', 'color-mix(in oklab, var(--sp-accent) 35%, transparent)') +
    guide('rule-x', 'bottom: calc(1ex - 1px)', 'color-mix(in oklab, var(--sp-ink) 22%, transparent)');

  const caption = ({ part: name, label, width }: Sample) =>
    `<span class="sp-label" data-part="label-${name}" style="display: inline-block; width: ${width}px">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-caps</span>
          <span class="sp-label">Source Serif 4, 42</span>
        </div>
        <div data-part="samples" style="position: relative; height: 82px; margin-top: 14px; font-family: ${FACE};
             font-size: ${SIZE}px; line-height: 1.1">
          <span style="position: absolute; left: 0; bottom: 10px; width: ${SPAN}px"><i class="sp-context" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${rules}</i>${SAMPLES.map(sample).join('')}</span>
        </div>
        <div class="sp-context" data-part="labels" style="white-space: nowrap; font-size: 0">${SAMPLES.map(caption).join('')}</div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px"></p>
      </div>
    </div>
  `;

  /* Two runs of the same word in the same face at the same size: if the browser
     answered both requests with the same drawings, they are the same width. The
     comparison is a ratio of the two boxes rather than a distance in pixels, because
     a stage showing this specimen at half size would halve any gap between them and
     a threshold in px would quietly move with it (SPEC §5). */
  const petite = part(root, 'run-petite').getBoundingClientRect().width;
  const small = part(root, 'run-small').getBoundingClientRect().width;
  const apart = Math.abs(petite - small) / Math.max(petite, small, 1);
  part(root, 'caption').textContent = apart < 0.005 ? VERDICT.same : VERDICT.distinct;
}
