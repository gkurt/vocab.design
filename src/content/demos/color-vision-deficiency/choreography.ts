import { steps } from '#src/stage/choreography.ts';

/**
 * The hue-only build, where the simulated panel has lost the pass/fail pair, then the same
 * statuses said twice and read back through the same filter. Each segment reaches its own
 * coding, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=panel-sim][data-coding=hue]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-sim]', state: 'visible' } },
  { assert: { selector: '[data-part=sim-icon-fail]', state: 'hidden' } },
  { assert: { selector: '[data-part=sim-word-fail]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-coding=hue]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-redundant]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel-sim][data-coding=redundant]', state: 'visible' } },
  { assert: { selector: '[data-part=sim-icon-fail]', state: 'visible' } },
  { assert: { selector: '[data-part=sim-word-fail]', state: 'visible' } },
  { assert: { selector: '[data-part=normal-word-pass]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-coding=redundant]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-hue]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sim-icon-fail]', state: 'hidden' } },
  { assert: { selector: '[data-part=panel-sim][data-coding=hue]', state: 'visible' } },
  { wait: 900 },
]);
