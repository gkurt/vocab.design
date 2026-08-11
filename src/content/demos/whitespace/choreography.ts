import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=roomy]', state: 'visible' } },
  { assert: { selector: '[data-part=cramped]', state: 'visible' } },
  // Measured on mount: the roomy card spends at least twice as much space between its
  // groups as inside them, which is what makes the groups read as groups.
  { assert: { selector: '[data-part=roomy][data-grouped]', state: 'visible' } },
  // The cramped card spends the same gap everywhere, so its groups are not groups.
  { assert: { selector: '[data-part=cramped][data-grouped]', state: 'hidden' } },
  { moveTo: '[data-part=cramped]' },
  { wait: 1100 },
  { moveTo: '[data-part=roomy]' },
  { wait: 1100 },
  { assert: { selector: '[data-part=roomy-group-2]', state: 'visible' } },
  { assert: { selector: '[data-part=roomy-group-3]', state: 'visible' } },
  { wait: 800 },
]);
