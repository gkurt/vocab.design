import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=pair][data-letter=c]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-open][data-letter=c]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-closed]', state: 'visible' } },
  { moveTo: '[data-part=read-open]' },
  { wait: 900 },
  { assert: { selector: '[data-part=read-open]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the letter it reaches, and both
  // letters keep an aperture, so the subject is the term at every resting state.
  { moveTo: '[data-part=seg-e]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pair][data-letter=e]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-open][data-letter=e]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-closed][data-letter=e]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1200 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-c]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pair][data-letter=c]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-open][data-letter=c]', state: 'visible' } },
  { wait: 800 },
]);
