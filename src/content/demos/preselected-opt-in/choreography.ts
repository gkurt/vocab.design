import { steps } from '#src/stage/choreography.ts';

// The step is paid exactly as it arrived, which is what a preselection is counting on,
// and the receipt says what that bought. Then the same screen is paid with nothing
// assumed. The pass ends on the mount state, which the subject's pose requires
// (SPEC §6, §8).
export default steps([
  { assert: { selector: '[data-part=opt-insurance][data-mode="preselected"][data-state="checked"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-offers][data-state="checked"]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { moveTo: '[data-part=box-insurance]' },
  { wait: 900 },
  { moveTo: '[data-part=pay]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=mode-fair]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=opt-insurance][data-mode="fair"][data-state="clear"]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=pay]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=mode-preselected]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=opt-insurance][data-mode="preselected"][data-state="checked"]', state: 'visible' } },
  { wait: 800 },
]);
