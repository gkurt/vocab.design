import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the term is a pattern language printed on one card, and
 * every device it names is on stage at rest. Nothing here answers a pointer, so the
 * pass waits and asserts; naming the parts in turn is the identify pin's job.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=zigzag]', state: 'visible' } },
  { assert: { selector: '[data-part=terrazzo]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=squiggle]', state: 'visible' } },
  { assert: { selector: '[data-part=stripes]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
