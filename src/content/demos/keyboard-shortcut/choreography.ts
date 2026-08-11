import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=row-2][data-archived]', state: 'hidden' } },
  { moveTo: '[data-part=row-2]' },
  { click: true },
  { assert: { selector: '[data-part=row-2][data-selected]', state: 'visible' } },
  { wait: 500 },
  // The key HUD is the whole point of this beat: the command runs with no control touched.
  { press: 'E' },
  { wait: 400 },
  { assert: { selector: '[data-part=row-2][data-archived]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-2]', state: 'visible' } },
  { wait: 900 },
  // The same command through the control it accelerates, so the two are one thing.
  { moveTo: '[data-part=row-3]' },
  { click: true },
  { moveTo: '[data-part=archive]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=row-3][data-archived]', state: 'visible' } },
  { wait: 1200 },
]);
