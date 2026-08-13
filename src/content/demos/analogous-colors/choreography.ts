import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The set is lifted out of the wheel from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=set][data-set="amber"]', state: 'visible' } },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one position on the wheel outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-teal]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=set][data-set="teal"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-violet]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=set][data-set="violet"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-amber]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=set][data-set="amber"]', state: 'visible' } },
  { wait: 900 },
]);
