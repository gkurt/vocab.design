import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * No icon font is loaded here, and one is not going to be: a specimen makes no
 * network requests (SPEC §5), and the kit's own faces carry letters. So the glyphs
 * below are the kit's SVG icons standing in for what an icon font would draw, and
 * the caption says so. Everything the specimen actually claims (what the markup
 * holds, what shows when the font never arrives, what a screen reader is handed) is
 * true of a real icon font and is shown rather than asserted.
 */
const GLYPHS = [
  { name: 'home', code: 'E88A', icon: 'inbox' as const },
  { name: 'star', code: 'E838', icon: 'star' as const },
  { name: 'delete', code: 'E872', icon: 'trash' as const },
];

const MODES: Record<string, { markup: string; failure: 'text' | 'tofu'; announced: string }> = {
  ligature: {
    markup: '<span class="icons">home</span>',
    failure: 'text',
    announced: 'home star delete, read as words in the middle of the sentence around them',
  },
  codepoint: {
    markup: '<span class="icons">&#xE88A;</span>',
    failure: 'tofu',
    announced: 'nothing, or the name of a private use character no one else has a meaning for',
  },
};

/**
 * Icon font specimen: three icons delivered as a run of text, addressed either by
 * ligature or by private-use code point. The segmented pick changes what is in the
 * text node, which changes nothing on screen and everything underneath it: what the
 * markup holds, what a reader sees if the font never arrives, and what a screen
 * reader is handed.
 *
 * The subject is the glyph run. An icon font names the type that draws those three
 * shapes, not the toolbar around them or the failure exhibits below, which are the
 * demo's own instrumentation and stay in the context register. Both addressing modes
 * are honestly the term, so no pose condition is needed; the failure row keeps a
 * fixed height so switching modes moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  /* A glyph is set at the size of the text it sits in, so the drawing is sized here
     rather than left at the kit icon's own 16px. */
  const cell = (g: (typeof GLYPHS)[number]) =>
    `<span data-part="glyph-${g.name}" style="display: inline-flex; width: 28px; height: 28px;
           align-items: center; justify-content: center; color: var(--sp-accent)">${icon(g.icon).replace('<svg ', '<svg style="width: 22px; height: 22px" ')}</span>`;

  const tofu = `<span style="display: inline-block; width: 15px; height: 20px; border: 1px solid var(--sp-muted)"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Icons as a run of text</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="ligature">
            <button class="sp-segment" data-part="seg-ligature" value="ligature">ligature</button>
            <button class="sp-segment" data-part="seg-codepoint" value="codepoint">code point</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="exhibit" data-mode="ligature" style="gap: 16px; margin-top: 12px">
          <span class="sp-row" data-part="glyphs" data-subject style="gap: 14px">
            ${GLYPHS.map(cell).join('')}
          </span>
          <span class="sp-label sp-context sp-grow" data-part="markup"
                style="font-family: 'Geist Mono Variable', ui-monospace, monospace; font-size: 12px"></span>
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0 10px"></div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start">
          <div class="sp-stack" style="gap: 6px; flex: 0 0 178px">
            <span class="sp-label">if the font never loads</span>
            <span class="sp-row" data-part="failure" style="gap: 12px; height: 24px; font-size: 13px"></span>
          </div>
          <div class="sp-stack sp-grow" style="gap: 6px">
            <span class="sp-label">a screen reader is handed</span>
            <!-- Three lines' room: the code point announcement is the longer of the two, and the
                 shorter one must not let the caption below it move (SPEC §5). -->
            <p class="sp-text" data-part="announced" style="margin: 0; font-size: 12px; height: 54px"></p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          The three shapes are the kit's own SVG icons standing in for a font's glyphs: this page loads
          no icon font, and a specimen should not pretend it did.
        </p>
      </div>
    </div>
  `;

  const exhibit = part(root, 'exhibit');
  const markup = part(root, 'markup');
  const failure = part(root, 'failure');
  const announced = part(root, 'announced');

  const apply = (value: string) => {
    const mode = MODES[value];
    if (!mode) return;
    exhibit.dataset.mode = value;
    markup.textContent = mode.markup;
    failure.innerHTML =
      mode.failure === 'text' ? GLYPHS.map((g) => `<span class="sp-text--ink">${g.name}</span>`).join('') : GLYPHS.map(() => tofu).join('');
    announced.textContent = mode.announced;
  };

  apply('ligature');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
