import { steps } from '#src/stage/choreography.ts';

/**
 * Three Tab presses walk the toolbar, and the third one lands on Save rather than on Sort:
 * the skip is performed by the stage's own walk over the elements a browser would visit. Then
 * the ring is put on Sort from script, which is the half of the distinction Tab can never
 * reach. The walk clamps at nothing and flips nothing, so a pass joined halfway proves the
 * same thing (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=sort][tabindex="-1"]', state: 'visible' } },
  { assert: { selector: '[data-part=search][tabindex="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=search][data-sim-focus]', state: 'visible' } },
  { wait: 500 },

  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=search][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-via=tab]', state: 'visible' } },
  { wait: 500 },

  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=filter][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=sort][data-sim-focus]', state: 'hidden' } },
  { wait: 600 },

  // The skip itself: the next stop after Filter is Save, and Sort sits between them.
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=save][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=sort][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-at=save]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=script]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sort][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-via=script]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-via=script]', state: 'visible' } },
  { assert: { selector: '[data-part=save][data-sim-focus]', state: 'hidden' } },
  { wait: 1400 },
]);
