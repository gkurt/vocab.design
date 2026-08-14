import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the field is ruled and both columns are set onto it.
  { assert: { selector: '[data-part=lattice]', state: 'visible' } },
  { assert: { selector: '[data-part=col-left]', state: 'visible' } },
  { assert: { selector: '[data-part=col-right]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-off][aria-selected="true"]', state: 'visible' } },
  // The grid stays ruled while the column leaves it: the field is the term, not the text.
  { assert: { selector: '[data-part=lattice]', state: 'visible' } },
  { assert: { selector: '[data-part=col-right]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1500 },
  // Each segment names a leading, so the way back is a leading too, not an undo.
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-on][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=lattice]', state: 'visible' } },
  { wait: 900 },
]);
