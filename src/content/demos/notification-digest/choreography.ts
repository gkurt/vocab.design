import { steps } from '#src/stage/choreography.ts';

// The digest first, since that is what the term names, then the same six alerts delivered
// one by one, then back. Each segment reaches its own named lane (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=digest]', state: 'visible' } },
  { assert: { selector: '[data-part=lane][data-interruptions="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=separate-lane]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=pick-separate]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=separate-lane]', state: 'visible' } },
  { assert: { selector: '[data-part=lane][data-interruptions="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=digest]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=pick-digest]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=digest]', state: 'visible' } },
  { assert: { selector: '[data-part=lane][data-interruptions="1"]', state: 'visible' } },
  { wait: 1100 },
]);
