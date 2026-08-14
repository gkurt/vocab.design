import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The dithered ramp is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=dithered][data-strength="medium"]', state: 'visible' } },
  { assert: { selector: '[data-part=raw]', state: 'visible' } },
  { assert: { selector: '[data-part=zoom]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  // Less noise, and the boundaries the raw panel still shows start coming back.
  { assert: { selector: '[data-part=dithered][data-strength="light"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-heavy]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dithered][data-strength="heavy"]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dithered][data-strength="medium"]', state: 'visible' } },
  { wait: 900 },
]);
