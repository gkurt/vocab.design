import { steps } from '#src/stage/choreography.ts';

// Characters land one at a time (SPEC §8), which is the only way the second beat can
// be read for what it is: two keys landing over the selected remainder, not after it,
// so the guess changes instead of being accepted.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=remainder]', state: 'hidden' } },
  { moveTo: '[data-part=editor]' },
  { wait: 300 },
  { click: true },
  { wait: 300 },
  { type: 'voc' },
  { wait: 550 },
  { assert: { selector: '[data-part=field][data-guess="vocabulary"]', state: 'visible' } },
  { assert: { selector: '[data-part=remainder]', state: 'visible' } },
  { wait: 1300 },
  { type: 'al' },
  { wait: 600 },
  // "abulary" was never the reader's text: the two keys replaced it.
  { assert: { selector: '[data-part=field][data-guess="vocal range"]', state: 'visible' } },
  { assert: { selector: '[data-part=remainder]', state: 'visible' } },
  { wait: 1500 },
]);
