import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=strip][data-phase=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-coast=none]', state: 'visible' } },
  // The throw: a stroke across the strip from one photo to another, both at fixed
  // positions, so a pass picked up part-way makes the same gesture with the same speed.
  { moveTo: '[data-part=card-2]' },
  { wait: 500 },
  { drag: { to: '[data-part=card-0]' } },
  // Judged as early as the script can reach it: the pointer is gone and the strip is
  // still moving, which is the whole claim.
  { assert: { selector: '[data-part=strip][data-phase=coast]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=strip][data-phase=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-coast=some]', state: 'visible' } },
  { wait: 1200 },
]);
