import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet][data-state=half]', state: 'visible' } },
  { wait: 700 },
  // Absolute, not relative: the drag ends over a fixed landmark, so the sheet
  // settles on the same detent however the pass started (SPEC §8).
  { moveTo: '[data-part=grabber]' },
  { drag: { to: '[data-part=screen-top]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=sheet][data-state=full]', state: 'visible' } },
  { wait: 1100 },
  { press: 'Escape' },
  { wait: 600 },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { wait: 900 },
]);
