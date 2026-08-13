import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bio-lorem]', state: 'visible' } },
  { assert: { selector: '[data-part=card-real]', state: 'visible' } },
  { wait: 800 },
  // Nothing here responds to a pointer: the cursor reads the placeholder card, then
  // the same layout holding the lengths the placeholder was hiding.
  { moveTo: '[data-part=bio-lorem]' },
  { wait: 1000 },
  { moveTo: '[data-part=role-real]' },
  { wait: 1000 },
  { moveTo: '[data-part=bio-real]' },
  { wait: 900 },
  { assert: { selector: '[data-part=bio-real]', state: 'visible' } },
  { moveTo: '[data-part=notes]' },
  { wait: 900 },
  { assert: { selector: '[data-part=notes]', state: 'visible' } },
]);
