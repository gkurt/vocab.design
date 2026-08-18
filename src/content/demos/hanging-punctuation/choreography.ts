import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=column][data-hung]', state: 'visible' } },
  { assert: { selector: '[data-part=quote][data-hung]', state: 'visible' } },
  { moveTo: '[data-part=column]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass ends hung, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-inline]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-hung]', state: 'hidden' } },
  { assert: { selector: '[data-part=quote][data-hung]', state: 'hidden' } },
  { assert: { selector: '[data-part=quote]', state: 'visible' } },
  { moveTo: '[data-part=seg-hung]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=quote][data-hung]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-hung]', state: 'visible' } },
  { wait: 700 },
]);
