import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the map is drawn under the interface and the action is in the easy band.
  { assert: { selector: '[data-part=map]', state: 'visible' } },
  { assert: { selector: '[data-part=actions-bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=actions-top]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-top]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-top][aria-selected="true"]', state: 'visible' } },
  // The same action, now in the corner the thumb cannot reach without letting go.
  { assert: { selector: '[data-part=actions-top]', state: 'visible' } },
  { assert: { selector: '[data-part=actions-bottom]', state: 'hidden' } },
  { assert: { selector: '[data-part=map]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1500 },
  // Each segment names a placement, so the way back is a placement too, not an undo.
  { moveTo: '[data-part=seg-bottom]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-bottom][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=actions-bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=actions-top]', state: 'hidden' } },
  { wait: 900 },
]);
