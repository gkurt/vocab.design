import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=prose][data-mode=indent]', state: 'visible' } },
  { assert: { selector: '[data-part=para-2][data-indent]', state: 'visible' } },
  { assert: { selector: '[data-part=guide]', state: 'visible' } },
  { wait: 1000 },
  // Absolute picks, never a flip: each segment names the arrangement it reaches,
  // and the pass returns to the indent, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-space]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prose][data-mode=space]', state: 'visible' } },
  { moveTo: '[data-part=css]' },
  { wait: 900 },
  { assert: { selector: '[data-part=css]', state: 'visible' } },
  { moveTo: '[data-part=seg-both]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prose][data-mode=both]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { moveTo: '[data-part=seg-indent]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prose][data-mode=indent]', state: 'visible' } },
  { assert: { selector: '[data-part=para-2][data-indent]', state: 'visible' } },
  { wait: 900 },
]);
