import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=dot-ada][data-state=online]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-bo][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-rae][data-state=offline]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=join]' },
  { click: true },
  // Load-bearing: the offline dot is what the join is measured against, and the press
  // always composes the join from nothing rather than flipping what it finds (SPEC §8).
  { wait: 500 },
  { assert: { selector: '[data-part=dot-rae][data-state=offline]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'hidden' } },
  // The connection lands 1600 ms after the press; the claim is made well clear of it.
  { wait: 1600 },
  { assert: { selector: '[data-part=dot-rae][data-state=online]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-cy][data-state=busy]', state: 'visible' } },
  { wait: 1100 },
]);
