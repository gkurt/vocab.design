import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount pours the passage into two columns.
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { assert: { selector: '[data-part=subhead]', state: 'visible' } },
  { assert: { selector: '[data-part=chip]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-three]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-three][aria-selected="true"]', state: 'visible' } },
  // Same flow, rebalanced: nothing was moved by hand.
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { assert: { selector: '[data-part=subhead]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-fitted]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-fitted][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1500 },
  // Each segment names a spelling, so the way back is a spelling too, not an undo.
  { moveTo: '[data-part=seg-two]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-two][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { wait: 900 },
]);
