import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=group]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-1][data-filled]', state: 'hidden' } },
  { moveTo: '[data-part=cell-1]' },
  { click: true },
  { type: '4' },
  { wait: 420 },
  { assert: { selector: '[data-part=cell-1][data-filled]', state: 'visible' } },
  // The second digit is typed at the same place: the row takes the value and lays
  // it out, which is what makes typing and pasting the same code path.
  { type: '8' },
  { wait: 420 },
  { assert: { selector: '[data-part=cell-2][data-filled]', state: 'visible' } },
  { type: '2' },
  { wait: 420 },
  { type: '1' },
  { wait: 620 },
  { assert: { selector: '[data-part=cell-4][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=complete]', state: 'visible' } },
  { wait: 1200 },
]);
