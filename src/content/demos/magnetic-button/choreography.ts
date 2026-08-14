import { steps } from '#src/stage/choreography.ts';

// Two fixed points, one outside the attraction radius and one inside it, so the pass
// proves both halves of the term: the lean toward an approaching pointer, and the
// spring back to exactly where the control was drawn once that pointer withdraws.
export default steps([
  { assert: { selector: '[data-part=button][data-pull=off]', state: 'visible' } },
  { moveTo: '[data-part=far]' },
  { wait: 500 },
  { assert: { selector: '[data-part=button][data-pull=off]', state: 'visible' } },
  { assert: { selector: '[data-part=radius]', state: 'visible' } },
  { moveTo: '[data-part=near]' },
  { wait: 700 },
  { assert: { selector: '[data-part=button][data-pull=on]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-pull=on]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=far]' },
  { wait: 800 },
  { assert: { selector: '[data-part=button][data-pull=off]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-pull=off]', state: 'visible' } },
  { wait: 900 },
]);
