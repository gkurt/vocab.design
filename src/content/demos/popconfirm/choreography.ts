import { steps } from '#src/stage/choreography.ts';

// Each trigger only opens, and the bubble re-anchors to whichever one was pressed,
// so a pass picked up anywhere asks the same question in the same place (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=popconfirm]', state: 'hidden' } },
  { moveTo: '[data-part=remove-ada]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=popconfirm]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=cancel]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=popconfirm]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-ada]', state: 'visible' } },
  { wait: 700 },
  // Anchored to the control that raised it: the same bubble, a different row.
  { moveTo: '[data-part=remove-priya]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=popconfirm]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=confirm]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=popconfirm]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-priya]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-ada]', state: 'visible' } },
  { wait: 800 },
]);
