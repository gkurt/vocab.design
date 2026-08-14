import { steps } from '#src/stage/choreography.ts';

/**
 * Three sources found from the legend, each key naming its own series outright, so a pass
 * joined halfway proves the same match (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=palette][data-series=search]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-series=search]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=key-3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=palette][data-series=direct]', state: 'visible' } },
  { assert: { selector: '[data-part=key-3][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-series=direct]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=key-5]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=palette][data-series=other]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-series=other]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=key-0]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=palette][data-series=search]', state: 'visible' } },
  { assert: { selector: '[data-part=key-0][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
