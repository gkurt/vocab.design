import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount is the flash itself, so the first claim is made inside it rather than at t=0.
  { wait: 480 },
  { assert: { selector: '[data-part=page][data-mode=flash][data-phase=flash]', state: 'visible' } },
  // Wait the flash out: the stored preference lands and the page snaps to dark.
  { wait: 1100 },
  { assert: { selector: '[data-part=page][data-phase=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=page-cta]', state: 'visible' } },
  { wait: 800 },
  // Replay always restarts the load, so the step reaches a state rather than flipping one.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=page][data-phase=flash]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=page][data-phase=settled]', state: 'visible' } },
  { wait: 700 },
  // Each segment names one mode outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-fixed]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page][data-mode=fixed][data-phase=settled]', state: 'visible' } },
  { wait: 600 },
  // Replaying the fixed load never paints a wrong frame at all.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=page][data-mode=fixed][data-phase=settled]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-flash]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=page][data-mode=flash][data-phase=flash]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=page][data-phase=settled]', state: 'visible' } },
  { wait: 800 },
]);
