import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 1400 },
  { assert: { selector: '[data-part=item-4]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The last row is still waiting its turn while the first is already in place.
  { assert: { selector: '[data-part=item-1]', state: 'visible' } },
  { assert: { selector: '[data-part=item-4]', state: 'hidden' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=item-4]', state: 'visible' } },
  { wait: 600 },
]);
