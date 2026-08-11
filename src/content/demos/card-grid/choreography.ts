import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { moveTo: '[data-part=card-2]' },
  { wait: 900 },
  // Every peer is on the field at once: the row below starts on one line because
  // the cards above it share a height.
  { assert: { selector: '[data-part=card-4]', state: 'visible' } },
  { moveTo: '[data-part=card-6]' },
  { wait: 900 },
  { assert: { selector: '[data-part=card-6]', state: 'visible' } },
  { wait: 900 },
]);
