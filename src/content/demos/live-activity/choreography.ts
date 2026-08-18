import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the compact surface, beside the cutout, already counting down.
  { wait: 700 },
  { assert: { selector: '[data-part=activity][data-surface=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=activity][data-live]', state: 'visible' } },
  { assert: { selector: '[data-part=compact-eta]', state: 'visible' } },
  { wait: 900 },

  // Expanded on the lock screen: the same activity, with the progress it keeps rewriting.
  { moveTo: '[data-part=seg-expanded]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=activity][data-surface=expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=progress]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 1400 },

  // The same delivery announced as a notification instead: one sentence, no progress,
  // and nothing that will ever rewrite it.
  { moveTo: '[data-part=seg-notification]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=activity][data-surface=notification]', state: 'visible' } },
  { assert: { selector: '[data-part=age]', state: 'visible' } },
  { assert: { selector: '[data-part=progress]', state: 'hidden' } },
  { assert: { selector: '[data-part=activity][data-live]', state: 'hidden' } },
  { wait: 1200 },

  // Back to the compact surface, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-compact]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=activity][data-surface=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=activity][data-live]', state: 'visible' } },
  { wait: 900 },
]);
