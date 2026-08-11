import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At the bottom of the range the minus says so, which is half of what the ends
  // of a stepper are for.
  { assert: { selector: '[data-part=decrease][aria-disabled="true"]', state: 'visible' } },
  { moveTo: '[data-part=increase]' },
  { click: true },
  { wait: 320 },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=value][data-value="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=decrease][aria-disabled="true"]', state: 'hidden' } },
  { wait: 900 },
  // Stepping is the term, so the script drives the other direction itself.
  { moveTo: '[data-part=decrease]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=value][data-value="2"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=value]' },
  { press: 'ArrowUp' },
  { wait: 520 },
  { assert: { selector: '[data-part=value][data-value="3"]', state: 'visible' } },
  { wait: 900 },
]);
