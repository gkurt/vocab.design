import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Three lines fit above the fold; the rest are what makes the page long. */
const SHORT = 3;
const LINES = [94, 86, 72, 90, 82, 96, 78, 88, 74, 92, 84, 68];

/**
 * Sticky footer specimen: a page in a scroller of its own, whose footer sits on
 * the bottom edge while the content is short and returns to the end of the
 * document once the content outgrows the viewport.
 *
 * The subject is the footer rather than the wrapper. The technique is spread
 * across both, but the word names the footer, and pointing at the wrapper would
 * claim the whole page is the term and withdraw identify (SPEC §5 to §6).
 *
 * `data-mode` is read from geometry rather than from the control that was
 * clicked: what the choreography has to prove is that the footer is held against
 * the bottom edge, and only the boxes themselves can say so.
 */
export function mount(root: HTMLElement): void {
  const lines = LINES.map(
    (width, index) => `<div class="sp-line" data-part="line-${index + 1}" style="width: ${width}%"${index < SHORT ? '' : ' hidden'}></div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 266px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Page length</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Content" data-part="segmented" data-value="short">
            <button class="sp-segment" data-part="seg-short" value="short">Short</button>
            <button class="sp-segment" data-part="seg-long" value="long">Long</button>
          </sp-segmented>
        </div>
        <div class="sp-scroll" data-part="viewport" style="flex: 1 1 auto">
          <div data-part="layout" style="min-height: 100%; display: flex; flex-direction: column">
            <main class="sp-context sp-grow" style="padding: 14px 12px">
              <span class="sp-heading">Colophon</span>
              <div class="sp-stack" data-part="copy" style="margin-top: 10px">${lines}</div>
            </main>
            <footer
              data-part="footer"
              data-subject
              data-mode="held"
              class="sp-row"
              style="flex: 0 0 auto; padding: 10px 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
            >
              <span class="sp-label sp-grow">Harbour Press, 2026</span>
              <span class="sp-label">Contact</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const layout = part(root, 'layout');
  const footer = part(root, 'footer');
  const extras = LINES.slice(SHORT).map((_, index) => part(root, `line-${SHORT + index + 1}`));

  const sync = () => {
    const pushed = layout.getBoundingClientRect().height > viewport.getBoundingClientRect().height + 1;
    footer.dataset.mode = pushed ? 'pushed' : 'held';
  };

  part(root, 'segmented').addEventListener('change', (event) => {
    const long = (event as CustomEvent<string>).detail === 'long';
    for (const line of extras) line.hidden = !long;
    if (!long) viewport.scrollTop = 0;
    sync();
  });

  sync();
}
