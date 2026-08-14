import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sequence][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'hidden' } },
  { moveTo: '[data-part=sequence]' },
  { wait: 400 },
  // The letter on its own is not the shortcut: the sequence has to start with its prefix.
  { press: 'i' },
  { wait: 500 },
  { assert: { selector: '[data-part=sequence][data-state=stray]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'hidden' } },
  { wait: 700 },
  // The prefix opens the mode, and the claim is made inside the window, not at its edge.
  { press: 'g' },
  { wait: 500 },
  { assert: { selector: '[data-part=sequence][data-state=pending]', state: 'visible' } },
  { press: 'i' },
  { wait: 500 },
  { assert: { selector: '[data-part=sequence][data-state=done]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'visible' } },
  { wait: 900 },
  // The same prefix, a different second key, a different destination.
  { press: 'g' },
  { wait: 500 },
  { assert: { selector: '[data-part=sequence][data-state=pending]', state: 'visible' } },
  { press: 's' },
  { wait: 500 },
  { assert: { selector: '[data-part=nav-starred][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'hidden' } },
  { wait: 900 },
  // The third ending: nothing follows the prefix, so the window runs out and nothing ran.
  { press: 'g' },
  { wait: 2400 },
  { assert: { selector: '[data-part=sequence][data-state=expired]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-starred][data-current]', state: 'visible' } },
  { wait: 1200 },
]);
