import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card-two][data-lifted]', state: 'hidden' } },
  { moveTo: '[data-part=card-two]' },
  { wait: 500 },
  { assert: { selector: '[data-part=card-two][data-lifted]', state: 'visible' } },
  // The neighbours stay put: only the card under the pointer answers it.
  { assert: { selector: '[data-part=card-one][data-lifted]', state: 'hidden' } },
  // Leaving is its own step, so the lift is a state the script arrives at and
  // then leaves, never a flip whose result depends on what it found (SPEC §8).
  { moveTo: '[data-part=caption]' },
  { wait: 500 },
  { assert: { selector: '[data-part=card-two][data-lifted]', state: 'hidden' } },
  { wait: 400 },
]);
