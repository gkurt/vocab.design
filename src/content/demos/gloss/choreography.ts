import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer. The cursor puts the glossy pair beside the matte one,
 * then walks the three layers the finish is made of, and the asserts hold the whole
 * comparison on stage from the first beat (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=glossy]', state: 'visible' } },
  { assert: { selector: '[data-part=matte]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=glossy-button]' },
  { wait: 800 },
  { moveTo: '[data-part=matte-button]' },
  { wait: 800 },
  { assert: { selector: '[data-part=glossy-icon]', state: 'visible' } },
  { moveTo: '[data-part=layer-body]' },
  { wait: 750 },
  { moveTo: '[data-part=layer-band]' },
  { wait: 750 },
  { moveTo: '[data-part=layer-all]' },
  { wait: 750 },
  { assert: { selector: '[data-part=anatomy]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
