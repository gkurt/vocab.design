/**
 * The front page's carousel (SPEC §3).
 *
 * A row of specimens at half size, one of them centred and playing. When that one
 * finishes a pass of its choreography the row slides on by one card, and the card that
 * has just left is moved to the far end of the row: the cards go round, so there is no
 * first and no last and the row cannot be scrolled to an end. The rules the listing plays
 * by hold here too (SPEC §7): exactly one specimen animates, the stage changes hands only
 * at a pass boundary, and never before the specimen has had its four seconds.
 *
 * Only the cards near the centre carry a live specimen. The rest of the row is markup
 * waiting its turn, which is what keeps a dozen terms on the front page down to four
 * mounted demos.
 *
 * The row is a dozen cards but not a dozen terms. A reader who stays long enough to have
 * watched a few is sent more: a page of the feed is fetched and the cards that have
 * already had their turn are re-dressed with it, off screen, so the row keeps going round
 * with something new in it instead of coming back to the top. The page itself ships only
 * the dozen, so a reader who leaves in the first minute never pays for the rest.
 */

import { previewStage } from '#src/components/preview-stage.ts';

/** The centre, its two neighbours, and the one about to slide into view. */
const MOUNTED = 4;
/** The stage is nobody's for less than this: below it a demonstration is a flicker. */
const PLAY_FLOOR_MS = 4000;
/** How long the row takes to move over by one card. */
const SLIDE_MS = 520;
/** The authored specimen width a preview scales down from (SPEC §5). */
const AUTHORED_WIDTH = 720;
/**
 * How many specimens a reader watches before the row asks for more. Late enough that the
 * fetch belongs to someone who is actually watching (four is around half a minute), and
 * early enough to land before the row has been all the way round.
 */
const FETCH_AFTER = 4;
/** Ask for another page once the queue is down to this, so it never runs dry mid-row. */
const QUEUE_LOW = 8;

interface Slot {
  root: HTMLElement;
  /** The framed box the specimen is scaled into. */
  box: HTMLElement;
  slug: string;
  name: string;
  isolation: string;
  stage: HTMLElement | undefined;
  /** Has this card had its turn in the middle? Only a card that has is worth re-dressing. */
  shown: boolean;
}

/** One specimen from the feed, as `/specimens/{page}.json` publishes it. */
interface Feed {
  slug: string;
  name: string;
  definition: string;
  demo: string;
  href: string;
}

const root = document.querySelector<HTMLElement>('[data-carousel]');
const frame = root?.querySelector<HTMLElement>('[data-carousel-window]');
const track = root?.querySelector<HTMLElement>('[data-carousel-track]');

const slots: Slot[] = [...(track?.children ?? [])]
  .map((el): Slot | undefined => {
    const box = el instanceof HTMLElement ? el.querySelector<HTMLElement>('.vd-preview') : null;
    if (!(el instanceof HTMLElement) || !box) return undefined;
    return {
      root: el,
      box,
      slug: el.dataset.slug ?? '',
      name: el.dataset.name ?? '',
      isolation: el.dataset.isolation ?? 'inline',
      stage: undefined,
      shown: false,
    };
  })
  .filter((slot): slot is Slot => slot !== undefined);

