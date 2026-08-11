import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=wheel][data-hue="210"][data-scheme="single"]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke-180]', state: 'hidden' } },
  { moveTo: '[data-part=seg-complement]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-scheme="complement"]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke-180]', state: 'visible' } },
  { wait: 1200 },
  // Every hue is an absolute position on the wheel, so the scheme turns to a known angle.
  { moveTo: '[data-part=pick-30]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-hue="30"][data-scheme="complement"]', state: 'visible' } },
  { assert: { selector: '[data-part=pick-30][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-triad]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-scheme="triad"]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke-120]', state: 'visible' } },
  { assert: { selector: '[data-part=spoke-240]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=pick-210]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-hue="210"][data-scheme="triad"]', state: 'visible' } },
  { wait: 1200 },
]);
