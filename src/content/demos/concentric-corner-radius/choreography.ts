import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment names where the inner radius comes from rather than flipping between the
 * two (SPEC §8), and the pass ends back on the computed one, which is the mount state and
 * the condition the subject's `data-pose` calls honest.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=corner][data-mode="concentric"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode="concentric"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-same]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-same][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=corner][data-mode="same"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode="same"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-concentric]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-concentric][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=corner][data-mode="concentric"]', state: 'visible' } },
  { wait: 700 },
]);
