import { steps } from '#src/stage/choreography.ts';

// Both presses are absolute: one lands on the shape and selects it, one lands on empty
// canvas and clears the selection. The still frame stays visible throughout, since the
// comparison is half the point: dashes alone are not a selection.
export default steps([
  { assert: { selector: '[data-part=ants]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-selected="0"]', state: 'visible' } },
  { moveTo: '[data-part=shape]' },
  { wait: 450 },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=ants]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-selected="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=still]', state: 'visible' } },
  { wait: 2200 },
  { moveTo: '[data-part=empty]' },
  { wait: 400 },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=ants]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-selected="0"]', state: 'visible' } },
  { wait: 900 },
]);
