import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the compact class: one column with a bottom tab bar.
  { assert: { selector: '[data-part=arr-compact]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-expanded]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-medium][data-selected]', state: 'visible' } },
  // A different arrangement, not the same one widened: the tab bar is gone and a rail
  // has taken its place.
  { assert: { selector: '[data-part=arr-medium]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-compact]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-expanded]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-expanded][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-medium]', state: 'hidden' } },
  { wait: 1400 },
  // Each segment names a class, so the way back is a class too, not an undo.
  { moveTo: '[data-part=seg-compact]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=arr-compact]', state: 'visible' } },
  { assert: { selector: '[data-part=arr-expanded]', state: 'hidden' } },
  { wait: 900 },
]);
