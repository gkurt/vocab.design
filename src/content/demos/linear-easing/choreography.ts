import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount's own pass is over: 1.1s of travel plus the settle beat.
  { wait: 1500 },
  { assert: { selector: '[data-part=race][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=graph]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while both dots are still on their way: the two spellings only differ in flight.
  { assert: { selector: '[data-part=race][data-running]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-stops]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=race][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-keyword]', state: 'visible' } },
  { wait: 600 },
]);
