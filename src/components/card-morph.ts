/**
 * A card and the page it names are the same four things (SPEC §3).
 *
 * A listing card is a bordered surface carrying the headword, the definition and the
 * specimen, which is exactly what a term page opens with. So moving between them is not a
 * cut, it is a move, and it goes both ways: the card grows into the page, and leaving the
 * page puts it back.
 *
 * The mechanism is one pair of names per part, and every name carries the term's SLUG.
 * That is what keeps the morph honest: a name only ever matches its own term, so a card
 * grows into the page it names, and a reader crossing from one entry to another finds no
 * shared name to interpolate. Without the slug the three parts match by ROLE, which reads
 * as one word being bent into a different word, with its definition stretched from two
 * lines to four and its specimen sliding to wherever the taller definition pushed it. A
 * headword is not a shape, it is a claim, and the term page next door is a different one.
 *
 * The term page names its four in markup because it has exactly one of each; the card side
 * cannot, because a name has to be unique in a document and a listing is up to 207 cards.
 * So the names are written onto ONE card at the right moment and taken off when the
 * animation is over. Which card, and which moment, is the whole of this file:
 *
 * - Going TO a term page, it is the card the reader clicked, named before the outgoing
 *   page is photographed. The card comes from the router's own `sourceElement` rather than
 *   from a click listener of ours, which keeps this out of the way of the click ordering
 *   the router already owns.
 * - Coming BACK to a listing, it is the card for the term being left, named after the swap
 *   but before the incoming page is photographed. That moment is chosen because it is the
 *   first one where the new page is real: it is in the document and it has been scrolled to
 *   where the reader will see it, so the card can be MEASURED. It is named only if it is
 *   actually on screen, which is what makes Back feel like a return (the card is where the
 *   reader left it) without flinging the headword off the bottom of the page when it is
 *   not (following a category link into a list of 207, where the term sits at 5,000px).
 *
 * The front page's row is deliberately not part of the return trip. Its cards are shuffled
 * and the row is positioned by script that runs AFTER the incoming page is photographed
 * (SPEC §3), so a card measured here is not where it will be a frame later, and the
 * animation would land next to it. `[data-card-slug]` is a listing card and matches nothing
 * in the carousel, which is why the selector is the one written below and not a looser one.
 */

import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';

/**
 * What the term page calls each part, and therefore what a card's part must be called.
 * A `part` of undefined is the card itself: the surface the page's opening block grows
 * out of, which has no inner element because it IS the card.
 */
const NAMES: { part?: string; name: string }[] = [
  { name: 'term-card' },
  { part: '[data-card-name]', name: 'term-headword' },
  { part: '[data-card-definition]', name: 'term-definition' },
  { part: '.vd-preview', name: 'term-specimen' },
];

/**
 * How much of a card's picture has to be showing for the return trip to aim at it. Half,
 * because the animation is only worth running to somewhere the reader will watch it land.
 */
const IN_VIEW = 0.5;

/** The term page being left, remembered while its document is still the live one. */
let leaving: string | undefined;

const named: HTMLElement[] = [];
/** The card wearing the names, which is also the card being photographed at rest. */
let morphing: HTMLElement | undefined;

/**
 * Which term a card is for. A listing card says it one way, a carousel card the other.
 * Deliberately not `data-preview`, which is a listing card's "mount a specimen here" and
 * is absent on a term with no demo: a stub's card is still a headword in a bordered box,
 * and the two parts it does have should move like every other card's.
 */
function slugOf(card: HTMLElement): string | undefined {
  return card.dataset.cardSlug || card.dataset.slug || undefined;
}

function name(card: HTMLElement): void {
  const slug = slugOf(card);
  if (!slug) return;
  for (const { part, name } of NAMES) {
    const el = part ? card.querySelector(part) : card;
    if (!(el instanceof HTMLElement)) continue;
    el.style.setProperty('view-transition-name', `${name}-${slug}`);
    named.push(el);
  }
  // The pointer is on this card and the focus is inside it, because the reader just
  // clicked its link. Neither belongs in the still (see stage.css).
  card.dataset.morphing = '';
  morphing = card;
}

function clear(): void {
  for (const el of named.splice(0)) el.style.removeProperty('view-transition-name');
  if (morphing) delete morphing.dataset.morphing;
  morphing = undefined;
}

/** Enough of it on screen to be worth animating to. */
function onScreen(card: Element): boolean {
  const box = card.querySelector('.vd-preview') ?? card;
  const rect = box.getBoundingClientRect();
  const shown = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
  return rect.height > 0 && shown >= rect.height * IN_VIEW;
}

document.addEventListener('astro:before-preparation', (event) => {
  // Anything still named is from a navigation that was started and never arrived. It has
  // to go before another card is named, because two elements sharing a name is the one
  // thing the browser answers by refusing the whole transition rather than picking.
  clear();
  leaving = document.querySelector<HTMLElement>('article[data-term]')?.dataset.term;
  const card = (event as TransitionBeforePreparationEvent).sourceElement?.closest<HTMLElement>('[data-card-slug], .vd-carousel-card');
  if (card) name(card);
});

document.addEventListener('astro:before-swap', (event) => {
  // The outgoing page has been photographed by now, so the names have done their work.
  clear();
  // Held so the names the return trip is about to write can be taken off again the moment
  // the animation is over, rather than left on the page until the next navigation.
  const { viewTransition } = event as TransitionBeforeSwapEvent;
  void viewTransition?.finished.then(clear, clear);
});

document.addEventListener('astro:after-swap', () => {
  const slug = leaving;
  leaving = undefined;
  if (!slug) return;
  const card = document.querySelector<HTMLElement>(`[data-card-slug="${CSS.escape(slug)}"]`);
  if (card && onScreen(card)) name(card);
});
