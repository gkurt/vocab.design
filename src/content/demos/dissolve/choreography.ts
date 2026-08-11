import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=plate][data-showing=dawn]', state: 'visible' } },
  { moveTo: '[data-part=seg-dusk]' },
  { click: true },
  // Past the whole fade, down and back up, so the claim is not timed to the swap.
  { wait: 800 },
  { assert: { selector: '[data-part=plate][data-showing=dusk]', state: 'visible' } },
  { assert: { selector: '[data-part=plate][data-state=settled]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-dawn]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=plate][data-showing=dawn]', state: 'visible' } },
  { wait: 600 },
]);
