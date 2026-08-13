import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mounted in the term's own state, so the pose already shows the restored depth.
  { assert: { selector: '[data-part=card][data-style="flat2"]', state: 'visible' } },
  { assert: { selector: '[data-part=media]', state: 'visible' } },
  { wait: 800 },
  // The control the depth is spent on: the cursor rests, the kit lights the button.
  { moveTo: '[data-part=action]' },
  { wait: 900 },
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  // Each segment names one style outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-strict]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-style="strict"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-flat2]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-style="flat2"]', state: 'visible' } },
  { wait: 900 },
]);
