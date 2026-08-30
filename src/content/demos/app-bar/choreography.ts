import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  // Identity, the navigation affordance, and the actions that mean the same everywhere.
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=nav]', state: 'visible' } },
  { assert: { selector: '[data-part=search]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=scroller]' },
  { scroll: { y: 170 } },
  { wait: 600 },
  // The content moved; the bar did not, which is the whole claim.
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=nav]', state: 'visible' } },
  { wait: 1000 },
]);
