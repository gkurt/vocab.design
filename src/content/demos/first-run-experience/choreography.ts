import { steps } from '#src/stage/choreography.ts';

// Kit surfaces fade in from mount, so the first claim waits for the scene to arrive. The
// pass ends on the first-open state the demo mounts in, which is the state that has a
// first run experience in it at all (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=scaffold][data-run=first]', state: 'visible' } },
  { assert: { selector: '[data-part=coach]', state: 'visible' } },
  { assert: { selector: '[data-part=own]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=run-later]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=own]', state: 'visible' } },
  { assert: { selector: '[data-part=scaffold]', state: 'hidden' } },
  { assert: { selector: '[data-part=coach]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=run-first]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=scaffold][data-run=first]', state: 'visible' } },
  { assert: { selector: '[data-part=own]', state: 'hidden' } },
  { wait: 1100 },
]);
