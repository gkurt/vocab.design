import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=prop]', state: 'visible' } },
  { wait: 900 },
  // Neither block answers a pointer: the comparison is the demonstration, and the
  // cursor only reads it in the order a person would.
  { moveTo: '[data-part=prop-1]' },
  { wait: 1000 },
  { moveTo: '[data-part=mono-1]' },
  { wait: 1100 },
  { moveTo: '[data-part=mono-0]' },
  { wait: 900 },
  { assert: { selector: '[data-part=mono-0]', state: 'visible' } },
  { wait: 600 },
]);
