import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The palette is already spent on the panel at mount, so the pose shows the term.
  { assert: { selector: '[data-part=panel][data-hue="indigo"]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-accent]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one hue angle outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-teal]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-hue="teal"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-clay]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-hue="clay"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-hue="indigo"]', state: 'visible' } },
  { wait: 900 },
]);
