import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor crosses the panel with
 * its orbit and its patterned column, then the interface fragment where the same geometry
 * divides rather than tiles, while the asserts hold each reading of the register on stage.
 * The opening wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=fragment]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=panel]' },
  { wait: 850 },
  { assert: { selector: '[data-part=orbit]', state: 'visible' } },
  { assert: { selector: '[data-part=pattern]', state: 'visible' } },
  { moveTo: '[data-part=fragment-rule]' },
  { wait: 850 },
  { assert: { selector: '[data-part=fragment-heading]', state: 'visible' } },
  { moveTo: '[data-part=fragment-button]' },
  { wait: 850 },
  { assert: { selector: '[data-part=fragment-eyebrow]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
