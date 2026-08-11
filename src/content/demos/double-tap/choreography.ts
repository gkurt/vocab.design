import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=photo][data-zoom="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=tile][data-selected]', state: 'hidden' } },
  { moveTo: '[data-part=tile]' },
  { wait: 400 },
  // One tap first, so the pair is read against the gesture it is built out of.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tile][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=photo][data-zoom="1"]', state: 'visible' } },
  { wait: 700 },
  { dblclick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=photo][data-zoom="2"]', state: 'visible' } },
  { wait: 1300 },
  // The way back is a control anyone can see, not a second pair of taps.
  { moveTo: '[data-part=reset]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=photo][data-zoom="1"]', state: 'visible' } },
  { wait: 900 },
]);
