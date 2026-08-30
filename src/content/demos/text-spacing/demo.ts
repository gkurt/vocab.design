import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The criterion's own four numbers, stated as multiples of the font size (WCAG 1.4.12). */
const SPACING = {
  off: {
    line: '1.25',
    letter: 'normal',
    word: 'normal',
    para: '0.4em',
    readout: 'None',
    caption: 'Both blocks hold the same words at the spacing the page shipped with.',
  },
  applied: {
    line: '1.5',
    letter: '0.12em',
    word: '0.16em',
    para: '2em',
    readout: 'line 1.5, letter 0.12, word 0.16, paragraph 2',
    caption: 'The tolerant block grows to fit. The fixed-height card beside it clips its last line: the mistake.',
  },
} as const;

type Mode = keyof typeof SPACING;

const COPY = ['Tide heights are metres above chart datum.'];

const TAIL = 'Spring tides run through Thursday.';

function block(kind: string): string {
  return `
    ${COPY.map((line) => `<p class="sp-text" data-part="${kind}-para" style="margin: 0; font-size: 12px">${line}</p>`).join('')}
    <p class="sp-text sp-text--ink" data-part="${kind === 'prose' ? 'tail' : 'twin-tail'}" style="margin: 0; font-size: 12px">${TAIL}</p>`;
}

/**
 * Text spacing specimen: the same two paragraphs in two boxes, with the reader's own
 * spacing switched on over both. The left block has no height of its own, so it takes the
 * room the looser setting needs and keeps every line. The right one was given a height in
 * pixels before the text arrived, and the last line goes under the edge.
 *
 * The subject is the tolerant block, the narrowest element the term names: not the window
 * around it and not the failing twin, which is the counter-example and is captioned as one.
 * The spacing control, the readout and the caption are scenery (SPEC §5).
 *
 * The two blocks used to be headed "No height of its own" and "Height fixed in pixels",
 * which annotated the demo's construction rather than printing anything a page would print.
 * They are gone: the verdict in the strip already says which block grew and which one clipped,
 * and a reader watching the last line disappear is watching the same thing. The readout beside
 * "Overrides applied" says "None" at rest, where it used to add "The page's own spacing."
 *
 * The row that holds both blocks keeps a fixed height from mount, tall enough for the
 * spaced-out version, so the subject grows into room that was already reserved and nothing
 * below it moves (SPEC §5). Paragraph spacing is written onto each paragraph rather than
 * through a sibling rule, since a demo has no stylesheet. Each segment reaches its own
 * state rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 464px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reader’s spacing" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-off" value="off">Page default</button>
            <button class="sp-segment" data-part="seg-applied" value="applied">1.4.12 values</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 12px; height: 132px; align-items: flex-start">
          <div class="sp-surface" data-part="prose" data-subject data-spacing="off"
               style="width: 208px; padding: 10px 12px; line-height: 1.25">${block('prose')}</div>
          <div class="sp-surface sp-context" data-part="twin"
               style="width: 208px; height: 100px; padding: 10px 12px; line-height: 1.25; overflow: hidden">${block('twin')}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Overrides applied</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="off"
                style="font-size: 12px; white-space: nowrap">${SPACING.off.readout}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="off"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${SPACING.off.caption}</p>
      </div>
    </div>
  `;

  const prose = part(root, 'prose');
  const twin = part(root, 'twin');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const groups = [
    [...partsOf(root, 'prose-para'), part(root, 'tail')],
    [...partsOf(root, 'twin-para'), part(root, 'twin-tail')],
  ];

  const apply = (mode: Mode) => {
    const spec = SPACING[mode];
    prose.dataset.spacing = mode;
    for (const box of [prose, twin]) {
      box.style.lineHeight = spec.line;
      box.style.letterSpacing = spec.letter;
      box.style.wordSpacing = spec.word;
    }
    // A first paragraph has nothing before it, so the spacing lands on every paragraph
    // that follows one, which is what "spacing following paragraphs" means.
    for (const group of groups) for (const [index, para] of group.entries()) para.style.marginTop = index === 0 ? '0' : spec.para;
    // The clipping is the twin's whole job, and it is stated rather than measured: the
    // fixed height was chosen for the tighter setting and cannot hold the looser one.
    flag(twin, 'data-clipped', mode === 'applied');
    readout.dataset.state = mode;
    readout.textContent = spec.readout;
    caption.dataset.case = mode;
    caption.textContent = spec.caption;
  };

  apply('off');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'applied' ? 'applied' : 'off');
  });
}
