import { steps } from '#src/stage/choreography.ts';

/**
 * One page, one gesture, three settings. On Headings the flick skips four elements to reach
 * the second heading; on Links the same flick visits the two links; on Form controls it lands
 * on the field and then the button. Each segment reaches its own setting and the walk clamps
 * at the last stop (SPEC §8), and the pass ends back on Headings, where it began.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=rotor][data-value=headings]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-at=node-h1]', state: 'visible' } },
  { wait: 700 },

  // Four elements sit between the two headings, and the flick passes every one of them.
  { moveTo: '[data-part=flick]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=node-h2][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=node-link1][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-links]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rotor][data-value=links]', state: 'visible' } },
  { assert: { selector: '[data-part=node-link1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h2][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=say][data-at=node-link1]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=flick]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=node-link2][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-link1][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-controls]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rotor][data-value=controls]', state: 'visible' } },
  { assert: { selector: '[data-part=node-field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-link2][data-sim-focus]', state: 'hidden' } },
  { wait: 700 },

  { moveTo: '[data-part=flick]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=node-button][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-at=node-button]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-headings]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rotor][data-value=headings]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-button][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },
]);
