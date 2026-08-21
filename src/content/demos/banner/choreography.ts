import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=banner]', state: 'visible' } },
  { assert: { selector: '[data-part=state][data-state=showing]', state: 'visible' } },
  // Persistence is the term: a toast would have cleaned itself up somewhere in here.
  { wait: 2800 },
  { assert: { selector: '[data-part=banner]', state: 'visible' } },
  { assert: { selector: '[data-part=fix]', state: 'visible' } },
  // It leaves only when someone deals with it, and the leaving is claimed through the
  // readout that stays rather than through the strip that went.
  { moveTo: '[data-part=dismiss]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=state][data-state=dismissed]', state: 'visible' } },
  { assert: { selector: '[data-part=banner]', state: 'hidden' } },
  { wait: 1000 },
]);
