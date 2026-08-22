import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=spoken][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=surface]' },
  // Two taps of the pair is the gesture; one is not, which the middle state proves.
  { tap: { count: 1 } },
  { wait: 260 },
  { assert: { selector: '[data-part=spoken][data-state=waiting]', state: 'visible' } },
  { wait: 500 },
  { tap: { count: 2 } },
  { wait: 420 },
  { assert: { selector: '[data-part=spoken][data-state=answered]', state: 'visible' } },
  { wait: 900 },
  { tap: { count: 2 } },
  { wait: 420 },
  { assert: { selector: '[data-part=spoken][data-state=ended]', state: 'visible' } },
  { wait: 900 },
]);
