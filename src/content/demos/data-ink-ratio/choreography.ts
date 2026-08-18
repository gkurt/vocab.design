import { steps } from '#src/stage/choreography.ts';

/**
 * Two passes of erasure and back to the start, so a pass picked up anywhere reads the same.
 * Each level is named by its own segment rather than toggled (SPEC §8), and the waits after
 * a click clear the 0.4s ghosting fade rather than judging it mid-flight. The claims are
 * made on the layers and the read-out, never on a single hairline gridline.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=marks]', state: 'visible' } },
  { assert: { selector: '[data-part=chrome-heavy][data-state=on]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio][data-level=full]', state: 'visible' } },
  { wait: 1000 },

  // First erasure: the fill, the frame, the legend and the vertical grid go ghost.
  { moveTo: '[data-part=seg-restrained]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=chrome-heavy][data-state=ghost]', state: 'visible' } },
  { assert: { selector: '[data-part=chrome-mid][data-state=on]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio][data-level=restrained]', state: 'visible' } },
  { assert: { selector: '[data-part=marks]', state: 'visible' } },
  { wait: 1300 },

  // Second erasure: the horizontal grid and the value labels follow, and the marks stay put.
  { moveTo: '[data-part=seg-reduced]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=chrome-mid][data-state=ghost]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio][data-level=reduced]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-level=reduced]', state: 'visible' } },
  { assert: { selector: '[data-part=marks]', state: 'visible' } },
  { wait: 1400 },

  // Back to the chart as it was charted.
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=chrome-heavy][data-state=on]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio][data-level=full]', state: 'visible' } },
  { wait: 800 },
]);
