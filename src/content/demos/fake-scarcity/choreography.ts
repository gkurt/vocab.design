import { steps } from '#src/stage/choreography.ts';

// Two refreshes are enough: the crowd is a different size each time, which is the whole
// claim. The honest state is refreshed too, and answers with the same number, because
// that one is read from inventory. The pass ends on the mount state, which is the one the
// subject's pose requires.
export default steps([
  { assert: { selector: '[data-part=chips][data-mode="fake"][data-count="14"]', state: 'visible' } },
  { assert: { selector: '[data-part=viewers]', state: 'visible' } },
  { assert: { selector: '[data-part=only-two]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=refresh]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=chips][data-count="27"]', state: 'visible' } },
  { wait: 800 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=chips][data-count="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=chips][data-refreshes="2"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=mode-fair]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chips][data-mode="fair"][data-count="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=stock]', state: 'visible' } },
  { assert: { selector: '[data-part=viewers]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=refresh]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=chips][data-refreshes="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=chips][data-count="12"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=mode-fake]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chips][data-mode="fake"]', state: 'visible' } },
  { assert: { selector: '[data-part=only-two]', state: 'visible' } },
  { wait: 800 },
]);
