import { flag, part } from '#src/kit/parts.ts';

/**
 * The pager's geometry. `STEP` is one card plus its gap, so a card's snap position is
 * `i * STEP`, and `TAIL` is the slack that makes the last card's position reachable: without
 * it the scroller runs out of distance before the final snap point and that card would sit
 * permanently half off screen.
 */
const PORT = 320;
const CARD = 232;
const GAP = 12;
const STEP = CARD + GAP;
const TAIL = PORT - STEP;

const CARDS = [
  { no: '01', title: 'Cormorant Bay' },
  { no: '02', title: 'Salt Pier' },
  { no: '03', title: 'Longstone Light' },
  { no: '04', title: 'Bell Rock' },
];

/**
 * Scroll snap specimen: a horizontal card pager whose container declares
 * `scroll-snap-type: x mandatory` and whose cards align to `start`. A scroll that stops part
 * way settles onto the nearest snap position, and the dots mirror whichever card the
 * scroller landed on.
 *
 * The subject is the scroller, which is where the snap positions are declared: the dots are
 * instrumentation and sit in the context register (SPEC §5), in a row of reserved height so
 * a changing index cannot move anything.
 *
 * `data-settled` is published from the scroll position rather than assumed from the CSS,
 * because "came to rest on a snap position" is the claim, and only the scroller's own
 * geometry can say it.
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    (card, i) => `
      <article
        class="sp-surface"
        data-part="card-${i}"
        style="flex: 0 0 ${CARD}px; scroll-snap-align: start; margin-right: ${GAP}px; padding: 12px"
      >
        <div class="sp-row sp-row--between">
          <span class="sp-heading">${card.title}</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${card.no}</span>
        </div>
        <div class="sp-stack" style="margin-top: 12px">
          <div class="sp-line" style="width: 92%"></div>
          <div class="sp-line" style="width: 78%"></div>
          <div class="sp-line" style="width: 86%"></div>
          <div class="sp-line" style="width: 58%"></div>
        </div>
      </article>`,
  ).join('');

  const dots = CARDS.map((_, i) => `<span data-part="dot-${i}" style="width: 7px; height: 7px; border-radius: 50%"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 228px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lighthouses</span>
          <span class="sp-label">scroll-snap-type: x mandatory</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-scroll"
            data-part="scroller"
            data-subject
            data-index="0"
            style="display: flex; width: ${PORT}px; overflow-y: hidden; scroll-snap-type: x mandatory"
          >
            ${cards}
            <span aria-hidden="true" style="flex: 0 0 ${TAIL}px"></span>
          </div>
          <div class="sp-row sp-context" data-part="dots" style="height: 12px; gap: 6px">${dots}</div>
        </div>
      </div>
    </div>
  `;

  const scroller = part(root, 'scroller');
  const dotEls = CARDS.map((_, i) => part(root, `dot-${i}`));

  const sync = () => {
    const at = scroller.scrollLeft;
    const index = Math.min(CARDS.length - 1, Math.max(0, Math.round(at / STEP)));
    scroller.dataset.index = String(index);
    // Rest, not travel: how far the scroller sits from the snap position it chose.
    flag(scroller, 'data-settled', Math.abs(at - index * STEP) <= 3);
    for (const [i, dot] of dotEls.entries()) {
      flag(dot, 'data-current', i === index);
      dot.style.background = i === index ? 'var(--sp-ink)' : 'var(--sp-line)';
    }
  };

  scroller.addEventListener('scroll', sync);
  sync();
}
