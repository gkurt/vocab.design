import { steps } from '#src/stage/choreography.ts';

// The button opens and never toggles, and the menu is left by choosing something, so
// a pass resumed at any point still ends with the action taken (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=fab]' },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=make-note]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=made-note]', state: 'visible' } },
  { wait: 900 },
]);
