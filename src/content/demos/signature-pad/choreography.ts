import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The receipt fades in from mount, so the empty claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp]', state: 'hidden' } },
  { wait: 500 },

  // The stroke follows the hand across the pad, and the hand signs rather than
  // swipes: one continuous press rising and falling through the waypoints.
  { moveTo: '[data-part=pad-start]' },
  { drag: { to: '[data-part=pad-end]', via: ['[data-part=pad-mid-a]', '[data-part=pad-mid-b]', '[data-part=pad-mid-c]'] } },
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-state=signed]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'hidden' } },
  { wait: 800 },

  // Done commits it and trims the capture to the ink's own bounds.
  { moveTo: '[data-part=btn-done]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-state=captured]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp]', state: 'visible' } },
  { assert: { selector: '[data-part=baseline]', state: 'hidden' } },
  { wait: 1000 },

  // Clear takes the pad back to an empty baseline, which is where it began.
  { moveTo: '[data-part=btn-clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp]', state: 'hidden' } },
  { wait: 800 },
]);
