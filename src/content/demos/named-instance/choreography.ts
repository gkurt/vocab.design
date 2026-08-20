import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=sample][data-wght="400"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-named]', state: 'visible' } },
  // The flags the family planted: 2px ticks, claimed themselves rather than through
  // their zero-height label strip (SPEC §8).
  { assert: { selector: '[data-part=tick-300]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-900]', state: 'visible' } },
  { assert: { selector: '[data-part=marker]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the coordinate it reaches.
  { moveTo: '[data-part=seg-900]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sample][data-wght="900"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-named]', state: 'visible' } },
  // The coordinate between two flags: the drawing is there, the name is not.
  { moveTo: '[data-part=seg-520]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=sample][data-wght="520"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-named]', state: 'hidden' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends on a named coordinate, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-600]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=sample][data-wght="600"]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-named]', state: 'visible' } },
  { wait: 700 },
]);
