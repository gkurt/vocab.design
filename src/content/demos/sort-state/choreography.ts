import { steps } from '#src/stage/choreography.ts';

/**
 * Sorted by name, then by size, then the same header again to reverse it, then back to name.
 * The reversal is the one toggle this specimen is allowed: flipping direction on the column
 * already sorted is the term itself (SPEC §8), and the pass ends where it started, so a loop
 * that replays without a remount demonstrates the same thing.
 */
export default steps([
  { assert: { selector: '[data-part=th-name][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-name]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-size]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=sort-size]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=th-size][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=th-name][aria-sort=none]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-name]', state: 'hidden' } },
  { wait: 1000 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=th-size][aria-sort=descending]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-size]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=sort-name]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=th-name][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=th-size][aria-sort=none]', state: 'visible' } },
  { wait: 900 },
]);
