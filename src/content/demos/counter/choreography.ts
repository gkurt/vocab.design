import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=counter][data-weight=regular]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-e]', state: 'visible' } },
  { moveTo: '[data-part=panel-e]' },
  { wait: 900 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the weight it reaches.
  { moveTo: '[data-part=seg-bold]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=counter][data-weight=bold]', state: 'visible' } },
  { assert: { selector: '[data-part=letter-o]', state: 'visible' } },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=counter][data-weight=light]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-regular]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=counter][data-weight=regular]', state: 'visible' } },
  { wait: 700 },
]);
