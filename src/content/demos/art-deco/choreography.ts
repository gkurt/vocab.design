import { steps } from '#src/stage/choreography.ts';

// A poster answers no pointer: the axis, the fan, the rule and the ziggurat are all
// on stage from mount, so the pass asserts them rather than touring them.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=fan]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { assert: { selector: '[data-part=steps]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=frame]', state: 'visible' } },
  { assert: { selector: '[data-part=subtitle]', state: 'visible' } },
  { wait: 1300 },
]);
