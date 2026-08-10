/**
 * The two questions the stage asks about an element, kept apart because they are
 * genuinely different questions.
 *
 * Both ignore nothing structural: `display: none`, `visibility: hidden`, and a
 * box clipped down to a pixel (visually hidden text) all mean absent. What they
 * disagree about is opacity, and the disagreement is the point.
 */

/**
 * Computed style from the element's own realm. A `demo: iframe` specimen lives in
 * a second document (SPEC §6), and the page's `getComputedStyle` is not the one
 * that knows how its elements resolve.
 */
function styleOf(el: HTMLElement): CSSStyleDeclaration {
  return (el.ownerDocument.defaultView ?? window).getComputedStyle(el);
}

function hasBox(el: HTMLElement, style: CSSStyleDeclaration): boolean {
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 1 && rect.height > 1;
}

/**
 * Is the element on stage, or on its way there? Identify's summon polls with
 * this (SPEC §6), so it has to answer true the instant a reveal begins: a
 * summon that waited for the fade to finish would be a hover affordance that
 * settles a fifth of a second late, every time.
 */
export function isRevealed(el: HTMLElement): boolean {
  return hasBox(el, styleOf(el));
}

/**
 * Could a reader see it? This is what an `assert` means by `visible` and
 * `hidden` (SPEC §8), and unlike summon it does consult opacity: a row still
 * waiting its turn in a stagger occupies its space and is faded to nothing, and
 * a script that says the last row has not arrived yet is telling the truth.
 *
 * The threshold is a floor, not a tolerance. Kit surfaces pair opacity with
 * `visibility`, which is discrete and so flips only at the ends of a
 * transition, meaning this only ever adjudicates elements that CSS has parked
 * at zero rather than ones caught mid-fade. A demo whose claim is close enough
 * to the line for the exact number to matter has a timing problem the harness
 * should surface, not smooth over.
 */
export function isSeen(el: HTMLElement): boolean {
  const style = styleOf(el);
  if (!hasBox(el, style)) return false;
  return Number.parseFloat(style.opacity) > 0.05;
}
