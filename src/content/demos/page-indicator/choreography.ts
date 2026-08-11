import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=dot-1][aria-current="true"]', state: 'visible' } },
  { moveTo: '[data-part=dot-3]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dot-3][aria-current="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-index="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-1][aria-current="true"]', state: 'hidden' } },
  { wait: 1000 },
  // A dot is a destination, not a direction: pressing the second one means page
  // two from wherever the flow happens to be (SPEC §8).
  { moveTo: '[data-part=dot-2]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dot-2][aria-current="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-index="1"]', state: 'visible' } },
  { wait: 900 },
]);
