import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the rules are drawn over both panels: the left one lands on every one of them.
  { assert: { selector: '[data-part=snapped]', state: 'visible' } },
  { assert: { selector: '[data-part=rules-snapped]', state: 'visible' } },
  { assert: { selector: '[data-part=rules-drift]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-off][aria-selected="true"]', state: 'visible' } },
  // With the rules gone the two panels look equally considered, which is the argument
  // for having a unit that can be checked.
  { assert: { selector: '[data-part=rules-snapped]', state: 'hidden' } },
  { assert: { selector: '[data-part=rules-drift]', state: 'hidden' } },
  { assert: { selector: '[data-part=snapped]', state: 'visible' } },
  { assert: { selector: '[data-part=drift]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names a state of the ruling, so the way back is a state too, not an undo.
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=rules-snapped]', state: 'visible' } },
  { wait: 800 },
]);
