/**
 * Live specimens in a list (SPEC §3, §7).
 *
 * A card carries an empty stage-shaped box. This mounts the real `<vd-stage>` into the
 * boxes near the viewport, holds every one of them at its first frame, and releases
 * exactly one to play. That is the page scheduler's rule from the other side (SPEC §7):
 * the scheduler decides which stage may play, and this decides which one asks.
 *
 * Which one asks is a rotation down the page. The stage passes from specimen to
 * specimen in document order, and it moves on when the one holding it has finished a
 * pass of its choreography AND has been playing for at least MIN_PLAY_MS. Both halves
 * matter: the pass boundary is what stops a demonstration being cut off mid-sentence,
 * and the floor is what stops a two-second demo from being a flicker on the way past
 * (a short script simply loops until its four seconds are up). The rotation covers the
 * cards that are really on screen and nothing else, so it never plays to an empty room:
 * scrolling a quarter of the playing card away hands the stage on at once, without
 * waiting for a boundary, and a specimen arriving in the viewport is what starts the
 * rotation again when nothing is playing.
 *
 * A reader's pointer outranks all of it: the card under it takes the stage at once and
 * keeps it until the pointer leaves, and the rotation then carries on from that card
 * rather than from wherever it had got to.
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
/** The stage is nobody's for less than this: below it a demonstration is a flicker. */
const MIN_PLAY_MS = 4000;
/**
 * How much of a preview has to be showing for it to be in the rotation. A quarter of it
 * off screen is enough to move the stage on: a demonstration half out of the frame is
 * one the reader is already leaving, and the card they have scrolled to is the one worth
 * playing. It is a floor for arriving as well as for leaving, so a card creeping in at
 * the bottom edge cannot take the stage before it is really there.
 */
const IN_VIEW = 0.75;

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

  // Nothing rotates for a reader who asked for no motion: no specimen plays, so
  // passing the stage around would be four seconds of remounting, once per card.
  const rotates = !matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    // The specimen has finished saying what it has to say (SPEC §7). If it has had its
    // four seconds and the reader is not standing here, the stage moves down the page.
    stage.addEventListener('vd-pass', () => {
      if (!rotates || granted !== card || pointed) return;
      if (performance.now() - grantedAt < MIN_PLAY_MS) return;
      advance();
    });
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
  /** When the current specimen took the stage, which is what MIN_PLAY_MS is measured from. */
  let grantedAt = 0;
  let watchdog: ReturnType<typeof setTimeout> | undefined;

  const grant = (card: Card | undefined) => {
    if (granted === card) return;
    clearTimeout(watchdog);
    granted?.stage?.setAttribute('data-hold', '');
    granted = card;
    grantedAt = performance.now();
    if (!card) return;
    mount(card);
    card.stage?.removeAttribute('data-hold');
    if (rotates) watchdog = setTimeout(() => nudge(card), MIN_PLAY_MS);
  };

  /**
   * The rotation cannot rely on the pass boundary alone: a specimen with no
   * choreography never reaches one, and a chunk still loading has not started. So the
   * stage is checked once its four seconds are up and moved on if nothing is playing,
   * and otherwise left to the boundary and asked again later.
   */
  const nudge = (card: Card) => {
    if (granted !== card) return;
    if (pointed === card || card.stage?.dataset.state === 'attract') {
      watchdog = setTimeout(() => nudge(card), MIN_PLAY_MS);
      return;
    }
    advance();
  };

  /** How far the box is from the middle of the screen, which is what "centred" means here. */
  const distance = (card: Card) => {
    const rect = card.box.getBoundingClientRect();
    return Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
  };

  /**
   * On screen enough to be played to: IN_VIEW of the picture, or of the screen when the
   * picture is the taller of the two. A card showing a sliver at the edge is not
   * somewhere a demonstration should be spent.
   */
  const inView = (card: Card) => {
    const rect = card.box.getBoundingClientRect();
    const shown = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
    return shown > 0 && shown >= Math.min(rect.height, innerHeight) * IN_VIEW;
  };

  /** The specimens in the running, in document order: the order the rotation walks. */
  const queue = () => cards.filter((card) => card.near && inView(card));

  /**
   * Hand the stage to the next specimen down the page, wrapping at the end. A card that
   * has scrolled out of the queue is not in the line any more, so this starts from the
   * top of what IS on screen, which after a scroll is exactly the specimen that just
   * arrived there.
   */
  const advance = () => {
    const line = queue();
    // Nowhere to send it. The specimen that has the stage keeps it rather than the page
    // going still over a scroll position where nothing is quite on screen; its own
    // observer has already paused it if it is out of the frame altogether.
    if (line.length === 0) return;
    const at = granted ? line.indexOf(granted) : -1;
    grant(line[(at + 1) % line.length]);
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
    // The rotation owns the choice while its specimen is still on screen. Scrolling a
    // quarter of it away, or arriving with nothing playing at all, is what puts the
    // stage back at the top of the visible list.
    if (granted && queue().includes(granted)) return;
    advance();
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
    // Intent, and the only signal that outranks the rotation: the reader is here.
    // Listened for on the whole card rather than on the picture, because a reader
    // reading the definition is looking at this term, and the headword is where the
    // keyboard lands.
    const here = () => {
      pointed = card;
      grant(card);
    };
    // The pointer leaving does not move the stage. The card keeps playing until it
    // reaches the end of a pass, and the rotation carries on from here.
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
