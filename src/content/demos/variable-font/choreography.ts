import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sample][data-wght="300"]', state: 'visible' } },
  { assert: { selector: '[data-part=marker]', state: 'visible' } },
  { wait: 900 },
  // Absolute values, never a step up: the pass demonstrates the same three
  // positions on the axis wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-500]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sample][data-wght="500"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-800]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sample][data-wght="800"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-300]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sample][data-wght="300"]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
