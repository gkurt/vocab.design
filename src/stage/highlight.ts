/**
 * The OG still's annotation (SPEC §10). Identify's spotlight answers "which part of
 * this is the term" to a reader who can move a pointer and read a label; a share
 * image has neither, so it says the same thing with light alone: the subject at full
 * strength, the rest of the canvas faded back toward the stage's own ground.
 *
 * That is deliberately NOT identify's ink. No accent ring, because a border reads as
 * chrome once it is the only thing on the picture. No pin, because the caption under
 * the specimen already prints the headword. And no scrim: identify lays a dark sheet
 * over everything outside its ring, which in a still is a rectangle of dead pixels
 * with a hole in it. Fading the demo itself keeps the surrounding UI legible as
 * context while leaving no doubt where to look.
 */

/** How far past the subject's own box the highlight stays at full strength. */
const PAD = 16;
/** The falloff, in px. Large enough that no edge of it reads as a border. */
const FEATHER = 60;
/** Least of the canvas the highlight may cover, so a chip-sized subject still photographs. */
const MIN_SHARE = 0.32;
/** What the faded rest keeps. Zero would dissolve the demo; this leaves it readable as context. */
const FLOOR = 0.34;

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * What the highlight covers, given the subject's box and the canvas it is on, both in
 * canvas coordinates. Padded so the fade never crowds the thing it is pointing at,
 * floored so a subject the size of a chip still photographs as a subject, and kept
 * inside the canvas by sliding rather than by shrinking: a plateau half off the frame
 * would put the falloff where the picture is instead of around it.
 */
export function highlightBox(subject: Box, canvas: { width: number; height: number }): Box {
  const width = Math.min(Math.max(subject.width + PAD * 2, canvas.width * MIN_SHARE), canvas.width);
  const height = Math.min(Math.max(subject.height + PAD * 2, canvas.height * MIN_SHARE), canvas.height);
  const centreX = subject.left + subject.width / 2;
  const centreY = subject.top + subject.height / 2;
  return {
    left: Math.min(Math.max(centreX - width / 2, 0), canvas.width - width),
    top: Math.min(Math.max(centreY - height / 2, 0), canvas.height - height),
    width,
    height,
  };
}

/**
 * A soft-edged plateau over `hole`, as a mask image. An SVG rather than stacked CSS
 * gradients because the shape is a rounded rectangle with a uniform floor, and
 * intersecting two gradients squares the floor in the corners. White throughout, so
 * the mask reads the same whether it is taken as alpha or as luminance.
 */
function maskImage(size: { width: number; height: number }, hole: Box): string {
  const radius = Math.min(24, hole.width / 2, hole.height / 2);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">`,
    `<filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${(FEATHER / 3).toFixed(1)}"/></filter>`,
    `<rect width="100%" height="100%" fill="#fff" fill-opacity="${FLOOR}"/>`,
    `<rect x="${hole.left.toFixed(1)}" y="${hole.top.toFixed(1)}" width="${hole.width.toFixed(1)}" height="${hole.height.toFixed(1)}" rx="${radius.toFixed(1)}" fill="#fff" filter="url(#f)"/>`,
    '</svg>',
  ].join('');
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Fade `canvas` everywhere but around `subject`. The subject may live in a document
 * of its own, so its box arrives through the surface's `offset` exactly as the
 * identify ring's does (SPEC §6): the mask belongs to the canvas, which is the page's.
 *
 * A whole-scene subject is the caller's to skip: "all of it" is an answer no
 * highlight can give, and fading nothing is the honest picture of it.
 */
export function fadeToSubject(canvas: HTMLElement, subject: HTMLElement, offset: () => { x: number; y: number; scale: number }): void {
  const canvasRect = canvas.getBoundingClientRect();
  const rect = subject.getBoundingClientRect();
  const { x, y, scale } = offset();
  const box = highlightBox(
    {
      left: rect.left * scale + x - canvasRect.left,
      top: rect.top * scale + y - canvasRect.top,
      width: rect.width * scale,
      height: rect.height * scale,
    },
    canvasRect,
  );
  const mask = maskImage(canvasRect, box);
  canvas.style.maskImage = mask;
  canvas.style.maskSize = '100% 100%';
  canvas.style.maskRepeat = 'no-repeat';
}

/**
 * The same fade with nothing held at full strength, for a still whose subject is not on
 * the canvas: an announcement or a verdict, which the strip lifts out of the fiction and
 * a capture does not draw (SPEC §10). Pointing light at where that element used to be
 * would circle empty ground, so the picture stops pointing and simply reads as a whole.
 */
export function fadeCanvas(canvas: HTMLElement): void {
  canvas.style.maskImage = 'none';
  canvas.style.opacity = String(FLOOR + (1 - FLOOR) / 2);
}
