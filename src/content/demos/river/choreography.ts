import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=rivered]', state: 'visible' } },
  { assert: { selector: '[data-part=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=trace-rivered][data-state=on]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, not a flip: the pass reaches "off" and then reaches "on"
  // again, so it demonstrates the same thing wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=trace-rivered]', state: 'hidden' } },
  { moveTo: '[data-part=rivered]' },
  { wait: 1400 },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=trace-rivered][data-state=on]', state: 'visible' } },
  { moveTo: '[data-part=readout-rivered]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=readout-fixed]', state: 'visible' } },
]);
