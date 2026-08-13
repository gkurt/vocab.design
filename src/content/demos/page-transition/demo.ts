import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const MOVE_MS = 380;
const MOVE = `translate ${MOVE_MS}ms var(--sp-ease), opacity ${MOVE_MS}ms linear`;

const ROUTES = [
  { id: 'list', path: '/charts' },
  { id: 'detail', path: '/charts/harbour' },
];

const ROWS = [
  { id: 'harbour', name: 'Harbour approach', meta: 'Chart 5' },
  { id: 'shoals', name: 'Shoals', meta: 'Chart 10' },
  { id: 'lanes', name: 'Ferry lanes', meta: 'Chart 9' },
];

/** The one row wired to the detail route, since that is the route the detail screen is. */
const OPENS = 'harbour';

/**
 * Page transition specimen: a simulated browser whose two routes are both mounted in one
 * slot, so navigating between them is a move rather than a cut. Opening a chart travels
 * one way and the browser's back control runs the same move backwards, which is the
 * claim the pattern lives or dies by: a back gesture that plays the forward animation
 * tells the reader they have gone deeper.
 *
 * The subject is the page slot, the thing that transitions. The browser chrome around it
 * (back control, address bar) and the style picker under it are scenery: the picker is
 * instrumentation, there so the same navigation can be watched as a slide and as a
 * crossfade, and instrumentation is never part of the term (SPEC §5).
 *
 * Everything here stays inside the frame on purpose. A transition the browser itself
 * runs over a whole document is `view-transition`, which has a specimen of its own.
 *
 * Each screen's resting offset is arithmetic on the route index, so direction is never
 * stated anywhere and falls out of which route was asked for, and every control resolves
 * to an absolute route rather than flipping whatever is showing (SPEC §8). Both screens
 * are absolutely positioned in a slot that holds its own size, so the arriving route
 * takes exactly the room the leaving one gives up (SPEC §5). Switching style re-poses
 * without a transition, since the picker is not a navigation and should not look like
 * one. The moves are CSS transitions, so `motion.css` flattens them for a reader who
 * asked for less movement, and `data-state` is cleared on the stage's clock so a pose
 * cannot let a navigation finish under a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = ROWS.map(
    (row) => `
      <li class="sp-list-item" data-part="row-${row.id}" style="cursor: ${row.id === OPENS ? 'pointer' : 'default'}">
        <span class="sp-grow">${row.name}</span>
        <span class="sp-text">${row.meta}</span>
        ${icon('chevronRight')}
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 378px; height: 236px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" type="button" data-part="back" aria-label="Back">${icon('chevronLeft')}</button>
          <span class="sp-input sp-grow" data-part="address" style="font-size: 12px; color: var(--sp-muted)">/charts</span>
        </div>
        <div
          data-part="slot"
          data-subject
          data-route="list"
          data-style="slide"
          data-dir="forward"
          data-state="settled"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: var(--sp-sunken)"
        >
          <section
            data-part="screen-list"
            style="position: absolute; inset: 0; padding: 8px; background: var(--sp-sunken); translate: 0 0; transition: ${MOVE}"
          >
            <ul class="sp-list">${rows}</ul>
          </section>
          <section
            data-part="screen-detail"
            class="sp-stack"
            style="position: absolute; inset: 0; gap: 8px; padding: 12px; background: var(--sp-surface); translate: 100% 0; transition: ${MOVE}"
          >
            <span class="sp-heading">Harbour approach</span>
            <span class="sp-swatch" style="height: 54px; --sp-swatch: var(--sp-accent-soft)"></span>
            <span class="sp-line" style="width: 92%"></span>
            <span class="sp-line" style="width: 68%"></span>
          </section>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 8px">
        <span class="sp-label">Style</span>
        <sp-segmented class="sp-segmented" data-part="style" data-value="slide">
          <button class="sp-segment" data-part="style-slide" value="slide">Slide</button>
          <button class="sp-segment" data-part="style-fade" value="fade">Crossfade</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const address = part(root, 'address');
  let settling: number | undefined;

  const render = (animate: boolean) => {
    const routeIndex = ROUTES.findIndex((route) => route.id === slot.dataset.route);
    const sliding = slot.dataset.style === 'slide';
    ROUTES.forEach((route, index) => {
      const screen = part(root, `screen-${route.id}`);
      const here = index === routeIndex;
      screen.style.transition = animate ? MOVE : 'none';
      // Where a screen rests is arithmetic on the route: the direction is never stated.
      screen.style.translate = sliding ? `${(index - routeIndex) * 100}% 0` : '0 0';
      screen.style.opacity = sliding || here ? '1' : '0';
      screen.style.pointerEvents = here ? '' : 'none';
      screen.setAttribute('aria-hidden', String(!here));
    });
    address.textContent = ROUTES[routeIndex]?.path ?? '';
  };

  const go = (id: string) => {
    if (slot.dataset.route === id) return;
    const from = ROUTES.findIndex((route) => route.id === slot.dataset.route);
    const to = ROUTES.findIndex((route) => route.id === id);
    clock.clearTimeout(settling);
    slot.dataset.route = id;
    slot.dataset.dir = to > from ? 'forward' : 'back';
    slot.dataset.state = 'moving';
    render(true);
    settling = clock.setTimeout(() => {
      slot.dataset.state = 'settled';
    }, MOVE_MS + 60);
  };

  part(root, `row-${OPENS}`).addEventListener('click', () => go('detail'));
  part(root, 'back').addEventListener('click', () => go('list'));
  part(root, 'style').addEventListener('change', (event) => {
    slot.dataset.style = (event as CustomEvent<string>).detail;
    // Changing how navigation is drawn is not itself a navigation, so it does not play.
    render(false);
  });

  render(false);
}
