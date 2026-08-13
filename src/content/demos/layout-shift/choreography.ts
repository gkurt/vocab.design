import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Before the advert: both articles are laid out, and the pay control is where the
  // reader can see it.
  { assert: { selector: '[data-part=article][data-state=waiting]', state: 'visible' } },
  { assert: { selector: '[data-part=steady][data-state=waiting]', state: 'visible' } },
  { assert: { selector: '[data-part=pay-article]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=reload]' },
  { click: true },
  // The reload lands on the state before the arrival, and holds there long enough to
  // be read as a page mid-load.
  { wait: 400 },
  { assert: { selector: '[data-part=article][data-state=waiting]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 1300 },
  // The advert lands: the unreserved article moved, the reserved one did not.
  { assert: { selector: '[data-part=article][data-state=arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=steady][data-state=arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { assert: { selector: '[data-part=pay-article]', state: 'visible' } },
  { wait: 1400 },
]);
