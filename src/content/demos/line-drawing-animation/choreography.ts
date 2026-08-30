import { steps } from '#src/stage/choreography.ts';

// The route draws itself once at mount, so the script opens after it has landed. Each segment
// names a mode and Replay names a run, so neither step flips whatever it finds (SPEC §8).
export default steps([
  { wait: 1800 },
  { assert: { selector: '[data-part=scene][data-state=drawn]', state: 'visible' } },
  { assert: { selector: '[data-part=route]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The draw takes 1.4 seconds, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=scene][data-state=drawing]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=scene][data-state=drawn]', state: 'visible' } },
  { moveTo: '[data-part=seg-instant]' },
  { click: true },
  { wait: 600 },
  // The same route, painted with no pen: what a reduced-motion reader is given.
  { assert: { selector: '[data-part=scene][data-mode=instant][data-state=drawn]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-draw]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-mode=draw][data-state=drawing]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=scene][data-state=drawn]', state: 'visible' } },
  { wait: 700 },
]);
