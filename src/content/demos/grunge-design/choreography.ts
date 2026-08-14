import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=paper]', state: 'visible' } },
  { assert: { selector: '[data-part=masthead]', state: 'visible' } },
  { wait: 700 },
  // A printed page answers no pointer: the cursor reads the damage in order.
  { moveTo: '[data-part=masthead]' },
  { wait: 1000 },
  { moveTo: '[data-part=cut]' },
  { wait: 900 },
  { assert: { selector: '[data-part=cut]', state: 'visible' } },
  { moveTo: '[data-part=photo]' },
  { wait: 900 },
  { moveTo: '[data-part=stamp]' },
  { wait: 900 },
  { assert: { selector: '[data-part=stamp]', state: 'visible' } },
  { moveTo: '[data-part=foot]' },
  { wait: 800 },
  { assert: { selector: '[data-part=body]', state: 'visible' } },
  { wait: 600 },
]);
