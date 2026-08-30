import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A real icon font: Material Icons, declared at document level (a `@font-face`
 * inside a shadow root is ignored, so the kit could never have carried this) and
 * fetched only by a page that mounts this specimen. Both ways of addressing a
 * glyph are the font's own: the ligature mode puts the word `home` in the text
 * node and the font substitutes the drawing, the code point mode puts U+E88A
 * there and the font maps it.
 *
 * The failure row is not simulated either. It is the same two text nodes set in
 * the page's own sans, which is exactly what a reader sees when the icon font
 * does not arrive: the words in one mode, and whatever the fallback draws for a
 * private-use character in the other.
 */
const ICONS = "'Material Icons'";
const FALLBACK = "'Geist Variable', system-ui, sans-serif";

const GLYPHS = [
  { name: 'home', code: 'E88A' },
  { name: 'star', code: 'E838' },
  { name: 'delete', code: 'E872' },
];

const MODES: Record<string, { markup: string; glyph: (g: (typeof GLYPHS)[number]) => string; announced: string; verdict: string }> = {
  ligature: {
    markup: '<span class="material-icons">home</span>',
    glyph: (g) => g.name,
    announced: 'home star delete, read as words in the middle of the sentence around them',
    verdict: 'The text node holds a readable word and the font substitutes a drawing for it.',
  },
  codepoint: {
    markup: '<span class="material-icons">&#xE88A;</span>',
    glyph: (g) => `&#x${g.code};`,
    announced: 'nothing, or the name of a private use character no one else has a meaning for',
    verdict: 'The text node holds a private use character, which means this drawing to this font and nothing to anything else.',
  },
};

/**
 * Icon font specimen: three icons delivered as a run of text, addressed either by
 * ligature or by private-use code point. The segmented pick changes what is in the
 * text node, which changes nothing on screen and everything underneath it: what the
 * markup holds, what a reader sees if the font never arrives, and what a screen
 * reader is handed.
 *
 * The panel heading read "Icons as a run of text" and the failure exhibit was labelled
 * "if the font never loads": both were the site explaining the term inside the fiction, so
 * they are "Glyphs" and "Font unavailable", which is what a font inspector would print.
 *
 * The subject is the glyph run. An icon font names the type that draws those three
 * shapes, not the toolbar around them or the failure exhibits below, which are the
 * demo's own instrumentation and stay in the context register. Both addressing modes
 * are honestly the term, so no pose condition is needed. Each glyph is laid out in its
 * own box of one em, so the run is the same size whichever notation fills it, and the
 * failure row keeps a fixed height: switching modes moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = (g: (typeof GLYPHS)[number]) =>
    `<span data-part="glyph-${g.name}" style="display: inline-flex; width: 28px; height: 28px;
           align-items: center; justify-content: center; color: var(--sp-accent)">${g.name}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Glyphs</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Notation" data-part="segmented" data-value="ligature">
            <button class="sp-segment" data-part="seg-ligature" value="ligature">ligature</button>
            <button class="sp-segment" data-part="seg-codepoint" value="codepoint">code point</button>
          </sp-segmented>
        </div>
        <!-- A fixed height: the markup label is longer in one notation than the other and
             wraps to two lines in both, and a row that measured itself would move everything
             below it the day one of them wrapped to three (SPEC §5). -->
        <div class="sp-row" data-part="exhibit" data-mode="ligature"
             style="gap: 16px; margin-top: 12px; height: 36px; align-items: center">
          <span class="sp-row" data-part="glyphs" data-subject
                style="gap: 14px; font-family: ${ICONS}; font-size: 28px; line-height: 1">
            ${GLYPHS.map(cell).join('')}
          </span>
          <span class="sp-label sp-context sp-grow" data-part="markup"
                style="font-family: 'Geist Mono Variable', ui-monospace, monospace; font-size: 12px"></span>
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0 10px"></div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start">
          <div class="sp-stack" style="gap: 6px; flex: 0 0 178px">
            <span class="sp-label">Font unavailable</span>
            <span class="sp-row" data-part="failure"
                  style="gap: 12px; height: 24px; font-family: ${FALLBACK}; font-size: 13px"></span>
          </div>
          <!-- Three lines' room: the code point announcement is the longer of the two, and the
               shorter one must not let the caption below it move (SPEC §5). -->
          <p class="sp-text" data-stage-announce data-part="announced" style="margin: 0; font-size: 12px; height: 54px"></p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px"></p>
      </div>
    </div>
  `;

  const exhibit = part(root, 'exhibit');
  const markup = part(root, 'markup');
  const failure = part(root, 'failure');
  const announced = part(root, 'announced');
  const caption = part(root, 'caption');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    exhibit.dataset.mode = value;
    for (const glyph of GLYPHS) part(root, `glyph-${glyph.name}`).innerHTML = mode.glyph(glyph);
    markup.textContent = mode.markup;
    failure.innerHTML = GLYPHS.map((g) => `<span class="sp-text--ink">${mode.glyph(g)}</span>`).join('');
    announced.textContent = mode.announced;
    caption.textContent = mode.verdict;
  };

  apply('ligature');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
