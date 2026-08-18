import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=para][data-mode=runt]', state: 'visible' } },
  { assert: { selector: '[data-part=last][data-runt]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 900 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the measure it reaches, and the
  // pass returns to the stranded state, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-fixed]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=para][data-mode=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=measure]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1100 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-runt]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=para][data-mode=runt]', state: 'visible' } },
  { assert: { selector: '[data-part=last][data-runt]', state: 'visible' } },
  { wait: 800 },
]);
