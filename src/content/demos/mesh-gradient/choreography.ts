import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The blend is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=field][data-spot="corner"]', state: 'visible' } },
  { assert: { selector: '[data-part=pt-rose]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-centre]' },
  { click: true },
  { wait: 600 },
  // One point moved; the whole region around it is a different colour.
  { assert: { selector: '[data-part=field][data-spot="centre"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-top]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-spot="top"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-corner]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-spot="corner"]', state: 'visible' } },
  { wait: 900 },
]);
