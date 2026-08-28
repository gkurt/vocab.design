import { steps } from '#src/stage/choreography.ts';

// The door is in the bar from the first frame, looking exactly as shipped as the button
// beside it. Pressing it opens the reveal, Notify me counts the press, and the dismiss
// control is the only way back: three controls, three states, no toggles (SPEC §8). The
// closed claim is read off the door, since the reveal it names is gone by then.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=door][data-open="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=export]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=door]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=door][data-open="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet][data-state=offer]', state: 'visible' } },
  { assert: { selector: '[data-part=truth]', state: 'visible' } },
  { assert: { selector: '[data-part=notify]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=notify]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=sheet][data-state=counted]', state: 'visible' } },
  { assert: { selector: '[data-part=notify][aria-disabled="true"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=dismiss]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=door][data-open="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet]', state: 'hidden' } },
  { wait: 900 },
]);
