import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor crosses Metro's typographic
 * plane, its tile row, and then Aero's scene, while the asserts hold each half of the mashup on
 * stage. The opening wait lets the mount fade finish before the first claim.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=type-block]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=word]' },
  { wait: 850 },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { moveTo: '[data-part=tiles]' },
  { wait: 850 },
  { assert: { selector: '[data-part=tile-star]', state: 'visible' } },
  { moveTo: '[data-part=bubbles]' },
  { wait: 850 },
  { assert: { selector: '[data-part=swooshes]', state: 'visible' } },
  { moveTo: '[data-part=figures]' },
  { wait: 850 },
  { assert: { selector: '[data-part=figures]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
