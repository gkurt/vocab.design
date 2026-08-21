import { steps } from '#src/stage/choreography.ts';

// A painting answers no pointer: the unequal tracks and the three primaries are the
// whole claim, and they are all on stage from mount (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=field-red]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=field-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=field-yellow]', state: 'visible' } },
  { assert: { selector: '[data-part=field-white]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1200 },
]);
