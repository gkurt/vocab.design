import { steps } from '#src/stage/choreography.ts';

/**
 * A shimmer is watched, not operated: there is no second state to reach, and a
 * hover with nothing behind it would be cursor theater (SPEC §8). The claim about
 * travel is made through the completed-pass count, which the demo reads off the
 * animation itself, so it could not pass for a band that never moved.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=cover]', state: 'visible' } },
  // One pass takes 1200 ms, so nothing has crossed the panel yet.
  { assert: { selector: '[data-part=sweep][data-swept]', state: 'hidden' } },
  { wait: 1500 },
  // A full sweep later: the band has entered one side and left the other, and the
  // load is exactly as far along as it was.
  { assert: { selector: '[data-part=sweep][data-swept]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=cover]', state: 'visible' } },
  { wait: 600 },
]);
