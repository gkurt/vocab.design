import { steps } from '#src/stage/choreography.ts';

// The clock is watched long enough to leave its starting number, then the page is
// reloaded and it is back where it began: the proof that nothing was expiring. Only
// after that does the dated version get its turn, and the same reload leaves it alone.
// The pass ends on the mount state, which is the one the subject's pose requires.
export default steps([
  { assert: { selector: '[data-part=banner][data-mode="fake"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 2400 },
  { assert: { selector: '[data-part=readout][data-at="start"]', state: 'hidden' } },
  { moveTo: '[data-part=reload]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=banner][data-reloads="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at="start"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=mode-fair]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=banner][data-mode="fair"]', state: 'visible' } },
  { assert: { selector: '[data-part=deadline]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=reload]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=banner][data-reloads="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=deadline]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=mode-fake]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=banner][data-mode="fake"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at="start"]', state: 'visible' } },
  { wait: 800 },
]);
