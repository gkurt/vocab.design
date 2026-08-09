import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { moveTo: '[data-part=panel]' },
  { drag: { to: '[data-part=caption]' } },
  { wait: 900 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { moveTo: '[data-part=panel]' },
  { drag: { to: '[data-part=backdrop]' } },
  { wait: 900 },
]);
