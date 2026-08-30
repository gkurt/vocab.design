import { localBox, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const ENTER_MS = 420;
const ENTER = `opacity ${ENTER_MS}ms var(--sp-ease), transform ${ENTER_MS}ms var(--sp-ease)`;
const OFFSET = 'translateY(14px)';
/** How far inside the scroller the trigger line sits, so nothing fires at the very edge. */
const MARGIN = 36;

const CARDS = [
  { id: 'a', title: 'Tidal range', meta: '2.1 m' },
  { id: 'b', title: 'Harbour approach', meta: '4 kn' },
  { id: 'c', title: 'Night passage', meta: '21:40' },
  { id: 'd', title: 'Anchorages', meta: '6 marked' },
];

/** The one card the term is pointed at: below the fold at rest, so it has to be triggered. */
const SUBJECT = 'c';

/**
 * Scroll-triggered specimen: four cards in a scroller, each playing its entrance the
 * first time it crosses a line set inside the scroller's own bottom edge. Position is
 * the cue and nothing else: once a card has played it keeps `data-played` for the rest
 * of the mount, so scrolling back up leaves it where it landed instead of rewinding it.
 * That is the whole difference from scroll-linked motion, where the scrollbar is the
 * playhead.
 *
 * The subject is the third card, the one that is below the fold at rest and therefore
 * has to be triggered to arrive. The lede, the other cards, and the counter are scenery.
 * The lede used to read "Scroll on. Each card plays once, when it crosses the line, and
 * stays where it landed.", which was the article standing in the scroller and telling the
 * reader what to do. It is a line the notebook would really carry now, and it is kept to
 * about the same length on purpose: it is the height that holds the third card below the
 * fold at rest, which is the whole setup.
 *
 * Every card occupies its slot from the first frame (opacity and transform only), so
 * arrivals never reflow the scroller and move the trigger line for the cards below.
 * The entrance is a CSS transition rather than a scripted keyframe set, so `motion.css`
 * flattens it for a reader who asked for less movement: the card still arrives, it just
 * arrives already there. Nothing here is timed, so the demo keeps no clock.
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    (card) => `
      <article
        class="sp-surface sp-row${card.id === SUBJECT ? '' : ' sp-context'}"
        data-part="card-${card.id}"
        ${card.id === SUBJECT ? 'data-subject' : ''}
        style="flex: 0 0 auto; gap: 10px; height: 76px; margin: 0 10px 12px; padding: 12px;
               opacity: 0; transform: ${OFFSET}; transition: ${ENTER}"
      >
        <span class="sp-swatch" style="flex: 0 0 52px; align-self: stretch; --sp-swatch: var(--sp-accent-soft)"></span>
        <span class="sp-stack sp-grow" style="gap: 7px">
          <span class="sp-row sp-row--between">
            <span class="sp-heading" style="font-size: 13px">${card.title}</span>
            <span class="sp-label">${card.meta}</span>
          </span>
          <span class="sp-line" style="width: 88%"></span>
          <span class="sp-line" style="width: 56%"></span>
        </span>
      </article>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 372px; height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Passage notes</span>
          <span class="sp-label" data-part="counter">0 of 4 arrived</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; background: var(--sp-sunken); padding-top: 12px">
          <div class="sp-stack sp-context" style="gap: 8px; padding: 0 12px 14px">
            <span class="sp-text">Notes from the last four crossings, kept for the harbour office and the relief crew.</span>
          </div>
          ${cards}
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const counter = part(root, 'counter');

  const sync = () => {
    const line = localSize(page).height - MARGIN;
    for (const card of CARDS) {
      const el = part(root, `card-${card.id}`);
      if (el.dataset.played !== undefined) continue;
      if (localBox(el, page).top > line) continue;
      // Played once, and never unplayed: the cue is spent the moment it is used.
      el.dataset.played = '';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
    counter.textContent = `${played(root)} of ${CARDS.length} arrived`;
  };

  page.addEventListener('scroll', sync);
  sync();
}

function played(root: HTMLElement): number {
  return CARDS.filter((card) => part(root, `card-${card.id}`).dataset.played !== undefined).length;
}
