import { steps } from '#src/stage/choreography.ts';

/**
 * The dark stack is on stage from mount, so the pose already shows the term. Each segment
 * names one scheme outright, so a pass joined halfway lands on the same state (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=stack][data-scheme="dark"]', state: 'visible' } },
  { assert: { selector: '[data-part=stack][data-carrier="overlay"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-scheme="dark"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-scheme="light"]', state: 'visible' } },
  { assert: { selector: '[data-part=stack][data-carrier="shadow"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-light][aria-selected="true"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-scheme="dark"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-scheme="dark"]', state: 'visible' } },
  { wait: 900 },
]);
