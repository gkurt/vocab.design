import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 650 },
  { assert: { selector: '[data-part=ornament]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-view=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=view-grid]', state: 'visible' } },
  { assert: { selector: '[data-part=view-info]', state: 'hidden' } },
  { wait: 600 },

  // The eyes rest on the strip below the window, and the pinch commits the pick. The
  // window's content changes; the strip itself stays exactly where it was.
  { moveTo: '[data-part=seg-single]' },
  { wait: 550 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-view=single]', state: 'visible' } },
  { assert: { selector: '[data-part=view-single]', state: 'visible' } },
  { assert: { selector: '[data-part=view-grid]', state: 'hidden' } },
  { assert: { selector: '[data-part=ornament]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-info]' },
  { wait: 550 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-view=info]', state: 'visible' } },
  { assert: { selector: '[data-part=view-info]', state: 'visible' } },
  { assert: { selector: '[data-part=view-single]', state: 'hidden' } },
  { wait: 900 },

  // Back to the grid, which is the view the window rests in.
  { moveTo: '[data-part=seg-grid]' },
  { wait: 550 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-view=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=view-grid]', state: 'visible' } },
  { assert: { selector: '[data-part=ornament]', state: 'visible' } },
  { wait: 900 },
]);
