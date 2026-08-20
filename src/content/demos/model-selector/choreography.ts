import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the composer to land.
  { wait: 700 },
  { assert: { selector: '[data-part=trigger][data-model=lumen]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 400 },

  // Pressing the control opens the list: a name, a line saying what the option is for,
  // and a hint, with the one in force already marked.
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=menu][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=item-lumen][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=item-atlas]', state: 'visible' } },
  { assert: { selector: '[data-part=item-atlas][data-current]', state: 'hidden' } },
  { wait: 900 },

  // Choosing is the dismissal. The list goes with it, so the answer has to be readable
  // on the control itself, which is where it belongs.
  { moveTo: '[data-part=item-atlas]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-model=atlas]', state: 'visible' } },
  { wait: 900 },

  // And again, to the fastest option: the mark moves with the choice and the label follows.
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=item-atlas][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=item-mini][data-current]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=item-mini]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=trigger][data-model=mini]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 700 },
]);
