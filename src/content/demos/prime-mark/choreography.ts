import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=foot][data-marks=primes]', state: 'visible' } },
  { assert: { selector: '[data-part=inch][data-marks=primes]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-mark]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the character it reaches.
  { moveTo: '[data-part=seg-straight]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=foot][data-marks=straight]', state: 'visible' } },
  { assert: { selector: '[data-part=foot][data-marks=primes]', state: 'hidden' } },
  { moveTo: '[data-part=seg-curly]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=inch][data-marks=curly]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 800 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends on the character the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-primes]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=foot][data-marks=primes]', state: 'visible' } },
  { assert: { selector: '[data-part=inch][data-marks=primes]', state: 'visible' } },
  { wait: 700 },
]);
