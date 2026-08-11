import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=region-main]', state: 'visible' } },
  { moveTo: '[data-part=rotor-main]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-main][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=rotor-main][data-selected]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=rotor-aside]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-aside][data-current]', state: 'visible' } },
  // One landmark at a time: the previous one has given the attribute back.
  { assert: { selector: '[data-part=region-main][data-current]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=rotor-banner]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=region-banner][data-current]', state: 'visible' } },
  { wait: 700 },
]);
