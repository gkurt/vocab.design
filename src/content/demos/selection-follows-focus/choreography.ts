import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=auto-tab-overview][aria-selected="true"]', state: 'visible' } },
  // The automatic row: each arrow takes the selection with it, so the panel changes on the
  // same keystroke that moved the focus.
  { moveTo: '[data-part=auto-tabs]' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=auto-tab-details][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=auto-tab-details][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=auto-tabs][data-split]', state: 'hidden' } },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=auto-tab-history][aria-selected="true"]', state: 'visible' } },
  { wait: 800 },
  // The manual row: the same arrow moves focus alone, and the two facts sit on two items
  // until Enter commits the one under the ring.
  { moveTo: '[data-part=manual-tabs]' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=manual-tab-details][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=manual-tab-details][aria-selected="true"]', state: 'hidden' } },
  { assert: { selector: '[data-part=manual-tab-overview][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=manual-tabs][data-split]', state: 'visible' } },
  { wait: 900 },
  { press: 'Enter' },
  { wait: 500 },
  { assert: { selector: '[data-part=manual-tab-details][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=manual-tabs][data-split]', state: 'hidden' } },
  { wait: 1200 },
]);
