import { steps } from '#src/stage/choreography.ts';

// The trigger only opens, so every pass reaches the same question; the two ways out
// are driven explicitly, first the safe one and then the destructive one (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { moveTo: '[data-part=delete-forecast]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=keep]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  // Answering "keep" leaves the file exactly where it was: the dialog stopped the action.
  { assert: { selector: '[data-part=row-forecast]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=delete-forecast]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=confirm]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-forecast]', state: 'hidden' } },
  { wait: 800 },
]);
