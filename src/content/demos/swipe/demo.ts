import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** One page, and how far a stroke has to carry before the surface completes the move. */
const PAGE_W = 214;
const COMMIT_PX = PAGE_W / 4;
const PAGE_EASE = 'transform 0.28s var(--sp-ease)';

const PAGES = [
  { key: 'harbour', title: 'Harbour', lines: [92, 74, 60] },
  { key: 'lighthouse', title: 'Lighthouse', lines: [80, 88, 52] },
  { key: 'boatyard', title: 'Boatyard', lines: [70, 94, 66] },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Swipe specimen: a pager thrown sideways between three cards. The subject is the
 * swipeable surface, since the gesture has no target inside it: what the finger
 * lands on is the same surface wherever it started.
 *
 * The track follows the finger while the stroke is live and settles on release,
 * which is the whole distinction from a drag, and the landing is decided by
 * distance past a threshold rather than by the page it happened to start on. The
 * two grips at the edges are where the script's stroke begins and ends; they carry
 * no behaviour of their own, since the surface underneath answers the gesture.
 */
export function mount(root: HTMLElement): void {
  const pages = PAGES.map(
    ({ key, title, lines }) => `
      <div
        data-part="page-${key}"
        style="flex: 0 0 ${PAGE_W}px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; padding: 12px; background: var(--sp-sunken)"
      >
        <span class="sp-heading">${title}</span>
        ${lines.map((width) => `<div class="sp-line" style="width: ${width}%"></div>`).join('')}
      </div>`,
  ).join('');

  const dots = PAGES.map(
    ({ key }) => `<span data-part="dot-${key}" style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-line)"></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 250px; height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gallery</span>
          <span class="sp-label" data-part="readout">1 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div
            class="sp-surface"
            data-part="pager"
            data-subject
            data-page="1"
            style="position: relative; overflow: hidden; width: ${PAGE_W}px; height: 132px; cursor: grab; touch-action: none"
          >
            <div class="sp-row" data-part="track" style="gap: 0; height: 100%; align-items: stretch; transition: ${PAGE_EASE}">${pages}</div>
            <span data-part="grip-left" style="position: absolute; left: 0; top: 0; bottom: 0; width: 22px"></span>
            <span data-part="grip-right" style="position: absolute; right: 0; top: 0; bottom: 0; width: 22px"></span>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">${dots}</div>
          <span class="sp-label sp-context" style="text-align: center">Nothing on screen says a surface can be thrown.</span>
        </div>
      </div>
    </div>
  `;

  const pager = part(root, 'pager');
  const track = part(root, 'track');
  const readout = part(root, 'readout');
  let index = 0;
  let start: number | undefined;

  const offset = (px: number) => {
    track.style.transform = `translateX(${px}px)`;
  };

  const settle = (next: number) => {
    index = clamp(next, 0, PAGES.length - 1);
    offset(-index * PAGE_W);
    pager.dataset.page = String(index + 1);
    readout.textContent = `${index + 1} of ${PAGES.length}`;
    for (const [at, page] of PAGES.entries()) {
      const dot = part(root, `dot-${page.key}`);
      flag(dot, 'data-current', at === index);
      dot.style.background = at === index ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
  };

  settle(0);

  pager.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) pager.setPointerCapture(event.pointerId);
    start = localPoint(event, root).x;
    // Following the stroke is what tells a swipe from a control that acts on release.
    track.style.transition = 'none';
    pager.style.cursor = 'grabbing';
  });

  pager.addEventListener('pointermove', (event) => {
    if (start === undefined) return;
    const travelled = localPoint(event, root).x - start;
    // Resistance at the ends: there is no page to bring on, so the surface gives less.
    const held = (index === 0 && travelled > 0) || (index === PAGES.length - 1 && travelled < 0);
    offset(-index * PAGE_W + (held ? travelled / 3 : travelled));
  });

  const release = (event: PointerEvent) => {
    if (start === undefined) return;
    const travelled = localPoint(event, root).x - start;
    start = undefined;
    track.style.transition = PAGE_EASE;
    pager.style.cursor = 'grab';
    // Past the threshold the stroke carries one page in the direction it was thrown;
    // short of it the surface springs back to the page it was already on.
    if (travelled <= -COMMIT_PX) settle(index + 1);
    else if (travelled >= COMMIT_PX) settle(index - 1);
    else settle(index);
  };

  pager.addEventListener('pointerup', release);
  pager.addEventListener('pointercancel', release);
}
