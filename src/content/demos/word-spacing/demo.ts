import { displayScale } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A local serif, not the kit's web font. The gaps are tinted where the browser
 * actually put them, and a face still arriving would rebreak the column a frame
 * after that measurement and leave the tints beside the spaces they were drawn
 * from. Named families first, generic last.
 */
const FAMILY = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";

const BODY =
  'Justification stretches the spaces between the words until every line reaches both margins, so a ' +
  'narrow column ends up with gaps much wider than the ones the type designer drew, and the eye begins ' +
  'to join them up.';

const COLUMN = 262;
const LINE = 20;
/** Room for the loosest setting, so a rebreak cannot move the caption (SPEC §5). */
const LINES = 7;

const STEPS: Record<string, { css: string; value: string; note: string }> = {
  normal: { css: 'word-spacing: normal', value: 'normal', note: 'The spaces are the ones the face was drawn with.' },
  wide: { css: 'word-spacing: 0.15em', value: '0.15em', note: 'Every gap widens by the same amount, and the lines rebreak.' },
  wider: { css: 'word-spacing: 0.3em', value: '0.3em', note: 'Wide enough that gaps on neighbouring lines start to line up.' },
};

type Gap = { left: number; top: number; width: number };

/**
 * Every word space in the column, where the browser actually put it. The
 * paragraph carries `transition: none` inline, so the property written a line
 * earlier is the property being measured here rather than one still on its way
 * (SPEC §5); nothing in the kit transitions `word-spacing`, and the inline
 * declaration says so out loud rather than trusting that.
 */
function gaps(column: HTMLElement): Gap[] {
  const node = column.firstChild;
  if (!(node instanceof Text)) return [];
  const origin = column.getBoundingClientRect();
  // The gaps are tinted by writing lengths, so they are measured as the specimen's own
  // pixels rather than as the page's (SPEC §5). A Range has no offsetParent to measure
  // against, which is why this is the scale rather than `localBox`.
  const scale = displayScale(column);
  const range = document.createRange();
  const found: Gap[] = [];
  for (let i = 0; i < node.data.length; i++) {
    if (node.data[i] !== ' ') continue;
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    const rect = range.getBoundingClientRect();
    const width = rect.width / scale;
    // A space that fell at a line break collapses to nothing and is not a gap.
    if (width < 2) continue;
    found.push({
      left: (rect.left - origin.left) / scale,
      top: Math.round((rect.top - origin.top) / scale / LINE) * LINE,
      width,
    });
  }
  return found;
}

/**
 * Word spacing specimen: one justified paragraph at a narrow measure, with every
 * word space tinted where the browser put it, so the gaps read as a shape rather
 * than as absence. The segmented control picks an absolute amount rather than
 * flipping one, and each pick states the declaration it made and the average gap
 * it produced.
 *
 * The subject is the paragraph whose spaces change. Word spacing is a property of
 * set text, so the narrowest honest ring is the block that carries it; the tints,
 * the declaration and the note beside it are the demo's own instrumentation
 * (SPEC §5) and stay in the context register. The paragraph has word spacing in
 * every state, so it is the term wherever a pass is picked up.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Justified, three ways</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Spacing" data-part="segmented" data-value="normal">
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
            <button class="sp-segment" data-part="seg-wide" value="wide">wide</button>
            <button class="sp-segment" data-part="seg-wider" value="wider">wider</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 10px; align-items: flex-start">
          <div style="position: relative; width: ${COLUMN}px; height: ${LINE * LINES}px">
            <div data-part="tints" style="position: absolute; inset: 0; pointer-events: none"></div>
            <p class="sp-text sp-text--ink" data-part="paragraph" data-subject data-spacing="normal"
               style="position: relative; margin: 0; font-family: ${FAMILY}; font-size: 13px; line-height: ${LINE}px;
                      text-align: justify; transition: none">${BODY}</p>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; width: 132px">
            <!-- Two lines' room for the declaration and four for the note, so a shorter
                 string cannot pull what is under it upwards (SPEC §5). -->
            <span class="sp-label" data-part="css" style="color: var(--sp-ink); height: 34px"></span>
            <span class="sp-label" data-part="measured" style="height: 18px;
                  font-variant-numeric: tabular-nums"></span>
            <p class="sp-text" data-part="note" style="margin: 0; font-size: 12px; height: 72px"></p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          The tint is the gap itself. Justification has to put the slack somewhere, and the word space is
          the only thing on the line that gives.
        </p>
      </div>
    </div>
  `;

  const paragraph = part(root, 'paragraph');
  const tints = part(root, 'tints');

  const apply = (value: string) => {
    const step = STEPS[value];
    if (!step) return;
    paragraph.dataset.spacing = value;
    paragraph.style.wordSpacing = step.value;

    const found = gaps(paragraph);
    tints.innerHTML = found
      .map(
        (gap) => `<span style="position: absolute; left: ${gap.left}px; top: ${gap.top}px; width: ${gap.width}px;
                  height: ${LINE}px; background: color-mix(in oklab, var(--sp-accent) 24%, transparent)"></span>`,
      )
      .join('');

    const average = found.length > 0 ? found.reduce((sum, gap) => sum + gap.width, 0) / found.length : 0;
    part(root, 'css').textContent = step.css;
    part(root, 'measured').textContent = `gaps ${average.toFixed(1)}px on average`;
    part(root, 'note').textContent = step.note;
  };

  apply('normal');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
