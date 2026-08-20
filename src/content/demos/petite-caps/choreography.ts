import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the term is four drawings of one word on one baseline,
 * and every claim it makes is visible at rest. There is no second state to reach
 * and nothing for a cursor to do, so the script waits and asserts.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=run-petite]', state: 'visible' } },
  { assert: { selector: '[data-part=petite-glyphs]', state: 'visible' } },
  // The two rules the comparison is read against, each a box rather than a hairline.
  { assert: { selector: '[data-part=rule-x]', state: 'visible' } },
  { assert: { selector: '[data-part=rule-cap]', state: 'visible' } },
  { wait: 900 },
  // The three samples the petite one is measured against.
  { assert: { selector: '[data-part=run-lower]', state: 'visible' } },
  { assert: { selector: '[data-part=run-caps]', state: 'visible' } },
  { assert: { selector: '[data-part=run-small]', state: 'visible' } },
  { assert: { selector: '[data-part=label-petite]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
