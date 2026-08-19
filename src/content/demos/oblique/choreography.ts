import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line][data-slant=oblique]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-ghost]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches.
  { moveTo: '[data-part=seg-roman]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-slant=roman]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-slant=oblique]', state: 'hidden' } },
  { moveTo: '[data-part=seg-italic]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=line][data-slant=italic]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 800 },
  { assert: { selector: '[data-part=detail-live]', state: 'visible' } },
  // Ends on the setting the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-oblique]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=line][data-slant=oblique]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 700 },
]);
