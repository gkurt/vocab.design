import { steps } from '#src/stage/choreography.ts';

// A panel at rest answers no pointer: the plastic, the tube and the switches are the
// whole claim and none of them respond, so the pass asserts them (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },
  { assert: { selector: '[data-part=lamp]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=meter]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=switches]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle-b]', state: 'visible' } },
  { assert: { selector: '[data-part=rocker]', state: 'visible' } },
  { wait: 1200 },
]);
