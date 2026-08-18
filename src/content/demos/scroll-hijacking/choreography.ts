import { steps } from '#src/stage/choreography.ts';

// Two turns of very different sizes, both answered with exactly one panel: that is the
// claim, and `data-obeyed` is how the script proves the region did not move the distance
// it was asked for. Native is then put back beside it, where the same small turn is
// obeyed. Each segment reaches an absolute state (SPEC §8), and the pass ends hijacked,
// which is the state the specimen mounts in.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=region][data-mode=hijacked]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-panel="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-0][data-current]', state: 'visible' } },
  { moveTo: '[data-part=region]' },
  { wait: 400 },
  // A nudge, far short of a panel.
  { scroll: { y: 60 } },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-panel="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-obeyed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-1][data-current]', state: 'visible' } },
  { wait: 900 },
  // A shove, more than two panels' worth. Same answer.
  { scroll: { y: 330 } },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-panel="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-obeyed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-2][data-current]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=mode-native]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-mode=native]', state: 'visible' } },
  { moveTo: '[data-part=region]' },
  { wait: 400 },
  { scroll: { y: 60 } },
  { wait: 900 },
  // The browser kept the gesture, so the same nudge is now worth a nudge.
  { assert: { selector: '[data-part=region][data-obeyed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-mode=native]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=mode-hijacked]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-mode=hijacked]', state: 'visible' } },
  { wait: 900 },
]);
