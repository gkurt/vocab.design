import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the bar waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=item][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 500 },

  // The item is the application's handle in a bar the application does not own.
  { moveTo: '[data-part=item]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=item][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=run]', state: 'visible' } },
  { wait: 800 },

  // Choosing a command is one of the panel's explicit dismissals. The evidence that it
  // happened is on the item, in the bar, where the panel no longer is.
  { moveTo: '[data-part=run]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=item][data-state=running]', state: 'visible' } },

  // The run finishes on the stage's clock and the item settles back by itself.
  { wait: 2400 },
  { assert: { selector: '[data-part=item][data-state=idle]', state: 'visible' } },
  { wait: 500 },

  // Opened again, and dismissed the other explicit way.
  { moveTo: '[data-part=item]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 700 },
  { press: 'Escape' },
  { wait: 550 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=item][data-state=idle]', state: 'visible' } },
  { wait: 700 },
]);
