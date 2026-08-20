import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to settle.
  { wait: 700 },
  { assert: { selector: '[data-part=hold]', state: 'visible' } },
  { assert: { selector: '[data-part=under]', state: 'visible' } },
  { assert: { selector: '[data-part=feed][data-scrolled]', state: 'hidden' } },
  { assert: { selector: '[data-part=passed][data-moved]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=feed]' },
  { scroll: { y: 170 } },
  { wait: 700 },
  // The feed has moved. The held point has not, which is the whole claim.
  { assert: { selector: '[data-part=feed][data-scrolled]', state: 'visible' } },
  { assert: { selector: '[data-part=passed][data-moved]', state: 'visible' } },
  { assert: { selector: '[data-part=hold]', state: 'visible' } },
  { wait: 900 },
  { scroll: { y: 170 } },
  { wait: 700 },
  { assert: { selector: '[data-part=hold]', state: 'visible' } },
  { assert: { selector: '[data-part=under]', state: 'visible' } },
  { wait: 1000 },
]);
