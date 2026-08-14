import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The stripes are on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=ramp][data-levels="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=smooth]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-12]' },
  { click: true },
  { wait: 600 },
  // Twice the levels, half the band height, still striped.
  { assert: { selector: '[data-part=ramp][data-levels="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-label]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-24]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ramp][data-levels="24"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-6]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ramp][data-levels="6"]', state: 'visible' } },
  { wait: 900 },
]);
