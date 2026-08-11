import { steps } from '#src/stage/choreography.ts';

/**
 * Inspecting is absolute: each stop names the picture it reads, so a run resumed
 * anywhere still leaves the panel reporting the image the cursor is on.
 */
export default steps([
  { assert: { selector: '[data-part=decorative]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=informative]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-state=informative]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=decorative]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-state=decorative]', state: 'visible' } },
  { wait: 1800 },
]);
