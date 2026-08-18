import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor crosses the motif tile,
 * the shape tile, and the interface fragment that applies both, while the asserts hold each
 * reading of the register on stage. The opening wait lets the mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=fragment]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=tile-motif]' },
  { wait: 850 },
  { assert: { selector: '[data-part=motif]', state: 'visible' } },
  { moveTo: '[data-part=tile-shapes]' },
  { wait: 850 },
  { assert: { selector: '[data-part=kidney]', state: 'visible' } },
  { moveTo: '[data-part=fragment-button]' },
  { wait: 850 },
  { assert: { selector: '[data-part=fragment-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
