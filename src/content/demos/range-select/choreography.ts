import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=range][data-span="1"]', state: 'visible' } },
  // An unmodified click first: this is the end the range will be measured from.
  { moveTo: '[data-part=row-1]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-mode=single]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1][data-in-range]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][data-in-range]', state: 'hidden' } },
  { wait: 800 },
  // Shift is armed through its own control, since a synthesized click carries no keys.
  // Both segments are absolute states, so the pass never flips a toggle.
  { moveTo: '[data-part=mode-shift]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  { moveTo: '[data-part=row-4]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=range][data-span="4"]', state: 'visible' } },
  // The row nobody clicked: the whole claim of the term.
  { assert: { selector: '[data-part=row-3][data-in-range]', state: 'visible' } },
  { assert: { selector: '[data-part=head-box][aria-checked=mixed]', state: 'visible' } },
  { wait: 1000 },
  // A second shifted click redraws the same range from the same anchor rather than
  // starting a new one, which is how a range is shrunk.
  { moveTo: '[data-part=row-2]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=range][data-span="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][data-in-range]', state: 'hidden' } },
  { wait: 1000 },
]);
