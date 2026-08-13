import { part } from '#src/kit/parts.ts';

const SECTIONS = ['The crane on the quay', 'Who ordered it', 'The folder', 'What the tide did', 'Tuesday, again'];

/**
 * Reading progress specimen: a bar under the header, filling with the scroll and
 * emptying again on the way back up, because it is linked to position rather than
 * started by it.
 *
 * The subject is the bar. The article is what it measures and the header is where
 * it happens to be pinned, so both are scenery (SPEC §5).
 *
 * It is measured against the article, not the scroller: the comments below the
 * piece scroll past with the bar already full, which is the difference between a
 * bar that tells the truth and one that promises six more minutes of a story that
 * has ended. Nothing here transitions, since an eased fill is a fill lagging the
 * scroll, and the span is recomputed per scroll rather than cached at mount, so no
 * measurement is ever taken from a style this demo has just written (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const body = SECTIONS.map(
    (title) => `
      <section style="padding-bottom: 18px">
        <div class="sp-heading">${title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 88%"></div>
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 71%"></div>
        </div>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-context" style="flex: 0 0 auto">
          <div class="sp-topbar" style="border-bottom: 0"><span class="sp-heading sp-grow">The Harbour Review</span></div>
        </div>
        <div
          class="sp-progress"
          data-part="bar"
          data-subject
          data-zone="start"
          aria-hidden="true"
          style="flex: 0 0 auto; height: 3px; border-radius: 0; background: var(--sp-line)"
        >
          <div data-part="fill" style="width: 0%; height: 100%; background: var(--sp-accent)"></div>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="doc" style="height: 100%; padding: 12px 14px">
            <article data-part="article">${body}</article>
            <div class="sp-surface" data-part="after" style="padding: 10px 12px; margin-bottom: 4px">
              <span class="sp-label">Comments, newsletter, related stories</span>
              <div class="sp-stack" style="margin-top: 8px">
                <div class="sp-line" style="width: 84%"></div>
                <div class="sp-line" style="width: 66%"></div>
                <div class="sp-line" style="width: 78%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-label sp-context">Full at the last line of the article, not at the end of the page.</span>
    </div>
  `;

  const doc = part(root, 'doc');
  const article = part(root, 'article');
  const bar = part(root, 'bar');
  const fill = part(root, 'fill');

  const sync = () => {
    // The denominator is the article, so everything after it scrolls past a full bar.
    const span = Math.max(1, article.offsetTop + article.offsetHeight - doc.clientHeight);
    const progress = Math.min(Math.max(doc.scrollTop / span, 0), 1);
    fill.style.width = `${progress * 100}%`;
    bar.dataset.zone = progress <= 0.02 ? 'start' : progress >= 0.995 ? 'end' : 'middle';
  };

  doc.addEventListener('scroll', sync);
}
