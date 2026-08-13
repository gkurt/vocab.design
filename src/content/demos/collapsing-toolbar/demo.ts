import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const EXPANDED = 104;
const COLLAPSED = 44;
/** The travel the collapse is mapped onto: exactly the height the bar gives up. */
const RANGE = EXPANDED - COLLAPSED;

const ROWS = [
  ['Tide tables', 'Chart 4'],
  ['Harbour approach', 'Chart 5'],
  ['Buoyage', 'Chart 6'],
  ['Night passage', 'Chart 7'],
  ['Anchorages', 'Chart 8'],
  ['Ferry lanes', 'Chart 9'],
  ['Shoals', 'Chart 10'],
  ['Lighthouses', 'Chart 11'],
  ['Wind roses', 'Chart 12'],
];

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * Collapsing toolbar specimen: a tall header that condenses into a compact bar as the
 * list scrolls under it. Progress is read from the scroller's own `scrollTop` mapped
 * across the height the bar gives up, so the reader's scroll is the timeline: halfway
 * down the range is a half-collapsed header, and scrolling back brings it back.
 *
 * The subject is the header, on its own: the list it sits over is scenery.
 *
 * The bar is out of the flow and the scroller reserves the expanded height as padding,
 * which is what breaks the feedback loop a collapsing header in the flow would have
 * (shrink changes content height, which changes scroll position, which changes the
 * shrink). Nothing here transitions or is timed, so there is no clock to hand it and
 * nothing for reduced motion to flatten: every frame is written straight from a position
 * the reader chose. `data-state` names the two ends so a script can prove them.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ([name, meta]) => `
      <li class="sp-list-item">
        <span class="sp-grow">${name}</span>
        <span class="sp-text">${meta}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 372px; height: 262px; position: relative">
        <div class="sp-scroll" data-part="page" style="height: 100%; padding-top: ${EXPANDED}px">
          <ul class="sp-list sp-context" data-part="rows" style="padding: 0 8px 12px">${rows}</ul>
        </div>
        <header
          data-part="bar"
          data-subject
          data-state="expanded"
          style="position: absolute; top: 0; left: 0; right: 0; height: ${EXPANDED}px; overflow: hidden;
                 background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)"
        >
          <span
            data-part="wash"
            aria-hidden="true"
            style="position: absolute; inset: 0; background: linear-gradient(160deg, var(--sp-accent-soft), var(--sp-sunken))"
          ></span>
          <button class="sp-icon-button" type="button" data-part="back" style="position: absolute; top: 8px; left: 6px">
            ${icon('chevronLeft')}
          </button>
          <span class="sp-label" style="position: absolute; top: 14px; right: 12px">9 charts</span>
          <span
            data-part="title"
            style="position: absolute; left: 14px; bottom: 12px; font-size: 20px; font-weight: 600; white-space: nowrap;
                   transform-origin: left bottom"
          >Coastal charts</span>
        </header>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const bar = part(root, 'bar');
  const wash = part(root, 'wash');
  const title = part(root, 'title');

  const sync = () => {
    const t = Math.min(Math.max(page.scrollTop / RANGE, 0), 1);
    bar.style.height = `${lerp(EXPANDED, COLLAPSED, t)}px`;
    wash.style.opacity = String(1 - t);
    title.style.left = `${lerp(14, 40, t)}px`;
    title.style.transform = `scale(${lerp(1, 0.66, t)})`;
    bar.dataset.state = t < 0.02 ? 'expanded' : t > 0.98 ? 'collapsed' : 'collapsing';
  };

  page.addEventListener('scroll', sync);
  sync();
}
