import { steps } from '#src/stage/choreography.ts';

/**
 * Both moments, in order: the ring goes in with the dialog and comes back out with it.
 * Opening and dismissing are separate controls, so no step depends on the state it finds
 * (SPEC §8), and the ring is simulated throughout (SPEC §7).
 */
export default steps([
  { assert: { selector: '[data-part=trigger][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=dialog][data-open]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=at][data-moment=opened]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=cancel]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dialog][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=at][data-moment=closed]', state: 'visible' } },
  { wait: 1100 },
]);
