import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The resting state is the stranded one: paint and actions, with no pointer anywhere.
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { moveTo: '[data-part=tap-away]' },
  { wait: 500 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { wait: 900 },
  // The tap that strands it again, replayed the way a touch browser performs one.
  { moveTo: '[data-part=tap-card]' },
  { wait: 500 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1000 },
  // Gated: the reveal is a pointer's flourish, so a tap has nothing to leave behind and
  // the actions are simply there.
  { moveTo: '[data-part=mode-gated]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=tap-card]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1100 },
]);
