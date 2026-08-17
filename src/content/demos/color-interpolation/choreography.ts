import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=ramp][data-mode=srgb]', state: 'visible' } },
  { assert: { selector: '[data-part=wheel]', state: 'visible' } },
  // The grey midpoint only exists on the straight route through the middle.
  { assert: { selector: '[data-part=mid]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-shorter]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ramp][data-mode=shorter]', state: 'visible' } },
  { assert: { selector: '[data-part=mid]', state: 'hidden' } },
  { assert: { selector: '[data-part=method]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-longer]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ramp][data-mode=longer]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-srgb]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ramp][data-mode=srgb]', state: 'visible' } },
  { assert: { selector: '[data-part=mid]', state: 'visible' } },
  { wait: 900 },
]);
