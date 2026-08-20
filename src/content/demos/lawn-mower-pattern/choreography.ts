import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to settle.
  { wait: 700 },
  { assert: { selector: '[data-part=mow]', state: 'visible' } },
  { assert: { selector: '[data-part=serial]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-cards]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-cards][aria-selected="true"]', state: 'visible' } },
  // Stacked, the grid the mow ran along is gone and so is the mow.
  { assert: { selector: '[data-part=serial]', state: 'visible' } },
  { assert: { selector: '[data-part=mow]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-table]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=mow]', state: 'visible' } },
  { assert: { selector: '[data-part=serial]', state: 'hidden' } },
  { wait: 800 },
]);
