import { steps } from '#src/stage/choreography.ts';

// The same date typed into both arrangements, one character at a time, so the boxes the
// value crosses are performed. The pass ends in the three-box state the demo mounts in.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=split]', state: 'visible' } },
  { assert: { selector: '[data-part=single]', state: 'hidden' } },
  { assert: { selector: '[data-part=moves][data-count="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=waiting]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=sub-day]' },
  { wait: 300 },
  { type: '31031994' },
  { wait: 600 },
  // Eight characters, three boxes, two crossings the reader did not ask for.
  { assert: { selector: '[data-part=sub-year][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=complete]', state: 'visible' } },
  { assert: { selector: '[data-part=moves][data-count="2"]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-one]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=single]', state: 'visible' } },
  { assert: { selector: '[data-part=split]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-state=waiting]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=one]' },
  { wait: 300 },
  { type: '31/03/1994' },
  { wait: 600 },
  // One box, no crossings, and the separators were the reader's to type.
  { assert: { selector: '[data-part=status][data-state=complete]', state: 'visible' } },
  { assert: { selector: '[data-part=moves][data-count="0"]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=split]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=waiting]', state: 'visible' } },
  { wait: 900 },
]);
