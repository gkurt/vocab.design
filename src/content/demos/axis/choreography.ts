import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the first reading of the axis waits for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=axis][data-scale=raw]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-4][data-value="8600"]', state: 'visible' } },
  // Straight off the data's extent, the three smallest packages have no height at all.
  { assert: { selector: '[data-part=bar-core]', state: 'hidden' } },
  { wait: 600 },

  // A rounded domain: the same five lines, relabelled, and headroom above the tallest bar.
  { moveTo: '[data-part=seg-nice]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=axis][data-scale=nice]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-4][data-value="10000"]', state: 'visible' } },
  { assert: { selector: '[data-part=domain][data-scale=nice]', state: 'visible' } },
  { wait: 800 },

  // A log scale is a claim about the domain: each line is ten times the last, and the
  // smallest package becomes readable rather than staying a sliver.
  { moveTo: '[data-part=seg-log]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=axis][data-scale=log]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-1][data-value="10"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-core]', state: 'visible' } },
  { wait: 900 },

  // Back to the data's own extent, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-raw]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=axis][data-scale=raw]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-4][data-value="8600"]', state: 'visible' } },
  { wait: 700 },
]);
