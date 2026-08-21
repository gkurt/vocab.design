import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=entry][data-indent=hanging]', state: 'visible' } },
  { assert: { selector: '[data-part=guide]', state: 'visible' } },
  { assert: { selector: '[data-part=css]', state: 'visible' } },
  { wait: 900 },
  // Absolute shapes, never a flip: each pick names the state it reaches, and the
  // pass returns to hanging, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-first]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=entry][data-indent=first]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=entry][data-indent=none]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-hanging]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=entry][data-indent=hanging]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
