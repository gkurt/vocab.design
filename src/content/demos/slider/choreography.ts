import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=thumb][aria-valuenow="400"]', state: 'visible' } },
  { moveTo: '[data-part=thumb]' },
  // Absolute, not relative: the drag lands on the stop it aims at, so a pass that
  // starts over reaches the same value it did last time (SPEC §8).
  { drag: { to: '[data-part=stop-750]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=thumb][aria-valuenow="750"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=thumb]' },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=thumb][aria-valuenow="800"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-250]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=thumb][aria-valuenow="250"]', state: 'visible' } },
  { wait: 900 },
]);
