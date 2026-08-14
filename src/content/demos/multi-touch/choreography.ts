import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-gesture=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-scale="1.00"]', state: 'visible' } },
  // The player has one cursor, so the two-contact states are reached through the labelled
  // simulation controls. Each drives the gap to an absolute value rather than toggling it.
  { moveTo: '[data-part=sim-open]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=canvas][data-gesture=spread]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-scale="2.20"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=sim-close]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=canvas][data-gesture=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-scale="1.00"]', state: 'visible' } },
  { wait: 1000 },
]);
