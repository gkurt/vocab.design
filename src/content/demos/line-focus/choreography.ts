import { steps } from '#src/stage/choreography.ts';

/**
 * Three lines lit, advanced twice down the column, then the same column read one line at a time and
 * five at a time. Each segment reaches an absolute width rather than toggling one (SPEC §8), and the
 * readout is claimed alongside the band, so a position claim is proved twice.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-width="3"][data-at="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at="0"]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=advance]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=band][data-at="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at="3"]', state: 'visible' } },
  { wait: 700 },

  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=band][data-at="6"]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-width="1"][data-at="0"]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=advance]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=band][data-at="1"]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=band][data-at="2"]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-5]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-width="5"][data-at="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at="0"]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=advance]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=band][data-at="5"]', state: 'visible' } },
  { wait: 1100 },
]);
