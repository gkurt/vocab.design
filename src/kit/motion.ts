/**
 * Whether the reader has asked for less movement.
 *
 * `motion.css` gates every animation the kit owns, but a CSS block cannot reach an
 * `element.animate` keyframe set: a demo that animates in script has to ask the
 * question itself and jump to the end state instead of playing the move.
 *
 * The question is asked of the realm the specimen is actually in. A framed specimen
 * has a window of its own (SPEC §6), and the page's `matchMedia` would answer for
 * the wrong document.
 */
export function prefersReducedMotion(node: Node): boolean {
  const view = node.ownerDocument?.defaultView ?? window;
  return view.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
