import controls from '#src/kit/controls.css?inline';
import layout from '#src/kit/layout.css?inline';
import motion from '#src/kit/motion.css?inline';
import surfaces from '#src/kit/surfaces.css?inline';
import tokens from '#src/kit/tokens.css?inline';

/**
 * The specimen kit as one stylesheet, adopted into every stage's shadow root.
 * Kept as separate authoring files (tokens, layout, controls, surfaces, motion)
 * and joined here so the stage stays a single `adoptedStyleSheets` assignment.
 */
export const kitCss = [tokens, layout, controls, surfaces, motion].join('\n');
