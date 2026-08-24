/**
 * Measuring a specimen that is not being shown at its authored size (SPEC §3, §5).
 *
 * A specimen is authored against 720x320 and a listing card shows it at half that, by
 * scaling the whole stage body. `getBoundingClientRect` reports the scaled box, which is
 * a trap for any demo that measures one element to place another: the numbers come back
 * in the card's pixels and go out in the specimen's, so whatever it placed lands at half
 * the distance. Nothing about it looks wrong on a term page, where the scale is 1.
 *
 * So a demo that measures asks for its geometry in the coordinate space it is laid out
 * in, which is what these return. `--sp-scale` is how the stage tells a specimen what it
 * is being displayed at; it is absent (and therefore 1) everywhere but a preview, and it
 * is read live rather than at mount, because a card is re-scaled when the window is.
 */

/** What one specimen pixel is currently drawn as. 1 unless a preview is scaling it. */
export function displayScale(el: Element): number {
  const declared = Number.parseFloat(getComputedStyle(el).getPropertyValue('--sp-scale'));
  return Number.isFinite(declared) && declared > 0 ? declared : 1;
}

export interface LocalBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * `el`'s box in specimen pixels, relative to `within` (its own offset context, whatever
 * that element is). The drop-in for a pair of `getBoundingClientRect` calls whose
 * difference is about to be written back as a length.
 */
export function localBox(el: Element, within: Element): LocalBox {
  const scale = displayScale(el);
  const box = el.getBoundingClientRect();
  const frame = within.getBoundingClientRect();
  return {
    left: (box.left - frame.left) / scale,
    top: (box.top - frame.top) / scale,
    width: box.width / scale,
    height: box.height / scale,
  };
}

/** An element's own box in specimen pixels, for a size measured and then written back. */
export function localSize(el: Element): { width: number; height: number } {
  const scale = displayScale(el);
  const box = el.getBoundingClientRect();
  return { width: box.width / scale, height: box.height / scale };
}

/**
 * Where a pointer is inside `within`, in specimen pixels. A ratio of the element's own
 * size (a slider's position along its track) needs none of this, since scaling cancels
 * out; a distance in pixels does.
 */
export function localPoint(event: { clientX: number; clientY: number }, within: Element): { x: number; y: number } {
  const scale = displayScale(within);
  const frame = within.getBoundingClientRect();
  return { x: (event.clientX - frame.left) / scale, y: (event.clientY - frame.top) / scale };
}
