import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=headline][data-case="title"]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, never a flip: the pass reaches "sentence" and then reaches
  // "title" again, so it reads the same wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-sentence]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=headline][data-case="sentence"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-title]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=headline][data-case="title"]', state: 'visible' } },
  { moveTo: '[data-part=menu-trash]' },
  { wait: 900 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 800 },
]);
