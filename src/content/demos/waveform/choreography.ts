import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=wave][data-at="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-4][data-played="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-30][data-played="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=elapsed][data-time="0:17"]', state: 'visible' } },
  { wait: 600 },
  // Aiming at a feature in the drawing: the loud passage two thirds along.
  { moveTo: '[data-part=bar-33]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=wave][data-at="33"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-30][data-played="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=elapsed][data-time="0:48"]', state: 'visible' } },
  { wait: 1100 },
  // A bar is an absolute destination, so seeking back is the same gesture.
  { moveTo: '[data-part=bar-9]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=wave][data-at="9"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-30][data-played="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-4][data-played="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=elapsed][data-time="0:13"]', state: 'visible' } },
  { wait: 900 },
]);
