import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 1400 },
  { assert: { selector: '[data-part=item-6]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The sixth row is still waiting its turn while the first is already in place.
  { assert: { selector: '[data-part=item-1]', state: 'visible' } },
  { assert: { selector: '[data-part=item-6]', state: 'hidden' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=item-6]', state: 'visible' } },
  { wait: 600 },
]);
