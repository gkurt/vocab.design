import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=panel][data-tint="cool"]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-muted]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one tint outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-warm]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-tint="warm"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-pure]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-tint="pure"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-cool]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-tint="cool"]', state: 'visible' } },
  { wait: 900 },
]);
