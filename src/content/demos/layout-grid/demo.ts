import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const COLUMNS = 12;
const GUTTER = 8;
const MARGIN = 20;

/** Two arrangements laid against the same grid: what each block spans, and nothing else. */
const ARRANGEMENTS: Record<string, { main: number; aside: number; extra: number }> = {
  article: { main: 8, aside: 4, extra: 0 },
  gallery: { main: 4, aside: 4, extra: 4 },
};

const TRACKS = `display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); gap: ${GUTTER}px`;
const BLOCK = 'display: flex; flex-direction: column; gap: 8px; padding: 10px; min-width: 0';

/**
 * Layout grid specimen: twelve columns drawn as an overlay, with a page fragment laid
 * against them. Switching the arrangement moves the blocks between spans of 8, 4 and 4
 * while the grid underneath does not move at all, which is the point of having one.
 *
 * The subject is the overlay, because the term names the structure rather than any
 * page built on it. The overlay and the content share one set of track definitions and
 * one gutter, so their alignment is a fact of the layout rather than two sets of
 * numbers kept in step by hand. The page fragment is scenery (SPEC §5).
 *
 * The row heights are fixed, so an arrangement that adds a third block fills a track
 * that was already reserved instead of growing the page (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const columns = Array.from(
    { length: COLUMNS },
    () => '<div style="background: var(--sp-accent); opacity: 0.14; border-radius: 2px"></div>',
  ).join('');

  const block = (key: string, label: string, span: number, hidden = false) => `
    <div class="sp-surface" data-part="block-${key}" data-span="${span}"${hidden ? ' hidden' : ''} style="${BLOCK}; grid-column: span ${span}">
      <span class="sp-label">${label}</span>
      <div class="sp-line" style="width: 84%"></div>
      <div class="sp-line" style="width: 62%"></div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">${COLUMNS} columns</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="switcher" data-value="article">
            <button class="sp-segment" type="button" data-part="seg-article" value="article">Article</button>
            <button class="sp-segment" type="button" data-part="seg-gallery" value="gallery">Gallery</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 14px ${MARGIN}px">
          <div style="position: relative; height: 100%">
            <div data-part="overlay" data-subject style="position: absolute; inset: 0; ${TRACKS}; pointer-events: none; z-index: 1">
              ${columns}
            </div>
            <div
              class="sp-context"
              data-part="layout"
              data-arrangement="article"
              style="${TRACKS}; grid-template-rows: 40px 1fr; height: 100%"
            >
              <div class="sp-surface" data-part="block-head" style="${BLOCK}; grid-column: span ${COLUMNS}; justify-content: center">
                <span class="sp-label">masthead, spans ${COLUMNS}</span>
              </div>
              ${block('main', 'main', 8)}
              ${block('aside', 'aside', 4)}
              ${block('extra', 'extra', 4, true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const layout = part(root, 'layout');
  const blocks = { main: part(root, 'block-main'), aside: part(root, 'block-aside'), extra: part(root, 'block-extra') };

  const apply = (key: string) => {
    const spans = ARRANGEMENTS[key];
    if (!spans) return;
    layout.dataset.arrangement = key;
    for (const [name, element] of Object.entries(blocks)) {
      const span = spans[name as keyof typeof spans];
      element.dataset.span = String(span);
      flag(element, 'hidden', span === 0);
      if (span > 0) element.style.gridColumn = `span ${span}`;
    }
  };

  // Each segment names an arrangement, so the switch lands on that one rather than
  // stepping to the next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('article');
}
