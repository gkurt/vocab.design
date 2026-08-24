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

interface Slot {
  root: HTMLElement;
  /** The framed box the specimen is scaled into. */
  box: HTMLElement;
  slug: string;
  name: string;
  isolation: string;
  stage: HTMLElement | undefined;
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
    track.style.setProperty('--vd-carousel-x', `${(frame.clientWidth - card) / 2 - CENTRE * (card + gap())}px`);
    for (const slot of slots) slot.box.style.setProperty('--vd-preview-k', `${card / AUTHORED_WIDTH}`);
  };

  /** Mount what is at or near the middle, evict the rest, and play the one in the middle. */
  const settle = () => {
    for (const [i, slot] of slots.entries()) (i < MOUNTED ? mount : unmount)(slot);
    grant(slots[CENTRE]);
  };

  /**
   * Move the row over by one card, then send the card that has left round to the back.
   * The reorder happens with the transition off and the offset reset in the same breath,
   * so the row lands exactly where it started with new cards in it: that is what makes
   * the cycle endless rather than a long strip that eventually runs out.
   */
  const advance = () => {
    const leaving = slots[0];
    // A row of one has nowhere to go: it plays its one specimen, over and over.
    if (sliding || !rotates || !leaving || slots.length < 2) return;
    sliding = true;
    // Nothing plays mid-slide: a specimen demonstrating something while it slides out of
    // the frame is a demonstration nobody can follow.
    grant(undefined);
    track.dataset.sliding = '';
    track.style.setProperty('--vd-carousel-shift', `-${cardWidth() + gap()}px`);
    setTimeout(() => {
      sliding = false;
      // Its stage goes before the node moves: a custom element taken out of the document
      // and put back tears itself down and sets itself up again, and the specimen would
      // be built twice into a canvas that already has one.
      unmount(leaving);
      delete track.dataset.sliding;
      track.style.setProperty('--vd-carousel-shift', '0px');
      track.append(leaving.root);
      slots.shift();
      slots.push(leaving);
      settle();
    }, SLIDE_MS + 40);
  };

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
