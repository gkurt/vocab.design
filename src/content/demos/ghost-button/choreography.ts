import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ghost]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost][data-hover]', state: 'hidden' } },
  { moveTo: '[data-part=filled]' },
  { wait: 500 },
  { assert: { selector: '[data-part=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost][data-hover]', state: 'hidden' } },
  { moveTo: '[data-part=outlined]' },
  { wait: 500 },
  // The rung the term names: with the pointer on it, the fill it does not otherwise
  // have arrives, which is the whole visible difference between these three.
  { moveTo: '[data-part=ghost]' },
  { wait: 600 },
  { assert: { selector: '[data-part=ghost][data-hover]', state: 'visible' } },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=status][data-pressed=ghost]', state: 'visible' } },
  { wait: 900 },
]);
