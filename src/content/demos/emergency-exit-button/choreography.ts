import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the page to land.
  { wait: 700 },
  { assert: { selector: '[data-part=view][data-state=page]', state: 'visible' } },
  { assert: { selector: '[data-part=exit]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-count="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=dest]', state: 'hidden' } },
  { wait: 500 },

  // The keyboard trigger: three presses of one key, counted out loud so the run is visible.
  { press: 'Shift' },
  { press: 'Shift' },
  { assert: { selector: '[data-part=counter][data-count="2"]', state: 'visible' } },
  { press: 'Shift' },
  { wait: 550 },
  { assert: { selector: '[data-part=view][data-state=left]', state: 'visible' } },
  { assert: { selector: '[data-part=dest]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { assert: { selector: '[data-part=exit]', state: 'hidden' } },
  { wait: 1100 },

  // Back to the page, so the other trigger can be shown. A real exit is one way; this
  // control belongs to the demo, not to the term.
  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=view][data-state=page]', state: 'visible' } },
  { assert: { selector: '[data-part=exit]', state: 'visible' } },
  { assert: { selector: '[data-part=counter][data-count="0"]', state: 'visible' } },
  { wait: 700 },

  // And the pointer trigger, pinned where it cannot scroll away.
  { moveTo: '[data-part=exit]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=view][data-state=left]', state: 'visible' } },
  { assert: { selector: '[data-part=dest]', state: 'visible' } },
  { wait: 800 },
]);
