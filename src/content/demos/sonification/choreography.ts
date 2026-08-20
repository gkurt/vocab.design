import { steps } from '#src/stage/choreography.ts';

/**
 * The three alternatives in turn, ending back where it started. Nothing sweeps at mount, so the
 * pick that reaches the sonified state owns the only run (SPEC §8), and the claims about it are
 * aimed mid-sweep and then well after the last tone rather than at the boundary between them.
 */
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=view-table]', state: 'visible' } },
  { assert: { selector: '[data-part=trace]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=table]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=seg-summary]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=view-summary]', state: 'visible' } },
  { assert: { selector: '[data-part=trace]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-sonified]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=trace]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-playing=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=view-sonified]', state: 'visible' } },

  { wait: 2600 },
  { assert: { selector: '[data-part=readout][data-playing=done]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-point="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=trace]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=sonified]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-table]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=view-table]', state: 'visible' } },
  { assert: { selector: '[data-part=trace]', state: 'hidden' } },
  { wait: 700 },
]);
