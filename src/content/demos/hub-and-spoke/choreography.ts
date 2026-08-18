import { steps } from '#src/stage/choreography.ts';

// Home, into a task, back out, and into a second one. The shape is proved by what is
// missing: from a spoke the read-out counts one destination, and the only way to reach
// the second task is through the hub. The pass ends at home, where the specimen mounts.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=hub]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke]', state: 'hidden' } },
  { assert: { selector: '[data-part=routes][data-at=hub]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=tile-inbox]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=spoke][data-task=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=hub]', state: 'hidden' } },
  { assert: { selector: '[data-part=routes][data-at=spoke]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=hub]', state: 'visible' } },
  { assert: { selector: '[data-part=routes][data-at=hub]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=tile-calendar]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=spoke][data-task=calendar]', state: 'visible' } },
  { assert: { selector: '[data-part=hub]', state: 'hidden' } },
  { wait: 1200 },

  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=hub]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke]', state: 'hidden' } },
  { wait: 700 },
]);
