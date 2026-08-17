import { steps } from '#src/stage/choreography.ts';

/**
 * Drag the keyhole from the field to the failure notice in the far corner, raise the
 * enlargement, and drag back to the Save button: the two things a reader would want to see
 * together are never in the lens at the same time. Each drag reaches a place on the page and
 * each segment reaches its own enlargement, so nothing here toggles (SPEC §8).
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=lens][data-showing=field]', state: 'visible' } },
  { assert: { selector: '[data-part=lens][data-zoom="300"]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=lens]' },
  { drag: { to: '[data-part=spot-alert]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-showing=alert]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=alert]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-400]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-zoom="400"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-zoom="400"]', state: 'visible' } },
  { assert: { selector: '[data-part=lens][data-showing=alert]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=lens]' },
  { drag: { to: '[data-part=spot-save]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-showing=save]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-showing=save]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-200]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-zoom="200"]', state: 'visible' } },
  { assert: { selector: '[data-part=lens][data-showing=save]', state: 'visible' } },
  { wait: 900 },
]);
