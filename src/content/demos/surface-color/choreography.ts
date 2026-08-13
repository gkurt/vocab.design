import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The stack is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=stack][data-scheme="light"]', state: 'visible' } },
  { assert: { selector: '[data-part=stack][data-elevation="shadow"]', state: 'visible' } },
  { assert: { selector: '[data-part=raised]', state: 'visible' } },
  { wait: 1000 },
  // Each segment names one scheme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-scheme="dark"]', state: 'visible' } },
  { assert: { selector: '[data-part=stack][data-elevation="lightness"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stack][data-scheme="light"]', state: 'visible' } },
  { wait: 900 },
]);
