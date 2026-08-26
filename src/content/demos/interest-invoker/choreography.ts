import { steps } from '#src/stage/choreography.ts';

// Two of the three inputs, performed rather than picked: a pointer dwells past the half
// second, and inside the touch scope the same control answers a press held that long,
// because no hover can arrive there at all. Leaving the pointer lane gives interest up.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=a-card]', state: 'hidden' } },
  { assert: { selector: '[data-part=b-card]', state: 'hidden' } },
  { moveTo: '[data-part=a-trigger]' },
  { wait: 700 },
  { assert: { selector: '[data-part=a-card][data-open]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=note]' },
  { wait: 800 },
  { assert: { selector: '[data-part=a-card]', state: 'hidden' } },
  { moveTo: '[data-part=b-trigger]' },
  { wait: 300 },
  { assert: { selector: '[data-part=b-card]', state: 'hidden' } },
  { hold: 900 },
  { wait: 400 },
  { assert: { selector: '[data-part=b-card][data-open]', state: 'visible' } },
  { wait: 1000 },
]);
