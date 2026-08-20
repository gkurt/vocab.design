import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the ramp waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=ramp][data-viewport=narrow][data-moved=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=band-xs]', state: 'visible' } },
  { assert: { selector: '[data-part=band-xxl]', state: 'visible' } },
  { wait: 600 },

  // A wider viewport, and every one of the six steps has moved: none of them held its value.
  { moveTo: '[data-part=seg-mid]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=ramp][data-viewport=mid][data-moved=all]', state: 'visible' } },
  { assert: { selector: '[data-part=band-m]', state: 'visible' } },
  { assert: { selector: '[data-part=value-m]', state: 'visible' } },
  { wait: 700 },

  // At the maximum viewport every step is at its ceiling, and all six moved again.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=ramp][data-viewport=wide][data-moved=all]', state: 'visible' } },
  { assert: { selector: '[data-part=band-xxl]', state: 'visible' } },
  { wait: 700 },

  // Back to the minimum, where the floors hold.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=ramp][data-viewport=narrow][data-moved=all]', state: 'visible' } },
  { assert: { selector: '[data-part=band-xs]', state: 'visible' } },
  { wait: 700 },
]);
