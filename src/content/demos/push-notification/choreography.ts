import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=notice-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { moveTo: '[data-part=deliver]' },
  { click: true },
  { wait: 700 },
  // Delivered to a locked phone, and counted on the icon.
  { assert: { selector: '[data-part=notice-1]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-count="1"]', state: 'visible' } },
  { wait: 1000 },
  { click: true },
  { wait: 700 },
  // A second one stacks under the first instead of moving it.
  { assert: { selector: '[data-part=notice-2]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-count="2"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=dismiss-1]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  // Dismissing one leaves the other, and the count follows.
  { assert: { selector: '[data-part=notice-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=notice-2]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-count="1"]', state: 'visible' } },
  { wait: 1400 },
]);
