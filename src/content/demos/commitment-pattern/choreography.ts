import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): the claim is the contrast between the two traces, and both are
// drawn at rest. There is nothing to press, and a hover with no consequence would be theatre.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=read-trace]', state: 'visible' } },
  { assert: { selector: '[data-part=skim-trace]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=read-page]', state: 'visible' } },
  { assert: { selector: '[data-part=skim-page]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1600 },
]);
