import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // An About screen with nothing unusual on it, which is the state the secret is kept in.
  { assert: { selector: '[data-part=row-version]', state: 'visible' } },
  { assert: { selector: '[data-part=reward]', state: 'hidden' } },
  { assert: { selector: '[data-part=screen][data-found]', state: 'hidden' } },
  { wait: 400 },
  { moveTo: '[data-part=row-version]' },
  { click: true },
  { click: true },
  { click: true },
  { wait: 500 },
  // Halfway, and the screen reads exactly as it did: nothing on it is counting the presses,
  // which is what makes this a secret rather than a control with a long activation.
  { assert: { selector: '[data-part=reward]', state: 'hidden' } },
  { assert: { selector: '[data-part=screen][data-found]', state: 'hidden' } },
  { wait: 700 },
  { click: true },
  { click: true },
  { click: true },
  { wait: 700 },
  // The sixth press pays out, into room that was empty all along, so nothing moves.
  { assert: { selector: '[data-part=screen][data-found]', state: 'visible' } },
  { assert: { selector: '[data-part=reward]', state: 'visible' } },
  { wait: 1600 },
]);
