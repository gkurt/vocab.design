import { part } from '#src/kit/parts.ts';

/** One row, borders included, so the reading line is arithmetic rather than measurement. */
const STRIDE = 36;
const PANEL_H = 144;
const START_SCROLL = 3 * STRIDE;

const MESSAGES = Array.from({ length: 12 }, (_, i) => `m${i + 1}`);

const label = (id: string) => (id.startsWith('o') ? `Older ${id.slice(1)}` : `Message ${id.slice(1)}`);

const row = (id: string) => {
  const who = id.startsWith('o') ? 'Older' : Number(id.slice(1)) % 2 ? 'Ada' : 'Sam';
  return `
    <div class="sp-row" data-id="${id}" style="height: ${STRIDE}px; padding: 0 10px; border-bottom: 1px solid var(--sp-line); font-size: 12px; white-space: nowrap; overflow: hidden">
      <span class="sp-label" style="width: 38px; flex: 0 0 auto">${who}</span>
      <span class="sp-grow" style="min-width: 0; overflow: hidden; text-overflow: ellipsis">${label(id)}</span>
    </div>`;
};

const feedPanel = (key: 'anchored' | 'loose', title: string, note: string, subject: boolean) => `
  <div class="sp-stack${subject ? '' : ' sp-context'}" style="width: 208px; gap: 4px">
    <span class="sp-label" style="color: var(--sp-ink)">${title}</span>
    <div
      class="sp-scroll sp-surface"
      data-part="${key}"
      ${subject ? 'data-subject' : ''}
      data-top="m4"
      style="height: ${PANEL_H}px; overflow-anchor: none; scrollbar-width: none"
    >
      <div data-part="${key}-list" style="overflow-anchor: none">${MESSAGES.map(row).join('')}</div>
    </div>
    <span class="sp-label" data-part="${key}-top" style="font-size: 11px">${note}</span>
  </div>`;

/**
 * Scroll anchoring specimen: the same feed twice, both given two older items above the
 * reading position, one of them compensating for the insertion and one of them not. The
 * subject is the anchored scroller, since anchoring is something a scroll container does
 * with its own offset; the twin beside it is the counter-example and stays in the context
 * register, and the load control is instrumentation (SPEC §5).
 *
 * Both scrollers carry `overflow-anchor: none`, which switches the browser's own anchoring
 * off, and the compensation is then done by the demo: a browser that quietly fixed both
 * panels would leave nothing to compare, exactly as the scroll-chaining specimen has to
 * draw its own handoff. The arithmetic is the browser's, and the property that turns the
 * real thing on and off is named in the prose.
 *
 * Rows are a fixed height and both panels keep their boxes, so the reading line is exact
 * and an insertion moves content inside a scroller and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Thread</span>
          <span class="sp-text" data-part="readout" style="width: 226px; text-align: right; white-space: nowrap">Load older items above the view</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            ${feedPanel('anchored', 'Anchored', 'Top line: Message 4', true)}
            ${feedPanel('loose', 'Not anchored', 'Top line: Message 4', false)}
          </div>
          <div class="sp-row sp-context" style="gap: 10px; width: 100%">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="load">Load 2 older</button>
            <span class="sp-label" data-stage-verdict data-part="caption">Both panels receive the same two items, above the view</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  const feeds = (['anchored', 'loose'] as const).map((key) => ({
    key,
    panel: part(root, key),
    list: part(root, `${key}-list`),
    caption: part(root, `${key}-top`),
    ids: [...MESSAGES],
    holds: key === 'anchored',
  }));

  type Feed = (typeof feeds)[number];

  /** Which item the top of the viewport is resting on, by arithmetic on a fixed stride. */
  const sync = (feed: Feed) => {
    const index = Math.max(0, Math.min(feed.ids.length - 1, Math.round(feed.panel.scrollTop / STRIDE)));
    const id = feed.ids[index] ?? '';
    feed.panel.dataset.top = id;
    feed.caption.textContent = `Top line: ${label(id)}`;
  };

  let loaded = 0;

  part(root, 'load').addEventListener('click', () => {
    const arriving = [`o${loaded + 1}`, `o${loaded + 2}`];
    loaded += 2;
    const html = arriving.map(row).join('');
    for (const feed of feeds) {
      feed.list.insertAdjacentHTML('afterbegin', html);
      feed.ids.unshift(...arriving);
      // The whole mechanism, in one line: the offset grows by exactly what arrived above
      // it, so the number changes in order that the view does not.
      if (feed.holds) feed.panel.scrollTop += arriving.length * STRIDE;
      sync(feed);
    }
    readout.textContent = 'Two items arrived above the reading position';
  });

  for (const feed of feeds) {
    feed.panel.addEventListener('scroll', () => sync(feed));
    feed.panel.scrollTop = START_SCROLL;
    sync(feed);
  }
}
