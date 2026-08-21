import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): a poster whose buzzing bands, rosette, and stretched
 * lettering are all visible at rest. There is nothing to operate, so the pass waits
 * and asserts instead of walking a cursor over the artwork.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=swirl]', state: 'visible' } },
  { assert: { selector: '[data-part=rosette]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=lettering]', state: 'visible' } },
  { assert: { selector: '[data-part=line-one]', state: 'visible' } },
  { assert: { selector: '[data-part=line-three]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 700 },
]);
