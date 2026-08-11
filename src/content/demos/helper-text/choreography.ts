import { steps } from '#src/stage/choreography.ts';

export default steps([
  // There before anyone touched the form, which is the whole claim.
  { assert: { selector: '[data-part=helper]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=input]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=helper]', state: 'visible' } },
  { type: 'northwind-' },
  { wait: 500 },
  { type: 'design' },
  { wait: 700 },
  // Still there once the field has a value: a hint is not a placeholder.
  { assert: { selector: '[data-part=helper]', state: 'visible' } },
  { wait: 700 },
]);
