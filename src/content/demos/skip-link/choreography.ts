import { steps } from '#src/stage/choreography.ts';

/**
 * The link is invisible until the first Tab of the page reaches it, and Enter puts the ring
 * inside the article instead of back at the top of the navigation. The walk is the stage's
 * own over the specimen's real tab sequence (SPEC §7), so the ring lands where a browser
 * would put focus, and every assert is reading that sequence.
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=skip]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-1]', state: 'visible' } },
  { assert: { selector: '[data-part=ring][data-at=rest]', state: 'visible' } },
  { wait: 700 },

  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=skip][data-revealed]', state: 'visible' } },
  { assert: { selector: '[data-part=skip][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=ring][data-at=revealed]', state: 'visible' } },
  { wait: 1000 },

  { press: 'Enter' },
  { wait: 700 },
  { assert: { selector: '[data-part=main][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-1][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-2][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=skip]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-state=jumped]', state: 'visible' } },
  { wait: 1000 },
]);
