import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): a start screen of flat tiles under one light heading,
 * with no gradient, bevel, or shadow anywhere. Nothing opens and nothing answers a
 * pointer, so the pass waits and asserts what the panel shows at rest.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=subtitle]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=tiles]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-mail]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-people]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-agenda]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
