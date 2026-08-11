import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Measured, not claimed: the carried paragraph is one line, and that line is one word.
  { assert: { selector: '[data-part=carried][data-lines="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=widow][data-stranded]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-carry]' },
  { click: true },
  { wait: 700 },
  // A second line came over with it, so the top of column two is a paragraph again.
  { assert: { selector: '[data-part=carried][data-lines="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=widow]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-set]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=carried][data-lines="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=widow][data-stranded]', state: 'visible' } },
  { wait: 800 },
]);
