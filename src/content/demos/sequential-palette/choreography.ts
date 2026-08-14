import { steps } from '#src/stage/choreography.ts';

/**
 * Three steps of the ramp, picked from the dark end to the pale end and back. Each stop
 * names one step outright, so a pass joined halfway proves the same mapping (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=plot][data-bin="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-bin="4"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=stop-0]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=plot][data-bin="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-0][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-bin="0"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-2]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=plot][data-bin="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-bin="2"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-4]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=plot][data-bin="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-4][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