if (root && frame && track && slots.length > 0) {
  // Nothing goes round for a reader who asked for no motion: no specimen plays, so the
  // row would be sliding to hand the stage from one still picture to the next.
  const rotates = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  /**
   * Which card sits in the middle of the window. The second one, so a cut card shows at
   * each edge and the row says it carries on in both directions. A row too short to have
   * two sides centres its first card instead: a curated pool of one is a pool of one, and
   * it should sit in the middle rather than off to the left of an empty row.
   */
  const CENTRE = Math.min(1, slots.length - 1);

  let playing: Slot | undefined;
  /** When the centre took the stage, which is what PLAY_FLOOR_MS is measured from. */
  let grantedAt = 0;
  let watchdog: ReturnType<typeof setTimeout> | undefined;
  let sliding = false;
  let hovered = false;
  /** Whether the row is on screen at all: a carousel nobody can see does not turn. */
  let seen = true;

  const held = () => !rotates || hovered || !seen;

  const mount = (slot: Slot) => {
    if (slot.stage) return;
    const stage = previewStage(slot);
    // The specimen has finished saying what it has to say (SPEC §7), so the row moves on.
    stage.addEventListener('vd-pass', () => {
      if (playing !== slot || held() || performance.now() - grantedAt < PLAY_FLOOR_MS) return;
      advance();
    });
    slot.box.prepend(stage);
    slot.stage = stage;
  };

  const unmount = (slot: Slot) => {
    if (!slot.stage) return;
    // The stage releases its scheduler claim and drops its observers on disconnect.
    slot.stage.remove();
    slot.stage = undefined;
  };

  const grant = (slot: Slot | undefined) => {
    if (playing === slot) return;
    clearTimeout(watchdog);
    playing?.stage?.setAttribute('data-hold', '');
    playing = slot;
    grantedAt = performance.now();
    if (!slot) return;
    slot.stage?.removeAttribute('data-hold');
    if (rotates) watchdog = setTimeout(() => nudge(slot), PLAY_FLOOR_MS);
  };

  /**
   * The pass boundary cannot be the only way round: a specimen with no choreography never
   * reaches one, and a chunk still loading has not started. So the centre is checked once
   * its four seconds are up and moved on if nothing is playing, and otherwise left to the
   * boundary and asked again later.
   */
  const nudge = (slot: Slot) => {
    if (playing !== slot) return;
    if (held() || slot.stage?.dataset.state === 'attract') {
      watchdog = setTimeout(() => nudge(slot), PLAY_FLOOR_MS);
      return;
    }
    advance();
  };

  const gap = () => Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  const cardWidth = () => slots[0]?.root.getBoundingClientRect().width ?? 0;

  /**
   * Put the second card in the middle of the window, so the row is cut at both edges and
   * says it continues in both directions. Measured rather than derived from the
   * breakpoints, because the column is fluid and the card stops at 360px.
   */
  const place = () => {
    const card = cardWidth();
    if (card === 0) return;
    const peek = (frame.clientWidth - card) / 2;
    track.style.setProperty('--vd-carousel-x', `${peek - CENTRE * (card + gap())}px`);
    // The edges fade over exactly what shows of the cards out there (SPEC §3).
    frame.style.setProperty('--vd-carousel-fade', `${Math.max(peek, 0)}px`);
    for (const slot of slots) slot.box.style.setProperty('--vd-preview-k', `${card / AUTHORED_WIDTH}`);
  };

  // --- The feed (SPEC §3) ---------------------------------------------------
  /** Where the pages live and how many there are, both resolved at build time. */
  const feed = root.dataset.feed;
  const pages = Number(root.dataset.feedPages ?? 0);
  /** Specimens fetched and not yet put on a card. */
  const queue: Feed[] = [];
  /** Every term the row has carried, so the feed never hands back one already in it. */
  const carried = new Set(slots.map((slot) => slot.slug));
  const pulled = new Set<number>();
  let pulling = false;
  let watched = 0;

  const shuffled = <T>(list: T[]): T[] => {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = out[i] as T;
      out[i] = out[j] as T;
      out[j] = swap;
    }
    return out;
  };

  /**
   * Fetch a page of the feed. A page at random rather than the next one, and shuffled
   * again on arrival, because the pages are static and two readers watching the same
   * carousel should not be watching the same programme.
   */
  const pull = async () => {
    const left = Array.from({ length: pages }, (_, i) => i + 1).filter((page) => !pulled.has(page));
    const page = left[Math.floor(Math.random() * left.length)];
    if (pulling || !feed || page === undefined) return;
    pulling = true;
    pulled.add(page);
    try {
      const response = await fetch(`${feed}${page}.json`);
      const body: unknown = await response.json();
      const terms = body && typeof body === 'object' && 'terms' in body ? (body as { terms: Feed[] }).terms : [];
      for (const term of shuffled(Array.isArray(terms) ? terms : [])) {
        if (carried.has(term.slug)) continue;
        carried.add(term.slug);
        queue.push(term);
      }
    } catch {
      // The row keeps going round on what it already has. A carousel is not worth a
      // retry storm, and the next page is asked for at the next boundary anyway.
      pulled.delete(page);
    }
    pulling = false;
    refill();
  };

  /**
   * Put the queue onto the cards that have had their turn. Only cards out of sight are
   * re-dressed, and only ones that have already been in the middle, so nothing a reader
   * has been shown changes under them and nothing they have not seen is thrown away.
   */
  const refill = () => {
    for (const slot of slots.slice(MOUNTED)) {
      if (!slot.shown) continue;
      const next = queue.shift();
      if (!next) return;
      dress(slot, next);
    }
  };

  /** Re-letter a card: a new term in the same box, which is cheaper than a new box. */
  const dress = (slot: Slot, term: Feed) => {
    unmount(slot);
    slot.slug = term.slug;
    slot.name = term.name;
    slot.isolation = term.demo;
    slot.shown = false;
    slot.root.dataset.slug = term.slug;
    slot.root.dataset.name = term.name;
    slot.root.dataset.isolation = term.demo;
    const name = slot.root.querySelector('.vd-carousel-name');
    const definition = slot.root.querySelector('.vd-carousel-definition');
    const hit = slot.root.querySelector('.vd-preview-hit');
    if (name instanceof HTMLAnchorElement) {
      name.textContent = term.name;
      name.href = term.href;
    }
    if (definition) definition.textContent = term.definition;
    if (hit instanceof HTMLAnchorElement) hit.href = term.href;
  };

  /**
   * Which card the row is presenting. The rest are faded back, because a row where every
   * card is equally present is a row with nothing in it: the neighbours are what the
   * reader is being offered next, not what they are being shown now.
   */
  const markCentre = (centre: Slot | undefined) => {
    for (const slot of slots) delete slot.root.dataset.centre;
    if (centre) centre.root.dataset.centre = '';
  };

  /** Mount what is at or near the middle, evict the rest, and play the one in the middle. */
  const settle = () => {
    for (const [i, slot] of slots.entries()) (i < MOUNTED ? mount : unmount)(slot);
    markCentre(slots[CENTRE]);
    grant(slots[CENTRE]);
    const centre = slots[CENTRE];
    if (centre) centre.shown = true;
  };

  /**
   * Move the row over by one card, either way, and send the card that leaves round to the
   * other end. Forwards, the row is offset and the card at the front goes to the back
   * once it has gone; backwards, the card at the back comes to the front FIRST and the
   * row is held still while it arrives, so the slide is that offset being animated away.
   * Either way the row lands exactly where it started around a rotated set of cards,
   * which is what makes the cycle endless rather than a strip that runs out at one end.
   */
  const slide = (direction: 1 | -1) => {
    // A row of one has nowhere to go: it plays its one specimen, over and over.
    if (sliding || !rotates || slots.length < 2) return;
    const step = cardWidth() + gap();
    const leaving = slots[0];
    const arriving = slots[slots.length - 1];
    if (step === 0 || !leaving || !arriving) return;
    sliding = true;
    // Nothing plays mid-slide: a specimen demonstrating something while it slides out of
    // the frame is a demonstration nobody can follow.
    grant(undefined);
    const done = () => {
      sliding = false;
      delete track.dataset.sliding;
      track.style.setProperty('--vd-carousel-shift', '0px');
      settle();
      // Somebody is watching this. Ask for more before the row has been all the way
      // round, and put whatever is already in hand onto the cards that have had a turn.
      watched += 1;
      if (watched >= FETCH_AFTER && queue.length < QUEUE_LOW) void pull();
      refill();
    };
    if (direction > 0) {
      markCentre(slots[CENTRE + 1]);
      track.dataset.sliding = '';
      track.style.setProperty('--vd-carousel-shift', `-${step}px`);
      setTimeout(() => {
        // Its stage goes before the node moves: a custom element taken out of the document
        // and put back tears itself down and sets itself up again, and the specimen would
        // be built twice into a canvas that already has one.
        unmount(leaving);
        track.append(leaving.root);
        slots.shift();
        slots.push(leaving);
        done();
      }, SLIDE_MS + 40);
      return;
    }
    unmount(arriving);
    track.prepend(arriving.root);
    slots.pop();
    slots.unshift(arriving);
    // The offset cancels the room the arriving card has just taken at the front, so
    // nothing appears to move; animating it away is the slide.
    track.style.setProperty('--vd-carousel-shift', `-${step}px`);
    mount(arriving);
    markCentre(slots[CENTRE]);
    // The offset has to LAND before the transition is armed, or the two writes are
    // coalesced and the row animates from a position it was never in.
    void track.offsetWidth;
    track.dataset.sliding = '';
    track.style.setProperty('--vd-carousel-shift', '0px');
    setTimeout(done, SLIDE_MS + 40);
  };

  const advance = () => slide(1);

  /**
   * A card at the edge of the row is an offer, not a destination: clicking one brings it
   * to the middle instead of leaving the page, so a reader who has spotted something can
   * look at it properly first. Once it is in the middle it is a link like any other, and
   * a modified or middle click is always the browser's, so opening a card in a new tab
   * works wherever it sits.
   */
  track.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target instanceof Element ? event.target.closest('.vd-carousel-card') : null;
    const at = slots.findIndex((slot) => slot.root === target);
    if (at < 0 || at === CENTRE) return;
    event.preventDefault();
    slide(at > CENTRE ? 1 : -1);
  });

  root.addEventListener('pointerenter', () => {
    hovered = true;
  });
  // The row does not move on while the reader is standing at it. It moves at the next
  // boundary after they leave, so a term someone stopped to watch is not snatched away.
  root.addEventListener('pointerleave', () => {
    hovered = false;
  });
  root.addEventListener('focusin', () => {
    hovered = true;
  });
  root.addEventListener('focusout', () => {
    hovered = false;
  });

  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) seen = entry.isIntersecting;
    },
    { threshold: 0.25 },
  ).observe(root);

  new ResizeObserver(place).observe(frame);
  place();
  settle();
}
