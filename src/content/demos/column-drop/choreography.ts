import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the arrangement waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=viewport][data-rows=one]', state: 'visible' } },
  { assert: { selector: '[data-part=col-3][data-drop=inline]', state: 'visible' } },
  { assert: { selector: '[data-part=col-1]', state: 'visible' } },
  { wait: 600 },

  // The third column peels off first and takes the full width below the other two.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=viewport][data-rows=two]', state: 'visible' } },
  { assert: { selector: '[data-part=col-3][data-drop=below]', state: 'visible' } },
  { assert: { selector: '[data-part=col-2]', state: 'visible' } },
  { wait: 800 },

  // Narrower still, and the second follows it down: one column per row, in order.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=viewport][data-rows=three]', state: 'visible' } },
  { assert: { selector: '[data-part=col-3][data-drop=below]', state: 'visible' } },
  { assert: { selector: '[data-part=col-1]', state: 'visible' } },
  { wait: 800 },

  // Back to the widest, where all three share the row again.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=viewport][data-rows=one]', state: 'visible' } },
  { assert: { selector: '[data-part=col-3][data-drop=inline]', state: 'visible' } },
  { wait: 700 },
]);
