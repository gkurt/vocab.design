import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): the rain has exactly one state and it animates itself, so there is
// nothing for a cursor to reach for and a hover with no consequence would be theater. What the
// asserts prove is that the field is really up, that the window around it holds, and that the
// one line of type on the wall kept the opaque plate the contrast problem requires. The opening
// wait is the kit's mount fade.
export default steps([
  { wait: 520 },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { assert: { selector: '[data-part=window]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-line]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1200 },
]);
