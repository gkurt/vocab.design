import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-gesture=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="0"]', state: 'visible' } },
  // The player has one cursor, so the two-contact turns are reached through the labelled
  // controls. Each drives the angle to an absolute value rather than turning it further.
  { moveTo: '[data-part=sim-right]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=canvas][data-gesture=turned]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="15"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=sim-left]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=canvas][data-gesture=turned]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="-10"]', state: 'visible' } },
  { wait: 1200 },
]);
