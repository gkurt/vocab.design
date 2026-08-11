import { steps } from '#src/stage/choreography.ts';

/**
 * The first Tab lands where the ring already rests, which is what a reader entering
 * the group from outside would see; every later one moves it, and the last wraps.
 */
export default steps([
  { assert: { selector: '[data-part=control-copy][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
  { press: 'Tab' },
  { wait: 700 },
  { press: 'Tab' },
  { assert: { selector: '[data-part=control-invite][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
  { press: 'Tab' },
  { assert: { selector: '[data-part=control-done][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
  { press: 'Tab' },
  { assert: { selector: '[data-part=control-copy][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=control-done][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },
]);
