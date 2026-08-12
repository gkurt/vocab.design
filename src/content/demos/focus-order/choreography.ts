import { steps } from '#src/stage/choreography.ts';

/**
 * Six focusable elements, walked in the one order the browser knows: the source. The
 * player's first Tab lands on the first of them, which is where the specimen mounts its
 * ring, so the walk starts by confirming the ring rather than by moving it.
 */
export default steps([
  { assert: { selector: '[data-part=field-name][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  { press: 'Tab' },
  { wait: 450 },
  { assert: { selector: '[data-part=field-name][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=field-email][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field-name][data-sim-focus]', state: 'hidden' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=field-phone][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  // Into the reordered column, where the fourth stop is the field painted last.
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=field-city][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=field-postcode][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=field-country][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
