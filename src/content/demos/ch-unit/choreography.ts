import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=column][data-ch="45"]', state: 'visible' } },
  // One zero's advance: the unit itself, drawn.
  { assert: { selector: '[data-part=unit]', state: 'visible' } },
  { assert: { selector: '[data-part=ruler-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=ruler-serif]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the count it reaches.
  { moveTo: '[data-part=seg-60]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-ch="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-ch="45"]', state: 'hidden' } },
  { assert: { selector: '[data-part=unit]', state: 'visible' } },
  { moveTo: '[data-part=seg-30]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-ch="30"]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-45]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-ch="45"]', state: 'visible' } },
  { assert: { selector: '[data-part=ruler-sans]', state: 'visible' } },
  { wait: 700 },
]);
