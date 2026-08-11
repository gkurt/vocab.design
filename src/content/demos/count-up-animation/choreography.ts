import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 1700 },
  { assert: { selector: '[data-part=value][data-settled]', state: 'visible' } },
  { moveTo: '[data-part=refresh]' },
  { click: true },
  // A third of the way into a count of just under 1.1s, nowhere near either end.
  { wait: 350 },
  { assert: { selector: '[data-part=value][data-counting]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=value][data-settled]', state: 'visible' } },
  { wait: 500 },
]);
