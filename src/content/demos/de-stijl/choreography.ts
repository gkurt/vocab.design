import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=field-red]', state: 'visible' } },
  { wait: 700 },
  // A painting answers no pointer: the cursor walks the three primaries in the order the
  // composition weighs them, largest first, then rests on the white that carries the rest.
  { moveTo: '[data-part=field-red]' },
  { wait: 800 },
  { moveTo: '[data-part=field-blue]' },
  { wait: 800 },
  { moveTo: '[data-part=field-yellow]' },
  { wait: 800 },
  { moveTo: '[data-part=field-white]' },
  { wait: 800 },
  { assert: { selector: '[data-part=field-blue]', state: 'visible' } },
  { assert: { selector: '[data-part=field-yellow]', state: 'visible' } },
  { wait: 600 },
]);
