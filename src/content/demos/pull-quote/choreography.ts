import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=pull]', state: 'visible' } },
  { assert: { selector: '[data-part=running]', state: 'visible' } },
  { wait: 900 },
  // A pull quote answers no pointer. The cursor walks the pairing instead: the
  // sentence in the running text, then the same sentence set as display type.
  { moveTo: '[data-part=running]' },
  { wait: 1100 },
  { moveTo: '[data-part=pull]' },
  { wait: 1200 },
  { assert: { selector: '[data-part=mark]', state: 'visible' } },
  { moveTo: '[data-part=after]' },
  { wait: 900 },
  { assert: { selector: '[data-part=after]', state: 'visible' } },
]);
