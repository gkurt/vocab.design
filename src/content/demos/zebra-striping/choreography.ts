import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The table fades in from mount, so the first reading of the fills waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=stripes][data-mode=zebra]', state: 'visible' } },
  { assert: { selector: '[data-part=bands]', state: 'visible' } },
  { assert: { selector: '[data-part=cue][data-mode=zebra]', state: 'visible' } },
  { wait: 700 },

  // Take the fills away: seven columns and nothing for the eye to follow across them.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=stripes][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=bands]', state: 'hidden' } },
  { assert: { selector: '[data-part=cue][data-mode=none]', state: 'visible' } },
  { wait: 800 },

  // The alternative: one band, on the row the reader is actually asking about.
  { moveTo: '[data-part=seg-hover]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=stripes][data-mode=hover]', state: 'visible' } },
  { assert: { selector: '[data-part=bands]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=row-3]' },
  { wait: 600 },
  { assert: { selector: '[data-part=row-3][data-hovered]', state: 'visible' } },
  { wait: 900 },

  // Back to the stripes, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-zebra]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=stripes][data-mode=zebra]', state: 'visible' } },
  { assert: { selector: '[data-part=bands]', state: 'visible' } },
  { wait: 700 },
]);
