import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ramp][data-saturation="40"]', state: 'visible' } },
  { moveTo: '[data-part=stop-92]' },
  { click: true },
  // The hue never moved; only how far the colour is from grey.
  { assert: { selector: '[data-part=ramp][data-saturation="92"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-92][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-0]' },
  { click: true },
  { assert: { selector: '[data-part=ramp][data-saturation="0"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-40]' },
  { click: true },
  { assert: { selector: '[data-part=ramp][data-saturation="40"]', state: 'visible' } },
  { wait: 1200 },
]);
