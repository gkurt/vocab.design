import { flag, part } from '#src/kit/parts.ts';

const SECTIONS = ['Waterproofs', 'Deck boots', 'Charts', 'Lamps', 'Rope', 'Fenders'];
const FILTERS = ['In stock', 'Offshore rated', 'Under 50', 'Bright colours', 'Repairable', 'Made nearby'];

const cards = SECTIONS.map(
  (name) => `
    <div class="sp-surface" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; margin-bottom: 8px">
      <span aria-hidden="true" style="flex: 0 0 auto; width: 34px; height: 34px; border-radius: 5px; background: var(--sp-line)"></span>
      <span class="sp-stack sp-grow" style="gap: 6px">
        <span class="sp-heading" style="font-size: 12px">${name}</span>
        <span class="sp-line" style="width: 70%"></span>
      </span>
    </div>`,
).join('');

const filters = FILTERS.map(
  (name) => `
    <div class="sp-row" style="gap: 8px; padding: 5px 2px">
      <span class="sp-checkbox" role="img" aria-label="${name}"></span>
      <span class="sp-text sp-text--ink" style="font-size: 12px">${name}</span>
    </div>`,
).join('');

/**
 * Scroll lock specimen: a catalogue page with a filter drawer over it, where a wheel spent on
 * the page while the drawer is open moves nothing and the same wheel moves it again once the
 * drawer is closed. The subject is the page scroller, since the term names what is done to
 * the document behind an overlay rather than the overlay itself; the drawer, the scrim, the
 * lock chip, and the ruler are the scene and the instrumentation around it.
 *
 * The specimen mounts locked, with the drawer open, because the subject declares the honest
 * condition in `data-pose`: a ring drawn around a page that is scrolling freely would
 * identify the opposite of the term (SPEC §6).
 *
 * A scripted scroll assigns `scrollTop` directly, which no wheel can do, so the lock is
 * written the way a real one behaves rather than left to `overflow: hidden` alone: the
 * scroller is frozen at the offset it held and put back on any attempt to leave it. The
 * gutter is reserved in both states, so locking the page cannot reflow it, which is the
 * layout jump the article names (SPEC §5).
 *
 * Three lines used to narrate all this inside the frame: "Wheel over the page" in the
 * topbar (and its running report of what each gesture did), "This list scrolls on its own."
 * under the filters, and "Gutter reserved: no reflow" along the bottom. No catalogue prints
 * any of them. What the wheel reached is visible in the page itself, in the ruler, and in
 * the lock chip, and the page still carries `data-moved` for the script to assert on.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Chandlery</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="open" type="button">Filters</button>
        </div>
        <div class="sp-body" style="position: relative; padding: 0; overflow: hidden">
          <div
            class="sp-scroll"
            data-part="page"
            data-subject
            data-pose="[data-locked]"
            data-locked
            data-moved="no"
            style="position: absolute; inset: 0; padding: 12px 14px; overflow-y: hidden; scrollbar-gutter: stable"
          >
            <span class="sp-heading" style="display: block; margin-bottom: 10px; font-size: 13px">Deck and weather</span>
            ${cards}
          </div>
          <div class="sp-scrim" data-part="scrim" data-open></div>
          <div class="sp-drawer sp-drawer--right" data-part="panel" data-open style="width: 196px; gap: 8px">
            <span class="sp-heading" style="font-size: 13px">Filters</span>
            <div class="sp-scroll" data-part="panel-scroll" data-moved="no" style="height: 116px; padding-right: 4px">
              ${filters}
            </div>
            <button class="sp-button sp-button--sm" data-part="close" type="button" style="align-self: flex-start">Done</button>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="gap: 10px; border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-chip" data-part="lock" data-state="locked" style="width: 92px; justify-content: center; cursor: default">Page locked</span>
          <div class="sp-progress sp-grow" data-part="ruler" style="max-width: 90px"><div class="sp-progress-fill" style="--sp-value: 0%; transition: none"></div></div>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const panel = part(root, 'panel');
  const panelScroll = part(root, 'panel-scroll');
  const scrim = part(root, 'scrim');
  const lock = part(root, 'lock');
  const ruler = part(root, 'ruler').firstElementChild as HTMLElement;

  let frozenAt = 0;

  const drawRuler = () => {
    const max = Math.max(1, page.scrollHeight - page.clientHeight);
    ruler.style.setProperty('--sp-value', `${(page.scrollTop / max) * 100}%`);
  };

  const setLocked = (locked: boolean) => {
    flag(page, 'data-locked', locked);
    flag(panel, 'data-open', locked);
    flag(scrim, 'data-open', locked);
    page.style.overflowY = locked ? 'hidden' : 'auto';
    lock.dataset.state = locked ? 'locked' : 'free';
    lock.textContent = locked ? 'Page locked' : 'Page free';
    frozenAt = page.scrollTop;
    page.dataset.moved = 'no';
  };

  page.addEventListener('scroll', () => {
    if (page.hasAttribute('data-locked')) {
      // A wheel cannot reach a locked scroller at all; a script can, so the offset it held
      // is the offset it is put back to, and the page holds still.
      if (page.scrollTop !== frozenAt) page.scrollTop = frozenAt;
      drawRuler();
      page.dataset.moved = 'no';
      return;
    }
    drawRuler();
    page.dataset.moved = page.scrollTop > 1 ? 'yes' : 'no';
  });

  panelScroll.addEventListener('scroll', () => {
    panelScroll.dataset.moved = panelScroll.scrollTop > 1 ? 'yes' : 'no';
  });

  part(root, 'open').addEventListener('click', () => setLocked(true));
  part(root, 'close').addEventListener('click', () => setLocked(false));

  drawRuler();
}
