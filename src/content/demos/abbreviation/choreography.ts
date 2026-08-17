import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=abbr-svg]', state: 'visible' } },
  { assert: { selector: '[data-part=expansions]', state: 'hidden' } },
  { wait: 700 },
  // Show and Hide are separate controls, so the script reaches each state by name
  // rather than flipping whatever it found (SPEC §8).
  { moveTo: '[data-part=show]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=expansions][data-open]', state: 'visible' } },
  { moveTo: '[data-part=expansions]' },
  { wait: 1400 },
  { moveTo: '[data-part=abbr-svg]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=abbr-svg]', state: 'visible' } },
  { moveTo: '[data-part=hide]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=expansions]', state: 'hidden' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
