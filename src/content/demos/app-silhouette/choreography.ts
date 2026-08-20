import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the outline waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=silhouette][data-shape=top]', state: 'visible' } },
  { assert: { selector: '[data-part=nav]', state: 'visible' } },
  { assert: { selector: '[data-part=tabs]', state: 'hidden' } },
  { wait: 600 },

  // A short strip plus a command bar, which is a different outline from one tall band.
  { moveTo: '[data-part=seg-menu]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=silhouette][data-shape=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=extra]', state: 'visible' } },
  { wait: 800 },

  // The pane stands up and the content moves beside it.
  { moveTo: '[data-part=seg-left]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=silhouette][data-shape=left]', state: 'visible' } },
  { assert: { selector: '[data-part=extra]', state: 'hidden' } },
  { wait: 800 },

  // Tabs, attached to the top edge of the content rather than floating above it.
  { moveTo: '[data-part=seg-tabs]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=silhouette][data-shape=tabs]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-1]', state: 'visible' } },
  { assert: { selector: '[data-part=nav]', state: 'hidden' } },
  { wait: 800 },

  // Back to the plainest of the four.
  { moveTo: '[data-part=seg-top]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=silhouette][data-shape=top]', state: 'visible' } },
  { wait: 700 },
]);
