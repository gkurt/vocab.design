import { steps } from '#src/stage/choreography.ts';

// Share only ever opens the sheet; the sheet is left by choosing a row or by Cancel,
// so no pass depends on the state it happened to find (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { moveTo: '[data-part=share]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { wait: 900 },
  // Cancel is a real answer: the sheet goes, and nothing has happened to the note.
  { moveTo: '[data-part=act-cancel]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=none]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=share]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=act-copy]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-value=copy]', state: 'visible' } },
  { wait: 800 },
]);
