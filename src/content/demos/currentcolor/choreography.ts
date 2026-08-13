import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The inheriting control is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=control][data-ink="slate"]', state: 'visible' } },
  { assert: { selector: '[data-part=twin]', state: 'visible' } },
  { wait: 900 },
  // Each swatch names one colour outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=swatch-accent]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=control][data-ink="accent"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=swatch-plum]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=control][data-ink="plum"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=swatch-slate]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=control][data-ink="slate"]', state: 'visible' } },
  { wait: 900 },
]);
