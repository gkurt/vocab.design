import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the slot is full and the picture's sides are the price.
  { assert: { selector: '[data-part=box][data-fit=cover]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-contain]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-contain][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=box][data-fit=contain]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-fill]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-fit=fill]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-fit=none]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a fit, so the way back is a fit too, not an undo.
  { moveTo: '[data-part=seg-cover]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-fit=cover]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 800 },
]);
