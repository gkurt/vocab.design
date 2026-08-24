/**
 * Live specimens in a list (SPEC §3, §7).
 *
 * A card carries an empty stage-shaped box. This mounts the real `<vd-stage>` into the
 * boxes near the viewport, holds every one of them at its first frame, and releases
 * exactly one to play: the card the reader is pointing at or has focused, and otherwise
 * the one nearest the middle of the screen. That is the page scheduler's rule from the
 * other side (SPEC §7): the scheduler decides which stage may play, and this decides
 * which ones ask.
 *
 * Everything here is bounded on purpose. A category page can carry 196 cards, so mounted
 * previews are capped and evicted by distance from the viewport, and the passes that
 * decide all of this run on a debounce rather than on every scroll event.
 */

import '#src/stage/specimen-stage.ts';

/** How many specimens may be mounted at once, however long the list is. */
const MAX_MOUNTED = 8;
/** How far outside the viewport a preview mounts, so it is standing by before it is seen. */
const MOUNT_MARGIN = '400px 0px';
/** Scrolling settles before anything is granted: motion must not chase the scrollbar. */
const SETTLE_MS = 180;
/** The authored specimen width a preview scales down from (SPEC §5). */
const AUTHORED_WIDTH = 720;

interface Card {
  /** The card, which is what a reader points at: the headword and the definition too. */
  root: HTMLElement;
  /** The framed box the specimen is scaled into. */
  box: HTMLElement;
  slug: string;
  name: string;
  isolation: string;
  stage: HTMLElement | undefined;
  /** Whether the box is close enough to the viewport to be worth a mounted specimen. */
  near: boolean;
}

const roots = document.querySelectorAll<HTMLElement>('[data-preview]');
if (roots.length > 0) {
  const cards: Card[] = [...roots]
    .map((root): Card | undefined => {
      const box = root.querySelector<HTMLElement>('.vd-preview');
      return box
        ? {
            root,
            box,
            slug: root.dataset.preview ?? '',
            name: root.dataset.previewName ?? '',
            isolation: root.dataset.previewIsolation ?? 'inline',
            stage: undefined,
            near: false,
          }
        : undefined;
    })
    .filter((card): card is Card => card !== undefined);

  const mount = (card: Card) => {
    if (card.stage) return;
    const stage = document.createElement('vd-stage');
    stage.dataset.slug = card.slug;
    stage.dataset.name = card.name;
    stage.dataset.isolation = card.isolation;
    stage.dataset.state = 'idle';
    // Mounted holding, always: being granted is a separate decision, taken below.
    stage.dataset.hold = '';
    // No control bar: a card has no room for one, and the demo is driven on its own page.
    // What it gets instead is the badge, which says this is the specimen playing and points
    // the term out when a reader hovers it. The overlay is a child of the stage rather than
    // of the body, because only the body is scaled and the stage draws in page coordinates.
    stage.innerHTML =
      '<div class="vd-preview-scale"><figure><div class="vd-stage-body"><div data-stage-canvas></div></div></figure></div>' +
      '<div data-stage-overlay aria-hidden="true"></div>' +
      `<button class="vd-playing" type="button" title="Point out the ${card.name.toLowerCase()}" aria-label="Playing: point out the ${card.name.toLowerCase()}"><span></span><span></span><span></span></button>`;
    const badge = stage.querySelector<HTMLElement>('.vd-playing');
    badge?.addEventListener('pointerenter', () => stage.setAttribute('data-identify', ''));
    badge?.addEventListener('pointerleave', () => stage.removeAttribute('data-identify'));
    badge?.addEventListener('focus', () => stage.setAttribute('data-identify', ''));
    badge?.addEventListener('blur', () => stage.removeAttribute('data-identify'));
    card.box.prepend(stage);
    card.stage = stage;
  };

  const unmount = (card: Card) => {
    if (!card.stage) return;
    // The stage releases its scheduler claim and drops its observers on disconnect.
    card.stage.remove();
    card.stage = undefined;
  };

  let granted: Card | undefined;
  const grant = (card: Card | undefined) => {
    if (granted === card) return;
    granted?.stage?.setAttribute('data-hold', '');
    granted = card;
    if (!card) return;
    mount(card);
    card.stage?.removeAttribute('data-hold');
  };

  /** How far the box is from the middle of the screen, which is what "centred" means here. */
  const distance = (card: Card) => {
    const rect = card.box.getBoundingClientRect();
    return Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
  };

  /** Fully off screen: never granted, however central the arithmetic says it is. */
  const onScreen = (card: Card) => {
    const rect = card.box.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < innerHeight;
  };

  let pointed: Card | undefined;
  let settle: ReturnType<typeof setTimeout> | undefined;

  const settleNow = () => {
    const near = cards.filter((card) => card.near);
    // Mount what is close, evict what is furthest away: a long list must not accumulate
    // a specimen per card it has scrolled past.
    const ranked = [...near].sort((a, b) => distance(a) - distance(b));
    for (const card of ranked.slice(0, MAX_MOUNTED)) mount(card);
    for (const card of ranked.slice(MAX_MOUNTED)) if (card !== granted) unmount(card);
    for (const card of cards) if (!card.near && card !== granted) unmount(card);

    if (pointed) {
      grant(pointed);
      return;
    }
    const centred = ranked.find((card) => onScreen(card));
    grant(centred);
  };

  const restack = () => {
    clearTimeout(settle);
    settle = setTimeout(settleNow, SETTLE_MS);
  };

  /**
   * The scale, from the width the card actually came out at. It is measured rather than
   * derived from the breakpoints, because the grid is fluid and a preview that guessed
   * would either clip the specimen or leave a gap beside it.
   */
  const sizer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      if (width > 0) (entry.target as HTMLElement).style.setProperty('--vd-preview-k', `${width / AUTHORED_WIDTH}`);
    }
  });

  const approach = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const card = cards.find((c) => c.box === entry.target);
        if (card) card.near = entry.isIntersecting;
      }
      restack();
    },
    { rootMargin: MOUNT_MARGIN },
  );

  for (const card of cards) {
    sizer.observe(card.box);
    approach.observe(card.box);
    // Intent, and the only signal that outranks the centre: the reader is here. Listened
    // for on the whole card rather than on the picture, because a reader reading the
    // definition is looking at this term, and the headword is where the keyboard lands.
    const here = () => {
      pointed = card;
      grant(card);
    };
    const gone = () => {
      if (pointed === card) pointed = undefined;
      restack();
    };
    card.root.addEventListener('pointerenter', here);
    card.root.addEventListener('pointerleave', gone);
    card.root.addEventListener('focusin', here);
    card.root.addEventListener('focusout', gone);
  }

  addEventListener('scroll', restack, { passive: true });
  addEventListener('resize', restack);
}
