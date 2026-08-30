import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the desktop to land.
  { wait: 700 },
  { assert: { selector: '[data-part=dock]', state: 'visible' } },
  { assert: { selector: '[data-part=divider-1]', state: 'visible' } },
  { assert: { selector: '[data-part=dock][data-running="1"]', state: 'visible' } },
  // At rest only the unpinned app is running, so only its indicator is lit.
  { assert: { selector: '[data-part=dot-preview]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-mail]', state: 'hidden' } },
  { assert: { selector: '[data-part=dot-notes]', state: 'hidden' } },
  { wait: 600 },

  // Launching from a pinned tile: the icon stays exactly where it was, a dot appears
  // under it, and the window it owns comes to the front.
  { moveTo: '[data-part=tile-mail]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=dot-mail]', state: 'visible' } },
  { assert: { selector: '[data-part=dock][data-running="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=window][data-front=mail]', state: 'visible' } },
  { assert: { selector: '[data-part=dock][data-front=mail]', state: 'visible' } },
  { wait: 900 },

  // A second launcher, and the pinned section still holds every one of its places.
  { moveTo: '[data-part=tile-notes]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=dot-notes]', state: 'visible' } },
  { assert: { selector: '[data-part=dock][data-running="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=window][data-front=notes]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-mail]', state: 'visible' } },
  { wait: 900 },

  // The unpinned app is reached the same way, which is the whole point of the strip:
  // one row, whether an icon is a launcher or a window that happens to be open.
  { moveTo: '[data-part=tile-preview]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=window][data-front=preview]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-preview]', state: 'visible' } },
  { assert: { selector: '[data-part=dock][data-running="3"]', state: 'visible' } },
  { wait: 800 },
]);
