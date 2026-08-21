import { steps } from '#src/stage/choreography.ts';

/**
 * Nothing here answers a pointer, because nothing about a sparkline should: a tiny chart
 * that needs a tooltip on every point has stopped being one. Every line is on stage from
 * mount, so the script waits and names the reading instead of touring it (SPEC §8).
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=spark-sessions]', state: 'visible' } },
  { assert: { selector: '[data-part=value-sessions]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=spark-latency]', state: 'visible' } },
  { assert: { selector: '[data-part=spark-errors]', state: 'visible' } },
  { assert: { selector: '[data-part=spark-signups]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
