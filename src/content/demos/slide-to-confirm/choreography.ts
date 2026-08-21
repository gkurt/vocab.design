import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the panel to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=slider][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  // WCAG 2.2 SC 2.5.7: the non-dragging way through is part of the control, not a footnote.
  { assert: { selector: '[data-part=alt]', state: 'visible' } },

  // A real drag that gives up a third of the way along. The thumb springs back and nothing
  // is erased, which is the guard doing its job and the state no value slider has.
  { moveTo: '[data-part=thumb]' },
  { wait: 450 },
  { drag: { to: '[data-part=short]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-state=sprung]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { assert: { selector: '[data-part=slider][data-done]', state: 'hidden' } },
  { wait: 1000 },

  // The same gesture carried the whole way: the effort is the confirmation, so the release
  // at the far end is what commits.
  { moveTo: '[data-part=thumb]' },
  { wait: 400 },
  { drag: { to: '[data-part=end]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slider][data-done]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-outcome=done]', state: 'visible' } },
  { wait: 1200 },
]);
