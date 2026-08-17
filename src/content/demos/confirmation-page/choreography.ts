import { steps } from '#src/stage/choreography.ts';

// Placing the order is the explicit trigger, and the page that arrives stays: it is
// still there a beat later, which is the difference the term is about. Start over
// returns the specimen to the checkout it mounts in (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=checkout]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=place]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { assert: { selector: '[data-part=checkout]', state: 'hidden' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=track]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=restart]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=checkout]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 800 },
]);
