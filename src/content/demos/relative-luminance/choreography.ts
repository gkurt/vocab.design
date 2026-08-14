import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The scale is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=scale][data-axis="y"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-grey]', state: 'visible' } },
  { assert: { selector: '[data-part=value-green]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names one axis outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-lstar]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scale][data-axis="lstar"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-blue]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-y]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scale][data-axis="y"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-white]', state: 'visible' } },
  { wait: 1000 },
]);
