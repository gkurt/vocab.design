import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=readout][data-value="0"]', state: 'visible' } },
  { moveTo: '[data-part=star-4]' },
  { wait: 300 },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=star-4][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-value="4"]', state: 'visible' } },
  { wait: 1000 },
  // The second press is a value, not a step: pressing the second mark means two
  // stars whatever the row was showing when the pass began (SPEC §8).
  { moveTo: '[data-part=star-2]' },
  { wait: 300 },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=star-2][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=star-4][aria-checked="true"]', state: 'hidden' } },
  { wait: 1000 },
]);
