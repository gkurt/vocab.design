import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line][data-mode=faux]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-faked]', state: 'visible' } },
  { moveTo: '[data-part=detail]' },
  { wait: 900 },
  { assert: { selector: '[data-part=detail-live]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to the synthesized setting, which the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-real]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=real]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-faked]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=off]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 900 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { moveTo: '[data-part=seg-faux]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=faux]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-faked]', state: 'visible' } },
  { wait: 700 },
]);
